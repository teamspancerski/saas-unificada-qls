import ccxt from 'ccxt';
import * as ta from 'technicalindicators';
import { prisma } from './prisma';

type ScoredPair = {
  symbol: string
  score: number
  data: any
}

export class QLCEngine {
  private static instance: QLCEngine;
  private binance: ccxt.binance;
  public topPairs: ScoredPair[] = [];

  private constructor() {
    this.binance = new ccxt.binance();
  }

  public static getInstance(): QLCEngine {
    if (!QLCEngine.instance) {
      QLCEngine.instance = new QLCEngine();
    }
    return QLCEngine.instance;
  }

  public async start() {
    console.log('🚀 Quantum Liquid System Engine Started');
    setInterval(() => this.scan(), 60000); // 1 min scan
  }

  private async scan() {
    try {
      const activeBots = await prisma.bot.findMany({
        where: { status: { in: ['auto', 'monitor'] } },
        include: { orders: { where: { status: 'open' } } }
      });

      const pairs = ['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'BNB/USDT', 'ARB/USDT', 'LINK/USDT', 'AVAX/USDT'];
      const scoredPairs: ScoredPair[] = [];

      for (const symbol of pairs) {
        const data = await this.fetchMarketData(symbol);
        if (!data) continue;

        const analysis = this.analyzeStrategy(data);
        scoredPairs.push({ symbol, score: analysis.score, data: analysis });

        // Process bots assigned to this pair
        const targetBots = activeBots.filter(b => b.pair === symbol);
        for (const bot of targetBots) {
          await this.processBotStrategy(bot, symbol, data, analysis);
        }
      }

      this.topPairs = scoredPairs.sort((a, b) => b.score - a.score).slice(0, 5);
      await this.checkForceCloses();
    } catch (error) {
      console.error('QLC Engine Scan Error:', error);
    }
  }

  private async fetchMarketData(symbol: string) {
    try {
      const ohlcv15m = await this.binance.fetchOHLCV(symbol, '15m', undefined, 100);
      const ohlcv1h = await this.binance.fetchOHLCV(symbol, '1h', undefined, 100);
      const ohlcv4h = await this.binance.fetchOHLCV(symbol, '4h', undefined, 100);

      return {
        symbol,
        '15m': this.formatOHLCV(ohlcv15m),
        '1h': this.formatOHLCV(ohlcv1h),
        '4h': this.formatOHLCV(ohlcv4h),
        ticker: await this.binance.fetchTicker(symbol)
      };
    } catch (e) {
      return null;
    }
  }

  private formatOHLCV(data: any[]) {
    return {
      opens: data.map(d => d[1]),
      highs: data.map(d => d[2]),
      lows: data.map(d => d[3]),
      closes: data.map(d => d[4]),
      volumes: data.map(d => d[5])
    };
  }

  private analyzeStrategy(data: any) {
    const h1 = data['1h'];
    const h4 = data['4h'];
    const h1Closes = h1.closes;
    const h4Closes = h4.closes;

    // 1. Regime Filter (EMA H4 vs H1)
    const ema4h = ta.EMA.calculate({ period: 20, values: h4Closes });
    const ema1h = ta.EMA.calculate({ period: 20, values: h1Closes });
    const currentEMA4h = ema4h[ema4h.length - 1];
    const currentEMA1h = ema1h[ema1h.length - 1];
    const isBullishRegime = currentEMA1h > currentEMA4h;

    // 2. Trend Strength (ADX)
    const adx = ta.ADX.calculate({ high: h1.highs, low: h1.lows, close: h1Closes, period: 14 });
    const currentADX = adx[adx.length - 1]?.adx || 0;

    // 3. Compression (Bollinger Squeeze)
    const bb = ta.BollingerBands.calculate({ period: 20, stdDev: 2, values: h1Closes });
    const kc = ta.KeltnerChannels.calculate({ maPeriod: 20, multiplier: 1.5, high: h1.highs, low: h1.lows, close: h1Closes, atrPeriod: 14, useSMA: false });
    const lastBB = bb[bb.length - 1];
    const lastKC = kc[kc.length - 1];
    const isSqueezing = (lastKC && lastBB && lastKC.upper < lastBB.upper && lastKC.lower > lastBB.lower);

    // 4. Volatility (ATR)
    const atr = ta.ATR.calculate({ high: h1.highs, low: h1.lows, close: h1Closes, period: 14 });
    const lastATR = atr[atr.length - 1];
    const avgATR = atr.slice(-20).reduce((a, b) => a + b, 0) / 20;

    // 5. Breakout Logic
    const currentPrice = h1Closes[h1Closes.length - 1];
    const prevHigh = Math.max(...h1.highs.slice(-5, -1));
    const prevLow = Math.min(...h1.lows.slice(-5, -1));
    const isBreakoutUp = currentPrice > prevHigh;
    const isBreakoutDown = currentPrice < prevLow;

    // Scoring
    let score = 0;
    if (currentADX > 25) score += 25;
    if (isSqueezing) score += 25;
    if (lastATR < avgATR) score += 10;
    if (isBreakoutUp || isBreakoutDown) score += 40;

    return {
      score: Math.min(100, score),
      isBullishRegime,
      isSqueezing,
      isBreakoutUp,
      isBreakoutDown,
      currentPrice
    };
  }

  private async processBotStrategy(bot: any, symbol: string, data: any, analysis: any) {
    const hasOpenOrder = bot.orders.length > 0;
    if (hasOpenOrder) return;

    const settings = (bot.settings as any) || {};
    const minScore = 75;

    if (analysis.score >= minScore) {
      let side = '';
      if (analysis.isBullishRegime && analysis.isBreakoutUp) side = 'buy';
      if (!analysis.isBullishRegime && analysis.isBreakoutDown) side = 'sell';

      if (side && bot.status === 'auto') {
        await this.executeTrade(bot, symbol, side, analysis.currentPrice, analysis.score);
      }
    }
  }

  private async executeTrade(bot: any, symbol: string, side: string, price: number, score: number) {
    const settings = (bot.settings as any) || {};
    const capital = settings.capitalTotal || 1000;
    const risk = settings.riskPerTrade || 1.0;
    const size = capital * (risk / 100);

    const maxHoldHours = parseInt(settings.maxHoldTime || "4");
    const forceCloseAt = new Date();
    forceCloseAt.setHours(forceCloseAt.getHours() + (isNaN(maxHoldHours) ? 4 : maxHoldHours));

    await prisma.order.create({
      data: {
        botId: bot.id,
        symbol,
        side,
        type: side === 'buy' ? 'long' : 'short',
        entryPrice: price,
        amount: size / price,
        size: size,
        score,
        status: 'open',
        forceCloseAt
      }
    });
    console.log(`[EXECUTION] Bot ${bot.name} | ${symbol} ${side.toUpperCase()} at ${price}`);
  }

  private async checkForceCloses() {
    const now = new Date();
    const expiredOrders = await prisma.order.findMany({
      where: { status: 'open', forceCloseAt: { lte: now } },
      include: { bot: true }
    });

    for (const order of expiredOrders) {
      // For demo, we just close with 0 pnl or random pnl
      const pnl = (Math.random() * 20) - 10;
      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: 'forced_closed',
          closedAt: now,
          exitPrice: order.entryPrice * (1 + (pnl / 100)),
          pnl: pnl
        }
      });
      console.log(`[FORCE CLOSE] Order ${order.id} closed | PnL: ${pnl.toFixed(2)}%`);
    }
  }
}

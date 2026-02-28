import ccxt from 'ccxt';
import * as ta from 'technicalindicators';
import { prisma } from './prisma';

export class QLCEngine {
  private static instance: QLCEngine;
  private binance: ccxt.binance;
  public topPairs: any[] = [];

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
    console.log('🚀 QLC Engine (Demo Isolated) Started');
    setInterval(() => this.scan(), 60000); // 1 min scan
  }

  private async scan() {
    try {
      const activeUsers = await prisma.user.findMany({
        where: { strategyMode: { in: ['auto', 'monitor'] } },
        include: { orders: { where: { status: 'open' } } }
      });

      // Top pairs selection logic (simplified for demo)
      const pairs = ['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'BNB/USDT', 'ARB/USDT'];

      const scoredPairs = [];
      for (const symbol of pairs) {
        const data = await this.fetchMarketData(symbol);
        if (!data) continue;

        const score = this.calculateScore(data);
        scoredPairs.push({ symbol, score, data });

        for (const user of activeUsers) {
          await this.processUserStrategy(user, symbol, data, score);
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

  private calculateScore(data: any): number {
    const h1 = data['1h'];
    const h1Closes = h1.closes;

    // 1. Regime
    const ema4h = ta.EMA.calculate({ period: 20, values: data['4h'].closes });
    const ema1h = ta.EMA.calculate({ period: 20, values: h1Closes });
    const adx = ta.ADX.calculate({ high: h1.highs, low: h1.lows, close: h1Closes, period: 14 });
    const rsi = ta.RSI.calculate({ period: 14, values: h1Closes });

    const currentEMA4h = ema4h[ema4h.length - 1];
    const currentEMA1h = ema1h[ema1h.length - 1];
    const currentADX = adx[adx.length - 1]?.adx || 0;
    const currentRSI = rsi[rsi.length - 1] || 50;

    // 2. Compression
    const bb = ta.BollingerBands.calculate({ period: 20, stdDev: 2, values: h1Closes });
    const kc = ta.KeltnerChannels.calculate({ maPeriod: 20, multiplier: 1.5, high: h1.highs, low: h1.lows, close: h1Closes, atrPeriod: 14, useSMA: false });
    const atr = ta.ATR.calculate({ high: h1.highs, low: h1.lows, close: h1Closes, period: 14 });

    const lastBB = bb[bb.length - 1];
    const lastKC = kc[kc.length - 1];
    const lastATR = atr[atr.length - 1];
    const avgATR = atr.slice(-20).reduce((a: number, b: number) => a + b, 0) / 20;

    const bbWidth = (lastBB?.upper || 0) - (lastBB?.lower || 0);
    const squeeze = (lastKC && lastBB && lastKC.upper < lastBB.upper && lastKC.lower > lastBB.lower) ? 1 : 0;

    // 3. Score logic
    let score = 0;
    if (currentADX > 25) score += 30;
    if (squeeze) score += 30;
    if (lastATR < avgATR * 0.8) score += 20;
    const avgVol = ta.SMA.calculate({ period: 20, values: h1.volumes }).pop() || 0;
    if (h1.volumes[h1.volumes.length - 1] > avgVol * 1.5) score += 20;

    return Math.min(100, score);
  }

  private async processUserStrategy(user: any, symbol: string, data: any, score: number) {
    const existingOrder = user.orders.find((o: any) => o.symbol === symbol);

    // Ping-pong Logic
    if (existingOrder && existingOrder.status === 'open') {
        // Handle ping-pong stop/reversal here if needed
        return;
    }

    if (score > 75) {
      const h1Closes = data['1h'].closes;
      const lastClose = h1Closes[h1Closes.length - 1];

      // Regime Filter
      const ema4h = ta.EMA.calculate({ period: 20, values: data['4h'].closes }).pop() || 0;
      const ema1h = ta.EMA.calculate({ period: 20, values: h1Closes }).pop() || 0;
      const isBull = ema4h > ema1h; // Simplified regime

      let side = isBull ? 'buy' : 'sell';

      if (user.strategyMode === 'auto') {
        await this.createOrder(user, symbol, side, lastClose, score);
      }
    }
  }

  private async createOrder(user: any, symbol: string, side: string, price: number, score: number) {
    const riskAmount = user.capitalTotal * (user.riskPerTrade / 100);
    const size = riskAmount; // simplified

    const maxHoldHours = parseInt(user.maxHoldTime);
    const forceCloseAt = new Date();
    forceCloseAt.setHours(forceCloseAt.getHours() + (isNaN(maxHoldHours) ? 1 : maxHoldHours));

    await prisma.order.create({
      data: {
        userId: user.id,
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
    console.log(`[AUTO] Order Created for ${user.uuid}: ${symbol} ${side}`);
  }

  private async checkForceCloses() {
    const now = new Date();
    const expiredOrders = await prisma.order.findMany({
      where: { status: 'open', forceCloseAt: { lte: now } }
    });

    for (const order of expiredOrders) {
      await prisma.order.update({
        where: { id: order.id },
        data: { status: 'forced_closed', closedAt: now }
      });
      console.log(`[FORCE CLOSE] Order ${order.id} closed due to time limit`);
    }
  }
}

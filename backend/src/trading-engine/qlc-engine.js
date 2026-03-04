"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QLCEngine = void 0;
exports.scanMarket = scanMarket;
const ccxt_1 = __importDefault(require("ccxt"));
const ta = __importStar(require("technicalindicators"));
const prisma_1 = require("../backend/src/lib/prisma");
class QLCEngine {
    static instance;
    binance;
    topPairs = [];
    constructor() {
        this.binance = new ccxt_1.default.binance();
    }
    static getInstance() {
        if (!QLCEngine.instance) {
            QLCEngine.instance = new QLCEngine();
        }
        return QLCEngine.instance;
    }
    async start() {
        console.log('🚀 QLC Engine (Demo Isolated) Started');
        setInterval(() => this.scan(), 60000); // 1 min scan
        await this.scan(); // Initial scan
    }
    async scan() {
        try {
            const activeUsers = await prisma_1.prisma.user.findMany({
                where: { strategyMode: { in: ['auto', 'monitor'] } },
                include: { orders: { where: { status: 'open' } } }
            });
            // Top pairs selection logic (simplified for demo)
            const pairs = ['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'BNB/USDT', 'ARB/USDT'];
            const scoredPairs = [];
            for (const symbol of pairs) {
                const data = await this.fetchMarketData(symbol);
                if (!data)
                    continue;
                const score = this.calculateScore(data);
                scoredPairs.push({ symbol, score, data });
                for (const user of activeUsers) {
                    await this.processUserStrategy(user, symbol, data, score);
                }
            }
            this.topPairs = scoredPairs.sort((a, b) => b.score - a.score).slice(0, 5);
            await this.checkForceCloses();
        }
        catch (error) {
            console.error('QLC Engine Scan Error:', error);
        }
    }
    async fetchMarketData(symbol) {
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
        }
        catch (e) {
            return null;
        }
    }
    formatOHLCV(data) {
        return {
            opens: data.map(d => d[1]),
            highs: data.map(d => d[2]),
            lows: data.map(d => d[3]),
            closes: data.map(d => d[4]),
            volumes: data.map(d => d[5])
        };
    }
    calculateScore(data) {
        const h1 = data['1h'];
        const h1Closes = h1.closes;
        // 1. Regime
        const ema4h = ta.EMA.calculate({ period: 20, values: data['4h'].closes });
        const ema1h = ta.EMA.calculate({ period: 20, values: h1Closes });
        const adx = ta.ADX.calculate({ high: h1.highs, low: h1.lows, close: h1Closes, period: 14 });
        const rsi = ta.RSI.calculate({ period: 14, values: h1Closes });
        const currentEMA4h = ema4h[ema4h.length - 1];
        const currentEMA1h = ema1h[ema1h.length - 1];
        const currentADX = (adx && adx.length > 0) ? adx[adx.length - 1].adx : 0;
        const currentRSI = (rsi && rsi.length > 0) ? rsi[rsi.length - 1] : 50;
        // 2. Compression
        const bb = ta.BollingerBands.calculate({ period: 20, stdDev: 2, values: h1Closes });
        const kc = ta.KeltnerChannels.calculate({ maPeriod: 20, multiplier: 1.5, high: h1.highs, low: h1.lows, close: h1Closes, atrPeriod: 14, useSMA: false });
        const atr = ta.ATR.calculate({ high: h1.highs, low: h1.lows, close: h1Closes, period: 14 });
        const lastBB = bb[bb.length - 1];
        const lastKC = kc[kc.length - 1];
        const lastATR = atr[atr.length - 1];
        const avgATR = atr.slice(-20).reduce((a, b) => a + b, 0) / 20;
        const bbWidth = (lastBB?.upper || 0) - (lastBB?.lower || 0);
        const squeeze = (lastKC && lastBB && lastKC.upper < lastBB.upper && lastKC.lower > lastBB.lower) ? 1 : 0;
        // 3. Score logic
        let score = 0;
        if (currentADX > 25)
            score += 30;
        if (squeeze)
            score += 30;
        if (lastATR < avgATR * 0.8)
            score += 20;
        const avgVol = ta.SMA.calculate({ period: 20, values: h1.volumes }).pop() || 0;
        if (h1.volumes[h1.volumes.length - 1] > avgVol * 1.5)
            score += 20;
        return Math.min(100, score);
    }
    async processUserStrategy(user, symbol, data, score) {
        const existingOrder = user.orders.find((o) => o.symbol === symbol);
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
    async createOrder(user, symbol, side, price, score) {
        const riskAmount = user.capitalTotal * (user.riskPerTrade / 100);
        const size = riskAmount; // simplified
        const maxHoldHours = parseInt(user.maxHoldTime);
        const forceCloseAt = new Date();
        forceCloseAt.setHours(forceCloseAt.getHours() + (isNaN(maxHoldHours) ? 1 : maxHoldHours));
        await prisma_1.prisma.order.create({
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
    async checkForceCloses() {
        const now = new Date();
        const expiredOrders = await prisma_1.prisma.order.findMany({
            where: { status: 'open', forceCloseAt: { lte: now } }
        });
        for (const order of expiredOrders) {
            await prisma_1.prisma.order.update({
                where: { id: order.id },
                data: { status: 'forced_closed', closedAt: now }
            });
            console.log(`[FORCE CLOSE] Order ${order.id} closed due to time limit`);
        }
    }
}
exports.QLCEngine = QLCEngine;
async function scanMarket() {
    const engine = QLCEngine.getInstance();
    await engine.scan();
    return engine.topPairs[0] || null;
}

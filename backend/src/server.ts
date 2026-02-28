import Fastify from 'fastify';
import jwt from '@fastify/jwt';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import helmet from '@fastify/helmet';
import dotenv from 'dotenv';
import ccxt from 'ccxt';
import * as ta from 'technicalindicators';
import { prisma } from './lib/prisma';
import { authRoutes } from './routes/auth';
import { botRoutes } from './routes/bot';
import { stripeRoutes } from './routes/stripe';

dotenv.config();

const fastify = Fastify({ logger: true });

const startServer = async () => {
  await fastify.register(helmet);
  await fastify.register(cors, { origin: '*' });
  await fastify.register(rateLimit);
  await fastify.register(jwt, { secret: process.env.JWT_SECRET! });

  fastify.register(authRoutes);
  fastify.register(botRoutes);
  fastify.register(stripeRoutes);

  // 🧠 MOTOR QLC - Multi-User Trading Engine
  setInterval(async () => {
    try {
      const activeBots = await prisma.user.findMany({
        where: {
          botStatus: true,
          // subscription: { status: 'active' } // Simplified for MVP
        },
        include: { apiKeys: true }
      });

      for (const user of activeBots) {
        if (!user.apiKeys || user.apiKeys.length === 0) continue;

        // Use the user's own API keys instead of global env vars
        const binance = new ccxt.binance({
          apiKey: user.apiKeys[0].apiKey,
          secret: user.apiKeys[0].secret,
        });

        const symbol = 'BTC/USDT';
        const ticker = await binance.fetchTicker(symbol);
        const candles = await binance.fetchOHLCV(symbol, '1h', undefined, 100);

        const closes = candles.map(c => c[4] as number);
        const highs = candles.map(c => c[2] as number);
        const lows = candles.map(c => c[3] as number);

        const bb = ta.BollingerBands.calculate({ period: 20, stdDev: 2, values: closes });
        const adx = ta.ADX.calculate({ high: highs, low: lows, close: closes, period: 14 });

        const currentBB = bb[bb.length - 1];
        const currentADX = adx[adx.length - 1];
        const currentClose = closes[closes.length - 1];

        // Score QLC (0-100)
        const score = Math.min(100, (currentADX?.adx || 0) * 0.4 +
          (currentClose > (currentBB?.upper || 0) ? 30 : 0) * 0.6);

        if (score > 75) {
          // Lógica de JUROS (Compounding): Use current capital (which should be updated by trade results)
          const currentCapital = user.capitalTotal;
          const size = (currentCapital * (user.riskPerTrade / 100)) / ticker.last;

          await prisma.signal.create({
            data: {
              userId: user.id,
              symbol: symbol,
              action: currentClose > (currentBB?.upper || 0) ? 'buy' : 'sell',
              score,
              price: ticker.last,
              size: Math.floor(size * 100) / 100
            }
          });

          console.log(`Signal created for user ${user.id}: ${symbol} at ${ticker.last}`);
        }
      }
    } catch (error) {
      console.error('QLC Engine Error:', error);
    }
  }, 60000); // 1min scan

  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

startServer();

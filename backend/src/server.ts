import Fastify from 'fastify';
import jwt from '@fastify/jwt';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import helmet from '@fastify/helmet';
import dotenv from 'dotenv';
import { prisma } from './lib/prisma';
import { authRoutes } from './routes/auth';
import { botRoutes } from './routes/bot';
import { stripeRoutes } from './routes/stripe';
import { strategyRoutes } from './routes/strategy';
import { tradeRoutes } from './routes/trade.routes';
import { QLCEngine } from './trading-engine/qlc-engine';

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
  fastify.register(strategyRoutes);
  fastify.register(tradeRoutes, { prefix: '/trade' });

  // 🧠 MOTOR QLC - Enhanced Demo Isolated Engine
  const engine = QLCEngine.getInstance();
  engine.start();

  try {
    await fastify.listen({ port: Number(process.env.PORT) || 4000, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

startServer();

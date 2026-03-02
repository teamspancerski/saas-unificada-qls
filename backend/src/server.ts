import Fastify from 'fastify';
import jwt from '@fastify/jwt';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import helmet from '@fastify/helmet';
import dotenv from 'dotenv';
import { prisma } from './lib/prisma';
import { authRoutes } from './routes/auth';
import { lawyerRoutes } from './routes/lawyer';
import { triageRoutes } from './routes/triage';
import { caseRoutes } from './routes/case';
import { vaultRoutes } from './routes/vault';
import { stripeRoutes } from './routes/stripe';

dotenv.config();

// Environment Validation
const REQUIRED_ENV = ['JWT_SECRET', 'DATABASE_URL', 'STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET', 'ENCRYPTION_KEY'];
const missingEnv = REQUIRED_ENV.filter(env => !process.env[env]);

if (missingEnv.length > 0 && process.env.NODE_ENV === 'production') {
  console.error(`FATAL: Missing environment variables: ${missingEnv.join(', ')}`);
  process.exit(1);
}

const fastify = Fastify({ logger: true });

// Authentication Decorator
fastify.decorate("authenticate", async (request: any, reply: any) => {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.status(401).send({ error: 'Unauthorized: Invalid or expired token' });
  }
});

const startServer = async () => {
  await fastify.register(helmet);
  await fastify.register(cors, { origin: '*' });
  await fastify.register(rateLimit);
  await fastify.register(jwt, {
    secret: process.env.JWT_SECRET || 'aurex-law-dev-secret-only'
  });

  // Register Routes
  fastify.register(authRoutes);
  fastify.register(lawyerRoutes);
  fastify.register(triageRoutes);
  fastify.register(caseRoutes);
  fastify.register(vaultRoutes);
  fastify.register(stripeRoutes);

  try {
    const port = parseInt(process.env.PORT || '3000');
    await fastify.listen({ port, host: '0.0.0.0' });
    console.log(`AUREX LAW API running on port ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

startServer();

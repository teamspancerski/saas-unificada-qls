import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { QLCEngine } from '../lib/qlc-engine';

export async function strategyRoutes(app: FastifyInstance) {
  // Update User Configuration
  app.post('/users/:uuid/config', async (req) => {
    const { uuid } = z.object({ uuid: z.string() }).parse(req.params);
    const data = z.object({
      capitalTotal: z.number().min(100).max(10000000).optional(),
      riskPerTrade: z.number().min(0.1).max(5).optional(),
      maxHoldTime: z.string().optional(),
      pingPongEnabled: z.boolean().optional()
    }).parse(req.body);

    const user = await prisma.user.findUnique({ where: { uuid } });
    if (!user) throw new Error('User not found');

    return await prisma.user.update({
      where: { uuid },
      data
    });
  });

  // Start/Stop Strategy
  app.post('/strategy/start', async (req) => {
    const { uuid, mode } = z.object({
      uuid: z.string(),
      mode: z.enum(['auto', 'monitor', 'off'])
    }).parse(req.body);

    const user = await prisma.user.findUnique({ where: { uuid } });
    if (!user) throw new Error('User not found');

    await prisma.user.update({
      where: { uuid },
      data: {
        strategyMode: mode,
        botStatus: mode !== 'off'
      }
    });

    return { status: mode.toUpperCase(), message: `Estratégia ${mode} ativada` };
  });

  // Get Scored Pairs
  app.get('/pairs/score', async () => {
    const engine = QLCEngine.getInstance();
    return engine.topPairs.map(p => ({
      symbol: p.symbol,
      score: p.score,
      vol: '1.2B', // Mocked as full market scan is slow for demo
      atr: '2.5%',
      spread: '0.01%'
    }));
  });

  // Get Metrics
  app.get('/metrics/:uuid', async (req) => {
    const { uuid } = z.object({ uuid: z.string() }).parse(req.params);
    const user = await prisma.user.findUnique({
      where: { uuid },
      include: { orders: true }
    });

    if (!user) throw new Error('User not found');

    // Calculate Sharpe (Mock logic for demo)
    const sharpe = 2.47;
    const winRate = 62.4;
    const drawdown = 4.2;

    return {
      sharpe,
      winRate,
      drawdown,
      orders: user.orders
    };
  });
}

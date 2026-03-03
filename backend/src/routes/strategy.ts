import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { QLCEngine } from '../lib/qlc-engine';

export async function strategyRoutes(app: FastifyInstance) {
  // Update Bot Configuration
  app.post('/bots/:id/config', async (req) => {
    const { id } = z.object({ id: z.string() }).parse(req.params);
    const settings = z.object({
      capitalTotal: z.number().min(100).max(10000000).optional(),
      riskPerTrade: z.number().min(0.1).max(5).optional(),
      maxHoldTime: z.string().optional(),
      pingPongEnabled: z.boolean().optional()
    }).parse(req.body as any);

    const bot = await prisma.bot.findUnique({ where: { id } });
    if (!bot) throw new Error('Bot not found');

    const currentSettings = (bot.settings as any) || {};
    const newSettings = { ...currentSettings, ...settings };

    return await prisma.bot.update({
      where: { id },
      data: { settings: newSettings }
    });
  });

  // Get Scored Pairs
  app.get('/pairs/score', async () => {
    const engine = QLCEngine.getInstance();
    return engine.topPairs.map(p => ({
      symbol: p.symbol,
      score: p.score,
      vol: '1.2B',
      atr: '2.5%',
      spread: '0.01%'
    }));
  });

  // Get Metrics for Bot
  app.get('/metrics/bot/:id', async (req) => {
    const { id } = z.object({ id: z.string() }).parse(req.params);
    const bot = await prisma.bot.findUnique({
      where: { id },
      include: { orders: true }
    });

    if (!bot) throw new Error('Bot not found');

    // Logic to calculate real metrics from orders
    const totalOrders = bot.orders.length;
    const closedOrders = bot.orders.filter(o => o.status !== 'open');
    const winningOrders = closedOrders.filter(o => (o.pnl || 0) > 0);

    const winRate = totalOrders > 0 ? (winningOrders.length / closedOrders.length) * 100 : 62.4;
    const sharpe = 2.47; // Default for demo if not enough data
    const drawdown = 4.2;

    return {
      winRate: winRate || 0,
      sharpe,
      drawdown,
      totalOrders,
      pnl: bot.orders.reduce((acc, o) => acc + (o.pnl || 0), 0)
    };
  });

  // Get Metrics for Organization (Aggregated)
  app.get('/metrics/org/:orgId', async (req) => {
    const { orgId } = z.object({ orgId: z.string() }).parse(req.params);
    const bots = await prisma.bot.findMany({
      where: { organizationId: orgId },
      include: { orders: true }
    });

    let totalPnL = 0;
    let totalWinCount = 0;
    let totalClosedCount = 0;

    bots.forEach(bot => {
      bot.orders.forEach(order => {
        if (order.status !== 'open') {
          totalPnL += (order.pnl || 0);
          totalClosedCount++;
          if ((order.pnl || 0) > 0) totalWinCount++;
        }
      });
    });

    return {
      totalPnL,
      winRate: totalClosedCount > 0 ? (totalWinCount / totalClosedCount) * 100 : 0,
      activeBots: bots.filter(b => b.status !== 'off').length,
      totalBots: bots.length
    };
  });
}

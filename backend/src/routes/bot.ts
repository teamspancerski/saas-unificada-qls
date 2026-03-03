import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export async function botRoutes(app: FastifyInstance) {
  // Create a new Bot
  app.post('/bots', async (req) => {
    const { name, pair, organizationId, settings } = z.object({
      name: z.string(),
      pair: z.string(),
      organizationId: z.string(),
      settings: z.any().optional()
    }).parse(req.body as any);

    return await prisma.bot.create({
      data: {
        name,
        pair,
        organizationId,
        settings: settings || {
          capitalTotal: 1000,
          riskPerTrade: 1.0,
          maxHoldTime: "4h",
          pingPongEnabled: false
        }
      }
    });
  });

  // Get Bots for Organization
  app.get('/bots/org/:orgId', async (req) => {
    const { orgId } = z.object({ orgId: z.string() }).parse(req.params);
    return await prisma.bot.findMany({
      where: { organizationId: orgId },
      include: { orders: { take: 10, orderBy: { openedAt: 'desc' } } }
    });
  });

  // Toggle Bot Status
  app.post('/bots/:id/toggle', async (req) => {
    const { id } = z.object({ id: z.string() }).parse(req.params);
    const { status } = z.object({ status: z.enum(['auto', 'monitor', 'off']) }).parse(req.body as any);

    return await prisma.bot.update({
      where: { id },
      data: { status }
    });
  });

  // Get Bot Details & Orders
  app.get('/bots/:id', async (req) => {
    const { id } = z.object({ id: z.string() }).parse(req.params);
    return await prisma.bot.findUnique({
      where: { id },
      include: { orders: { orderBy: { openedAt: 'desc' } } }
    });
  });

  // List all orders for Organization
  app.get('/orders/org/:orgId', async (req) => {
    const { orgId } = z.object({ orgId: z.string() }).parse(req.params);
    return await prisma.order.findMany({
      where: { bot: { organizationId: orgId } },
      orderBy: { openedAt: 'desc' }
    });
  });
}

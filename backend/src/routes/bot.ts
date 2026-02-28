import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export async function botRoutes(app: FastifyInstance) {
  // Find or Create User by Wallet (Rabby integration)
  app.post('/user/sync', async (req) => {
    const { walletAddress } = z.object({ walletAddress: z.string() }).parse(req.body);

    let user = await prisma.user.findUnique({
      where: { email: walletAddress.toLowerCase() + "@rabby.wallet" } // Use wallet as unique ID
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: walletAddress.toLowerCase() + "@rabby.wallet",
          name: walletAddress,
          hashedPassword: "wallet-auth", // Placeholders for wallet-based users
          botStatus: false,
          capitalTotal: 1000,
          riskPerTrade: 1.0
        }
      });
    }

    return user;
  });

  // Toggle Bot
  app.post('/bot/toggle/:userId', async (req) => {
    const { userId } = z.object({ userId: z.string() }).parse(req.params);
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) throw new Error('User not found');

    const newStatus = !user.botStatus;
    await prisma.user.update({
      where: { id: userId },
      data: { botStatus: newStatus }
    });

    return { status: newStatus ? 'ON' : 'OFF', message: 'Bot updated' };
  });

  // Orders
  app.get('/orders/:userId', async (req) => {
    const { userId } = z.object({ userId: z.string() }).parse(req.params);
    return await prisma.order.findMany({
      where: { userId },
      orderBy: { openedAt: 'desc' }
    });
  });
}

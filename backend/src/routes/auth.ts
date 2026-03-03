import { FastifyInstance } from 'fastify';
import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma';
import { z } from 'zod';

export async function authRoutes(app: FastifyInstance) {
  // Register with Organization creation
  app.post('/register', async (req, reply) => {
    const { email, password, name, orgName } = z.object({
      email: z.string().email(),
      password: z.string().min(6),
      name: z.string().optional(),
      orgName: z.string().min(3)
    }).parse(req.body as any);

    const hashedPassword = await bcrypt.hash(password, 12);

    try {
      const result = await prisma.$transaction(async (tx) => {
        const organization = await tx.organization.create({
          data: {
            name: orgName,
            slug: orgName.toLowerCase().replace(/\s+/g, '-'),
          }
        });

        const user = await tx.user.create({
          data: {
            email,
            name,
            hashedPassword,
            organizationId: organization.id,
            role: 'admin'
          }
        });

        return { user, organization };
      });

      const token = await reply.jwtSign({
        userId: result.user.id,
        orgId: result.organization.id,
        role: result.user.role
      });

      return { token, user: result.user, organization: result.organization };
    } catch (error: any) {
      if (error.code === 'P2002') {
        return reply.status(400).send({ error: 'Email or Organization slug already exists' });
      }
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  });

  // Login
  app.post('/login', async (req, reply) => {
    const { email, password } = z.object({
      email: z.string().email(),
      password: z.string()
    }).parse(req.body as any);

    const user = await prisma.user.findUnique({
      where: { email },
      include: { organization: true }
    });

    if (!user || !(await bcrypt.compare(password, user.hashedPassword))) {
      return reply.status(401).send({ error: 'Invalid email or password' });
    }

    const token = await reply.jwtSign({
      userId: user.id,
      orgId: user.organizationId,
      role: user.role
    });

    return { token, user };
  });

  // Wallet Sync (Rabby integration)
  app.post('/wallet/sync', async (req, reply) => {
    const { walletAddress } = z.object({ walletAddress: z.string() }).parse(req.body as any);

    let user = await prisma.user.findUnique({
      where: { wallet: walletAddress.toLowerCase() },
      include: { organization: true }
    });

    if (!user) {
      // Create a default organization for wallet users if they don't have one
      const orgName = `Org ${walletAddress.slice(0, 6)}`;
      const organization = await prisma.organization.create({
        data: {
          name: orgName,
          slug: `wallet-${walletAddress.toLowerCase().slice(0, 10)}`,
        }
      });

      user = await prisma.user.create({
        data: {
          email: `${walletAddress.toLowerCase()}@quantum.wallet`,
          wallet: walletAddress.toLowerCase(),
          hashedPassword: 'wallet-authenticated',
          organizationId: organization.id,
          role: 'admin'
        },
        include: { organization: true }
      });
    }

    const token = await reply.jwtSign({
      userId: user.id,
      orgId: user.organizationId,
      role: user.role
    });

    return { token, user };
  });
}

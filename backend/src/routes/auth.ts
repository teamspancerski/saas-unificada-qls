import { FastifyInstance } from 'fastify';
import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma';
import { z } from 'zod';

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', async (req, reply) => {
    const { email, password, name } = z.object({
      email: z.string().email(),
      password: z.string().min(6),
      name: z.string().optional()
    }).parse(req.body as any);

    const hashedPassword = await bcrypt.hash(password, 12);

    try {
      const user = await prisma.user.create({
        data: { email, name, hashedPassword }
      });
      return reply.jwtSign({ userId: user.id });
    } catch (error) {
      return reply.status(400).send({ error: 'Email already exists' });
    }
  });
}

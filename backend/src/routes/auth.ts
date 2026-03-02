import { FastifyInstance } from 'fastify';
import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma';
import { z } from 'zod';

export async function authRoutes(app: FastifyInstance) {
  // Lawyer Register
  app.post('/register/lawyer', async (req, reply) => {
    const { email, password, name, OAB_UF, OAB_Number, specialties } = z.object({
      email: z.string().email(),
      password: z.string().min(6),
      name: z.string(),
      OAB_UF: z.string(),
      OAB_Number: z.string(),
      specialties: z.array(z.string())
    }).parse(req.body as any);

    const hashedPassword = await bcrypt.hash(password, 12);

    try {
      const lawyer = await prisma.lawyerProfile.create({
        data: {
          email,
          password: hashedPassword,
          name,
          OAB_UF,
          OAB_Number,
          Specialties: specialties,
          Subscription_Status: 'inactive'
        }
      });
      const token = app.jwt.sign({ id: lawyer.id, role: 'lawyer' });
      return { token, lawyer };
    } catch (error) {
      return reply.status(400).send({ error: 'Email already exists' });
    }
  });

  // Lawyer Login
  app.post('/login/lawyer', async (req, reply) => {
    const { email, password } = z.object({
      email: z.string().email(),
      password: z.string()
    }).parse(req.body as any);

    const lawyer = await prisma.lawyerProfile.findUnique({
      where: { email }
    });

    if (!lawyer || !(await bcrypt.compare(password, lawyer.password))) {
      return reply.status(401).send({ error: 'Invalid credentials' });
    }

    const token = app.jwt.sign({ id: lawyer.id, role: 'lawyer' });
    return { token, lawyer };
  });

  // Client Identification (minimal for triage context)
  app.post('/client/sync', async (req, reply) => {
    const { email, name } = z.object({
      email: z.string().email().optional(),
      name: z.string().optional()
    }).parse(req.body as any);

    if (email) {
      const client = await prisma.client.upsert({
        where: { email },
        update: { name },
        create: { email, name }
      });
      return client;
    }

    return prisma.client.create({ data: { name } });
  });
}

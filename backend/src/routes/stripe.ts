import { FastifyInstance } from 'fastify';
import Stripe from 'stripe';
import { prisma } from '../lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function stripeRoutes(app: FastifyInstance) {
  app.post('/create-checkout', async (req) => {
    const { userId, priceId } = req.body as { userId: string; priceId: string };
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    const session = await stripe.checkout.sessions.create({
      customer: user.stripeCustomerId || undefined,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:3001'}/success`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3001'}/cancel`,
      metadata: { userId }
    });

    return { url: session.url };
  });
}

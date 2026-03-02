import { FastifyInstance } from 'fastify';
import Stripe from 'stripe';
import { prisma } from '../lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

const PRICE_IDS = {
  Essential: 'price_essential_id',
  Professional: 'price_professional_id',
  Elite: 'price_elite_id'
};

export const stripeRoutes = async (fastify: FastifyInstance) => {
  // Create Checkout Session
  fastify.post('/stripe/checkout', { preHandler: [fastify.authenticate] }, async (request: any, reply) => {
    const { id: lawyerId } = request.user;
    const { planLevel } = request.body;

    const lawyer = await prisma.lawyerProfile.findUnique({ where: { id: lawyerId } });
    if (!lawyer) throw new Error('Lawyer not found');

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: (PRICE_IDS as any)[planLevel], quantity: 1 }],
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_URL}/dashboard?success=true`,
      cancel_url: `${process.env.FRONTEND_URL}/plans`,
      customer_email: lawyer.email,
      metadata: { lawyerId, planLevel }
    });

    return { url: session.url };
  });

  // Webhook
  fastify.post('/stripe/webhook', { config: { rawBody: true } }, async (request: any, reply) => {
    const sig = request.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent((request as any).rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (err: any) {
      return reply.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const { lawyerId, planLevel } = session.metadata!;

      await prisma.lawyerProfile.update({
        where: { id: lawyerId },
        data: {
          Plan_Level: planLevel,
          Subscription_Status: 'active',
          Stripe_Customer_ID: session.customer as string
        }
      });

      await prisma.subscription.create({
        data: {
          lawyer_id: lawyerId,
          Plan_ID: planLevel,
          Stripe_Subscription_ID: session.subscription as string,
          status: 'active'
        }
      });
    }

    return { received: true };
  });
};

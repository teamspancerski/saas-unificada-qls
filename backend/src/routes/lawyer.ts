import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';
import { GeoService } from '../lib/geo';

export const lawyerRoutes = async (fastify: FastifyInstance) => {
  // Discovery
  fastify.get('/lawyers/discover', async (request: any, reply) => {
    const { specialty, lat, lng, radius } = request.query;
    const lawyers = await GeoService.findLawyers({
      specialty,
      lat: lat ? parseFloat(lat) : undefined,
      lng: lng ? parseFloat(lng) : undefined,
      radiusKm: radius ? parseInt(radius) : undefined
    });
    return lawyers;
  });

  // Profile Management
  fastify.get('/lawyers/profile/:id', async (request: any, reply) => {
    return prisma.lawyerProfile.findUnique({
      where: { id: request.params.id },
      include: { cases: true, subscriptions: true }
    });
  });

  fastify.post('/lawyers/update', { preHandler: [fastify.authenticate] }, async (request: any, reply) => {
    const { id } = request.user;
    return prisma.lawyerProfile.update({
      where: { id },
      data: request.body
    });
  });
};

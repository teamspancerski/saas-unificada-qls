import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';
import { AuditService } from '../lib/audit';

export const caseRoutes = async (fastify: FastifyInstance) => {
  // Get Lawyer Cases
  fastify.get('/cases', { preHandler: [fastify.authenticate] }, async (request: any, reply) => {
    const { id } = request.user;
    return prisma.case.findMany({
      where: { lawyer_id: id },
      include: { client: true, vaults: true }
    });
  });

  // Create Case (from triage)
  fastify.post('/cases/create', { preHandler: [fastify.authenticate] }, async (request: any, reply) => {
    const { id } = request.user;
    const { triageId, clientId, status, timeline } = request.body;

    const newCase = await prisma.case.create({
      data: {
        lawyer_id: id,
        client_id: clientId,
        status: status || 'Active',
        timeline_json: timeline || []
      }
    });

    await AuditService.logAction({
      userId: id,
      action: `CASE_CREATED: ${newCase.id}`,
      ip: request.ip
    });

    return newCase;
  });

  // Get Case Details
  fastify.get('/cases/:id', { preHandler: [fastify.authenticate] }, async (request: any, reply) => {
    const { id: lawyerId } = request.user;
    return prisma.case.findFirst({
      where: { id: request.params.id, lawyer_id: lawyerId },
      include: { client: true, vaults: true }
    });
  });

  // Update Case
  fastify.put('/cases/:id', { preHandler: [fastify.authenticate] }, async (request: any, reply) => {
    const { id: lawyerId } = request.user;
    return prisma.case.update({
      where: { id: request.params.id, lawyer_id: lawyerId },
      data: request.body
    });
  });
};

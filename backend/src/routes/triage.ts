import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';
import { AIService } from '../lib/ai-triage';
import { v4 as uuidv4 } from 'uuid';

export const triageRoutes = async (fastify: FastifyInstance) => {
  // Start Triage Session
  fastify.post('/triage/start', async (request: any, reply) => {
    const sessionId = uuidv4();
    const triage = await prisma.triage.create({
      data: {
        session_id: sessionId,
        intake_data: {}
      }
    });
    return { sessionId };
  });

  // Process Triage Data
  fastify.post('/triage/process/:sessionId', async (request: any, reply) => {
    const { sessionId } = request.params;
    const intakeData = request.body;
    const result = await AIService.processTriage(sessionId, intakeData);
    return result;
  });

  // Triage Details
  fastify.get('/triage/:sessionId', async (request: any, reply) => {
    return prisma.triage.findUnique({
      where: { session_id: request.params.sessionId }
    });
  });
};

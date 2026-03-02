import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';
import { EncryptionService } from '../lib/encryption';
import { AuditService } from '../lib/audit';

export const vaultRoutes = async (fastify: FastifyInstance) => {
  // Upload/Store document reference with encryption
  fastify.post('/vault/store', { preHandler: [fastify.authenticate] }, async (request: any, reply) => {
    const { id: lawyerId } = request.user;
    const { caseId, documentName, content } = request.body;

    // In a real app, 'content' would be a file buffer. Here we encrypt a mock reference/metadata.
    const encryptedRef = EncryptionService.encrypt(content || `REF_${documentName}`);

    const vaultEntry = await prisma.vault.create({
      data: {
        document_id: `DOC_${Date.now()}`,
        case_id: caseId,
        encryption_key_ref: encryptedRef,
      }
    });

    await AuditService.logAction({
      userId: lawyerId,
      action: `DOCUMENT_STORED: ${vaultEntry.id}`,
      ip: request.ip
    });

    return vaultEntry;
  });

  // Access/Decrypt document reference
  fastify.get('/vault/access/:id', { preHandler: [fastify.authenticate] }, async (request: any, reply) => {
    const { id: lawyerId } = request.user;
    const { id } = request.params;

    const entry = await prisma.vault.findUnique({
      where: { id },
      include: { case: true }
    });

    if (!entry || entry.case.lawyer_id !== lawyerId) {
      return reply.status(403).send({ error: 'Unauthorized access to vault' });
    }

    const decryptedContent = EncryptionService.decrypt(entry.encryption_key_ref);

    await AuditService.logAction({
      userId: lawyerId,
      action: `DOCUMENT_ACCESSED: ${entry.id}`,
      ip: request.ip
    });

    return { ...entry, decryptedContent };
  });
};

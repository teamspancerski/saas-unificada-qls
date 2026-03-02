import { prisma } from './prisma';

export const AuditService = {
  /**
   * Records immutable administrative actions
   */
  async logAction(params: {
    userId?: string;
    action: string;
    ip?: string;
  }) {
    const { userId, action, ip } = params;
    return prisma.auditLog.create({
      data: {
        user_id: userId,
        action,
        ip_address: ip,
        timestamp: new Date()
      }
    });
  }
};

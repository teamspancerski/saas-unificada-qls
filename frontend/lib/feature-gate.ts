export const FeatureGate = {
  /**
   * Check if a lawyer has access to a specific feature based on their plan level.
   */
  hasAccess(plan: string, feature: string): boolean {
    const tiers: any = {
      Essential: ['vault_basic', '3_specialties', '15_cases'],
      Professional: ['vault_basic', 'unlimited_cases', 'ai_summary', 'deadline_alerts', 'geo_priority'],
      Elite: ['vault_basic', 'unlimited_cases', 'ai_summary', 'deadline_alerts', 'geo_priority', 'whitelabel', 'ai_risk', '5_users', 'priority_support']
    };

    return tiers[plan]?.includes(feature) || false;
  }
};

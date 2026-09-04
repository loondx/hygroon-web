/**
 * @hygroon/brand
 * Central brand configuration, philosophy, messaging, and identity assets.
 */

export interface HygroonBrandConfig {
  name: string;
  pronunciation: string;
  tagline: string;
  valueProposition: string;
  competitiveHeadline: string;
  supportingCopy: string;
  primaryCTA: string;
  secondaryCTA: string;
  website: string;
  consoleUrl: string;
  apiUrl: string;
  supportEmail: string;
  salesEmail: string;
  billingEmail: string;
  securityEmail: string;
  legalEntity?: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  };
  subBrands: {
    growth: string;
    os: string;
    radar: string;
    diagnostic: string;
    insights: string;
  };
}

function getEnv(key: string): string | undefined {
  if (typeof globalThis !== 'undefined' && 'process' in globalThis) {
    const proc = globalThis as { process?: { env?: Record<string, string | undefined> } };
    return proc.process?.env?.[key];
  }
  return undefined;
}

export const brandConfig: HygroonBrandConfig = {
  name: 'Hygroon',
  pronunciation: 'Hi-Groon',
  tagline: 'Growth Systems for Service Businesses',
  valueProposition: 'Turn More Demand Into Revenue.',
  competitiveHeadline: 'See Why Competitors Get The Job.',
  supportingCopy: "We show where you're losing local demand, and what to fix first.",
  primaryCTA: 'Analyze My Business',
  secondaryCTA: 'See Sample',
  website: getEnv('HYGROON_WEBSITE_URL') || 'https://hygroon.com',
  consoleUrl: getEnv('HYGROON_CONSOLE_URL') || 'https://app.hygroon.com',
  apiUrl: getEnv('HYGROON_API_URL') || 'https://api.hygroon.com',
  supportEmail: 'support@hygroon.com',
  salesEmail: 'growth@hygroon.com',
  billingEmail: 'billing@hygroon.com',
  securityEmail: 'security@hygroon.com',
  legalEntity: getEnv('HYGROON_LEGAL_ENTITY'),
  socials: {
    linkedin: 'https://linkedin.com/company/hygroon',
  },
  subBrands: {
    growth: 'Hygroon Growth',
    os: 'Hygroon OS',
    radar: 'Hygroon Radar',
    diagnostic: 'Hygroon Diagnostic',
    insights: 'Hygroon Insights',
  },
};

/**
 * Returns formatted legal attribution string only if a verified entity is configured.
 */
export function getLegalAttribution(): string | null {
  if (brandConfig.legalEntity && brandConfig.legalEntity.trim().length > 0) {
    return `Hygroon is a trading brand of ${brandConfig.legalEntity}.`;
  }
  return null;
}

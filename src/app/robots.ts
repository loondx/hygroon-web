import type { MetadataRoute } from 'next';
// Imports directly from the workspace package (not the local '@/config/
// brand.config' wrapper every other app file uses) so this stays importable
// by the plain node:test runner, which doesn't resolve tsconfig path
// aliases — see seo.spec.ts.
import { brandConfig } from '@servnexa/brand';

// Token-gated routes carry real business/contact data and must never be
// crawlable — see the sibling noindex layouts under reports/proposals/
// onboarding for the meta-level enforcement of the same rule.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/reports/', '/proposals/', '/onboarding/', '/api/'],
    },
    sitemap: `${brandConfig.website}/sitemap.xml`,
  };
}

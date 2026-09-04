import type { MetadataRoute } from 'next';
// Imports directly from the workspace package (not the local '@/config/
// brand.config' wrapper every other app file uses) so this stays importable
// by the plain node:test runner, which doesn't resolve tsconfig path
// aliases — see seo.spec.ts.
import { brandConfig } from '../shared/brand/index.ts';

// Token-gated routes carry real business/contact data and must never be
// crawlable — see the sibling noindex layouts under reports/proposals/
// onboarding for the meta-level enforcement of the same rule.
export default function robots(): MetadataRoute.Robots {
  const privateDisallows = ['/reports/', '/proposals/', '/onboarding/', '/api/'];

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: privateDisallows,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: privateDisallows,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: privateDisallows,
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
        disallow: privateDisallows,
      },
      {
        userAgent: 'Claude-SearchBot',
        allow: '/',
        disallow: privateDisallows,
      },
      {
        userAgent: 'Claude-User',
        allow: '/',
        disallow: privateDisallows,
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: privateDisallows,
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: privateDisallows,
      },
    ],
    sitemap: `${brandConfig.website}/sitemap.xml`,
  };
}

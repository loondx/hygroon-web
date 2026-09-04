import type { MetadataRoute } from 'next';
// See robots.ts for why this imports the workspace package directly.
import { brandConfig } from '@servnexa/brand';

// Static public routes only — no token routes (/reports, /proposals,
// /onboarding), no generated per-business URLs. New pages must be added here
// deliberately, not discovered by a crawler that walked a link graph.
const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '', priority: 1, changeFrequency: 'weekly' },
  { path: '/analyze', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/industries', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/industries/hvac', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/industries/waterproofing', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/industries/property-maintenance', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/industries/drainage', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/industries/water-restoration', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/industries/pest-control', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/industries/pool-services', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/industries/facility-services', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/insights', priority: 0.5, changeFrequency: 'weekly' },
  { path: '/results', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/security', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/contact', priority: 0.4, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // No lastModified — there's no reliable per-route content-change
  // timestamp source (no CMS, no git-derived build metadata wired in).
  // Stamping every route with the sitemap's own generation time would
  // imply upload-time freshness data that doesn't actually exist.
  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${brandConfig.website}${path}`,
    changeFrequency,
    priority,
  }));
}

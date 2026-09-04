import type { MetadataRoute } from 'next';
import { brandConfig } from '../shared/brand/index.ts';

const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/industries/hvac', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/analyze', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/growth-review', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/industries', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/industries/waterproofing', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/industries/property-maintenance', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/industries/drainage', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/industries/water-restoration', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/industries/pest-control', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/industries/pool-services', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/industries/facility-services', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/insights', priority: 0.6, changeFrequency: 'weekly' },
  { path: '/results', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/security', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/contact', priority: 0.5, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${brandConfig.website}${path}`,
    changeFrequency,
    priority,
  }));
}

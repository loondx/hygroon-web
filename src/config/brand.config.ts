import { brandConfig, getLegalAttribution, type HygroonBrandConfig } from '../shared/brand/index.ts';
import { SUPPORTED_MARKETS, INDUSTRY_GROUPS } from '../shared/config/index.ts';

export const brand = {
  ...brandConfig,
  logo: '/logo.svg',
  favicon: '/logo.svg',
};

export { brandConfig, getLegalAttribution, SUPPORTED_MARKETS, INDUSTRY_GROUPS };
export type { HygroonBrandConfig };

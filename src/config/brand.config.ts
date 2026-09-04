import { brandConfig, getLegalAttribution, type ServnexaBrandConfig } from '@servnexa/brand';
import { SUPPORTED_MARKETS, INDUSTRY_GROUPS } from '@servnexa/config';

export const brand = {
  ...brandConfig,
  logo: '/logo.svg',
  favicon: '/logo.svg',
};

export { brandConfig, getLegalAttribution, SUPPORTED_MARKETS, INDUSTRY_GROUPS };
export type { ServnexaBrandConfig };

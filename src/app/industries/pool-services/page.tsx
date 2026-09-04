import type { Metadata } from 'next';
import IndustryPageTemplate from '@/components/IndustryPageTemplate';
import { MapPin, Star, PhoneCall, RefreshCw, Waves } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pool Services Growth System',
  description:
    'Pool services split between recurring maintenance contracts and urgent equipment failure repairs. Both require targeted response systems.',
  alternates: { canonical: '/industries/pool-services' },
};

export default function PoolServicesIndustryPage() {
  return (
    <IndustryPageTemplate
      slug="pool-services"
      breadcrumbName="Pool Services"
      badgeLabel="Pool Services"
      badgeIcon={Waves}
      heroTitle="The Pool Services Growth System"
      heroBody="Pool businesses operate two distinct demand streams: recurring weekly maintenance and urgent pump or heater repairs. Both must convert smoothly."
      pillars={[
        {
          icon: MapPin,
          title: 'Local Search Visibility',
          body: '"Pool cleaning service" and "pool pump repair" drive Maps-first local searches. Prominence in local results puts your company on the homeowner shortlist.',
        },
        {
          icon: Star,
          title: 'Review Velocity & Trust',
          body: 'Pool owners want reliable technicians in their yard. Recent positive reviews reinforce trust and set your business apart from casual competitors.',
        },
        {
          icon: PhoneCall,
          title: 'Rapid Repair Call Response',
          body: 'When a pool turns green or a pump fails right before a weekend, fast phone response wins the repair contract immediately.',
        },
        {
          icon: RefreshCw,
          title: 'Weekly Maintenance Reactivation',
          body: 'Converting one-time repair customers into steady weekly maintenance subscribers builds recurring cash flow.',
        },
      ]}
      ctaTitle="See where your pool service business stands"
      ctaBody="A free analysis of your local search presence, review recency, and customer retention workflow."
    />
  );
}

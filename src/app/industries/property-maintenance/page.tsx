import type { Metadata } from 'next';
import IndustryPageTemplate from '@/components/IndustryPageTemplate';
import { MapPin, ShieldCheck, PhoneCall, RefreshCw, Home } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Property Maintenance Growth System',
  description:
    'Property maintenance growth relies on recurring contract retention and quick local search visibility for urgent repairs.',
  alternates: { canonical: '/industries/property-maintenance' },
};

export default function PropertyMaintenanceIndustryPage() {
  return (
    <IndustryPageTemplate
      slug="property-maintenance"
      breadcrumbName="Property Maintenance"
      badgeLabel="Property Maintenance"
      badgeIcon={Home}
      heroTitle="The Property Maintenance Growth System"
      heroBody="Property maintenance companies balance scheduled contract services with urgent repair calls. Here is what keeps both revenue streams operating at full capacity."
      pillars={[
        {
          icon: MapPin,
          title: 'Local Service Area Visibility',
          body: 'Appearing in the local search pack for property upkeep, handyman, and maintenance contracts ensures steady inbound demand from local property owners.',
        },
        {
          icon: ShieldCheck,
          title: 'Transparent Pricing & Service Scope',
          body: 'Detailed service packages and clear contract terms build immediate trust with landlords, estate managers, and homeowners.',
        },
        {
          icon: PhoneCall,
          title: 'Fast Enquiry Routing',
          body: 'Property managers expect prompt callbacks. Fast phone response and clear scheduling pathways capture commercial and residential leads.',
        },
        {
          icon: RefreshCw,
          title: 'Contract Renewal Automation',
          body: 'Systematic client communication and annual contract renewal checks maximize client lifetime value and lower churn.',
        },
      ]}
      ctaTitle="See where your property maintenance business stands"
      ctaBody="A free analysis of your local search presence, enquiry handling, and client retention workflow."
    />
  );
}

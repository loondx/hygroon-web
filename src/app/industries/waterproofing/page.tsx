import type { Metadata } from 'next';
import IndustryPageTemplate from '@/components/IndustryPageTemplate';
import { MapPin, ShieldCheck, FileCheck, CheckCircle2, Droplets } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Waterproofing Growth System',
  description:
    'Waterproofing is a considered purchase. Trust, portfolio evidence, and quote follow-up decide who wins a multi-quote job.',
  alternates: { canonical: '/industries/waterproofing' },
};

export default function WaterproofingIndustryPage() {
  return (
    <IndustryPageTemplate
      slug="waterproofing"
      breadcrumbName="Waterproofing"
      badgeLabel="Waterproofing"
      badgeIcon={Droplets}
      heroTitle="The Waterproofing Growth System"
      heroBody="A waterproofing job is rarely booked same-day. A homeowner or facility manager who spots a leak usually gets three quotes before deciding. Here is what determines which contractor gets the contract."
      pillars={[
        {
          icon: MapPin,
          title: 'High-Intent Search Visibility',
          body: 'Sub-grade waterproofing, roof sealing, and basement tanking are high-ticket services. Ranking locally when a property owner searches for specialized solutions builds instant authority.',
        },
        {
          icon: ShieldCheck,
          title: 'Portfolio & Case Evidence',
          body: 'This is a considered purchase where buyers want proof. A site with clear project documentation and before-and-after photos closes more quotes than stock imagery.',
        },
        {
          icon: FileCheck,
          title: 'Quote Follow-Up System',
          body: 'With three quotes in hand, the decision usually goes to whoever follows up with professional clarity, not necessarily whoever quoted lowest.',
        },
        {
          icon: CheckCircle2,
          title: 'Warranty & Guarantee Proof',
          body: 'Plainly stating long-term warranty coverage upfront eliminates final buyer hesitation on multi-thousand dollar proposals.',
        },
      ]}
      ctaTitle="See where your waterproofing business stands"
      ctaBody="A free analysis of your local visibility, portfolio presentation, and quote-to-close process specific to your service area."
    />
  );
}

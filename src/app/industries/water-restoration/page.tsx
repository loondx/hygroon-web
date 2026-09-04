import type { Metadata } from 'next';
import IndustryPageTemplate from '@/components/IndustryPageTemplate';
import { MapPin, ShieldCheck, MonitorSmartphone, PhoneCall, FileCheck, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Water Damage Restoration Growth System',
  description:
    'Water damage restoration is a high-value emergency trade. Response speed decides who gets the initial callout, and insurance process clarity decides who keeps the full job.',
  alternates: { canonical: '/industries/water-restoration' },
};

export default function WaterRestorationIndustryPage() {
  return (
    <IndustryPageTemplate
      slug="water-restoration"
      breadcrumbName="Water Damage Restoration"
      badgeLabel="Water Damage Restoration"
      badgeIcon={AlertTriangle}
      heroTitle="The Water Damage Restoration Growth System"
      heroBody="A flood or major leak call is one of the highest-urgency, highest-value calls a home service business can receive. Here is what determines who wins the job past the first callout."
      pillars={[
        {
          icon: MapPin,
          title: 'Local Visibility',
          body: '"Water damage restoration" and "flood cleanup" searches happen in a panic, close to home. Ranking in the local pack for those exact terms is what gets a business considered in the first place.',
        },
        {
          icon: ShieldCheck,
          title: 'Credentials and Trust',
          body: 'Because mold and structural risk are real consequences of delay, certifications and documented process matter more here than in most trades. A site that states them plainly reduces hesitation on an already stressful call.',
        },
        {
          icon: MonitorSmartphone,
          title: '24/7 Website Clarity',
          body: 'Water damage does not happen during standard business hours. A site that does not make after-hours availability obvious loses callers to whichever competitor site does.',
        },
        {
          icon: PhoneCall,
          title: 'Response Speed',
          body: 'Minutes matter because structural damage and mold risk compound quickly. The business that gets someone on-site fastest usually keeps the full restoration job, not just the initial callout.',
        },
        {
          icon: FileCheck,
          title: 'Insurance Process Follow-Up',
          body: 'Much of this trade runs through insurance claims. A clear, well-documented follow-up process for the paperwork side is often what converts an emergency callout into the full restoration contract.',
        },
      ]}
      ctaTitle="See where your restoration business stands"
      ctaBody="A free analysis of your local visibility, response readiness, and competitors specific to your service area."
    />
  );
}

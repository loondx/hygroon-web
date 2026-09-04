import type { Metadata } from 'next';
import IndustryPageTemplate from '@/components/IndustryPageTemplate';
import { ShieldCheck, FileCheck, PhoneCall, RefreshCw, Building2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Facility Services Growth System',
  description:
    'Facility services contracts are won on procurement-grade credibility and proposal speed, not consumer search visibility.',
  alternates: { canonical: '/industries/facility-services' },
};

export default function FacilityServicesIndustryPage() {
  return (
    <IndustryPageTemplate
      slug="facility-services"
      breadcrumbName="Facility Services"
      badgeLabel="Facility Services"
      badgeIcon={Building2}
      heroTitle="The Facility Services Growth System"
      heroBody="Commercial facility contracts are won through RFP responsiveness, institutional credibility, and proposal speed. Here is what drives B2B facility growth."
      pillars={[
        {
          icon: ShieldCheck,
          title: 'B2B Proof & Credibility',
          body: 'Documenting comparable property management projects by scale and facility type builds instant confidence with commercial procurement managers.',
        },
        {
          icon: FileCheck,
          title: 'Proposal Turnaround Speed',
          body: 'Returning structured, professional proposals promptly keeps your company at the top of RFP shortlists before price comparisons begin.',
        },
        {
          icon: PhoneCall,
          title: 'Reactive Request Routing',
          body: 'How quickly urgent commercial callouts are dispatched determines long-term account retention and contract satisfaction.',
        },
        {
          icon: RefreshCw,
          title: 'Multi-Year Account Expansion',
          body: 'Expanding existing building services and securing multi-year contract renewals is the single largest growth lever in commercial facility services.',
        },
      ]}
      ctaTitle="See where your facility services business stands"
      ctaBody="A free analysis of your credibility presentation, proposal workflow, and commercial account retention systems."
    />
  );
}

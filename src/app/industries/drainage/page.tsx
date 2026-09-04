import type { Metadata } from 'next';
import IndustryPageTemplate from '@/components/IndustryPageTemplate';
import { MapPin, Star, MonitorSmartphone, PhoneCall, Waves } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Drainage & Wastewater Growth System',
  description:
    'A blocked drain is an emergency call, not a research project. Local visibility and answer speed decide who gets the job, usually within minutes.',
  alternates: { canonical: '/industries/drainage' },
};

export default function DrainageIndustryPage() {
  return (
    <IndustryPageTemplate
      slug="drainage"
      breadcrumbName="Drainage & Wastewater"
      badgeLabel="Drainage & Wastewater"
      badgeIcon={Waves}
      heroTitle="The Drainage Growth System"
      heroBody="A blocked drain or overflowing tank does not wait for a comparison shopper. The caller wants someone on-site today. Here is what determines whether that caller finds you first."
      pillars={[
        {
          icon: MapPin,
          title: 'Maps Pack Prominence',
          body: 'Almost every drainage job starts with a phone-in-hand search like "blocked drain near me". The Google Maps 3-pack is usually the entire shortlist. Not showing up there means not being called.',
        },
        {
          icon: Star,
          title: 'Review Recency',
          body: 'Homeowners dealing with a backup want reassurance fast. Recent reviews mentioning quick response time and clean work carry massive weight when picking a contractor.',
        },
        {
          icon: MonitorSmartphone,
          title: 'Direct Click-to-Call',
          body: 'A visitor with an active backup is not reading lengthy paragraphs. A mobile site with an unmissable click-to-call button captures the enquiry before they bounce.',
        },
        {
          icon: PhoneCall,
          title: 'Dispatch and Answer Speed',
          body: 'For an urgent callout trade, the business that answers the phone (not the one with the fanciest site) gets the job. A missed call here is close to a lost job.',
        },
      ]}
      ctaTitle="See where your drainage business stands"
      ctaBody="A free analysis of your local visibility, review strength, and response speed specific to your service area."
    />
  );
}

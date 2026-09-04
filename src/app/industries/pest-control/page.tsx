import type { Metadata } from 'next';
import IndustryPageTemplate from '@/components/IndustryPageTemplate';
import { MapPin, Star, PhoneCall, RefreshCw, Bug } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pest Control Growth System',
  description:
    'Pest control revenue splits between one-off urgent treatments and recurring plans. The durable money is in the renewal, not the first visit.',
  alternates: { canonical: '/industries/pest-control' },
};

export default function PestControlIndustryPage() {
  return (
    <IndustryPageTemplate
      slug="pest-control"
      breadcrumbName="Pest Control"
      badgeLabel="Pest Control"
      badgeIcon={Bug}
      heroTitle="The Pest Control Growth System"
      heroBody="Pest control businesses run two revenue engines: initial urgent callouts and recurring maintenance plans. Here is what keeps both converting consistently."
      pillars={[
        {
          icon: MapPin,
          title: 'Local Search Prominence',
          body: '"Pest control near me" and "termite inspection" are urgent local searches. Showing up in the Maps pack for them is what puts a business on the caller shortlist.',
        },
        {
          icon: Star,
          title: 'Trust & Review Velocity',
          body: 'Letting a technician into the home to treat for pests requires high trust. Recent positive reviews reassure a first-time caller far more than an old, static rating.',
        },
        {
          icon: PhoneCall,
          title: 'First Contact Response Speed',
          body: 'An active infestation is treated as urgent by the customer. A slow callback on that first inquiry often loses the job to whoever answered first.',
        },
        {
          icon: RefreshCw,
          title: 'Recurring Contract Retention',
          body: 'The one-off treatment is rarely where the real revenue lives: it is the recurring maintenance plan that follows. A defined renewal and reminder process is vital in this trade.',
        },
      ]}
      ctaTitle="See where your pest control business stands"
      ctaBody="A free analysis of your local visibility, review strength, and recurring-plan retention specific to your service area."
    />
  );
}

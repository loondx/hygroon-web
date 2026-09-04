import type { Metadata } from 'next';
import IndustryPageTemplate from '@/components/IndustryPageTemplate';
import { MapPin, Star, MonitorSmartphone, PhoneCall, FileCheck, Compass, Clock, Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'HVAC Growth Systems',
  description:
    'Growth systems for HVAC companies. Learn where HVAC businesses lose local search visibility, website conversion, missed calls, and quote follow-up.',
  alternates: { canonical: '/industries/hvac' },
};

export default function HvacIndustryPage() {
  return (
    <IndustryPageTemplate
      slug="hvac"
      breadcrumbName="HVAC"
      badgeLabel="HVAC & Air Conditioning"
      badgeIcon={Compass}
      heroTitle="Growth Systems for HVAC Companies"
      heroBody="HVAC is an emergency-first trade. Most jobs start with a homeowner searching in a hurry and calling the first business that looks credible and answers fast. Here is where that process breaks down and what to fix first."
      sections={[
        {
          title: 'Where HVAC Companies Lose Enquiries',
          body: 'Most HVAC contractors lose high-intent local leads long before a technician ever steps foot in a driveway. Bottlenecks occur across search visibility, website conversion, phone response, and quote follow-up.',
          pillars: [
            {
              icon: MapPin,
              title: 'Maps Pack Absence',
              body: 'When an AC unit fails in peak heat, homeowners search and call within minutes. If your business is missing from the Google Maps 3-pack for key service terms, callers pick competitors.',
            },
            {
              icon: Star,
              title: 'Stale Review Cadence',
              body: 'A homeowner comparing three HVAC businesses reads recent reviews, not just total star counts. Recent review velocity signals active reliability.',
            },
          ],
        },
        {
          title: 'Local Search and Google Visibility',
          body: 'Organic visibility for HVAC services depends on localized intent. Capturing local search traffic requires a complete Google Business Profile, active service-area signals, and consistent review acquisition.',
          pillars: [
            {
              icon: Search,
              title: 'High-Intent Service Searches',
              body: 'Ranking for terms like "AC repair near me" or "emergency heating fix" puts your phone number directly in front of homeowners ready to hire immediately.',
            },
            {
              icon: MapPin,
              title: 'Service-Area Coverage',
              body: 'Ensuring your business profile accurately reflects all surrounding townships and suburban zip codes maximizes local Map Pack placement.',
            },
          ],
        },
        {
          title: 'From HVAC Website Visit to Service Call',
          body: 'A mobile visitor experiencing a heating or cooling emergency needs immediate clarity. Unclear service areas, slow load times, or hidden call buttons cause immediate drop-offs.',
          pillars: [
            {
              icon: MonitorSmartphone,
              title: 'Mobile Click-to-Call',
              body: 'Over 80% of emergency HVAC searches happen on smartphone devices. One-tap call buttons and fast mobile performance turn visits into immediate dispatch calls.',
            },
            {
              icon: FileCheck,
              title: 'Upfront Service Assurance',
              body: 'Clear listings of licensed technicians, emergency availability, and straightforward dispatch procedures reduce buyer hesitation on stressful calls.',
            },
          ],
        },
        {
          title: 'After-Hours and Missed Enquiry Opportunities',
          body: 'AC failures do not follow standard business hours. Unanswered phone calls and unmonitored evening contact forms are immediately answered by competing contractors.',
          pillars: [
            {
              icon: PhoneCall,
              title: 'Instant Missed Call Recovery',
              body: 'Automated SMS responses sent to missed callers within seconds prevent homeowners from hanging up and ringing the next contractor on Google.',
            },
            {
              icon: Clock,
              title: 'After-Hours Form Capture',
              body: 'Dedicated evening enquiry routing ensures late-night emergency requests are acknowledged instantly with first-thing morning scheduling options.',
            },
          ],
        },
        {
          title: 'Booking and Follow-Up',
          body: 'Systematizing quote follow-ups and maintenance reminders turns single service calls into predictable recurring revenue.',
          pillars: [
            {
              icon: FileCheck,
              title: 'Estimate Follow-Up Cadence',
              body: 'Systematic follow-up on open equipment replacement quotes ensures higher closing rates before homeowners solicit competing bids.',
            },
            {
              icon: Star,
              title: 'Seasonal Tune-Up Reactivation',
              body: 'Automated seasonal reminders for spring AC checkups and autumn heating inspections keep your existing customer base active and loyal.',
            },
          ],
        },
        {
          title: 'What Servnexa Looks At',
          body: 'Our diagnostic evaluates your complete customer growth path: local search prominence, mobile response speed, review recency, missed call handling, and quote follow-up workflows.',
        },
      ]}
      ctaTitle="Analyze Your HVAC Business"
      ctaBody="Get a free snapshot of your HVAC company's local visibility, review velocity, response speed, and market positioning."
    />
  );
}

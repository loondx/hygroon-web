import type { Metadata } from "next";
import IndustryPageTemplate from "@/components/IndustryPageTemplate";
import { MapPin, Star, MonitorSmartphone, PhoneCall, FileCheck, Compass, Clock, Search, ShieldCheck, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "HVAC Local SEO & Digital Marketing Agency | Hygroon",
  description:
    "Hygroon is the premier Local SEO and growth agency for HVAC contractors. Rank #1 on Google Maps 3-Pack, dominate local AC repair searches, capture missed calls with SMS textback, and turn emergency search demand into high-margin booked HVAC jobs.",
  keywords: [
    "HVAC Local SEO Agency",
    "HVAC Digital Marketing Agency",
    "Local SEO for HVAC Contractors",
    "Google Maps 3-Pack for HVAC",
    "HVAC Lead Generation Agency",
    "AC Repair Local SEO",
    "HVAC Missed Call Recovery",
    "HVAC Business Growth Agency",
  ],
  alternates: { canonical: "/industries/hvac" },
  openGraph: {
    title: "HVAC Local SEO & Digital Marketing Agency | Hygroon",
    description:
      "Rank #1 on Google Maps 3-Pack and capture high-intent HVAC search demand. Hygroon builds proven Local SEO and revenue growth engines for heating & cooling contractors.",
    url: "https://hygroon.com/industries/hvac",
    siteName: "Hygroon",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HVAC Local SEO & Digital Marketing Agency | Hygroon",
    description:
      "Rank #1 on Google Maps 3-Pack and capture high-intent HVAC search demand.",
  },
};

export default function HvacIndustryPage() {
  return (
    <IndustryPageTemplate
      slug="hvac"
      breadcrumbName="HVAC"
      badgeLabel="HVAC & Air Conditioning Local SEO Agency"
      badgeIcon={Compass}
      heroTitle="Local SEO & Growth Systems for HVAC Contractors"
      heroBody="HVAC is an emergency-first, high-margin trade. When an AC unit dies in peak summer heat or a furnace stops in freezing winter, homeowners search on Google and call the first contractor who looks top-rated and answers immediately. Hygroon builds the Local SEO engine that puts your HVAC business at the top of Google Maps and captures every lead."
      sections={[
        {
          title: "Where HVAC Contractors Lose Revenue",
          body: "Most HVAC contractors waste thousands on generic agency retainers while losing 40%+ of local search demand. Bottlenecks occur across Google Maps visibility, mobile site conversion, missed evening calls, and un-followed estimates.",
          pillars: [
            {
              icon: MapPin,
              title: "Missing Google Maps 3-Pack",
              body: "Over 70% of emergency AC repair calls originate directly from the Google Maps 3-Pack. If your business is hidden below competitors or lacks local geo-relevance signals, homeowners call the competition.",
            },
            {
              icon: Star,
              title: "Stale Review Cadence & Velocity",
              body: "Homeowners compare recent reviews when selecting an HVAC technician. Having 100 old reviews loses to a competitor with 20 fresh reviews from the past 14 days.",
            },
          ],
        },
        {
          title: "Dominating Local Search & Google Maps",
          body: "Hygroon optimizes your HVAC digital footprint for ultra-targeted local intent keywords that generate immediate service callouts.",
          pillars: [
            {
              icon: Search,
              title: "High-Intent HVAC Keyword Targeting",
              body: "We position your business for profitable search queries like '24/7 AC repair near me', 'heat pump installation cost', and 'furnace repair near me'.",
            },
            {
              icon: MapPin,
              title: "Hyper-Local Service Area Signals",
              body: "Expanding geographic relevance across all surrounding townships, suburbs, and zip codes to maximize Map Pack visibility for every technician truck on the road.",
            },
          ],
        },
        {
          title: "Converting Website Visitors into Dispatched Techs",
          body: "A distressed homeowner on a smartphone needs instant reassurance. Frictionless mobile booking turns clicks into paid invoices.",
          pillars: [
            {
              icon: MonitorSmartphone,
              title: "One-Tap Mobile Click-to-Call",
              body: "85%+ of emergency HVAC searches occur on smartphones. Instant click-to-call buttons and sub-second page speed eliminate visitor drop-off.",
            },
            {
              icon: ShieldCheck,
              title: "Trust Badges & License Assurance",
              body: "Prominently displaying licensed, bonded, background-checked status and upfront emergency dispatch fees builds immediate caller confidence.",
            },
          ],
        },
        {
          title: "After-Hours & Missed Call SMS Recovery",
          body: "AC and heating emergencies don't stop at 5:00 PM. Unanswered after-hours calls represent thousands in lost replacement contracts.",
          pillars: [
            {
              icon: PhoneCall,
              title: "Instant Missed Call Textback",
              body: "When an incoming call goes unanswered, Hygroon instantly sends an automated SMS textback within 15 seconds to lock in the lead before they call another contractor.",
            },
            {
              icon: Clock,
              title: "24/7 Digital Intake & Priority Dispatch",
              body: "Intelligent after-hours intake forms allow homeowners to request first-thing morning emergency slots directly from their phones.",
            },
          ],
        },
        {
          title: "Systematized Quote Follow-Up & Maintenance Contracts",
          body: "Closing high-margin system replacements requires persistent, professional follow-up.",
          pillars: [
            {
              icon: FileCheck,
              title: "Automated Estimate Follow-Up",
              body: "Systematic multi-touch SMS and email follow-up sequences for open $8k-$15k HVAC replacement quotes increase closing rates by 25%+.",
            },
            {
              icon: TrendingUp,
              title: "Seasonal Maintenance Tune-Up Campaigns",
              body: "Automated spring AC tune-up and autumn heating checkup campaigns reactivate past customers and generate steady recurring maintenance agreement revenue.",
            },
          ],
        },
      ]}
      faqs={[
        {
          question: "How does Hygroon help HVAC contractors rank #1 on Google Maps?",
          answer: "Hygroon executes a complete Local SEO strategy tailored for HVAC contractors: optimizing Google Business Profiles, engineering geo-targeted service area pages, building local citations, and automating fresh review acquisition to secure top placement in the Google Maps 3-Pack.",
        },
        {
          question: "Why is speed-to-lead so critical for HVAC digital marketing?",
          answer: "Over 78% of homeowners hire the first HVAC contractor who responds to an emergency inquiry. Hygroon provides 15-second automated missed call SMS textback to prevent missed callers from contacting a competitor.",
        },
        {
          question: "How is Hygroon different from generic digital marketing agencies?",
          answer: "Traditional marketing agencies charge high monthly retainers for vanity metrics like clicks and impressions. Hygroon builds complete revenue growth systems designed specifically for service businesses—combining Local SEO, speed-to-lead automation, and estimate follow-up.",
        },
        {
          question: "What is included in Hygroon's free HVAC Local SEO Diagnostic?",
          answer: "Our diagnostic evaluates your HVAC company's Google Maps 3-Pack ranking, review velocity, mobile page speed, missed call vulnerability, and competitor benchmark positioning with zero obligation.",
        },
      ]}
      ctaTitle="Analyze Your HVAC Business Now"
      ctaBody="Get a free 60-second snapshot of your HVAC company's local Google Maps ranking, review velocity, response speed, and market growth opportunities."
    />
  );
}

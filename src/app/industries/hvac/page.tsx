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
      badgeLabel="U.S. HVAC Contractors Growth System"
      badgeIcon={Compass}
      heroTitle="Turn High-Intent HVAC Demand Into Booked Work"
      heroBody="HVAC is an emergency-first, high-margin trade across the United States. When an AC unit fails in summer heat or a furnace stops in freezing winter, homeowners search Google and call the first contractor who looks reputable and answers immediately. Hygroon builds the growth engine that positions your U.S. HVAC business at the top of Google Maps, eliminates missed call leakage, and converts replacement estimates into booked jobs."
      sections={[
        {
          title: "Where U.S. HVAC Contractors Lose Revenue",
          body: "Independent HVAC contractors frequently lose 40% or more of local market demand across 5 distinct leakage points: Google Maps visibility, mobile site conversion, after-hours calls, response latency, and un-followed replacement quotes.",
          pillars: [
            {
              icon: MapPin,
              title: "Google Maps 3-Pack Prominence",
              body: "Over 70% of emergency AC repair calls originate directly from the Google Maps 3-Pack. If your business is hidden below competitors or lacks recent review velocity, high-intent homeowners call the competition.",
            },
            {
              icon: Star,
              title: "Review Velocity and Recency",
              body: "Homeowners evaluate review recency when selecting an HVAC technician. Having 100 old reviews loses to a local competitor with 20 fresh reviews from the past 14 days.",
            },
          ],
        },
        {
          title: "Dominating Local HVAC Search Intent",
          body: "Hygroon optimizes your HVAC digital footprint for ultra-targeted local intent queries that generate immediate service dispatch opportunities.",
          pillars: [
            {
              icon: Search,
              title: "High-Intent Keyword Positioning",
              body: "We position your business for high-margin search queries like '24/7 AC repair near me', 'heat pump replacement cost', and 'furnace repair contractor'.",
            },
            {
              icon: MapPin,
              title: "Service Area Geographic Signals",
              body: "Expanding geographic relevance across all surrounding townships, suburbs, and zip codes to maximize Map Pack visibility for every technician truck on the road.",
            },
          ],
        },
        {
          title: "Converting Mobile Visitors Into Dispatched Techs",
          body: "A distressed homeowner on a smartphone needs instant reassurance. Frictionless mobile booking turns clicks into paid invoices.",
          pillars: [
            {
              icon: MonitorSmartphone,
              title: "One-Tap Mobile Click-to-Call",
              body: "Over 85% of emergency HVAC searches occur on smartphones. Instant click-to-call buttons and sub-second page speed eliminate visitor drop-off.",
            },
            {
              icon: ShieldCheck,
              title: "Trust Badges and License Assurance",
              body: "Prominently displaying licensed, bonded, background-checked status and upfront emergency dispatch fees builds immediate caller confidence.",
            },
          ],
        },
        {
          title: "After-Hours Demand and Speed-to-Lead",
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
          title: "Systematized Quote Follow-Up and Maintenance Contracts",
          body: "Closing high-margin system replacements requires persistent, professional follow-up.",
          pillars: [
            {
              icon: FileCheck,
              title: "Automated Replacement Quote Follow-Up",
              body: "Systematic multi-touch SMS and email follow-up sequences for open $5,000 to $15,000 HVAC replacement quotes increase closing rates significantly.",
            },
            {
              icon: TrendingUp,
              title: "Seasonal Maintenance Agreement Workflows",
              body: "Automated spring AC tune-up and autumn heating checkup campaigns reactivate past customers and generate steady recurring maintenance revenue.",
            },
          ],
        },
        {
          title: "Hygroon Evidence Standards for HVAC Business Reviews",
          body: "We separate verified facts from operational estimates using a rigorous four-tier evidence taxonomy:",
          pillars: [
            {
              icon: Compass,
              title: "Observed and Calculated Data",
              body: "Observed data measures real Google Maps rankings, mobile site latency, and live review velocity. Calculated metrics quantify response latency and local proximity.",
            },
            {
              icon: ShieldCheck,
              title: "Inferred Risks and Needs Confirmation",
              body: "Inferred risks estimate potential revenue loss from missed evening calls. Variables marked Needs Confirmation are verified directly with the business owner.",
            },
          ],
        },
      ]}
      faqs={[
        {
          question: "How does Hygroon help U.S. HVAC contractors rank on Google Maps?",
          answer: "Hygroon executes a complete Local SEO strategy tailored for HVAC contractors: optimizing Google Business Profiles, engineering geo-targeted service area signals, building local citations, and automating review acquisition velocity to secure top placement in the Google Maps 3-Pack.",
        },
        {
          question: "Why is speed-to-lead critical for HVAC contractors?",
          answer: "Over 78% of homeowners hire the first HVAC contractor who responds to an emergency inquiry. Hygroon provides 15-second automated missed call SMS textbacks to prevent missed callers from contacting a competitor.",
        },
        {
          question: "How is Hygroon different from traditional digital marketing agencies?",
          answer: "Traditional agencies charge high monthly retainers for vanity metrics like clicks and impressions. Hygroon builds complete revenue growth systems designed specifically for home service businesses, combining Local SEO, speed-to-lead automation, and quote follow-up.",
        },
        {
          question: "What is included in Hygroon's free HVAC Business Growth Diagnostic?",
          answer: "Our diagnostic evaluates your HVAC company's Google Maps 3-Pack ranking, review velocity, mobile page speed, after-hours call vulnerability, and competitor benchmark positioning with zero obligation.",
        },
      ]}
      ctaTitle="Analyze Your HVAC Business Now"
      ctaBody="Get a free 60-second snapshot of your HVAC company's local Google Maps ranking, review velocity, response speed, and market growth opportunities."
    />
  );
}

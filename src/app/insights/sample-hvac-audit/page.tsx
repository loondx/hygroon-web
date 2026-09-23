import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { brandConfig } from '@/config/brand.config';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import AnalyzeCta from '@/components/AnalyzeCta';
import GrowthCallCta from '@/components/GrowthCallCta';
import { ClipboardCheck, Clock, Copy, PhoneOff, MapPin, Star, ShieldCheck, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sample HVAC Audit: What We Found in Real Google Maps Listings',
  description:
    'Anonymized findings from real Google Maps audits of U.S. HVAC contractors: listing hours that contradict 24/7 claims, duplicate listings, missing call buttons, and rank gaps that reviews alone do not explain.',
  alternates: { canonical: '/insights/sample-hvac-audit' },
  openGraph: {
    title: 'Sample HVAC Audit: What We Found in Real Google Maps Listings',
    description: 'Five anonymized findings from public Google Maps data for U.S. HVAC contractors.',
    url: 'https://hygroon.com/insights/sample-hvac-audit',
    type: 'article',
  },
};

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Sample HVAC Audit: What We Found in Real Google Maps Listings',
  description:
    'Anonymized findings from public Google Maps data for U.S. HVAC contractors, reviewed in September 2026.',
  author: {
    '@type': 'Organization',
    name: brandConfig.name,
    url: brandConfig.website,
  },
  publisher: {
    '@type': 'Organization',
    name: brandConfig.name,
    logo: {
      '@type': 'ImageObject',
      url: `${brandConfig.website}/logo.svg`,
    },
  },
  datePublished: '2026-09-23',
  dateModified: '2026-09-23',
};

// Every finding below was observed directly on public Google Maps listings and
// search results in September 2026. Business names are removed and review
// counts are rounded so no contractor can be identified. These are audit
// findings only: no fixes have been implemented for these businesses, so no
// outcomes are claimed (see the no-fabricated-case-studies rule on /results).
const FINDINGS = [
  {
    icon: Clock,
    title: 'The website says 24/7. Google says "Closed".',
    profile: 'Family-owned contractor, Midwest, in business 60+ years, 600+ reviews',
    finding:
      'The website advertises 24-hour emergency service, but the Google listing hours show "Closed" after 5 PM. The business also did not appear in Maps results for a neighboring town it lists as a service area, where the top result had under 60 reviews.',
    why: 'A homeowner with no heat at 11 PM sees "Closed" and calls the next listing.',
  },
  {
    icon: Copy,
    title: 'A duplicate listing with a 1-star review',
    profile: 'Family-owned contractor, Upper Midwest, 30+ years, 4.9 stars',
    finding:
      'The contractor ranks #1 in its town, but a second listing with the same business name appears in the same results, with no phone number and a single 1-star review.',
    why: 'Customers cannot tell which listing is real, and the duplicate drags down trust in the brand name.',
  },
  {
    icon: PhoneOff,
    title: 'No phone number, so no Call button',
    profile: 'Two-year-old contractor, 200+ reviews at a perfect 5.0, #2 locally',
    finding:
      'The Google listing says "Open 24 hours" but has no phone number, so mobile searchers get no one-tap Call button and have to visit the website to find a number.',
    why: 'Emergency searches happen on phones. Every extra step loses callers.',
  },
  {
    icon: MapPin,
    title: '#10 in town, behind shops with 10 and 17 reviews',
    profile: 'Contractor with roughly 300 reviews at 4.9',
    finding:
      'Despite a strong review profile, the contractor ranked 10th for "hvac repair" in its own town. Two shops ranked above it had only 10 and 17 reviews.',
    why: 'When reviews are not the constraint, the gap is usually local relevance signals and listing configuration.',
  },
  {
    icon: Star,
    title: 'More than twice the reviews, still #2',
    profile: 'Established contractor, 2,500+ reviews',
    finding:
      'The contractor ranked second on Google Maps behind a competitor with fewer than half as many reviews. Its own website did not appear on page one of regular search results for the same query.',
    why: 'At this level, ranking depends on service-area signals, review recency, and the website pulling its own weight.',
  },
];

const CHECKLIST = [
  'Where you rank on Google Maps for "hvac repair [your town]", and in each town you serve',
  'Whether your listing hours match the emergency service you advertise',
  'Duplicate or outdated listings under your business name',
  'Phone number, Call button, and "Book online" availability on your listing',
  'Name, address, and phone consistency across Google, BBB, Yelp, and your website',
  'Review count and recency compared with the shops ranked above you',
];

export default function SampleHvacAuditPage() {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 py-12 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <BreadcrumbJsonLd
        trail={[
          { name: 'Insights', path: '/insights' },
          { name: 'Sample HVAC Audit', path: '/insights/sample-hvac-audit' },
        ]}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <header className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <ClipboardCheck className="w-3.5 h-3.5" />
            <span>Sample Audit</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            What We Found in Real HVAC Google Maps Listings
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Five findings from public Google Maps data for U.S. HVAC contractors we reviewed in September 2026. Every
            one of these businesses has good reviews. The gaps are in how their listings show up.
          </p>
        </header>

        <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 flex items-start gap-3 text-left">
          <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-400 leading-relaxed">
            Names are removed and review counts are rounded. These are audit findings, not client results: we have
            not claimed any outcome for these businesses.
          </p>
        </div>

        <div className="space-y-4">
          {FINDINGS.map(({ icon: Icon, title, profile, finding, why }) => (
            <section key={title} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <Icon className="w-4 h-4 shrink-0" />
                <h2 className="text-lg text-white">{title}</h2>
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{profile}</p>
              <p className="text-sm text-slate-300 leading-relaxed">{finding}</p>
              <p className="text-sm text-slate-400 leading-relaxed">
                <span className="font-semibold text-slate-200">Why it matters: </span>
                {why}
              </p>
            </section>
          ))}
        </div>

        <section className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4">
          <h2 className="text-xl font-bold text-white">What a Hygroon Audit Checks</h2>
          <ul className="space-y-2 text-sm text-slate-300 leading-relaxed list-disc pl-5">
            {CHECKLIST.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold">
            <Link href="/insights/hvac-google-maps-seo" className="text-amber-400 hover:underline flex items-center gap-1">
              <span>How Google Maps ranking works for HVAC</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/insights/hvac-after-hours-lead-loss" className="text-amber-400 hover:underline flex items-center gap-1">
              <span>Why after-hours calls get lost</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        <div className="p-8 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10 border border-amber-500/20 text-center space-y-4">
          <h3 className="text-xl font-bold text-white">See What Your Own Listing Shows</h3>
          <p className="text-xs text-slate-300 max-w-lg mx-auto">
            Run the same checks on your business, using your real data.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <AnalyzeCta source="article_sample_audit" />
            <GrowthCallCta source="article_sample_audit_review" className="px-5 py-2.5 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-200 text-xs font-semibold">
              <span>Get a Free Growth Review</span>
            </GrowthCallCta>
          </div>
        </div>
      </article>
    </div>
  );
}

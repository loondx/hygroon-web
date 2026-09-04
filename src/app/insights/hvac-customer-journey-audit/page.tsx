import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { brandConfig } from '@/config/brand.config';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import AnalyzeCta from '@/components/AnalyzeCta';
import GrowthCallCta from '@/components/GrowthCallCta';
import { Compass, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'The HVAC Customer Journey Audit Guide | Hygroon',
  description:
    'A step-by-step audit framework for U.S. HVAC contractors to evaluate local search visibility, website mobile UX, speed-to-lead, and quote follow-up.',
  alternates: { canonical: '/insights/hvac-customer-journey-audit' },
  openGraph: {
    title: 'The HVAC Customer Journey Audit Guide | Hygroon',
    description: 'Step-by-step diagnostic audit guide for heating & air conditioning business owners.',
    url: 'https://hygroon.com/insights/hvac-customer-journey-audit',
    type: 'article',
  },
};

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'The HVAC Customer Journey Audit Guide',
  description:
    'Step-by-step diagnostic framework for auditing local HVAC customer acquisition and retention.',
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
  datePublished: '2026-09-05',
  dateModified: '2026-09-05',
};

export default function HvacCustomerJourneyAuditPage() {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 py-12 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <BreadcrumbJsonLd
        trail={[
          { name: 'Insights', path: '/insights' },
          { name: 'HVAC Customer Journey Audit', path: '/insights/hvac-customer-journey-audit' },
        ]}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <header className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>Audit Framework</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            The HVAC Customer Journey Audit Guide
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Step-by-step instructions for auditing your business across Google Maps, mobile UX, after-hours intake, and quote follow-up.
          </p>
        </header>

        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-6 text-sm text-slate-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Why Audit the Complete Journey?</h2>
            <p>
              Most HVAC contractors only look at individual pieces of marketing: a Google Ads campaign, a website redesign, or an SEO invoice. However, revenue leakage happens in the white space between these touchpoints.
            </p>
            <p>
              Auditing the complete customer journey exposes exactly where interested homeowners drop off before booking a service technician.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">5 Steps to Audit Your Business</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#0d1322] border border-slate-800 space-y-1">
                <h3 className="font-bold text-white text-base">Step 1: Check Google Maps 3-Pack Rank</h3>
                <p className="text-xs text-slate-400">
                  Search &quot;AC repair [Your City]&quot; on a mobile phone without logged-in account bias. Are you in the top 3 map results? Is your review velocity steady?
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0d1322] border border-slate-800 space-y-1">
                <h3 className="font-bold text-white text-base">Step 2: Test Mobile Tap-to-Call</h3>
                <p className="text-xs text-slate-400">
                  Open your website on a mobile device. Can you tap a phone button immediately without scrolling? Does the page load in under 2 seconds?
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0d1322] border border-slate-800 space-y-1">
                <h3 className="font-bold text-white text-base">Step 3: Test After-Hours Answering</h3>
                <p className="text-xs text-slate-400">
                  Call your main office line at 7:30 PM on a Tuesday. What happens? Do callers get voicemail, or do they receive an instant text acknowledgment?
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0d1322] border border-slate-800 space-y-1">
                <h3 className="font-bold text-white text-base">Step 4: Audit Response Time Latency</h3>
                <p className="text-xs text-slate-400">
                  Submit a test contact form on your website. Time how many minutes pass before your office calls or texts back.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0d1322] border border-slate-800 space-y-1">
                <h3 className="font-bold text-white text-base">Step 5: Inspect Open Equipment Replacement Quotes</h3>
                <p className="text-xs text-slate-400">
                  Review all un-signed $5,000+ system replacement quotes from the past 30 days. How many received automated follow-up messages?
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Let Hygroon Automate Your Audit</h2>
            <p>
              Rather than manually checking every touchpoint, Hygroon&apos;s 60-second diagnostic tool automatically evaluates your Google Maps rank, review recency, mobile speed, and competitor benchmark positioning.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold">
              <Link href="/analyze" className="text-amber-400 hover:underline flex items-center gap-1">
                <span>Run Free Business Diagnostic</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/how-it-works" className="text-amber-400 hover:underline flex items-center gap-1">
                <span>Read Hygroon Evidence Methodology</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>
        </div>

        {/* CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10 border border-amber-500/20 text-center space-y-4">
          <h3 className="text-xl font-bold text-white">Start Your 60-Second Business Audit</h3>
          <p className="text-xs text-slate-300 max-w-lg mx-auto">
            Evaluate your HVAC business performance across all 5 customer journey touchpoints now.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <AnalyzeCta source="article_journey_audit" />
            <GrowthCallCta source="article_journey_audit_review" className="px-5 py-2.5 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-200 text-xs font-semibold">
              <span>Get a Free Growth Review</span>
            </GrowthCallCta>
          </div>
        </div>
      </article>
    </div>
  );
}

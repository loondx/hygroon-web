import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { brandConfig } from '@/config/brand.config';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import AnalyzeCta from '@/components/AnalyzeCta';
import GrowthCallCta from '@/components/GrowthCallCta';
import { Compass, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'The HVAC Customer Journey Audit Guide',
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
              Many contractors evaluate individual marketing channels in isolation (such as ad campaigns or website design). However, demand leakage typically occurs at the hand-off points between discovery, intake, and scheduling.
            </p>
            <p>
              Auditing the complete customer journey identifies specific drop-off points before revenue is lost.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">5 Steps to Audit Your Business</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#0d1322] border border-slate-800 space-y-1">
                <h3 className="font-bold text-white text-base">Step 1: Inspect Google Maps Local Visibility</h3>
                <p className="text-xs text-slate-400">
                  Search local emergency terms on a mobile device without account bias. Verify your map placement, primary category, and review recency.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0d1322] border border-slate-800 space-y-1">
                <h3 className="font-bold text-white text-base">Step 2: Test Mobile Contact Accessibility</h3>
                <p className="text-xs text-slate-400">
                  Open your site on a mobile device. Verify if click-to-call buttons are accessible without scrolling and that page loading is fast.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0d1322] border border-slate-800 space-y-1">
                <h3 className="font-bold text-white text-base">Step 3: Evaluate After-Hours Call Handling</h3>
                <p className="text-xs text-slate-400">
                  Place a test call to your main office line after 6:00 PM. Check whether callers reach a voicemail system or receive immediate text response confirmation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0d1322] border border-slate-800 space-y-1">
                <h3 className="font-bold text-white text-base">Step 4: Measure Response Time Latency</h3>
                <p className="text-xs text-slate-400">
                  Submit a contact request form and record the time elapsed before your office calls or sends an SMS follow-up.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0d1322] border border-slate-800 space-y-1">
                <h3 className="font-bold text-white text-base">Step 5: Review Unsigned Estimate Follow-Up</h3>
                <p className="text-xs text-slate-400">
                  Examine open system replacement quotes from the past month to determine whether automated follow-ups were sent.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Let Hygroon Automate Your Audit</h2>
            <p>
              Hygroon&apos;s 60-second diagnostic tool automatically evaluates your Google Maps position, review recency, mobile performance, and local positioning.
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

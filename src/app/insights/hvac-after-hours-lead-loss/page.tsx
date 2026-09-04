import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { brandConfig } from '@/config/brand.config';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import AnalyzeCta from '@/components/AnalyzeCta';
import GrowthCallCta from '@/components/GrowthCallCta';
import { Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Why After-Hours HVAC Calls Fail to Convert & How to Recover Them',
  description:
    'Examine how uncaptured evening and weekend HVAC phone calls create revenue leakage, and how automated SMS textbacks protect distressed inquiry capture.',
  alternates: { canonical: '/insights/hvac-after-hours-lead-loss' },
  openGraph: {
    title: 'Why After-Hours HVAC Calls Fail to Convert & How to Recover Them',
    description:
      'Learn how U.S. HVAC contractors lose high-margin emergency jobs after 5 PM and how to capture after-hours demand.',
    url: 'https://hygroon.com/insights/hvac-after-hours-lead-loss',
    type: 'article',
  },
};

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Why After-Hours HVAC Calls Fail to Convert & How to Recover Them',
  description:
    'An in-depth analysis of emergency after-hours lead drop-off for U.S. HVAC contractors and how instant automated textbacks preserve revenue.',
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

export default function HvacAfterHoursLeadLossPage() {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 py-12 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <BreadcrumbJsonLd
        trail={[
          { name: 'Insights', path: '/insights' },
          { name: 'HVAC After-Hours Lead Loss', path: '/insights/hvac-after-hours-lead-loss' },
        ]}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <header className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            <span>HVAC Operational Analysis</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Why After-Hours HVAC Calls Fail to Convert (And How to Fix It)
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Emergency AC breakdowns and heating outages don&apos;t keep office hours. Learn how unanswered calls after 5 PM erode contractor profitability.
          </p>
        </header>

        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-6 text-sm text-slate-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">The Cost of Unanswered Evening Inquiries</h2>
            <p>
              For heating and air conditioning contractors across the United States, peak customer distress frequently occurs outside standard 8:00 AM to 5:00 PM operating hours. When an air conditioner fails during a summer heatwave or a furnace stops on a freezing winter evening, homeowners seek immediate help.
            </p>
            <p>
              In home service operations, after-hours inbound calls frequently reach unanswered office lines or standard voicemail boxes. Distressed callers facing severe indoor conditions rarely leave voicemail messages: instead, they return to search results to call another local service contractor.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Why Voicemail Fails Distressed Callers</h2>
            <p>
              Standard voicemail provides no immediate dispatch confirmation or response expectation. Homeowners facing extreme temperature conditions need quick assurance that a qualified technician is aware of their issue.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-400">
              <li>
                <strong className="text-slate-200">Lack of Immediate Confirmation:</strong> Voicemail leaves callers uncertain whether their call will be answered tonight or tomorrow.
              </li>
              <li>
                <strong className="text-slate-200">Competitor Response Speed:</strong> A competing business that provides immediate call acknowledgment or instant SMS textbacks usually captures the dispatch opportunity.
              </li>
              <li>
                <strong className="text-slate-200">High-Value Job Leakage:</strong> Emergency service calls often represent immediate repair revenue or complete system replacement opportunities.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Automated Missed Call SMS Engagement</h2>
            <p>
              Hygroon addresses after-hours demand leakage by implementing automated SMS textback workflows. When an inbound call goes unanswered outside office hours, an automated response triggers within seconds:
            </p>
            <blockquote className="p-4 rounded-xl bg-[#0d1322] border-l-4 border-amber-500 italic text-slate-200">
              &quot;Hi, thanks for calling [Contractor Name]! We&apos;re currently assisting another customer. Reply here with your service address and equipment issue for priority dispatch.&quot;
            </blockquote>
            <p>
              This immediate text communication confirms receipt of the request, opens a direct two-way conversation, and reduces the likelihood of the customer contacting another provider.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Next Steps for HVAC Business Owners</h2>
            <p>
              Auditing after-hours intake responsiveness is part of Hygroon&apos;s 5-stage customer journey evaluation framework. Discover how we assess search prominence and response velocity for home service businesses.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold">
              <Link href="/industries/hvac" className="text-amber-400 hover:underline flex items-center gap-1">
                <span>View HVAC Growth Systems</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/how-it-works" className="text-amber-400 hover:underline flex items-center gap-1">
                <span>Learn How Hygroon Works</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>
        </div>

        {/* CTA Card */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10 border border-amber-500/20 text-center space-y-4">
          <h3 className="text-xl font-bold text-white">See Where Your Business Is Losing Evening Calls</h3>
          <p className="text-xs text-slate-300 max-w-lg mx-auto">
            Run a free 60-second market diagnostic to evaluate your local search rank, review recency, and response latency.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <AnalyzeCta source="article_after_hours" />
            <GrowthCallCta source="article_after_hours_review" className="px-5 py-2.5 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-200 text-xs font-semibold">
              <span>Get a Free Growth Review</span>
            </GrowthCallCta>
          </div>
        </div>
      </article>
    </div>
  );
}

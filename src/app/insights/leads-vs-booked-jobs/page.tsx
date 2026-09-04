import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { brandConfig } from '@/config/brand.config';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import AnalyzeCta from '@/components/AnalyzeCta';
import GrowthCallCta from '@/components/GrowthCallCta';
import { TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Leads vs Booked Jobs: Measuring Real Demand Leakage in Home Services',
  description:
    'Learn why measuring raw lead volume alone masks revenue leakage, and how home service businesses track conversion from search discovery to dispatched work.',
  alternates: { canonical: '/insights/leads-vs-booked-jobs' },
  openGraph: {
    title: 'Leads vs Booked Jobs: Measuring Real Demand Leakage in Home Services',
    description: 'Understand the gap between raw web/phone leads and completed revenue-generating dispatch jobs.',
    url: 'https://hygroon.com/insights/leads-vs-booked-jobs',
    type: 'article',
  },
};

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Leads vs Booked Jobs: Measuring Real Demand Leakage in Home Services',
  description:
    'Framework for analyzing lead-to-booked-job conversion friction in U.S. home-service businesses.',
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

export default function LeadsVsBookedJobsPage() {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 py-12 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <BreadcrumbJsonLd
        trail={[
          { name: 'Insights', path: '/insights' },
          { name: 'Leads vs Booked Jobs', path: '/insights/leads-vs-booked-jobs' },
        ]}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <header className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Revenue Economics</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Leads vs Booked Jobs: Calculating Real Demand Leakage
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            High lead volume means little if inquiries drop off before a technician is dispatched. Here is how to measure end-to-end conversion.
          </p>
        </header>

        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-6 text-sm text-slate-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">The Lead Count Illusion</h2>
            <p>
              Standard digital metrics often focus on raw inquiry counts: form fills, button taps, and call attempts. However, for a service business owner, an inquiry only creates value when converted into a scheduled service call.
            </p>
            <p>
              A substantial portion of raw initial inquiries can be lost to operational friction between initial inquiry and actual technician dispatch.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Common Conversion Leakage Points</h2>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-[#0d1322] border border-slate-800 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-white text-sm">Slow Initial Follow-Up</h3>
                  <p className="text-xs text-slate-400">Callers who wait too long for a response often contact alternative service providers.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0d1322] border border-slate-800 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-white text-sm">Unassisted After-Hours Calls</h3>
                  <p className="text-xs text-slate-400">Evening calls going to standard voicemail without immediate automated confirmation.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0d1322] border border-slate-800 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-white text-sm">Dormant Quote Follow-Up</h3>
                  <p className="text-xs text-slate-400">Presented replacement estimates sitting without structured follow-up routines.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Shifting to Booked-Work Optimization</h2>
            <p>
              Hygroon aligns your local search and digital intake around booked service calls. By pairing Google Maps prominence with automated SMS response and quote follow-up, we help eliminate intake drop-off points.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold">
              <Link href="/how-it-works" className="text-amber-400 hover:underline flex items-center gap-1">
                <span>See Our 5-Stage Journey Audit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/industries/hvac" className="text-amber-400 hover:underline flex items-center gap-1">
                <span>View HVAC Growth Systems</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>
        </div>

        {/* CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10 border border-amber-500/20 text-center space-y-4">
          <h3 className="text-xl font-bold text-white">Measure Your True Demand Leakage</h3>
          <p className="text-xs text-slate-300 max-w-lg mx-auto">
            Analyze your market positioning, review recency, and response speed in 60 seconds.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <AnalyzeCta source="article_leads_vs_booked" />
            <GrowthCallCta source="article_leads_vs_booked_review" className="px-5 py-2.5 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-200 text-xs font-semibold">
              <span>Get a Free Growth Review</span>
            </GrowthCallCta>
          </div>
        </div>
      </article>
    </div>
  );
}

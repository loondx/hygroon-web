import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { brandConfig } from '@/config/brand.config';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { BookOpen, ArrowRight, Sparkles, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Servnexa publishes market research once it has a real audit sample to draw on. No invented statistics, no articles that don’t exist yet.',
  alternates: { canonical: '/insights' },
};

// This page used to show three "articles" with specific fabricated
// statistics ("78% of Emergency Service Calls...", "analysis of over 450
// service contractors...") that don't correspond to any real research, and
// none of them linked to actual article content — clicking any card went
// straight to /analyze. Same CLAUDE.md violation as the old /results page:
// a plausible-looking placeholder standing in for missing data. Replaced
// with an honest empty state until there's a real audit sample to publish
// findings from.
export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 py-12 md:py-20">
      <BreadcrumbJsonLd trail={[{ name: 'Insights', path: '/insights' }]} />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
          <Clock className="w-4 h-4" />
          <span>Coming Soon</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">Research Worth Publishing Takes Time.</h1>

        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          This page will hold real market benchmarks once Servnexa has a large enough audit sample to draw honest
          conclusions from, not invented statistics. Every number published here will be sourced and dated.
        </p>

        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800 flex items-start gap-4 text-left">
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
          <p className="text-sm text-slate-400 leading-relaxed">
            Want your own local numbers now instead of waiting? Run a free market analysis and see your business&apos;s
            real data today.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/analyze"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20"
          >
            <span>{brandConfig.primaryCTA}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href={`mailto:${brandConfig.salesEmail}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-slate-700 text-slate-200 font-semibold text-sm hover:border-slate-500 hover:text-white transition-all"
          >
            <BookOpen className="w-4 h-4" />
            <span>Talk to Us</span>
          </a>
        </div>
      </div>
    </div>
  );
}

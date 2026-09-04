import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { brandConfig } from '@/config/brand.config';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { Compass, ArrowRight, Clock, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Results',
  description:
    'Hygroon is early-stage: real client results will be published here once businesses complete a growth cycle. No fabricated case studies, ever.',
  alternates: { canonical: '/results' },
};

// This page used to show three "case studies" presented as real client
// outcomes with fabricated names, cities, and revenue figures — a direct
// violation of the no-fabricated-case-studies rule in CLAUDE.md. Replaced
// with an honest empty state, matching how the rest of the site (the
// homepage's sample market graph, the evidence preview, the diagnostic
// report's "not yet available" screenshot slot) already handles data that
// doesn't exist yet rather than inventing something plausible-looking.
export default function ResultsPage() {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 py-12 md:py-20">
      <BreadcrumbJsonLd trail={[{ name: 'Results', path: '/results' }]} />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
          <Clock className="w-4 h-4" />
          <span>Early Stage</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">Results Are Still Being Earned.</h1>

        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          Hygroon is early in working with real clients. Rather than show placeholder case studies, this page stays
          empty until there are real, verifiable outcomes to publish, with the client&apos;s consent, and never a
          fabricated number.
        </p>

        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800 flex items-start gap-4 text-left">
          <TrendingUp className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
          <p className="text-sm text-slate-400 leading-relaxed">
            In the meantime, you can see exactly what Hygroon finds for your own business (real data, not a
            sample) by running a free market analysis.
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
            <Compass className="w-4 h-4" />
            <span>Talk to Us</span>
          </a>
        </div>
      </div>
    </div>
  );
}

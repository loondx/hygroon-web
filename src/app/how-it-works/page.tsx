import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { brandConfig } from '@/config/brand.config';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import AnalyzeCta from '@/components/AnalyzeCta';
import GrowthCallCta from '@/components/GrowthCallCta';
import { Search, MonitorSmartphone, PhoneCall, Zap, TrendingUp, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How Hygroon Works | Growth Systems for Service Contractors',
  description:
    'Discover how Hygroon identifies revenue leakage across discovery, conversion, contact, response, and follow-up for U.S. home-service businesses and HVAC contractors.',
  alternates: { canonical: '/how-it-works' },
  openGraph: {
    title: 'How Hygroon Works | Growth Systems for Service Contractors',
    description:
      'Learn our 5-stage customer journey leak audit and evidence taxonomy engineered for HVAC and home-service contractors.',
    url: 'https://hygroon.com/how-it-works',
    siteName: 'Hygroon',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Hygroon Works | Growth Systems for Service Contractors',
    description:
      'Learn our 5-stage customer journey leak audit and evidence taxonomy engineered for HVAC contractors.',
  },
};

const SECONDARY_BUTTON =
  'w-full sm:w-auto px-6 h-14 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 bg-slate-900/60 backdrop-blur-md hover:bg-slate-800/80 shadow-lg';

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 py-12 md:py-20 space-y-16">
      <BreadcrumbJsonLd trail={[{ name: 'How It Works', path: '/how-it-works' }]} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            <span>Growth Methodology</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white text-balance">
            How Hygroon Stops Revenue Leakage
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            We evaluate your home-service business across the complete 5-stage customer journey: from initial Google Maps search to final replacement quote booking.
          </p>
        </div>

        {/* 5 Journey Leak Stages */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-tight border-b border-slate-800 pb-3">
            The 5 Customer Journey Leak Stages
          </h2>

          <div className="grid grid-cols-1 gap-5">
            {/* Stage 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col md:flex-row items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Search className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Stage 1</span>
                  <h3 className="text-lg font-bold text-white">Discovery & Google Maps Prominence</h3>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  We analyze your Google Business Profile rankings, local geo-targeted signals, citation consistency, and review recency. Over 70% of emergency HVAC inquiries originate directly in the Google Maps 3-Pack.
                </p>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col md:flex-row items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <MonitorSmartphone className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Stage 2</span>
                  <h3 className="text-lg font-bold text-white">Website & Mobile Conversion</h3>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  When a distressed homeowner visits your site on a smartphone, friction causes immediate drop-off. We inspect page load speed, one-tap click-to-call button visibility, and trust badges.
                </p>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col md:flex-row items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Stage 3</span>
                  <h3 className="text-lg font-bold text-white">Contact & Intake Availability</h3>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  We check your phone answering rates, after-hours intake forms, and weekend coverage. Unanswered evening calls represent thousands in lost replacement revenue.
                </p>
              </div>
            </div>

            {/* Stage 4 */}
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col md:flex-row items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Stage 4</span>
                  <h3 className="text-lg font-bold text-white">Response Latency & Speed-to-Lead</h3>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  78% of homeowners hire the first contractor who responds. Hygroon measures your response latency and deploys instant 15-second missed call SMS textback automation.
                </p>
              </div>
            </div>

            {/* Stage 5 */}
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col md:flex-row items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Stage 5</span>
                  <h3 className="text-lg font-bold text-white">Follow-Up & Booking Execution</h3>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Open $5,000 to $15,000 equipment replacement estimates decay quickly without structured follow-up. We audit quote follow-up cadence and seasonal maintenance agreement workflows.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Evidence Taxonomy */}
        <section className="space-y-6 border-t border-slate-800 pt-10">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white tracking-tight">Hygroon Evidence Standards</h2>
            <p className="text-sm text-slate-400">
              We never present generic assumptions as facts. Every finding in a Hygroon audit is categorized by data certainty:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <h3 className="font-bold text-white text-base">OBSERVED</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Directly measured data, including verified Google Maps positions, mobile site rendering speed, and live review timestamps.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <h3 className="font-bold text-white text-base">CALCULATED</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Quantified metrics derived from raw observations, such as review velocity per month, mobile performance scores, and geographic distance drop-off.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <h3 className="font-bold text-white text-base">INFERRED</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Statistical risk estimations based on U.S. home-service industry benchmarks, such as estimated lost revenue from unanswered weekend calls.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <h3 className="font-bold text-white text-base">NEEDS CONFIRMATION</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Internal operational variables, such as exact dispatch capacity and technician scheduling, confirmed directly during a Growth Review.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10 border border-amber-500/20 text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">See Where Your Revenue Leakage Starts</h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              Run a free 60-second diagnostic on your U.S. home-service business today.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <AnalyzeCta source="how_it_works_primary" />
            <GrowthCallCta source="how_it_works_secondary" className={SECONDARY_BUTTON}>
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>Get a Free Growth Review</span>
            </GrowthCallCta>
          </div>
        </div>
      </div>
    </div>
  );
}

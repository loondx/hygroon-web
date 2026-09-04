import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { brandConfig } from '@/config/brand.config';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { Compass, ArrowRight, Target, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Hygroon | Premier Local SEO & Growth Agency',
  description: `${brandConfig.name} is the specialized Local SEO and revenue growth agency for HVAC contractors and home service businesses. Learn our market-tested methodology.`,
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Hygroon | Premier Local SEO & Growth Agency',
    description: 'Specialized Local SEO and revenue growth agency for HVAC contractors and service businesses.',
    url: 'https://hygroon.com/about',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 py-12 md:py-20">
      <BreadcrumbJsonLd trail={[{ name: 'About', path: '/about' }]} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
            <Compass className="w-4 h-4" />
            <span>About {brandConfig.name}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            The Premier Local SEO & Growth Agency for Service Contractors
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            We started Hygroon because traditional marketing agencies sell vanity clicks while HVAC, plumbing, and service businesses lose thousands on un-answered calls and low Google Maps rankings.
          </p>
        </div>

        {/* Philosophy Card */}
        <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white">Our Local SEO Philosophy</h2>
          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              A service contractor does not win by burning budget on ad clicks. You win by commanding the Google Maps 3-Pack, maintaining active review velocity, responding within 15 seconds to missed calls, and closing replacement quotes with systematized follow-up.
            </p>
            <p>
              Every system built inside <strong>Hygroon OS</strong> is engineered to eliminate revenue leak between a local customer searching for emergency service and your technician dispatching to the job site.
            </p>
          </div>
        </div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-[#0d1322] border border-slate-800 space-y-3">
            <Target className="w-6 h-6 text-amber-400" />
            <h3 className="font-bold text-white text-base">Outcome-Driven Lead Generation</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We define clear performance targets for recovered call volume, Google 3-Pack placement, and quote closing speed. No vague reports or bloated retainers.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#0d1322] border border-slate-800 space-y-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <h3 className="font-bold text-white text-base">Verifiable Local Market Data</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every competitive rank, distance metric, and review velocity benchmark is derived from real local search data.
            </p>
          </div>
        </div>

        {/* Action */}
        <div className="text-center pt-6">
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20"
          >
            <span>{brandConfig.primaryCTA}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

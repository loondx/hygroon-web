import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { brandConfig } from '@/config/brand.config';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { Compass, ArrowRight, Target, ShieldCheck, Cpu, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About',
  description: `${brandConfig.name} builds growth systems for local service businesses, not vanity marketing metrics. Here's the philosophy behind it.`,
  alternates: { canonical: '/about' },
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
            Growth Systems Built on Market Truth
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            We started Hygroon because traditional marketing agencies sell vanity clicks while service businesses struggle with unclosed estimates and lost emergency calls.
          </p>
        </div>

        {/* Philosophy Card */}
        <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white">Our Philosophy</h2>
          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              A service business does not win by spending more on ads than its competitors. It wins by answering faster, establishing overwhelming local reputation, and delivering structured proposals that make customer decisions effortless.
            </p>
            <p>
              Every tool we build inside <strong>Hygroon OS</strong> is designed to remove friction between a customer having an urgent service need and your team completing the work.
            </p>
          </div>
        </div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-[#0d1322] border border-slate-800 space-y-3">
            <Target className="w-6 h-6 text-amber-400" />
            <h3 className="font-bold text-white text-base">Outcome-Driven Engagements</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We define clear milestones for recovered enquiry volume and speed to estimate response. No vague reports or opaque retainers.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#0d1322] border border-slate-800 space-y-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <h3 className="font-bold text-white text-base">Zero Mock Integrity</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every competitive rank, distance metric, and review count is grounded in verifiable local market datasets.
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

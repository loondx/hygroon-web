import React from 'react';
import JourneyLeak from '@/components/JourneyLeak';
import DemandToBookedWork from '@/components/DemandToBookedWork';
import EvidenceModel from '@/components/EvidenceModel';
import FeaturedIndustries from '@/components/FeaturedIndustries';
import AnalyzeCta from '@/components/AnalyzeCta';
import GrowthCallCta from '@/components/GrowthCallCta';
import LandingAnalytics from '@/components/LandingAnalytics';
import { PhoneCall, ShieldCheck, Sparkles, Zap } from 'lucide-react';

const SECONDARY_BUTTON =
  'w-full sm:w-auto px-6 h-14 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 bg-slate-900/60 backdrop-blur-md hover:bg-slate-800/80 shadow-lg';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#070a12] text-slate-100 selection:bg-amber-500 selection:text-slate-950 font-sans">
      <LandingAnalytics />

      {/* ────────────────────────────────────────────────────────────────────
          1. HERO (Enhanced height, punchy hook, clean visual density)
      ──────────────────────────────────────────────────────────────────── */}
      <section data-section="hero" className="relative min-h-[75vh] sm:min-h-[82vh] flex flex-col justify-center pt-24 pb-24 md:pt-36 md:pb-36 overflow-hidden">
        {/* Ambient Top Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-amber-500/10 blur-[160px] rounded-full pointer-events-none" />
        <div className="absolute top-1/4 right-10 w-[400px] h-[400px] bg-sky-500/5 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider shadow-lg shadow-amber-500/5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>For Home Service Businesses</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08] text-balance">
            Turn More Enquiries <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              Into Booked Work.
            </span>
          </h1>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <AnalyzeCta source="hero_primary" />
            <GrowthCallCta source="hero_secondary" className={SECONDARY_BUTTON}>
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>Get a Free Growth Review</span>
            </GrowthCallCta>
          </div>

          <div className="pt-2 flex items-center justify-center gap-6 text-xs font-medium text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Free market snapshot
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400/80" /> No credit card
            </span>
            <span>&bull;</span>
            <span>Instant diagnosis</span>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────
          2. WHERE REVENUE GETS LOST (Visual interactive 5-step journey)
      ──────────────────────────────────────────────────────────────────── */}
      <section data-section="revenue_leakage" className="py-20 sm:py-28 lg:py-32 border-t border-slate-800/60 bg-[#090d17] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              <span>Customer Journey Leakage</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Where Revenue Gets Lost
            </h2>
          </div>

          <JourneyLeak />
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────
          3. FROM DEMAND TO BOOKED WORK (Visual Outcome Grid)
      ──────────────────────────────────────────────────────────────────── */}
      <section id="how-it-works" data-section="demand_to_booked_work" className="py-20 sm:py-28 lg:py-32 border-t border-slate-800/60 bg-[#070a12] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              From Demand to Booked Work
            </h2>
          </div>

          <DemandToBookedWork />
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────
          4. INDUSTRIES (Featured Home Services)
      ──────────────────────────────────────────────────────────────────── */}
      <section id="industries" data-section="industries" className="py-20 sm:py-28 lg:py-32 border-t border-slate-800/60 bg-[#090d17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2 max-w-lg mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Built for Home Service Businesses.
            </h2>
          </div>

          <FeaturedIndustries />
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────
          5. EVIDENCE / TRUST
      ──────────────────────────────────────────────────────────────────── */}
      <section id="evidence" data-section="evidence" className="py-20 sm:py-28 lg:py-32 border-t border-slate-800/60 bg-[#070a12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2 max-w-lg mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Evidence Before Recommendations.
            </h2>
          </div>

          <EvidenceModel />
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────
          6. FINAL CTA
      ──────────────────────────────────────────────────────────────────── */}
      <section data-section="final_cta" className="py-24 sm:py-32 lg:py-36 border-t border-slate-800/60 bg-gradient-to-b from-[#070a12] to-[#0c1222] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-amber-500/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <div className="space-y-3">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              See Where We&apos;d Start.
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <AnalyzeCta source="final_cta_primary" />
            <GrowthCallCta source="final_cta_secondary" className={SECONDARY_BUTTON}>
              <span>Get a Free Growth Review</span>
            </GrowthCallCta>
          </div>
        </div>
      </section>
    </div>
  );
}

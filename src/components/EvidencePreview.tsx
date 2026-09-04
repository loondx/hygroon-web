'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Smartphone, Monitor, MapPin, Globe, Search, ArrowRight } from 'lucide-react';

const SOURCES = [
  { icon: MapPin, label: 'Google Places' },
  { icon: Globe, label: 'Website' },
  { icon: Search, label: 'Search Samples' },
];

/** A single premium report-preview visual, not a grid of trust cards.
 * Illustrative only — the left mockup is a decorative sample graphic, never a
 * real captured screenshot (no capture pipeline exists yet; see
 * docs/IMPLEMENTATION_STATUS.md). */
export default function EvidencePreview() {
  const [view, setView] = useState<'mobile' | 'desktop'>('mobile');

  return (
    <div className="max-w-3xl mx-auto rounded-2xl border border-slate-800 bg-[#0d1322] overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
        <span className="font-semibold text-white text-sm">ClearCool AC</span>
        <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800/80">
          Sample Report
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr]">
        {/* Left: decorative sample website mockup */}
        <div className="p-5 flex flex-col items-center gap-3 border-b md:border-b-0 md:border-r border-slate-800">
          <div
            className={`rounded-xl border border-slate-700 bg-gradient-to-b from-slate-800 to-slate-900 overflow-hidden shadow-xl ${
              view === 'mobile' ? 'w-32' : 'w-full'
            }`}
            aria-hidden="true"
          >
            <div className="h-4 bg-slate-900 flex items-center gap-1 px-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
            </div>
            <div className="p-3 space-y-2 bg-gradient-to-br from-sky-900/40 to-slate-950">
              <div className="h-2 w-3/5 rounded-full bg-slate-600/70" />
              <div className="h-1.5 w-4/5 rounded-full bg-slate-700/70" />
              <div className="h-1.5 w-2/3 rounded-full bg-slate-700/70" />
              <div className="mt-2 h-5 w-14 rounded bg-amber-500/90" />
            </div>
          </div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider">Sample (illustrative only)</span>

          <div className="flex gap-1.5 pt-1">
            <button
              type="button"
              onClick={() => setView('mobile')}
              aria-pressed={view === 'mobile'}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-colors ${
                view === 'mobile' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              Mobile
            </button>
            <button
              type="button"
              onClick={() => setView('desktop')}
              aria-pressed={view === 'desktop'}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-colors ${
                view === 'desktop' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              Desktop
            </button>
          </div>
        </div>

        {/* Right: stats */}
        <div className="px-6 py-5 space-y-4 text-sm">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <div>
              <span className="text-slate-500 text-xs block">Observed</span>
              <span className="text-slate-200">12 Aug 2026</span>
            </div>
            <div>
              <span className="text-slate-500 text-xs block">Competitors analyzed</span>
              <span className="text-slate-200">4</span>
            </div>
            <div>
              <span className="text-slate-500 text-xs block">Primary opportunity</span>
              <span className="text-slate-200">Emergency response</span>
            </div>
            <div>
              <span className="text-slate-500 text-xs block">Market strength</span>
              <span className="text-slate-200">High competition</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80">
            <span className="text-slate-500 text-xs block mb-2">Data sources</span>
            <div className="flex flex-wrap gap-3">
              {SOURCES.map(({ icon: Icon, label }) => (
                <span key={label} className="flex items-center gap-1.5 text-xs text-slate-300">
                  <Icon className="w-3.5 h-3.5 text-amber-400/80" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 pt-1 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>View Sample Report</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

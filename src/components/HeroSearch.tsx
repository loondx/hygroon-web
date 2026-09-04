'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { brandConfig } from '@/config/brand.config';
import { ArrowRight } from 'lucide-react';

/** The hero's main action: capture a business name or website and hand it
 * to /analyze, which already does the real business resolution (market +
 * industry selection, then candidate search/confirm). This box intentionally
 * does not call any search API itself — /public/search-businesses requires a
 * market + industry that aren't known yet at this point in the funnel. */
export default function HeroSearch() {
  const router = useRouter();
  const [value, setValue] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    router.push(trimmed ? `/analyze?q=${encodeURIComponent(trimmed)}` : '/analyze');
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-3.5">
      <div className="flex flex-col sm:flex-row items-stretch gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Business name or website"
            aria-label="Business name or website"
            className="w-full h-14 px-4.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800 text-white text-base placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 shadow-xl transition-all"
          />
        </div>
        <button
          type="submit"
          className="h-14 px-8 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-extrabold text-base transition-all shadow-lg shadow-amber-500/25 active:scale-[0.98] flex items-center justify-center gap-2.5 shrink-0"
        >
          <span>{brandConfig.primaryCTA}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
      <p className="text-xs font-medium text-slate-400 text-center sm:text-left flex items-center justify-center sm:justify-start gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>No login &middot; Free market snapshot &middot; No credit card</span>
      </p>
    </form>
  );
}

import React from 'react';
import Link from 'next/link';
import { Wind, Droplets, Home, Waves, AlertTriangle, Bug, Building2, ArrowRight, type LucideIcon } from 'lucide-react';
import { PUBLIC_INDUSTRIES } from '@/config/industries';

// Presentation-only — the industry list itself comes from PUBLIC_INDUSTRIES
// (the same catalog /industries and /analyze use), never duplicated here.
const ICONS: Record<string, LucideIcon> = {
  hvac: Wind,
  waterproofing: Droplets,
  'property-maintenance': Home,
  drainage: Waves,
  'water-restoration': AlertTriangle,
  'pest-control': Bug,
  'pool-services': Waves,
  'facility-services': Building2,
};

export default function IndustriesShowcase() {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {PUBLIC_INDUSTRIES.map((industry) => {
        const Icon = ICONS[industry.slug] ?? Wind;
        const href = industry.hasPage ? `/industries/${industry.slug}` : `/analyze?industry=${industry.slug}`;
        return (
          <Link
            key={industry.slug}
            href={href}
            className="group p-5 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800/80 hover:border-amber-500/40 transition-all duration-300 flex flex-col gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Icon className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
              {industry.name}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed line-clamp-1">{industry.description}</p>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400">
              <span>Learn More</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        );
      })}
    </div>
  );
}

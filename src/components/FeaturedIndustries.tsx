import React from 'react';
import Link from 'next/link';
import { Wind, AlertTriangle, Waves, Bug, ArrowRight, type LucideIcon } from 'lucide-react';
import { PUBLIC_INDUSTRIES } from '@/config/industries';

const FEATURED_SLUGS = ['hvac', 'water-restoration', 'drainage', 'pest-control'] as const;

const INDUSTRY_META: Record<string, { icon: LucideIcon; tag: string }> = {
  hvac: { icon: Wind, tag: 'Emergency Repair & Replacement' },
  'water-restoration': { icon: AlertTriangle, tag: 'High-Ticket Emergency Callouts' },
  drainage: { icon: Waves, tag: 'Urgent Local Search Dispatch' },
  'pest-control': { icon: Bug, tag: 'Recurring Contract Retention' },
};

export default function FeaturedIndustries() {
  const featured = FEATURED_SLUGS.map((slug) => PUBLIC_INDUSTRIES.find((i) => i.slug === slug)).filter(
    (i): i is NonNullable<typeof i> => Boolean(i),
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Premium Desktop & Mobile Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {featured.map((industry) => {
          const meta = INDUSTRY_META[industry.slug] ?? { icon: Wind, tag: 'Service Trade' };
          const Icon = meta.icon;
          const href = industry.hasPage ? `/industries/${industry.slug}` : `/analyze?industry=${industry.slug}`;

          return (
            <Link
              key={industry.slug}
              href={href}
              className="group relative p-6 sm:p-7 rounded-2xl bg-[#0b101d] border border-slate-800/80 hover:border-amber-500/50 hover:bg-[#0e1526] transition-all duration-300 shadow-xl shadow-black/20 flex flex-col justify-between space-y-5 text-white overflow-hidden"
            >
              {/* Subtle Ambient Hover Glow */}
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-amber-500/5 group-hover:bg-amber-500/10 blur-2xl rounded-full transition-all pointer-events-none" />

              <div className="space-y-4 relative z-10">
                {/* Icon Badge */}
                <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300 shadow-md">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Industry Name & Specialty Tag */}
                <div className="space-y-1">
                  <h3 className="font-extrabold text-base sm:text-lg leading-tight tracking-tight text-white group-hover:text-amber-300 transition-colors">
                    {industry.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    {meta.tag}
                  </p>
                </div>
              </div>

              {/* Action Link Row */}
              <div className="pt-2 flex items-center justify-between text-xs font-bold text-amber-400 group-hover:text-amber-300 transition-colors border-t border-slate-800/60 relative z-10">
                <span>Explore Trade</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* View Catalog CTA */}
      <div className="flex justify-center pt-2">
        <Link
          href="/industries"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors group px-5 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/20 hover:border-amber-500/40"
        >
          <span>View All Home Service Industries</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

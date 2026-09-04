import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { PUBLIC_INDUSTRIES } from '@/config/industries';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { Compass, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Industries We Serve',
  description:
    'Growth systems built for HVAC, waterproofing, drainage, water restoration, pest control, pool services, property maintenance, and facility services, where fast response and local visibility win the job.',
  alternates: { canonical: '/industries' },
};

export default function IndustriesPage() {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 py-12 md:py-20">
      <BreadcrumbJsonLd trail={[{ name: 'Industries', path: '/industries' }]} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
            <Compass className="w-4 h-4" />
            <span>Vertical Specialization</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Industries Built for High-Intent Demand
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Servnexa systems are specifically engineered for service businesses where fast enquiry capture and local competitive prominence drive high-value contracts.
          </p>
        </div>

        {/* Industries */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PUBLIC_INDUSTRIES.map((ind) => (
            <div
              key={ind.slug}
              className="p-5 rounded-xl bg-[#0d1322] border border-slate-800/80 hover:border-amber-500/30 transition-all space-y-3"
            >
              <h3 className="font-bold text-white text-base">{ind.name}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{ind.description}</p>
              <div className="pt-2 flex items-center gap-4">
                {ind.hasPage && (
                  <Link
                    href={`/industries/${ind.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-white hover:text-slate-300"
                  >
                    <span>Learn more</span>
                  </Link>
                )}
                <Link
                  href={`/analyze?industry=${ind.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300"
                >
                  <span>Analyze this industry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10 border border-amber-500/20 text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">Don&apos;t see your exact trade listed?</h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Servnexa adapts to any trade where emergency response, Google Maps prominence, and structured quotes win local customer trust.
          </p>
          <div className="pt-2">
            <Link
              href="/analyze"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20"
            >
              <span>Analyze Your Custom Market</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

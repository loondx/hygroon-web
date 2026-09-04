import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { brandConfig } from '@/config/brand.config';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import AnalyzeCta from '@/components/AnalyzeCta';
import GrowthCallCta from '@/components/GrowthCallCta';
import { Zap, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'The 15-Second Rule: Speed-to-Lead Benchmarks for U.S. HVAC Contractors | Hygroon',
  description:
    'Learn why 78% of homeowners hire the first contractor who responds, and how U.S. HVAC businesses cut response latency to maximize booked jobs.',
  alternates: { canonical: '/insights/hvac-lead-response-speed' },
  openGraph: {
    title: 'The 15-Second Rule: Speed-to-Lead Benchmarks for U.S. HVAC Contractors',
    description: 'Explore response latency benchmarks and lead conversion dynamics for home service contractors.',
    url: 'https://hygroon.com/insights/hvac-lead-response-speed',
    type: 'article',
  },
};

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'The 15-Second Rule: Speed-to-Lead Benchmarks for U.S. HVAC Contractors',
  description:
    'An analysis of caller response latency and conversion velocity for U.S. HVAC contractors.',
  author: {
    '@type': 'Organization',
    name: brandConfig.name,
    url: brandConfig.website,
  },
  publisher: {
    '@type': 'Organization',
    name: brandConfig.name,
    logo: {
      '@type': 'ImageObject',
      url: `${brandConfig.website}/logo.svg`,
    },
  },
  datePublished: '2026-09-05',
  dateModified: '2026-09-05',
};

export default function HvacLeadResponseSpeedPage() {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 py-12 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <BreadcrumbJsonLd
        trail={[
          { name: 'Insights', path: '/insights' },
          { name: 'HVAC Speed-to-Lead', path: '/insights/hvac-lead-response-speed' },
        ]}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <header className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            <span>Response Velocity Benchmark</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            The 15-Second Rule: Speed-to-Lead Benchmarks for HVAC Contractors
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Over 78% of homeowners hire the first contractor who responds to an emergency inquiry. Here is how response latency impacts customer acquisition.
          </p>
        </header>

        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-6 text-sm text-slate-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">The Math Behind Speed-to-Lead</h2>
            <p>
              In home services, response speed is the single largest determinant of lead conversion. Research across local search customer journeys demonstrates that responding within 5 minutes versus 30 minutes increases lead qualification likelihood by over 21 times.
            </p>
            <p>
              For emergency services like HVAC repair, the window is even tighter: distressed homeowners expect an instant response within 15 to 30 seconds.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Why Delayed Follow-Up Destroys Conversion Rates</h2>
            <p>
              When a prospective customer fills out a web form or leaves an unanswered call, their search intent is at its absolute peak. Every minute of delay allows them to continue searching Google, checking competitor reviews, and placing additional calls.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#0d1322] border border-slate-800 space-y-1">
                <div className="text-amber-400 font-bold text-base">Under 15 Seconds</div>
                <p className="text-xs text-slate-400">90%+ likelihood of locking in the caller before they dial another contractor.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#0d1322] border border-slate-800 space-y-1">
                <div className="text-rose-400 font-bold text-base">Over 15 Minutes</div>
                <p className="text-xs text-slate-400">Conversion drops below 20% as callers move on to competitors.</p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Implementing Automated Speed-to-Lead Workflows</h2>
            <p>
              Hygroon embeds instant 15-second response automation directly into your customer intake channel. By pairing instant SMS textback with immediate notification to your office staff or dispatch queue, your business maintains top speed-to-lead execution 24/7.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Related Resources</h2>
            <div className="pt-1 flex flex-wrap gap-4 text-xs font-semibold">
              <Link href="/industries/hvac" className="text-amber-400 hover:underline flex items-center gap-1">
                <span>Explore HVAC Growth Systems</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/how-it-works" className="text-amber-400 hover:underline flex items-center gap-1">
                <span>See How Hygroon Audits Response Latency</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>
        </div>

        {/* CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10 border border-amber-500/20 text-center space-y-4">
          <h3 className="text-xl font-bold text-white">Test Your Business Response Latency</h3>
          <p className="text-xs text-slate-300 max-w-lg mx-auto">
            Get an instant diagnostic of your local search rank, mobile speed, and speed-to-lead rating.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <AnalyzeCta source="article_speed_lead" />
            <GrowthCallCta source="article_speed_lead_review" className="px-5 py-2.5 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-200 text-xs font-semibold">
              <span>Get a Free Growth Review</span>
            </GrowthCallCta>
          </div>
        </div>
      </article>
    </div>
  );
}

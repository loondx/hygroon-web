import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { brandConfig } from '@/config/brand.config';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import AnalyzeCta from '@/components/AnalyzeCta';
import GrowthCallCta from '@/components/GrowthCallCta';
import { Zap, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Speed-to-Lead Mechanics: Response Time Latency for HVAC Contractors',
  description:
    'Learn how response latency impacts customer inquiry capture and how U.S. HVAC businesses reduce response time to lock in more booked service calls.',
  alternates: { canonical: '/insights/hvac-lead-response-speed' },
  openGraph: {
    title: 'Speed-to-Lead Mechanics: Response Time Latency for HVAC Contractors',
    description: 'Explore response latency mechanics and lead conversion dynamics for home service contractors.',
    url: 'https://hygroon.com/insights/hvac-lead-response-speed',
    type: 'article',
  },
};

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Speed-to-Lead Mechanics: Response Time Latency for HVAC Contractors',
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
            <span>Response Velocity Analysis</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Speed-to-Lead Mechanics: Response Time Latency for HVAC Contractors
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Homeowners experiencing an heating or cooling emergency prioritize fast contractor engagement. Here is how response latency affects customer acquisition.
          </p>
        </header>

        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-6 text-sm text-slate-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">The Dynamics of Speed-to-Lead</h2>
            <p>
              In local home services, response velocity is a critical determinant of lead conversion. When a homeowner submits an inquiry form or calls an office line, their intention to schedule a technician is at its highest point.
            </p>
            <p>
              For emergency HVAC repair requests, response speed dictates whether the prospect remains engaged with your team or continues searching local directory listings for alternative options.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Impact of Response Delays on Inbound Conversions</h2>
            <p>
              When follow-up is delayed, prospective customers frequently proceed to call competing contractors in search of an immediate appointment confirmation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#0d1322] border border-slate-800 space-y-1">
                <div className="text-amber-400 font-bold text-base">Immediate Engagement</div>
                <p className="text-xs text-slate-400">Instant acknowledgment secures customer attention before competitors are contacted.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#0d1322] border border-slate-800 space-y-1">
                <div className="text-rose-400 font-bold text-base">Extended Delay</div>
                <p className="text-xs text-slate-400">Delayed callbacks increase the probability that the customer has already booked elsewhere.</p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Implementing Speed-to-Lead Workflows</h2>
            <p>
              Hygroon incorporates automated SMS textback mechanisms into customer intake workflows. By combining instant text acknowledgment with immediate dispatch routing, businesses can maintain fast lead response handling 24 hours a day.
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

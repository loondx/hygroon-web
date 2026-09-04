import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { brandConfig } from '@/config/brand.config';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import AnalyzeCta from '@/components/AnalyzeCta';
import GrowthCallCta from '@/components/GrowthCallCta';
import { MonitorSmartphone, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Optimizing HVAC Mobile Websites for Emergency One-Tap Conversion | Hygroon',
  description:
    'Learn how mobile site performance, single-tap call buttons, and trust indicators help U.S. HVAC contractors convert mobile search traffic into dispatch calls.',
  alternates: { canonical: '/insights/hvac-website-conversion' },
  openGraph: {
    title: 'Optimizing HVAC Mobile Websites for Emergency One-Tap Conversion',
    description: 'Practical mobile site UX guidelines for U.S. heating & cooling contractors.',
    url: 'https://hygroon.com/insights/hvac-website-conversion',
    type: 'article',
  },
};

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Optimizing HVAC Mobile Websites for Emergency One-Tap Conversion',
  description:
    'Mobile conversion design patterns for U.S. home-service contractors.',
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

export default function HvacWebsiteConversionPage() {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 py-12 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <BreadcrumbJsonLd
        trail={[
          { name: 'Insights', path: '/insights' },
          { name: 'HVAC Website Conversion', path: '/insights/hvac-website-conversion' },
        ]}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <header className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <MonitorSmartphone className="w-3.5 h-3.5" />
            <span>Mobile Conversion Design</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Optimizing HVAC Mobile Websites for Emergency Conversion
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            A majority of emergency service inquiries originate on smartphones. Here is how mobile UX friction reduces booked dispatch jobs.
          </p>
        </header>

        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-6 text-sm text-slate-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">The Mobile Search Mindset</h2>
            <p>
              When a homeowner experiences an equipment failure, they typically use a smartphone to find help. Distressed callers look for rapid confirmation rather than long-form content or complex navigation:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
              <li>Is this business active in my immediate service area?</li>
              <li>Are they properly licensed, insured, and verified?</li>
              <li>Can I connect with dispatch or request service immediately?</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Essential Mobile Conversion Elements</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#0d1322] border border-slate-800 space-y-1">
                <h3 className="font-bold text-white text-base">1. Accessible Click-to-Call Placement</h3>
                <p className="text-xs text-slate-400">
                  A prominent phone button fixed in the mobile viewport allows visitors to initiate calls immediately without excessive scrolling.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0d1322] border border-slate-800 space-y-1">
                <h3 className="font-bold text-white text-base">2. Fast Mobile Page Performance</h3>
                <p className="text-xs text-slate-400">
                  Slower page load speeds increase bounce rates on mobile networks. Optimizing assets and script execution helps preserve visitor retention.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0d1322] border border-slate-800 space-y-1">
                <h3 className="font-bold text-white text-base">3. Clear Credentials and Trust Signals</h3>
                <p className="text-xs text-slate-400">
                  Displaying state HVAC licensing info, insurance verification, and recent review highlights builds immediate caller confidence.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Explore Further</h2>
            <div className="pt-1 flex flex-wrap gap-4 text-xs font-semibold">
              <Link href="/industries/hvac" className="text-amber-400 hover:underline flex items-center gap-1">
                <span>HVAC Industry Solution Overview</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/analyze" className="text-amber-400 hover:underline flex items-center gap-1">
                <span>Run Mobile Diagnostic Audit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>
        </div>

        {/* CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10 border border-amber-500/20 text-center space-y-4">
          <h3 className="text-xl font-bold text-white">Evaluate Your Mobile Website Conversion</h3>
          <p className="text-xs text-slate-300 max-w-lg mx-auto">
            Test your mobile page speed, phone button accessibility, and local review recency in 60 seconds.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <AnalyzeCta source="article_mobile_conv" />
            <GrowthCallCta source="article_mobile_conv_review" className="px-5 py-2.5 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-200 text-xs font-semibold">
              <span>Get a Free Growth Review</span>
            </GrowthCallCta>
          </div>
        </div>
      </article>
    </div>
  );
}

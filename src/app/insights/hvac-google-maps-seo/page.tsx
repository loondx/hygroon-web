import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { brandConfig } from '@/config/brand.config';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import AnalyzeCta from '@/components/AnalyzeCta';
import GrowthCallCta from '@/components/GrowthCallCta';
import { MapPin, Search, Star, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Google Maps 3-Pack Prominence Factors for HVAC Contractors',
  description:
    'Learn how Google Business Profile signals, local review recency, service area configuration, and citation accuracy impact local map rankings for HVAC contractors.',
  alternates: { canonical: '/insights/hvac-google-maps-seo' },
  openGraph: {
    title: 'Google Maps 3-Pack Prominence Factors for HVAC Contractors',
    description: 'Local SEO ranking factors and Map Pack strategies for U.S. heating & air conditioning businesses.',
    url: 'https://hygroon.com/insights/hvac-google-maps-seo',
    type: 'article',
  },
};

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Google Maps 3-Pack Prominence Factors for HVAC Contractors',
  description:
    'Detailed analysis of Google Business Profile local search ranking factors for heating and cooling service contractors.',
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

export default function HvacGoogleMapsSeoPage() {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 py-12 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <BreadcrumbJsonLd
        trail={[
          { name: 'Insights', path: '/insights' },
          { name: 'HVAC Google Maps SEO', path: '/insights/hvac-google-maps-seo' },
        ]}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <header className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>Local SEO Strategy</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Google Maps 3-Pack Prominence Factors for HVAC Businesses
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            The Google Maps 3-Pack is a primary source of high-intent phone calls for local home services. Here is how local ranking signals function.
          </p>
        </header>

        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-6 text-sm text-slate-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Local Search Prominence for Emergency Services</h2>
            <p>
              When a homeowner searches for localized emergency terms such as &quot;AC repair near me&quot;, search engines display a local map pack at the top of mobile results.
            </p>
            <p>
              Appearing in top local map positions generates consistent call volume from prospective customers needing rapid dispatch.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Core Ranking Factors for Local Map Listings</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#0d1322] border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <Star className="w-4 h-4" />
                  <span>1. Review Velocity & Recency</span>
                </div>
                <p className="text-xs text-slate-400">
                  Search engines consider steady, recent customer reviews as active signals of service quality and business operation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0d1322] border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <MapPin className="w-4 h-4" />
                  <span>2. Geographic & Service Area Alignment</span>
                </div>
                <p className="text-xs text-slate-400">
                  Properly defined service areas and localized content support geographic relevance across target service coverage zones.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0d1322] border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <Search className="w-4 h-4" />
                  <span>3. Category Precision & Data Consistency</span>
                </div>
                <p className="text-xs text-slate-400">
                  Accurate primary business category classification (&quot;HVAC Contractor&quot;) combined with consistent NAP (Name, Address, Phone) details reduces ranking ambiguity.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">How Hygroon Evaluates Local Prominence</h2>
            <p>
              Hygroon audits business profiles across key local search factors: citation accuracy, category configuration, review recency, and service location coverage.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold">
              <Link href="/industries/hvac" className="text-amber-400 hover:underline flex items-center gap-1">
                <span>View HVAC Growth Systems</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/how-it-works" className="text-amber-400 hover:underline flex items-center gap-1">
                <span>Learn How Hygroon Audits Local Search</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>
        </div>

        {/* CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10 border border-amber-500/20 text-center space-y-4">
          <h3 className="text-xl font-bold text-white">Check Your HVAC Business Google Maps Rank</h3>
          <p className="text-xs text-slate-300 max-w-lg mx-auto">
            Get an immediate evaluation of your business position in the Google Maps 3-Pack across your local service area.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <AnalyzeCta source="article_maps_seo" />
            <GrowthCallCta source="article_maps_seo_review" className="px-5 py-2.5 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-200 text-xs font-semibold">
              <span>Get a Free Growth Review</span>
            </GrowthCallCta>
          </div>
        </div>
      </article>
    </div>
  );
}

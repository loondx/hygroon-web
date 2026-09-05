import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { brandConfig } from '@/config/brand.config';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { BookOpen, ArrowRight, Clock, Zap, MonitorSmartphone, MapPin, TrendingUp, Compass } from 'lucide-react';

export const metadata: Metadata = {
  title: 'HVAC Market Insights & Growth Research',
  description:
    'Explore Hygroon editorial insights and research on HVAC Local SEO, speed-to-lead benchmarks, after-hours lead loss, and mobile website conversion.',
  alternates: { canonical: '/insights' },
  openGraph: {
    title: 'HVAC Market Insights & Growth Research | Hygroon',
    description:
      'Truthful, evidence-grounded research guides for U.S. home-service contractors and HVAC business owners.',
    url: 'https://hygroon.com/insights',
    siteName: 'Hygroon',
    type: 'website',
  },
};

const ARTICLES = [
  {
    slug: 'hvac-after-hours-lead-loss',
    title: 'Why After-Hours HVAC Calls Fail to Convert & How to Recover Them',
    excerpt: 'Over 35% of emergency HVAC inquiries occur after 5 PM. Learn why traditional voicemail fails distressed homeowners and how instant 15-second SMS textbacks lock in lost revenue.',
    category: 'Lead Loss',
    icon: Clock,
    readTime: '4 min read',
  },
  {
    slug: 'hvac-lead-response-speed',
    title: 'The 15-Second Rule: Speed-to-Lead Benchmarks for HVAC Contractors',
    excerpt: 'Over 78% of homeowners hire the first contractor who responds. Explore caller response latency benchmarks and conversion rates for heating and cooling contractors.',
    category: 'Response Velocity',
    icon: Zap,
    readTime: '5 min read',
  },
  {
    slug: 'hvac-website-conversion',
    title: 'Optimizing HVAC Mobile Websites for Emergency One-Tap Conversion',
    excerpt: 'Over 85% of emergency service searches originate on mobile. Learn how sub-second page speed, tap-to-call buttons, and upfront license badges convert clicks into paid invoices.',
    category: 'Mobile UX',
    icon: MonitorSmartphone,
    readTime: '4 min read',
  },
  {
    slug: 'hvac-google-maps-seo',
    title: 'Google Maps 3-Pack Prominence Factors for HVAC Businesses',
    excerpt: 'The Google Maps 3-Pack captures over 70% of emergency AC repair searches. Learn how Google Business Profile signals, review velocity, and geo-targeted service area pages drive rankings.',
    category: 'Local SEO',
    icon: MapPin,
    readTime: '5 min read',
  },
  {
    slug: 'leads-vs-booked-jobs',
    title: 'Leads vs Booked Jobs: Measuring Real Demand Leakage',
    excerpt: 'High raw lead volume means nothing if inquiries drop off before technician dispatch. Learn how to track end-to-end conversion across the complete 5-stage customer journey.',
    category: 'Economics',
    icon: TrendingUp,
    readTime: '4 min read',
  },
  {
    slug: 'hvac-customer-journey-audit',
    title: 'The HVAC Customer Journey Audit Guide',
    excerpt: 'A practical, step-by-step audit framework for U.S. HVAC contractors to evaluate Google Maps rank, mobile conversion friction, after-hours answering, and quote follow-up.',
    category: 'Audit Guide',
    icon: Compass,
    readTime: '6 min read',
  },
];

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 py-12 md:py-20 space-y-12">
      <BreadcrumbJsonLd trail={[{ name: 'Insights', path: '/insights' }]} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>HVAC Editorial Hub</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            HVAC Market Insights & Growth Guides
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Truthful, evidence-grounded research designed to help U.S. home-service contractors and HVAC business owners eliminate demand leakage and increase booked work.
          </p>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ARTICLES.map((art) => {
            const Icon = art.icon;
            return (
              <article
                key={art.slug}
                className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/20">
                      <Icon className="w-3.5 h-3.5" />
                      {art.category}
                    </span>
                    <span className="text-slate-400 font-medium">{art.readTime}</span>
                  </div>

                  <h2 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                    <Link href={`/insights/${art.slug}`}>{art.title}</Link>
                  </h2>

                  <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80">
                  <Link
                    href={`/insights/${art.slug}`}
                    className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform w-fit"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Audit CTA */}
        <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-4 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-white">Want Your Business&apos;s Specific Data?</h3>
          <p className="text-xs text-slate-300 max-w-xl mx-auto">
            Instead of reading benchmarks, run a free 60-second market diagnostic to see your exact Google Maps rank, review recency, and response speed ratings.
          </p>
          <div className="pt-2 flex justify-center">
            <Link
              href="/analyze"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20"
            >
              <span>{brandConfig.primaryCTA}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

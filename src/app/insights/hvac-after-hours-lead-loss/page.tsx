import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { brandConfig } from '@/config/brand.config';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import AnalyzeCta from '@/components/AnalyzeCta';
import GrowthCallCta from '@/components/GrowthCallCta';
import { PhoneCall, Clock, ShieldCheck, ArrowRight, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Why After-Hours HVAC Calls Fail to Convert & How to Recover Them | Hygroon',
  description:
    'Discover why 35% of emergency HVAC inquiries occur after hours and how automated missed call SMS textbacks capture lost revenue before callers dial competitors.',
  alternates: { canonical: '/insights/hvac-after-hours-lead-loss' },
  openGraph: {
    title: 'Why After-Hours HVAC Calls Fail to Convert & How to Recover Them',
    description:
      'Learn how U.S. HVAC contractors lose high-margin emergency jobs after 5 PM and how to capture after-hours demand.',
    url: 'https://hygroon.com/insights/hvac-after-hours-lead-loss',
    type: 'article',
  },
};

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Why After-Hours HVAC Calls Fail to Convert & How to Recover Them',
  description:
    'An in-depth analysis of emergency after-hours lead drop-off for U.S. HVAC contractors and how instant automated textbacks preserve revenue.',
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

export default function HvacAfterHoursLeadLossPage() {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 py-12 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <BreadcrumbJsonLd
        trail={[
          { name: 'Insights', path: '/insights' },
          { name: 'HVAC After-Hours Lead Loss', path: '/insights/hvac-after-hours-lead-loss' },
        ]}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <header className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            <span>HVAC Market Research</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Why After-Hours HVAC Calls Fail to Convert (And How to Fix It)
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Emergency AC breakdowns and heating outages don&apos;t keep office hours. Learn how unanswered calls after 5 PM erode contractor profitability.
          </p>
        </header>

        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-6 text-sm text-slate-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">The Hidden Cost of Unanswered Evening Calls</h2>
            <p>
              For heating and air conditioning contractors across the United States, peak customer distress frequently occurs outside standard 8:00 AM to 5:00 PM operating hours. When an air conditioner fails during a summer heatwave or a furnace stops on a freezing winter evening, homeowners act immediately.
            </p>
            <p>
              Data across home service inquiries indicates that up to 35% of inbound call volume arrives during evenings, weekends, and holidays. When these incoming calls go to traditional voicemail, over 80% of distress callers hang up without leaving a message and immediately call the next contractor listed in the Google Maps 3-Pack.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Why Traditional Voicemail Fails Distressed Homeowners</h2>
            <p>
              Voicemail creates uncertainty. A homeowner facing indoor temperatures above 90 degrees or below freezing cannot wait until morning to discover if a technician will respond. They require immediate acknowledgment that their emergency has been received.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-400">
              <li>
                <strong className="text-slate-200">Zero Acknowledgment:</strong> Voicemail provides no timeline or dispatch commitment.
              </li>
              <li>
                <strong className="text-slate-200">Competitor Speed:</strong> The second contractor called who provides an instant automated text response locks in the booking.
              </li>
              <li>
                <strong className="text-slate-200">High-Margin Loss:</strong> Emergency replacement opportunities ($8,000 to $15,000 contracts) are frequently lost to slower response times.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">The 15-Second Missed Call Textback Solution</h2>
            <p>
              Hygroon solves after-hours demand leakage by deploying automated SMS textback workflows. When an incoming phone call goes unanswered, an intelligent text message triggers within 15 seconds:
            </p>
            <blockquote className="p-4 rounded-xl bg-[#0d1322] border-l-4 border-amber-500 italic text-slate-200">
              &quot;Hi, thanks for calling [Contractor Name]! We&apos;re currently on a service call or assisting another customer. Reply here with your address and AC issue for priority dispatch.&quot;
            </blockquote>
            <p>
              This immediate text engagement reassures the homeowner, initiates two-way communication, and prevents them from returning to Google search to call a competitor.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Next Steps for HVAC Business Owners</h2>
            <p>
              Auditing after-hours responsiveness is a key component of Hygroon&apos;s 5-stage customer journey audit. Learn more about how we evaluate local search prominence and speed-to-lead for your business.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold">
              <Link href="/industries/hvac" className="text-amber-400 hover:underline flex items-center gap-1">
                <span>View HVAC Growth Systems</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/how-it-works" className="text-amber-400 hover:underline flex items-center gap-1">
                <span>Learn How Hygroon Works</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>
        </div>

        {/* CTA Card */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10 border border-amber-500/20 text-center space-y-4">
          <h3 className="text-xl font-bold text-white">See Where Your Business Is Losing Evening Calls</h3>
          <p className="text-xs text-slate-300 max-w-lg mx-auto">
            Run a free 60-second market diagnostic to evaluate your local search rank, review velocity, and response latency.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <AnalyzeCta source="article_after_hours" />
            <GrowthCallCta source="article_after_hours_review" className="px-5 py-2.5 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-200 text-xs font-semibold">
              <span>Get a Free Growth Review</span>
            </GrowthCallCta>
          </div>
        </div>
      </article>
    </div>
  );
}

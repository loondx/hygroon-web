import React from 'react';
import type { Metadata } from 'next';
import { brandConfig } from '@/config/brand.config';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import TrackedMailtoLink from '@/components/TrackedMailtoLink';
import AnalyzeCta from '@/components/AnalyzeCta';
import GrowthCallCta from '@/components/GrowthCallCta';
import { TrendingUp, ClipboardList, Handshake, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Reach ${brandConfig.name} to discuss growth, ask about an analysis, or explore a partnership.`,
  alternates: { canonical: '/contact' },
};

const REASON_CARD_CLASSES = 'text-xs font-bold text-amber-400 hover:underline flex items-center gap-1';

// "Discuss Growth" is a real sales enquiry — it goes through the same
// consultation-request pipeline as "Book a Growth Call" (Business/Contact/
// Activity), not a disconnected mailto. The other two are non-sales
// (support-ish or genuinely "other") and deliberately stay plain mailto:
// so they're distinguishable from an actual sales lead in the pipeline.
const REASONS = [
  {
    title: 'Discuss Growth',
    icon: TrendingUp,
    desc: 'You want more enquiries converted into booked jobs and want to talk through where to start.',
    subject: "Let's discuss growth",
    source: 'contact_discuss_growth',
    salesConnected: true,
  },
  {
    title: 'Ask About an Analysis',
    icon: ClipboardList,
    desc: 'You have a question about a Servnexa analysis you ran, or want help reading your findings.',
    subject: 'Question about my analysis',
    source: 'contact_ask_analysis',
    salesConnected: false,
  },
  {
    title: 'Partnership / Other',
    icon: Handshake,
    desc: 'Anything else: partnerships, press, or a question that doesn’t fit above.',
    subject: 'Partnership / other enquiry',
    source: 'contact_partnership_other',
    salesConnected: false,
  },
] as const;

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 py-12 md:py-20">
      <BreadcrumbJsonLd trail={[{ name: 'Contact', path: '/contact' }]} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">Contact Servnexa</h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Tell us why you&apos;re reaching out and we&apos;ll route it to the right person.
          </p>
        </div>

        {/* Reason Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {REASONS.map((reason) => {
            const Icon = reason.icon;
            return (
              <div key={reason.title} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-base">{reason.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{reason.desc}</p>
                <div className="pt-1">
                  {reason.salesConnected ? (
                    <GrowthCallCta source={reason.source} className={REASON_CARD_CLASSES}>
                      <span>Talk to us</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </GrowthCallCta>
                  ) : (
                    <TrackedMailtoLink
                      href={`mailto:${brandConfig.salesEmail}?subject=${encodeURIComponent(reason.subject)}`}
                      source={reason.source}
                      className={REASON_CARD_CLASSES}
                    >
                      <span>Email us</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </TrackedMailtoLink>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Support (existing clients) */}
        <div className="p-5 rounded-2xl bg-[#0d1322] border border-slate-800 text-center space-y-2">
          <p className="text-xs text-slate-400">
            Already a client and need support?{' '}
            <TrackedMailtoLink
              href={`mailto:${brandConfig.supportEmail}`}
              source="contact_support_mailto"
              className="font-bold text-blue-400 hover:underline"
            >
              {brandConfig.supportEmail}
            </TrackedMailtoLink>
          </p>
        </div>

        {/* Diagnostic Link */}
        <div className="p-6 rounded-2xl bg-[#0d1322] border border-slate-800 text-center space-y-3">
          <h4 className="font-bold text-white text-sm">Want to see where you&apos;d start first?</h4>
          <p className="text-xs text-slate-400">You don&apos;t need to wait for an email reply to get your first findings.</p>
          <div className="pt-1">
            <AnalyzeCta
              source="contact_page"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-all shadow-md shadow-amber-500/20"
              iconClassName="w-3.5 h-3.5"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

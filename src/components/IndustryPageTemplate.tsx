import React from 'react';
import Link from 'next/link';
import { ArrowRight, type LucideIcon } from 'lucide-react';
import { brandConfig } from '@/config/brand.config';
import BreadcrumbJsonLd from './BreadcrumbJsonLd';

export interface IndustryPillar {
  icon: LucideIcon;
  title: string;
  body: string;
}

export interface IndustrySection {
  title: string;
  body?: string;
  pillars?: IndustryPillar[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface IndustryPageTemplateProps {
  slug: string;
  breadcrumbName: string;
  badgeLabel: string;
  badgeIcon: LucideIcon;
  heroTitle: string;
  heroBody: string;
  pillars?: IndustryPillar[];
  sections?: IndustrySection[];
  faqs?: FAQItem[];
  ctaTitle: string;
  ctaBody: string;
}

// Shared shell for every /industries/<slug> landing page: content (pillars,
// sections, copy) is genuinely different per industry.
export default function IndustryPageTemplate({
  slug,
  breadcrumbName,
  badgeLabel,
  badgeIcon: BadgeIcon,
  heroTitle,
  heroBody,
  pillars = [],
  sections = [],
  faqs = [],
  ctaTitle,
  ctaBody,
}: IndustryPageTemplateProps) {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 py-12 md:py-20">
      <BreadcrumbJsonLd trail={[{ name: 'Industries', path: '/industries' }, { name: breadcrumbName, path: `/industries/${slug}` }]} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
            <BadgeIcon className="w-4 h-4" />
            <span>{badgeLabel}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white text-balance">{heroTitle}</h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">{heroBody}</p>
        </div>

        {/* Flat Pillars fallback if no sections passed */}
        {sections.length === 0 && pillars.length > 0 && (
          <div className="space-y-5">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.title} className="p-6 sm:p-7 rounded-2xl bg-slate-900/40 border border-slate-800 flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1.5">
                    <h2 className="font-bold text-white text-base sm:text-lg">{pillar.title}</h2>
                    <p className="text-sm text-slate-400 leading-relaxed">{pillar.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Structured Sections with H2 headings */}
        {sections.length > 0 && (
          <div className="space-y-12">
            {sections.map((sec) => (
              <section key={sec.title} className="space-y-5">
                <div className="border-b border-slate-800 pb-3 space-y-1">
                  <h2 className="text-2xl font-bold text-white tracking-tight">{sec.title}</h2>
                  {sec.body && <p className="text-slate-300 text-sm leading-relaxed">{sec.body}</p>}
                </div>
                {sec.pillars && sec.pillars.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sec.pillars.map((pillar) => {
                      const Icon = pillar.icon;
                      return (
                        <div key={pillar.title} className="p-5 rounded-xl bg-slate-900/40 border border-slate-800 space-y-2.5">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                              <Icon className="w-4.5 h-4.5" />
                            </div>
                            <h3 className="font-bold text-white text-base leading-tight">{pillar.title}</h3>
                          </div>
                          <p className="text-sm text-slate-400 leading-relaxed">{pillar.body}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            ))}
          </div>
        )}

        
        {/* FAQ Section & FAQ Schema */}
        {faqs.length > 0 && (
          <>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: faqs.map((faq) => ({
                    "@type": "Question",
                    name: faq.question,
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: faq.answer,
                    },
                  })),
                }),
              }}
            />
            <section className="space-y-6 pt-6 border-t border-slate-800">
              <div className="text-center space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Frequently Asked Questions</h2>
                <p className="text-sm text-slate-400">Everything HVAC contractors ask about ranking and converting local demand.</p>
              </div>
              <div className="space-y-4 max-w-3xl mx-auto">
                {faqs.map((faq) => (
                  <div key={faq.question} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-2">
                    <h3 className="text-lg font-bold text-white">{faq.question}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* CTA Section */}
        <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10 border border-amber-500/20 text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">{ctaTitle}</h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">{ctaBody}</p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={`/analyze?industry=${slug}`}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20 inline-flex items-center justify-center gap-2"
            >
              <span>{brandConfig.primaryCTA}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={`/growth-review?industry=${slug}`}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white font-semibold text-sm transition-all inline-flex items-center justify-center gap-2"
            >
              <span>Get a Free Growth Review</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

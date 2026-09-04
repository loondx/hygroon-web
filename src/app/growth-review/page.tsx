'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { brandConfig } from '@/config/brand.config';
import { getAttribution, getLastAnalysis, buildGrowthCallMailto, type LastAnalysis } from '@/lib/leadContext';
import { trackConsultationRequested, trackContactAction, trackGrowthCallClick } from '@/lib/analytics';

type Status = 'form' | 'submitting' | 'success' | 'error';

// The real, persisted "Get a Free Growth Review" flow: POST
// /api/public/consultation-requests (PublicIntakeService.requestConsultation
// on the API). There is still no calendar/video integration anywhere in
// this system, so success only ever means "request received," never
// "meeting booked" or "call scheduled."
export default function GrowthReviewPage() {
  const [context, setContext] = useState<LastAnalysis | null>(null);
  const [ctaSource, setCtaSource] = useState('growth_review_direct');
  const [hydrated, setHydrated] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<Status>('form');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setContext(getLastAnalysis());
    try {
      const savedEmail = localStorage.getItem('hygroon_user_email');
      if (savedEmail) setEmail(savedEmail);
    } catch {
      // ignore
    }
    const params = new URLSearchParams(window.location.search);
    const src = params.get('source');
    if (src) setCtaSource(src);
    trackContactAction({ source: src ?? 'growth_review_direct', intent: 'consultation' });
    trackGrowthCallClick({ source: src ?? 'growth_review_direct' });
    setHydrated(true);
  }, []);

  const knownBusinessName = context?.businessName ?? null;
  const knownCity = context?.city ?? null;
  const knownIndustrySlug = context?.industrySlug ?? null;
  const reportToken = context?.reportToken;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    if (!knownBusinessName && !businessName.trim()) return;

    setStatus('submitting');
    setErrorMessage(null);

    const attribution = getAttribution();

    try {
      const res = await fetch('/api/public/consultation-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reportToken,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          note: note.trim() || undefined,
          sourcePage: '/growth-review',
          ctaSource,
          industrySlug: knownIndustrySlug ?? undefined,
          businessName: knownBusinessName ?? businessName.trim(),
          website: knownBusinessName ? undefined : website.trim() || undefined,
          city: knownCity ?? undefined,
          utm: attribution
            ? {
                source: attribution.utm_source,
                medium: attribution.utm_medium,
                campaign: attribution.utm_campaign,
                term: attribution.utm_term,
                content: attribution.utm_content,
              }
            : undefined,
          referrer: attribution?.referrer,
          firstTouch: attribution
            ? {
                utmSource: attribution.utm_source,
                utmMedium: attribution.utm_medium,
                utmCampaign: attribution.utm_campaign,
                utmTerm: attribution.utm_term,
                utmContent: attribution.utm_content,
                referrer: attribution.referrer,
                landingPage: attribution.landingPage,
              }
            : undefined,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message || `Could not send request (${res.status})`);
      }

      trackConsultationRequested({ source: ctaSource, industry: knownIndustrySlug ?? undefined });
      setStatus('success');
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Could not send your request. Please try again.');
      setStatus('error');
    }
  };

  const mailtoFallback = buildGrowthCallMailto({
    salesEmail: brandConfig.salesEmail,
    sourcePage: '/growth-review',
    industrySlug: knownIndustrySlug ?? undefined,
  });

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-[#090d16] text-slate-100 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto text-center space-y-5">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">Request Received</h1>
          <p className="text-slate-300 leading-relaxed">
            We&apos;ve got your details. We&apos;ll review the business context and reach out to arrange the next
            step.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/"
              className="w-full sm:w-auto px-6 h-12 flex items-center justify-center rounded-xl border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white font-semibold text-sm transition-all"
            >
              Back to Home
            </Link>
            {reportToken && (
              <Link
                href={`/reports/${reportToken}`}
                className="w-full sm:w-auto px-6 h-12 flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all"
              >
                <span>View My Analysis</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 py-12 md:py-16">
      <BreadcrumbJsonLd trail={[{ name: 'Growth Review', path: '/growth-review' }]} />
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[11px] font-bold uppercase tracking-wider">
            Free Business Review
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Let&apos;s Look at Your Growth Opportunities.
          </h1>
          <p className="text-slate-400 text-sm max-w-sm mx-auto">
            Tell us how to reach you. We&apos;ll review the business context we already have and follow up
            personally.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-7 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-5">
          {hydrated && (knownBusinessName || knownCity || knownIndustrySlug) && (
            <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 text-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">Reviewing</span>
              {knownBusinessName && <span className="text-white font-semibold block">{knownBusinessName}</span>}
              {(knownCity || knownIndustrySlug) && (
                <span className="text-slate-400 text-xs block mt-0.5">
                  {[knownCity, knownIndustrySlug].filter(Boolean).join(', ')}
                </span>
              )}
            </div>
          )}

          {hydrated && !knownBusinessName && (
            <>
              <div className="space-y-1.5">
                <label htmlFor="gr-business" className="block text-sm font-bold text-slate-300">
                  Business Name
                </label>
                <input
                  id="gr-business"
                  name="organization"
                  type="text"
                  required
                  autoComplete="organization"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-base focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="gr-website" className="block text-sm font-bold text-slate-300">
                  Website <span className="text-slate-500 font-normal">(optional)</span>
                </label>
                <input
                  id="gr-website"
                  name="url"
                  type="text"
                  inputMode="url"
                  autoComplete="url"
                  placeholder="yourbusiness.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-base focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50"
                />
              </div>
            </>
          )}

          <div className="space-y-1.5">
            <label htmlFor="gr-name" className="block text-sm font-bold text-slate-300">
              Name
            </label>
            <input
              id="gr-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 px-3.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-base focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="gr-email" className="block text-sm font-bold text-slate-300">
              Work Email
            </label>
            <input
              id="gr-email"
              name="email"
              type="email"
              required
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 px-3.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-base focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="gr-phone" className="block text-sm font-bold text-slate-300">
              Phone <span className="text-slate-500 font-normal">(optional)</span>
            </label>
            <input
              id="gr-phone"
              name="tel"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-11 px-3.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-base focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="gr-note" className="block text-sm font-bold text-slate-300">
              Anything you&apos;d like us to know? <span className="text-slate-500 font-normal">(optional)</span>
            </label>
            <textarea
              id="gr-note"
              name="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-base focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 resize-none"
            />
          </div>

          {status === 'error' && errorMessage && (
            <div className="p-3.5 rounded-lg bg-rose-950/40 border border-rose-800/50 text-sm text-rose-200 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span>{errorMessage}</span>
                <a href={mailtoFallback} className="block font-bold text-amber-400 hover:underline">
                  Email us instead
                </a>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full h-12 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-base transition-all disabled:opacity-50 flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Sending…</span>
              </>
            ) : (
              <span>Request My Free Growth Review</span>
            )}
          </button>
          <p className="text-xs text-slate-500 text-center">
            We&apos;ll only use this to follow up about your growth review.
          </p>
        </form>
      </div>
    </div>
  );
}

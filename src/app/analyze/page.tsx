'use client';

import React, { Suspense, useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { trackAnalyzeStarted, trackAnalyzeCompleted, trackReportUnlocked } from '@/lib/analytics';
import { isPlausibleWebsite } from '@/lib/analyzeValidation';
import { saveLastAnalysis } from '@/lib/leadContext';
import {
  Compass,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Zap,
  Loader2,
  XCircle,
  Globe,
  Building2,
  Wrench,
  Mail,
  ShieldCheck,
  Award,
  Users,
} from 'lucide-react';

interface AnalyzeResponse {
  businessId: string;
  auditId: string;
  publicToken: string;
  status: string;
}

interface ResolveCandidate {
  externalId: string;
  name: string;
  website: string | null;
  phone: string | null;
  city: string | null;
  rating: number | null;
  reviewCount: number;
  marketId: string;
  marketCode: string;
  countryName: string;
  industrySlug: string | null;
  industryName: string | null;
}

interface Finding {
  id: string;
  code: string;
  title: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';
  source: string;
  businessImpact: string;
  recommendedAction: string;
}

interface Score {
  finalScore: number;
  band: 'HOT' | 'GOOD' | 'LOW' | 'SKIP';
  calculatedAt: string;
}

interface Competitor {
  name: string;
  website: string | null;
  rating: number | null;
  reviewCount: number;
  rankPosition: number | null;
  relevanceScore: number;
  isPrimaryCompetitor: boolean;
  strongestAdvantage: string;
  possibleGap: string;
}

interface Stage {
  type: string;
  label: string;
  state: 'done' | 'active' | 'pending' | 'skipped';
}

interface AuditView {
  status: 'QUEUED' | 'RUNNING' | 'COMPLETED' | 'PARTIAL' | 'FAILED';
  auditVersion: string;
  startedAt: string | null;
  completedAt: string | null;
  errorMessage: string | null;
  stages: Stage[];
  findings: Finding[];
  totalFindings?: number;
  totalCompetitors?: number;
  scores: Score[];
  business: {
    name: string;
    website: string | null;
    rating: number | null;
    reviewCount: number;
    industry: { name: string } | null;
    locations: { city: string | null }[];
    competitors: Competitor[];
  };
}

const POLL_INTERVAL_MS = 2000;
const POLL_TIMEOUT_MS = 45_000;

// Maps to slugs that actually exist in the Industry catalog today (verified
// against GET /industries/public) — a slug that doesn't exist would make
// /public/analyze 404 on the industry lookup. Same taxonomy as the backend's
// infer-industry.ts, so a service typed here and a category read off a real
// search result land on the same industry.
function inferIndustrySlugFromService(serviceText: string): string {
  const lower = serviceText.toLowerCase();
  if (/hvac|air.?condition|\bac\b|cooling|heating|furnace/.test(lower)) return 'hvac';
  if (/waterproof/.test(lower)) return 'waterproofing';
  if (/drain|wastewater|septic|plumb/.test(lower)) return 'drainage';
  if (/restoration|water damage|flood|mold/.test(lower)) return 'water-restoration';
  if (/pest|termite|exterminat/.test(lower)) return 'pest-control';
  if (/\bpool\b|\bspa\b/.test(lower)) return 'pool-services';
  if (/facility|janitorial|commercial clean/.test(lower)) return 'facility-services';
  if (/maintenance|handyman|property/.test(lower)) return 'property-maintenance';
  return 'hvac'; // most common trade in the catalog; still overridden by a real resolve() match when one exists
}

function AnalyzePageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryFromUrl = searchParams.get('q') || '';

  // STEP 1 Form State: ONLY 3 initial inputs (Website, City, Main Service)
  const [website, setWebsite] = useState(queryFromUrl.includes('.') ? queryFromUrl : '');
  const [city, setCity] = useState('');
  const [service, setService] = useState('');

  // Flow State
  const [phase, setPhase] = useState<'input' | 'resolving' | 'polling' | 'teaser' | 'error' | 'timeout'>('input');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [audit, setAudit] = useState<AuditView | null>(null);
  const [progressStages, setProgressStages] = useState<Stage[]>([]);

  // STEP 2 Form State: ONLY 1 final input (Email)
  const [email, setEmail] = useState('');
  const [leadLoading, setLeadLoading] = useState(false);
  const [leadError, setLeadError] = useState<string | null>(null);

  const businessIdRef = useRef<string | null>(null);
  const pollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const funnelMetaRef = useRef<{ industry?: string; market?: string }>({});

  const stopPolling = useCallback(() => {
    if (pollTimer.current) {
      clearTimeout(pollTimer.current);
      pollTimer.current = null;
    }
  }, []);

  const pollAudit = useCallback((token: string, deadline: number) => {
    const tick = async () => {
      try {
        const res = await fetch(`/api/audits/public/${token}`);
        if (!res.ok) throw new Error(`Audit lookup failed (${res.status})`);
        const data: AuditView = await res.json();
        setProgressStages(data.stages ?? []);

        if (data.status === 'COMPLETED' || data.status === 'PARTIAL') {
          setAudit(data);
          setPhase('teaser');
          trackAnalyzeCompleted(funnelMetaRef.current);
          return;
        }
        if (data.status === 'FAILED') {
          setErrorMessage(data.errorMessage || 'The audit could not be completed for this website.');
          setPhase('error');
          return;
        }
        if (Date.now() >= deadline) {
          setPhase('timeout');
          return;
        }
        pollTimer.current = setTimeout(tick, POLL_INTERVAL_MS);
      } catch {
        if (Date.now() >= deadline) {
          setPhase('timeout');
          return;
        }
        pollTimer.current = setTimeout(tick, POLL_INTERVAL_MS);
      }
    };
    tick();
  }, [stopPolling]);

  // Handle Form Submission (Step 1: Website, City, Main Service)
  const handleAnalyzeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!website.trim()) {
      setErrorMessage('Enter your business website.');
      return;
    }
    if (!isPlausibleWebsite(website)) {
      setErrorMessage('Enter a valid business website (e.g. yourbusiness.com).');
      return;
    }
    if (!city.trim()) {
      setErrorMessage('Enter your city or market.');
      return;
    }
    if (!service.trim()) {
      setErrorMessage('Enter your main service.');
      return;
    }

    stopPolling();
    setErrorMessage(null);
    setPhase('resolving');

    try {
      // 1. Resolve business details via public API
      const resolveRes = await fetch('/api/public/resolve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: website.trim(), city: city.trim() }),
      });

      let candidate: ResolveCandidate | null = null;
      let marketCode = 'OM'; // Default GCC market
      let industrySlug = inferIndustrySlugFromService(service.trim());
      let businessName = website.replace(/^https?:\/\//i, '').replace(/\/.*$/, '');

      if (resolveRes.ok) {
        const resolveData = await resolveRes.json();
        if (resolveData.status === 'RESOLVED' && resolveData.candidate) {
          const c: ResolveCandidate = resolveData.candidate;
          candidate = c;
          marketCode = c.marketCode;
          if (c.industrySlug) industrySlug = c.industrySlug;
          if (c.name) businessName = c.name;
        } else if (resolveData.status === 'AMBIGUOUS' && resolveData.candidates?.length > 0) {
          const c: ResolveCandidate = resolveData.candidates[0];
          candidate = c;
          marketCode = c.marketCode;
          if (c.industrySlug) industrySlug = c.industrySlug;
          if (c.name) businessName = c.name;
        }
      }

      setPhase('polling');

      // 2. Trigger real backend audit execution
      const analyzeRes = await fetch('/api/public/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          marketCode,
          industrySlug,
          businessName,
          city: city.trim(),
          domain: website.trim(),
          externalId: candidate?.externalId,
        }),
      });

      if (!analyzeRes.ok) {
        const body = await analyzeRes.json().catch(() => null);
        throw new Error(body?.message || `Analysis could not be started (${analyzeRes.status})`);
      }

      const data: AnalyzeResponse = await analyzeRes.json();
      businessIdRef.current = data.businessId;
      funnelMetaRef.current = { industry: industrySlug, market: marketCode };
      trackAnalyzeStarted(funnelMetaRef.current);

      // 3. Poll real task progress states
      pollAudit(data.publicToken, Date.now() + POLL_TIMEOUT_MS);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Could not analyze business. Please check details and try again.');
      setPhase('error');
    }
  };

  // Handle Step 2 Email Submission
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !businessIdRef.current) return;

    setLeadLoading(true);
    setLeadError(null);

    try {
      const res = await fetch('/api/public/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessId: businessIdRef.current,
          name: email.split('@')[0] || 'Business Owner',
          email: email.trim(),
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message || `Could not deliver report (${res.status})`);
      }

      const { reportToken }: { reportToken: string | null } = await res.json();
      if (reportToken) {
        try {
          localStorage.setItem('servnexa_user_email', email.trim());
        } catch {}
        saveLastAnalysis({
          reportToken,
          businessName: audit?.business.name || website,
          industrySlug: funnelMetaRef.current.industry,
          city,
        });
        trackReportUnlocked(funnelMetaRef.current);
        router.push(`/reports/${reportToken}`);
      } else {
        setErrorMessage('Audit report generation in progress. Please check back shortly.');
        setPhase('error');
      }
    } catch (err) {
      setLeadError(err instanceof Error ? err.message : 'Could not send report. Please try again.');
    } finally {
      setLeadLoading(false);
    }
  };

  const resetForm = () => {
    stopPolling();
    setAudit(null);
    setProgressStages([]);
    setErrorMessage(null);
    setPhase('input');
  };

  const topAdvantage = audit?.findings.find((f) => f.severity === 'LOW' || f.severity === 'INFO');
  const topOpportunity = audit?.findings.find((f) => f.severity === 'CRITICAL' || f.severity === 'HIGH');
  const primaryCompetitor = audit?.business.competitors.find((c) => c.isPrimaryCompetitor) || audit?.business.competitors[0];
  const score = audit?.scores[0];

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Interactive Guided Stepper Journey Bar */}
        <div className="flex items-center justify-between max-w-sm mx-auto px-4 py-2 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-semibold backdrop-blur-md">
          <div className={`flex items-center gap-1.5 ${phase === 'input' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${phase === 'input' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'}`}>1</span>
            <span>Input</span>
          </div>
          <div className="w-6 h-px bg-slate-800" />
          <div className={`flex items-center gap-1.5 ${phase === 'resolving' || phase === 'polling' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${phase === 'resolving' || phase === 'polling' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'}`}>2</span>
            <span>Crawl</span>
          </div>
          <div className="w-6 h-px bg-slate-800" />
          <div className={`flex items-center gap-1.5 ${phase === 'teaser' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${phase === 'teaser' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'}`}>3</span>
            <span>Unlock</span>
          </div>
        </div>

        {/* STEP 1: INITIAL FORM — ONLY 3 FIELDS (Website, City, Service) */}
        {phase === 'input' && (
          <div className="p-6 sm:p-10 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl space-y-6 backdrop-blur-xl">
            {errorMessage && (
              <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/50 flex items-start gap-3 text-sm text-rose-200">
                <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleAnalyzeSubmit} className="space-y-5">
              {/* Field 1: Website */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-amber-400" />
                  <span>Website</span>
                </label>
                <input
                  type="text"
                  required
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://yourbusiness.com"
                  className="w-full h-12 px-4 rounded-xl bg-[#0d1322] border border-slate-800 text-white text-sm sm:text-base focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder:text-slate-600"
                />
              </div>

              {/* Field 2: City */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-amber-400" />
                  <span>City</span>
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Houston, TX or Muscat"
                  className="w-full h-12 px-4 rounded-xl bg-[#0d1322] border border-slate-800 text-white text-sm sm:text-base focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder:text-slate-600"
                />
              </div>

              {/* Field 3: Main Service */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-amber-400" />
                  <span>Main Service</span>
                </label>
                <input
                  type="text"
                  required
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  placeholder="e.g. HVAC / AC Repair or Plumbing"
                  className="w-full h-12 px-4 rounded-xl bg-[#0d1322] border border-slate-800 text-white text-sm sm:text-base focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder:text-slate-600"
                />
              </div>

              {/* Primary Submit Button */}
              <button
                type="submit"
                className="w-full h-14 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-base transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2.5 active:scale-[0.98] mt-2"
              >
                <span>Analyze My Business</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Free Snapshot
              </span>
              <span>&bull;</span>
              <span>No Login</span>
              <span>&bull;</span>
              <span>No Credit Card</span>
            </div>
          </div>
        )}

        {/* STEP: RESOLVING / STARTING */}
        {phase === 'resolving' && (
          <div className="p-8 sm:p-12 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl text-center space-y-4">
            <Loader2 className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
            <h3 className="text-lg font-bold text-white">Locating &quot;{website}&quot; in {city}…</h3>
            <p className="text-xs text-slate-400">Initializing 6-dimension market audit engine.</p>
          </div>
        )}

        {/* STEP: REAL BACKEND TASK PROGRESS POLLING */}
        {phase === 'polling' && (
          <div className="p-6 sm:p-10 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <Loader2 className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
              <h3 className="text-xl font-bold text-white">Running Your Market Audit…</h3>
              <p className="text-xs text-slate-400">Analyzing search rankings, reputation, competitors, and conversion gaps.</p>
            </div>

            {progressStages.length > 0 ? (
              <ul className="space-y-3 pt-2 border-t border-slate-800">
                {progressStages.map((stage) => (
                  <li key={stage.type} className="flex items-center gap-3 text-sm">
                    {stage.state === 'done' ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    ) : stage.state === 'active' ? (
                      <Loader2 className="w-5 h-5 text-amber-400 animate-spin shrink-0" />
                    ) : (
                      <span className="w-5 h-5 rounded-full border border-slate-700 shrink-0" />
                    )}
                    <span
                      className={
                        stage.state === 'done'
                          ? 'text-slate-200'
                          : stage.state === 'active'
                            ? 'text-white font-bold'
                            : 'text-slate-500'
                      }
                    >
                      {stage.label}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="space-y-2 text-xs text-slate-400 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-2 text-amber-400 font-semibold">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Preparing your market snapshot…</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: TEASER SNAPSHOT & EMAIL GATE */}
        {phase === 'teaser' && audit && (
          <div className="space-y-6 animate-fadeIn">
            {/* Teaser Summary Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b border-slate-800">
                <div>
                  <h2 className="text-2xl font-bold text-white">{audit.business.name}</h2>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{city}</span>
                    <span>&bull;</span>
                    <span>{service}</span>
                  </p>
                </div>
                {score && (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
                    <span>Market Score: {Math.round(score.finalScore)}/100</span>
                  </div>
                )}
              </div>

              {/* 4 Teaser Findings (Strongest Signal, Biggest Gap, Top Competitor, Main Opportunity) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Strongest Signal */}
                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/40 space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Strongest Signal</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
                    {topAdvantage
                      ? topAdvantage.businessImpact
                      : 'No single standout strength was flagged in this quick scan: the full report covers this in more depth.'}
                  </p>
                </div>

                {/* 2. Biggest Visible Gap */}
                <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/40 space-y-1.5">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Biggest Visible Gap</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
                    {topOpportunity
                      ? topOpportunity.businessImpact
                      : 'No high-priority gap was flagged in this quick scan: early signals look solid.'}
                  </p>
                </div>

                {/* 3. Top Competitor */}
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                    <Users className="w-4 h-4" />
                    <span>Top Competitor</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
                    {primaryCompetitor
                      ? `${primaryCompetitor.name} (${primaryCompetitor.rating ? primaryCompetitor.rating.toFixed(1) + '★' : 'High Local Rank'})`
                      : 'No directly comparable competitor was found nearby in this scan.'}
                  </p>
                </div>

                {/* 4. Main Opportunity */}
                <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/40 space-y-1.5">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                    <Zap className="w-4 h-4" />
                    <span>Main Opportunity</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
                    {topOpportunity
                      ? topOpportunity.recommendedAction
                      : 'No urgent fix was flagged: your full report covers lower-priority polish opportunities.'}
                  </p>
                </div>
              </div>
            </div>

            {/* EMAIL GATE FORM — ONLY 1 FINAL INPUT (Email) */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-amber-500/10 to-slate-900 border border-amber-500/30 shadow-2xl space-y-5">
              <div className="text-center space-y-1.5">
                <h3 className="text-xl font-bold text-white">Where should we send your full analysis?</h3>
                <p className="text-xs text-slate-400">
                  Receive your complete multi-page diagnostic report with step-by-step fix recommendations.
                </p>
              </div>

              {leadError && (
                <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/50 text-xs text-rose-200 text-center">
                  {leadError}
                </div>
              )}

              <form onSubmit={handleEmailSubmit} className="space-y-4 max-w-md mx-auto">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-300 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-amber-400" />
                    <span>Email Address</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full h-12 px-4 rounded-xl bg-[#0d1322] border border-slate-800 text-white text-base focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder:text-slate-600"
                  />
                  <p className="text-[11px] text-slate-500">We&apos;ll only use this to send your report.</p>
                </div>

                <button
                  type="submit"
                  disabled={leadLoading}
                  className="w-full h-13 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-base transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.98]"
                >
                  {leadLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Generating Full Report…</span>
                    </>
                  ) : (
                    <>
                      <span>View My Full Analysis</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ERROR STATE */}
        {phase === 'error' && (
          <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl max-w-md mx-auto space-y-5 text-center">
            <XCircle className="w-10 h-10 text-rose-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">Analysis Could Not Complete</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{errorMessage}</p>
            <button
              onClick={resetForm}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors"
            >
              Start Over
            </button>
          </div>
        )}

        {/* TIMEOUT STATE */}
        {phase === 'timeout' && (
          <div className="p-8 rounded-2xl bg-amber-950/20 border border-amber-800/30 max-w-md mx-auto text-center space-y-4">
            <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">Analysis Taking Longer Than Expected</h3>
            <p className="text-xs text-slate-300">
              Your audit is processing in the background. Please try again or check back shortly.
            </p>
            <button
              onClick={resetForm}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
            >
              Back to Form
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AnalyzePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#090d16] flex items-center justify-center text-slate-400 text-sm">
          <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading Diagnostic Engine…
        </div>
      }
    >
      <AnalyzePageInner />
    </Suspense>
  );
}

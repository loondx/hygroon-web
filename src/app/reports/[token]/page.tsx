'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { brandConfig } from '@/config/brand.config';
import { trackReportViewed, trackContactAction } from '@/lib/analytics';
import { saveLastAnalysis } from '@/lib/leadContext';
import { classifyJourneyStages, type StageStatus, type JourneyFindingLike } from '@/lib/journeyStages';
import { countByPriority, buildExecutiveSummary, topFindings, buildFixFirstTiers, formatFindingSource } from '@/lib/findingsSummary';
import GrowthCallCta from '@/components/GrowthCallCta';
import {
  Loader2,
  AlertTriangle,
  CheckCircle2,
  Share2,
  MapPin,
  Star,
  ArrowRight,
  Globe,
  Smartphone,
  Search,
  PhoneCall,
  MessageSquare,
  CalendarCheck,
  ChevronDown,
  ChevronUp,
  type LucideIcon,
} from 'lucide-react';

interface ReportMetric {
  id: string;
  key: string;
  label: string;
  value: number;
  previousValue: number | null;
  unit: string | null;
  isPrimary: boolean;
}

interface ReportFinding {
  id: string;
  title: string;
  detail: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';
  recommendedAction: string | null;
}

interface DiagnosticFinding {
  id: string;
  title: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';
  businessImpact: string;
  recommendedAction: string;
  // Real fields the backend already returns (AuditFinding has no `select`
  // narrowing on this endpoint) but this file didn't previously read.
  type: string;
  source: string;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
}

interface DiagnosticCompetitor {
  name: string;
  rating: number | null;
  reviewCount: number;
  relevanceScore: number;
  isPrimaryCompetitor: boolean;
  strongestAdvantage: string;
  possibleGap: string;
}

interface PublicReportView {
  kind: 'CLIENT_MONTHLY' | 'DIAGNOSTIC';
  title: string;
  status: string;
  generatedAt: string | null;
  metrics?: ReportMetric[];
  findings?: ReportFinding[];
  client?: { name: string; organization: { name: string } } | null;
  audit?: {
    completedAt: string | null;
    findings: DiagnosticFinding[];
    scores: { finalScore: number; band: string }[];
    business: {
      name: string;
      website: string | null;
      rating: number | null;
      reviewCount: number;
      industry: { name: string } | null;
      locations: { city: string | null }[];
      competitors: DiagnosticCompetitor[];
    };
  };
}

export default function PublicReportPage() {
  const params = useParams();
  const token = params?.token as string;

  const [report, setReport] = useState<PublicReportView | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/reports/public/${token}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(res.status === 404 ? 'not-found' : `Could not load report (${res.status})`);
        return res.json();
      })
      .then((data: PublicReportView) => {
        if (!cancelled) {
          setReport(data);
          trackReportViewed({ industry: data.audit?.business.industry?.name });
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Could not load report');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  // Known from a prior /analyze unlock in this browser — prefills the
  // consultation form's email field so a returning visitor doesn't have to
  // retype it (GrowthCallCta's prefill prop below).
  const [ownerEmail, setOwnerEmail] = useState('');

  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem('hygroon_user_email');
      if (savedEmail) setOwnerEmail(savedEmail);
    } catch {}
  }, []);

  // Refreshes the "last analysis" context this browser knows about — covers
  // both the visitor who just came from /analyze (already saved there) and
  // someone opening a shared report link directly, so either way a "Book a
  // Growth Call" click from this page carries real context instead of none.
  useEffect(() => {
    if (report?.kind === 'DIAGNOSTIC' && report.audit) {
      saveLastAnalysis({
        reportToken: token,
        businessName: report.audit.business.name,
        city: report.audit.business.locations[0]?.city ?? undefined,
      });
    }
  }, [report, token]);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: report?.title ?? 'Hygroon Report', url });
        return;
      } catch {
        // fall through to copy
      }
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-400">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading snapshot…</span>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
        <div className="max-w-md text-center space-y-4 p-8 rounded-2xl bg-slate-900 border border-slate-800">
          <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto" />
          <h1 className="text-lg font-bold text-white">This report link isn&apos;t available</h1>
          <p className="text-sm text-slate-400">
            {error === 'not-found'
              ? "We couldn't find a report at this link. It may have expired, or the link may be incorrect."
              : error}
          </p>
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-sm"
          >
            Run a new analysis
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 sm:py-16 print:bg-white print:text-slate-900 print:py-0">
      <style jsx global>{`
        @media print {
          @page {
            margin: 1.2cm;
            size: A4 portrait;
          }
          body {
            background-color: #ffffff !important;
            color: #0f172a !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            font-family: ui-sans-serif, system-ui, -apple-system, sans-serif !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          .rounded-2xl, .rounded-xl {
            border-radius: 8px !important;
            page-break-inside: avoid !important;
          }
          .bg-slate-900, .bg-slate-950, .bg-slate-900\\/90, .bg-slate-900\\/60, .bg-slate-950\\/70 {
            background-color: #f8fafc !important;
            border-color: #cbd5e1 !important;
            color: #0f172a !important;
            box-shadow: none !important;
          }
          .text-white, .text-slate-100, .text-slate-200, .text-slate-300 {
            color: #0f172a !important;
          }
          .text-slate-400, .text-slate-500 {
            color: #475569 !important;
          }
          .border-slate-800, .border-slate-800\\/80, .border-slate-700 {
            border-color: #e2e8f0 !important;
          }
          .bg-amber-500\\/10, .bg-amber-500, .bg-amber-500\\/30 {
            background-color: #fffbebfb !important;
            border-color: #f59e0b !important;
            color: #b45309 !important;
          }
          .text-amber-400, .text-amber-500 {
            color: #d97706 !important;
          }
          .text-rose-400, .text-rose-500 {
            color: #e11d48 !important;
          }
          .text-emerald-400, .text-emerald-500 {
            color: #059669 !important;
          }
          .bg-emerald-950\\/30, .bg-emerald-500\\/20, .bg-emerald-500\\/10 {
            background-color: #ecfdf5 !important;
            border-color: #a7f3d0 !important;
          }
          .bg-rose-950\\/30, .bg-rose-500\\/20, .bg-rose-500\\/10 {
            background-color: #fff1f2 !important;
            border-color: #fecdd3 !important;
          }
          .bg-slate-500\\/10 {
            background-color: #f1f5f9 !important;
            border-color: #cbd5e1 !important;
          }
        }
      `}</style>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 print:px-0 print:max-w-none">
        {/* Printable Executive PDF Header Branding */}
        <div className="hidden print:flex items-center justify-between pb-4 border-b-2 border-slate-900 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-slate-900 text-white font-black flex items-center justify-center text-base">
              S
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 block leading-tight">Hygroon</span>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Business Opportunity Snapshot</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-slate-900 block">CONFIDENTIAL: CURRENT SNAPSHOT</span>
            <span className="text-[11px] font-mono text-slate-500 block">Generated: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>

        {/* Header */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:p-4 print:rounded-none">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 print:text-amber-600">
              {report.kind === 'DIAGNOSTIC' ? 'Business Opportunity Snapshot' : 'Monthly Growth & Attribution Report'}
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1 print:text-slate-900">
              {report.kind === 'DIAGNOSTIC' ? report.audit?.business.name : report.client?.name}
            </h1>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5">
              {report.kind === 'DIAGNOSTIC' && report.audit?.business.locations[0]?.city && (
                <p className="text-xs text-slate-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  {report.audit.business.locations[0].city}
                </p>
              )}
              {report.kind === 'DIAGNOSTIC' && report.audit?.business.industry?.name && (
                <p className="text-xs text-slate-400">{report.audit.business.industry.name}</p>
              )}
              {report.kind === 'DIAGNOSTIC' && report.audit?.completedAt && (
                <p className="text-xs text-slate-500">
                  Current snapshot &middot;{' '}
                  {new Date(report.audit.completedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-3.5 py-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold flex items-center gap-1.5 transition-colors print:hidden"
            >
              <span>Download PDF (Lite)</span>
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 flex items-center gap-2 transition-colors print:hidden"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              {copied ? 'Link copied' : 'Share'}
            </button>
          </div>
        </div>

        {report.kind === 'DIAGNOSTIC' && report.audit ? (
          <DiagnosticReportBody audit={report.audit} />
        ) : (
          <ClientMonthlyReportBody metrics={report.metrics ?? []} findings={report.findings ?? []} />
        )}

        {/* Contextual CTA — GrowthCallCta opens a real consultation-request
            form (POST /api/public/consultation-requests), not a mailto or a
            fake booking confirmation. Report/business/industry/location
            context is passed explicitly here (freshest source, this exact
            report) rather than left to leadContext's possibly-stale fallback. */}
        <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-[#0d1322] border border-amber-500/30 p-8 text-center space-y-4 print:hidden">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Want Help Fixing These First?</h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            We can walk through the findings and help prioritize what is most likely to improve booked work.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <GrowthCallCta
              source="report_page_primary"
              industrySlug={report.audit?.business.industry?.name}
              prefill={{
                businessName: report.audit?.business.name,
                city: report.audit?.business.locations[0]?.city ?? undefined,
                reportToken: token,
                email: ownerEmail || undefined,
              }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20 active:scale-95"
            >
              <span>Book a Growth Call</span>
              <ArrowRight className="w-4 h-4" />
            </GrowthCallCta>
            <Link
              href="/contact"
              onClick={() => trackContactAction({ source: 'report_page_secondary' })}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white font-semibold text-sm transition-all"
            >
              <span>Contact Us</span>
            </Link>
          </div>
        </div>

        {/* Dedicated Executive Printable PDF Call-To-Action (PDF Print View Only) */}
        <div className="hidden print:block p-6 rounded-xl bg-amber-50 border-2 border-amber-500 text-center space-y-3 mt-8 page-break-inside-avoid">
          <div className="inline-block px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider">
            NEXT STEPS
          </div>
          <h2 className="text-lg font-bold text-slate-900">Want Help Fixing These First?</h2>
          <p className="text-xs text-slate-700 max-w-xl mx-auto leading-relaxed">
            Email {brandConfig.salesEmail} to set up a time to review these findings and prioritize what to fix first.
          </p>
          <div className="pt-2 text-xs font-mono font-bold text-amber-800 flex items-center justify-center gap-4">
            <span>✉️ {brandConfig.salesEmail}</span>
            <span>&bull;</span>
            <span>🔗 hygroon.com/reports/{token}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const SEVERITY_STYLE: Record<string, string> = {
  CRITICAL: 'text-rose-400 bg-rose-950/30 border-rose-800/40',
  HIGH: 'text-amber-400 bg-amber-950/30 border-amber-800/40',
  MEDIUM: 'text-sky-400 bg-sky-950/30 border-sky-800/40',
  LOW: 'text-emerald-400 bg-emerald-950/30 border-emerald-800/40',
  INFO: 'text-slate-400 bg-slate-900/60 border-slate-800',
};

const STAGE_ICONS: Record<'discovery' | 'contact' | 'response' | 'booking', LucideIcon> = {
  discovery: Search,
  contact: PhoneCall,
  response: MessageSquare,
  booking: CalendarCheck,
};

const STAGE_STATUS_CLASSES: Record<StageStatus, string> = {
  Strong: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
  Opportunity: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
  'Needs Review': 'bg-amber-500/10 border-amber-500/30 text-amber-400',
  'Needs Confirmation': 'bg-slate-500/10 border-slate-500/30 text-slate-300',
};

const CONFIDENCE_CLASSES: Record<string, string> = {
  HIGH: 'text-emerald-400',
  MEDIUM: 'text-amber-400',
  LOW: 'text-slate-400',
};

function DiagnosticReportBody({ audit }: { audit: NonNullable<PublicReportView['audit']> }) {
  const [showAllFindings, setShowAllFindings] = useState(false);

  // Real findings only — no invented page counts, load times, or protocol
  // versions. A website-related finding is one whose text actually mentions
  // the website/mobile experience; if the audit didn't flag one, the UI says
  // so honestly rather than filling the gap with a plausible-looking number.
  const websiteFinding = audit.findings.find((f) =>
    /website|mobile|page load|speed|conversion|booking|form|call/i.test(`${f.title} ${f.businessImpact}`),
  );

  const journeyStages = classifyJourneyStages(audit.findings as JourneyFindingLike[]);
  const priorityCounts = countByPriority(audit.findings);
  const executiveSummary = buildExecutiveSummary(audit.findings);
  const top3 = topFindings(audit.findings, 3);
  const top3Ids = new Set(top3.map((f) => f.id));
  const remainingFindings = audit.findings.filter((f) => !top3Ids.has(f.id));
  const fixFirstTiers = buildFixFirstTiers(audit.findings);
  const maxPriorityCount = Math.max(priorityCounts.high, priorityCounts.medium, priorityCounts.low, 1);

  return (
    <>
      {/* Executive Summary */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-2">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">Executive Summary</span>
        <p className="text-base sm:text-lg text-white leading-relaxed">{executiveSummary}</p>
      </div>

      {/* Customer Journey Visualization */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-5">
        <h2 className="text-lg font-bold text-white">Your Customer Journey</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {journeyStages.map((stage) => {
            const Icon = STAGE_ICONS[stage.key];
            return (
              <div key={stage.key} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/90 space-y-2">
                <div className="flex items-center gap-1.5 text-slate-400 font-semibold text-xs">
                  <Icon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{stage.label}</span>
                </div>
                <span
                  className={`inline-flex px-2 py-1 rounded-md text-[11px] font-bold border ${STAGE_STATUS_CLASSES[stage.status]}`}
                >
                  {stage.status}
                </span>
              </div>
            );
          })}
        </div>
        <p className="text-[11px] text-slate-500">
          Response and booking speed aren&apos;t part of this website/search snapshot. A growth call can confirm those.
        </p>
      </div>

      {/* Findings by Priority */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-bold text-white">Findings by Priority</h2>
        <div className="space-y-2.5">
          {([
            ['High', priorityCounts.high, 'bg-rose-500'],
            ['Medium', priorityCounts.medium, 'bg-amber-500'],
            ['Low', priorityCounts.low, 'bg-emerald-500'],
          ] as const).map(([label, count, barColor]) => (
            <div key={label} className="flex items-center gap-3 text-xs">
              <span className="w-14 text-slate-400 font-semibold shrink-0">{label}</span>
              <div className="flex-1 h-2.5 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className={`h-full rounded-full ${barColor}`}
                  style={{ width: count === 0 ? 0 : `${Math.max(8, (count / maxPriorityCount) * 100)}%` }}
                />
              </div>
              <span className="w-6 text-right text-slate-300 font-mono font-bold shrink-0">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Website Audit & Preview Card (Desktop + Mobile Views) */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">CURRENT SNAPSHOT</span>
            <h2 className="text-lg font-extrabold text-white tracking-tight mt-0.5">Website Experience</h2>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>{audit.business.website || 'No website on file'}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Desktop Preview Frame */}
          <div className="md:col-span-8 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center gap-1.5 pb-2 border-b border-slate-800 text-xs text-slate-400">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-mono text-[11px] text-slate-400 truncate">
                {audit.business.website || 'no website found'}
              </span>
            </div>
            <div className="py-6 px-4 rounded-lg bg-slate-900/60 border border-slate-800/80 text-center space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-200">
                <Globe className="w-4 h-4 text-amber-400" />
                <span>Website Experience</span>
              </div>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                {websiteFinding ? websiteFinding.businessImpact : 'No website-specific issues were flagged in this audit.'}
              </p>
              {websiteFinding && (
                <div className="inline-block px-2.5 py-1 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[11px] font-bold">
                  {websiteFinding.title}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Preview Frame */}
          <div className="md:col-span-4 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
              <span className="font-bold text-slate-300 flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                <span>Mobile</span>
              </span>
            </div>
            <div className="py-5 px-3 rounded-lg bg-slate-900/60 border border-slate-800/80 text-center space-y-2">
              <span className="text-xs font-bold text-white block">{audit.business.name}</span>
              <span className="text-[11px] text-slate-400 block">
                {websiteFinding ? websiteFinding.recommendedAction : 'No mobile-specific recommendation from this audit.'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Reputation — real fields only; an honest "not on file" rather than
          a plausible-looking default rating/review count. */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-lg font-bold text-white">Reputation</h2>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-medium text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>
              {audit.business.rating != null
                ? `${audit.business.rating.toFixed(1)} Rating · ${audit.business.reviewCount} Reviews`
                : 'No rating on file yet'}
            </span>
          </div>
        </div>
      </div>

      {/* Top Opportunities — max 3, full detail. Everything else collapses
          under "View More Findings" instead of piling on the page. */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-bold text-white">Top Opportunities</h2>
        {top3.length > 0 ? (
          <div className="space-y-4">
            {top3.map((f, idx) => (
              <div key={f.id} className={`p-4 sm:p-5 rounded-xl border space-y-3 ${SEVERITY_STYLE[f.severity] ?? SEVERITY_STYLE.INFO}`}>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-950/50 border border-current flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="font-bold text-base text-white">{f.title}</span>
                </div>
                <div className="pl-9 space-y-2.5">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Why It Matters</span>
                    <p className="text-sm text-slate-200 leading-relaxed">{f.businessImpact}</p>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Recommended Next Step</span>
                    <p className="text-sm text-slate-200 leading-relaxed">{f.recommendedAction}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 border-t border-slate-800/60 text-[11px]">
                    <span className="text-slate-400">
                      Evidence: <span className="font-semibold text-slate-300">{formatFindingSource(f.source)}</span>
                    </span>
                    <span className="text-slate-400">
                      Confidence:{' '}
                      <span className={`font-semibold ${CONFIDENCE_CLASSES[f.confidence ?? ''] ?? 'text-slate-300'}`}>
                        {f.confidence ? f.confidence.charAt(0) + f.confidence.slice(1).toLowerCase() : 'Not stated'}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">No findings were surfaced by this audit.</p>
        )}

        {remainingFindings.length > 0 && (
          <>
            <button
              type="button"
              onClick={() => setShowAllFindings((v) => !v)}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-slate-800 text-slate-300 hover:text-white hover:border-slate-600 text-xs font-bold transition-colors print:hidden"
            >
              <span>{showAllFindings ? 'Hide Additional Findings' : `View More Findings (${remainingFindings.length})`}</span>
              {showAllFindings ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {showAllFindings && (
              <div className="space-y-3 print:hidden">
                {remainingFindings.map((f) => (
                  <div key={f.id} className={`p-4 rounded-xl border space-y-1.5 ${SEVERITY_STYLE[f.severity] ?? SEVERITY_STYLE.INFO}`}>
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-bold text-sm text-white">{f.title}</span>
                      <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded border border-current">{f.severity}</span>
                    </div>
                    <p className="text-xs text-slate-300">{f.businessImpact}</p>
                    {f.recommendedAction && <p className="text-xs text-slate-400">→ {f.recommendedAction}</p>}
                  </div>
                ))}
              </div>
            )}
            {/* Print always shows everything — there's no "click to expand" on paper. */}
            <div className="hidden print:block space-y-3">
              {remainingFindings.map((f) => (
                <div key={f.id} className={`p-4 rounded-xl border space-y-1.5 ${SEVERITY_STYLE[f.severity] ?? SEVERITY_STYLE.INFO}`}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-bold text-sm text-white">{f.title}</span>
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded border border-current">{f.severity}</span>
                  </div>
                  <p className="text-xs text-slate-300">{f.businessImpact}</p>
                  {f.recommendedAction && <p className="text-xs text-slate-400">→ {f.recommendedAction}</p>}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* What We'd Fix First — a priority index, not a duplicate of Top
          Opportunities above: titles only, grouped by tier. */}
      {fixFirstTiers.length > 0 && (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-5">
          <h2 className="text-lg font-bold text-white">What We&apos;d Fix First</h2>
          <div className="space-y-4">
            {fixFirstTiers.map((tier) => (
              <div key={tier.label} className="flex gap-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 w-12 shrink-0 pt-0.5">
                  {tier.label}
                </span>
                <ul className="flex-1 space-y-1">
                  {tier.findings.map((f) => (
                    <li key={f.id} className="text-sm text-slate-300">
                      {f.title}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Direct Competitor Benchmark */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-bold text-white">Direct Competitor Benchmark</h2>
        {audit.business.competitors.length > 0 ? (
          <div className="space-y-2">
            {audit.business.competitors.map((c, i) => (
              <div key={`${c.name}-${i}`} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{c.name}</span>
                    {c.isPrimaryCompetitor && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold">
                        Primary Competitor
                      </span>
                    )}
                  </div>
                  <span className="text-slate-400 font-mono">Relevance {c.relevanceScore}/100</span>
                </div>
                <p className="text-slate-400 flex items-center gap-1">
                  {c.rating != null ? (
                    <>
                      <Star className="w-3 h-3 text-amber-400" /> {c.rating.toFixed(1)} ({c.reviewCount} reviews)
                    </>
                  ) : (
                    'Rating not available'
                  )}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-slate-800/80">
                  <div>
                    <span className="text-emerald-400 font-semibold block">Strongest Advantage</span>
                    <span className="text-slate-300">{c.strongestAdvantage}</span>
                  </div>
                  <div>
                    <span className="text-amber-400 font-semibold block">Possible Gap</span>
                    <span className="text-slate-300">{c.possibleGap}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">No verified competitors were found for this search.</p>
        )}
      </div>
    </>
  );
}

function ClientMonthlyReportBody({ metrics, findings }: { metrics: ReportMetric[]; findings: ReportFinding[] }) {
  return (
    <>
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8">
        <h2 className="text-lg font-bold text-white mb-4">This Period&apos;s Numbers</h2>
        {metrics.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {metrics.map((m) => {
              const delta = m.previousValue != null ? m.value - m.previousValue : null;
              return (
                <div key={m.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-xs text-slate-400 mb-1">{m.label}</div>
                  <div className="text-2xl font-bold font-mono text-white">
                    {m.value}
                    {m.unit ? ` ${m.unit}` : ''}
                  </div>
                  {delta != null && (
                    <div className={`text-[11px] mt-1 ${delta >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {delta >= 0 ? '+' : ''}
                      {delta} vs previous period
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-slate-500">No metrics were available for this period.</p>
        )}
      </div>

      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-bold text-white">Open Opportunities</h2>
        {findings.length > 0 ? (
          <div className="space-y-3">
            {findings.map((f) => (
              <div key={f.id} className={`p-4 rounded-xl border space-y-1.5 ${SEVERITY_STYLE[f.severity] ?? SEVERITY_STYLE.INFO}`}>
                <span className="font-bold text-sm text-white block">{f.title}</span>
                <p className="text-xs text-slate-300">{f.detail}</p>
                {f.recommendedAction && <p className="text-xs text-slate-400">→ {f.recommendedAction}</p>}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">No open opportunities from the most recent audit.</p>
        )}
      </div>
    </>
  );
}

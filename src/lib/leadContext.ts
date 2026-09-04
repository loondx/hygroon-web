// Client-side attribution + funnel-context capture for the public site.
//
// "Book a Growth Call" persists a real consultation request via
// POST /api/public/consultation-requests (see ConsultationRequestModal) —
// there is still no calendar/video integration anywhere in this system, so
// the UI must never claim a meeting is booked, only that the request was
// received. This module supplies that request with real context (source
// page, industry, prior analysis, first-touch UTM/referrer) instead of
// nothing, and also builds a mailto: fallback for when the request can't
// reach the API (see buildGrowthCallMailto).

const ATTRIBUTION_KEY = 'hygroon_attribution';
const LAST_ANALYSIS_KEY = 'hygroon_last_analysis';

const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;
type UtmParam = (typeof UTM_PARAMS)[number];

export type Attribution = Partial<Record<UtmParam, string>> & {
  referrer?: string;
  landingPage?: string;
};

export interface LastAnalysis {
  reportToken: string;
  businessName: string;
  industrySlug?: string;
  city?: string;
}

/** First-touch attribution: captured once per browser session, never overwritten. */
export function captureAttribution(): void {
  if (typeof window === 'undefined') return;
  try {
    if (sessionStorage.getItem(ATTRIBUTION_KEY)) return;
    const params = new URLSearchParams(window.location.search);
    const attribution: Attribution = {
      referrer: document.referrer || undefined,
      landingPage: window.location.pathname,
    };
    for (const key of UTM_PARAMS) {
      const value = params.get(key);
      if (value) attribution[key] = value;
    }
    sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution));
  } catch {
    // storage unavailable (private mode, disabled cookies) — attribution is
    // a nice-to-have, never block the CTA it's attached to
  }
}

export function getAttribution(): Attribution | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(ATTRIBUTION_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}

/** Identifies if visitor arrived from an AI Search engine (ChatGPT, Perplexity, Claude, SearchGPT). */
export function getAiSearchReferral(): string | null {
  const attr = getAttribution();
  if (!attr) return null;
  const source = attr.utm_source?.toLowerCase() || '';
  const ref = attr.referrer?.toLowerCase() || '';

  if (source.includes('chatgpt') || ref.includes('chatgpt.com')) return 'ChatGPT';
  if (source.includes('perplexity') || ref.includes('perplexity.ai')) return 'Perplexity';
  if (source.includes('claude') || ref.includes('claude.ai')) return 'Claude';
  if (source.includes('searchgpt')) return 'SearchGPT';
  return null;
}

/** Called once /analyze delivers a real report, so a later "Book a Growth
 * Call" click elsewhere on the site can reference it instead of asking the
 * visitor to re-enter what we already know. */
export function saveLastAnalysis(info: LastAnalysis): void {
  try {
    localStorage.setItem(LAST_ANALYSIS_KEY, JSON.stringify(info));
  } catch {
    // ignore
  }
}

export function getLastAnalysis(): LastAnalysis | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(LAST_ANALYSIS_KEY);
    return raw ? (JSON.parse(raw) as LastAnalysis) : null;
  } catch {
    return null;
  }
}

/** Fallback only — used when POST /api/public/consultation-requests can't be
 * reached, so the visitor still has a real way to reach a real inbox rather
 * than a dead end. Carries the same context the real request would have. */
export function buildGrowthCallMailto(params: { salesEmail: string; sourcePage: string; industrySlug?: string }): string {
  const attribution = getAttribution();
  const lastAnalysis = getLastAnalysis();

  const subject = lastAnalysis ? `Growth call request: ${lastAnalysis.businessName}` : 'Growth call request';

  const lines = [
    'Hi Hygroon team,',
    '',
    "I'd like to book a growth call to review my customer journey.",
    '',
    `Source page: ${params.sourcePage}`,
  ];
  if (params.industrySlug) lines.push(`Industry: ${params.industrySlug}`);
  if (lastAnalysis) {
    lines.push(`Prior analysis: ${lastAnalysis.businessName}${lastAnalysis.city ? ` (${lastAnalysis.city})` : ''}`);
    lines.push(`Report reference: ${lastAnalysis.reportToken}`);
  }
  if (attribution?.utm_source) {
    lines.push(`Lead source: ${attribution.utm_source}${attribution.utm_medium ? ` / ${attribution.utm_medium}` : ''}`);
  }
  if (attribution?.utm_campaign) lines.push(`Campaign: ${attribution.utm_campaign}`);
  if (attribution?.referrer) lines.push(`Referrer: ${attribution.referrer}`);

  const body = lines.join('\n');
  return `mailto:${params.salesEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

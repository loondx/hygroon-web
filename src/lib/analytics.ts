// Provider-agnostic event tracking for the organic-search → conversion
// funnel. Safe no-op when NEXT_PUBLIC_GA_MEASUREMENT_ID isn't set (e.g. in
// dev, or before a real GA4 property exists) — never throws, never blocks
// the calling flow. Never pass PII (email, business name, phone) as a param.
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

type EventParams = Record<string, string | number | boolean | undefined>;

function track(name: string, params: EventParams = {}): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}

/** /analyze form submitted and the backend accepted the audit request. */
export function trackAnalyzeStarted(params: { industry?: string; market?: string }): void {
  track('analyze_started', params);
}

/** Audit finished and the teaser/results view is shown. */
export function trackAnalyzeCompleted(params: { industry?: string; market?: string }): void {
  track('analyze_completed', params);
}

/** Email submitted, unlocking the full report (no email itself is sent). */
export function trackReportUnlocked(params: { industry?: string }): void {
  track('report_unlocked', params);
}

/** A gated /reports/[token] page finished loading successfully. */
export function trackReportViewed(params: { industry?: string }): void {
  track('report_viewed', params);
}

/** A real contact action — mailto click, /contact form submit — not a fake booking flow. */
export function trackContactAction(params: { source: string; intent?: string; industry?: string }): void {
  track('contact_action', params);
}

/** Homepage mounted — fired once per page load, not per section. */
export function trackLandingView(): void {
  track('landing_view');
}

/** A homepage section entered the viewport for the first time this page load (IntersectionObserver-driven). */
export function trackSectionView(params: { section: string }): void {
  track('section_view', params);
}

/** The "Analyze My Business" CTA was clicked, wherever it appears on the page. */
export function trackAnalyzeCtaClick(params: { source: string }): void {
  track('analyze_cta_click', params);
}

/** The "Book a Growth Call" CTA was clicked. Paired with trackContactAction (unchanged) for backward compatibility. */
export function trackGrowthCallClick(params: { source: string; industry?: string }): void {
  track('growth_call_click', params);
}

/** A /contact mailto action was clicked. Paired with trackContactAction (unchanged) for backward compatibility. */
export function trackContactClick(params: { source: string }): void {
  track('contact_click', params);
}

/** Scroll passed a milestone (25/50/75/90) — fired once per milestone per page load, never continuously. */
export function trackScrollDepth(params: { depth: 25 | 50 | 75 | 90 }): void {
  track('scroll_depth', params);
}

/** Aggregated visible+focused time on the page crossed a milestone (seconds) — not a per-second heartbeat. */
export function trackEngagedTime(params: { seconds: number }): void {
  track('engaged_time', params);
}

/** A consultation request was successfully persisted (POST /api/public/consultation-requests
 * returned 2xx) — mirrors the backend's CONSULTATION_REQUESTED activity event. GA4 is a
 * secondary record here; the database write is the source of truth for the actual lead. */
export function trackConsultationRequested(params: { source: string; industry?: string }): void {
  track('consultation_requested', params);
}

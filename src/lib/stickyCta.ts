// Pages already mid-flow (the funnel itself, the gated report, proposal
// acceptance, onboarding) shouldn't show a second competing "Analyze My
// Market" CTA — see StickyMobileCta.tsx.
export const STICKY_CTA_HIDDEN_PREFIXES = ['/analyze', '/reports', '/proposals', '/onboarding'] as const;

export function shouldHideStickyCta(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  return STICKY_CTA_HIDDEN_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

/** Reveal once the hero's own CTA has scrolled out of view, and hide again
 * near the bottom of any page — a fixed bar has no natural "past the
 * content" boundary, so without this it would sit on top of the footer's
 * real links (mailto, legal pages) once the visitor scrolls that far. */
export function computeStickyCtaVisible(params: {
  scrollY: number;
  viewportHeight: number;
  documentHeight: number;
  revealAtPx?: number;
  footerClearancePx?: number;
}): boolean {
  const { scrollY, viewportHeight, documentHeight, revealAtPx = 480, footerClearancePx = 480 } = params;
  const pastHero = scrollY > revealAtPx;
  const distanceFromBottom = documentHeight - (scrollY + viewportHeight);
  return pastHero && distanceFromBottom > footerClearancePx;
}

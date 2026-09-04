'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { X, PhoneCall } from 'lucide-react';
import { shouldHideStickyCta, computeStickyCtaVisible } from '@/lib/stickyCta';
import AnalyzeCta from './AnalyzeCta';
import GrowthCallCta from './GrowthCallCta';

const DISMISS_KEY = 'hygroon_sticky_cta_dismissed';

/** Compact bottom action bar for mobile only, shown once the hero's own CTA
 * has scrolled out of view. Hidden entirely on pages already mid-flow (the
 * funnel itself, the gated report, proposal acceptance, onboarding) where a
 * second competing CTA would be noise, hidden again near the bottom of any
 * page so it never covers the footer's real links, and dismissible for the
 * rest of the browsing session if the visitor closes it — see
 * computeStickyCtaVisible. */
export default function StickyMobileCta() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISS_KEY)) setDismissed(true);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setVisible(
        computeStickyCtaVisible({
          scrollY: window.scrollY,
          viewportHeight: window.innerHeight,
          documentHeight: document.documentElement.scrollHeight,
        }),
      );
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  if (shouldHideStickyCta(pathname)) return null;
  if (!visible || dismissed) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, '1');
    } catch {
      // ignore
    }
  };

  return (
    <div
      className="sm:hidden fixed bottom-0 inset-x-0 z-40 px-2.5 pt-3 border-t border-slate-800/80 bg-[#090d16]/95 backdrop-blur-md"
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      <div className="flex items-center gap-1.5">
        <AnalyzeCta
          source="sticky_mobile_bar"
          label="Analyze"
          iconClassName="w-3.5 h-3.5"
          className="flex-1 min-w-0 flex items-center justify-center gap-1.5 py-3 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-transform"
        />
        <GrowthCallCta
          source="sticky_mobile_bar"
          className="flex-1 min-w-0 flex items-center justify-center gap-1.5 py-3 rounded-lg border border-slate-700 text-slate-200 font-bold text-xs active:scale-[0.98] transition-transform"
        >
          <PhoneCall className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Free Review</span>
        </GrowthCallCta>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss"
          className="shrink-0 w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-300"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

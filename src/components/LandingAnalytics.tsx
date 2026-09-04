'use client';

import { useEffect } from 'react';
import { trackLandingView, trackSectionView, trackScrollDepth, trackEngagedTime } from '@/lib/analytics';
import { computeScrollDepthPercent, newlyCrossedMilestones, type ScrollDepthMilestone } from '@/lib/scrollDepth';

const ENGAGED_TIME_MILESTONES_SEC = [15, 30, 60, 120] as const;
const ENGAGED_TICK_MS = 5000;

// Mounted once on the homepage. Renders nothing — it only observes and
// reports milestones, never a per-second/per-scroll heartbeat:
// - landing_view fires once on mount.
// - section_view fires once per <section data-section="..."> the first time
//   it's >=40% in view (IntersectionObserver, not a scroll listener).
// - scroll_depth fires once per 25/50/75/90% milestone crossed.
// - engaged_time fires once per 15/30/60/120s of *visible + focused* time
//   (paused while the tab is hidden or unfocused), not wall-clock time.
export default function LandingAnalytics() {
  useEffect(() => {
    trackLandingView();

    // section_view
    const sectionEls = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'));
    const seenSections = new Set<string>();
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const name = entry.target.getAttribute('data-section');
          if (entry.isIntersecting && name && !seenSections.has(name)) {
            seenSections.add(name);
            trackSectionView({ section: name });
          }
        }
      },
      { threshold: 0.4 },
    );
    sectionEls.forEach((el) => sectionObserver.observe(el));

    // scroll_depth
    const firedDepths = new Set<ScrollDepthMilestone>();
    let scrollTicking = false;
    const onScroll = () => {
      if (scrollTicking) return;
      scrollTicking = true;
      requestAnimationFrame(() => {
        const percent = computeScrollDepthPercent({
          scrollY: window.scrollY,
          viewportHeight: window.innerHeight,
          documentHeight: document.documentElement.scrollHeight,
        });
        for (const depth of newlyCrossedMilestones(percent, firedDepths)) {
          firedDepths.add(depth);
          trackScrollDepth({ depth });
        }
        scrollTicking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // engaged_time — accumulate only while the tab is visible and focused
    let engagedSeconds = 0;
    const firedEngagedMilestones = new Set<number>();
    const isEngaged = () => document.visibilityState === 'visible' && document.hasFocus();
    const engagedTimer = setInterval(() => {
      if (!isEngaged()) return;
      engagedSeconds += ENGAGED_TICK_MS / 1000;
      for (const milestone of ENGAGED_TIME_MILESTONES_SEC) {
        if (engagedSeconds >= milestone && !firedEngagedMilestones.has(milestone)) {
          firedEngagedMilestones.add(milestone);
          trackEngagedTime({ seconds: milestone });
        }
      }
    }, ENGAGED_TICK_MS);

    return () => {
      sectionObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
      clearInterval(engagedTimer);
    };
  }, []);

  return null;
}

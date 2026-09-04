'use client';

import React from 'react';
import Link from 'next/link';
import { trackContactAction, trackGrowthCallClick } from '@/lib/analytics';
import { saveLastAnalysis } from '@/lib/leadContext';

interface GrowthCallCtaProps {
  /** Distinguishes where on the page this CTA lives, for analytics and as the request's ctaSource on /growth-review. */
  source: string;
  industrySlug?: string;
  prefill?: {
    businessName?: string;
    city?: string;
    reportToken?: string;
    email?: string;
  };
  className?: string;
  children: React.ReactNode;
}

// Navigates to the real page-based "Get a Free Growth Review" flow
// (src/app/growth-review) — no modal, no fake "meeting booked" state. The
// destination page reads prior analysis context from leadContext itself.
export default function GrowthCallCta({ source, industrySlug, prefill, className, children }: GrowthCallCtaProps) {
  const handleClick = () => {
    if (prefill?.reportToken && prefill?.businessName) {
      saveLastAnalysis({
        reportToken: prefill.reportToken,
        businessName: prefill.businessName,
        city: prefill.city,
        industrySlug,
      });
    }
    trackContactAction({ source, intent: 'consultation', industry: industrySlug });
    trackGrowthCallClick({ source, industry: industrySlug });
  };

  return (
    <Link href={`/growth-review?source=${encodeURIComponent(source)}`} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}

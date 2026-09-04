import type { Metadata } from 'next';

// Token-gated client onboarding pages carry real business/contact data —
// must never be indexed. See docs/PUBLIC_UX_SEO_PLAN.md's index/noindex matrix.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return children;
}

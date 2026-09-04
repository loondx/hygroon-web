import type { Metadata } from 'next';

// Token-gated proposal acceptance pages carry real pricing/business data —
// must never be indexed. See docs/PUBLIC_UX_SEO_PLAN.md's index/noindex matrix.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProposalLayout({ children }: { children: React.ReactNode }) {
  return children;
}

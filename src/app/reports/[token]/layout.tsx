import type { Metadata } from 'next';

// Token-gated diagnostic/client reports carry real business and contact
// data — must never be indexed. See docs/PUBLIC_UX_SEO_PLAN.md's
// index/noindex matrix.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function ReportLayout({ children }: { children: React.ReactNode }) {
  return children;
}

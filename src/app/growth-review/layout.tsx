import type { Metadata } from 'next';

// A Client Component page (the form/submission flow) can't export its own
// metadata, same reason /analyze needs this pattern.
export const metadata: Metadata = {
  title: 'Free Growth Review for Home Service Businesses',
  description:
    'Request a review of how customers find, contact and book with your home-service business, and see where growth opportunities may exist.',
  alternates: { canonical: '/growth-review' },
};

export default function GrowthReviewLayout({ children }: { children: React.ReactNode }) {
  return children;
}

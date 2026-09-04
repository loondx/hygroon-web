import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free HVAC & Service Business Growth Review | Hygroon',
  description:
    'Request a free Local SEO & Growth Review for your HVAC or home service business. See how customers find, contact, and book with your business.',
  alternates: { canonical: '/growth-review' },
  openGraph: {
    title: 'Free HVAC & Service Business Growth Review | Hygroon',
    description: 'Request a free Local SEO & Growth Review for your HVAC or home service business.',
    url: 'https://hygroon.com/growth-review',
  },
};

export default function GrowthReviewLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from 'next';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

// /analyze is a Client Component (the interactive form/polling flow), so it
// can't export its own metadata — without this layout it silently inherited
// the root layout's canonical ('/'), which is wrong for this page. It also
// had no H1 anywhere; both are fixed here without touching the client
// component's bundle.
export const metadata: Metadata = {
  title: 'Free Business Growth Analysis',
  description:
    'Analyze your home-service business in minutes. See where enquiries may be getting lost between search, contact, and booking. Free snapshot, no login, no credit card.',
  alternates: { canonical: '/analyze' },
};

export default function AnalyzeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#090d16]">
      <BreadcrumbJsonLd trail={[{ name: 'Analyze', path: '/analyze' }]} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-2 text-center space-y-1.5">
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">Free Business Growth Analysis</h1>
        <p className="text-slate-400 text-sm max-w-lg mx-auto">
          See where enquiries may be getting lost between search, contact, and booking.
        </p>
      </div>
      {children}
    </div>
  );
}

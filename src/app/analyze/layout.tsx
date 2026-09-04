import type { Metadata } from 'next';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Free HVAC & Service Business Local SEO Diagnostic',
  description:
    'Free 60-second Local SEO audit for HVAC contractors and home service businesses. Analyze your Google Maps 3-Pack rank, review velocity, missed call speed, and local search visibility.',
  alternates: { canonical: '/analyze' },
  openGraph: {
    title: 'Free HVAC & Service Business Local SEO Diagnostic | Hygroon',
    description: 'Analyze your HVAC or home service business in 60 seconds. See your Google Maps 3-Pack rank and local search gaps.',
    url: 'https://hygroon.com/analyze',
  },
};

export default function AnalyzeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#090d16]">
      <BreadcrumbJsonLd trail={[{ name: 'Analyze', path: '/analyze' }]} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-2 text-center space-y-1.5">
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">Free HVAC & Local Service Business Growth Diagnostic</h1>
        <p className="text-slate-400 text-sm max-w-lg mx-auto">
          See where local search demand, Google Maps rankings, and emergency call enquiries are getting lost.
        </p>
      </div>
      {children}
    </div>
  );
}

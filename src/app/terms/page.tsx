import React from 'react';
import type { Metadata } from 'next';
import { brandConfig } from '@/config/brand.config';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { FileText, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | Hygroon',
  description:
    'Terms of Service governing the use of Hygroon website, business diagnostic tools, and growth systems.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 py-12 md:py-20">
      <BreadcrumbJsonLd trail={[{ name: 'Terms of Service', path: '/terms' }]} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
            <FileText className="w-4 h-4" />
            <span>Service Terms</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">Terms of Service</h1>
          <p className="text-xs text-slate-400">Last updated: September 5, 2026</p>
        </div>

        <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-8 text-sm text-slate-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Hygroon website ({brandConfig.website}) or running a market diagnostic, you agree to comply with and be bound by these Terms of Service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">2. Business Diagnostic Tool</h2>
            <p>
              Our diagnostic tool provides market evaluations for U.S. home-service contractors based on observable public signals (Google Maps rankings, mobile performance, review velocity) and trade benchmarks. Diagnostic outputs are provided for informational and business planning purposes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">3. Intellectual Property</h2>
            <p>
              All proprietary algorithms, evidence taxonomies, diagnostic methodologies, branding, and website content are the exclusive intellectual property of Hygroon.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">4. User Responsibilities</h2>
            <p>
              Users agree to provide truthful business information when requesting audits or consultation reviews and must not attempt to breach or overload diagnostic endpoints.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">5. Contact Information</h2>
            <p>For questions regarding these Terms of Service, contact our team:</p>
            <div className="pt-1 flex items-center gap-2 text-amber-400 font-medium">
              <Mail className="w-4 h-4" />
              <a href={`mailto:${brandConfig.salesEmail}`} className="hover:underline">
                {brandConfig.salesEmail}
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

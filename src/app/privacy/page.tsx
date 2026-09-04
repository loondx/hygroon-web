import React from 'react';
import type { Metadata } from 'next';
import { brandConfig } from '@/config/brand.config';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { ShieldCheck, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Hygroon',
  description:
    'Learn how Hygroon collects, uses, and protects business data, diagnostic audit inputs, and customer privacy.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 py-12 md:py-20">
      <BreadcrumbJsonLd trail={[{ name: 'Privacy Policy', path: '/privacy' }]} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Data Protection & Standards</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">Privacy Policy</h1>
          <p className="text-xs text-slate-400">Last updated: September 5, 2026</p>
        </div>

        <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-8 text-sm text-slate-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">1. Overview and Scope</h2>
            <p>
              Hygroon (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) provides growth systems, market diagnostics, and Local SEO solutions for home-service contractors in the United States. This Privacy Policy explains how we collect, process, and safeguard information when you use our website ({brandConfig.website}) or run a business diagnostic.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">2. Information We Collect</h2>
            <p>We collect information in the following ways:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li>
                <strong className="text-slate-200">Business Diagnostic Inputs:</strong> Public business name, website domain, market geographic area, phone number, and service category submitted through our diagnostic forms.
              </li>
              <li>
                <strong className="text-slate-200">Public Market Data:</strong> Google Business Profile indicators, public search ranking signals, review velocity, and website responsiveness metrics.
              </li>
              <li>
                <strong className="text-slate-200">Contact & Inquiry Information:</strong> Name, business email address, phone number, and communication preferences submitted via contact or consultation requests.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">3. How We Use Information</h2>
            <p>We use collected data solely for the following business purposes:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li>Generating business diagnostic reports and evaluating customer journey leakage.</li>
              <li>Communicating regarding requested Growth Reviews, audits, or support.</li>
              <li>Delivering automated missed call SMS textbacks and customer intake workflows for contracted clients in accordance with U.S. A2P 10DLC regulations.</li>
              <li>Improving website performance, security, and user experience.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">4. SMS Communication Standards (A2P 10DLC)</h2>
            <p>
              For clients utilizing Hygroon missed call SMS textbacks and automated follow-ups, mobile opt-in data and consent are maintained in strict accordance with U.S. telecommunication standards. Mobile numbers and SMS consent data are never sold, rented, or shared with third parties for marketing purposes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">5. Data Protection and Retention</h2>
            <p>
              We implement industry-standard encryption, tokenization, and access controls. Diagnostic reports and business metrics are retained to maintain longitudinal review data for client accounts.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">6. Contact Information</h2>
            <p>
              If you have questions regarding this Privacy Policy or your business data, contact our security and privacy team:
            </p>
            <div className="pt-1 flex items-center gap-2 text-amber-400 font-medium">
              <Mail className="w-4 h-4" />
              <a href={`mailto:${brandConfig.securityEmail}`} className="hover:underline">
                {brandConfig.securityEmail}
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

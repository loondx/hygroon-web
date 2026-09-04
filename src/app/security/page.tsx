'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { brandConfig } from '@/config/brand.config';
import {
  ShieldCheck,
  Lock,
  Server,
  KeyRound,
  FileCheck,
  CreditCard,
  PhoneCall,
  ChevronDown,
  ArrowRight,
  Database,
} from 'lucide-react';

export default function SecurityPage() {
  const [techDrawerOpen, setTechDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Institutional Trust & Privacy</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Security & Data Protection
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            We hold ourselves to rigorous enterprise standards. Learn how Hygroon safeguards your client data, business credentials, and communications.
          </p>
        </div>

        {/* 5 Core Trust Pillars */}
        <div className="space-y-6">
          {/* Pillar 1 */}
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-white">1. Complete Data Ownership & Privacy</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Your customer data, quote histories, phone logs, and lead records belong exclusively to you. Hygroon never sells, rents, aggregates, or monetizes client data to third parties. If you choose to conclude an engagement, you can export your entire dataset in standard formats at any time.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                <KeyRound className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-white">2. Credential & Access Isolation</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Third-party API keys and gateway credentials (Google Business Profile, SMS Gateways, Cloudflare DNS) are encrypted at rest using AES-256-GCM envelope encryption. Credentials are never logged in plaintext or displayed on client screens without explicit redaction.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-white">3. Payment & Invoicing Security</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              All payment transactions, retainer subscriptions, and deposit collection are processed via Stripe (PCI Service Provider Level 1 certified). Hygroon servers never see, store, or transmit raw credit card numbers or banking secrets.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                <PhoneCall className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-white">4. Telephony & Message Retention</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Automated WhatsApp and SMS qualification transcripts are stored in encrypted relational datastores solely to provide deal attribution and quality assurance. Message logs are automatically purged or anonymized according to your jurisdiction&apos;s data compliance regulations.
            </p>
          </div>
        </div>

        {/* Technical Architecture Deep-Dive Drawer */}
        <div className="p-6 rounded-2xl bg-[#0d1322] border border-slate-800 space-y-4">
          <button
            type="button"
            onClick={() => setTechDrawerOpen(!techDrawerOpen)}
            className="w-full flex items-center justify-between text-left focus:outline-none"
          >
            <div className="flex items-center gap-3">
              <Server className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="font-bold text-white text-base">Technical Infrastructure & Cryptography Details</h3>
                <p className="text-xs text-slate-400">For security auditors and technical operators</p>
              </div>
            </div>
            <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${techDrawerOpen ? 'rotate-180' : ''}`} />
          </button>

          {techDrawerOpen && (
            <div className="pt-4 border-t border-slate-800 text-xs font-mono text-slate-300 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-black/40 border border-slate-800">
                  <strong className="text-amber-400 block mb-1">Datastore Architecture</strong>
                  PostgreSQL 17 on isolated Docker bridge network. Public port 5432 closed; zero direct external access.
                </div>
                <div className="p-3 rounded-lg bg-black/40 border border-slate-800">
                  <strong className="text-amber-400 block mb-1">Queue & Cache</strong>
                  Redis 7 with strict password authentication, append-only file persistence, and BullMQ job idempotency.
                </div>
                <div className="p-3 rounded-lg bg-black/40 border border-slate-800">
                  <strong className="text-amber-400 block mb-1">Edge Encryption</strong>
                  Traefik v3 reverse proxy with automated Let&apos;s Encrypt TLS 1.3 certificates and Strict-Transport-Security.
                </div>
                <div className="p-3 rounded-lg bg-black/40 border border-slate-800">
                  <strong className="text-amber-400 block mb-1">Application Sandbox</strong>
                  All production containers run under unprivileged non-root users (`hygroon:1001`) with read-only root filesystems where applicable.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Security Contact */}
        <div className="text-center pt-4 space-y-2">
          <p className="text-xs text-slate-400">
            Have a specific security questionnaire or compliance inquiry?
          </p>
          <a
            href={`mailto:${brandConfig.securityEmail}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:underline"
          >
            <span>Contact Security Team ({brandConfig.securityEmail})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

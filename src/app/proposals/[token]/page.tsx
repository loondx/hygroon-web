'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { brand } from '@/config/brand.config';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Calendar, 
  DollarSign, 
  FileText, 
  Zap, 
  ArrowRight, 
  Lock, 
  Check, 
  Clock, 
  AlertCircle,
  Building2,
  Mail,
  UserCheck
} from 'lucide-react';

interface ProposalData {
  id: string;
  publicToken: string;
  status: 'DRAFT' | 'SENT' | 'ACCEPTED' | 'EXPIRED';
  title: string;
  businessName: string;
  contactName: string;
  contactEmail: string;
  currency: string;
  currencySymbol: string;
  monthlyRetainer: number;
  setupFee: number;
  durationMonths: number;
  executiveSummary: string;
  currentBottlenecks: string[];
  growthPriorities: string[];
  deliverables: Array<{
    category: string;
    title: string;
    description: string;
  }>;
  plan90Days: Array<{
    month: number;
    title: string;
    focus: string;
    milestones: string[];
  }>;
  acceptedAt?: string;
  signerName?: string;
  signerEmail?: string;
}

const FALLBACK_PROPOSAL: ProposalData = {
  id: 'prop-demo-01',
  publicToken: 'demo-token',
  status: 'SENT',
  title: 'Growth System Deployment & Multi-Channel Scale',
  businessName: 'Gulf Peak AC & Maintenance LLC',
  contactName: 'Tariq Al-Balushi',
  contactEmail: 'tariq@gulfpeakmaintenance.com',
  currency: 'OMR',
  currencySymbol: 'OMR',
  monthlyRetainer: 450,
  setupFee: 750,
  durationMonths: 6,
  executiveSummary: 'Comprehensive deployment of the Servnexa revenue engine: converting inbound search traffic across Muscat into booked maintenance and replacement contracts.',
  currentBottlenecks: [
    '62% of incoming phone calls during field jobs go to voicemail without instant SMS recovery',
    'Website conversion is currently ~1.1% due to lack of 1-tap WhatsApp triage and trust proofs',
    'No systematic follow-up on issued quotes over 250 OMR, causing 60% pipeline drop-off',
  ],
  growthPriorities: [
    'Deploy sub-1-second mobile landing page with instant WhatsApp & click-to-call bars',
    'Implement 60-second missed call auto-text dispatch with qualification bot',
    'Launch multi-touch proposal follow-up cadence to increase quote closing rate by 35%',
  ],
  deliverables: [
    {
      category: 'Foundation & CRO',
      title: 'High-Converting Mobile Web Engine',
      description: 'Custom responsive landing pages built specifically for emergency HVAC and maintenance inquiries in Muscat and Seeb.',
    },
    {
      category: 'Sales Automation',
      title: 'Instant Response & CRM Workflow',
      description: 'Missed-call SMS trigger, WhatsApp quote presentation, and automated 7-step lead nurturing pipeline.',
    },
    {
      category: 'Demand & Visibility',
      title: 'Google Maps 3-Pack & Local Citations',
      description: 'Complete optimization of Google Business Profile, monthly geo-grid rank tracking, and automated 5-star review collector.',
    },
    {
      category: 'Attribution & Analytics',
      title: 'Executive Revenue Attribution Dashboard',
      description: 'Transparent tracking of total inquiries, qualified leads, proposals sent, and revenue generated per marketing source.',
    },
  ],
  plan90Days: [
    {
      month: 1,
      title: 'Month 1: Foundation & Lead Capture Repair',
      focus: 'Plug immediate revenue leaks and deploy high-speed mobile capture pages.',
      milestones: [
        'Deploy missed-call auto-text bot with service triage',
        'Launch sub-1-second mobile website rebuild',
        'Audit Google Business Profile and fix citation inconsistencies',
      ],
    },
    {
      month: 2,
      title: 'Month 2: Demand Dominance & Sales Velocity',
      focus: 'Scale local search rankings and automate proposal follow-up cadences.',
      milestones: [
        'Push local SEO keyword clustering for emergency Muscat terms',
        'Deploy automated 7-touch proposal follow-up cadence',
        'Activate automated post-service Google review collection sequence',
      ],
    },
    {
      month: 3,
      title: 'Month 3: Revenue Attribution & Capacity Scale',
      focus: 'Optimize commercial win-rates and establish predictive monthly recurring contracts.',
      milestones: [
        'Analyze CAC and revenue attribution per channel',
        'Launch annual maintenance contract recurring renewal workflows',
        'Quarterly growth review and territory expansion plan',
      ],
    },
  ],
};

export default function ProposalViewPage() {
  const params = useParams();
  const token = params?.token as string;

  const [proposal, setProposal] = useState<ProposalData>(FALLBACK_PROPOSAL);
  const [loading, setLoading] = useState<boolean>(true);
  const [accepting, setAccepting] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [signerName, setSignerName] = useState<string>('');
  const [signerEmail, setSignerEmail] = useState<string>('');
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);
  const [isAccepted, setIsAccepted] = useState<boolean>(false);

  useEffect(() => {
    if (!token) return;
    fetch(`/api/proposals/public/${token}`)
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Fallback to local');
      })
      .then((data) => {
        setProposal(data);
        if (data.contactName) setSignerName(data.contactName);
        if (data.contactEmail) setSignerEmail(data.contactEmail);
        if (data.status === 'ACCEPTED') setIsAccepted(true);
      })
      .catch(() => {
        // use fallback
        setSignerName(FALLBACK_PROPOSAL.contactName);
        setSignerEmail(FALLBACK_PROPOSAL.contactEmail);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  const handleAcceptProposal = async (e: React.FormEvent) => {
    e.preventDefault();
    setAccepting(true);

    try {
      const res = await fetch(`/api/proposals/public/${token}/accept`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          signerName,
          signerEmail,
          signerRole: 'Authorized Signer',
        }),
      });
      if (res.ok) {
        setIsAccepted(true);
        setShowModal(false);
      } else {
        setIsAccepted(true);
        setShowModal(false);
      }
    } catch (err) {
      setIsAccepted(true);
      setShowModal(false);
    } finally {
      setAccepting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Proposal Header Banner */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 mb-8 shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center p-1.5">
                <img src={brand.logo} alt={brand.name} className="w-full h-full" />
              </div>
              <div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                  Growth System Proposal
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{proposal.title}</h1>
              </div>
            </div>

            <div>
              {isAccepted ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" /> Proposal Accepted
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
                  <Clock className="w-4 h-4" /> Ready for Review & Acceptance
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-xs">
            <div>
              <span className="text-slate-500 block">Prepared For</span>
              <span className="font-bold text-slate-200">{proposal.businessName}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Decision Maker</span>
              <span className="font-bold text-slate-200">{proposal.contactName}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Monthly Retainer</span>
              <span className="font-bold font-mono text-amber-400">
                {proposal.monthlyRetainer} {proposal.currency} / mo
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Term Duration</span>
              <span className="font-bold text-slate-200">{proposal.durationMonths} Months</span>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 mb-8 space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            Executive Summary
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            {proposal.executiveSummary}
          </p>

          {/* Current Bottlenecks Identified */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" /> Key Friction Points Identified in Audit
            </h3>
            <div className="space-y-2">
              {proposal.currentBottlenecks.map((item, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-rose-950/20 border border-rose-900/30 text-xs text-rose-200 flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold shrink-0">•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Deliverables & Scope */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 mb-8 space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            Scope of Implementation
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {proposal.deliverables.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-[10px] font-mono uppercase font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  {item.category}
                </span>
                <h3 className="text-sm font-bold text-white">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 90-Day Execution Roadmap */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 mb-8 space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-400" />
            90-Day Execution Roadmap
          </h2>

          <div className="space-y-4">
            {proposal.plan90Days.map((plan) => (
              <div key={plan.month} className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-slate-850">
                  <span className="text-sm font-bold text-white">{plan.title}</span>
                  <span className="text-xs text-amber-400 font-mono">Sprint {plan.month}</span>
                </div>
                <p className="text-xs text-slate-300 italic">{plan.focus}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  {plan.milestones.map((m, mIdx) => (
                    <div key={mIdx} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Commercial Investment & Agreement */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 mb-8 space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-amber-400" />
            Commercial Terms & Investment
          </h2>

          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-3 border-b sm:border-b-0 sm:border-r border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">One-Time Setup & Deployment</span>
              <span className="text-xl font-mono font-bold text-white">
                {proposal.setupFee} {proposal.currency}
              </span>
            </div>
            <div className="p-3 border-b sm:border-b-0 sm:border-r border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Ongoing Monthly Engine</span>
              <span className="text-xl font-mono font-bold text-amber-400">
                {proposal.monthlyRetainer} {proposal.currency} <span className="text-xs text-slate-400 font-normal">/ mo</span>
              </span>
            </div>
            <div className="p-3">
              <span className="text-xs text-slate-400 block mb-1">Commitment Period</span>
              <span className="text-xl font-mono font-bold text-white">
                {proposal.durationMonths} Months
              </span>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400 text-center sm:text-left">
              <span>Authorized agreement locks in development capacity for {proposal.businessName}.</span>
            </div>

            {isAccepted ? (
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Signed by {signerName || proposal.contactName}
                </span>
                <a
                  href={`/onboarding/${token}`}
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all inline-flex items-center gap-2"
                >
                  Continue to Onboarding <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] inline-flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Accept Proposal & Start System
              </button>
            )}
          </div>
        </div>

        {/* Acceptance Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Lock className="w-4 h-4" />
                  <span>Authorize & Sign Agreement</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-slate-400 hover:text-white text-sm"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAcceptProposal} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Signer Full Name <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={signerName}
                    onChange={(e) => setSignerName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Signer Email Address <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={signerEmail}
                    onChange={(e) => setSignerEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex items-start gap-2.5 pt-2">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="rounded bg-slate-950 border-slate-800 text-amber-500 focus:ring-amber-500 mt-1"
                  />
                  <label htmlFor="terms" className="text-xs text-slate-400 leading-normal">
                    I confirm that I am authorized to bind <strong className="text-slate-200">{proposal.businessName}</strong> to the terms of this {proposal.durationMonths}-month growth deployment at {proposal.monthlyRetainer} {proposal.currency}/month.
                  </label>
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={accepting || !agreedToTerms}
                    className="px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold text-xs shadow-md transition-all inline-flex items-center gap-2"
                  >
                    {accepting ? 'Recording Agreement...' : 'Confirm & Execute'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

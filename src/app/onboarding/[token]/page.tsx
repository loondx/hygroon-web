'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { brand } from '@/config/brand.config';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Building2, 
  Target, 
  DollarSign, 
  Share2, 
  PhoneCall, 
  KeyRound, 
  CalendarCheck,
  Save,
  Check,
  ShieldCheck,
  Lock
} from 'lucide-react';

export default function OnboardingPage() {
  const params = useParams();
  const token = params?.token as string;

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Business Confirmation
    legalName: 'Gulf Peak AC & Maintenance LLC',
    tradeLicenseNo: 'CR-9482103',
    primaryAddress: 'Al Khuwair, Way 3502, Building 14, Muscat, Oman',
    dispatchPhone: '+968 9123 4567',
    whatsappNumber: '+968 9123 4567',

    // Step 2: Growth Goals
    targetMonthlyRevenue: '15,000 OMR',
    monthlyJobCapacity: '45',
    priorityServices: 'Emergency AC Repair, Annual Villa Chiller Contracts',

    // Step 3: Commercial & Pricing
    averageJobValue: '280 OMR',
    serviceRadiusKm: '40 km (Muscat & Seeb)',
    warrantyOffered: '12 Months on Parts, 90 Days on Labor',

    // Step 4: Current Setup
    domainRegistrar: 'GoDaddy / Namecheap',
    currentWebsitePlatform: 'WordPress / None',
    currentCrm: 'WhatsApp / Excel Spreadsheets',

    // Step 5: Sales Process
    leadResponder: 'Office Coordinator (9 AM - 6 PM)',
    afterHoursHandling: 'Voicemail (Currently lost)',
    quoteTurnaroundTime: '24 to 48 Hours',

    // Step 6: Access Checklist
    googleBusinessAccessProvided: true,
    dnsAccessProvided: true,
    whatsappNumberDedicated: true,

    // Step 7: Kickoff
    selectedKickoffSlot: 'Tomorrow at 10:00 AM GST',
  });

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const steps = [
    { num: 1, title: 'Business Confirmation', icon: <Building2 className="w-4 h-4" /> },
    { num: 2, title: 'Growth Goals', icon: <Target className="w-4 h-4" /> },
    { num: 3, title: 'Commercials', icon: <DollarSign className="w-4 h-4" /> },
    { num: 4, title: 'Current Setup', icon: <Share2 className="w-4 h-4" /> },
    { num: 5, title: 'Sales Process', icon: <PhoneCall className="w-4 h-4" /> },
    { num: 6, title: 'Access Checklist', icon: <KeyRound className="w-4 h-4" /> },
    { num: 7, title: 'Launch & Kickoff', icon: <CalendarCheck className="w-4 h-4" /> },
  ];

  const handleCompleteOnboarding = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCompleted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Onboarding Header */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 mb-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                  Client Onboarding
                </span>
                {isSaved && (
                  <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium animate-pulse">
                    <Save className="w-3.5 h-3.5" /> Progress auto-saved
                  </span>
                )}
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white mt-1.5">
                Setup Your Growth Engine: {formData.legalName}
              </h1>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Step <span className="text-amber-400 font-bold">{currentStep}</span> of {steps.length}
            </div>
          </div>

          {/* Stepper Navigation */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-6">
            {steps.map((s) => {
              const isActive = currentStep === s.num;
              const isPast = currentStep > s.num;

              return (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => setCurrentStep(s.num)}
                  className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-1.5 ${
                    isActive
                      ? 'bg-amber-500/15 border-amber-500 text-amber-300 ring-1 ring-amber-500/30'
                      : isPast
                      ? 'bg-slate-950 border-emerald-500/40 text-emerald-400'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-850'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold">0{s.num}</span>
                    {isPast ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : s.icon}
                  </div>
                  <span className="text-[11px] font-bold truncate">{s.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── STEP 1: BUSINESS CONFIRMATION ──────────────────────────── */}
        {currentStep === 1 && (
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-amber-400" />
              1. Business & Dispatch Verification
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Legal Entity / Commercial Name
                </label>
                <input
                  type="text"
                  value={formData.legalName}
                  onChange={(e) => updateField('legalName', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Commercial Registration (CR) / License #
                </label>
                <input
                  type="text"
                  value={formData.tradeLicenseNo}
                  onChange={(e) => updateField('tradeLicenseNo', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Physical Office / Dispatch Base Address
                </label>
                <input
                  type="text"
                  value={formData.primaryAddress}
                  onChange={(e) => updateField('primaryAddress', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Primary Customer Call Line
                </label>
                <input
                  type="text"
                  value={formData.dispatchPhone}
                  onChange={(e) => updateField('dispatchPhone', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Primary WhatsApp Dispatch Line
                </label>
                <input
                  type="text"
                  value={formData.whatsappNumber}
                  onChange={(e) => updateField('whatsappNumber', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all"
              >
                Next: Growth Goals <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 2: GROWTH GOALS ───────────────────────────────────── */}
        {currentStep === 2 && (
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-amber-400" />
              2. Growth & Revenue Targets
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Target Monthly Revenue Goal (in Next 90 Days)
                </label>
                <input
                  type="text"
                  value={formData.targetMonthlyRevenue}
                  onChange={(e) => updateField('targetMonthlyRevenue', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Monthly Job / Service Capacity
                </label>
                <input
                  type="text"
                  value={formData.monthlyJobCapacity}
                  onChange={(e) => updateField('monthlyJobCapacity', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Highest Margin / Priority Services to Scale First
                </label>
                <textarea
                  rows={3}
                  value={formData.priorityServices}
                  onChange={(e) => updateField('priorityServices', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all"
              >
                Next: Commercials <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: COMMERCIALS & PRICING ──────────────────────────── */}
        {currentStep === 3 && (
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-amber-400" />
              3. Commercial Details & Service Coverage
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Average Ticket Size / Job Value
                </label>
                <input
                  type="text"
                  value={formData.averageJobValue}
                  onChange={(e) => updateField('averageJobValue', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Primary Dispatch Radius
                </label>
                <input
                  type="text"
                  value={formData.serviceRadiusKm}
                  onChange={(e) => updateField('serviceRadiusKm', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Warranty & Guarantee Terms (used for website trust badges)
                </label>
                <input
                  type="text"
                  value={formData.warrantyOffered}
                  onChange={(e) => updateField('warrantyOffered', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all"
              >
                Next: Current Setup <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 4: CURRENT SETUP ──────────────────────────────────── */}
        {currentStep === 4 && (
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Share2 className="w-5 h-5 text-amber-400" />
              4. Current Digital Stack
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Domain Name Registrar (where your domain is bought)
                </label>
                <input
                  type="text"
                  value={formData.domainRegistrar}
                  onChange={(e) => updateField('domainRegistrar', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Existing Website Platform (if any)
                </label>
                <input
                  type="text"
                  value={formData.currentWebsitePlatform}
                  onChange={(e) => updateField('currentWebsitePlatform', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Current Lead / Customer Tracking System
                </label>
                <input
                  type="text"
                  value={formData.currentCrm}
                  onChange={(e) => updateField('currentCrm', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(5)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all"
              >
                Next: Sales Process <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 5: SALES PROCESS ──────────────────────────────────── */}
        {currentStep === 5 && (
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-amber-400" />
              5. Sales Handling & Inbound Protocols
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Who handles inbound phone inquiries during business hours?
                </label>
                <input
                  type="text"
                  value={formData.leadResponder}
                  onChange={(e) => updateField('leadResponder', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  What happens when calls arrive after hours or during jobs?
                </label>
                <input
                  type="text"
                  value={formData.afterHoursHandling}
                  onChange={(e) => updateField('afterHoursHandling', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Average time taken to deliver a formal quotation to a customer
                </label>
                <input
                  type="text"
                  value={formData.quoteTurnaroundTime}
                  onChange={(e) => updateField('quoteTurnaroundTime', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(6)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all"
              >
                Next: Access Checklist <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 6: ACCESS COLLECTION CHECKLIST ────────────────────── */}
        {currentStep === 6 && (
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-amber-400" />
                6. Secure Access Delegation Checklist
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                We will send manager invitations directly to the following accounts so you maintain full primary ownership.
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-bold text-white">Google Business Profile Delegation</div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Add <code className="text-amber-400 bg-slate-900 px-1.5 py-0.5 rounded">ops@servnexa.com</code> as a Manager on Google Business Profile.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={formData.googleBusinessAccessProvided}
                  onChange={(e) => updateField('googleBusinessAccessProvided', e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-amber-500 focus:ring-amber-500 w-5 h-5 mt-1"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-bold text-white">DNS / Domain Delegate Access</div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Share DNS access via GoDaddy / Cloudflare delegate invite to point sub-1-second landing pages.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={formData.dnsAccessProvided}
                  onChange={(e) => updateField('dnsAccessProvided', e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-amber-500 focus:ring-amber-500 w-5 h-5 mt-1"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-bold text-white">Dedicated WhatsApp Dispatch Number</div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Confirm dedicated mobile SIM is ready to connect the 24/7 automated qualification engine.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={formData.whatsappNumberDedicated}
                  onChange={(e) => updateField('whatsappNumberDedicated', e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-amber-500 focus:ring-amber-500 w-5 h-5 mt-1"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setCurrentStep(5)}
                className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(7)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all"
              >
                Next: Launch Schedule <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 7: KICKOFF & LAUNCH SCHEDULE ─────────────────────── */}
        {currentStep === 7 && !isCompleted && (
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <CalendarCheck className="w-5 h-5 text-amber-400" />
                7. Technical Kickoff & Immediate Next Steps
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Your technical growth engineer will verify credentials and walk through the initial 30-day deployment sprint.
              </p>
            </div>

            <form onSubmit={handleCompleteOnboarding} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Confirm Kickoff Call Time Slot
                </label>
                <select
                  value={formData.selectedKickoffSlot}
                  onChange={(e) => updateField('selectedKickoffSlot', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
                >
                  <option value="Tomorrow at 10:00 AM GST">Tomorrow at 10:00 AM GST</option>
                  <option value="Tomorrow at 2:00 PM GST">Tomorrow at 2:00 PM GST</option>
                  <option value="In 2 Days at 11:00 AM GST">In 2 Days at 11:00 AM GST</option>
                  <option value="In 2 Days at 4:00 PM GST">In 2 Days at 4:00 PM GST</option>
                </select>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs text-slate-400">
                <div className="font-semibold text-slate-200">Deployment Sprint Overview:</div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" /> Day 1-3: DNS Configuration & Missed Call SMS setup
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" /> Day 4-7: High-speed mobile landing page deployment
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" /> Day 8-14: Google Maps 3-Pack optimization & Review automation
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setCurrentStep(6)}
                  className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 transition-all hover:scale-[1.02]"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Finalize Onboarding & Book Sprint
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ── ONBOARDING COMPLETED STATE ────────────────────────────── */}
        {isCompleted && (
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">Onboarding Complete!</h2>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Your growth system workspace is now provisioned. We have scheduled the technical kickoff for <strong className="text-amber-400">{formData.selectedKickoffSlot}</strong>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 max-w-md mx-auto text-xs text-slate-400 space-y-2 text-left">
              <div className="font-semibold text-slate-200">Next Actions:</div>
              <ul className="space-y-1.5">
                <li className="flex items-center gap-2">
                  <span className="text-amber-400">•</span> Calendar invitation dispatched with Google Meet link
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-400">•</span> Staging subdomain prepared for mobile landing page preview
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-400">•</span> Dedicated Client Portal access enabled
                </li>
              </ul>
            </div>

            <div className="pt-4 flex justify-center gap-4">
              <a
                href={brand.consoleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all inline-flex items-center gap-2"
              >
                Access Client Portal <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  PhoneCall,
  AlertTriangle,
  CheckCircle2,
  Zap,
  type LucideIcon,
} from 'lucide-react';

interface NodeItem {
  id: string;
  stepNum: string;
  kind: 'step' | 'leak';
  label: string;
  subLabel: string;
  icon: LucideIcon;
  headline: string;
  impactMetric: string;
  fixLine: string;
}

const NODES: NodeItem[] = [
  {
    id: 'found',
    stepNum: '01',
    kind: 'step',
    label: 'Found You',
    subLabel: 'Search & Maps',
    icon: Search,
    headline: 'Missing Google Maps rankings loses callers before they arrive.',
    impactMetric: '70% Mobile Search',
    fixLine: 'Optimized Google Maps 3-pack prominence.',
  },
  {
    id: 'contacted',
    stepNum: '02',
    kind: 'step',
    label: 'Contacted You',
    subLabel: 'Website & Call',
    icon: PhoneCall,
    headline: 'Slow mobile loading or buried phone buttons force immediate bounce.',
    impactMetric: '85% Tap-to-Call',
    fixLine: 'Instant tap-to-call mobile experience.',
  },
  {
    id: 'leak',
    stepNum: '03',
    kind: 'leak',
    label: 'Slow Response',
    subLabel: 'Critical Leak',
    icon: AlertTriangle,
    headline: '80% of missed callers hire another contractor within 3 minutes.',
    impactMetric: '-65% Revenue Lost',
    fixLine: 'Instant automated SMS textback & evening recovery.',
  },
  {
    id: 'booked',
    stepNum: '04',
    kind: 'step',
    label: 'Booked Work',
    subLabel: 'Confirmed Job',
    icon: CheckCircle2,
    headline: 'Fast communication and clear quote follow-up confirm the appointment.',
    impactMetric: '3x Closing Lift',
    fixLine: 'Automated quote follow-up & prompt dispatch.',
  },
];

export default function JourneyLeak() {
  const [activeId, setActiveId] = useState<string>('leak');
  const [autoPlay, setAutoPlay] = useState<boolean>(true);

  const handleSelect = (id: string) => {
    setActiveId(id);
    setAutoPlay(false);
  };

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setActiveId((current) => {
        const idx = NODES.findIndex((n) => n.id === current);
        const nextIdx = (idx + 1) % NODES.length;
        return NODES[nextIdx].id;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [autoPlay]);

  const currentNode = NODES.find((n) => n.id === activeId) || NODES[2];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* ───────────────────────────────────────────────────────────────────
          Desktop Stepper Row (4 Acquisition Steps)
      ─────────────────────────────────────────────────────────────────── */}
      <div className="hidden sm:block">
        <div className="relative p-6 rounded-2xl bg-[#0b101d] border border-slate-800/80 shadow-2xl backdrop-blur-xl">
          {/* Timeline Connector Line */}
          <div className="absolute top-14 left-[15%] right-[15%] h-0.5 bg-slate-800 pointer-events-none z-0" />

          {/* Stepper Buttons */}
          <div className="relative z-10 grid grid-cols-4 gap-4">
            {NODES.map((node) => {
              const Icon = node.icon;
              const isActive = node.id === activeId;
              const isLeak = node.kind === 'leak';

              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => handleSelect(node.id)}
                  className={`group flex flex-col items-center text-center p-2 rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'scale-105'
                      : 'hover:bg-slate-900/50 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div
                    className={`relative w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-md ${
                      isLeak
                        ? isActive
                          ? 'bg-rose-500 text-slate-950 ring-4 ring-rose-500/20 scale-110 shadow-rose-500/30'
                          : 'bg-rose-950/80 border-2 border-rose-500/60 text-rose-400'
                        : isActive
                        ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-500/20 scale-110 shadow-amber-500/30'
                        : 'bg-slate-900 border-2 border-slate-800 text-slate-400 group-hover:border-slate-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {isLeak && !isActive && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                    )}
                  </div>

                  <div className="mt-2.5 space-y-0.5">
                    <span
                      className={`text-[10px] font-mono font-bold tracking-widest block ${
                        isLeak ? 'text-rose-400' : 'text-amber-400'
                      }`}
                    >
                      {node.stepNum}
                    </span>
                    <h4
                      className={`text-xs font-bold transition-colors leading-tight ${
                        isActive
                          ? 'text-white font-extrabold'
                          : isLeak
                          ? 'text-rose-300'
                          : 'text-slate-300'
                      }`}
                    >
                      {node.label}
                    </h4>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────────────
          Desktop Active Showcase Card
      ─────────────────────────────────────────────────────────────────── */}
      <div className="hidden sm:block">
        <div
          className={`p-8 sm:p-10 rounded-2xl border transition-all duration-500 backdrop-blur-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 ${
            currentNode.kind === 'leak'
              ? 'bg-gradient-to-r from-rose-950/40 via-[#0e1220] to-[#0b101d] border-rose-500/30 shadow-2xl shadow-rose-950/20'
              : 'bg-gradient-to-r from-[#0d1424] via-[#0b101d] to-[#070a12] border-slate-800 shadow-2xl shadow-black/40'
          }`}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-3xl pointer-events-none rounded-full" />

          <div className="space-y-3 max-w-xl text-left">
            <div className="flex items-center gap-2">
              <span
                className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider ${
                  currentNode.kind === 'leak'
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}
              >
                Step {currentNode.stepNum} &bull; {currentNode.subLabel}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white leading-snug tracking-tight">
              {currentNode.headline}
            </h3>

            <div className="pt-1 flex items-center gap-2 text-xs text-amber-400 font-semibold">
              <Zap className="w-3.5 h-3.5 shrink-0" />
              <span>{currentNode.fixLine}</span>
            </div>
          </div>

          <div className="shrink-0 text-center md:text-right p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg min-w-[200px]">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-1">
              Impact Metric
            </span>
            <span
              className={`text-2xl sm:text-3xl font-black tracking-tight block ${
                currentNode.kind === 'leak' ? 'text-rose-400' : 'text-emerald-400'
              }`}
            >
              {currentNode.impactMetric}
            </span>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────────────
          Mobile Stacked Cards
      ─────────────────────────────────────────────────────────────────── */}
      <div className="sm:hidden space-y-3">
        {NODES.map((node) => {
          const Icon = node.icon;
          const isExpanded = node.id === activeId;
          const isLeak = node.kind === 'leak';

          return (
            <div
              key={node.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isLeak
                  ? isExpanded
                    ? 'bg-rose-950/40 border-rose-500/50 shadow-lg'
                    : 'bg-[#0b101d] border-rose-950'
                  : isExpanded
                  ? 'bg-slate-900/90 border-amber-500/40 shadow-lg'
                  : 'bg-[#0b101d] border-slate-800/80'
              }`}
            >
              <button
                type="button"
                onClick={() => handleSelect(node.id)}
                className="w-full p-4 min-h-[48px] flex items-center justify-between gap-3 text-left"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                      isLeak
                        ? 'bg-rose-500 text-slate-950'
                        : isExpanded
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-800 text-amber-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-amber-400">
                        {node.stepNum}
                      </span>
                      {isLeak && (
                        <span className="text-[9px] font-extrabold uppercase bg-rose-500/20 text-rose-400 px-1.5 py-0.5 rounded border border-rose-500/30">
                          Leak Point
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-white leading-tight">
                      {node.label}
                    </h4>
                  </div>
                </div>

                <span
                  className={`text-xs font-mono font-bold ${
                    isLeak ? 'text-rose-400' : 'text-emerald-400'
                  }`}
                >
                  {node.impactMetric}
                </span>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 pt-1 space-y-2 border-t border-slate-800/60 text-xs animate-fadeIn">
                  <p className="text-white font-medium leading-snug pt-1">
                    {node.headline}
                  </p>
                  <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-[11px] pt-0.5">
                    <Zap className="w-3 h-3 text-amber-400 shrink-0" />
                    <span>{node.fixLine}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

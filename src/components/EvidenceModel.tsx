import React from 'react';
import { CheckCircle2, Calculator, Lightbulb, HelpCircle, ShieldCheck, type LucideIcon } from 'lucide-react';

const PRINCIPLES: { text: string; icon: LucideIcon }[] = [
  { text: 'We verify what we can.', icon: CheckCircle2 },
  { text: 'We clearly label what we infer.', icon: Lightbulb },
  { text: 'We never present assumptions as facts.', icon: ShieldCheck },
];

interface EvidenceState {
  label: string;
  color: string;
  icon: LucideIcon;
}

const STATES: EvidenceState[] = [
  { label: 'Observed', color: 'emerald', icon: CheckCircle2 },
  { label: 'Calculated', color: 'sky', icon: Calculator },
  { label: 'Inferred', color: 'amber', icon: Lightbulb },
  { label: 'Needs Confirmation', color: 'slate', icon: HelpCircle },
];

const COLOR_CLASSES: Record<string, string> = {
  emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
  sky: 'bg-sky-500/10 border-sky-500/20 text-sky-400',
  amber: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
  slate: 'bg-slate-500/10 border-slate-500/30 text-slate-300',
};

export default function EvidenceModel() {
  return (
    <div className="max-w-3xl mx-auto space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {PRINCIPLES.map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.text} className="flex flex-col items-center text-center gap-2.5">
              <Icon className="w-5 h-5 text-amber-400" />
              <p className="text-base font-semibold text-white leading-snug">{p.text}</p>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2.5 pt-6 border-t border-slate-800/60">
        {STATES.map((state) => {
          const Icon = state.icon;
          return (
            <span
              key={state.label}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-bold uppercase tracking-wide ${COLOR_CLASSES[state.color]}`}
            >
              <Icon className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{state.label}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

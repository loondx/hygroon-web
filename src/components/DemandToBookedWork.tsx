import React from 'react';

interface Outcome {
  num: string;
  title: string;
  subtitle: string;
  hook: string;
}

const OUTCOMES: Outcome[] = [
  {
    num: '01',
    title: 'GET FOUND',
    subtitle: 'Local Search & Maps',
    hook: 'Google Maps 3-pack prominence that puts your business first.',
  },
  {
    num: '02',
    title: 'GET CONTACTED',
    subtitle: 'Conversion & Mobile Capture',
    hook: 'Fast mobile click-to-call pathways that convert website visitors.',
  },
  {
    num: '03',
    title: 'RESPOND FASTER',
    subtitle: 'After-Hours & Missed Recovery',
    hook: 'Automated SMS textback to recover missed evening callers.',
  },
  {
    num: '04',
    title: 'BOOK MORE WORK',
    subtitle: 'Follow-Up & Confirmation',
    hook: 'Systematized estimate reminders and automated dispatch follow-up.',
  },
];

export default function DemandToBookedWork() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Desktop / Tablet: Editorial 2x2 layout with subtle structural borders */}
      <div className="hidden sm:grid sm:grid-cols-2 gap-x-12 gap-y-10">
        {OUTCOMES.map((outcome, idx) => (
          <div
            key={outcome.num}
            className={`space-y-2.5 ${idx >= 2 ? 'sm:pt-8 sm:border-t sm:border-slate-800/60' : ''} ${
              idx % 2 === 0 ? 'sm:pr-8 sm:border-r sm:border-slate-800/60' : 'sm:pl-8'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold tracking-widest text-amber-400">
                {outcome.num}
              </span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                {outcome.subtitle}
              </span>
            </div>
            <h3 className="text-xl font-black text-white tracking-wide uppercase">{outcome.title}</h3>
            <p className="text-sm text-slate-300 font-medium leading-relaxed">{outcome.hook}</p>
          </div>
        ))}
      </div>

      {/* Mobile: Clean alternating editorial layout with visual rhythm */}
      <div className="sm:hidden space-y-6">
        {OUTCOMES.map((outcome, idx) => {
          const isRight = idx % 2 !== 0;
          return (
            <React.Fragment key={outcome.num}>
              <div className={`space-y-2 ${isRight ? 'text-right pl-6' : 'text-left pr-6'}`}>
                <div className={`flex items-center gap-2 ${isRight ? 'justify-end' : 'justify-start'}`}>
                  <span className="text-xs font-mono font-bold tracking-widest text-amber-400">
                    {outcome.num}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    {outcome.subtitle}
                  </span>
                </div>
                <h3 className="text-lg font-black text-white tracking-wide uppercase">{outcome.title}</h3>
                <p className="text-xs text-slate-300 font-medium leading-relaxed max-w-[280px] inline-block">
                  {outcome.hook}
                </p>
              </div>
              {idx < OUTCOMES.length - 1 && (
                <div className="w-full border-t border-slate-800/50 my-3" aria-hidden="true" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

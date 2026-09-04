'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { brandConfig } from '@/config/brand.config';
import { trackAnalyzeCtaClick } from '@/lib/analytics';

interface AnalyzeCtaProps {
  source: string;
  label?: string;
  className?: string;
  iconClassName?: string;
}

const DEFAULT_CLASSES =
  'w-full sm:w-auto px-8 h-14 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-extrabold text-base transition-all shadow-xl shadow-amber-500/25 active:scale-[0.98] flex items-center justify-center gap-2.5';

export default function AnalyzeCta({
  source,
  label = brandConfig.primaryCTA,
  className = DEFAULT_CLASSES,
  iconClassName = 'w-5 h-5',
}: AnalyzeCtaProps) {
  return (
    <Link href="/analyze" onClick={() => trackAnalyzeCtaClick({ source })} className={className}>
      <span>{label}</span>
      <ArrowRight className={iconClassName} />
    </Link>
  );
}

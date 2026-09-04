'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { brandConfig } from '@/config/brand.config';
import { trackAnalyzeCtaClick } from '@/lib/analytics';
import { Menu, X, ArrowRight, Compass } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#090d16]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <Compass className="w-6 h-6 text-amber-400 transition-transform group-hover:rotate-12" strokeWidth={1.75} />
          <span className="font-bold text-xl tracking-[-0.01em] text-white">{brandConfig.name}</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-slate-300">
          <Link href="/industries" className="hover:text-white transition-colors">
            Industries
          </Link>
          <a href="/#how-it-works" className="hover:text-white transition-colors">
            How It Works
          </a>
          <Link href="/insights" className="hover:text-white transition-colors">
            Insights
          </Link>
          <Link href="/about" className="hover:text-white transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
        </nav>

        {/* Action CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/analyze"
            onClick={() => trackAnalyzeCtaClick({ source: 'navbar' })}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 transition-all shadow-md shadow-amber-500/20 active:scale-95"
          >
            <span>{brandConfig.primaryCTA}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#090d16] px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            <Link
              href="/industries"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800/60"
            >
              Industries
            </Link>
            <a
              href="/#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800/60"
            >
              How It Works
            </a>
            <Link
              href="/insights"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800/60"
            >
              Insights
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800/60"
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800/60"
            >
              Contact
            </Link>
          </nav>
          <div className="pt-3 border-t border-slate-800/80">
            <Link
              href="/analyze"
              onClick={() => {
                trackAnalyzeCtaClick({ source: 'navbar_mobile' });
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-lg bg-amber-500 text-slate-950 font-bold text-center flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <span>{brandConfig.primaryCTA}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}


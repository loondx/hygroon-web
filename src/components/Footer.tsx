import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { brandConfig, getLegalAttribution } from '@/config/brand.config';
import { ShieldCheck, Mail, Linkedin } from 'lucide-react';

export default function Footer() {
  const legalAttribution = getLegalAttribution();

  return (
    <footer className="border-t border-slate-800/80 bg-[#060911] text-slate-400 text-sm pb-20 sm:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1fr_1fr] gap-8 md:gap-6">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4 pr-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg border border-amber-500/30 bg-[#090d16] flex items-center justify-center overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="Hygroon Logo"
                  width={32}
                  height={32}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="font-bold text-lg tracking-tight text-white">{brandConfig.name}</span>
            </Link>
            <p className="text-slate-400 text-sm max-w-xs leading-relaxed">{brandConfig.supportingCopy}</p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-md w-fit">
              <ShieldCheck className="w-4 h-4" />
              <span>Evidence-Grounded Intelligence</span>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/analyze" className="hover:text-white transition-colors">
                  Solutions
                </Link>
              </li>
              <li>
                <Link href="/industries" className="hover:text-white transition-colors">
                  Industries
                </Link>
              </li>
              <li>
                <Link href="/results" className="hover:text-white transition-colors">
                  Results
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-white transition-colors">
                  Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/analyze" className="hover:text-white transition-colors">
                  Analyze Business
                </Link>
              </li>
              <li>
                <a href={`mailto:${brandConfig.salesEmail}`} className="hover:text-white transition-colors">
                  Contact Sales
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${brandConfig.salesEmail}`}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">{brandConfig.salesEmail}</span>
                </a>
              </li>
              {brandConfig.socials.linkedin && (
                <li>
                  <a
                    href={brandConfig.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>LinkedIn</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} {brandConfig.name}. All rights reserved.
            {legalAttribution && <span className="ml-2">{legalAttribution}</span>}
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

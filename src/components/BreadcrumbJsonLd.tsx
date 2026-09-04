import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { brandConfig } from '@/config/brand.config';

interface Crumb {
  name: string;
  path: string; // e.g. '/industries/hvac'
}

/** Renders both the visible breadcrumb trail AND its BreadcrumbList
 * structured data from the same `trail` prop, so the two can never drift
 * apart — structured data must describe content that's actually on the
 * page, not claim a navigation path that isn't there. Always includes Home
 * as the first crumb. */
export default function BreadcrumbJsonLd({ trail }: { trail: Crumb[] }) {
  const full = [{ name: 'Home', path: '/' }, ...trail];

  const itemListElement = full.map((crumb, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: crumb.name,
    item: `${brandConfig.website}${crumb.path}`,
  }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Breadcrumb" className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
          {full.map((crumb, i) => {
            const isLast = i === full.length - 1;
            return (
              <li key={crumb.path} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="w-3 h-3 text-slate-700" aria-hidden="true" />}
                {isLast ? (
                  <span className="text-slate-400" aria-current="page">
                    {crumb.name}
                  </span>
                ) : (
                  <Link href={crumb.path} className="hover:text-slate-300 transition-colors">
                    {crumb.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

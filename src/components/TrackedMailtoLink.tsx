'use client';

import React from 'react';
import { trackContactAction, trackContactClick } from '@/lib/analytics';

// Lets a mailto: CTA fire tracking events without turning its parent
// server-rendered page into a client component.
export default function TrackedMailtoLink({
  href,
  source,
  className,
  children,
}: {
  href: string;
  source: string;
  className?: string;
  children: React.ReactNode;
}) {
  const handleClick = () => {
    trackContactAction({ source });
    trackContactClick({ source });
  };

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}

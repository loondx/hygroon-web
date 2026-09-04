'use client';

import { useEffect } from 'react';
import { captureAttribution } from '@/lib/leadContext';

// Mounted once in the root layout so first-touch UTM/referrer is captured
// on whichever page a visitor actually lands on: not only when they
// happen to open a "Book a Growth Call" modal, by which point the landing
// URL's query params may be long gone. captureAttribution() itself is a
// no-op after the first call this session (see leadContext.ts).
export default function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);

  return null;
}

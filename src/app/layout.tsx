import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { brandConfig } from '@/config/brand.config';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StickyMobileCta from '@/components/StickyMobileCta';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import AttributionCapture from '@/components/AttributionCapture';
import './globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });

export const metadata: Metadata = {
  metadataBase: new URL(brandConfig.website),
  title: {
    default: `${brandConfig.name}: ${brandConfig.tagline}`,
    // Every child page sets a plain string title (e.g. 'Contact') and gets
    // this suffix automatically — see e.g. src/app/contact/page.tsx.
    template: `%s | ${brandConfig.name}`,
  },
  description: `${brandConfig.valueProposition} ${brandConfig.supportingCopy}`,
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    // logo.svg is the only real icon asset that exists — a literal
    // /favicon.ico reference here 404s (no such file in public/).
    icon: '/logo.svg',
  },
  // Env-driven so no verification token is hardcoded into a reusable source
  // file — unset until GSC/Bing Webmaster Tools properties actually exist.
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_VERIFICATION
      ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION }
      : undefined,
  },
  openGraph: {
    title: `${brandConfig.name}: ${brandConfig.tagline}`,
    description: brandConfig.valueProposition,
    url: brandConfig.website,
    siteName: brandConfig.name,
    type: 'website',
  },
  // No dedicated 1200x630 OG image asset exists yet (see the SEO audit
  // report) — 'summary' doesn't require one; upgrading to
  // 'summary_large_image' needs a real image added to openGraph.images
  // first, not a fabricated one.
  twitter: {
    card: 'summary',
    title: `${brandConfig.name}: ${brandConfig.tagline}`,
    description: brandConfig.valueProposition,
  },
};

// Truthful only — no ratings, reviews, address, or awards (none are real
// yet). See docs/PUBLIC_UX_SEO_PLAN.md for the structured-data policy.
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: brandConfig.name,
  url: brandConfig.website,
  logo: `${brandConfig.website}/logo.svg`,
  ...(brandConfig.socials.linkedin ? { sameAs: [brandConfig.socials.linkedin] } : {}),
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: brandConfig.name,
  url: brandConfig.website,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${geist.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#090d16] text-slate-100 antialiased selection:bg-amber-500 selection:text-slate-950 font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        <div className="bg-grain" aria-hidden="true" />
        <AttributionCapture />
        <GoogleAnalytics />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyMobileCta />
      </body>
    </html>
  );
}

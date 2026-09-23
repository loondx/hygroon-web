import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { brandConfig } from "@/config/brand.config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyMobileCta from "@/components/StickyMobileCta";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import AttributionCapture from "@/components/AttributionCapture";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  metadataBase: new URL(brandConfig.website),
  title: {
    default: `${brandConfig.name}: ${brandConfig.tagline}`,
    template: `%s | ${brandConfig.name}`,
  },
  description: `${brandConfig.valueProposition} ${brandConfig.supportingCopy}`,
  keywords: [
    "HVAC Local SEO Agency",
    "Service Business Growth",
    "Local Lead Capture",
    "HVAC Marketing Agency",
    "Emergency Call Recovery",
    "Service Business OS",
    "Google Maps Prominence",
    "Home Services Lead Generation",
    "Speed to Lead SMS Recovery",
  ],
  authors: [{ name: "Hygroon", url: brandConfig.website }],
  creator: "Hygroon",
  publisher: "Hygroon",
  category: "business",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    // Google Search and Apple's home-screen icon do not accept SVG here —
    // both require a real raster favicon, so these must stay PNG/ICO.
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION }
      : undefined,
  },
  openGraph: {
    title: `${brandConfig.name}: ${brandConfig.tagline}`,
    description: brandConfig.valueProposition,
    url: brandConfig.website,
    siteName: brandConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        // Actual file is a 1024x1024 square, not the classic 1200x630 —
        // declaring the real dimensions here (rather than the OG-recommended
        // ones) so platforms don't reject/mis-crop it over a size mismatch.
        url: "/og-image.png",
        width: 1024,
        height: 1024,
        alt: `${brandConfig.name} - ${brandConfig.tagline}`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${brandConfig.name}: ${brandConfig.tagline}`,
    description: brandConfig.valueProposition,
    site: "@hygroon",
    creator: "@hygroon",
    images: [
      {
        url: "/og-image.png",
        width: 1024,
        height: 1024,
        alt: `${brandConfig.name} - ${brandConfig.tagline}`,
      },
    ],
  },
};

const canonicalSiteUrl = new URL(brandConfig.website).toString();

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: brandConfig.name,
  alternateName: "Hygroon.com",
  url: canonicalSiteUrl,
  // Google's Logo/Organization guidance wants a raster image, not SVG.
  logo: `${brandConfig.website}/icon-512.png`,
  sameAs: [brandConfig.socials.linkedin, brandConfig.socials.facebook].filter(
    (url): url is string => Boolean(url)
  ),
  email: brandConfig.supportEmail,
  contactPoint: {
    "@type": "ContactPoint",
    email: brandConfig.supportEmail,
    contactType: "customer support",
  },
  description: brandConfig.valueProposition,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Home Service Growth Systems & Local SEO Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "HVAC Local SEO & Growth Diagnostic",
          description:
            "Google Maps 3-Pack optimization, high-intent HVAC search ranking, and speed-to-lead missed call textback for heating & cooling contractors.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Waterproofing & Foundation Growth Systems",
          description:
            "Local search visibility and lead recovery for basement waterproofing and foundation repair contractors.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Drainage & Wastewater Marketing",
          description:
            "Local search prominence and emergency call capture for drainage and wastewater specialists.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Water Restoration Growth Systems",
          description:
            "Emergency water damage restoration lead capture and local search optimization.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Pest Control Local SEO",
          description:
            "Recurring contract growth and local Google Maps optimization for pest control businesses.",
        },
      },
    ],
  },
};

// Google reads WebSite.name / alternateName on the homepage to decide the
// site name shown in results, which is how a new brand like "Hygroon" gets
// recognized as its own entity instead of being auto-corrected.
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: brandConfig.name,
  alternateName: ["Hygroon.com"],
  url: canonicalSiteUrl,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${geist.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#090d16] text-slate-100 antialiased selection:bg-amber-500 selection:text-slate-950 font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
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

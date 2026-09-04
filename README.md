# 🚀 Hygroon Web — Growth Systems & Local SEO Platform

> **Hygroon Web** is the production-grade Next.js 16 (React 19) public application and SEO engine for **Hygroon** — the premier Local SEO and Revenue Growth System for home service contractors (HVAC, Waterproofing, Drainage, Water Restoration, Pest Control, etc.).

---

## 📋 Table of Contents
1. [Architecture Overview](#-architecture-overview)
2. [SEO & Ranking Engine Architecture](#-seo--ranking-engine-architecture)
3. [The Ultimate SEO Best Practices & Ranking SOP](#-the-ultimate-seo-best-practices--ranking-sop)
4. [Structured Data & Schema Markup (JSON-LD)](#-structured-data--schema-markup-json-ld)
5. [AI Search & Generative Engine Optimization (GEO)](#-ai-search--generative-engine-optimization-geo)
6. [How to Add New Industry Landing Pages](#-how-to-add-new-industry-landing-pages)
7. [Developer Operations & Verification](#-developer-operations--verification)

---

## 🏗️ Architecture Overview

The web application is engineered with Next.js 16 App Router, TailwindCSS, TypeScript, and React 19.

### Key Directory Structure:
```
hygroon-web/
├── public/
│   ├── llms.txt               # Lightweight LLM/AI search manifest
│   ├── llms-full.txt          # Full service taxonomy & context for AI search engines
│   ├── og-image.png           # Global OpenGraph social preview image (1200x630)
│   └── logo.png / logo.svg    # High-resolution brand visual assets
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout with site-wide JSON-LD (Organization, ProfessionalService, OfferCatalog)
│   │   ├── page.tsx           # High-converting homepage
│   │   ├── sitemap.ts         # Dynamic sitemap generation with priority & changefreq
│   │   ├── robots.ts          # Search engine crawler directive rules & sitemap pointer
│   │   ├── about/             # Brand story & Local SEO methodology
│   │   ├── analyze/           # Interactive local business audit & diagnostic engine
│   │   ├── contact/           # High-intent lead routing and contact handlers
│   │   ├── growth-review/     # Consultation scheduling
│   │   ├── industries/        # High-intent industry landing pages (HVAC, Drainage, etc.)
│   │   └── insights/ & results/ # Value-driven research and verifiable case studies
│   ├── components/            # Reusable UI & Schema components (BreadcrumbJsonLd, Navbar, Footer, etc.)
│   ├── config/                # Centralized brand and market configuration wrappers
│   ├── lib/                   # Core business logic, validation, analytics & scroll tracking
│   └── shared/                # Core brand tokens, types, and supported market matrices
```

---

## 🎯 SEO & Ranking Engine Architecture

Hygroon Web is designed around a **Search Engine Prominence First** framework:

1. **Root Layout Metadata Base**: Configured with `metadataBase: new URL(brandConfig.website)` to guarantee absolute canonical URLs across all pages and social shares.
2. **Canonical Links**: Automatically attached to every public route via Page Metadata (`alternates: { canonical: '/route' }`).
3. **Robots Directives (`robots.ts`)**:
   - Allows public marketing and industry landing pages to be indexed.
   - Strictly disallows token-gated private routes (`/reports/`, `/proposals/`, `/onboarding/`, `/api/`).
4. **Sitemap Infrastructure (`sitemap.ts`)**:
   - Programmatically builds valid sitemaps containing all top-level public pages and active industry vertical landing pages.
   - Assigns priority ratings (e.g., `1.0` for homepage, `0.9` for top industry verticals like `/industries/hvac` and `/analyze`).

---

## ⚡ The Ultimate SEO Best Practices & Ranking SOP

Follow this simple 7-step checklist to ensure every page on this website ranks #1 on search engines:

### 1. Title Tag & H1 Hierarchy
- **Title Tag Rule**: Max 60 characters. Format: `{Primary Keyword} | Hygroon` or `{Keyword} for {Industry} | Hygroon`.
- **H1 Tag Rule**: Exactly ONE `<h1>` tag per page, containing the primary search query (e.g., `Local SEO & Growth Systems for HVAC Contractors`).
- **Subheadings**: Use `<h2>` for major sections and `<h3>` for supporting sub-features. Never skip levels.

### 2. Meta Description Optimization
- Keep meta descriptions between **140–160 characters**.
- Include primary target keywords + clear value proposition + CTA.
- *Example*: *"Hygroon is the premier Local SEO agency for HVAC contractors. Rank #1 on Google Maps 3-Pack, capture missed calls with SMS textback, and grow revenue."*

### 3. High-Intent Keyword Density & Semantic Entities
- Include exact-match emergency and high-intent terms naturally: `Google Maps 3-Pack`, `Speed to Lead`, `AC Repair Local SEO`, `Missed Call SMS Recovery`, `HVAC Lead Generation`.
- Avoid keyword stuffing—write for distressed service business owners while establishing topical authority.

### 4. Technical Image Optimization
- Always use Next.js `<Image />` component with `width`, `height`, and explicit `alt` attributes.
- Set `priority` on above-the-fold images (e.g., Navbar logo, Hero visuals) to improve **Largest Contentful Paint (LCP)**.

### 5. Internal Linking & Anchor Text
- Link keyword-rich anchor text internally (e.g., link "HVAC Local SEO" to `/industries/hvac`).
- Ensure no orphaned pages exist—every page must be reachable from the Navbar, Footer, or Sitemap.

### 6. Breadcrumb Schema (`BreadcrumbJsonLd`)
- Include `<BreadcrumbJsonLd trail={[...]} />` on all deep pages so search engines display rich navigation paths in search snippets.

### 7. Core Web Vitals Performance
- Keep Cumulative Layout Shift (CLS) near `0` by pre-allocating image dimensions.
- Use Geist variable font for instantaneous font load times.

---

## 🏷️ Structured Data & Schema Markup (JSON-LD)

Hygroon Web implements 5 layers of Schema.org JSON-LD to dominate Google rich snippets:

| Schema Type | Location | Purpose |
| :--- | :--- | :--- |
| **`Organization`** | `src/app/layout.tsx` | Defines Hygroon brand entity, official logo, and social links. |
| **`WebSite`** | `src/app/layout.tsx` | Defines main site structure for search engines. |
| **`ProfessionalService`** | `src/app/layout.tsx` | Classifies Hygroon as a local business service agency. |
| **`OfferCatalog`** | `src/app/layout.tsx` | Indexes trade-specific service packages (HVAC, Waterproofing, Drainage, etc.). |
| **`FAQPage`** | Industry Pages | Triggers rich Google FAQ drop-down snippets in search results. |
| **`BreadcrumbList`** | `BreadcrumbJsonLd.tsx` | Renders clean breadcrumbs in search engine results pages (SERPs). |

---

## 🤖 AI Search & Generative Engine Optimization (GEO)

Modern search engines rely on LLMs and AI Search (Perplexity, ChatGPT Search, Google SearchGPT / AI Overviews). Hygroon includes native GEO files:

- **`/public/llms.txt`**: Machine-readable quick index for AI crawlers summarizing Hygroon's value proposition, key services, and top routes.
- **`/public/llms-full.txt`**: In-depth taxonomy and service specifications enabling LLMs to accurately cite Hygroon when users search for local service agency recommendations.

---

## 🛠️ How to Add New Industry Landing Pages

To add a new industry vertical (e.g., `/industries/roofing`):

1. **Create the Page Directory**:
   `src/app/industries/roofing/page.tsx`

2. **Implement Page using `IndustryPageTemplate`**:
   ```tsx
   import type { Metadata } from "next";
   import IndustryPageTemplate from "@/components/IndustryPageTemplate";
   import { HardHat } from "lucide-react";

   export const metadata: Metadata = {
     title: "Roofing Local SEO & Growth Agency | Hygroon",
     description: "Dominate Google Maps 3-Pack and capture high-intent roofing leads with Hygroon's Local SEO engine.",
     alternates: { canonical: "/industries/roofing" },
   };

   export default function RoofingIndustryPage() {
     return (
       <IndustryPageTemplate
         slug="roofing"
         breadcrumbName="Roofing"
         badgeLabel="Roofing Contractors Local SEO"
         badgeIcon={HardHat}
         heroTitle="Local SEO & Growth Systems for Roofing Contractors"
         heroBody="Put your roofing business at the top of Google Maps when storm damage or roof replacement searches spike."
         ctaTitle="Analyze Your Roofing Business Now"
         ctaBody="Get a free 60-second local search audit for your roofing company."
       />
     );
   }
   ```

3. **Register Page in Sitemap**:
   Add `{ path: '/industries/roofing', priority: 0.7, changeFrequency: 'monthly' }` to `src/app/sitemap.ts`.

4. **Verify Route & SEO**:
   Run `npm run typecheck && npm test`.

---

## 🧪 Developer Operations & Verification

Run these commands prior to committing or deploying:

```bash
# Typecheck TypeScript files
npm run typecheck

# Run SEO, Sitemap, Robots, and Smoke Test Suite
npm test

# Run Development Server
npm run dev

# Build Production Bundle
npm run build
```


// The real, live industry catalog — must mirror the INDUSTRIES array in
// apps/api/prisma/seed.ts (slug-for-slug) since that's what GET
// /industries/public actually serves and what /analyze's industry inference
// maps service text into. This list existed only as the unrelated, generic
// `INDUSTRY_GROUPS` in packages/config (roofing/solar/junk-removal/...),
// which doesn't correspond to any industry this platform actually serves —
// every card it rendered on /industries pointed at a slug with no real page
// and, except for HVAC, no real backend record either.
//
// `hasPage: true` means a dedicated /industries/<slug> landing page exists;
// keep this in sync as more are built.
export interface PublicIndustry {
  slug: string;
  name: string;
  description: string;
  hasPage: boolean;
}

export const PUBLIC_INDUSTRIES: PublicIndustry[] = [
  {
    slug: 'hvac',
    name: 'HVAC & Air Conditioning',
    description: 'Emergency-first demand: local visibility, review recency, and response speed decide who gets the call.',
    hasPage: true,
  },
  {
    slug: 'water-restoration',
    name: 'Water Damage Restoration',
    description: 'High-value emergency jobs where being first to answer usually decides who gets hired.',
    hasPage: true,
  },
  {
    slug: 'drainage',
    name: 'Drainage & Wastewater',
    description: 'Urgent, local-search-driven callouts: Maps prominence and fast dispatch are the difference-makers.',
    hasPage: true,
  },
  {
    slug: 'pest-control',
    name: 'Pest Control',
    description: 'Review strength and recurring-service follow-up drive most of the durable revenue in this trade.',
    hasPage: true,
  },
  {
    slug: 'waterproofing',
    name: 'Waterproofing',
    description: 'High-ticket, considered-purchase jobs where trust signals and a clear quote process win the contract.',
    hasPage: true,
  },
  {
    slug: 'property-maintenance',
    name: 'Property Maintenance',
    description: 'Recurring villa and facility contracts where responsiveness and account retention matter as much as new demand.',
    hasPage: true,
  },
  {
    slug: 'pool-services',
    name: 'Pool Services',
    description: 'Recurring maintenance contracts alongside one-off repair demand: retention and response speed both matter.',
    hasPage: true,
  },
  {
    slug: 'facility-services',
    name: 'Facility Services',
    description: 'B2B contract sales where credibility signals and a fast, clear proposal process win the account.',
    hasPage: true,
  },
];

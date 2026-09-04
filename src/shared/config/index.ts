export interface SupportedMarket {
  code: string;
  name: string;
  currency: string;
  currencySymbol: string;
  phonePrefix: string;
  defaultTimezone: string;
  flag: string;
  priorityIndustries: string[];
}

export const SUPPORTED_MARKETS: Record<string, SupportedMarket> = {
  US: {
    code: 'US',
    name: 'United States',
    currency: 'USD',
    currencySymbol: '$',
    phonePrefix: '+1',
    defaultTimezone: 'America/New_York',
    flag: '🇺🇸',
    priorityIndustries: ['hvac', 'foundation_repair', 'damage_restoration', 'plumbing', 'electrical', 'roofing'],
  },
  AE: {
    code: 'AE',
    name: 'United Arab Emirates',
    currency: 'AED',
    currencySymbol: 'AED',
    phonePrefix: '+971',
    defaultTimezone: 'Asia/Dubai',
    flag: '🇦🇪',
    priorityIndustries: ['hvac', 'property_maintenance', 'waterproofing', 'damage_restoration'],
  },
  OM: {
    code: 'OM',
    name: 'Oman',
    currency: 'OMR',
    currencySymbol: 'OMR',
    phonePrefix: '+968',
    defaultTimezone: 'Asia/Muscat',
    flag: '🇴🇲',
    priorityIndustries: ['hvac', 'electrical', 'plumbing', 'general_maintenance'],
  },
  KW: {
    code: 'KW',
    name: 'Kuwait',
    currency: 'KWD',
    currencySymbol: 'KWD',
    phonePrefix: '+965',
    defaultTimezone: 'Asia/Kuwait',
    flag: '🇰🇼',
    priorityIndustries: ['hvac', 'electrical', 'plumbing', 'waterproofing'],
  },
};

export interface IndustryGroup {
  name: string;
  description: string;
  industries: { id: string; name: string; slug: string }[];
}

export const INDUSTRY_GROUPS: IndustryGroup[] = [
  {
    name: 'Essential Home Services',
    description: 'High-urgency repairs and critical service response.',
    industries: [
      { id: 'hvac', name: 'HVAC & Air Conditioning', slug: 'hvac' },
      { id: 'plumbing', name: 'Plumbing & Drainage', slug: 'plumbing' },
      { id: 'electrical', name: 'Electrical & Power Systems', slug: 'electrical' },
      { id: 'damage_restoration', name: 'Water & Damage Restoration', slug: 'damage-restoration' },
      { id: 'pest_control', name: 'Pest Control Services', slug: 'pest-control' },
    ],
  },
  {
    name: 'Exterior & Structural',
    description: 'Capital investments, envelope protection, and structural integrity.',
    industries: [
      { id: 'roofing', name: 'Roofing & Cladding', slug: 'roofing' },
      { id: 'foundation_repair', name: 'Foundation Repair & Leveling', slug: 'foundation-repair' },
      { id: 'siding', name: 'Siding, Windows & Doors', slug: 'siding-windows' },
      { id: 'solar', name: 'Solar & Clean Energy', slug: 'solar' },
      { id: 'concrete', name: 'Concrete & Masonry', slug: 'concrete' },
    ],
  },
  {
    name: 'Remodeling & Renovation',
    description: 'Interior transformations and home improvement.',
    industries: [
      { id: 'kitchen_bath', name: 'Kitchen & Bathroom Remodeling', slug: 'kitchen-bath' },
      { id: 'painting', name: 'Commercial & Residential Painting', slug: 'painting' },
      { id: 'flooring', name: 'Flooring & Tile', slug: 'flooring' },
      { id: 'drywall', name: 'Drywall & Framing', slug: 'drywall' },
      { id: 'garage_adu', name: 'Garage Conversions & ADUs', slug: 'garage-adu' },
    ],
  },
  {
    name: 'Property & Outdoor',
    description: 'Grounds, pools, and facility upkeep.',
    industries: [
      { id: 'pools', name: 'Pool Construction & Service', slug: 'pools' },
      { id: 'tree_service', name: 'Tree Service & Removal', slug: 'tree-service' },
      { id: 'landscaping', name: 'Landscape Design & Maintenance', slug: 'landscaping' },
      { id: 'fences_decks', name: 'Fences & Decks', slug: 'fences-decks' },
      { id: 'junk_removal', name: 'Junk Removal & Hauling', slug: 'junk-removal' },
    ],
  },
];

export interface PublicMarket {
  id: string;
  countryCode: string;
  countryName: string;
  region: string;
  currency: string;
  currencySymbol: string;
  phoneCountryCode: string;
}

export interface PublicIndustry {
  id: string;
  code: string;
  name: string;
  slug: string;
  priority?: number;
}

/** Regional-indicator flag emoji derived from a real ISO 3166-1 alpha-2 code
 * — never a hardcoded per-country lookup table to keep in sync. */
export function flagEmoji(countryCode: string): string {
  const code = countryCode.toUpperCase();
  if (code.length !== 2) return '';
  const codePoints = [...code].map((c) => 0x1f1e6 + (c.charCodeAt(0) - 65));
  return String.fromCodePoint(...codePoints);
}

export async function fetchPublicMarkets(): Promise<PublicMarket[]> {
  const res = await fetch('/api/markets/public');
  if (!res.ok) throw new Error(`Could not load markets (${res.status})`);
  return res.json();
}

export async function fetchPublicIndustries(marketId: string): Promise<PublicIndustry[]> {
  const res = await fetch(`/api/industries/public?marketId=${encodeURIComponent(marketId)}&activeOnly=true`);
  if (!res.ok) throw new Error(`Could not load industries (${res.status})`);
  return res.json();
}

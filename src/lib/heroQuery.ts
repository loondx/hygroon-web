// A hero-search box only ever collects one free-text field (business name or
// website). This splits that single string into the two fields /analyze's
// existing wizard already has ("business name" and "Website (optional)")
// without guessing at data that isn't there.
const DOMAIN_PATTERN = /^(https?:\/\/)?(www\.)?([a-z0-9-]+\.)+[a-z]{2,}(\/.*)?$/i;

export interface ParsedBusinessQuery {
  name: string;
  domain?: string;
}

function stripToHost(raw: string): string {
  const withoutProtocol = raw.replace(/^https?:\/\//i, '').replace(/^www\./i, '');
  return withoutProtocol.split(/[/?#]/)[0];
}

/** Parses a hero-search free-text query into a business name and, if the
 * input looks like a domain/URL rather than a business name, a domain. */
export function parseBusinessQuery(raw: string): ParsedBusinessQuery {
  const trimmed = raw.trim();
  if (!trimmed) return { name: '' };

  const looksLikeDomain = !trimmed.includes(' ') && DOMAIN_PATTERN.test(trimmed);
  if (looksLikeDomain) {
    const host = stripToHost(trimmed);
    return { name: host, domain: host };
  }

  return { name: trimmed };
}

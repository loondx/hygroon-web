// Mirrors the shape-checking half of apps/api's normalizeDomain (protocol
// prefix, hostname parse, strip www, require a real dot+TLD, reject bare
// IPs) — not imported directly since that lives in a different app, but the
// same logic, kept in sync deliberately. Catches obviously-malformed input
// client-side with a field-specific error instead of letting it reach the
// crawler and fail 20+ seconds later as a generic "could not analyze."
export function isPlausibleWebsite(input: string): boolean {
  const trimmed = input.trim();
  if (!trimmed) return false;

  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  let hostname: string;
  try {
    hostname = new URL(withProtocol).hostname;
  } catch {
    return false;
  }

  const bare = hostname.replace(/^www\./i, '').toLowerCase();
  if (!bare.includes('.')) return false;
  if (/^\d+\.\d+\.\d+\.\d+$/.test(bare)) return false;
  if (!/\.[a-z]{2,}$/i.test(bare)) return false;

  return true;
}

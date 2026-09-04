export interface FindingLike {
  id: string;
  title: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';
  businessImpact: string;
  recommendedAction: string;
  source?: string;
  confidence?: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface PriorityCounts {
  high: number;
  medium: number;
  low: number;
}

/** Buckets real findings into High/Medium/Low for a simple priority chart —
 * counts only, never invented numbers. CRITICAL folds into High (both are
 * "act on this"); INFO folds into Low (both are "no action needed"). */
export function countByPriority(findings: FindingLike[]): PriorityCounts {
  return findings.reduce(
    (acc, f) => {
      if (f.severity === 'CRITICAL' || f.severity === 'HIGH') acc.high += 1;
      else if (f.severity === 'MEDIUM') acc.medium += 1;
      else acc.low += 1;
      return acc;
    },
    { high: 0, medium: 0, low: 0 },
  );
}

/** A one-sentence summary templated from real finding counts — never a
 * fixed string shown regardless of what the audit actually found. */
export function buildExecutiveSummary(findings: FindingLike[]): string {
  const { high } = countByPriority(findings);
  const strengths = findings.filter((f) => f.severity === 'LOW' || f.severity === 'INFO').length;

  if (high === 0 && strengths > 0) {
    return 'Your business shows a solid foundation across the areas we reviewed, with no urgent gaps flagged in this snapshot.';
  }
  if (high === 0) {
    return 'This snapshot did not surface any urgent gaps: there may still be opportunities a fuller review would confirm.';
  }
  if (high === 1) {
    return 'Your business shows real strengths, but we found one place in the customer journey that may be costing you booked jobs.';
  }
  return 'Your business shows real strengths, but there are a few places in the customer journey where potential customers may face unnecessary friction.';
}

/** The highest-severity findings first, capped at `limit` — the "Top
 * Opportunities" the result page leads with. Ties broken by impactWeight
 * ordering already applied server-side (the array's given order). */
export function topFindings(findings: FindingLike[], limit = 3): FindingLike[] {
  const rank: Record<FindingLike['severity'], number> = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1, INFO: 0 };
  return [...findings].sort((a, b) => rank[b.severity] - rank[a.severity]).slice(0, limit);
}

export interface FixFirstTier {
  label: 'First' | 'Next' | 'Then';
  findings: FindingLike[];
}

/** Groups real findings into First/Next/Then priority tiers by severity —
 * no effort/time estimate is implied, only relative order. An empty tier is
 * omitted rather than padded with unrelated findings. */
export function buildFixFirstTiers(findings: FindingLike[]): FixFirstTier[] {
  const first = findings.filter((f) => f.severity === 'CRITICAL' || f.severity === 'HIGH');
  const next = findings.filter((f) => f.severity === 'MEDIUM');
  const then = findings.filter((f) => f.severity === 'LOW' || f.severity === 'INFO');

  const tiers: FixFirstTier[] = [];
  if (first.length > 0) tiers.push({ label: 'First', findings: first });
  if (next.length > 0) tiers.push({ label: 'Next', findings: next });
  if (then.length > 0) tiers.push({ label: 'Then', findings: then });
  return tiers;
}

const SOURCE_LABELS: Record<string, string> = {
  'website-audit': 'Website',
  'local-audit': 'Local Search',
  'competitor-audit': 'Competitor Comparison',
  'seo-audit': 'SEO',
};

/** A real `AuditFinding.source` value (e.g. 'website-audit') formatted for
 * display — falls back to a title-cased version of the raw value for a
 * source not yet in the label map, rather than hiding it. */
export function formatFindingSource(source: string | undefined): string {
  if (!source) return 'Audit';
  if (SOURCE_LABELS[source]) return SOURCE_LABELS[source];
  return source
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

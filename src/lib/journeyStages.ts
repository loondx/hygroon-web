export type StageStatus = 'Strong' | 'Opportunity' | 'Needs Review' | 'Needs Confirmation';

export interface JourneyFindingLike {
  type: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';
  title: string;
  businessImpact: string;
}

export interface JourneyStage {
  key: 'discovery' | 'contact' | 'response' | 'booking';
  label: string;
  status: StageStatus;
  finding: { title: string; businessImpact: string } | null;
  /** false when the audit engine doesn't evaluate this stage at all today
   * (see rule types below) — status is always 'Needs Confirmation' then,
   * never guessed from an unrelated finding. */
  measured: boolean;
}

const SEVERITY_RANK: Record<JourneyFindingLike['severity'], number> = {
  CRITICAL: 4,
  HIGH: 3,
  MEDIUM: 2,
  LOW: 1,
  INFO: 0,
};

// Maps the audit engine's real rule `type` values (see
// apps/api/src/modules/audit/rules/*.ts) to the two customer-facing stages
// it actually evaluates. The engine has no rule category for response speed
// or booking/appointment flow today — those two stages are intentionally
// never inferred from unrelated findings, only ever reported as
// 'Needs Confirmation' (measured: false).
const STAGE_TYPES: Record<'discovery' | 'contact', readonly string[]> = {
  discovery: ['LOCAL', 'SEO', 'COMPETITIVE', 'CONTENT', 'TRUST'],
  contact: ['CONVERSION', 'TRACKING', 'PERFORMANCE', 'AI_READINESS'],
};

function statusForSeverity(severity: JourneyFindingLike['severity']): StageStatus {
  if (severity === 'CRITICAL' || severity === 'HIGH') return 'Opportunity';
  if (severity === 'MEDIUM') return 'Needs Review';
  return 'Strong';
}

function worstFinding(findings: JourneyFindingLike[], types: readonly string[]): JourneyFindingLike | null {
  const matches = findings.filter((f) => types.includes(f.type));
  if (matches.length === 0) return null;
  return matches.reduce((worst, f) => (SEVERITY_RANK[f.severity] > SEVERITY_RANK[worst.severity] ? f : worst));
}

export function classifyJourneyStages(findings: JourneyFindingLike[]): JourneyStage[] {
  const discoveryWorst = worstFinding(findings, STAGE_TYPES.discovery);
  const contactWorst = worstFinding(findings, STAGE_TYPES.contact);

  return [
    {
      key: 'discovery',
      label: 'Discovery',
      measured: true,
      status: discoveryWorst ? statusForSeverity(discoveryWorst.severity) : 'Strong',
      finding: discoveryWorst ? { title: discoveryWorst.title, businessImpact: discoveryWorst.businessImpact } : null,
    },
    {
      key: 'contact',
      label: 'Contact',
      measured: true,
      status: contactWorst ? statusForSeverity(contactWorst.severity) : 'Strong',
      finding: contactWorst ? { title: contactWorst.title, businessImpact: contactWorst.businessImpact } : null,
    },
    { key: 'response', label: 'Response', measured: false, status: 'Needs Confirmation', finding: null },
    { key: 'booking', label: 'Booking', measured: false, status: 'Needs Confirmation', finding: null },
  ];
}

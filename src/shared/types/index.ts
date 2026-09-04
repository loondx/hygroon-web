export interface CompetitorSnapshotItem {
  id: string;
  name: string;
  domain?: string;
  distanceKm: number;
  rating: number;
  reviewCount: number;
  strengthScore: number;
  visibleAdvantage: string;
  visibleGap: string;
}

export interface DiagnosticResult {
  businessName: string;
  domain: string;
  location: string;
  marketCode: string;
  competitors: CompetitorSnapshotItem[];
  strongestAdvantage: string;
  biggestOpportunity: string;
  radarScore: number;
  findings: {
    title: string;
    description: string;
    impact: 'HIGH' | 'MEDIUM' | 'LOW';
  }[];
}

export interface LeadCapturePayload {
  businessName: string;
  domain: string;
  marketCode: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  roleTitle?: string;
}

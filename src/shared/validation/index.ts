import { z } from 'zod';

export const analyzeRequestSchema = z.object({
  marketCode: z.string().min(2).max(4),
  industryId: z.string().min(2),
  businessName: z.string().min(2, 'Business name is required'),
  domain: z.string().optional(),
  city: z.string().min(2, 'City/area is required'),
});

export type AnalyzeRequestDto = z.infer<typeof analyzeRequestSchema>;

export const leadCaptureSchema = z.object({
  businessName: z.string().min(2),
  domain: z.string().optional(),
  marketCode: z.string().min(2).max(4),
  contactName: z.string().min(2, 'Name is required'),
  contactEmail: z.string().email('Valid business email required'),
  contactPhone: z.string().optional(),
  roleTitle: z.string().optional(),
});

export type LeadCaptureDto = z.infer<typeof leadCaptureSchema>;

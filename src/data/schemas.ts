import { z } from "zod";

export const severitySchema = z.enum(["Critical", "High", "Medium", "Low"]);
export type Severity = z.infer<typeof severitySchema>;

export const findingStatusSchema = z.enum(["Open", "In Remediation", "Remediated", "Closed", "Accepted Risk"]);
export const retestResultSchema = z.enum(["Pass", "Partial", "Fail", "Not Retested"]);
export const confidenceSchema = z.enum(["Confirmed", "High", "Moderate"]);

export const assetSchema = z.object({
  id: z.string().regex(/^[A-Z]+-\d{2}$/),
  name: z.string().min(3),
  zone: z.enum(["Internet-Facing", "Application", "Identity", "Internal"]),
  assetType: z.string(),
  exposure: z.enum(["Public", "Restricted", "Internal"]),
  serviceCategory: z.string(),
  technologyFamily: z.string(),
  owner: z.string(),
  authBoundary: z.string(),
  hostname: z.string(),
  network: z.string(),
  lastReview: z.string(),
  riskNotes: z.string(),
});
export type Asset = z.infer<typeof assetSchema>;

export const findingSchema = z.object({
  id: z.string().regex(/^EH-\d{3}$/),
  title: z.string().min(6),
  severity: severitySchema,
  assets: z.array(z.string()).min(1),
  status: findingStatusSchema,
  confidence: confidenceSchema,
  evidence: z.string().min(20),
  businessImpact: z.string().min(20),
  remediation: z.string().min(20),
  retest: retestResultSchema,
  cwe: z.string().nullable(),
  owasp: z.string().nullable(),
  attack: z.string().nullable(),
  nistCsf: z.string(),
});
export type Finding = z.infer<typeof findingSchema>;

export const attackPathSchema = z.object({
  id: z.string().regex(/^AP-\d{2}$/),
  name: z.string(),
  summary: z.string(),
  residualRisk: severitySchema,
  businessImpact: z.string(),
  prerequisites: z.array(z.string()).min(1),
  findings: z.array(z.string()).min(2),
  steps: z
    .array(
      z.object({
        zone: z.string(),
        action: z.string(),
        boundary: z.string(),
      }),
    )
    .min(3),
  detection: z.array(z.string()).min(1),
  breakpoints: z.array(z.string()).min(1),
});
export type AttackPath = z.infer<typeof attackPathSchema>;

export const remediationItemSchema = z.object({
  findingId: z.string(),
  owner: z.string(),
  targetDate: z.string(),
  priority: z.enum(["P1", "P2", "P3"]),
  status: z.enum(["Planned", "In Progress", "Evidence Review", "Retested", "Closed"]),
  compensatingControl: z.string(),
  retest: retestResultSchema,
  before: z.string(),
  after: z.string(),
});
export type RemediationItem = z.infer<typeof remediationItemSchema>;

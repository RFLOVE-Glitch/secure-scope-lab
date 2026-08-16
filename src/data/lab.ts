import {
  assetSchema,
  attackPathSchema,
  findingSchema,
  remediationItemSchema,
  type Asset,
  type AttackPath,
  type Finding,
  type RemediationItem,
  type Severity,
} from "./schemas";

export const AUTHOR = "Rachel Love";

export const engagement = {
  name: "Project Nightwatch",
  client: "Synthetic Mid-Market SaaS Organization",
  type: "External + web application + identity review",
  window: "Illustrative only — no real testing window exists",
  methodologyBasis: "OWASP WSTG concepts, NIST CSF 2.0 functions, and attack-path reasoning",
  reportVersion: "v1.0 (portfolio demonstration)",
} as const;

export const roe = {
  authorizedAssets: [
    "portal.lab.invalid — synthetic customer portal (WEB-01)",
    "api.lab.invalid — synthetic public API gateway (API-01)",
    "id.lab.invalid — synthetic identity service (IAM-01)",
    "198.51.100.0/24 — documentation range representing the lab perimeter",
    "10.20.0.0/16 — synthetic internal lab range (authenticated review only)",
  ],
  excludedAssets: [
    "Any real production system, domain, or IP address",
    "Third-party SaaS, payment processors, and hosting provider control planes",
    "Employee endpoints, personal accounts, and physical facilities",
    "Any asset not explicitly listed in the authorized scope table",
  ],
  allowedTechniques: [
    "Passive attack-surface inventory of synthetic lab assets",
    "Authenticated and unauthenticated review of lab application workflows",
    "Configuration and access-control review against documented expectations",
    "Non-destructive validation sufficient to confirm a finding exists",
    "Attack-path modelling and trust-boundary analysis on paper",
  ],
  prohibitedActions: [
    "Denial-of-service or availability-degrading testing",
    "Destructive testing, data deletion, or modification of records",
    "Persistence, implants, backdoors, or malware of any kind",
    "Real credential harvesting, phishing of real people, or social engineering",
    "Targeting third parties, shared infrastructure, or out-of-scope assets",
    "Exfiltration of data beyond the minimum needed to evidence a finding",
  ],
  evidenceHandling: [
    "Evidence is described in narrative form; no live payloads are published.",
    "Synthetic screenshots and logs are redacted by default.",
    "Evidence is stored in an access-controlled engagement workspace.",
    "Evidence is retained only for the reporting and retest period, then destroyed.",
  ],
  stopConditions: [
    "Indication that an out-of-scope or third-party system is affected",
    "Discovery of apparent real personal data in a lab environment",
    "Unexpected service instability or availability impact",
    "Evidence of a pre-existing compromise",
  ],
  escalation: [
    "Tester pauses activity and records the time and last action taken.",
    "Immediate notification to the engagement lead and client security contact.",
    "Joint decision recorded in writing before any activity resumes.",
  ],
} as const;

export const assets: Asset[] = [
  {
    id: "WEB-01",
    name: "Customer portal",
    zone: "Internet-Facing",
    assetType: "Web application",
    exposure: "Public",
    serviceCategory: "Customer self-service",
    technologyFamily: "SPA + managed edge/CDN",
    owner: "Platform Engineering (synthetic)",
    authBoundary: "Session cookie + MFA on sensitive actions",
    hostname: "portal.lab.invalid",
    network: "198.51.100.11",
    lastReview: "2026-03-04",
    riskNotes: "Primary tenant-facing entry point; carries several moderate configuration findings.",
  },
  {
    id: "API-01",
    name: "Public API gateway",
    zone: "Internet-Facing",
    assetType: "API gateway",
    exposure: "Public",
    serviceCategory: "Partner + client integration",
    technologyFamily: "Managed gateway + token authorizer",
    owner: "API Platform (synthetic)",
    authBoundary: "Bearer token, per-tenant scope claims",
    hostname: "api.lab.invalid",
    network: "198.51.100.12",
    lastReview: "2026-03-04",
    riskNotes: "Rate-limit control missing on a lab endpoint; verbose error surface.",
  },
  {
    id: "IAM-01",
    name: "Identity service",
    zone: "Identity",
    assetType: "Identity provider",
    exposure: "Restricted",
    serviceCategory: "Authentication and role assignment",
    technologyFamily: "OIDC provider + role directory",
    owner: "Identity Engineering (synthetic)",
    authBoundary: "Admin plane restricted to privileged group",
    hostname: "id.lab.invalid",
    network: "198.51.100.20",
    lastReview: "2026-02-27",
    riskNotes: "Test roles carry broader permissions than their documented intent.",
  },
  {
    id: "VPN-01",
    name: "Remote access gateway",
    zone: "Internet-Facing",
    assetType: "Remote access",
    exposure: "Public",
    serviceCategory: "Employee remote connectivity",
    technologyFamily: "TLS VPN appliance (lab image)",
    owner: "Infrastructure (synthetic)",
    authBoundary: "MFA required; split-tunnel disabled",
    hostname: "vpn.lab.invalid",
    network: "198.51.100.30",
    lastReview: "2026-02-18",
    riskNotes: "Banner discloses build/version detail; session timeout longer than policy.",
  },
  {
    id: "DB-01",
    name: "Internal data tier",
    zone: "Internal",
    assetType: "Database cluster",
    exposure: "Internal",
    serviceCategory: "Tenant data storage",
    technologyFamily: "Managed relational cluster (lab)",
    owner: "Data Platform (synthetic)",
    authBoundary: "Service accounts only; no direct human access",
    hostname: "db01.internal.lab.invalid",
    network: "10.20.30.10",
    lastReview: "2026-03-01",
    riskNotes: "Network path from application subnet is broader than the documented design.",
  },
  {
    id: "ADMIN-01",
    name: "Administrative console",
    zone: "Application",
    assetType: "Internal web console",
    exposure: "Restricted",
    serviceCategory: "Tenant administration",
    technologyFamily: "Server-rendered admin app (lab)",
    owner: "Platform Engineering (synthetic)",
    authBoundary: "Privileged role + network allow-list (partially enforced)",
    hostname: "admin.lab.invalid",
    network: "10.20.10.25",
    lastReview: "2026-03-05",
    riskNotes: "Authorization is enforced in the UI layer more consistently than server-side.",
  },
  {
    id: "APP-02",
    name: "Reporting service",
    zone: "Application",
    assetType: "Internal service",
    exposure: "Internal",
    serviceCategory: "Analytics and export",
    technologyFamily: "Container workload (lab)",
    owner: "Data Platform (synthetic)",
    authBoundary: "Service-to-service token",
    hostname: "reports.internal.lab.invalid",
    network: "10.20.20.14",
    lastReview: "2026-02-21",
    riskNotes: "Generates exports containing synthetic tenant records.",
  },
  {
    id: "SVC-03",
    name: "Batch integration worker",
    zone: "Internal",
    assetType: "Service account workload",
    exposure: "Internal",
    serviceCategory: "Scheduled integration",
    technologyFamily: "Job runner (lab)",
    owner: "Integration Team (synthetic)",
    authBoundary: "Long-lived service credential",
    hostname: "svc03.internal.lab.invalid",
    network: "10.20.40.9",
    lastReview: "2026-01-30",
    riskNotes: "A stale synthetic service account remains enabled after project retirement.",
  },
];

export const findings: Finding[] = [
  {
    id: "EH-001",
    title: "Broken access control in synthetic admin workflow",
    severity: "Critical",
    assets: ["ADMIN-01", "WEB-01"],
    status: "Remediated",
    confidence: "Confirmed",
    evidence:
      "A lower-privileged lab account was able to reach a tenant-administration workflow whose authorization was enforced primarily in the interface layer. Validation was limited to confirming the server accepted the request context; no tenant data was altered.",
    businessImpact:
      "Allows a standard lab user to perform administrative actions across tenant boundaries, undermining the primary trust boundary of the platform.",
    remediation:
      "Enforce authorization server-side on every administrative operation, deny by default, and add automated tests asserting role checks per endpoint.",
    retest: "Pass",
    cwe: "CWE-284",
    owasp: "A01:2021 Broken Access Control",
    attack: "T1078 Valid Accounts (conceptual)",
    nistCsf: "PR.AA — Identity Management, Authentication and Access Control",
  },
  {
    id: "EH-002",
    title: "Overly broad permissions assigned to synthetic test role",
    severity: "High",
    assets: ["IAM-01"],
    status: "Remediated",
    confidence: "Confirmed",
    evidence:
      "Role definitions exported from the lab identity service show a test role inheriting administrative entitlements that its documented purpose does not require.",
    businessImpact:
      "Any account holding the test role gains far more capability than intended, widening the blast radius of a single account compromise.",
    remediation:
      "Rebuild the role from least-privilege requirements, separate test roles from production role hierarchies, and review entitlements quarterly.",
    retest: "Pass",
    cwe: "CWE-269",
    owasp: "A01:2021 Broken Access Control",
    attack: "T1098 Account Manipulation (conceptual)",
    nistCsf: "PR.AA — Access permissions managed with least privilege",
  },
  {
    id: "EH-003",
    title: "Overly permissive network path between synthetic application and data tiers",
    severity: "High",
    assets: ["APP-02", "DB-01"],
    status: "In Remediation",
    confidence: "Confirmed",
    evidence:
      "Lab network policy review shows the application subnet can reach the data tier on a broader port range than the documented design requires.",
    businessImpact:
      "Reduces containment: a foothold in any application workload reaches the data tier directly rather than through a controlled service interface.",
    remediation:
      "Tighten segmentation to the required service port, move to identity-based service authorization, and alert on unexpected tier-to-tier connections.",
    retest: "Not Retested",
    cwe: "CWE-923",
    owasp: "A05:2021 Security Misconfiguration",
    attack: "T1210 Exploitation of Remote Services (conceptual)",
    nistCsf: "PR.IR — Network segmentation and resilience",
  },
  {
    id: "EH-004",
    title: "Insecure test upload validation on lab endpoint",
    severity: "High",
    assets: ["WEB-01"],
    status: "Remediated",
    confidence: "Confirmed",
    evidence:
      "The lab upload workflow relied on client-supplied content type rather than server-side validation. A benign synthetic file was accepted under a mismatched declared type; no content was executed or retrieved.",
    businessImpact:
      "Weak content validation increases the likelihood of unsafe file handling downstream and of storage being used as an untrusted content channel.",
    remediation:
      "Validate content server-side, restrict accepted types by allow-list, store uploads outside the application root, and serve with non-executable content headers.",
    retest: "Pass",
    cwe: "CWE-434",
    owasp: "A04:2021 Insecure Design",
    attack: null,
    nistCsf: "PR.PS — Platform security and secure development practices",
  },
  {
    id: "EH-005",
    title: "Missing rate-limit control on lab authentication endpoint",
    severity: "Medium",
    assets: ["API-01"],
    status: "Remediated",
    confidence: "Confirmed",
    evidence:
      "Repeated well-formed requests to a lab endpoint were accepted without throttling or lockout signalling. Validation stopped at a small, non-disruptive request volume.",
    businessImpact:
      "Absent throttling, credential-guessing and enumeration attempts against lab accounts are cheap and largely invisible to defenders.",
    remediation:
      "Apply per-identity and per-source rate limits, progressive delays, and alerting on abnormal authentication failure rates.",
    retest: "Pass",
    cwe: "CWE-307",
    owasp: "A07:2021 Identification and Authentication Failures",
    attack: "T1110 Brute Force (conceptual)",
    nistCsf: "DE.CM — Continuous monitoring of authentication activity",
  },
  {
    id: "EH-006",
    title: "Weak session timeout policy on synthetic portal",
    severity: "Medium",
    assets: ["WEB-01", "VPN-01"],
    status: "Remediated",
    confidence: "Confirmed",
    evidence:
      "Session lifetime in the lab configuration substantially exceeds the documented standard, and idle sessions were observed remaining valid well past the expected window.",
    businessImpact:
      "Long-lived sessions extend the useful window of a stolen session and weaken assurance that an active session reflects a present, authorized user.",
    remediation:
      "Reduce idle and absolute session lifetimes to policy, re-authenticate before sensitive actions, and invalidate sessions on role change.",
    retest: "Pass",
    cwe: "CWE-613",
    owasp: "A07:2021 Identification and Authentication Failures",
    attack: null,
    nistCsf: "PR.AA — Authentication lifecycle management",
  },
  {
    id: "EH-007",
    title: "Insecure default security headers on lab web tier",
    severity: "Medium",
    assets: ["WEB-01"],
    status: "Remediated",
    confidence: "Confirmed",
    evidence:
      "Response headers on the lab portal omit content security policy, frame protections, and strict transport enforcement expected by the internal baseline.",
    businessImpact:
      "Removes defence-in-depth that limits the impact of client-side flaws and downgrade attempts against the portal.",
    remediation:
      "Deploy a baseline header set at the edge, start CSP in report-only mode, and monitor for regressions in the deployment pipeline.",
    retest: "Pass",
    cwe: "CWE-693",
    owasp: "A05:2021 Security Misconfiguration",
    attack: null,
    nistCsf: "PR.PS — Secure configuration baselines",
  },
  {
    id: "EH-008",
    title: "Secrets represented in a synthetic configuration example",
    severity: "Medium",
    assets: ["APP-02"],
    status: "Remediated",
    confidence: "Confirmed",
    evidence:
      "A lab configuration sample contains placeholder credential material committed alongside application code, indicating a workflow where real secrets could follow the same path.",
    businessImpact:
      "Normalises storing credentials in source control, which historically leads to long-lived, widely readable secrets.",
    remediation:
      "Move all secret material to a managed secret store, add pre-commit and pipeline secret scanning, and rotate anything previously committed.",
    retest: "Pass",
    cwe: "CWE-798",
    owasp: "A05:2021 Security Misconfiguration",
    attack: "T1552 Unsecured Credentials (conceptual)",
    nistCsf: "PR.DS — Data-in-use and credential protection",
  },
  {
    id: "EH-009",
    title: "Stale synthetic service account remains enabled",
    severity: "Medium",
    assets: ["SVC-03", "IAM-01"],
    status: "In Remediation",
    confidence: "High",
    evidence:
      "Identity review shows a lab service account tied to a retired integration that is still enabled, with credentials older than the documented rotation interval.",
    businessImpact:
      "Unowned, unmonitored credentials are a durable access route that no team is actively watching.",
    remediation:
      "Disable the account, assign an owner to every remaining non-human identity, and enforce automated expiry and rotation.",
    retest: "Not Retested",
    cwe: "CWE-1108",
    owasp: "A01:2021 Broken Access Control",
    attack: "T1078.004 Valid Accounts: Cloud Accounts (conceptual)",
    nistCsf: "ID.AM — Inventory of non-human identities",
  },
  {
    id: "EH-010",
    title: "Exposed version and banner information on lab gateway",
    severity: "Low",
    assets: ["VPN-01", "API-01"],
    status: "Closed",
    confidence: "Confirmed",
    evidence:
      "Service responses disclose product and build identifiers that are not required by any client of the lab service.",
    businessImpact:
      "Lowers attacker research cost by confirming technology and patch level without any interaction with defenders' controls.",
    remediation:
      "Suppress version banners, standardise generic error responses, and treat banner suppression as a build-time default.",
    retest: "Pass",
    cwe: "CWE-200",
    owasp: "A05:2021 Security Misconfiguration",
    attack: "T1592 Gather Victim Host Information (conceptual)",
    nistCsf: "PR.PS — Configuration hardening",
  },
  {
    id: "EH-011",
    title: "Verbose error messages reveal internal structure on lab API",
    severity: "Low",
    assets: ["API-01"],
    status: "Remediated",
    confidence: "Confirmed",
    evidence:
      "Malformed but benign requests returned stack context and internal identifiers rather than a generic error contract.",
    businessImpact:
      "Discloses internal structure that supports more targeted follow-on attempts and complicates log-noise triage.",
    remediation:
      "Return a stable, generic error contract to clients and keep diagnostic detail in server-side logs correlated by request ID.",
    retest: "Pass",
    cwe: "CWE-209",
    owasp: "A05:2021 Security Misconfiguration",
    attack: null,
    nistCsf: "PR.PS — Secure defaults for error handling",
  },
  {
    id: "EH-012",
    title: "Insufficient logging of privileged actions in lab admin console",
    severity: "Low",
    assets: ["ADMIN-01"],
    status: "Open",
    confidence: "Moderate",
    evidence:
      "Administrative operations in the lab console record the outcome but not the acting identity, source, or prior value, limiting reconstruction after the fact.",
    businessImpact:
      "Weak audit trails delay detection and make it difficult to prove what a privileged actor did during an incident.",
    remediation:
      "Emit structured audit events with actor, source, target, and before/after state; forward to central logging with alerting on privilege use.",
    retest: "Not Retested",
    cwe: "CWE-778",
    owasp: "A09:2021 Security Logging and Monitoring Failures",
    attack: null,
    nistCsf: "DE.AE — Adverse event analysis",
  },
];

export const attackPaths: AttackPath[] = [
  {
    id: "AP-01",
    name: "Portal exposure to synthetic tenant administration",
    summary:
      "Three individually moderate weaknesses combine so that a standard lab account reaches an administrative workflow across a tenant boundary.",
    residualRisk: "Low",
    businessImpact:
      "Cross-tenant administrative action in the lab model would represent a platform-level trust failure rather than a single-tenant issue.",
    prerequisites: [
      "A valid low-privilege lab account on the synthetic portal",
      "Knowledge of the administrative workflow route (obtainable from client-side code)",
      "No server-side authorization assertion on the target operation",
    ],
    findings: ["EH-006", "EH-001", "EH-002"],
    steps: [
      {
        zone: "Internet-Facing",
        action: "Standard lab account authenticates to the synthetic portal (WEB-01).",
        boundary: "Public → authenticated session",
      },
      {
        zone: "Application",
        action: "Long-lived session remains valid well beyond policy, extending opportunity window.",
        boundary: "Session assurance weakened",
      },
      {
        zone: "Application",
        action: "Administrative workflow accepts the request because authorization is UI-enforced.",
        boundary: "User → administrative capability",
      },
      {
        zone: "Identity",
        action: "Broad test-role entitlement means the accepted action carries wide effect.",
        boundary: "Tenant → cross-tenant effect",
      },
    ],
    detection: [
      "Alert on administrative endpoint access by non-privileged roles",
      "Anomaly detection on session age at the time of a sensitive action",
      "Audit review of role-to-entitlement drift in the identity service",
    ],
    breakpoints: [
      "Server-side deny-by-default authorization on every admin operation (EH-001)",
      "Least-privilege rebuild of the test role (EH-002)",
      "Idle/absolute session limits plus step-up re-authentication (EH-006)",
    ],
  },
  {
    id: "AP-02",
    name: "API abuse to synthetic account enumeration",
    summary:
      "Missing throttling plus verbose errors and banner disclosure make low-cost guessing against lab accounts practical and quiet.",
    residualRisk: "Low",
    businessImpact:
      "Reliable enumeration of valid lab identities is the entry condition for most account-takeover scenarios and inflates downstream fraud risk.",
    prerequisites: [
      "Unauthenticated network reachability to the lab API gateway",
      "Distinguishable responses between valid and invalid identifiers",
      "No throttling or alerting on repeated failures",
    ],
    findings: ["EH-010", "EH-011", "EH-005"],
    steps: [
      {
        zone: "Internet-Facing",
        action: "Banner and version disclosure confirms the lab gateway technology (API-01).",
        boundary: "Reconnaissance",
      },
      {
        zone: "Internet-Facing",
        action: "Verbose error contract distinguishes valid from invalid identifiers.",
        boundary: "Unauthenticated information disclosure",
      },
      {
        zone: "Identity",
        action: "Absent rate limiting allows sustained low-noise guessing against lab identities.",
        boundary: "Anonymous → candidate credentials",
      },
    ],
    detection: [
      "Threshold and velocity alerting on authentication failures per source and per identity",
      "Detection of uniform error-response probing patterns",
      "Monitoring for first-seen client fingerprints at high request rates",
    ],
    breakpoints: [
      "Per-identity and per-source rate limits with progressive delay (EH-005)",
      "Uniform generic error contract (EH-011)",
      "Banner suppression as a build default (EH-010)",
    ],
  },
  {
    id: "AP-03",
    name: "Retired integration identity to internal data tier",
    summary:
      "A forgotten service account combined with broader-than-designed segmentation shortens the route from a workload foothold to tenant data.",
    residualRisk: "Medium",
    businessImpact:
      "Access to the synthetic data tier through an unowned identity would be both high impact and slow to detect, since no team monitors the account.",
    prerequisites: [
      "A stale, enabled lab service account with unrotated credentials",
      "Application subnet reachability to the data tier beyond the documented port",
      "Audit coverage that does not attribute privileged actions to an actor",
    ],
    findings: ["EH-009", "EH-003", "EH-012"],
    steps: [
      {
        zone: "Internal",
        action: "Retired integration worker (SVC-03) retains an enabled identity with old credentials.",
        boundary: "Unowned non-human identity",
      },
      {
        zone: "Application",
        action: "Reporting workload subnet reaches the data tier on a broader range than designed.",
        boundary: "Application tier → data tier",
      },
      {
        zone: "Internal",
        action: "Synthetic tenant records in DB-01 become reachable with weak attribution in logs.",
        boundary: "Service access → sensitive data",
      },
    ],
    detection: [
      "Alert on authentication by identities with no recent legitimate usage",
      "Flow logging with alerts on unexpected tier-to-tier ports",
      "Audit events that record actor, source, and before/after state",
    ],
    breakpoints: [
      "Disable and own every non-human identity, with enforced expiry (EH-009)",
      "Tighten segmentation to required service ports (EH-003)",
      "Structured privileged-action audit logging (EH-012)",
    ],
  },
];

export const remediationBoard: RemediationItem[] = [
  {
    findingId: "EH-001",
    owner: "Platform Engineering (synthetic)",
    targetDate: "2026-03-20",
    priority: "P1",
    status: "Closed",
    compensatingControl: "Temporary network allow-list on the admin console while the fix shipped",
    retest: "Pass",
    before: "Administrative operation accepted a standard-role session; checks lived in the interface layer.",
    after: "Deny-by-default server-side authorization per operation, covered by automated role tests.",
  },
  {
    findingId: "EH-002",
    owner: "Identity Engineering (synthetic)",
    targetDate: "2026-03-22",
    priority: "P1",
    status: "Closed",
    compensatingControl: "Test role restricted to a non-production tenant during rebuild",
    retest: "Pass",
    before: "Test role inherited administrative entitlements unrelated to its purpose.",
    after: "Least-privilege role rebuilt from documented requirements with quarterly attestation.",
  },
  {
    findingId: "EH-004",
    owner: "Platform Engineering (synthetic)",
    targetDate: "2026-03-27",
    priority: "P2",
    status: "Retested",
    compensatingControl: "Upload feature limited to a restricted lab tenant",
    retest: "Pass",
    before: "Server trusted client-declared content type for lab uploads.",
    after: "Server-side allow-list validation, isolated storage, non-executable content headers.",
  },
  {
    findingId: "EH-005",
    owner: "API Platform (synthetic)",
    targetDate: "2026-03-30",
    priority: "P2",
    status: "Closed",
    compensatingControl: "Edge throttle applied ahead of the application-level control",
    retest: "Pass",
    before: "No throttling or lockout signalling on the lab authentication endpoint.",
    after: "Per-identity and per-source limits with progressive delay and failure-rate alerting.",
  },
  {
    findingId: "EH-006",
    owner: "Platform Engineering (synthetic)",
    targetDate: "2026-04-02",
    priority: "P2",
    status: "Closed",
    compensatingControl: "Step-up authentication required for sensitive lab actions",
    retest: "Pass",
    before: "Idle sessions persisted far beyond the documented standard.",
    after: "Idle and absolute lifetimes aligned to policy; sessions invalidated on role change.",
  },
  {
    findingId: "EH-007",
    owner: "Platform Engineering (synthetic)",
    targetDate: "2026-04-05",
    priority: "P3",
    status: "Closed",
    compensatingControl: "Edge-level frame and transport protections while CSP was tuned",
    retest: "Pass",
    before: "Baseline security headers absent from lab portal responses.",
    after: "Baseline header set deployed at the edge with CSP in report-only, monitored for regression.",
  },
  {
    findingId: "EH-008",
    owner: "Data Platform (synthetic)",
    targetDate: "2026-04-08",
    priority: "P2",
    status: "Evidence Review",
    compensatingControl: "Repository access narrowed while secret scanning is rolled out",
    retest: "Pass",
    before: "Placeholder credential material stored beside application code.",
    after: "Secrets moved to a managed store; pre-commit and pipeline scanning enabled.",
  },
  {
    findingId: "EH-003",
    owner: "Infrastructure (synthetic)",
    targetDate: "2026-04-17",
    priority: "P2",
    status: "In Progress",
    compensatingControl: "Flow logging with alerting on unexpected tier-to-tier connections",
    retest: "Not Retested",
    before: "Application subnet reaches the data tier on a broad port range.",
    after: "Target state: single required service port with identity-based service authorization.",
  },
  {
    findingId: "EH-009",
    owner: "Integration Team (synthetic)",
    targetDate: "2026-04-21",
    priority: "P2",
    status: "In Progress",
    compensatingControl: "Conditional access restricting the account to a known source range",
    retest: "Not Retested",
    before: "Retired integration service account remains enabled with unrotated credentials.",
    after: "Target state: account disabled, ownership assigned, automated expiry enforced.",
  },
  {
    findingId: "EH-012",
    owner: "Platform Engineering (synthetic)",
    targetDate: "2026-04-30",
    priority: "P3",
    status: "Planned",
    compensatingControl: "Manual weekly review of administrative changes",
    retest: "Not Retested",
    before: "Privileged actions logged without actor, source, or prior value.",
    after: "Target state: structured audit events forwarded to central logging with alerting.",
  },
];

export const methodologySteps = [
  {
    step: "01",
    title: "Authorization & scope",
    detail:
      "Confirm written authorization, agree rules of engagement, define in-scope assets, stop conditions, and the escalation path before any activity.",
  },
  {
    step: "02",
    title: "Asset discovery",
    detail: "Build an inventory of synthetic assets, owners, exposure, and authentication boundaries.",
  },
  {
    step: "03",
    title: "Attack-surface analysis",
    detail: "Group assets by trust zone and identify where the meaningful boundary transitions actually are.",
  },
  {
    step: "04",
    title: "Validation",
    detail:
      "Confirm each candidate weakness with the minimum non-destructive interaction needed, and record confidence honestly.",
  },
  {
    step: "05",
    title: "Attack-path analysis",
    detail: "Chain moderate findings to show where combined risk exceeds the sum of individual severities.",
  },
  {
    step: "06",
    title: "Risk rating",
    detail: "Rate on business impact and realistic exploitability, not scanner output.",
  },
  {
    step: "07",
    title: "Remediation guidance",
    detail: "Give owners specific, testable fixes plus compensating controls for the interim.",
  },
  {
    step: "08",
    title: "Retest",
    detail: "Re-validate against evidence. A change alone is not closure; the retest result decides.",
  },
  {
    step: "09",
    title: "Executive reporting",
    detail: "Communicate risk, decisions, and residual exposure in language leadership can act on.",
  },
] as const;

export const frameworkNote =
  "These mappings demonstrate security-analysis reasoning on synthetic data. They are not a certification, a compliance attestation, or a formal assessment of any organization.";

export const portfolioMeta = {
  title: "Ethical Hacking & Attack Surface Validation Lab",
  summary:
    "An interactive portfolio lab modelling an authorization-first security assessment end to end: scope and rules of engagement, attack-surface inventory, validated findings, attack-path reasoning, remediation, retest, and executive reporting — entirely on synthetic data.",
  problem:
    "Ethical hacking is often reduced to vulnerability discovery. The harder professional work is authorization, evidence quality, business-impact framing, remediation partnership, and retest discipline.",
  role: "Sole designer, security analyst, and full-stack engineer",
  outcome:
    "A recruiter-reviewable engagement portal with 8 synthetic assets, 12 validated findings, 3 illustrative attack paths, a remediation and retest board, framework cross-references, and an export-ready final report.",
  tools: [
    "React 19",
    "TanStack Start",
    "TypeScript",
    "Tailwind CSS v4",
    "shadcn/ui",
    "Recharts",
    "Zod",
    "Vitest",
  ],
  github: "https://github.com/  — repository link placeholder",
  liveDemo: "https://rachellove.tech — live demo link placeholder",
  author: AUTHOR,
} as const;

// ---------- Derived metrics ----------

export const severityOrder: Severity[] = ["Critical", "High", "Medium", "Low"];

export function countBySeverity(items: Finding[] = findings) {
  return severityOrder.map((severity) => ({
    severity,
    count: items.filter((f) => f.severity === severity).length,
  }));
}

export function countByAssetClass(items: Finding[] = findings) {
  const zones = ["Internet-Facing", "Application", "Identity", "Internal"] as const;
  return zones.map((zone) => {
    const zoneAssetIds = assets.filter((a) => a.zone === zone).map((a) => a.id);
    return {
      zone,
      count: items.filter((f) => f.assets.some((id) => zoneAssetIds.includes(id))).length,
    };
  });
}

export function remediationStatusBreakdown() {
  const remediated = findings.filter((f) => f.status === "Remediated" || f.status === "Closed").length;
  const inProgress = findings.filter((f) => f.status === "In Remediation").length;
  const open = findings.filter((f) => f.status === "Open" || f.status === "Accepted Risk").length;
  return [
    { label: "Remediated / closed", value: remediated },
    { label: "In remediation", value: inProgress },
    { label: "Open", value: open },
  ];
}

export const riskTrend = [
  { phase: "Initial validation", critical: 1, high: 3, medium: 5, low: 3 },
  { phase: "Remediation sprint 1", critical: 0, high: 2, medium: 4, low: 2 },
  { phase: "Remediation sprint 2", critical: 0, high: 1, medium: 2, low: 1 },
  { phase: "Retest", critical: 0, high: 1, medium: 2, low: 1 },
];

export const kpis = {
  assetsInScope: 18,
  findingsValidated: findings.length,
  critical: findings.filter((f) => f.severity === "Critical").length,
  high: findings.filter((f) => f.severity === "High").length,
  medium: findings.filter((f) => f.severity === "Medium").length,
  low: findings.filter((f) => f.severity === "Low").length,
  remediated: findings.filter((f) => f.status === "Remediated" || f.status === "Closed").length,
  retestPassed: findings.filter((f) => f.retest === "Pass").length,
  openAttackPaths: 2,
};

export function getFinding(id: string) {
  return findings.find((f) => f.id === id);
}

export function getAsset(id: string) {
  return assets.find((a) => a.id === id);
}

// Runtime integrity: fail fast in dev/tests if synthetic data drifts from its schema.
export function validateLabData() {
  assets.forEach((a) => assetSchema.parse(a));
  findings.forEach((f) => findingSchema.parse(f));
  attackPaths.forEach((p) => attackPathSchema.parse(p));
  remediationBoard.forEach((r) => remediationItemSchema.parse(r));
  return true;
}

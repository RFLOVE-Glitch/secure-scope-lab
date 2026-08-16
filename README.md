# Ethical Hacking & Attack Surface Validation Lab

**Project Nightwatch** is a recruiter-facing cybersecurity portfolio project by **Rachel Love** demonstrating an authorization-first approach to ethical hacking, attack surface validation, evidence-based security assessment, remediation, and retesting.

**Author:** Rachel Love  
**Engagement codename:** Project Nightwatch *(synthetic portfolio environment)*

### Project at a glance

**8 in-scope synthetic assets** • **12 validated findings** • **3 illustrative attack paths** • **9 remediated or closed findings** • **9 passed retests**

The lab models an end-to-end security assessment lifecycle:

**Scope & Rules of Engagement → Attack Surface Inventory → Validated Findings → Attack-Path Analysis → Risk Prioritization → Remediation → Retesting → Framework Mapping → Executive Reporting**

The project emphasizes responsible testing, evidence-based conclusions, business-impact analysis, and clear communication of security risk rather than operational intrusion capability.

## Synthetic-data boundary (read first)

This is a **portfolio demonstration only**. Every organization, asset, hostname, IP range, user, credential, finding,
and attack path is synthetic or an intentionally vulnerable lab example:

- Hostnames use the reserved, non-resolvable `*.lab.invalid` namespace.
- Addresses use only the `198.51.100.0/24` documentation range and the private `10.20.0.0/16` range.
- No real system, organization, account, or third-party target was scanned, probed, exploited, or contacted.
- The app contains **no** working exploit payloads, bypass strings, weaponized commands, credential-theft
  techniques, persistence, destructive actions, or authorization-evasion instructions. Evidence is _described_, never
  operationalized — a rule enforced by an automated test.
- Framework mappings (OWASP, CWE, MITRE ATT&CK, NIST CSF 2.0) demonstrate security-analysis reasoning. They are not a
  certification, a compliance attestation, or a formal assessment of any organization.
- Real testing requires written authorization from the asset owner before any activity begins.

## Featured capabilities

| Section                               | What it demonstrates                                                                                                                                                                                |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Overview (`/`)                        | Executive KPIs, severity distribution, findings by asset class, remediation status, risk trend from initial validation to retest, methodology flow, portfolio metadata                              |
| Scope & ROE (`/scope`)                | Engagement metadata, authorized vs excluded assets, allowed techniques, prohibited actions, evidence handling, stop conditions, escalation path, authorization statement                            |
| Attack Surface (`/attack-surface`)    | 8 synthetic assets across internet-facing / application / identity / internal trust zones, with exposure, ownership, authentication boundary, last review, risk notes, and an illustrative zone map |
| Findings (`/findings`)                | 12 validated findings (EH-001–EH-012) with severity, confidence, described evidence, business impact, remediation, retest result, and CWE / OWASP / ATT&CK / NIST CSF mappings; severity filtering  |
| Attack Paths (`/attack-paths`)        | 3 illustrative paths showing how moderate findings compose, with prerequisites, trust-boundary transitions, detection opportunities, remediation breakpoints, and residual risk                     |
| Remediation & Retest (`/remediation`) | Remediation board with owners, target dates, priority, compensating controls; before/after comparisons; retest workflow; "a change is not a closure"                                                |
| Framework Mapping (`/framework`)      | Full cross-reference plus grouped OWASP / CWE / ATT&CK views and NIST CSF 2.0 function alignment                                                                                                    |
| Final Report (`/report`)              | Export-ready deliverable layout: executive summary, scope, methodology, risk summary, top findings, attack-path summary, prioritized plan, retest summary, residual risk, limitations, disclosure   |

## Architecture

```
src/
  data/
    schemas.ts        Zod schemas for assets, findings, attack paths, remediation items
    lab.ts            All synthetic engagement data + derived metrics (KPIs, distributions, trend)
    lab.test.ts       Data-integrity tests (referential integrity, synthetic-range rules, safe-evidence rule)
  components/lab/
    primitives.tsx    Severity badges, status pills, panels, section shells, empty states, responsible-testing notice
    charts.tsx        Recharts severity / asset-class / risk-trend visualizations
  routes/
    __root.tsx        Shell, nav, footer, skip link, 404 and error boundaries, head metadata
    index.tsx, scope.tsx, attack-surface.tsx, findings.tsx,
    attack-paths.tsx, remediation.tsx, framework.tsx, report.tsx
    routes.test.ts    Route smoke tests + per-route SEO metadata assertions
  styles.css          Design system: oklch tokens, severity/verified semantics, grid backdrop, panel utilities
```

Data flows one way: `src/data/lab.ts` is the single source of truth, validated by Zod, and every page derives its
tables, charts, and copy from it. There is no database, external API, authentication, or network egress — the entire
app is static and synthetic by design.

## Stack

React 19 · TanStack Start / TanStack Router · TypeScript · Tailwind CSS v4 · shadcn/ui primitives · Recharts · Zod ·
Vitest · Vite.

## Accessibility & quality

- Keyboard-accessible navigation with a skip link, visible focus rings, and `aria-pressed` filter controls.
- Semantic tables with captions and scoped headers; dark-theme contrast tuned via oklch tokens.
- Error-safe rendering: empty states for every collection and route-level error/not-found boundaries.
- 24 automated tests covering data integrity and all eight primary routes.

## Run it

```bash
bun install
bun run dev          # http://localhost:8080
bun run test         # vitest
bun run build        # production build
```

## Portfolio integration (rachellove.tech card)

- **Title:** Ethical Hacking & Attack Surface Validation Lab
- **Summary:** An interactive lab modelling an authorization-first security assessment end to end — scope and ROE,
  attack-surface inventory, validated findings, attack-path reasoning, remediation, retest, and executive reporting —
  entirely on synthetic data.
- **Problem / objective:** Ethical hacking is often reduced to vulnerability discovery; the harder professional work is
  authorization, evidence quality, business-impact framing, remediation partnership, and retest discipline.
- **Role:** Sole designer, security analyst, and full-stack engineer.
- **Outcome:** A recruiter-reviewable engagement portal with 8 synthetic assets, 12 validated findings, 3 illustrative
  attack paths, a remediation and retest board, framework cross-references, and an export-ready final report.
- **Tools:** React 19, TanStack Start, TypeScript, Tailwind CSS v4, shadcn/ui, Recharts, Zod, Vitest.
- **GitHub:** https://github.com/RFLOVE-Glitch/secure-scope-lab
- **Live demo:** _placeholder — deployed URL to be added._

import { createFileRoute } from "@tanstack/react-router";

import {
  attackPaths,
  countBySeverity,
  engagement,
  findings,
  kpis,
  methodologySteps,
  portfolioMeta,
  remediationBoard,
  roe,
} from "@/data/lab";
import {
  BulletList,
  Panel,
  ResponsibleTestingNotice,
  Section,
  SeverityBadge,
  StatusPill,
} from "@/components/lab/primitives";

const TITLE = "Final Report — Project Nightwatch (Synthetic) | Rachel Love";
const DESCRIPTION =
  "Export-ready final report layout for the synthetic Project Nightwatch assessment: executive summary, scope, methodology, risk summary, top findings, attack paths, remediation plan, retest summary, residual risk, and limitations.";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: ReportPage,
});

const LIMITATIONS = [
  "The engagement, client, assets, and findings are synthetic; no real environment was assessed.",
  "Findings reflect the state of the lab environment at a point in time and do not predict future exposure.",
  "Coverage was limited to the assets listed in the authorized scope; unlisted assets were not examined.",
  "Validation was deliberately non-destructive, so some weaknesses are recorded at Moderate confidence.",
  "Framework mappings are analytical aids, not certification, compliance, or formal assessment outcomes.",
  "Absence of a finding is not evidence of absence of a weakness.",
] as const;

function ReportPage() {
  const severity = countBySeverity();
  const top = findings.filter((f) => f.severity === "Critical" || f.severity === "High");
  const plan = [...remediationBoard].sort((a, b) => a.priority.localeCompare(b.priority));

  return (
    <>
      <header className="relative overflow-hidden border-b border-border">
        <div aria-hidden className="grid-backdrop pointer-events-none absolute inset-0 opacity-50" />
        <div aria-hidden className="hero-glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-12 md:px-8 md:py-16">
          <p className="label-eyebrow">Phase 09 · Executive reporting · Export-ready layout</p>
          <h1 className="mt-3 text-3xl font-semibold text-balance md:text-4xl">
            {engagement.name} — Security Assessment Report
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {engagement.client} · {engagement.reportVersion} · Prepared by {portfolioMeta.author}
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
            This is an on-screen, export-ready report layout demonstrating how findings are communicated to leadership.
            No real client report exists and no real organization was assessed.
          </p>
        </div>
      </header>

      <Section title="1 · Executive summary">
        <Panel>
          <p className="text-sm leading-relaxed text-foreground/90">
            An authorized, time-boxed assessment of the synthetic {engagement.client} environment validated{" "}
            {kpis.findingsValidated} findings across {kpis.assetsInScope} in-scope assets: {kpis.critical} Critical,{" "}
            {kpis.high} High, {kpis.medium} Medium, and {kpis.low} Low. The dominant theme was authorization enforced
            inconsistently between the interface and the server, compounded by identity entitlements broader than their
            documented purpose. Individually moderate configuration weaknesses combined into{" "}
            {attackPaths.length} illustrative attack paths, two of which remain open pending segmentation and
            non-human-identity work.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-foreground/90">
            {kpis.remediated} findings have been remediated or closed and {kpis.retestPassed} passed retest against
            reviewed evidence, including the single Critical access-control issue. Remaining exposure is concentrated in
            internal containment rather than internet-facing entry points, which lowers immediate likelihood while
            keeping consequence high if a foothold is ever obtained. The recommended focus is completing segmentation
            tightening, retiring unowned service identities, and restoring privileged-action audit coverage.
          </p>
        </Panel>
      </Section>

      <Section title="2 · Scope statement">
        <div className="grid gap-4 lg:grid-cols-2">
          <Panel>
            <h3 className="text-sm font-semibold text-verified">In scope (synthetic)</h3>
            <div className="mt-3">
              <BulletList items={roe.authorizedAssets} tone="verified" />
            </div>
          </Panel>
          <Panel>
            <h3 className="text-sm font-semibold text-critical">Out of scope</h3>
            <div className="mt-3">
              <BulletList items={roe.excludedAssets} tone="danger" />
            </div>
          </Panel>
        </div>
      </Section>

      <Section title="3 · Methodology">
        <ol className="grid gap-3 md:grid-cols-3">
          {methodologySteps.map((step) => (
            <li key={step.step} className="panel p-4">
              <span className="font-mono text-xs text-primary">{step.step}</span>
              <h3 className="mt-1.5 text-sm font-semibold">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="4 · Risk summary">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {severity.map((s) => (
            <Panel key={s.severity} className="p-4">
              <SeverityBadge severity={s.severity} />
              <p className="mt-3 font-display text-3xl font-semibold">{s.count}</p>
              <p className="mt-1 text-xs text-muted-foreground">validated findings</p>
            </Panel>
          ))}
        </div>
      </Section>

      <Section title="5 · Top findings" description="Critical and High severity synthetic findings.">
        <div className="space-y-3">
          {top.map((f) => (
            <Panel key={f.id} className="p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-mono text-xs text-primary">{f.id}</p>
                <div className="flex items-center gap-2">
                  <SeverityBadge severity={f.severity} />
                  <StatusPill value={`Retest: ${f.retest}`} />
                </div>
              </div>
              <h3 className="mt-1 text-sm font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.businessImpact}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                <span className="text-foreground">Recommendation: </span>
                {f.remediation}
              </p>
            </Panel>
          ))}
        </div>
      </Section>

      <Section title="6 · Attack-path summary">
        <div className="grid gap-3 lg:grid-cols-3">
          {attackPaths.map((p) => (
            <Panel key={p.id} className="p-5">
              <p className="font-mono text-xs text-primary">{p.id}</p>
              <h3 className="mt-1 text-sm font-semibold">{p.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
              <p className="mt-3 font-mono text-xs text-muted-foreground">
                {p.steps.map((s) => s.zone).join(" → ")}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Residual:</span>
                <SeverityBadge severity={p.residualRisk} />
              </div>
            </Panel>
          ))}
        </div>
      </Section>

      <Section title="7 · Prioritized remediation plan">
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[760px] text-left text-sm">
            <caption className="sr-only">Prioritized synthetic remediation plan</caption>
            <thead className="bg-surface-raised">
              <tr>
                {["Priority", "Finding", "Owner", "Target date", "Status", "Retest"].map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 font-medium whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {plan.map((item) => (
                <tr key={item.findingId} className="border-t border-border bg-surface/60">
                  <td className="px-4 py-3 font-mono text-xs">{item.priority}</td>
                  <td className="px-4 py-3 font-mono text-xs text-primary">{item.findingId}</td>
                  <td className="px-4 py-3 text-muted-foreground">{item.owner}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{item.targetDate}</td>
                  <td className="px-4 py-3"><StatusPill value={item.status} /></td>
                  <td className="px-4 py-3"><StatusPill value={item.retest} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="8 · Retest summary">
        <Panel>
          <p className="text-sm leading-relaxed text-foreground/90">
            {kpis.retestPassed} of {kpis.findingsValidated} findings passed retest against reviewed evidence, including
            EH-001 (broken access control) and EH-002 (over-permissioned test role). Three findings remain in
            remediation with compensating controls in place and no retest yet performed: EH-003 (segmentation), EH-009
            (stale service identity), and EH-012 (privileged-action logging). No finding was closed on the basis of a
            change alone.
          </p>
        </Panel>
      </Section>

      <Section title="9 · Residual risk">
        <div className="grid gap-4 lg:grid-cols-2">
          <Panel>
            <h3 className="text-sm font-semibold">Current position</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              After the retested fixes, no Critical exposure remains in the synthetic environment. Residual risk is
              rated Medium overall and is driven by internal containment: the application-to-data-tier network path is
              still broader than designed, and one unowned service identity remains enabled. Both reduce the cost of
              lateral movement after any initial foothold, and weak privileged-action auditing extends the time to
              detect it.
            </p>
          </Panel>
          <Panel>
            <h3 className="text-sm font-semibold">Recommended next steps</h3>
            <div className="mt-3">
              <BulletList
                items={[
                  "Complete segmentation tightening to the single required service port (EH-003).",
                  "Disable the retired service identity and assign owners to all non-human identities (EH-009).",
                  "Emit structured privileged-action audit events with alerting (EH-012).",
                  "Re-run attack-path AP-03 after the above and re-rate residual risk.",
                ]}
                tone="verified"
              />
            </div>
          </Panel>
        </div>
      </Section>

      <Section title="10 · Limitations and assumptions">
        <Panel>
          <BulletList items={LIMITATIONS} />
        </Panel>
      </Section>

      <Section title="11 · Responsible-testing disclosure">
        <ResponsibleTestingNotice />
      </Section>
    </>
  );
}

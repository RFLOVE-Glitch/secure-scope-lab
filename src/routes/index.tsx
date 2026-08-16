import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FileText, Radar, ShieldCheck } from "lucide-react";

import {
  countByAssetClass,
  countBySeverity,
  kpis,
  methodologySteps,
  portfolioMeta,
  remediationStatusBreakdown,
  riskTrend,
  findings,
} from "@/data/lab";
import { AssetClassChart, RiskTrendChart, SeverityChart } from "@/components/lab/charts";
import {
  Eyebrow,
  Panel,
  ResponsibleTestingNotice,
  Section,
  SeverityBadge,
  StatusPill,
} from "@/components/lab/primitives";

const TITLE = "Ethical Hacking & Attack Surface Validation Lab | Rachel Love";
const DESCRIPTION =
  "An authorization-first ethical hacking portfolio lab by Rachel Love: scope and ROE, attack-surface inventory, 12 validated synthetic findings, attack paths, remediation, retest, and executive reporting.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

const kpiCards = [
  { label: "Assets in scope", value: kpis.assetsInScope, tone: "text-foreground" },
  { label: "Findings validated", value: kpis.findingsValidated, tone: "text-foreground" },
  { label: "Critical", value: kpis.critical, tone: "text-critical" },
  { label: "High", value: kpis.high, tone: "text-high" },
  { label: "Medium", value: kpis.medium, tone: "text-medium" },
  { label: "Low", value: kpis.low, tone: "text-low" },
  { label: "Remediated", value: kpis.remediated, tone: "text-verified" },
  { label: "Retest passed", value: kpis.retestPassed, tone: "text-verified" },
  { label: "Open attack paths", value: kpis.openAttackPaths, tone: "text-high" },
];

function Index() {
  const severity = countBySeverity();
  const byClass = countByAssetClass();
  const remediation = remediationStatusBreakdown();
  const topFindings = [...findings]
    .sort((a, b) => ["Critical", "High", "Medium", "Low"].indexOf(a.severity) - ["Critical", "High", "Medium", "Low"].indexOf(b.severity))
    .slice(0, 5);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden className="grid-backdrop pointer-events-none absolute inset-0 opacity-60" />
        <div aria-hidden className="hero-glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <Eyebrow>Project Nightwatch · Portfolio demonstration · {portfolioMeta.author}</Eyebrow>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold text-balance md:text-5xl">
            Ethical Hacking &amp; Attack Surface Validation Lab
          </h1>
          <p className="mt-4 text-lg font-medium text-primary md:text-xl">
            Authorized testing. Evidence-based findings. Actionable remediation.
          </p>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
            This lab models how Rachel Love approaches an authorized security assessment from scope through retest:
            agreeing rules of engagement, inventorying the attack surface, validating each weakness with the minimum
            necessary interaction, reasoning about how moderate issues chain into real business risk, partnering on
            remediation, retesting against evidence, and reporting residual risk in language leadership can act on.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/findings"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Radar className="size-4" aria-hidden /> Review findings register
            </Link>
            <Link
              to="/report"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              <FileText className="size-4" aria-hidden /> Read final report
            </Link>
            <Link
              to="/scope"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              <ShieldCheck className="size-4" aria-hidden /> Scope &amp; rules of engagement
            </Link>
          </div>
          <div className="mt-10 max-w-3xl">
            <ResponsibleTestingNotice />
          </div>
        </div>
      </section>

      <Section
        title="Executive KPIs"
        description="Synthetic engagement metrics from the Project Nightwatch lab. Counts reflect validated findings, not raw scanner output."
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {kpiCards.map((card) => (
            <Panel key={card.label} className="p-4">
              <p className="label-eyebrow">{card.label}</p>
              <p className={`mt-2 font-display text-3xl font-semibold ${card.tone}`}>{card.value}</p>
            </Panel>
          ))}
        </div>
      </Section>

      <Section
        title="Risk analytics"
        description="Severity distribution, findings by asset class, remediation status, and the risk trend from initial validation through retest."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <Panel>
            <h3 className="text-sm font-semibold">Severity distribution</h3>
            <div className="mt-4">
              <SeverityChart data={severity} />
            </div>
          </Panel>
          <Panel>
            <h3 className="text-sm font-semibold">Findings by asset class</h3>
            <div className="mt-4">
              <AssetClassChart data={byClass} />
            </div>
          </Panel>
          <Panel>
            <h3 className="text-sm font-semibold">Remediation status</h3>
            <ul className="mt-5 space-y-4">
              {remediation.map((row) => {
                const pct = Math.round((row.value / findings.length) * 100);
                return (
                  <li key={row.label}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{row.label}</span>
                      <span className="font-mono text-xs">
                        {row.value} / {findings.length} · {pct}%
                      </span>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-verified"
                        style={{ width: `${pct}%` }}
                        role="presentation"
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </Panel>
          <Panel>
            <h3 className="text-sm font-semibold">Risk trend: initial validation → retest</h3>
            <div className="mt-4">
              <RiskTrendChart data={riskTrend} />
            </div>
          </Panel>
        </div>
      </Section>

      <Section
        title="Top validated findings"
        description="Highest-severity synthetic findings. Evidence is described in narrative form; no payloads are published."
      >
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-surface-raised">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">ID</th>
                <th scope="col" className="px-4 py-3 font-medium">Finding</th>
                <th scope="col" className="px-4 py-3 font-medium">Severity</th>
                <th scope="col" className="px-4 py-3 font-medium">Status</th>
                <th scope="col" className="px-4 py-3 font-medium">Retest</th>
              </tr>
            </thead>
            <tbody>
              {topFindings.map((f) => (
                <tr key={f.id} className="border-t border-border bg-surface/60">
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{f.id}</td>
                  <td className="px-4 py-3">{f.title}</td>
                  <td className="px-4 py-3"><SeverityBadge severity={f.severity} /></td>
                  <td className="px-4 py-3"><StatusPill value={f.status} /></td>
                  <td className="px-4 py-3"><StatusPill value={f.retest} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <Link to="/findings" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
            All 12 validated findings <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </Section>

      <Section
        title="Assessment methodology"
        description="A defensible flow from authorization through executive reporting. Each stage produces an artifact the next stage depends on."
      >
        <ol className="grid gap-3 md:grid-cols-3">
          {methodologySteps.map((step) => (
            <li key={step.step} className="panel p-5">
              <span className="font-mono text-xs text-primary">{step.step}</span>
              <h3 className="mt-2 text-sm font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        title="Background &amp; portfolio context"
        description="How this lab connects to Rachel's broader security work."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <Panel>
            <h3 className="text-sm font-semibold">Coursework and reasoning basis</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              The methodology here draws on ethical-hacking coursework, security architecture reasoning, and hands-on
              lab practice against intentionally vulnerable environments. It reflects study and self-directed lab work
              — not a professional penetration-testing certification, and not a real-world client engagement. The
              emphasis is deliberately on the parts of the discipline that outlast any single technique: authorization,
              evidence quality, impact framing, remediation partnership, and retest discipline.
            </p>
          </Panel>
          <Panel>
            <h3 className="text-sm font-semibold">Portfolio card metadata</h3>
            <dl className="mt-3 space-y-3 text-sm">
              <div>
                <dt className="label-eyebrow">Role</dt>
                <dd className="mt-1 text-muted-foreground">{portfolioMeta.role}</dd>
              </div>
              <div>
                <dt className="label-eyebrow">Objective</dt>
                <dd className="mt-1 text-muted-foreground">{portfolioMeta.problem}</dd>
              </div>
              <div>
                <dt className="label-eyebrow">Outcome</dt>
                <dd className="mt-1 text-muted-foreground">{portfolioMeta.outcome}</dd>
              </div>
              <div>
                <dt className="label-eyebrow">Tools &amp; technologies</dt>
                <dd className="mt-1 flex flex-wrap gap-1.5">
                  {portfolioMeta.tools.map((tool) => (
                    <span key={tool} className="rounded-md border border-border bg-secondary px-2 py-0.5 text-xs">
                      {tool}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="label-eyebrow">Links</dt>
                <dd className="mt-1 font-mono text-xs text-muted-foreground">
                  {portfolioMeta.github}
                  <br />
                  {portfolioMeta.liveDemo}
                </dd>
              </div>
            </dl>
          </Panel>
        </div>
      </Section>
    </>
  );
}

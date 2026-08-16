import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { countBySeverity, findings, getAsset } from "@/data/lab";
import type { Severity } from "@/data/schemas";
import { EmptyState, Panel, ResponsibleTestingNotice, Section, SeverityBadge, StatusPill } from "@/components/lab/primitives";

const TITLE = "Findings Register — 12 Validated Synthetic Findings | Nightwatch Lab";
const DESCRIPTION =
  "Twelve validated synthetic findings with severity, evidence summary, business impact, remediation guidance, retest result, and CWE / OWASP / MITRE ATT&CK / NIST CSF 2.0 mappings.";

export const Route = createFileRoute("/findings")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: FindingsPage,
});

const FILTERS = ["All", "Critical", "High", "Medium", "Low"] as const;

function FindingsPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const visible = useMemo(
    () => (filter === "All" ? findings : findings.filter((f) => f.severity === (filter as Severity))),
    [filter],
  );

  const counts = countBySeverity();

  return (
    <>
      <header className="relative overflow-hidden border-b border-border">
        <div aria-hidden className="grid-backdrop pointer-events-none absolute inset-0 opacity-50" />
        <div aria-hidden className="hero-glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-12 md:px-8 md:py-16">
          <p className="label-eyebrow">Phase 04 · Validation</p>
          <h1 className="mt-3 text-3xl font-semibold text-balance md:text-4xl">Findings Register</h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Each entry is a validated finding: confirmed to exist with the minimum non-destructive interaction
            necessary, rated on business impact rather than scanner score, and recorded with an honest confidence
            level. Evidence is described in narrative form — this register contains no payloads, bypass strings, or
            reproduction commands.
          </p>
          <dl className="mt-6 flex flex-wrap gap-4">
            {counts.map((c) => (
              <div key={c.severity} className="rounded-lg border border-border bg-surface px-4 py-2">
                <dt className="label-eyebrow">{c.severity}</dt>
                <dd className="font-display text-xl font-semibold">{c.count}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <Section title="Filter by severity" description="Twelve synthetic findings across eight lab assets.">
        <div role="group" aria-label="Filter findings by severity" className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
                filter === f
                  ? "border-primary/50 bg-primary/15 text-primary"
                  : "border-border bg-surface text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          {visible.length === 0 ? (
            <EmptyState message="No findings match this severity filter." />
          ) : (
            visible.map((f) => (
              <article key={f.id} className="panel p-5 md:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-xs text-primary">{f.id}</p>
                    <h3 className="mt-1 text-base font-semibold md:text-lg">{f.title}</h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <SeverityBadge severity={f.severity} />
                    <StatusPill value={f.status} />
                    <StatusPill value={`Retest: ${f.retest}`} />
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {f.assets.map((id) => {
                    const asset = getAsset(id);
                    return (
                      <span
                        key={id}
                        className="rounded-md border border-border bg-secondary px-2 py-0.5 font-mono text-xs"
                        title={asset ? asset.name : "Synthetic asset"}
                      >
                        {id}
                      </span>
                    );
                  })}
                  <span className="rounded-md border border-border bg-secondary px-2 py-0.5 text-xs">
                    Confidence: {f.confidence}
                  </span>
                </div>

                <div className="mt-5 grid gap-5 md:grid-cols-3">
                  <div>
                    <h4 className="label-eyebrow">Synthetic evidence summary</h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.evidence}</p>
                  </div>
                  <div>
                    <h4 className="label-eyebrow">Business impact</h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.businessImpact}</p>
                  </div>
                  <div>
                    <h4 className="label-eyebrow">Recommended remediation</h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.remediation}</p>
                  </div>
                </div>

                <dl className="mt-5 grid gap-3 border-t border-border pt-4 text-xs sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <dt className="label-eyebrow">CWE</dt>
                    <dd className="mt-1 font-mono text-muted-foreground">{f.cwe ?? "Not applicable"}</dd>
                  </div>
                  <div>
                    <dt className="label-eyebrow">OWASP Top 10</dt>
                    <dd className="mt-1 text-muted-foreground">{f.owasp ?? "Not applicable"}</dd>
                  </div>
                  <div>
                    <dt className="label-eyebrow">MITRE ATT&amp;CK</dt>
                    <dd className="mt-1 text-muted-foreground">{f.attack ?? "Not conceptually relevant"}</dd>
                  </div>
                  <div>
                    <dt className="label-eyebrow">NIST CSF 2.0</dt>
                    <dd className="mt-1 text-muted-foreground">{f.nistCsf}</dd>
                  </div>
                </dl>
              </article>
            ))
          )}
        </div>
      </Section>

      <Section title="How severity was assigned">
        <div className="grid gap-4 lg:grid-cols-2">
          <Panel>
            <h3 className="text-sm font-semibold">Rating basis</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Severity reflects realistic exploitability in the lab environment combined with business consequence if
              the weakness were abused. A weakness that is trivially reachable but low-consequence is rated below one
              that requires an authenticated foothold yet crosses a tenant boundary. Where validation could not be
              completed non-destructively, confidence is recorded as Moderate rather than inflating severity.
            </p>
          </Panel>
          <ResponsibleTestingNotice compact />
        </div>
      </Section>
    </>
  );
}

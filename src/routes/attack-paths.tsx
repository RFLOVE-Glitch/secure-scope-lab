import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

import { attackPaths, getFinding } from "@/data/lab";
import {
  BulletList,
  EmptyState,
  Panel,
  ResponsibleTestingNotice,
  Section,
  SeverityBadge,
} from "@/components/lab/primitives";

const TITLE = "Illustrative Attack Paths | Project Nightwatch Lab";
const DESCRIPTION =
  "Three illustrative synthetic attack paths showing how moderate findings chain into higher business risk, with prerequisites, trust-boundary transitions, detection opportunities, and remediation breakpoints.";

export const Route = createFileRoute("/attack-paths")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: AttackPathsPage,
});

function AttackPathsPage() {
  return (
    <>
      <header className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="grid-backdrop pointer-events-none absolute inset-0 opacity-50"
        />
        <div aria-hidden className="hero-glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-12 md:px-8 md:py-16">
          <p className="label-eyebrow">Phase 05 · Attack-path analysis</p>
          <h1 className="mt-3 text-3xl font-semibold text-balance md:text-4xl">Attack Paths</h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Severity per finding understates risk when weaknesses compose. These illustrative paths
            show how several moderate synthetic findings combine to cross a trust boundary that no
            single finding crosses alone. Each path is a narrative model — the diagrams are
            non-executable and contain no reproduction detail.
          </p>
        </div>
      </header>

      {attackPaths.length === 0 ? (
        <Section title="Attack paths">
          <EmptyState message="No attack paths modelled for this engagement." />
        </Section>
      ) : (
        attackPaths.map((path) => (
          <Section key={path.id} title={`${path.id} — ${path.name}`} description={path.summary}>
            <div className="space-y-4">
              <Panel>
                <h3 className="text-sm font-semibold">Path model</h3>
                <ol className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-stretch">
                  {path.steps.map((step, i) => (
                    <li key={step.action} className="flex flex-1 items-center gap-3">
                      <div className="flex-1 rounded-lg border border-border bg-surface-raised p-4">
                        <p className="font-mono text-[0.65rem] tracking-widest text-primary uppercase">
                          {step.zone}
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed">{step.action}</p>
                        <p className="mt-2 font-mono text-[0.65rem] text-muted-foreground">
                          ↳ {step.boundary}
                        </p>
                      </div>
                      {i < path.steps.length - 1 ? (
                        <ChevronRight
                          className="hidden size-5 shrink-0 text-muted-foreground lg:block"
                          aria-hidden
                        />
                      ) : null}
                    </li>
                  ))}
                </ol>
              </Panel>

              <div className="grid gap-4 lg:grid-cols-3">
                <Panel>
                  <h3 className="text-sm font-semibold">Prerequisites</h3>
                  <div className="mt-3">
                    <BulletList items={path.prerequisites} />
                  </div>
                </Panel>
                <Panel>
                  <h3 className="text-sm font-semibold">Contributing findings</h3>
                  <ul className="mt-3 space-y-2">
                    {path.findings.map((id) => {
                      const f = getFinding(id);
                      return (
                        <li
                          key={id}
                          className="rounded-md border border-border bg-surface-raised px-3 py-2"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-mono text-xs text-primary">{id}</span>
                            {f ? <SeverityBadge severity={f.severity} /> : null}
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {f ? f.title : "Finding not found"}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </Panel>
                <Panel>
                  <h3 className="text-sm font-semibold">Detection opportunities</h3>
                  <div className="mt-3">
                    <BulletList items={path.detection} tone="verified" />
                  </div>
                </Panel>
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                <Panel className="lg:col-span-1">
                  <h3 className="text-sm font-semibold text-high">Business impact</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {path.businessImpact}
                  </p>
                </Panel>
                <Panel>
                  <h3 className="text-sm font-semibold text-verified">Remediation breakpoints</h3>
                  <div className="mt-3">
                    <BulletList items={path.breakpoints} tone="verified" />
                  </div>
                </Panel>
                <Panel>
                  <h3 className="text-sm font-semibold">Residual risk after fixes</h3>
                  <div className="mt-3 flex items-center gap-3">
                    <SeverityBadge severity={path.residualRisk} />
                    <span className="text-sm text-muted-foreground">
                      Rated after the breakpoint controls are in place and evidence reviewed.
                    </span>
                  </div>
                </Panel>
              </div>
            </div>
          </Section>
        ))
      )}

      <Section title="Responsible testing">
        <ResponsibleTestingNotice compact />
      </Section>
    </>
  );
}

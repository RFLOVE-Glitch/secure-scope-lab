import { createFileRoute } from "@tanstack/react-router";

import { getFinding, remediationBoard } from "@/data/lab";
import {
  EmptyState,
  Panel,
  ResponsibleTestingNotice,
  Section,
  SeverityBadge,
  StatusPill,
} from "@/components/lab/primitives";

const TITLE = "Remediation & Retest Board | Project Nightwatch Lab";
const DESCRIPTION =
  "Synthetic remediation board with owners, target dates, priority, compensating controls, before/after comparisons, and retest results — closure requires evidence, not just a change.";

export const Route = createFileRoute("/remediation")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: RemediationPage,
});

const WORKFLOW = [
  { step: "Finding", detail: "Validated weakness recorded with evidence and confidence." },
  { step: "Remediation implemented", detail: "Owner ships the fix; compensating control covers the interim." },
  { step: "Evidence reviewed", detail: "Configuration, code, or policy evidence checked against the recommendation." },
  { step: "Retest", detail: "Independent re-validation using the original validation approach." },
  { step: "Pass / Partial / Fail", detail: "Result recorded honestly, including partial fixes." },
  { step: "Closure decision", detail: "Closure, risk acceptance with an owner, or return to remediation." },
] as const;

function RemediationPage() {
  const beforeAfter = remediationBoard.filter((item) => item.retest === "Pass").slice(0, 5);

  return (
    <>
      <header className="relative overflow-hidden border-b border-border">
        <div aria-hidden className="grid-backdrop pointer-events-none absolute inset-0 opacity-50" />
        <div aria-hidden className="hero-glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-12 md:px-8 md:py-16">
          <p className="label-eyebrow">Phase 07–08 · Remediation &amp; retest</p>
          <h1 className="mt-3 text-3xl font-semibold text-balance md:text-4xl">Remediation &amp; Retest</h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Findings become value only when someone owns them and the fix is proven. Every item below carries a named
            synthetic owner, a target date, a priority, and an interim compensating control where the fix takes time.
          </p>
        </div>
      </header>

      <Section title="Retest workflow" description="The sequence every finding follows before it can be closed.">
        <ol className="grid gap-3 md:grid-cols-3 lg:grid-cols-6">
          {WORKFLOW.map((w, i) => (
            <li key={w.step} className="panel p-4">
              <span className="font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-1.5 text-sm font-semibold">{w.step}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{w.detail}</p>
            </li>
          ))}
        </ol>
        <Panel className="mt-4 border-medium/35 bg-medium/8">
          <h3 className="text-sm font-semibold text-medium">A change is not a closure</h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground/85">
            A finding is not considered closed solely because a change was made. Closure requires evidence that the
            change addresses the underlying weakness, plus a retest proportionate to the risk: a Critical or High
            finding is re-validated directly against the original condition, while a Low configuration item may be
            closed on reviewed configuration evidence. Partial results stay open with the residual risk stated, and
            risk acceptance is recorded against a named owner rather than treated as a fix.
          </p>
        </Panel>
      </Section>

      <Section title="Remediation board" description="Ten tracked synthetic remediation items across four owning teams.">
        {remediationBoard.length === 0 ? (
          <EmptyState message="No remediation items tracked." />
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[1000px] text-left text-sm">
              <caption className="sr-only">Synthetic remediation and retest board</caption>
              <thead className="bg-surface-raised">
                <tr>
                  {["Finding", "Severity", "Owner", "Priority", "Target date", "Status", "Compensating control", "Retest"].map(
                    (h) => (
                      <th key={h} scope="col" className="px-4 py-3 font-medium whitespace-nowrap">
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {remediationBoard.map((item) => {
                  const f = getFinding(item.findingId);
                  return (
                    <tr key={item.findingId} className="border-t border-border bg-surface/60 align-top">
                      <td className="px-4 py-3">
                        <span className="block font-mono text-xs text-primary">{item.findingId}</span>
                        <span className="block text-xs text-muted-foreground">{f ? f.title : "—"}</span>
                      </td>
                      <td className="px-4 py-3">{f ? <SeverityBadge severity={f.severity} /> : "—"}</td>
                      <td className="px-4 py-3 text-muted-foreground">{item.owner}</td>
                      <td className="px-4 py-3 font-mono text-xs">{item.priority}</td>
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{item.targetDate}</td>
                      <td className="px-4 py-3"><StatusPill value={item.status} /></td>
                      <td className="px-4 py-3 text-muted-foreground">{item.compensatingControl}</td>
                      <td className="px-4 py-3"><StatusPill value={item.retest} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Section>

      <Section
        title="Before / after comparison"
        description="Five findings where remediation was implemented and the retest passed against reviewed evidence."
      >
        {beforeAfter.length === 0 ? (
          <EmptyState message="No retested findings available for comparison yet." />
        ) : (
          <div className="space-y-4">
            {beforeAfter.map((item) => {
              const f = getFinding(item.findingId);
              return (
                <Panel key={item.findingId}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-mono text-xs text-primary">{item.findingId}</p>
                      <h3 className="mt-1 text-sm font-semibold">{f ? f.title : "Synthetic finding"}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      {f ? <SeverityBadge severity={f.severity} /> : null}
                      <StatusPill value={`Retest: ${item.retest}`} />
                    </div>
                  </div>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg border border-critical/35 bg-critical/8 p-4">
                      <p className="label-eyebrow">Before</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">{item.before}</p>
                    </div>
                    <div className="rounded-lg border border-verified/35 bg-verified/8 p-4">
                      <p className="label-eyebrow">After</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">{item.after}</p>
                    </div>
                  </div>
                </Panel>
              );
            })}
          </div>
        )}
      </Section>

      <Section title="Responsible testing">
        <ResponsibleTestingNotice compact />
      </Section>
    </>
  );
}

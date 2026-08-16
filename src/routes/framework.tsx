import { createFileRoute } from "@tanstack/react-router";

import { findings, frameworkNote } from "@/data/lab";
import { EmptyState, Panel, Section, SeverityBadge } from "@/components/lab/primitives";

const TITLE = "Framework Mapping — OWASP, CWE, MITRE ATT&CK, NIST CSF 2.0 | Nightwatch Lab";
const DESCRIPTION =
  "Cross-reference of synthetic findings to OWASP Top 10, CWE, MITRE ATT&CK techniques, and NIST CSF 2.0 concepts — analytical mapping, not a compliance attestation.";

export const Route = createFileRoute("/framework")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: FrameworkPage,
});

function groupBy(key: "owasp" | "cwe" | "attack") {
  const map = new Map<string, typeof findings>();
  for (const f of findings) {
    const value = f[key];
    if (!value) continue;
    map.set(value, [...(map.get(value) ?? []), f]);
  }
  return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
}

const CSF_FUNCTIONS = [
  {
    fn: "GOVERN (GV)",
    note: "Rules of engagement, authorization requirements, and named remediation ownership.",
  },
  {
    fn: "IDENTIFY (ID)",
    note: "Attack-surface inventory, asset ownership, and non-human identity inventory (EH-009).",
  },
  {
    fn: "PROTECT (PR)",
    note: "Access control, least privilege, secure configuration, segmentation, and secret protection (EH-001 to EH-011).",
  },
  {
    fn: "DETECT (DE)",
    note: "Authentication-failure monitoring and privileged-action audit coverage (EH-005, EH-012).",
  },
  {
    fn: "RESPOND (RS)",
    note: "Escalation path, stop conditions, and detection opportunities recorded per attack path.",
  },
  {
    fn: "RECOVER (RC)",
    note: "Retest and closure decisions that confirm the environment returns to an assured state.",
  },
] as const;

function FrameworkPage() {
  const owasp = groupBy("owasp");
  const cwe = groupBy("cwe");
  const attack = groupBy("attack");

  return (
    <>
      <header className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="grid-backdrop pointer-events-none absolute inset-0 opacity-50"
        />
        <div aria-hidden className="hero-glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-12 md:px-8 md:py-16">
          <p className="label-eyebrow">Analysis · Cross-reference</p>
          <h1 className="mt-3 text-3xl font-semibold text-balance md:text-4xl">
            Framework Mapping
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Mapping findings to shared vocabularies makes them comparable across teams and easier to
            prioritize against existing control programs.
          </p>
          <Panel className="mt-6 max-w-3xl border-medium/35 bg-medium/8">
            <p className="text-sm leading-relaxed text-foreground/85">{frameworkNote}</p>
          </Panel>
        </div>
      </header>

      <Section
        title="Full cross-reference"
        description="Every validated synthetic finding with its mappings."
      >
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[980px] text-left text-sm">
            <caption className="sr-only">
              Findings mapped to OWASP, CWE, MITRE ATT&amp;CK, and NIST CSF 2.0
            </caption>
            <thead className="bg-surface-raised">
              <tr>
                {[
                  "ID",
                  "Severity",
                  "Finding",
                  "OWASP Top 10",
                  "CWE",
                  "MITRE ATT&CK",
                  "NIST CSF 2.0",
                ].map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 font-medium whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {findings.map((f) => (
                <tr key={f.id} className="border-t border-border bg-surface/60 align-top">
                  <td className="px-4 py-3 font-mono text-xs text-primary">{f.id}</td>
                  <td className="px-4 py-3">
                    <SeverityBadge severity={f.severity} />
                  </td>
                  <td className="px-4 py-3">{f.title}</td>
                  <td className="px-4 py-3 text-muted-foreground">{f.owasp ?? "—"}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {f.cwe ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{f.attack ?? "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{f.nistCsf}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section
        title="Grouped views"
        description="Where the synthetic findings concentrate by vocabulary."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          <Panel>
            <h3 className="text-sm font-semibold">OWASP Top 10 (2021)</h3>
            {owasp.length === 0 ? (
              <div className="mt-3">
                <EmptyState message="No OWASP mappings recorded." />
              </div>
            ) : (
              <ul className="mt-3 space-y-2">
                {owasp.map(([key, list]) => (
                  <li
                    key={key}
                    className="rounded-md border border-border bg-surface-raised px-3 py-2"
                  >
                    <p className="text-sm">{key}</p>
                    <p className="mt-1 font-mono text-xs text-muted-foreground">
                      {list.map((f) => f.id).join(" · ")}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
          <Panel>
            <h3 className="text-sm font-semibold">CWE</h3>
            {cwe.length === 0 ? (
              <div className="mt-3">
                <EmptyState message="No CWE mappings recorded." />
              </div>
            ) : (
              <ul className="mt-3 space-y-2">
                {cwe.map(([key, list]) => (
                  <li
                    key={key}
                    className="rounded-md border border-border bg-surface-raised px-3 py-2"
                  >
                    <p className="font-mono text-sm">{key}</p>
                    <p className="mt-1 font-mono text-xs text-muted-foreground">
                      {list.map((f) => f.id).join(" · ")}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
          <Panel>
            <h3 className="text-sm font-semibold">MITRE ATT&amp;CK (conceptual)</h3>
            {attack.length === 0 ? (
              <div className="mt-3">
                <EmptyState message="No ATT&CK techniques were conceptually relevant." />
              </div>
            ) : (
              <ul className="mt-3 space-y-2">
                {attack.map(([key, list]) => (
                  <li
                    key={key}
                    className="rounded-md border border-border bg-surface-raised px-3 py-2"
                  >
                    <p className="text-sm">{key}</p>
                    <p className="mt-1 font-mono text-xs text-muted-foreground">
                      {list.map((f) => f.id).join(" · ")}
                    </p>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Techniques are cited only where conceptually relevant to the synthetic finding. They
              describe adversary behaviour categories, not steps taken in this lab.
            </p>
          </Panel>
        </div>
      </Section>

      <Section
        title="NIST CSF 2.0 functions"
        description="High-level alignment of engagement activity to CSF 2.0 functions."
      >
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {CSF_FUNCTIONS.map((item) => (
            <Panel key={item.fn} className="p-4">
              <p className="font-mono text-xs text-primary">{item.fn}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.note}</p>
            </Panel>
          ))}
        </div>
      </Section>
    </>
  );
}

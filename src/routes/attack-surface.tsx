import { createFileRoute } from "@tanstack/react-router";

import { assets } from "@/data/lab";
import { EmptyState, Panel, ResponsibleTestingNotice, Section } from "@/components/lab/primitives";

const TITLE = "Attack Surface Inventory | Project Nightwatch Lab";
const DESCRIPTION =
  "Synthetic attack-surface inventory across internet-facing, application, identity, and internal zones — asset type, exposure, ownership, authentication boundaries, and risk notes.";

export const Route = createFileRoute("/attack-surface")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: AttackSurfacePage,
});

const ZONES = ["Internet-Facing", "Application", "Identity", "Internal"] as const;

const zoneTone: Record<(typeof ZONES)[number], string> = {
  "Internet-Facing": "border-critical/40 bg-critical/8",
  Application: "border-high/40 bg-high/8",
  Identity: "border-medium/40 bg-medium/8",
  Internal: "border-verified/40 bg-verified/8",
};

function AttackSurfacePage() {
  return (
    <>
      <header className="relative overflow-hidden border-b border-border">
        <div aria-hidden className="grid-backdrop pointer-events-none absolute inset-0 opacity-50" />
        <div aria-hidden className="hero-glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-12 md:px-8 md:py-16">
          <p className="label-eyebrow">Phase 02–03 · Discovery &amp; surface analysis</p>
          <h1 className="mt-3 text-3xl font-semibold text-balance md:text-4xl">Attack Surface</h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
            An inventory is only useful when it records who owns an asset and where its authentication boundary sits.
            All identifiers, hostnames (<code className="font-mono text-xs">*.lab.invalid</code>), and addresses below
            use reserved documentation ranges and are entirely synthetic and non-routable.
          </p>
        </div>
      </header>

      <Section
        title="Trust-zone map"
        description="Illustrative and non-operational. Boundaries mark where authorization must be re-established, not network topology."
      >
        <div className="grid gap-4 lg:grid-cols-4">
          {ZONES.map((zone, i) => {
            const zoneAssets = assets.filter((a) => a.zone === zone);
            return (
              <div key={zone} className={`rounded-xl border p-4 ${zoneTone[zone]}`}>
                <p className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase">
                  Zone {i + 1}
                </p>
                <h3 className="mt-1 text-sm font-semibold">{zone}</h3>
                {zoneAssets.length === 0 ? (
                  <p className="mt-3 text-xs text-muted-foreground">No synthetic assets recorded in this zone.</p>
                ) : (
                  <ul className="mt-3 space-y-2">
                    {zoneAssets.map((a) => (
                      <li key={a.id} className="rounded-md border border-border bg-background/50 px-3 py-2">
                        <p className="font-mono text-xs text-primary">{a.id}</p>
                        <p className="text-xs text-foreground">{a.name}</p>
                        <p className="mt-1 font-mono text-[0.65rem] text-muted-foreground">{a.hostname}</p>
                      </li>
                    ))}
                  </ul>
                )}
                {i < ZONES.length - 1 ? (
                  <p className="mt-3 font-mono text-[0.65rem] text-muted-foreground">
                    ↓ boundary: re-authorize on transition
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </Section>

      <Section
        title="Asset inventory"
        description="Eight synthetic assets tracked through the engagement. Exposure and authentication boundary drive validation priority."
      >
        {assets.length === 0 ? (
          <EmptyState message="No assets in the synthetic inventory." />
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[1100px] text-left text-sm">
              <caption className="sr-only">Synthetic attack-surface inventory</caption>
              <thead className="bg-surface-raised">
                <tr>
                  {[
                    "ID",
                    "Asset",
                    "Type",
                    "Exposure",
                    "Service category",
                    "Technology family",
                    "Owner",
                    "Auth boundary",
                    "Last review",
                  ].map((h) => (
                    <th key={h} scope="col" className="px-4 py-3 font-medium whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {assets.map((a) => (
                  <tr key={a.id} className="border-t border-border bg-surface/60 align-top">
                    <td className="px-4 py-3 font-mono text-xs text-primary">{a.id}</td>
                    <td className="px-4 py-3">
                      <span className="block font-medium">{a.name}</span>
                      <span className="block font-mono text-[0.7rem] text-muted-foreground">{a.hostname}</span>
                      <span className="block font-mono text-[0.7rem] text-muted-foreground">{a.network}</span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{a.assetType}</td>
                    <td className="px-4 py-3 text-muted-foreground">{a.exposure}</td>
                    <td className="px-4 py-3 text-muted-foreground">{a.serviceCategory}</td>
                    <td className="px-4 py-3 text-muted-foreground">{a.technologyFamily}</td>
                    <td className="px-4 py-3 text-muted-foreground">{a.owner}</td>
                    <td className="px-4 py-3 text-muted-foreground">{a.authBoundary}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{a.lastReview}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>

      <Section title="Risk notes by asset" description="Short analyst commentary carried forward into validation.">
        <div className="grid gap-3 md:grid-cols-2">
          {assets.map((a) => (
            <Panel key={a.id} className="p-4">
              <p className="font-mono text-xs text-primary">
                {a.id} · {a.zone}
              </p>
              <h3 className="mt-1 text-sm font-semibold">{a.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.riskNotes}</p>
            </Panel>
          ))}
        </div>
      </Section>

      <Section title="Responsible testing">
        <ResponsibleTestingNotice compact />
      </Section>
    </>
  );
}

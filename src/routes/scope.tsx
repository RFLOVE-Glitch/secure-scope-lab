import { createFileRoute } from "@tanstack/react-router";

import { engagement, roe } from "@/data/lab";
import {
  BulletList,
  DataList,
  Panel,
  ResponsibleTestingNotice,
  Section,
} from "@/components/lab/primitives";

const TITLE = "Scope & Rules of Engagement | Project Nightwatch Lab";
const DESCRIPTION =
  "Synthetic rules of engagement for the Project Nightwatch portfolio lab: authorized assets, exclusions, allowed techniques, prohibited actions, evidence handling, stop conditions, and escalation.";

export const Route = createFileRoute("/scope")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: ScopePage,
});

function ScopePage() {
  return (
    <>
      <header className="relative overflow-hidden border-b border-border">
        <div aria-hidden className="grid-backdrop pointer-events-none absolute inset-0 opacity-50" />
        <div aria-hidden className="hero-glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-12 md:px-8 md:py-16">
          <p className="label-eyebrow">Phase 01 · Authorization &amp; scope</p>
          <h1 className="mt-3 text-3xl font-semibold text-balance md:text-4xl">Scope &amp; Rules of Engagement</h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Nothing in a legitimate assessment starts before this document is agreed and signed. The rules of
            engagement below are synthetic and illustrative, but they follow the structure a real engagement requires:
            what may be touched, what may never be touched, how evidence is handled, and when testing stops.
          </p>
        </div>
      </header>

      <Section title="Engagement metadata" description="Synthetic engagement record for the portfolio lab.">
        <Panel>
          <DataList
            items={[
              { label: "Assessment name", value: engagement.name },
              { label: "Client", value: engagement.client },
              { label: "Engagement type", value: engagement.type },
              { label: "Testing window", value: engagement.window },
              { label: "Methodology basis", value: engagement.methodologyBasis },
              { label: "Report version", value: engagement.reportVersion },
            ]}
          />
        </Panel>
      </Section>

      <Section title="Authorization statement">
        <Panel className="border-primary/35 bg-primary/5">
          <p className="text-sm leading-relaxed text-foreground/90">
            Written authorization from the asset owner is required before any real testing activity begins. That
            authorization must name the in-scope assets, the testing window, the approved techniques, the emergency
            contacts, and the stop conditions. No assessment activity in this lab was performed against any real
            system: the engagement described here does not exist, and the authorization statement is presented to
            demonstrate the control, not to imply one was granted.
          </p>
        </Panel>
      </Section>

      <Section title="Scope boundaries" description="Authorized assets are explicit; anything not listed is out of scope by default.">
        <div className="grid gap-4 lg:grid-cols-2">
          <Panel>
            <h3 className="text-sm font-semibold text-verified">Authorized assets (synthetic)</h3>
            <div className="mt-4">
              <BulletList items={roe.authorizedAssets} tone="verified" />
            </div>
          </Panel>
          <Panel>
            <h3 className="text-sm font-semibold text-critical">Explicitly excluded</h3>
            <div className="mt-4">
              <BulletList items={roe.excludedAssets} tone="danger" />
            </div>
          </Panel>
        </div>
      </Section>

      <Section title="Techniques and prohibitions" description="Stated at a high level. Techniques are described, never operationalized.">
        <div className="grid gap-4 lg:grid-cols-2">
          <Panel>
            <h3 className="text-sm font-semibold">Allowed techniques</h3>
            <div className="mt-4">
              <BulletList items={roe.allowedTechniques} />
            </div>
          </Panel>
          <Panel>
            <h3 className="text-sm font-semibold text-critical">Prohibited actions</h3>
            <div className="mt-4">
              <BulletList items={roe.prohibitedActions} tone="danger" />
            </div>
          </Panel>
        </div>
      </Section>

      <Section title="Evidence, stop conditions, and escalation">
        <div className="grid gap-4 lg:grid-cols-3">
          <Panel>
            <h3 className="text-sm font-semibold">Evidence handling</h3>
            <div className="mt-4">
              <BulletList items={roe.evidenceHandling} />
            </div>
          </Panel>
          <Panel>
            <h3 className="text-sm font-semibold text-medium">Stop conditions</h3>
            <div className="mt-4">
              <BulletList items={roe.stopConditions} />
            </div>
          </Panel>
          <Panel>
            <h3 className="text-sm font-semibold">Escalation path</h3>
            <div className="mt-4">
              <BulletList items={roe.escalation} />
            </div>
          </Panel>
        </div>
      </Section>

      <Section title="Responsible testing">
        <ResponsibleTestingNotice />
      </Section>
    </>
  );
}

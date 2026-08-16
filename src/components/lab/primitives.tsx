import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Severity } from "@/data/schemas";

const severityStyles: Record<Severity, string> = {
  Critical: "bg-critical/15 text-critical border-critical/40",
  High: "bg-high/15 text-high border-high/40",
  Medium: "bg-medium/15 text-medium border-medium/40",
  Low: "bg-low/15 text-low border-low/40",
};

export function SeverityBadge({ severity, className }: { severity: Severity; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide",
        severityStyles[severity],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {severity}
    </span>
  );
}

export function StatusPill({ value, className }: { value: string; className?: string }) {
  const tone =
    value === "Pass" || value === "Closed" || value === "Remediated" || value === "Retested"
      ? "bg-verified/15 text-verified border-verified/40"
      : value === "Partial" || value === "In Remediation" || value === "In Progress" || value === "Evidence Review"
        ? "bg-medium/15 text-medium border-medium/40"
        : value === "Fail"
          ? "bg-critical/15 text-critical border-critical/40"
          : "bg-muted text-muted-foreground border-border";
  return (
    <span
      className={cn("inline-flex rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap", tone, className)}
    >
      {value}
    </span>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="label-eyebrow">{children}</p>;
}

export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-border">
      <div aria-hidden className="grid-backdrop pointer-events-none absolute inset-0 opacity-50" />
      <div aria-hidden className="hero-glow pointer-events-none absolute inset-0" />
      <div className="relative mx-auto w-full max-w-6xl px-5 py-12 md:px-8 md:py-16">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-3 text-3xl font-semibold text-balance md:text-4xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">{intro}</p>
        {children}
      </div>
    </header>
  );
}

export function Section({
  title,
  description,
  children,
  className,
  id,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("mx-auto w-full max-w-6xl px-5 py-10 md:px-8 md:py-14", className)}>
      <h2 className="text-xl font-semibold md:text-2xl">{title}</h2>
      {description ? (
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("panel p-5 md:p-6", className)}>{children}</div>;
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-dashed border-border bg-surface/50 px-6 py-10 text-center text-sm text-muted-foreground">
      {message}
    </div>
  );
}

export function DataList({ items }: { items: { label: string; value: ReactNode }[] }) {
  if (items.length === 0) return <EmptyState message="No details recorded." />;
  return (
    <dl className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label}>
          <dt className="label-eyebrow">{item.label}</dt>
          <dd className="mt-1 text-sm leading-relaxed text-foreground">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function BulletList({ items, tone = "default" }: { items: readonly string[]; tone?: "default" | "danger" | "verified" }) {
  if (items.length === 0) return <EmptyState message="Nothing listed." />;
  const dot =
    tone === "danger" ? "bg-critical" : tone === "verified" ? "bg-verified" : "bg-primary";
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
          <span className={cn("mt-2 size-1.5 shrink-0 rounded-full", dot)} aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ResponsibleTestingNotice({ compact = false }: { compact?: boolean }) {
  return (
    <aside
      aria-labelledby="responsible-testing-heading"
      className="rounded-xl border border-medium/35 bg-medium/8 p-5 md:p-6"
    >
      <h2 id="responsible-testing-heading" className="text-sm font-semibold tracking-wide text-medium">
        Responsible Testing Boundary
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-foreground/85">
        Every organization, asset, hostname, IP range, credential, finding, and attack path in this lab is
        synthetic or an intentionally vulnerable lab example. No real system, organization, account, or
        third-party target was scanned, probed, exploited, or interacted with in any way.
      </p>
      {!compact ? (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          This portfolio demonstrates assessment methodology and defensive reasoning — not operational
          intrusion capability. It contains no working exploit payloads, bypass strings, or authorization-evasion
          instructions. Real testing requires written authorization from the asset owner before any activity begins.
        </p>
      ) : null}
    </aside>
  );
}

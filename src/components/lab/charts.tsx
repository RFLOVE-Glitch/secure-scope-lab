"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const axis = {
  stroke: "var(--color-muted-foreground)",
  fontSize: 12,
};

const tooltipStyle = {
  backgroundColor: "var(--color-popover)",
  border: "1px solid var(--color-border)",
  borderRadius: "8px",
  color: "var(--color-popover-foreground)",
  fontSize: "12px",
};

const severityColors: Record<string, string> = {
  Critical: "var(--color-critical)",
  High: "var(--color-high)",
  Medium: "var(--color-medium)",
  Low: "var(--color-low)",
};

export function SeverityChart({ data }: { data: { severity: string; count: number }[] }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
          <CartesianGrid stroke="var(--color-border)" vertical={false} />
          <XAxis dataKey="severity" tickLine={false} {...axis} />
          <YAxis allowDecimals={false} tickLine={false} {...axis} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--color-secondary)", opacity: 0.4 }} />
          <Bar dataKey="count" name="Validated findings" radius={[6, 6, 0, 0]}>
            {data.map((entry) => (
              <Cell key={entry.severity} fill={severityColors[entry.severity] ?? "var(--color-primary)"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function AssetClassChart({ data }: { data: { zone: string; count: number }[] }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 8, right: 16, left: 24, bottom: 0 }}>
          <CartesianGrid stroke="var(--color-border)" horizontal={false} />
          <XAxis type="number" allowDecimals={false} tickLine={false} {...axis} />
          <YAxis type="category" dataKey="zone" width={104} tickLine={false} {...axis} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--color-secondary)", opacity: 0.4 }} />
          <Bar dataKey="count" name="Findings" fill="var(--color-primary)" radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RiskTrendChart({
  data,
}: {
  data: { phase: string; critical: number; high: number; medium: number; low: number }[];
}) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
          <CartesianGrid stroke="var(--color-border)" vertical={false} />
          <XAxis dataKey="phase" tickLine={false} {...axis} />
          <YAxis allowDecimals={false} tickLine={false} {...axis} />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Line type="monotone" dataKey="critical" name="Critical" stroke="var(--color-critical)" strokeWidth={2} />
          <Line type="monotone" dataKey="high" name="High" stroke="var(--color-high)" strokeWidth={2} />
          <Line type="monotone" dataKey="medium" name="Medium" stroke="var(--color-medium)" strokeWidth={2} />
          <Line type="monotone" dataKey="low" name="Low" stroke="var(--color-low)" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

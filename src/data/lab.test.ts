import { describe, expect, it } from "vitest";

import {
  assets,
  attackPaths,
  countByAssetClass,
  countBySeverity,
  findings,
  kpis,
  methodologySteps,
  portfolioMeta,
  remediationBoard,
  remediationStatusBreakdown,
  riskTrend,
  validateLabData,
} from "./lab";

describe("synthetic data integrity", () => {
  it("validates every record against its schema", () => {
    expect(validateLabData()).toBe(true);
  });

  it("has exactly 12 findings with unique sequential IDs EH-001..EH-012", () => {
    expect(findings).toHaveLength(12);
    const ids = findings.map((f) => f.id);
    expect(new Set(ids).size).toBe(12);
    expect(ids).toEqual(
      Array.from({ length: 12 }, (_, i) => `EH-${String(i + 1).padStart(3, "0")}`),
    );
  });

  it("has unique asset IDs and required lab zones", () => {
    const ids = assets.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const required of ["WEB-01", "API-01", "IAM-01", "VPN-01", "DB-01", "ADMIN-01"]) {
      expect(ids).toContain(required);
    }
  });

  it("references only known assets from findings", () => {
    const ids = new Set(assets.map((a) => a.id));
    for (const f of findings) {
      for (const assetId of f.assets) expect(ids.has(assetId)).toBe(true);
    }
  });

  it("references only known findings from attack paths and the remediation board", () => {
    const ids = new Set(findings.map((f) => f.id));
    for (const p of attackPaths) {
      expect(p.findings.length).toBeGreaterThanOrEqual(2);
      for (const id of p.findings) expect(ids.has(id)).toBe(true);
    }
    for (const item of remediationBoard) expect(ids.has(item.findingId)).toBe(true);
  });

  it("uses only non-routable synthetic hostnames and documentation/private IP ranges", () => {
    for (const a of assets) {
      expect(a.hostname.endsWith(".lab.invalid")).toBe(true);
      expect(a.network.startsWith("198.51.100.") || a.network.startsWith("10.20.")).toBe(true);
    }
  });

  it("keeps evidence descriptive and free of operational payload markers", () => {
    const banned = [
      /curl\s+-/i,
      /\bsqlmap\b/i,
      /\bnmap\s+-/i,
      /<script/i,
      /' or '1'='1/i,
      /\bmetasploit\b/i,
    ];
    for (const f of findings) {
      for (const pattern of banned) {
        expect(pattern.test(f.evidence)).toBe(false);
        expect(pattern.test(f.remediation)).toBe(false);
      }
    }
  });

  it("records a retest result for every remediated or closed finding", () => {
    for (const f of findings) {
      if (f.status === "Remediated" || f.status === "Closed") {
        expect(["Pass", "Partial"]).toContain(f.retest);
      }
    }
  });
});

describe("derived metrics", () => {
  it("matches KPI counts to the register", () => {
    expect(kpis.findingsValidated).toBe(findings.length);
    expect(kpis.assetsInScope).toBe(assets.length);
    expect(kpis.remediated).toBe(9);
    expect(kpis.retestPassed).toBe(9);
    expect(attackPaths).toHaveLength(3);
    expect(kpis.critical).toBe(1);
    expect(kpis.high).toBe(3);
    expect(kpis.medium).toBe(5);
    expect(kpis.low).toBe(3);
    expect(kpis.critical + kpis.high + kpis.medium + kpis.low).toBe(findings.length);
    expect(kpis.remediated).toBeGreaterThanOrEqual(kpis.retestPassed - 3);
  });

  it("sums severity counts to the total findings", () => {
    const total = countBySeverity().reduce((sum, row) => sum + row.count, 0);
    expect(total).toBe(findings.length);
  });

  it("counts findings for every asset class", () => {
    const rows = countByAssetClass();
    expect(rows).toHaveLength(4);
    expect(rows.every((r) => r.count >= 0)).toBe(true);
    expect(rows.some((r) => r.count > 0)).toBe(true);
  });

  it("partitions remediation status across all findings", () => {
    const total = remediationStatusBreakdown().reduce((sum, row) => sum + row.value, 0);
    expect(total).toBe(findings.length);
  });

  it("shows non-increasing critical risk across the trend", () => {
    for (let i = 1; i < riskTrend.length; i += 1) {
      expect(riskTrend[i]!.critical).toBeLessThanOrEqual(riskTrend[i - 1]!.critical);
      expect(riskTrend[i]!.high).toBeLessThanOrEqual(riskTrend[i - 1]!.high);
    }
    expect(riskTrend.at(-1)!.critical).toBe(0);
  });
});

describe("portfolio + methodology metadata", () => {
  it("documents a nine-stage methodology", () => {
    expect(methodologySteps).toHaveLength(9);
    expect(methodologySteps[0]!.title).toMatch(/Authorization/);
    expect(methodologySteps.at(-1)!.title).toMatch(/reporting/i);
  });

  it("exposes portfolio card metadata for rachellove.tech", () => {
    expect(portfolioMeta.title).toBe("Ethical Hacking & Attack Surface Validation Lab");
    expect(portfolioMeta.author).toBe("Rachel Love");
    expect(portfolioMeta.summary.length).toBeGreaterThan(80);
    expect(portfolioMeta.tools.length).toBeGreaterThan(4);
    expect(portfolioMeta.github).toBeTruthy();
    expect(portfolioMeta.liveDemo).toBeTruthy();
  });
});

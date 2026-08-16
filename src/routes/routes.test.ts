import { describe, expect, it } from "vitest";

type MetaEntry = { title?: string; name?: string; property?: string; content?: string };
type TestableRoute = {
  options: {
    component?: unknown;
    head?: (ctx: never) => { meta: MetaEntry[] };
  };
};

const ROUTE_MODULES = {
  "/": () => import("./index"),
  "/scope": () => import("./scope"),
  "/attack-surface": () => import("./attack-surface"),
  "/findings": () => import("./findings"),
  "/attack-paths": () => import("./attack-paths"),
  "/remediation": () => import("./remediation"),
  "/framework": () => import("./framework"),
  "/report": () => import("./report"),
} as const;

function readHead(mod: { Route: unknown }) {
  const route = mod.Route as unknown as TestableRoute;
  return { route, head: route.options.head?.(undefined as never) };
}

describe("primary routes", () => {
  it.each(Object.keys(ROUTE_MODULES) as (keyof typeof ROUTE_MODULES)[])(
    "%s exports a route with a component and unique head metadata",
    async (path) => {
      const { route, head } = readHead(await ROUTE_MODULES[path]());
      expect(route).toBeDefined();
      expect(route.options.component).toBeTypeOf("function");
      expect(head).toBeDefined();

      const title = head!.meta.find((m) => "title" in m)?.title;
      const description = head!.meta.find((m) => m.name === "description")?.content;
      expect(title).toBeTruthy();
      expect(title).not.toMatch(/Lovable/);
      expect(description).toBeTruthy();
      expect(head!.meta.some((m) => m.property === "og:title")).toBe(true);
      expect(head!.meta.some((m) => m.property === "og:description")).toBe(true);
    },
  );

  it("gives every route a distinct title", async () => {
    const titles = new Set<string>();
    for (const load of Object.values(ROUTE_MODULES)) {
      const { head } = readHead(await load());
      const title = head?.meta.find((m) => "title" in m)?.title;
      if (title) titles.add(title);
    }
    expect(titles.size).toBe(Object.keys(ROUTE_MODULES).length);
  });
});

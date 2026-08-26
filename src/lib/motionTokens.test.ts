import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

// Read from disk rather than importing: Vite hands a ?raw CSS import to
// its own CSS pipeline, and the transformed text no longer carries the
// @utility and @layer directives this file exists to check.
const globals = readFileSync(
  fileURLToPath(new URL("../styles/globals.css", import.meta.url)),
  "utf8",
);

/**
 * R2a cluster 1: the site's authored motion timing was not running, for
 * two independent reasons, and neither left a trace anyone could see in
 * the markup. These guard both.
 *
 * 1. Tailwind v4 has no --duration-* theme namespace. Its duration
 *    utilities are `duration-<number>` and `duration-[...]` only, so
 *    `duration-normal` compiled to nothing and every call site fell
 *    through to the 150ms default. The names only work because
 *    globals.css registers them with @utility.
 * 2. Unlayered CSS outranks every cascade layer. The theme-switch
 *    `transition` shorthand sat outside a layer and so beat Tailwind's
 *    utilities outright on every a / button / nav / section it matched.
 */

// Raw sources of the main entry — the lab and works entries use the
// duration-[var(--duration-*)] form throughout and register nothing.
const mainSources = import.meta.glob("../{components,pages,providers}/**/*.tsx", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const registered = new Set(
  [...globals.matchAll(/@utility\s+(duration-[a-z]+)\s*\{/g)].map((m) => m[1]),
);
const tokens = new Set(
  [...globals.matchAll(/^\s*(--duration-[a-z]+):/gm)].map((m) => m[1]),
);

describe("motion duration tokens", () => {
  it("registers a utility for the token names the markup uses", () => {
    expect(registered.size).toBeGreaterThanOrEqual(6);
  });

  it("backs every registered utility with a token of the same name", () => {
    const unbacked = [...registered].filter(
      (name) => !tokens.has(name.replace("duration-", "--duration-")),
    );
    expect(unbacked, unbacked.join(", ")).toEqual([]);
  });

  it("has no bare duration utility the main entry never registered", () => {
    const bare = /(?<![-\w])duration-([a-z]+)(?![-\w])/g;
    const offenders: string[] = [];
    for (const [path, source] of Object.entries(mainSources)) {
      if (path.includes(".test.")) continue;
      for (const match of source.matchAll(bare)) {
        // duration-<number> is Tailwind's own; only names are at risk.
        if (/^\d+$/.test(match[1])) continue;
        if (!registered.has(match[0])) offenders.push(`${path}: ${match[0]}`);
      }
    }
    expect(offenders, offenders.join("\n")).toEqual([]);
  });

  it("keeps the theme-switch transition inside a cascade layer", () => {
    const rule = globals.indexOf("body,\n  header, footer, main, nav");
    expect(rule).toBeGreaterThan(-1);
    const layerOpen = globals.lastIndexOf("@layer base {", rule);
    expect(layerOpen).toBeGreaterThan(-1);
    // Nothing may close that layer between its opening and the rule.
    expect(globals.slice(layerOpen, rule)).not.toMatch(/^}/m);
  });
});

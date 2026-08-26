/// <reference types="node" />
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

/**
 * Justin's ruling (craft arc decision 13) scopes the print work to the
 * resume: the PDF is the artifact and browser print-to-PDF is the pipeline
 * that makes it, but no site-wide print pass. A print rule is invisible in
 * every normal review -- it does not show on screen, it does not fail a
 * build, and nobody prints a page by accident -- so the scope is guarded
 * here rather than trusted.
 */

const read = (rel: string) =>
  readFileSync(fileURLToPath(new URL(rel, import.meta.url)), "utf8");

const print = read("../styles/print.css");
const globals = read("../styles/globals.css");

describe("resume print stylesheet", () => {
  it("is imported by the portfolio entry", () => {
    expect(globals).toMatch(/@import\s+"\.\/print\.css"/);
  });

  it("is the only place the repo declares print rules", () => {
    const others = [
      read("../styles/globals.css"),
      read("../lab/styles/lab.css"),
    ];
    for (const sheet of others) {
      expect(sheet.replace(/@import[^;]*;/g, "")).not.toMatch(/@media\s+print/);
    }
    expect(print).toMatch(/@media\s+print/);
  });

  it("gates every selector on the resume, so no rule can reach another surface", () => {
    // Take everything preceding each `{`, which catches selector lists
    // spread over several lines as well as single-line rules.
    const stripped = print.replace(/\/\*[\s\S]*?\*\//g, "");
    const selectors = [...stripped.matchAll(/([^{}]+)\{/g)]
      .map((m) => m[1].trim())
      .filter((s) => s && !s.startsWith("@"))
      .flatMap((s) => s.split(","))
      .map((s) => s.trim())
      .filter(Boolean);
    expect(selectors.length).toBeGreaterThan(5);
    const ungated = selectors.filter((s) => !s.includes('[data-print="resume"]'));
    expect(ungated, ungated.join("\n")).toEqual([]);
  });
});

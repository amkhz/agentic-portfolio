// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import type { Guide } from "@core/lab/guide-types";
import { GuideSpine } from "./GuideSpine";
import { GuideLedgerRow } from "./GuideLedgerRow";

const makeGuide = (accentLight?: string): Guide => ({
  slug: "sample-guide",
  frontmatter: {
    slug: "sample-guide",
    title: "Sample Guide",
    kicker: "Research Guide Series",
    source: { authors: "Author et al.", year: 2025, venue: "arXiv:0000.00000" },
    accent: "#4ade80",
    ...(accentLight !== undefined ? { accentLight } : {}),
    territory: "T4",
    status: "draft",
    description: "A short description.",
    figures: [],
    glossary: {},
  },
  sections: [],
  glossary: {},
  figures: {},
});

// Both shelf layouts share guideShelfCommon's accent publication and the
// .lab-guide-spine resolution hook, so the ADR-009 contract is asserted for
// each one identically: publish the dual-var pair, never set --guide-accent,
// and carry the class that re-resolves it per guide.
const LAYOUTS: { name: string; render: (guide: Guide) => HTMLElement | null }[] =
  [
    {
      name: "GuideSpine",
      render: (guide) =>
        render(
          <MemoryRouter>
            <GuideSpine guide={guide} />
          </MemoryRouter>,
        ).container.querySelector("a"),
    },
    {
      name: "GuideLedgerRow",
      render: (guide) =>
        render(
          <MemoryRouter>
            <GuideLedgerRow guide={guide} />
          </MemoryRouter>,
        ).container.querySelector("a"),
    },
  ];

describe.each(LAYOUTS)("$name accent publication", ({ render: renderItem }) => {
  it("publishes both accent custom properties when accentLight is present", () => {
    const link = renderItem(makeGuide("#6d28d9"));
    expect(link).not.toBeNull();
    expect(link!.style.getPropertyValue("--guide-accent-dark")).toBe("#4ade80");
    expect(link!.style.getPropertyValue("--guide-accent-light")).toBe("#6d28d9");
  });

  it("omits --guide-accent-light when frontmatter lacks accentLight", () => {
    const link = renderItem(makeGuide());
    expect(link).not.toBeNull();
    expect(link!.style.getPropertyValue("--guide-accent-dark")).toBe("#4ade80");
    expect(link!.style.getPropertyValue("--guide-accent-light")).toBe("");
  });

  it("does not set --guide-accent directly (the cascade owns resolution)", () => {
    const link = renderItem(makeGuide("#6d28d9"));
    expect(link!.style.getPropertyValue("--guide-accent")).toBe("");
  });

  it("carries the lab-guide-spine class that re-resolves the accent per guide", () => {
    const link = renderItem(makeGuide());
    expect(link!.classList.contains("lab-guide-spine")).toBe(true);
  });
});

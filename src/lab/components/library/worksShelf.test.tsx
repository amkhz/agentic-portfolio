// @vitest-environment jsdom
import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import type { WorkEntry } from "@core/works/works";
import { WorksShelf } from "./WorksShelf";

// The section reveal rides motion's whileInView; jsdom has no
// IntersectionObserver, so stub it (same pattern as DeckSession.test).
vi.stubGlobal(
  "IntersectionObserver",
  class {
    observe() {}
    unobserve() {}
    disconnect() {}
  },
);

const flightDeck: WorkEntry = {
  slug: "flight-deck",
  title: "The Flight Deck",
  thesisLine: "Speculative design you can operate, not watch.",
  sourceGuides: [
    "dird-28-breakthrough-cockpits",
    "dird-34-cognitive-limits",
    "dird-13-warp-drive",
    "dird-15-vacuum-spacetime-engineering",
  ],
  year: 2026,
  status: "in-progress",
};

const renderShelf = (works: WorkEntry[]) =>
  render(
    <MemoryRouter>
      <WorksShelf works={works} />
    </MemoryRouter>,
  );

describe("WorksShelf", () => {
  it("links the entry to its work route with title and status in the label", () => {
    const { container } = renderShelf([flightDeck]);
    const link = container.querySelector("a");
    expect(link).not.toBeNull();
    expect(link!.getAttribute("href")).toBe("/w/flight-deck");
    expect(link!.getAttribute("aria-label")).toBe(
      "The Flight Deck — In progress",
    );
  });

  it("carries the title, thesis line, and manifest-derived provenance", () => {
    const { getByText } = renderShelf([flightDeck]);
    expect(getByText("The Flight Deck")).toBeTruthy();
    expect(
      getByText("Speculative design you can operate, not watch."),
    ).toBeTruthy();
    expect(getByText(/Built from 4 Archive guides/)).toBeTruthy();
    expect(getByText(/W · 01 · 2026/)).toBeTruthy();
  });

  it("renders the work's sigil as a decorative drawing", () => {
    const { container } = renderShelf([flightDeck]);
    const sigil = container.querySelector("svg[aria-hidden='true']");
    expect(sigil).not.toBeNull();
  });

  it("keeps the section heading grammar (h2 section, h3 entry)", () => {
    const { container } = renderShelf([flightDeck]);
    expect(container.querySelector("h2")?.textContent).toBe("Perihelion Works");
    expect(container.querySelector("h3")?.textContent).toBe("The Flight Deck");
  });
});

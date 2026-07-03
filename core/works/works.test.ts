import { describe, expect, it } from "vitest";
import { getWork, works } from "./works";
import { guides } from "../lab/guides";

describe("works manifest", () => {
  it("has unique slugs", () => {
    const slugs = works.map((work) => work.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("registers the Flight Deck", () => {
    const deck = getWork("flight-deck");
    expect(deck).toBeDefined();
    expect(deck?.title).toBe("The Flight Deck");
    expect(deck?.status).toBe("in-progress");
  });

  it("only cites source guides that exist in the Archive", () => {
    const guideSlugs = new Set(guides.map((guide) => guide.slug));
    for (const work of works) {
      for (const source of work.sourceGuides) {
        expect(guideSlugs, `${work.slug} cites missing guide ${source}`).toContain(source);
      }
    }
  });

  it("returns undefined for unknown slugs", () => {
    expect(getWork("not-a-work")).toBeUndefined();
  });
});

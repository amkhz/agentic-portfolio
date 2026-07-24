// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import indexHtml from "../../index.html?raw";
import labsHtml from "../../labs.html?raw";
import { removeStaticDescription } from "./staticMeta";

describe("removeStaticDescription", () => {
  it("removes the static description tag from head", () => {
    document.head.innerHTML =
      '<meta charset="UTF-8" /><meta name="description" content="static house copy" />';

    removeStaticDescription();

    expect(document.head.querySelector('meta[name="description"]')).toBeNull();
    expect(document.head.querySelector("meta[charset]")).not.toBeNull();
  });

  it("is a no-op when no description tag exists", () => {
    document.head.innerHTML = '<meta charset="UTF-8" />';

    expect(() => removeStaticDescription()).not.toThrow();
    expect(document.head.querySelectorAll("meta")).toHaveLength(1);
  });
});

// The scraper contract: crawlers never run the app, so each entry HTML must
// keep exactly one static description tag for them (removeStaticDescription
// clears it in-browser before the per-page Helmet tag lands). Guards against
// someone deleting the static tag or re-adding a second one.
describe("entry HTML description tags", () => {
  it.each([
    ["index.html", indexHtml],
    ["labs.html", labsHtml],
  ])("%s ships exactly one static meta description", (_entry, html) => {
    const matches = html.match(/<meta\s+name="description"/g) ?? [];
    expect(matches).toHaveLength(1);
  });
});

import { describe, expect, it } from "vitest";
import { oklabToLinearSrgb, oklchToOklab, parseOklch } from "./oklch";

describe("parseOklch", () => {
  it("parses the token syntax used in tokens.css", () => {
    expect(parseOklch("oklch(0.36 0.07 255)")).toEqual({
      l: 0.36,
      c: 0.07,
      h: 255,
      alpha: 1,
    });
  });

  it("parses percentage lightness and alpha", () => {
    expect(parseOklch("oklch(78% 0.13 72 / 0.35)")).toEqual({
      l: 0.78,
      c: 0.13,
      h: 72,
      alpha: 0.35,
    });
    expect(parseOklch("oklch(0.78 0.13 72 / 35%)")?.alpha).toBeCloseTo(0.35);
  });

  it("returns null for anything that is not oklch()", () => {
    expect(parseOklch("")).toBeNull();
    expect(parseOklch("#C8956A")).toBeNull();
    expect(parseOklch("rgb(1 2 3)")).toBeNull();
  });
});

describe("oklch -> OKLab -> linear sRGB", () => {
  it("keeps the neutral axis neutral", () => {
    const [l, a, b] = oklchToOklab({ l: 0.5, c: 0, h: 123, alpha: 1 });
    expect(a).toBeCloseTo(0);
    expect(b).toBeCloseTo(0);
    const [r, g, bl] = oklabToLinearSrgb([l, a, b]);
    expect(r).toBeCloseTo(g, 5);
    expect(g).toBeCloseTo(bl, 5);
  });

  it("round-trips white and black", () => {
    expect(oklabToLinearSrgb([1, 0, 0]).map((v) => Math.round(v * 1e6) / 1e6)).toEqual([
      1, 1, 1,
    ]);
    expect(oklabToLinearSrgb([0, 0, 0])).toEqual([0, 0, 0]);
  });

  it("maps an amber hue to warm linear sRGB (r > g > b)", () => {
    const rgb = oklabToLinearSrgb(
      oklchToOklab({ l: 0.85, c: 0.12, h: 88, alpha: 1 }),
    );
    expect(rgb[0]).toBeGreaterThan(rgb[1]);
    expect(rgb[1]).toBeGreaterThan(rgb[2]);
  });

  it("maps a deep blue hue to cool linear sRGB (b dominant)", () => {
    const rgb = oklabToLinearSrgb(
      oklchToOklab({ l: 0.36, c: 0.07, h: 255, alpha: 1 }),
    );
    expect(rgb[2]).toBeGreaterThan(rgb[0]);
    expect(rgb[2]).toBeGreaterThan(rgb[1]);
  });
});

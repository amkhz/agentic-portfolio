import { describe, expect, it } from "vitest";
import { decideDeckMode, MIN_DECK_WIDTH } from "./deck-mode";

const desktop = { viewportWidth: 1440, reducedMotion: false, webgl: true };

describe("decideDeckMode", () => {
  it("runs the full deck on a capable desktop", () => {
    expect(decideDeckMode(desktop)).toBe("full");
  });

  it("declines below the minimum bench width, whatever else is true", () => {
    expect(decideDeckMode({ ...desktop, viewportWidth: MIN_DECK_WIDTH - 1 })).toBe("decline");
    expect(
      decideDeckMode({ viewportWidth: 390, reducedMotion: true, webgl: false }),
    ).toBe("decline");
  });

  it("serves the static plate for reduced motion", () => {
    expect(decideDeckMode({ ...desktop, reducedMotion: true })).toBe("static");
  });

  it("serves the static plate when WebGL is unavailable", () => {
    expect(decideDeckMode({ ...desktop, webgl: false })).toBe("static");
  });
});

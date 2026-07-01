import { describe, it, expect } from "vitest";
import {
  DEFAULT_READING_PREFS,
  clampReadingPrefs,
  isDefaultReadingPrefs,
  parseReadingPrefs,
  readingPrefsToCssVars,
  serializeReadingPrefs,
} from "./reading-prefs";

describe("clampReadingPrefs", () => {
  it("fills missing fields with defaults", () => {
    expect(clampReadingPrefs({})).toEqual(DEFAULT_READING_PREFS);
  });

  it("clamps out-of-bounds values to the nearest legal bound", () => {
    expect(clampReadingPrefs({ sizePct: 500 }).sizePct).toBe(140);
    expect(clampReadingPrefs({ sizePct: 10 }).sizePct).toBe(90);
    expect(clampReadingPrefs({ weight: 999 }).weight).toBe(140);
    expect(clampReadingPrefs({ weight: -999 }).weight).toBe(-40);
  });

  it("snaps size and weight to their step grid", () => {
    expect(clampReadingPrefs({ sizePct: 112 }).sizePct).toBe(110);
    expect(clampReadingPrefs({ weight: 24 }).weight).toBe(20);
  });

  it("snaps measure to the nearest offered option", () => {
    expect(clampReadingPrefs({ measure: 50 }).measure).toBe(48);
    expect(clampReadingPrefs({ measure: 61 }).measure).toBe(64);
  });

  it("rejects non-finite input", () => {
    expect(clampReadingPrefs({ sizePct: NaN }).sizePct).toBe(90);
  });
});

describe("serialize / parse round-trip", () => {
  it("round-trips a non-default value including a negative weight", () => {
    const prefs = clampReadingPrefs({ sizePct: 120, weight: -30, measure: 64 });
    expect(parseReadingPrefs(serializeReadingPrefs(prefs))).toEqual(prefs);
  });

  it("falls back to defaults on missing or malformed payloads", () => {
    expect(parseReadingPrefs(null)).toEqual(DEFAULT_READING_PREFS);
    expect(parseReadingPrefs("garbage")).toEqual(DEFAULT_READING_PREFS);
    expect(parseReadingPrefs("s110w0")).toEqual(DEFAULT_READING_PREFS);
  });

  it("re-clamps values parsed from an out-of-bounds payload", () => {
    expect(parseReadingPrefs("s300w900m99")).toEqual({
      sizePct: 140,
      weight: 140,
      measure: 64,
    });
  });
});

describe("isDefaultReadingPrefs", () => {
  it("is true only for the exact defaults", () => {
    expect(isDefaultReadingPrefs(DEFAULT_READING_PREFS)).toBe(true);
    expect(isDefaultReadingPrefs({ ...DEFAULT_READING_PREFS, weight: 10 })).toBe(false);
  });
});

describe("readingPrefsToCssVars", () => {
  it("maps prefs to the lab.css custom properties", () => {
    expect(readingPrefsToCssVars({ sizePct: 130, weight: 20, measure: 48 })).toEqual({
      "--lab-reading-scale": "1.3",
      "--lab-body-weight-delta": "20",
      "--lab-measure": "48rem",
    });
  });
});

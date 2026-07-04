import { describe, expect, it } from "vitest";
import {
  formatOrientationReadings,
  sampleOrientation,
} from "./orientation";

describe("sampleOrientation", () => {
  it("is deterministic in time", () => {
    expect(sampleOrientation(42.5)).toEqual(sampleOrientation(42.5));
  });

  it("stays in the nominal attitude band across a long session", () => {
    for (let t = 0; t < 600; t += 1.7) {
      const o = sampleOrientation(t);
      expect(Math.abs(o.bank)).toBeLessThanOrEqual(3);
      expect(Math.abs(o.pitch)).toBeLessThanOrEqual(1.5);
      expect(o.flow).toBeGreaterThan(0.5);
      expect(o.flow).toBeLessThan(0.75);
    }
  });

  it("actually drifts: the attitude moves over a session", () => {
    const banks = new Set<string>();
    for (let t = 0; t < 300; t += 10) {
      banks.add(sampleOrientation(t).bank.toFixed(1));
    }
    expect(banks.size).toBeGreaterThan(3);
  });
});

describe("formatOrientationReadings", () => {
  it("formats the bench line with side letters and signed pitch", () => {
    const { line } = formatOrientationReadings(sampleOrientation(0));
    expect(line).toMatch(
      /^BANK [LR]\d\.\d · PITCH [+-]\d\.\d · FLOW 0\.\d{2}$/,
    );
  });

  it("mirrors bank and pitch direction in words", () => {
    const left = formatOrientationReadings({
      bank: -1.2,
      pitch: -0.4,
      flow: 0.62,
    });
    expect(left.line).toContain("BANK L1.2");
    expect(left.mirror).toContain("1.2 degrees left");
    expect(left.mirror).toContain("0.4 degrees down");
    const right = formatOrientationReadings({
      bank: 2.1,
      pitch: 0.8,
      flow: 0.62,
    });
    expect(right.line).toContain("BANK R2.1");
    expect(right.mirror).toContain("2.1 degrees right");
    expect(right.mirror).toContain("0.8 degrees up");
  });
});

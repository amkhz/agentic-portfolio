import { describe, expect, it } from "vitest";
import {
  formatFieldReadings,
  sampleFieldTelemetry,
  STRESS_FLOOR,
} from "./field";

describe("sampleFieldTelemetry", () => {
  it("is deterministic in time", () => {
    expect(sampleFieldTelemetry(42.5)).toEqual(sampleFieldTelemetry(42.5));
  });

  it("stays in the nominal band across a long session", () => {
    for (let t = 0; t < 600; t += 1.7) {
      const field = sampleFieldTelemetry(t);
      expect(field.wall).toBeGreaterThan(0.94);
      expect(field.wall).toBeLessThanOrEqual(1.005);
      expect(field.even).toBeGreaterThan(0.93);
      expect(field.even).toBeLessThanOrEqual(0.995);
      for (const s of field.stress) {
        expect(s.intensity).toBeGreaterThanOrEqual(0);
        expect(s.intensity).toBeLessThanOrEqual(1);
        expect(s.width).toBeGreaterThan(0);
      }
    }
  });

  it("counts only concentrations above the visible floor", () => {
    const field = sampleFieldTelemetry(12);
    expect(field.activeStress).toBe(
      field.stress.filter((s) => s.intensity >= STRESS_FLOOR).length,
    );
  });

  it("actually varies: stress count moves over a session", () => {
    const counts = new Set<number>();
    for (let t = 0; t < 300; t += 2) counts.add(sampleFieldTelemetry(t).activeStress);
    expect(counts.size).toBeGreaterThan(1);
  });
});

describe("formatFieldReadings", () => {
  it("formats the bench line with tabular two-decimal readings", () => {
    const field = sampleFieldTelemetry(0);
    const { line } = formatFieldReadings(field);
    expect(line).toMatch(/^WALL \d\.\d{2} · EVEN \d\.\d{2} · STRESS \d$/);
  });

  it("mirrors the readings as a full sentence and pluralizes", () => {
    const base = sampleFieldTelemetry(0);
    const one = formatFieldReadings({ ...base, activeStress: 1 });
    expect(one.mirror).toContain("1 stress concentration on watch");
    const two = formatFieldReadings({ ...base, activeStress: 2 });
    expect(two.mirror).toContain("2 stress concentrations on watch");
  });
});

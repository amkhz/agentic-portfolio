import { describe, expect, it } from "vitest";
import {
  bearingDegrees,
  formatFieldReadings,
  formatStressLanes,
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

describe("bearingDegrees", () => {
  it("reads the display clock face: 12 o'clock zero, clockwise", () => {
    expect(bearingDegrees(Math.PI / 2)).toBe(0); // up
    expect(bearingDegrees(0)).toBe(90); // right
    expect(bearingDegrees(-Math.PI / 2)).toBe(180); // down
    expect(bearingDegrees(Math.PI)).toBe(270); // left
  });

  it("normalizes any angle into 0-359", () => {
    for (let a = -20; a < 20; a += 0.37) {
      const deg = bearingDegrees(a);
      expect(deg).toBeGreaterThanOrEqual(0);
      expect(deg).toBeLessThan(360);
      expect(Number.isInteger(deg)).toBe(true);
    }
  });
});

describe("formatStressLanes", () => {
  it("keeps slot order with stable labels and tabular fields", () => {
    const lanes = formatStressLanes(sampleFieldTelemetry(7));
    expect(lanes.map((lane) => lane.label)).toEqual(["ST 1", "ST 2", "ST 3"]);
    for (const lane of lanes) {
      expect(lane.bearing).toMatch(/^\d{3}$/);
      expect(lane.intensity).toMatch(/^\d\.\d{2}$/);
    }
  });

  it("marks the watch state at the same floor the count uses", () => {
    const field = sampleFieldTelemetry(12);
    const lanes = formatStressLanes(field);
    lanes.forEach((lane, i) => {
      expect(lane.onWatch).toBe(field.stress[i].intensity >= STRESS_FLOOR);
    });
    expect(lanes.filter((lane) => lane.onWatch).length).toBe(
      field.activeStress,
    );
  });

  it("mirrors each lane as a full sentence", () => {
    const base = sampleFieldTelemetry(0);
    const watched = formatStressLanes({
      ...base,
      stress: [
        { angle: Math.PI / 2, width: 0.3, intensity: 0.62 },
        base.stress[1],
        { angle: 0, width: 0.3, intensity: 0.05 },
      ],
    });
    expect(watched[0].mirror).toBe(
      "Stress concentration 1: bearing 0 degrees, intensity 0.62, on watch.",
    );
    expect(watched[2].mirror).toBe(
      "Stress concentration 3: bearing 90 degrees, intensity 0.05, below the watch floor.",
    );
  });
});

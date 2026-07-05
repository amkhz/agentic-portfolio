import { describe, expect, it } from "vitest";
import {
  formatVacuumReadings,
  MARGIN_FLOOR,
  sampleVacuumTelemetry,
} from "./vacuum";

describe("sampleVacuumTelemetry", () => {
  it("is deterministic in time", () => {
    expect(sampleVacuumTelemetry(42.5)).toEqual(sampleVacuumTelemetry(42.5));
  });

  it("keeps the margin positive across a long nominal session", () => {
    for (let t = 0; t < 600; t += 1.3) {
      const v = sampleVacuumTelemetry(t);
      expect(v.margin).toBeGreaterThan(MARGIN_FLOOR);
      expect(v.margin).toBeCloseTo(v.extraction - v.demand, 12);
      expect(v.extraction).toBeGreaterThan(0.25);
      expect(v.extraction).toBeLessThan(0.4);
      expect(v.demand).toBeGreaterThan(0.25);
      expect(v.demand).toBeLessThan(0.35);
    }
  });

  it("actually breathes: the margin moves over a session", () => {
    const margins = new Set<string>();
    for (let t = 0; t < 300; t += 10) {
      margins.add(sampleVacuumTelemetry(t).margin.toFixed(3));
    }
    expect(margins.size).toBeGreaterThan(3);
  });
});

describe("formatVacuumReadings", () => {
  it("formats the bench line at three decimals with a signed margin", () => {
    const { line } = formatVacuumReadings(sampleVacuumTelemetry(0));
    expect(line).toMatch(
      /^VAC 0\.\d{3} · DRAW 0\.\d{3} · MGN \+0\.\d{3}$/,
    );
  });

  it("mirrors the readings as a full sentence and keeps the sign", () => {
    const { mirror } = formatVacuumReadings({
      extraction: 0.318,
      demand: 0.284,
      margin: 0.034,
    });
    expect(mirror).toBe(
      "Vacuum energy nominal. Extraction 0.318 of rated draw, " +
        "bubble demand 0.284, margin +0.034.",
    );
    const pinched = formatVacuumReadings({
      extraction: 0.28,
      demand: 0.31,
      margin: -0.03,
    });
    expect(pinched.line).toContain("MGN -0.030");
  });

  it("speaks the honest status at the floor and below zero", () => {
    expect(
      formatVacuumReadings({ extraction: 0.3, demand: 0.295, margin: 0.005 })
        .mirror,
    ).toContain("Vacuum energy margin pinched.");
    expect(
      formatVacuumReadings({ extraction: 0.28, demand: 0.31, margin: -0.03 })
        .mirror,
    ).toContain("Vacuum energy demand over extraction.");
  });
});

describe("sampleVacuumTelemetry with a disturbance", () => {
  it("rides the adversarial delta on the same nominal shape", () => {
    const t = 47;
    const base = sampleVacuumTelemetry(t);
    const pushed = sampleVacuumTelemetry(t, null, {
      demand: 0.1,
      extraction: 0.04,
    });
    expect(pushed.demand).toBeCloseTo(base.demand + 0.1, 12);
    expect(pushed.extraction).toBeCloseTo(base.extraction + 0.04, 12);
    expect(pushed.margin).toBeCloseTo(base.margin - 0.06, 12);
  });
});

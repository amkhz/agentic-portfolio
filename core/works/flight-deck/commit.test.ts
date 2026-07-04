import { describe, expect, it } from "vitest";
import {
  COMMIT_DONE_S,
  COMMIT_HOLD_GLOW,
  COMMIT_LAG_S,
  commitGlow,
  commitResponse,
  orientationCommitDelta,
  vacuumCommitDelta,
  type CommitTrim,
} from "./commit";
import { sampleVacuumTelemetry } from "./vacuum";
import { sampleOrientation } from "./orientation";

const trim: CommitTrim = {
  atSeconds: 100,
  bearing: 0.7,
  urgency: 0.85,
  draw: 0.03,
};

describe("commitResponse", () => {
  it("holds the lag open: zero consequence until the lag has passed", () => {
    expect(commitResponse(-1)).toBe(0);
    expect(commitResponse(0)).toBe(0);
    expect(commitResponse(COMMIT_LAG_S - 0.01)).toBe(0);
    expect(commitResponse(COMMIT_LAG_S + 0.4)).toBeGreaterThan(0);
  });

  it("blooms, settles, and is spent by COMMIT_DONE_S", () => {
    const peak = commitResponse(COMMIT_LAG_S + 1.2);
    expect(peak).toBeGreaterThan(0.95);
    expect(commitResponse(COMMIT_LAG_S + 8)).toBeLessThan(peak);
    expect(commitResponse(COMMIT_DONE_S - 0.01)).toBeLessThan(0.02);
    expect(commitResponse(COMMIT_DONE_S)).toBe(0);
  });
});

describe("commitGlow", () => {
  it("holds the received substance through the lag, then hands over", () => {
    expect(commitGlow(-0.1)).toBe(0);
    expect(commitGlow(0.1)).toBe(COMMIT_HOLD_GLOW);
    expect(commitGlow(COMMIT_LAG_S - 0.01)).toBe(COMMIT_HOLD_GLOW);
    // Never dips below the held glow until the deformation owns it.
    for (let dt = 0; dt < COMMIT_LAG_S + 1.2; dt += 0.05) {
      expect(commitGlow(dt)).toBeGreaterThanOrEqual(COMMIT_HOLD_GLOW - 1e-9);
    }
    expect(commitGlow(COMMIT_DONE_S)).toBe(0);
  });
});

describe("orientationCommitDelta", () => {
  it("is inert without a trim and during the lag", () => {
    expect(orientationCommitDelta(100.3, null)).toEqual({
      bank: 0,
      pitch: 0,
      flow: 0,
    });
    expect(orientationCommitDelta(trim.atSeconds + 0.3, trim).bank).toBe(0);
  });

  it("banks into the committed side and settles back to level", () => {
    const during = orientationCommitDelta(trim.atSeconds + 2, trim);
    expect(during.bank).toBeGreaterThan(1);
    expect(during.flow).toBeGreaterThan(0);
    const leftTrim = { ...trim, bearing: Math.PI };
    expect(orientationCommitDelta(trim.atSeconds + 2, leftTrim).bank)
      .toBeLessThan(0);
    const after = orientationCommitDelta(trim.atSeconds + COMMIT_DONE_S, trim);
    expect(after).toEqual({ bank: 0, pitch: 0, flow: 0 });
  });
});

describe("vacuumCommitDelta", () => {
  it("never lets extraction outrun demand, so the pinch cannot flip", () => {
    for (let dt = 0; dt < COMMIT_DONE_S + 1; dt += 0.1) {
      const d = vacuumCommitDelta(trim.atSeconds + dt, trim);
      expect(d.extraction).toBeLessThanOrEqual(d.demand + 1e-12);
      expect(d.demand).toBeGreaterThanOrEqual(0);
    }
  });

  it("pinches the margin after a commit but never below zero", () => {
    // Scan commit times across a nominal session and take the worst case.
    let worst = Infinity;
    for (let at = 0; at < 300; at += 7.3) {
      const t = { ...trim, atSeconds: at };
      for (let dt = 0; dt < COMMIT_DONE_S; dt += 0.25) {
        worst = Math.min(worst, sampleVacuumTelemetry(at + dt, t).margin);
      }
    }
    expect(worst).toBeGreaterThan(0);
    // And it genuinely pinches: the worst case is below the nominal floor
    // neighborhood, which is the gauge's expanded strip earning its keep.
    expect(worst).toBeLessThan(0.02);
  });
});

describe("samplers with a trim", () => {
  it("stay deterministic in (t, trim)", () => {
    expect(sampleOrientation(103, trim)).toEqual(sampleOrientation(103, trim));
    expect(sampleVacuumTelemetry(103, trim)).toEqual(
      sampleVacuumTelemetry(103, trim),
    );
  });

  it("match the trimless sample once the maneuver is spent", () => {
    const t = trim.atSeconds + COMMIT_DONE_S + 1;
    expect(sampleOrientation(t, trim)).toEqual(sampleOrientation(t));
    expect(sampleVacuumTelemetry(t, trim)).toEqual(sampleVacuumTelemetry(t));
  });
});

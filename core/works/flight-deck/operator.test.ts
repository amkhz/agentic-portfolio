import { describe, expect, it } from "vitest";
import { COMMIT_DONE_S, commitOperatorDelta, type CommitTrim } from "./commit";
import { drillOperatorDelta, operatorLoadAt } from "./drillEnvelopes";
import type { DrillTimeline } from "./drillEnvelopes";
import {
  COHERENCE_STEADY_FLOOR,
  formatOperatorReadings,
  operatorStatus,
  sampleOperator,
} from "./operator";

describe("sampleOperator", () => {
  it("is deterministic in t", () => {
    expect(sampleOperator(42.5)).toEqual(sampleOperator(42.5));
  });

  it("holds nominal human ranges across a long session", () => {
    for (let t = 0; t < 600; t += 1.7) {
      const o = sampleOperator(t);
      expect(o.blink).toBeGreaterThan(13);
      expect(o.blink).toBeLessThan(21);
      expect(o.respiration).toBeGreaterThan(11);
      expect(o.respiration).toBeLessThan(15);
      expect(o.coherence).toBeGreaterThan(COHERENCE_STEADY_FLOOR);
      expect(o.coherence).toBeLessThan(0.85);
      expect(Math.abs(o.breath)).toBeLessThanOrEqual(1);
      expect(operatorStatus(o)).toBe("steady");
    }
  });

  it("actually breathes: the waveform crosses zero on a human cadence", () => {
    let crossings = 0;
    let prev = sampleOperator(0).breath;
    for (let t = 0.1; t < 60; t += 0.1) {
      const b = sampleOperator(t).breath;
      if ((prev < 0 && b >= 0) || (prev > 0 && b <= 0)) crossings += 1;
      prev = b;
    }
    // ~13 breaths/min is ~26 zero crossings a minute; allow the drift.
    expect(crossings).toBeGreaterThan(18);
    expect(crossings).toBeLessThan(36);
  });

  it("takes the drill's load: blink drops, respiration rises, coherence falls", () => {
    const tl: DrillTimeline = {
      beatAt: { "warning-collapse": 100 },
      resolvedAt: {},
    };
    const t = 110; // the warning's plateau
    const calm = sampleOperator(t);
    const loaded = sampleOperator(t, drillOperatorDelta(t, tl));
    expect(loaded.blink).toBeLessThan(calm.blink - 4);
    expect(loaded.respiration).toBeGreaterThan(calm.respiration + 2);
    expect(loaded.coherence).toBeLessThan(calm.coherence - 0.1);
    expect(operatorStatus(loaded)).toBe("working");
  });

  it("settles after the machinery does (beat 6: the strip settles too)", () => {
    const tl: DrillTimeline = {
      beatAt: { "warning-collapse": 100 },
      resolvedAt: { "warning-collapse": 120 },
    };
    // Shortly after resolution the operator is still coming down.
    const early = drillOperatorDelta(121.5, tl);
    expect(early.coherence).toBeLessThan(-0.1);
    // Long after, the watcher is level again.
    const late = drillOperatorDelta(170, tl);
    expect(Math.abs(late.coherence)).toBeLessThan(0.01);
    expect(operatorStatus(sampleOperator(170, late))).toBe("steady");
  });
});

describe("the commit's cost on the watcher", () => {
  const trim: CommitTrim = { atSeconds: 50, bearing: 1, urgency: 0.6, draw: 0.02 };

  it("stirs the traces when the ship moves, then spends itself", () => {
    const during = commitOperatorDelta(54, trim);
    expect(during.blink).toBeLessThan(-0.5);
    expect(during.respiration).toBeGreaterThan(0.2);
    // A commit is work, never an upset: the operator stays steady.
    const loaded = sampleOperator(54, during);
    expect(operatorStatus(loaded)).toBe("steady");
    // Spent with the maneuver, exactly zero after the envelope.
    expect(commitOperatorDelta(50 + COMMIT_DONE_S, trim)).toEqual({
      blink: 0,
      respiration: 0,
      coherence: 0,
    });
  });

  it("operatorLoadAt sums the drill and the maneuver", () => {
    const tl: DrillTimeline = { beatAt: { "caution-asymmetry": 40 }, resolvedAt: {} };
    const both = operatorLoadAt(54, tl, trim);
    const drillOnly = drillOperatorDelta(54, tl);
    const commitOnly = commitOperatorDelta(54, trim);
    expect(both.blink).toBeCloseTo(drillOnly.blink + commitOnly.blink, 10);
    expect(both.respiration).toBeCloseTo(
      drillOnly.respiration + commitOnly.respiration,
      10,
    );
    // With no commit riding, the drill's delta passes straight through.
    expect(operatorLoadAt(54, tl, null)).toEqual(drillOnly);
    // Fully quiet inputs share the zero reference: no per-frame garbage.
    expect(operatorLoadAt(54, null, null)).toBe(drillOperatorDelta(54, null));
  });
});

describe("formatOperatorReadings", () => {
  it("mirrors the line as a sentence and marks the promoted state", () => {
    const o = sampleOperator(30);
    const watcher = formatOperatorReadings(o);
    expect(watcher.line).toMatch(/^BLINK \d+ · RESP \d+\.\d · COH 0\.\d{2}$/);
    expect(watcher.mirror).toMatch(/^Operator state steady\./);
    const promoted = formatOperatorReadings(o, true);
    expect(promoted.mirror).toContain("holding the controls");
  });
});

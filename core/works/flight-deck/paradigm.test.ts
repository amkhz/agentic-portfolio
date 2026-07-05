import { describe, expect, it } from "vitest";
import { paradigmRegime } from "./machine";
import {
  crossedRegime,
  dissolveAt,
  LIGHT_FLOOR,
  paradigmScore,
  REGIME_CENTERS,
  REGIME_ORDER,
} from "./paradigm";

describe("dissolveAt", () => {
  it("holds the full instrumented deck at 0", () => {
    const env = dissolveAt(0);
    expect(env.light).toBe(1);
    expect(env.hero).toBe(1);
    expect(env.telemetry).toBe(1);
    expect(env.panel).toBe(1);
    expect(env.promotion).toBe(0);
    expect(env.coupling).toBe(0);
  });

  it("rests the consciousness chamber at 1: nearly dark, never black", () => {
    const env = dissolveAt(1);
    expect(env.light).toBeCloseTo(LIGHT_FLOOR, 10);
    expect(env.light).toBeGreaterThan(0.1);
    expect(env.hero).toBeGreaterThan(0.2); // the coupled render stays a ghost
    expect(env.telemetry).toBeLessThan(0.15);
    expect(env.panel).toBe(0);
    expect(env.promotion).toBe(1);
    expect(env.coupling).toBe(1);
  });

  it("is continuous: a slow full drag reads as one dissolve", () => {
    let prev = dissolveAt(0);
    for (let p = 0.002; p <= 1; p += 0.002) {
      const env = dissolveAt(p);
      for (const key of Object.keys(env) as (keyof typeof env)[]) {
        expect(Math.abs(env[key] - prev[key])).toBeLessThan(0.02);
      }
      prev = env;
    }
  });

  it("is monotonic along the drag: nothing flickers back", () => {
    let prev = dissolveAt(0);
    for (let p = 0.01; p <= 1; p += 0.01) {
      const env = dissolveAt(p);
      expect(env.light).toBeLessThanOrEqual(prev.light);
      expect(env.hero).toBeLessThanOrEqual(prev.hero);
      expect(env.telemetry).toBeLessThanOrEqual(prev.telemetry);
      expect(env.panel).toBeLessThanOrEqual(prev.panel);
      expect(env.promotion).toBeGreaterThanOrEqual(prev.promotion);
      expect(env.coupling).toBeGreaterThanOrEqual(prev.coupling);
      prev = env;
    }
  });

  it("lets go of the translation layer first and the hero last", () => {
    const mid = dissolveAt(0.5);
    expect(mid.panel).toBe(0);
    expect(mid.hero).toBeGreaterThan(0.7);
    expect(mid.telemetry).toBeGreaterThan(mid.panel);
  });

  it("keeps the coupling a consciousness-only phenomenon", () => {
    for (let p = 0; p < 2 / 3; p += 0.01) {
      expect(dissolveAt(p).coupling).toBe(0);
    }
    expect(dissolveAt(0.99).coupling).toBeGreaterThan(0.9);
  });

  it("clamps out-of-range positions", () => {
    expect(dissolveAt(-0.5)).toEqual(dissolveAt(0));
    expect(dissolveAt(1.5)).toEqual(dissolveAt(1));
  });
});

describe("crossedRegime", () => {
  it("reports a crossing with both sides, in drag order", () => {
    expect(crossedRegime(0.2, 0.4)).toEqual({
      from: "instrumented",
      to: "hybrid",
    });
    expect(crossedRegime(0.7, 0.5)).toEqual({
      from: "consciousness",
      to: "hybrid",
    });
  });

  it("is null within a regime and agrees with the machine's boundaries", () => {
    expect(crossedRegime(0.1, 0.3)).toBeNull();
    for (const p of [0.1, 0.5, 0.9]) {
      expect(paradigmRegime(p)).toBe(
        crossedRegime(0, p)?.to ?? "instrumented",
      );
    }
  });
});

describe("paradigmScore", () => {
  it("keeps the chamber's arrival inside a patient breath", () => {
    const c = paradigmScore.chamber;
    const total = c.handoffMs + c.bloomMs + c.captionMs;
    expect(total).toBeGreaterThan(1200);
    expect(total).toBeLessThan(2400);
  });

  it("debounces speech shorter than the pulse's full breath", () => {
    // Speech settles just after the last crossing's pulse peaks, so a
    // wiggle never queues stale regime names behind the live one.
    expect(paradigmScore.announceDebounceMs).toBeGreaterThan(
      paradigmScore.pulse.toMs,
    );
    expect(paradigmScore.announceDebounceMs).toBeLessThan(
      paradigmScore.pulse.toMs + paradigmScore.pulse.backMs,
    );
  });
});

describe("regime geometry", () => {
  it("walks the spectrum in order, each center inside its own regime", () => {
    expect(
      REGIME_ORDER.map((r) => paradigmRegime(REGIME_CENTERS[r])),
    ).toEqual([...REGIME_ORDER]);
    const centers = REGIME_ORDER.map((r) => REGIME_CENTERS[r]);
    expect([...centers].sort((a, b) => a - b)).toEqual(centers);
  });
});

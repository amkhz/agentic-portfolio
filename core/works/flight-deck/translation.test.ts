import { describe, expect, it } from "vitest";
import {
  DEFAULT_INTENT,
  DESTINATIONS,
  formatUtilization,
  proposeTrajectories,
  RISKS,
  TIMELINES,
  UTIL_A2,
  UTIL_CEILING,
  utilizationAt,
} from "./translation";

describe("proposeTrajectories", () => {
  it("drafts three proposals, deterministic per intent", () => {
    const a = proposeTrajectories(DEFAULT_INTENT);
    expect(a).toHaveLength(3);
    expect(a.map((p) => p.style)).toEqual(["direct", "sweep", "drift"]);
    expect(a).toEqual(proposeTrajectories(DEFAULT_INTENT));
  });

  it("keeps every proposal inside the deck's physical language", () => {
    for (const destination of DESTINATIONS) {
      for (const timeline of TIMELINES) {
        for (const risk of RISKS) {
          const proposals = proposeTrajectories({
            destination: destination.id,
            timeline: timeline.id,
            risk: risk.id,
          });
          for (const p of proposals) {
            expect(p.bearing).toBeGreaterThanOrEqual(0);
            expect(p.bearing).toBeLessThan(Math.PI * 2);
            expect(p.urgency).toBeGreaterThan(0);
            expect(p.urgency).toBeLessThanOrEqual(1);
            // Draw stays small enough that a commit pinches the vacuum
            // margin without flipping it (commit.test.ts proves the pair).
            expect(p.draw).toBeGreaterThan(0);
            expect(p.draw).toBeLessThanOrEqual(0.03);
            expect(p.summary.length).toBeGreaterThan(20);
            expect(p.summary).not.toContain("--");
            expect(p.route.length).toBeGreaterThanOrEqual(4);
            expect(p.route[0].x).toBe(0);
            expect(p.route[p.route.length - 1].x).toBe(1);
          }
        }
      }
    }
  });

  it("orders temperaments by cost: direct spends most, drift least", () => {
    const [direct, sweep, drift] = proposeTrajectories(DEFAULT_INTENT);
    expect(direct.draw).toBeGreaterThan(sweep.draw);
    expect(sweep.draw).toBeGreaterThan(drift.draw);
    expect(direct.utilizationCost).toBeGreaterThan(drift.utilizationCost);
  });
});

describe("utilizationAt", () => {
  it("keeps the monitoring baseline under the band's midpoint", () => {
    for (let t = 0; t < 600; t += 3.1) {
      const u = utilizationAt(t, []);
      expect(u).toBeGreaterThan(0.35);
      expect(u).toBeLessThan(UTIL_A2.to);
    }
  });

  it("spikes on an event and settles back", () => {
    const events = [{ at: 100, cost: 0.18 }];
    const before = utilizationAt(99, events);
    const during = utilizationAt(100.5, events);
    const after = utilizationAt(140, events);
    expect(during).toBeGreaterThan(before + 0.12);
    expect(after).toBeLessThan(before + 0.02);
  });

  it("clamps under 0.97 no matter how busy the session gets", () => {
    const events = Array.from({ length: 30 }, (_, i) => ({
      at: 100 + i * 0.1,
      cost: 0.2,
    }));
    expect(utilizationAt(103.2, events)).toBeLessThanOrEqual(0.97);
  });
});

describe("formatUtilization", () => {
  it("formats the bench line and flags the ceiling in words", () => {
    const inBand = formatUtilization(0.54);
    expect(inBand.line).toBe("UTIL 0.54");
    expect(inBand.over).toBe(false);
    expect(inBand.mirror).toContain("inside the working band");
    const over = formatUtilization(UTIL_CEILING + 0.05);
    expect(over.over).toBe(true);
    expect(over.mirror).toContain("slowing its asks");
  });
});

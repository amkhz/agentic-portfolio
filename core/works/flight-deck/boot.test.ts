import { describe, expect, it } from "vitest";
import {
  bootScore,
  certificationDurationMs,
  SEVERITY_ORDER,
} from "./boot";

describe("bootScore", () => {
  it("certifies lamps in severity order, advisory first, warning last", () => {
    expect(SEVERITY_ORDER).toEqual(["advisory", "caution", "warning"]);
  });

  it("keeps every beat a positive duration", () => {
    const flat = [
      bootScore.hold.durationMs,
      ...Object.values(bootScore.certification),
      bootScore.settle.durationMs,
      bootScore.settle.staggerMs,
      bootScore.emission.bloomMs,
      bootScore.emission.holdMs,
    ];
    for (const ms of flat) expect(ms).toBeGreaterThan(0);
  });

  it("release runs the wake backward faster than the hold ran forward", () => {
    expect(bootScore.hold.releaseReturnRate).toBeGreaterThan(1);
  });

  it("sums one instrument's certification from its beats", () => {
    expect(certificationDurationMs()).toBe(850 + 3 * 140 + 2 * 80 + 420 + 360);
  });
});

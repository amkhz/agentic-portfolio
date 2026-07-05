import { describe, expect, it } from "vitest";
import { ringScale, sampleFieldTelemetry } from "@core/works/flight-deck/field";
import {
  annotationPresence,
  ANNOT_ASPECT_FOOT,
  ANNOT_ASPECT_FULL,
  projectFieldPoint,
  projectStressAnchors,
  ringRadius,
} from "./fieldAnnotation";
import { FIELD_MOTION_DEFAULTS } from "./fieldMotion";

// The projection must mirror the shader transform exactly; these tests
// pin the invariants (anchor guard regime, y flip, zoom scale) so a
// shader edit that forgets this inverse fails loudly instead of letting
// the leader lines drift off the render.

const m = FIELD_MOTION_DEFAULTS;

describe("annotationPresence", () => {
  it("stays dark on a square hero and saturates once the width is earned", () => {
    expect(annotationPresence(1.0)).toBe(0);
    expect(annotationPresence(ANNOT_ASPECT_FOOT)).toBe(0);
    expect(annotationPresence(ANNOT_ASPECT_FULL)).toBe(1);
    expect(annotationPresence(3.2)).toBe(1);
    const mid = annotationPresence(
      (ANNOT_ASPECT_FOOT + ANNOT_ASPECT_FULL) / 2,
    );
    expect(mid).toBeGreaterThan(0);
    expect(mid).toBeLessThan(1);
  });
});

describe("ringRadius", () => {
  it("matches the shader centerline at rest terms", () => {
    // At t=0 the breath term is zero; only the two harmonics remain.
    const theta = 0.9;
    const expected =
      0.74 + 0.018 * Math.sin(2 * theta) + 0.01 * Math.sin(3 * theta + 1.3);
    expect(ringRadius(theta, 0, 1, m)).toBeCloseTo(expected, 12);
  });

  it("wobbles harder as evenness drops, like the shader", () => {
    const spread = (even: number) => {
      let min = Infinity;
      let max = -Infinity;
      for (let theta = 0; theta < Math.PI * 2; theta += 0.05) {
        const r = ringRadius(theta, 0, even, m);
        min = Math.min(min, r);
        max = Math.max(max, r);
      }
      return max - min;
    };
    expect(spread(0.9)).toBeGreaterThan(spread(1));
  });
});

describe("projectFieldPoint", () => {
  it("flips GL v-up to CSS y-down", () => {
    // A point above the field center must land above canvas midline.
    const up = projectFieldPoint(0.74, Math.PI / 2, m, 900, 300);
    expect(up.y).toBeLessThan(150);
    const down = projectFieldPoint(0.74, -Math.PI / 2, m, 900, 300);
    expect(down.y).toBeGreaterThan(150);
  });

  it("applies the anchor guard on wide benches and releases it on square ones", () => {
    // centerX is negative: on a wide bench the ring center sits left of
    // the canvas midline; on a square hero the guard recenters it.
    const wide = projectFieldPoint(0, 0, m, 900, 300); // aspect 3
    expect(wide.x).toBeLessThan(450);
    expect(wide.x).toBeCloseTo(
      (m.centerX / (3 * m.zoom) + 0.5) * 900,
      6,
    );
    const square = projectFieldPoint(0, 0, m, 300, 300); // aspect 1
    expect(square.x).toBeCloseTo(150, 6);
    expect(square.y).toBeCloseTo(150, 6);
  });

  it("scales with zoom: a larger zoom pulls points toward center", () => {
    const near = projectFieldPoint(0.74, 0, { ...m, centerX: 0 }, 900, 300);
    const far = projectFieldPoint(
      0.74,
      0,
      { ...m, centerX: 0, zoom: m.zoom * 2 },
      900,
      300,
    );
    expect(Math.abs(far.x - 450)).toBeLessThan(Math.abs(near.x - 450));
  });
});

describe("projectStressAnchors", () => {
  it("returns one caliper per tracked slot, on the wall, in slot order", () => {
    const field = sampleFieldTelemetry(30);
    const anchors = projectStressAnchors(field, 30, m, 1200, 400);
    expect(anchors).toHaveLength(3);
    anchors.forEach((anchor, i) => {
      expect(anchor.intensity).toBe(field.stress[i].intensity);
      // The caliper ends straddle its center along the wall.
      expect(anchor.from).not.toEqual(anchor.to);
      const width = 1200;
      const height = 400;
      for (const p of [anchor.at, anchor.from, anchor.to]) {
        expect(p.x).toBeGreaterThan(-width);
        expect(p.x).toBeLessThan(width);
        expect(p.y).toBeGreaterThan(-height);
        expect(p.y).toBeLessThan(height * 2);
      }
    });
  });

  it("is deterministic in time, like the field itself", () => {
    const field = sampleFieldTelemetry(12.5);
    expect(projectStressAnchors(field, 12.5, m, 1200, 400)).toEqual(
      projectStressAnchors(field, 12.5, m, 1200, 400),
    );
  });

  it("stays glued to the sliced ring: scale contracts anchors toward center (Works 01.1)", () => {
    // The projection identity off the reference plane: an anchor at
    // slice s must sit exactly ringScale(s) of the way from the ring
    // center to its reference-plane position (the shader multiplies
    // the whole centerline by the same core function).
    const t = 30;
    const s = 0.6;
    const scale = ringScale(s);
    const sliced = sampleFieldTelemetry(t, null, s);
    const width = 1200;
    const height = 400;
    const center = projectFieldPoint(0, 0, m, width, height);
    // Same sample, unscaled: isolates the scale term exactly (the
    // sliced sample's own evenness drives the wobble in both).
    const refAnchors = projectStressAnchors(sliced, t, m, width, height, 1);
    const slicedAnchors = projectStressAnchors(
      sliced,
      t,
      m,
      width,
      height,
      scale,
    );
    slicedAnchors.forEach((anchor, i) => {
      // Angles are slice-independent, so the contraction is exact.
      expect(anchor.at.x - center.x).toBeCloseTo(
        (refAnchors[i].at.x - center.x) * scale,
        8,
      );
      expect(anchor.at.y - center.y).toBeCloseTo(
        (refAnchors[i].at.y - center.y) * scale,
        8,
      );
    });
  });

  it("keeps the reference plane exactly as before (scale default 1)", () => {
    const field = sampleFieldTelemetry(12.5);
    expect(projectStressAnchors(field, 12.5, m, 1200, 400, 1)).toEqual(
      projectStressAnchors(field, 12.5, m, 1200, 400),
    );
  });
});

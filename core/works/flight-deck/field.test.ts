import { describe, expect, it } from "vitest";
import {
  axialRidgeMarks,
  bearingDegrees,
  describeSlicePlane,
  fieldStatus,
  formatFieldReadings,
  formatSlicePlane,
  formatStressLanes,
  ringScale,
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
    expect(line).toMatch(
      /^WALL \d\.\d{2} · EVEN \d\.\d{2} · STRESS \d · PLANE REF$/,
    );
  });

  it("names the displayed plane on the line and speaks it in the mirror", () => {
    const fore = formatFieldReadings(sampleFieldTelemetry(5, null, 0.3));
    expect(fore.line).toContain("PLANE +0.30");
    expect(fore.mirror).toContain("0.30 toward the bow.");
    const aft = formatFieldReadings(sampleFieldTelemetry(5, null, -0.3));
    expect(aft.line).toContain("PLANE -0.30");
    expect(aft.mirror).toContain("0.30 toward the stern.");
    const ref = formatFieldReadings(sampleFieldTelemetry(5));
    expect(ref.mirror).toContain("At the reference plane.");
  });

  it("mirrors the readings as a full sentence and pluralizes", () => {
    const base = sampleFieldTelemetry(0);
    const one = formatFieldReadings({ ...base, activeStress: 1 });
    expect(one.mirror).toContain("1 stress concentration on watch");
    const two = formatFieldReadings({ ...base, activeStress: 2 });
    expect(two.mirror).toContain("2 stress concentrations on watch");
  });

  it("speaks off nominal when a disturbance crosses the bands", () => {
    const nominal = sampleFieldTelemetry(10);
    expect(formatFieldReadings(nominal).mirror).toContain(
      "Field integrity nominal.",
    );
    const thinned = sampleFieldTelemetry(10, {
      wall: -0.09,
      even: 0,
      stress: [0, 0, 0],
    });
    expect(formatFieldReadings(thinned).mirror).toContain(
      "Field integrity off nominal.",
    );
  });
});

describe("sampleFieldTelemetry with a disturbance", () => {
  it("adds the delta onto the same nominal shape and clamps intensity", () => {
    const t = 33;
    const base = sampleFieldTelemetry(t);
    const pushed = sampleFieldTelemetry(t, {
      wall: -0.05,
      even: -0.03,
      stress: [0, 2, 0],
    });
    expect(pushed.wall).toBeCloseTo(base.wall - 0.05, 12);
    expect(pushed.even).toBeCloseTo(base.even - 0.03, 12);
    expect(pushed.stress[1].intensity).toBe(1);
    expect(pushed.stress[0].intensity).toBeCloseTo(
      base.stress[0].intensity,
      12,
    );
  });
});

describe("the slice plane (Works 01.1)", () => {
  it("ringScale is 1 at the reference plane, floored at the poles", () => {
    expect(ringScale(0)).toBe(1);
    expect(ringScale(1)).toBe(0.35);
    expect(ringScale(-1)).toBe(0.35);
    let prev = ringScale(0);
    for (let s = 0.05; s <= 1; s += 0.05) {
      const scale = ringScale(s);
      expect(scale).toBeLessThanOrEqual(prev);
      expect(scale).toBeGreaterThanOrEqual(0.35);
      expect(scale).toBe(ringScale(-s));
      prev = scale;
    }
  });

  it("the reference plane is exactly today's display (s = 0 identity)", () => {
    for (let t = 0; t < 200; t += 3.3) {
      const legacy = sampleFieldTelemetry(t, {
        wall: -0.02,
        even: -0.01,
        stress: [0.1, 0, 0.2],
      });
      const sliced = sampleFieldTelemetry(
        t,
        { wall: -0.02, even: -0.01, stress: [0.1, 0, 0.2] },
        0,
      );
      expect(sliced.wall).toBe(legacy.wall);
      expect(sliced.even).toBe(legacy.even);
      expect(sliced.stress).toEqual(legacy.stress);
      expect(sliced.activeStress).toBe(legacy.activeStress);
    }
  });

  it("a nominal session never reads off nominal at any plane", () => {
    for (let t = 0; t < 400; t += 7.1) {
      for (let s = -1; s <= 1; s += 0.2) {
        const field = sampleFieldTelemetry(t, null, s);
        expect(fieldStatus(field)).toBe("nominal");
        expect(field.wall).toBeLessThanOrEqual(1.005);
        expect(field.even).toBeLessThanOrEqual(0.995);
      }
    }
  });

  it("the flank ridge is invisible at the reference plane", () => {
    for (let t = 0; t < 400; t += 5.3) {
      expect(sampleFieldTelemetry(t).flank.intensity).toBeLessThan(0.05);
    }
  });

  it("sweeping finds the flank ridge above the watch floor", () => {
    for (let t = 0; t < 200; t += 23) {
      let max = 0;
      for (let s = -1; s <= 1; s += 0.05) {
        max = Math.max(max, sampleFieldTelemetry(t, null, s).flank.intensity);
      }
      expect(max).toBeGreaterThanOrEqual(STRESS_FLOOR);
    }
  });

  it("tracked ridges die out along the axis", () => {
    // Far from every ridge's axial home, tracked intensity falls well
    // below its midship value (the sweep shows the ridges are local).
    for (let t = 0; t < 100; t += 11) {
      const mid = sampleFieldTelemetry(t);
      const fore = sampleFieldTelemetry(t, null, 1);
      // Slot 1's home is aft (-0.32): at the fore pole it reads a
      // fraction of midship.
      expect(fore.stress[1].intensity).toBeLessThan(
        Math.max(mid.stress[1].intensity * 0.25, 0.02),
      );
    }
  });

  it("speaks the flank in the mirror only when the cut shows it", () => {
    const t = 30;
    const marks = axialRidgeMarks(t);
    const flankCenter = marks[3].center;
    const onFlank = formatFieldReadings(
      sampleFieldTelemetry(t, null, flankCenter),
    );
    expect(onFlank.mirror).toContain("untracked concentration");
    const ref = formatFieldReadings(sampleFieldTelemetry(t));
    expect(ref.mirror).not.toContain("untracked");
  });

  it("axialRidgeMarks carries three tracked ticks and the flank", () => {
    const marks = axialRidgeMarks(12);
    expect(marks).toHaveLength(4);
    expect(marks.map((m) => m.tracked)).toEqual([true, true, true, false]);
    for (const mark of marks) {
      expect(mark.center).toBeGreaterThanOrEqual(-1);
      expect(mark.center).toBeLessThanOrEqual(1);
    }
  });

  it("clamps the slice into the bubble", () => {
    expect(sampleFieldTelemetry(9, null, 4).slice).toBe(1);
    expect(sampleFieldTelemetry(9, null, -4).slice).toBe(-1);
  });

  it("formats and describes the plane consistently", () => {
    expect(formatSlicePlane(0)).toBe("REF");
    expect(formatSlicePlane(0.3)).toBe("+0.30");
    expect(formatSlicePlane(-0.85)).toBe("-0.85");
    expect(describeSlicePlane(0)).toBe("At the reference plane");
    expect(describeSlicePlane(0.5)).toBe("0.50 toward the bow");
    expect(describeSlicePlane(-0.25)).toBe("0.25 toward the stern");
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

  it("lights the trend from an earlier sample of the same model", () => {
    const now = sampleFieldTelemetry(20);
    const noTrend = formatStressLanes(now);
    expect(noTrend[0].trend).toBeUndefined();
    const earlier = {
      ...now,
      stress: [
        { ...now.stress[0], intensity: now.stress[0].intensity - 0.05 },
        { ...now.stress[1], intensity: now.stress[1].intensity + 0.05 },
        { ...now.stress[2] },
      ] as typeof now.stress,
    };
    const lanes = formatStressLanes(now, earlier);
    expect(lanes[0].trend).toBe("rising");
    expect(lanes[1].trend).toBe("easing");
    expect(lanes[2].trend).toBe("steady");
    expect(lanes[0].mirror).toContain("and rising");
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

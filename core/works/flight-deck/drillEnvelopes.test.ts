import { describe, expect, it } from "vitest";
import {
  drillFieldDelta,
  drillOrientationDelta,
  drillVacuumDelta,
  orientationUpset,
  type DrillTimeline,
} from "./drillEnvelopes";
import {
  EVEN_BAND_FLOOR,
  fieldStatus,
  sampleFieldTelemetry,
  WALL_BAND_FLOOR,
} from "./field";
import { MARGIN_FLOOR, sampleVacuumTelemetry } from "./vacuum";

describe("drill disturbances", () => {
  const START = 120;

  it("are zero without a timeline and before a beat posts", () => {
    expect(drillFieldDelta(50, null)).toEqual({
      wall: 0,
      even: 0,
      stress: [0, 0, 0],
    });
    const tl: DrillTimeline = { beatAt: { "warning-collapse": 100 }, resolvedAt: {} };
    expect(drillVacuumDelta(99, tl)).toEqual({ demand: 0, extraction: 0 });
    expect(drillOrientationDelta(99, tl)).toEqual({ bank: 0, pitch: 0, flow: 0 });
  });

  it("keeps the first advisory inside the nominal bands", () => {
    for (let start = 0; start < 60; start += 3.7) {
      const tl: DrillTimeline = {
        beatAt: { "advisory-drift": start },
        resolvedAt: {},
      };
      const t = start + 8; // plateau
      const field = sampleFieldTelemetry(t, drillFieldDelta(t, tl));
      expect(fieldStatus(field)).toBe("nominal");
    }
  });

  it("pushes evenness out of band for the caution, at the operator's pace", () => {
    for (let start = 0; start < 60; start += 3.7) {
      const tl: DrillTimeline = {
        beatAt: { "caution-asymmetry": start },
        resolvedAt: {},
      };
      for (const dt of [8, 30, 90]) {
        const t = start + dt;
        const field = sampleFieldTelemetry(t, drillFieldDelta(t, tl));
        expect(field.even).toBeLessThan(EVEN_BAND_FLOOR);
        expect(fieldStatus(field)).toBe("off nominal");
      }
    }
  });

  it("thins the wall out of band and heats the caution's lane for the warning", () => {
    for (let start = 0; start < 60; start += 3.7) {
      const tl: DrillTimeline = {
        beatAt: { "warning-collapse": start },
        resolvedAt: {},
      };
      const t = start + 10;
      const field = sampleFieldTelemetry(t, drillFieldDelta(t, tl));
      expect(field.wall).toBeLessThan(WALL_BAND_FLOOR);
      expect(field.stress[1].intensity).toBeGreaterThan(0.55);
      expect(field.stress[1].intensity).toBeLessThanOrEqual(1);
    }
  });

  it("pegs the expanded strip at the surge peak and pinches the plateau", () => {
    for (let start = 0; start < 160; start += 2.3) {
      const tl: DrillTimeline = {
        beatAt: { "warning-collapse": start },
        resolvedAt: {},
      };
      // The transient peak: deviation beyond the strip's ±0.06 window.
      let trough = Infinity;
      for (let dt = 2.6; dt <= 3.8; dt += 0.1) {
        const t = start + dt;
        trough = Math.min(
          trough,
          sampleVacuumTelemetry(t, null, drillVacuumDelta(t, tl)).margin,
        );
      }
      expect(trough).toBeLessThan(-0.06);
      // The held plateau: below the floor until the operator works it.
      for (const dt of [9, 30, 90]) {
        const t = start + dt;
        const v = sampleVacuumTelemetry(t, null, drillVacuumDelta(t, tl));
        expect(v.margin).toBeLessThan(MARGIN_FLOOR);
      }
    }
  });

  it("recovers everything once resolved, vacuum first, field last", () => {
    const tl: DrillTimeline = {
      beatAt: { "warning-collapse": START },
      resolvedAt: { "warning-collapse": START + 20 },
    };
    // Reverse boot echo: shortly after resolution the vacuum has eased
    // further from its plateau than the field has from its own.
    const t = START + 20 + 1.2;
    const vacuumNow = drillVacuumDelta(t, tl).demand;
    const vacuumPlateau = drillVacuumDelta(START + 19, tl).demand;
    const fieldNow = Math.abs(drillFieldDelta(t, tl).wall);
    const fieldPlateau = Math.abs(drillFieldDelta(START + 19, tl).wall);
    expect(vacuumNow / vacuumPlateau).toBeLessThan(fieldNow / fieldPlateau);

    // And long after, the deck is level again.
    const late = START + 20 + 40;
    expect(drillVacuumDelta(late, tl).demand).toBeLessThan(0.001);
    expect(Math.abs(drillFieldDelta(late, tl).wall)).toBeLessThan(0.001);
    const o = drillOrientationDelta(late, tl);
    expect(orientationUpset(o)).toBe(false);
    const v = sampleVacuumTelemetry(late, null, drillVacuumDelta(late, tl));
    expect(v.margin).toBeGreaterThan(MARGIN_FLOOR);
  });

  it("leans the horizon uncommanded for the caution", () => {
    const tl: DrillTimeline = {
      beatAt: { "caution-asymmetry": START },
      resolvedAt: {},
    };
    const delta = drillOrientationDelta(START + 10, tl);
    expect(delta.bank).toBeGreaterThan(2);
    expect(orientationUpset(delta)).toBe(true);
  });
});

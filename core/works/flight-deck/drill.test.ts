import { describe, expect, it } from "vitest";
import {
  betweenBeatsDwellMs,
  drillAlerts,
  drillFieldDelta,
  drillOrientationDelta,
  drillReducer,
  drillResidual,
  drillScore,
  drillVacuumDelta,
  falseAlarmCaption,
  initialDrillProgress,
  laneBClaimedWall,
  orientationUpset,
  type DrillAction,
  type DrillProgress,
  type DrillTimeline,
} from "./drill";
import {
  EVEN_BAND_FLOOR,
  fieldStatus,
  sampleFieldTelemetry,
  WALL_BAND_FLOOR,
} from "./field";
import { MARGIN_FLOOR, sampleVacuumTelemetry } from "./vacuum";

const run = (state: DrillProgress, ...actions: DrillAction[]) =>
  actions.reduce(drillReducer, state);

describe("the drill script", () => {
  it("posts four alerts on the escalation ladder", () => {
    expect(drillAlerts.map((a) => a.severity)).toEqual([
      "advisory",
      "advisory",
      "caution",
      "warning",
    ]);
  });

  it("gives every alert exactly one judgment step, never first", () => {
    for (const alert of drillAlerts) {
      const judgments = alert.steps.filter((s) => s.kind === "judgment");
      expect(judgments).toHaveLength(1);
      expect(alert.steps[0].kind).toBe("system");
      expect(judgments[0].choices?.length).toBeGreaterThan(0);
    }
  });

  it("keeps the false alarm verifiable and unfailable", () => {
    const falseAlarm = drillAlerts[1];
    expect(falseAlarm.crossCheckFromStep).toBeDefined();
    const judgment = falseAlarm.steps.find((s) => s.kind === "judgment");
    const holds = judgment?.choices?.filter((c) => c.holds) ?? [];
    const resolves = judgment?.choices?.filter((c) => !c.holds) ?? [];
    // Looking again is always allowed and never a dead end; dismissal
    // carries the 20-25% principle as its caption.
    expect(holds.length).toBeGreaterThan(0);
    expect(resolves.map((c) => c.response)).toContain(falseAlarmCaption);
  });

  it("gives the warning a genuine choice of redistribution pattern", () => {
    const judgment = drillAlerts[3].steps.find((s) => s.kind === "judgment");
    expect(judgment?.choices?.filter((c) => !c.holds).length).toBeGreaterThan(1);
  });
});

describe("drillReducer", () => {
  const begun = run(initialDrillProgress, { type: "BEGIN" });

  it("walks a full drill", () => {
    let state = begun;
    for (let alert = 0; alert < drillAlerts.length; alert++) {
      expect(state.alertIndex).toBe(alert);
      for (const step of drillAlerts[alert].steps) {
        state =
          step.kind === "system"
            ? run(state, { type: "STEP_DONE" })
            : run(state, {
                type: "JUDGE",
                choiceId: step.choices!.find((c) => !c.holds)!.id,
              });
      }
      expect(state.betweenBeats).toBe(true);
      state = run(state, { type: "BEAT_SETTLED" });
    }
    expect(state.stage).toBe("settling");
    state = run(state, { type: "SETTLE_COMPLETE" });
    expect(state.stage).toBe("residual");
    state = run(state, { type: "ACKNOWLEDGE" });
    expect(state.stage).toBe("done");
  });

  it("never advances the judgment step on STEP_DONE", () => {
    // Walk to the first judgment step of beat 1.
    const atJudgment = run(begun, { type: "STEP_DONE" }, { type: "STEP_DONE" });
    expect(drillAlerts[0].steps[atJudgment.stepIndex].kind).toBe("judgment");
    expect(drillReducer(atJudgment, { type: "STEP_DONE" })).toBe(atJudgment);
  });

  it("holding choices answer but do not advance", () => {
    let state = begun;
    // Resolve beat 1, settle, walk beat 2 to its judgment.
    state = run(
      state,
      { type: "STEP_DONE" },
      { type: "STEP_DONE" },
      { type: "JUDGE", choiceId: "recalibrate" },
      { type: "BEAT_SETTLED" },
      { type: "STEP_DONE" },
      { type: "STEP_DONE" },
    );
    const held = run(state, { type: "JUDGE", choiceId: "recheck" });
    expect(held.stepIndex).toBe(state.stepIndex);
    expect(held.betweenBeats).toBe(false);
    expect(held.response).toContain("Still alone");
    const dismissed = run(held, { type: "JUDGE", choiceId: "dismiss" });
    expect(dismissed.betweenBeats).toBe(true);
    expect(dismissed.choices["lane-b-judge"]).toBe("dismiss");
  });

  it("treats illegal actions as no-ops with the same reference", () => {
    expect(drillReducer(initialDrillProgress, { type: "STEP_DONE" })).toBe(
      initialDrillProgress,
    );
    expect(drillReducer(begun, { type: "ACKNOWLEDGE" })).toBe(begun);
    expect(drillReducer(begun, { type: "BEAT_SETTLED" })).toBe(begun);
    expect(
      drillReducer(begun, { type: "JUDGE", choiceId: "recalibrate" }),
    ).toBe(begun);
  });
});

describe("betweenBeatsDwellMs", () => {
  it("holds the false alarm's caption long enough to actually read", () => {
    const falseAlarm = drillAlerts[1];
    const dwell = betweenBeatsDwellMs(falseAlarm, falseAlarmCaption);
    expect(dwell).toBeGreaterThanOrEqual(10000);
    expect(dwell).toBeLessThanOrEqual(drillScore.betweenBeats.maxMs);
  });

  it("scales with reading load and never flashes or stalls", () => {
    for (const alert of drillAlerts) {
      const judgment = alert.steps.find((s) => s.kind === "judgment");
      for (const choice of judgment?.choices ?? []) {
        if (choice.holds) continue;
        const dwell = betweenBeatsDwellMs(alert, choice.response);
        expect(dwell).toBeGreaterThanOrEqual(drillScore.betweenBeats.baseMs);
        expect(dwell).toBeLessThanOrEqual(drillScore.betweenBeats.maxMs);
        // Longer replies always earn at least as much time.
        expect(dwell).toBeGreaterThanOrEqual(betweenBeatsDwellMs(alert, null));
      }
    }
  });
});

describe("the false alarm's claim", () => {
  it("always disagrees with the wall the render shows", () => {
    for (let t = 0; t < 300; t += 1.1) {
      const claim = laneBClaimedWall(t);
      const real = sampleFieldTelemetry(t).wall;
      expect(claim).toBeLessThan(WALL_BAND_FLOOR);
      expect(real - claim).toBeGreaterThan(0.04);
    }
  });
});

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

describe("drillResidual", () => {
  it("reads the operator's redistribution call", () => {
    const ring = drillResidual({ "collapse-judge": "ring" });
    const shed = drillResidual({ "collapse-judge": "shed" });
    expect(ring.worked).toContain("even ring");
    expect(shed.worked).toContain("trailing wall");
    expect(ring.tripped).toBe(shed.tripped);
    expect(ring.warm.length).toBeGreaterThan(0);
  });
});

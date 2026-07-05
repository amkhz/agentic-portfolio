import { describe, expect, it } from "vitest";
import {
  betweenBeatsDwellMs,
  drillAlerts,
  drillReducer,
  drillResidual,
  drillScore,
  falseAlarmCaption,
  initialDrillProgress,
  laneBClaimedWall,
  type DrillAction,
  type DrillProgress,
} from "./drill";
import { sampleFieldTelemetry, WALL_BAND_FLOOR } from "./field";

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

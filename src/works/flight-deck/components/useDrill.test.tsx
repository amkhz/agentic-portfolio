// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { drillAlerts, drillScore } from "@core/works/flight-deck/drill";
import type { DeckEvent, DeckPhase } from "@core/works/flight-deck/machine";
import { useDrill } from "./useDrill";

// The drill's sequencing contract with timers, the machine, and the
// aural grammar. The reducer's own transitions are covered in core;
// choreography is judged live (and by Roy) per the mission's gates.

function setup(initialPhase: DeckPhase = "drill") {
  const dispatched: DeckEvent[] = [];
  const announced: string[] = [];
  const severities: string[] = [];
  const confirmations = { count: 0 };
  const harness = renderHook(
    ({ phase }: { phase: DeckPhase }) =>
      useDrill({
        phase,
        clock: () => 100,
        dispatch: (e) => dispatched.push(e),
        announce: (s) => announced.push(s),
        playSeverity: (s) => severities.push(s),
        playConfirmation: () => {
          confirmations.count += 1;
        },
      }),
    { initialProps: { phase: initialPhase } },
  );
  return { ...harness, dispatched, announced, severities, confirmations };
}

describe("useDrill", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("stays idle outside the drill phase", () => {
    const { result } = setup("nominal");
    act(() => vi.advanceTimersByTime(drillScore.introMs * 3));
    expect(result.current.progress.stage).toBe("idle");
  });

  it("posts the first alert after the quiet en-route beat", () => {
    const { result, announced, severities } = setup();
    expect(result.current.progress.stage).toBe("idle");
    act(() => vi.advanceTimersByTime(drillScore.introMs));
    expect(result.current.progress.stage).toBe("alerts");
    expect(result.current.timelineRef.current.beatAt["advisory-drift"]).toBe(100);
    expect(severities).toEqual(["advisory"]);
    expect(announced[0]).toContain(drillAlerts[0].label);
  });

  it("works system steps on its own cadence and waits at the judgment", () => {
    const { result } = setup();
    act(() => vi.advanceTimersByTime(drillScore.introMs));
    act(() => vi.advanceTimersByTime(drillScore.stepMs));
    act(() => vi.advanceTimersByTime(drillScore.stepMs));
    expect(result.current.progress.stepIndex).toBe(2);
    // The judgment step never advances on time alone.
    act(() => vi.advanceTimersByTime(drillScore.stepMs * 10));
    expect(result.current.progress.stepIndex).toBe(2);
    expect(result.current.progress.betweenBeats).toBe(false);
  });

  it("resolves on judgment, marks the envelope, confirms, escalates", () => {
    const { result, severities, confirmations } = setup();
    act(() => vi.advanceTimersByTime(drillScore.introMs));
    act(() => vi.advanceTimersByTime(drillScore.stepMs));
    act(() => vi.advanceTimersByTime(drillScore.stepMs));
    act(() => result.current.judge("recalibrate"));
    expect(result.current.progress.betweenBeats).toBe(true);
    expect(
      result.current.timelineRef.current.resolvedAt["advisory-drift"],
    ).toBe(100);
    expect(confirmations.count).toBe(1);
    act(() => vi.advanceTimersByTime(drillScore.betweenBeatsMs));
    expect(result.current.progress.alertIndex).toBe(1);
    expect(severities).toEqual(["advisory", "advisory"]);
  });

  it("lets a holding choice look again without resolving", () => {
    const { result, confirmations } = setup();
    act(() => vi.advanceTimersByTime(drillScore.introMs));
    // Beat 1.
    act(() => vi.advanceTimersByTime(drillScore.stepMs));
    act(() => vi.advanceTimersByTime(drillScore.stepMs));
    act(() => result.current.judge("recalibrate"));
    act(() => vi.advanceTimersByTime(drillScore.betweenBeatsMs));
    // Beat 2, to the verify judgment.
    act(() => vi.advanceTimersByTime(drillScore.stepMs));
    act(() => vi.advanceTimersByTime(drillScore.stepMs));
    act(() => result.current.judge("recheck"));
    expect(result.current.progress.betweenBeats).toBe(false);
    expect(
      result.current.timelineRef.current.resolvedAt["advisory-lane-b"],
    ).toBeUndefined();
    expect(confirmations.count).toBe(1); // only beat 1's resolution so far
    act(() => result.current.judge("dismiss"));
    expect(result.current.progress.betweenBeats).toBe(true);
    expect(result.current.progress.choices["lane-b-judge"]).toBe("dismiss");
  });

  it("hands the machine recovery, then residual, then back on watch", () => {
    const { result, dispatched } = setup();
    act(() => vi.advanceTimersByTime(drillScore.introMs));
    const resolutions = ["recalibrate", "dismiss", "apply-trim", "ring"];
    drillAlerts.forEach((alert, i) => {
      for (const step of alert.steps) {
        if (step.kind === "system") {
          act(() => vi.advanceTimersByTime(drillScore.stepMs));
        } else {
          act(() => result.current.judge(resolutions[i]));
        }
      }
      act(() => vi.advanceTimersByTime(drillScore.betweenBeatsMs));
    });
    expect(result.current.progress.stage).toBe("settling");
    expect(dispatched).toContainEqual({ type: "DRILL_RESOLVED" });
    act(() => result.current.settleComplete());
    expect(result.current.progress.stage).toBe("residual");
    act(() => result.current.acknowledge());
    expect(result.current.progress.stage).toBe("done");
    expect(dispatched).toContainEqual({ type: "RECOVERY_SETTLED" });
  });
});

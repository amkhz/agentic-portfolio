import { useEffect, useReducer, useRef } from "react";
import type { Severity } from "@core/works/flight-deck/boot";
import { deckCopy } from "@core/works/flight-deck/copy";
import {
  drillAlerts,
  drillReducer,
  drillScore,
  initialDrillProgress,
  type DrillProgress,
  type DrillTimeline,
} from "@core/works/flight-deck/drill";
import type { DeckEvent, DeckPhase } from "@core/works/flight-deck/machine";

/**
 * The drill's session orchestration: the pure reducer and script live in
 * core/works/flight-deck/drill; this hook owns the timers (the system's
 * own cadence, never the operator's), the deck-clock timeline marks the
 * disturbance envelopes read, the machine dispatches at the stage
 * boundaries, and the announcements and tones that ride each posting.
 *
 * The drill starts once per session, when the machine enters the drill
 * phase (the first successful commit); the judgment steps wait for the
 * operator indefinitely.
 */

interface UseDrillParams {
  phase: DeckPhase;
  clock: () => number;
  dispatch: (event: DeckEvent) => void;
  announce: (text: string) => void;
  /** Aural grammar hooks; both no-op while sound is off. */
  playSeverity: (severity: Severity) => void;
  playConfirmation: () => void;
}

export interface DrillSession {
  progress: DrillProgress;
  /** Deck-clock beat marks for the pure disturbance envelopes. */
  timelineRef: { current: DrillTimeline };
  judge: (choiceId: string) => void;
  /** The recovery choreography (DeckSession's authored lane) reports in. */
  settleComplete: () => void;
  acknowledge: () => void;
}

export function useDrill({
  phase,
  clock,
  dispatch,
  announce,
  playSeverity,
  playConfirmation,
}: UseDrillParams): DrillSession {
  const [progress, act] = useReducer(drillReducer, initialDrillProgress);
  const timelineRef = useRef<DrillTimeline>({ beatAt: {}, resolvedAt: {} });

  // Instance refs so the timers never close over stale callbacks.
  const io = useRef({ clock, dispatch, announce, playSeverity, playConfirmation });
  io.current = { clock, dispatch, announce, playSeverity, playConfirmation };
  const progressRef = useRef(progress);
  progressRef.current = progress;

  const { stage, alertIndex, stepIndex, betweenBeats } = progress;
  const alert = drillAlerts[alertIndex];
  const step = alert?.steps[stepIndex];

  // The quiet en-route beat, then the first alert posts.
  useEffect(() => {
    if (phase !== "drill" || stage !== "idle") return;
    const timer = window.setTimeout(() => act({ type: "BEGIN" }), drillScore.introMs);
    return () => window.clearTimeout(timer);
  }, [phase, stage]);

  // A beat posts: mark the envelope's clock, speak it, sound it.
  useEffect(() => {
    if (stage !== "alerts" || betweenBeats || stepIndex !== 0) return;
    const posted = drillAlerts[alertIndex];
    if (timelineRef.current.beatAt[posted.beat] !== undefined) return;
    timelineRef.current.beatAt[posted.beat] = io.current.clock();
    io.current.announce(
      `${deckCopy.alerts.severity[posted.severity]} alert. ${posted.label}. ${posted.plain}`,
    );
    io.current.playSeverity(posted.severity);
  }, [stage, alertIndex, stepIndex, betweenBeats]);

  // System steps work themselves on the deck's cadence. The judgment
  // step never appears here: it waits for the operator.
  useEffect(() => {
    if (stage !== "alerts" || betweenBeats || step?.kind !== "system") return;
    const timer = window.setTimeout(
      () => act({ type: "STEP_DONE" }),
      drillScore.stepMs,
    );
    return () => window.clearTimeout(timer);
  }, [stage, alertIndex, stepIndex, betweenBeats, step?.kind]);

  // The resolved line holds through the escalation gap, then the next
  // beat posts (or the drill hands the machine to recovery).
  useEffect(() => {
    if (stage !== "alerts" || !betweenBeats) return;
    const timer = window.setTimeout(
      () => act({ type: "BEAT_SETTLED" }),
      drillScore.betweenBeatsMs,
    );
    return () => window.clearTimeout(timer);
  }, [stage, betweenBeats]);

  // Stage boundaries dispatch to the deck machine.
  useEffect(() => {
    if (stage !== "settling") return;
    io.current.dispatch({ type: "DRILL_RESOLVED" });
    io.current.announce(deckCopy.alerts.settling);
  }, [stage]);

  const judge = (choiceId: string) => {
    const now = progressRef.current;
    const currentAlert = drillAlerts[now.alertIndex];
    const currentStep = currentAlert?.steps[now.stepIndex];
    if (now.stage !== "alerts" || currentStep?.kind !== "judgment") return;
    // A beat resolves once: a late call must not re-announce, re-confirm,
    // or restart the disturbance decay (Roy, 2026-07-05).
    if (timelineRef.current.resolvedAt[currentAlert.beat] !== undefined) return;
    const choice = currentStep.choices?.find((c) => c.id === choiceId);
    if (!choice) return;
    act({ type: "JUDGE", choiceId });
    io.current.announce(choice.response);
    if (!choice.holds) {
      timelineRef.current.resolvedAt[currentAlert.beat] = io.current.clock();
      io.current.playConfirmation();
    }
  };

  const settleComplete = () => act({ type: "SETTLE_COMPLETE" });

  const acknowledge = () => {
    if (progressRef.current.stage !== "residual") return;
    act({ type: "ACKNOWLEDGE" });
    io.current.dispatch({ type: "RECOVERY_SETTLED" });
    io.current.announce(deckCopy.alerts.quietAfterDrill);
  };

  return { progress, timelineRef, judge, settleComplete, acknowledge };
}

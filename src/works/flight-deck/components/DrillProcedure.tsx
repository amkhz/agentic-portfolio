import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { deckCopy } from "@core/works/flight-deck/copy";
import {
  drillAlerts,
  laneBClaimedWall,
  type DrillProgress,
} from "@core/works/flight-deck/drill";
import {
  drillFieldDelta,
  type DrillTimeline,
} from "@core/works/flight-deck/drillEnvelopes";
import { sampleFieldTelemetry } from "@core/works/flight-deck/field";
import { deckSpringSoft } from "./deckMotion";

/**
 * The guided procedure (ECAM posture, shape brief §7): the checklist
 * unfolds in the center review space beside the field render it reads
 * against, never in a modal. System steps tick themselves on the deck's
 * cadence; the one judgment step per alert waits for the operator and
 * takes focus so the keyboard rides the movement sequence. Unfailable,
 * untimed.
 *
 * Beat 2's verify step renders the cross-check panel: sensor lane B's
 * claim beside what the render actually shows, sampled from the same
 * pure model on the readings cadence. The disagreement is the beat.
 */

interface DrillProcedureProps {
  progress: DrillProgress;
  clock: () => number;
  timeline: { current: DrillTimeline };
  onJudge: (choiceId: string) => void;
}

const READINGS_INTERVAL_MS = 400;

function CrossCheck({
  clock,
  timeline,
}: {
  clock: () => number;
  timeline: { current: DrillTimeline };
}) {
  const [values, setValues] = useState(() => ({ claim: "—", real: "—" }));
  useEffect(() => {
    const tick = () => {
      const t = clock();
      const field = sampleFieldTelemetry(t, drillFieldDelta(t, timeline.current));
      setValues({
        claim: laneBClaimedWall(t).toFixed(2),
        real: field.wall.toFixed(2),
      });
    };
    tick();
    const interval = window.setInterval(tick, READINGS_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [clock, timeline]);
  return (
    <div className="deck-drill__crosscheck">
      <p>
        <span className="deck-drill__crosscheck-label">
          {deckCopy.alerts.crossCheckLaneB}
        </span>
        <span className="deck-drill__crosscheck-value">{values.claim}</span>
      </p>
      <p>
        <span className="deck-drill__crosscheck-label">
          {deckCopy.alerts.crossCheckRender}
        </span>
        <span className="deck-drill__crosscheck-value">{values.real}</span>
      </p>
    </div>
  );
}

export function DrillProcedure({
  progress,
  clock,
  timeline,
  onJudge,
}: DrillProcedureProps) {
  const { stage, alertIndex, stepIndex, betweenBeats, response } = progress;
  const firstChoiceRef = useRef<HTMLButtonElement>(null);
  const alert = drillAlerts[alertIndex];
  const step = alert?.steps[stepIndex];
  const judging =
    stage === "alerts" && !betweenBeats && step?.kind === "judgment";

  // The judgment is the operator's task: focus rides to it when it opens.
  useEffect(() => {
    if (judging) firstChoiceRef.current?.focus();
  }, [judging, alertIndex, stepIndex]);

  // The judged step's buttons unmount with the choice; focus rides to
  // the response read-back so the keyboard never drops to the body
  // (phase 7 audit).
  const responseRef = useRef<HTMLParagraphElement>(null);
  const prevJudgingRef = useRef(false);
  useEffect(() => {
    if (prevJudgingRef.current && !judging) responseRef.current?.focus();
    prevJudgingRef.current = judging;
  }, [judging]);

  if (stage === "idle" || stage === "done" || stage === "residual" || !alert) {
    return null;
  }

  if (stage === "settling") {
    return (
      <div className="deck-drill">
        <p className="deck-intent__label">{deckCopy.alerts.procedureKicker}</p>
        <p className="deck-drill__settling">{deckCopy.alerts.settling}</p>
      </div>
    );
  }

  const showCrossCheck =
    alert.crossCheckFromStep !== undefined &&
    (betweenBeats || stepIndex >= alert.crossCheckFromStep);

  return (
    <div className="deck-drill">
      <div className="deck-drill__head">
        <p className="deck-intent__label">
          {deckCopy.alerts.procedureKicker} ·{" "}
          {deckCopy.alerts.severity[alert.severity]}
        </p>
        <p className="deck-drill__title">{alert.label}</p>
      </div>
      <ol className="deck-drill__steps">
        {alert.steps.map((s, i) => {
          const done = betweenBeats || i < stepIndex;
          const active = !betweenBeats && i === stepIndex;
          if (!done && !active) return null; // steps surface as they arrive
          return (
            <motion.li
              key={s.id}
              className="deck-drill__step"
              data-state={done ? "done" : s.kind}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={deckSpringSoft}
            >
              <span className="deck-drill__step-text">{s.text}</span>
              {s.kind === "system" ? (
                <span className="deck-drill__step-state">
                  {done ? deckCopy.alerts.stepDone : deckCopy.alerts.stepWorking}
                </span>
              ) : null}
              {active && s.kind === "judgment" ? (
                <span className="deck-drill__choices">
                  {s.choices?.map((choice, c) => (
                    <button
                      key={choice.id}
                      ref={c === 0 ? firstChoiceRef : undefined}
                      type="button"
                      className="deck-commit"
                      onClick={() => onJudge(choice.id)}
                    >
                      {choice.label}
                    </button>
                  ))}
                </span>
              ) : null}
            </motion.li>
          );
        })}
      </ol>
      {showCrossCheck ? <CrossCheck clock={clock} timeline={timeline} /> : null}
      {response ? (
        <p className="deck-drill__response" tabIndex={-1} ref={responseRef}>
          {response}
        </p>
      ) : null}
      {betweenBeats ? (
        <p className="deck-drill__resolved">{alert.resolved}</p>
      ) : null}
    </div>
  );
}

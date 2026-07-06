import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { deckCopy } from "@core/works/flight-deck/copy";
import { drillResidual, type DrillProgress } from "@core/works/flight-deck/drill";
import {
  drillVacuumDelta,
  type DrillTimeline,
} from "@core/works/flight-deck/drillEnvelopes";
import { sampleVacuumTelemetry } from "@core/works/flight-deck/vacuum";
import { deckSpringSoft } from "./deckMotion";
import { DECK_TAB } from "./deckTab";

/**
 * Beat 6, the residual status (ECAM after-state): what tripped, what
 * was done (reading the operator's own judgment calls), what margin
 * remains, and one warm line. The margin row is live from the same pure
 * vacuum model, still easing back from the surge, so the after-state
 * shows real recovery, not a stock sentence. Acknowledging puts the
 * deck back on watch.
 */

interface DrillResidualProps {
  progress: DrillProgress;
  clock: () => number;
  timeline: { current: DrillTimeline };
  onAcknowledge: () => void;
}

const READINGS_INTERVAL_MS = 400;

export function DrillResidual({
  progress,
  clock,
  timeline,
  onAcknowledge,
}: DrillResidualProps) {
  const residual = drillResidual(progress.choices);
  const acknowledgeRef = useRef<HTMLButtonElement>(null);
  const [margin, setMargin] = useState("—");

  useEffect(() => {
    acknowledgeRef.current?.focus();
  }, []);

  useEffect(() => {
    const tick = () => {
      const t = clock();
      // No trim passed: the commit envelope (26s) is always spent by the
      // time the residual shows (the drill alone takes longer), so the
      // gauge and this row cannot disagree. Revisit if the drill shortens.
      const v = sampleVacuumTelemetry(t, null, drillVacuumDelta(t, timeline.current));
      setMargin(`${v.margin < 0 ? "-" : "+"}${Math.abs(v.margin).toFixed(3)}`);
    };
    tick();
    const interval = window.setInterval(tick, READINGS_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [clock, timeline]);

  return (
    <motion.div
      className="deck-drill deck-residual"
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={deckSpringSoft}
    >
      <p className="deck-intent__label">{deckCopy.alerts.residual.kicker}</p>
      <dl className="deck-residual__rows">
        <div>
          <dt>{deckCopy.alerts.residual.trippedLabel}</dt>
          <dd>{residual.tripped}</dd>
        </div>
        <div>
          <dt>{deckCopy.alerts.residual.workedLabel}</dt>
          <dd>{residual.worked}</dd>
        </div>
        <div>
          <dt>{deckCopy.alerts.residual.marginLabel}</dt>
          <dd className="deck-residual__margin">{margin}</dd>
        </div>
      </dl>
      <div className="deck-residual__foot">
        <p className="deck-residual__warm">{residual.warm}</p>
        <button
          ref={acknowledgeRef}
          type="button"
          className="deck-commit"
          tabIndex={DECK_TAB}
          onClick={onAcknowledge}
        >
          {deckCopy.alerts.residual.acknowledge}
        </button>
      </div>
    </motion.div>
  );
}

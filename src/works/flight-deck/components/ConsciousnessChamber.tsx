import { useEffect, useRef, useState } from "react";
import { deckCopy } from "@core/works/flight-deck/copy";
import {
  drillOperatorDelta,
  type DrillTimeline,
} from "@core/works/flight-deck/drillEnvelopes";
import {
  formatOperatorReadings,
  sampleOperator,
  type OperatorTelemetry,
} from "@core/works/flight-deck/operator";

/**
 * The consciousness chamber (movement 5's end state): the operator-state
 * channel promoted from the bottom of the bench to the center review
 * space, become the control surface. The same pure model and the same
 * deck clock as the strip below, sampled large: the breath waveform
 * front and center, coherence beside it, and the promotion caption that
 * carries the arc's proof. No new inputs are invented; the coupling to
 * the field render (the deck breathing with the operator) IS the
 * control, and the caption says so honestly.
 *
 * Arrival and departure are authored by the session's crossing timeline
 * (.js-chamber-* targets); this component only renders the living data.
 */

interface ConsciousnessChamberProps {
  clock: () => number;
  drill?: { current: DrillTimeline } | null;
}

const READINGS_INTERVAL_MS = 400;
/** The chamber's breath trace window, seconds: a few full breaths. */
const WINDOW_S = 16;
const TRACE_SAMPLES = 96;
const TRACE_W = 100;
const TRACE_H = 26;

function breathPoints(t: number, drill: DrillTimeline | null | undefined): string {
  const points: string[] = [];
  for (let i = 0; i < TRACE_SAMPLES; i++) {
    const ti = t - WINDOW_S + (i / (TRACE_SAMPLES - 1)) * WINDOW_S;
    const o: OperatorTelemetry = sampleOperator(ti, drillOperatorDelta(ti, drill));
    const v = (o.breath + 1) / 2;
    const x = (i / (TRACE_SAMPLES - 1)) * TRACE_W;
    const y = TRACE_H - 3 - v * (TRACE_H - 6);
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return points.join(" ");
}

export function ConsciousnessChamber({ clock, drill }: ConsciousnessChamberProps) {
  const drillRef = useRef<{ current: DrillTimeline } | null>(null);
  drillRef.current = drill ?? null;
  const [t, setT] = useState(() => clock());
  const clockRef = useRef(clock);
  clockRef.current = clock;

  useEffect(() => {
    const interval = window.setInterval(
      () => setT(clockRef.current()),
      READINGS_INTERVAL_MS,
    );
    return () => window.clearInterval(interval);
  }, []);

  const timeline = drillRef.current?.current;
  const now = sampleOperator(t, drillOperatorDelta(t, timeline));
  const readings = formatOperatorReadings(now, true);

  return (
    <section className="deck-chamber" aria-label={deckCopy.paradigm.chamberKicker}>
      <p className="deck-chamber__kicker js-chamber-part">
        {deckCopy.paradigm.chamberKicker}
      </p>
      <div className="deck-chamber__traces js-chamber-part" aria-hidden="true">
        <svg
          className="deck-chamber__breath"
          viewBox={`0 0 ${TRACE_W} ${TRACE_H}`}
          preserveAspectRatio="none"
        >
          <polyline points={breathPoints(t, timeline)} />
        </svg>
        <span className="deck-chamber__coherence">
          <span className="deck-chamber__coherence-label">
            {deckCopy.operator.coherence}
          </span>
          <span className="deck-chamber__coherence-value">
            {now.coherence.toFixed(2)}
          </span>
        </span>
      </div>
      <p className="deck-chamber__coupled js-chamber-part">
        {deckCopy.paradigm.chamberCoupled}
      </p>
      <p className="deck-chamber__caption js-chamber-caption">
        {deckCopy.paradigm.promotion}
      </p>
      <p className="sr-only">{readings.mirror}</p>
    </section>
  );
}

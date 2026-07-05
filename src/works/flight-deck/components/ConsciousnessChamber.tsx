import { useEffect, useRef, useState } from "react";
import type { CommitTrim } from "@core/works/flight-deck/commit";
import { deckCopy } from "@core/works/flight-deck/copy";
import {
  operatorLoadAt,
  type DrillTimeline,
} from "@core/works/flight-deck/drillEnvelopes";
import {
  formatOperatorReadings,
  sampleOperator,
} from "@core/works/flight-deck/operator";
import { COUPLING_LAG_S } from "@core/works/flight-deck/paradigm";

/**
 * The consciousness chamber (movement 5's end state): the operator-state
 * channel promoted from the bottom of the bench to the center review
 * space, become the control surface. The same pure model and the same
 * deck clock as the strip below, sampled large: the breath waveform
 * front and center, coherence beside it, and the promotion caption that
 * carries the arc's proof.
 *
 * The coupling proves itself here (live pass 2026-07-05): under the
 * operator's breath rides the FIELD echo, a bone-ink trace of the same
 * waveform the bubble's wall is actually breathing — the field render
 * samples the operator exactly COUPLING_LAG_S behind, so the echo IS
 * the ship's response, not an illustration of it. The gap between the
 * two lines is the intent-to-action gap, visible without touching a
 * single control: you breathe, and 0.6 seconds later the ship does.
 *
 * The waveforms draw on a gated rAF loop (off-viewport and hidden-tab
 * both pause, D6); numbers and the sr mirror stay on the readings
 * cadence. Arrival and departure are authored by the session's crossing
 * timeline (.js-chamber-* targets).
 */

interface ConsciousnessChamberProps {
  clock: () => number;
  drill?: { current: DrillTimeline } | null;
  /** The riding maneuver, if any: the watcher carries its cost here too. */
  trim?: CommitTrim | null;
}

const READINGS_INTERVAL_MS = 400;
/** The chamber's breath trace window, seconds: a few full breaths. */
const WINDOW_S = 16;
const TRACE_SAMPLES = 96;
const TRACE_W = 100;
const TRACE_H = 26;
/** The echo draws subordinate: the ship answers, it does not compete. */
const ECHO_AMPLITUDE = 0.62;

function wavePoints(
  t: number,
  drill: DrillTimeline | null | undefined,
  trim: CommitTrim | null | undefined,
  lagS: number,
  amplitude: number,
): string {
  const points: string[] = [];
  for (let i = 0; i < TRACE_SAMPLES; i++) {
    const ti = t - WINDOW_S + (i / (TRACE_SAMPLES - 1)) * WINDOW_S - lagS;
    const o = sampleOperator(ti, operatorLoadAt(ti, drill, trim));
    const v = (o.breath * amplitude + 1) / 2;
    const x = (i / (TRACE_SAMPLES - 1)) * TRACE_W;
    const y = TRACE_H - 3 - v * (TRACE_H - 6);
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return points.join(" ");
}

export function ConsciousnessChamber({
  clock,
  drill,
  trim,
}: ConsciousnessChamberProps) {
  const drillRef = useRef<{ current: DrillTimeline } | null>(null);
  drillRef.current = drill ?? null;
  const trimRef = useRef<CommitTrim | null>(null);
  trimRef.current = trim ?? null;
  const [t, setT] = useState(() => clock());
  const clockRef = useRef(clock);
  clockRef.current = clock;
  const hostRef = useRef<HTMLElement>(null);
  const breathRef = useRef<SVGPolylineElement>(null);
  const echoRef = useRef<SVGPolylineElement>(null);

  // Numbers and the mirror on the readings cadence, like every gauge.
  useEffect(() => {
    const interval = window.setInterval(
      () => setT(clockRef.current()),
      READINGS_INTERVAL_MS,
    );
    return () => window.clearInterval(interval);
  }, []);

  // The waveforms are continuous: an rAF loop writes both polylines
  // imperatively (no React re-render per frame), gated twice per D6.
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let frame = 0;
    let running = false;
    let inView = true;

    const update = () => {
      const now = clockRef.current();
      const timeline = drillRef.current?.current;
      const riding = trimRef.current;
      breathRef.current?.setAttribute(
        "points",
        wavePoints(now, timeline, riding, 0, 1),
      );
      echoRef.current?.setAttribute(
        "points",
        wavePoints(now, timeline, riding, COUPLING_LAG_S, ECHO_AMPLITUDE),
      );
      frame = requestAnimationFrame(update);
    };
    const syncLoop = () => {
      const shouldRun = inView && !document.hidden;
      if (shouldRun && !running) {
        running = true;
        frame = requestAnimationFrame(update);
      } else if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(frame);
      }
    };
    const intersection = new IntersectionObserver((entries) => {
      inView = entries[0]?.isIntersecting ?? true;
      syncLoop();
    });
    intersection.observe(host);
    const onVisibility = () => syncLoop();
    document.addEventListener("visibilitychange", onVisibility);
    syncLoop();

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      intersection.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const timeline = drillRef.current?.current;
  const now = sampleOperator(t, operatorLoadAt(t, timeline, trimRef.current));
  const readings = formatOperatorReadings(now, true);

  return (
    <section
      ref={hostRef}
      className="deck-chamber"
      aria-label={deckCopy.paradigm.chamberKicker}
    >
      <p className="deck-chamber__kicker js-chamber-part">
        {deckCopy.paradigm.chamberKicker}
      </p>
      <div className="deck-chamber__traces js-chamber-part" aria-hidden="true">
        <div className="deck-chamber__waves">
          <svg
            className="deck-chamber__breath"
            viewBox={`0 0 ${TRACE_W} ${TRACE_H}`}
            preserveAspectRatio="none"
          >
            <polyline
              ref={echoRef}
              className="deck-chamber__echo"
              points={wavePoints(t, timeline, trimRef.current, COUPLING_LAG_S, ECHO_AMPLITUDE)}
            />
            <polyline
              ref={breathRef}
              points={wavePoints(t, timeline, trimRef.current, 0, 1)}
            />
          </svg>
          <p className="deck-chamber__legend">
            <span className="deck-chamber__legend-breath">
              {deckCopy.paradigm.chamberBreathLabel}
            </span>
            <span className="deck-chamber__legend-echo">
              {deckCopy.paradigm.chamberEchoLabel}
            </span>
          </p>
        </div>
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
      <p className="sr-only">
        {readings.mirror} {deckCopy.paradigm.chamberEchoMirror}
      </p>
    </section>
  );
}

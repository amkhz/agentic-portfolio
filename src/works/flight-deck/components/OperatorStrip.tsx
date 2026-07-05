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
  type OperatorTelemetry,
} from "@core/works/flight-deck/operator";

/**
 * The operator-state strip (phase 6, replacing the boot-era stub): the
 * system watching the watcher, slim and peripheral in the operator
 * channel, present from boot in instrumented mode. Three traces in the
 * channel's own quiet hue (never confusable with vehicle telemetry):
 * blink rate, the respiration waveform itself, coherence. The watcher
 * takes load from everything the deck does — the drill's escalation
 * and every commit's attention cost ride the shared envelopes — so the
 * strip stirs when the ship moves, unprompted.
 *
 * The traces draw on a gated rAF loop (live pass 2026-07-05: the
 * readings cadence stepped visibly on the breath), written imperatively
 * with no React re-render per frame; values and the sr mirror stay on
 * the readings cadence. The t=0 still serves the static plate. The
 * paradigm dissolve promotes this strip by raising --promotion on the
 * deck; the consciousness chamber renders the same model at center from
 * the same clock, so watcher and control surface can never disagree.
 */

interface OperatorStripProps {
  /** True once the deck is past the boot ritual: traces tick live. */
  live: boolean;
  /** The shared deck clock; defaults to a local epoch outside a session. */
  clock?: () => number;
  /** The drill's beat marks: the watcher takes the drill's load too. */
  drill?: { current: DrillTimeline } | null;
  /** The riding maneuver: a commit costs attention and the strip shows it. */
  trim?: CommitTrim | null;
  /** Consciousness regime: the mirror says the channel holds the controls. */
  promoted?: boolean;
}

const READINGS_INTERVAL_MS = 400;
/** The trace window: enough history to read a trend, seconds. */
const WINDOW_S = 24;
const TRACE_SAMPLES = 60;
/** Trace geometry, viewBox units. */
const TRACE_W = 100;
const TRACE_H = 24;

function tracePoints(
  t: number,
  drill: DrillTimeline | null | undefined,
  trim: CommitTrim | null | undefined,
  pick: (o: OperatorTelemetry) => number,
  min: number,
  max: number,
): string {
  const points: string[] = [];
  for (let i = 0; i < TRACE_SAMPLES; i++) {
    const ti = t - WINDOW_S + (i / (TRACE_SAMPLES - 1)) * WINDOW_S;
    const o = sampleOperator(ti, operatorLoadAt(ti, drill, trim));
    const v = Math.min(Math.max((pick(o) - min) / (max - min), 0), 1);
    const x = (i / (TRACE_SAMPLES - 1)) * TRACE_W;
    const y = TRACE_H - 3 - v * (TRACE_H - 6);
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return points.join(" ");
}

interface TraceSpec {
  key: "blink" | "respiration" | "coherence";
  label: string;
  pick: (o: OperatorTelemetry) => number;
  min: number;
  max: number;
  value: (o: OperatorTelemetry) => string;
}

const TRACES: TraceSpec[] = [
  {
    key: "blink",
    label: deckCopy.operator.blink,
    pick: (o) => o.blink,
    min: 6,
    max: 24,
    value: (o) => Math.round(o.blink).toString(),
  },
  {
    key: "respiration",
    label: deckCopy.operator.respiration,
    // The waveform itself, not the rate: the strip breathes.
    pick: (o) => o.breath,
    min: -1.15,
    max: 1.15,
    value: (o) => o.respiration.toFixed(1),
  },
  {
    key: "coherence",
    label: deckCopy.operator.coherence,
    pick: (o) => o.coherence,
    min: 0.3,
    max: 1,
    value: (o) => o.coherence.toFixed(2),
  },
];

export function OperatorStrip({
  live,
  clock: clockProp,
  drill,
  trim,
  promoted = false,
}: OperatorStripProps) {
  const epochRef = useRef<number | null>(null);
  const clockRef = useRef<() => number>(() => 0);
  clockRef.current =
    clockProp ??
    (() => {
      epochRef.current ??= performance.now();
      return (performance.now() - epochRef.current) / 1000;
    });
  const drillRef = useRef<{ current: DrillTimeline } | null>(null);
  drillRef.current = drill ?? null;
  const trimRef = useRef<CommitTrim | null>(null);
  trimRef.current = trim ?? null;
  const hostRef = useRef<HTMLDivElement>(null);
  const polyRefs = useRef<(SVGPolylineElement | null)[]>([]);
  const [t, setT] = useState(0);

  // Values and the mirror on the readings cadence, like every gauge.
  useEffect(() => {
    if (!live) return;
    const interval = window.setInterval(
      () => setT(clockRef.current()),
      READINGS_INTERVAL_MS,
    );
    return () => window.clearInterval(interval);
  }, [live]);

  // The traces themselves are continuous: a gated rAF loop writes the
  // polylines imperatively (live pass 2026-07-05, matching the chamber).
  useEffect(() => {
    const host = hostRef.current;
    if (!live || !host) return;

    let frame = 0;
    let running = false;
    let inView = true;

    const update = () => {
      const now = clockRef.current();
      const timeline = drillRef.current?.current;
      const riding = trimRef.current;
      TRACES.forEach((trace, i) => {
        polyRefs.current[i]?.setAttribute(
          "points",
          tracePoints(now, timeline, riding, trace.pick, trace.min, trace.max),
        );
      });
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
  }, [live]);

  const timeline = drillRef.current?.current;
  const now = sampleOperator(t, operatorLoadAt(t, timeline, trimRef.current));
  const readings = formatOperatorReadings(now, promoted);

  return (
    <div
      ref={hostRef}
      className="deck-opstrip"
      data-promoted={promoted ? "" : undefined}
    >
      <span className="deck-opstrip__label">{deckCopy.operator.label}</span>
      {TRACES.map((trace, i) => (
        <span key={trace.key} className="deck-opstrip__channel" aria-hidden="true">
          <span className="deck-opstrip__channel-label">{trace.label}</span>
          <svg
            className="deck-opstrip__trace"
            viewBox={`0 0 ${TRACE_W} ${TRACE_H}`}
            preserveAspectRatio="none"
          >
            <polyline
              ref={(el) => {
                polyRefs.current[i] = el;
              }}
              points={tracePoints(
                t,
                timeline,
                trimRef.current,
                trace.pick,
                trace.min,
                trace.max,
              )}
            />
          </svg>
          <span className="deck-opstrip__value">{trace.value(now)}</span>
        </span>
      ))}
      <p className="sr-only">{readings.mirror}</p>
    </div>
  );
}

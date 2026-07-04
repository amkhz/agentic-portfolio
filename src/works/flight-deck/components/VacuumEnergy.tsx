import { useEffect, useRef, useState } from "react";
import type { CommitTrim } from "@core/works/flight-deck/commit";
import {
  formatVacuumReadings,
  sampleVacuumTelemetry,
  type VacuumTelemetry,
} from "@core/works/flight-deck/vacuum";

/**
 * Vacuum Energy, the invented gauge (shape brief: a quantity with no
 * vehicle analog gets an invented visual language, lower-left). The
 * wide lattice bed, Justin's pick from the 2026-07-04 variations: the
 * ruler spans the region's full width, extraction accumulates vertical
 * hairlines from the left, demand is the one firm line the lattice must
 * stay past, and the empty bed to the right is honest headroom. All
 * bone ink; no severity color at nominal.
 *
 * Below the bed, the expanded margin strip: real instruments give the
 * critical band its own expanded scale when it is a sliver of full
 * scale (expanded ILS localizer, radar-altimeter low range), and the
 * margin is 3% of this gauge. The strip windows demand plus or minus
 * 0.06 with demand centered, so margin reads as deviation from center;
 * nominal drift never pegs the window, the drill (phase 5) will.
 *
 * No canvas and no render loop: the model drifts on 10-30s cycles, so
 * the gauge re-samples on the bench readings cadence and the steps stay
 * under a pixel. The same markup serves the static plate at t=0.
 */

interface VacuumEnergyProps {
  /** True once the deck is past the boot ritual: readings tick live. */
  live: boolean;
  /** The shared deck clock; defaults to a local epoch outside a session. */
  clock?: () => number;
  /** The riding maneuver, if any: demand steps, the margin pinches. */
  trim?: CommitTrim | null;
}

const READINGS_INTERVAL_MS = 400;

/** Gauge geometry, viewBox units. Full scale is 1.0 of rated draw. */
const BED = { left: 4, right: 296, top: 8, bottom: 40, axis: 44 } as const;
const STRIP = { top: 64, bottom: 88 } as const;
const LATTICE_LINES = 25;
/** The expanded window: demand ± this, in rated-draw units. */
const WINDOW_HALF = 0.06;
/** Expanded lattice pitch, on an absolute grid so lines don't swim. */
const STRIP_STEP = 0.005;

const xFor = (value: number) =>
  BED.left + (BED.right - BED.left) * Math.min(Math.max(value, 0), 1);

export function VacuumGauge({ v }: { v: VacuumTelemetry }) {
  const latticeStep = 1 / LATTICE_LINES;
  const demandX = xFor(v.demand);
  const windowPx = ((BED.right - BED.left) * WINDOW_HALF) / 1;
  const windowFloor = v.demand - WINDOW_HALF;
  const xExp = (value: number) =>
    BED.left + ((value - windowFloor) / (2 * WINDOW_HALF)) * (BED.right - BED.left);
  const stripFrom = Math.ceil(windowFloor / STRIP_STEP);
  const stripTo = Math.floor((v.demand + WINDOW_HALF) / STRIP_STEP);
  return (
    <svg
      className="deck-vacuum__gauge"
      viewBox="0 0 300 100"
      aria-hidden="true"
    >
      {/* The baseline ruler with quarter ticks: the invented unit's scale. */}
      <line
        className="deck-vacuum__frame"
        x1={BED.left}
        x2={BED.right}
        y1={BED.axis}
        y2={BED.axis}
      />
      {[0, 0.25, 0.5, 0.75, 1].map((tick) => (
        <line
          key={tick}
          className="deck-vacuum__tick"
          x1={xFor(tick)}
          x2={xFor(tick)}
          y1={BED.axis}
          y2={BED.axis + 5}
        />
      ))}
      {/* The harvested lattice: one hairline per 1/25 of rated draw. */}
      {Array.from({ length: LATTICE_LINES }, (_, i) => {
        const level = (i + 0.5) * latticeStep;
        if (level > v.extraction) return null;
        // The leading hairline fades with how much of its slot is filled.
        const fill = Math.min((v.extraction - level) / latticeStep + 0.5, 1);
        return (
          <line
            key={i}
            className="deck-vacuum__lattice"
            x1={xFor(level)}
            x2={xFor(level)}
            y1={BED.top}
            y2={BED.bottom}
            style={{ opacity: 0.35 + 0.65 * fill }}
          />
        );
      })}
      {/* Demand: the one firm line the lattice must stay past. */}
      <line
        className="deck-vacuum__demand"
        x1={demandX}
        x2={demandX}
        y1={BED.top - 4}
        y2={BED.axis + 2}
      />

      {/* The expanded margin strip: the window under magnification. */}
      <line
        className="deck-vacuum__wedge"
        x1={demandX - windowPx}
        x2={BED.left}
        y1={BED.axis + 3}
        y2={STRIP.top}
      />
      <line
        className="deck-vacuum__wedge"
        x1={demandX + windowPx}
        x2={BED.right}
        y1={BED.axis + 3}
        y2={STRIP.top}
      />
      <rect
        className="deck-vacuum__frame"
        x={BED.left}
        y={STRIP.top}
        width={BED.right - BED.left}
        height={STRIP.bottom - STRIP.top}
        fill="none"
      />
      {Array.from({ length: stripTo - stripFrom + 1 }, (_, k) => {
        const level = (stripFrom + k) * STRIP_STEP;
        if (level > v.extraction) return null;
        const fill = Math.min((v.extraction - level) / STRIP_STEP + 0.5, 1);
        return (
          <line
            key={k}
            className="deck-vacuum__lattice"
            x1={xExp(level)}
            x2={xExp(level)}
            y1={STRIP.top + 3}
            y2={STRIP.bottom - 3}
            style={{ opacity: 0.35 + 0.65 * fill }}
          />
        );
      })}
      <line
        className="deck-vacuum__demand"
        x1={xExp(v.demand)}
        x2={xExp(v.demand)}
        y1={STRIP.top - 3}
        y2={STRIP.bottom + 3}
      />
      <text className="deck-vacuum__scale-note" x={BED.right} y={STRIP.top - 6} textAnchor="end">
        ×8
      </text>
    </svg>
  );
}

export function VacuumEnergy({
  live,
  clock: clockProp,
  trim,
}: VacuumEnergyProps) {
  const epochRef = useRef<number | null>(null);
  const [v, setV] = useState(() => sampleVacuumTelemetry(0));
  const trimRef = useRef<CommitTrim | null>(null);
  trimRef.current = trim ?? null;
  const clockRef = useRef<() => number>(() => 0);
  clockRef.current =
    clockProp ??
    (() => {
      epochRef.current ??= performance.now();
      return (performance.now() - epochRef.current) / 1000;
    });

  useEffect(() => {
    if (!live) return;
    const interval = window.setInterval(() => {
      setV(sampleVacuumTelemetry(clockRef.current(), trimRef.current));
    }, READINGS_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [live]);

  const readings = formatVacuumReadings(v);
  return (
    <div className="deck-vacuum">
      <div className="js-boot-data">
        <VacuumGauge v={v} />
      </div>
      <p
        className="js-boot-data js-emit mt-3 text-sm tabular-nums text-[var(--deck-ink)]"
        aria-hidden="true"
      >
        {readings.line}
      </p>
      <p className="sr-only">{readings.mirror}</p>
    </div>
  );
}

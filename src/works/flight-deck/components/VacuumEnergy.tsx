import { useEffect, useMemo, useRef, useState } from "react";
import type { CommitTrim } from "@core/works/flight-deck/commit";
import {
  drillVacuumDelta,
  type DrillTimeline,
} from "@core/works/flight-deck/drillEnvelopes";
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
 * The gauge draws on a gated rAF loop (phase 7, Justin's call: the
 * 400ms cadence stepped visibly when the drill surges the demand line
 * and recenters the strip). Same discipline as the operator traces:
 * React renders the line pools once, the loop owns their attributes
 * imperatively, and readings text plus sr mirror stay on the cadence.
 * The declarative markup at t=0 still serves the static plate.
 */

interface VacuumEnergyProps {
  /** True once the deck is past the boot ritual: readings tick live. */
  live: boolean;
  /** The shared deck clock; defaults to a local epoch outside a session. */
  clock?: () => number;
  /** The riding maneuver, if any: demand steps, the margin pinches. */
  trim?: CommitTrim | null;
  /** The drill's beat marks (phase 5): the surge that pegs the strip. */
  drill?: { current: DrillTimeline } | null;
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

/** Hairline presence: 0 above the harvested level, fading in over its slot. */
const latticeOpacity = (level: number, extraction: number, step: number) => {
  if (level > extraction) return 0;
  return 0.35 + 0.65 * Math.min((extraction - level) / step + 0.5, 1);
};

/** Fixed strip pool: enough lines for the window at any demand phase. */
const STRIP_POOL = Math.ceil((2 * WINDOW_HALF) / STRIP_STEP) + 2;

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
      {/* The harvested lattice: one hairline per 1/25 of rated draw.
          The full pool always renders (unfilled slots at opacity 0) so
          the live rAF loop can own presence without mounting nodes. */}
      {Array.from({ length: LATTICE_LINES }, (_, i) => {
        const level = (i + 0.5) * latticeStep;
        return (
          <line
            key={i}
            data-vac="bed"
            className="deck-vacuum__lattice"
            x1={xFor(level)}
            x2={xFor(level)}
            y1={BED.top}
            y2={BED.bottom}
            style={{ opacity: latticeOpacity(level, v.extraction, latticeStep) }}
          />
        );
      })}
      {/* Demand: the one firm line the lattice must stay past. */}
      <line
        data-vac="demand"
        className="deck-vacuum__demand"
        x1={demandX}
        x2={demandX}
        y1={BED.top - 4}
        y2={BED.axis + 2}
      />

      {/* The expanded margin strip: the window under magnification. */}
      <line
        data-vac="wedge-lo"
        className="deck-vacuum__wedge"
        x1={demandX - windowPx}
        x2={BED.left}
        y1={BED.axis + 3}
        y2={STRIP.top}
      />
      <line
        data-vac="wedge-hi"
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
      {/* Fixed strip pool: per-index grid level assigned by the live
          loop as the window recenters; unused lines rest at opacity 0. */}
      {Array.from({ length: STRIP_POOL }, (_, k) => {
        const level = (stripFrom + k) * STRIP_STEP;
        const inWindow = level <= stripTo * STRIP_STEP;
        return (
          <line
            key={k}
            data-vac="strip"
            className="deck-vacuum__lattice"
            x1={xExp(level)}
            x2={xExp(level)}
            y1={STRIP.top + 3}
            y2={STRIP.bottom - 3}
            style={{
              opacity: inWindow
                ? latticeOpacity(level, v.extraction, STRIP_STEP)
                : 0,
            }}
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
  drill,
}: VacuumEnergyProps) {
  const epochRef = useRef<number | null>(null);
  const [v, setV] = useState(() => sampleVacuumTelemetry(0));
  const trimRef = useRef<CommitTrim | null>(null);
  trimRef.current = trim ?? null;
  const drillRef = useRef<{ current: DrillTimeline } | null>(null);
  drillRef.current = drill ?? null;
  const clockRef = useRef<() => number>(() => 0);
  clockRef.current =
    clockProp ??
    (() => {
      epochRef.current ??= performance.now();
      return (performance.now() - epochRef.current) / 1000;
    });

  // Readings text and sr mirror stay on the bench cadence.
  useEffect(() => {
    if (!live) return;
    const interval = window.setInterval(() => {
      const t = clockRef.current();
      setV(
        sampleVacuumTelemetry(
          t,
          trimRef.current,
          drillVacuumDelta(t, drillRef.current?.current),
        ),
      );
    }, READINGS_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [live]);

  // The gauge draws per frame: the loop owns the pooled lines'
  // attributes imperatively (React renders them once, below), gated on
  // viewport intersection and tab visibility like every deck loop.
  const hostRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!live) return;
    const host = hostRef.current;
    if (!host) return;
    const bed = Array.from(
      host.querySelectorAll<SVGLineElement>('[data-vac="bed"]'),
    );
    const strip = Array.from(
      host.querySelectorAll<SVGLineElement>('[data-vac="strip"]'),
    );
    const demand = host.querySelector<SVGLineElement>('[data-vac="demand"]');
    const wedgeLo = host.querySelector<SVGLineElement>('[data-vac="wedge-lo"]');
    const wedgeHi = host.querySelector<SVGLineElement>('[data-vac="wedge-hi"]');
    const windowPx = (BED.right - BED.left) * WINDOW_HALF;
    const latticeStep = 1 / LATTICE_LINES;

    let frame = 0;
    let running = false;
    let inView = true;
    const draw = () => {
      const t = clockRef.current();
      const s = sampleVacuumTelemetry(
        t,
        trimRef.current,
        drillVacuumDelta(t, drillRef.current?.current),
      );
      bed.forEach((el, i) => {
        el.style.opacity = latticeOpacity(
          (i + 0.5) * latticeStep,
          s.extraction,
          latticeStep,
        ).toFixed(3);
      });
      const demandX = xFor(s.demand);
      demand?.setAttribute("x1", demandX.toFixed(2));
      demand?.setAttribute("x2", demandX.toFixed(2));
      wedgeLo?.setAttribute("x1", (demandX - windowPx).toFixed(2));
      wedgeHi?.setAttribute("x1", (demandX + windowPx).toFixed(2));
      const windowFloor = s.demand - WINDOW_HALF;
      const stripFrom = Math.ceil(windowFloor / STRIP_STEP);
      strip.forEach((el, k) => {
        const level = (stripFrom + k) * STRIP_STEP;
        const x =
          BED.left +
          ((level - windowFloor) / (2 * WINDOW_HALF)) * (BED.right - BED.left);
        el.setAttribute("x1", x.toFixed(2));
        el.setAttribute("x2", x.toFixed(2));
        el.style.opacity = (
          level <= s.demand + WINDOW_HALF
            ? latticeOpacity(level, s.extraction, STRIP_STEP)
            : 0
        ).toFixed(3);
      });
      frame = window.requestAnimationFrame(draw);
    };
    const syncLoop = () => {
      const should = inView && !document.hidden;
      if (should && !running) {
        running = true;
        frame = window.requestAnimationFrame(draw);
      } else if (!should && running) {
        running = false;
        window.cancelAnimationFrame(frame);
      }
    };
    const io = new IntersectionObserver((entries) => {
      inView = entries[0]?.isIntersecting ?? true;
      syncLoop();
    });
    io.observe(host);
    const onVisibility = () => syncLoop();
    document.addEventListener("visibilitychange", onVisibility);
    syncLoop();
    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [live]);

  // Rendered once with the t=0 sample and held stable: the rAF loop
  // owns the line attributes, so a cadence re-render must never write
  // stale geometry over them.
  const [initialV] = useState(() => sampleVacuumTelemetry(0));
  const gauge = useMemo(() => <VacuumGauge v={initialV} />, [initialV]);

  const readings = formatVacuumReadings(v);
  return (
    <div className="deck-vacuum" ref={hostRef}>
      <div className="js-boot-data">{gauge}</div>
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

import { useEffect, useRef, useState } from "react";
import {
  formatVacuumReadings,
  sampleVacuumTelemetry,
  type VacuumTelemetry,
} from "@core/works/flight-deck/vacuum";

/**
 * Vacuum Energy, the compact invented gauge (shape brief: a quantity
 * with no vehicle analog gets an invented visual language, small and
 * dense, lower-left). The column is a lattice of harvested hairlines:
 * extraction accumulates them from the floor, demand is the one firm
 * line floating in the lattice, and the gap between the lattice top and
 * the demand line is the margin, the only number the operator must not
 * lose. All bone ink; no severity color at nominal.
 *
 * No canvas and no render loop: the model drifts on 10-30s cycles, so
 * the gauge re-samples on the bench readings cadence and the steps stay
 * under a pixel. The same markup serves the static plate at t=0.
 */

interface VacuumEnergyProps {
  /** True once the deck is past the boot ritual: readings tick live. */
  live: boolean;
}

const READINGS_INTERVAL_MS = 400;

/** Gauge geometry, viewBox units. Full scale is 1.0 of rated draw. */
const COLUMN = { x: 10, width: 30, top: 6, bottom: 90 } as const;
const LATTICE_LINES = 25;

const yFor = (value: number) =>
  COLUMN.bottom - (COLUMN.bottom - COLUMN.top) * Math.min(Math.max(value, 0), 1);

export function VacuumGauge({ v }: { v: VacuumTelemetry }) {
  const latticeStep = 1 / LATTICE_LINES;
  const demandY = yFor(v.demand);
  return (
    <svg
      className="deck-vacuum__gauge"
      viewBox="0 0 64 96"
      aria-hidden="true"
    >
      {/* Quarter-scale ticks: the invented unit still gets a ruler. */}
      {[0, 0.25, 0.5, 0.75, 1].map((tick) => (
        <line
          key={tick}
          className="deck-vacuum__tick"
          x1={COLUMN.x - 4}
          x2={COLUMN.x}
          y1={yFor(tick)}
          y2={yFor(tick)}
        />
      ))}
      {/* The harvested lattice: one hairline per 1/25 of rated draw. */}
      {Array.from({ length: LATTICE_LINES }, (_, i) => {
        const level = (i + 0.5) * latticeStep;
        if (level > v.extraction) return null;
        // The surface hairline fades with how much of its slot is filled.
        const fill = Math.min((v.extraction - level) / latticeStep + 0.5, 1);
        return (
          <line
            key={i}
            className="deck-vacuum__lattice"
            x1={COLUMN.x}
            x2={COLUMN.x + COLUMN.width}
            y1={yFor(level)}
            y2={yFor(level)}
            style={{ opacity: 0.35 + 0.65 * fill }}
          />
        );
      })}
      {/* Demand: the one firm line the lattice must stay above. */}
      <line
        className="deck-vacuum__demand"
        x1={COLUMN.x - 2}
        x2={COLUMN.x + COLUMN.width + 6}
        y1={demandY}
        y2={demandY}
      />
      <line
        className="deck-vacuum__frame"
        x1={COLUMN.x}
        x2={COLUMN.x}
        y1={COLUMN.top}
        y2={COLUMN.bottom}
      />
    </svg>
  );
}

export function VacuumEnergy({ live }: VacuumEnergyProps) {
  const epochRef = useRef<number | null>(null);
  const [v, setV] = useState(() => sampleVacuumTelemetry(0));

  useEffect(() => {
    if (!live) return;
    const clock = () => {
      epochRef.current ??= performance.now();
      return (performance.now() - epochRef.current) / 1000;
    };
    const interval = window.setInterval(() => {
      setV(sampleVacuumTelemetry(clock()));
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

/**
 * Vacuum Energy's data model: a fuel gauge for a fuel with no needle of
 * its own. Extraction (what the drive is harvesting), demand (what the
 * bubble is drawing), and margin, the one number the operator must not
 * lose. Pure and deterministic like the field model, so the gauge, the
 * HTML readings, and the text mirror can never disagree.
 *
 * Nominal drift only: extraction rides above demand and the margin
 * breathes but never goes negative here. The drill (phase 5) will push
 * these out of band by feeding the same shapes adversarial inputs, not
 * by a second model.
 */

export interface VacuumTelemetry {
  /** Extraction level, fraction of rated draw currently harvested. */
  extraction: number;
  /** Bubble demand on the same scale. */
  demand: number;
  /** extraction - demand. Nominal is a small positive breath. */
  margin: number;
}

/** Below this margin the gauge reads pinched; the drill will cross it. */
export const MARGIN_FLOOR = 0.012;

/** Incommensurate slow sines: smooth, non-repeating-feeling nominal drift. */
function drift(t: number, freq: number, phase: number): number {
  return Math.sin(t * freq + phase);
}

export function sampleVacuumTelemetry(tSeconds: number): VacuumTelemetry {
  const t = tSeconds;
  const extraction =
    0.318 + 0.022 * drift(t, 0.041, 0.9) + 0.009 * drift(t, 0.017, 2.8);
  // Demand shares extraction's slow term at a lag (the bubble draws what
  // the drive harvests, a breath behind), so the margin breathes but the
  // pair never scissors apart in nominal operation.
  const demand =
    0.284 + 0.018 * drift(t - 2.5, 0.041, 0.9) + 0.007 * drift(t, 0.029, 1.3);
  return {
    extraction,
    demand,
    margin: extraction - demand,
  };
}

export interface VacuumReadings {
  /** The bench line, tabular mono: "VAC 0.318 · DRAW 0.284 · MGN +0.034". */
  line: string;
  /** The screen-reader mirror, a full sentence per the a11y contract. */
  mirror: string;
}

export function formatVacuumReadings(v: VacuumTelemetry): VacuumReadings {
  const extraction = v.extraction.toFixed(3);
  const demand = v.demand.toFixed(3);
  const margin = `${v.margin < 0 ? "-" : "+"}${Math.abs(v.margin).toFixed(3)}`;
  return {
    line: `VAC ${extraction} · DRAW ${demand} · MGN ${margin}`,
    mirror:
      `Vacuum energy nominal. Extraction ${extraction} of rated draw, ` +
      `bubble demand ${demand}, margin ${margin}.`,
  };
}

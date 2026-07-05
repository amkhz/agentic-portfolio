/**
 * The paradigm dissolve's data model (movement 5, shape brief §6-7):
 * DIRD 28's control-paradigm spectrum as a literal control. Pure like
 * the machine: given the slider position this maps where every deck
 * element stands, so the veil, the shader dims, the strip's promotion,
 * and the chamber can never disagree about how dissolved the deck is.
 *
 * Staged regimes, scrubbed feel (locked in the shape brief): within a
 * regime the position drives these envelopes directly; crossing a
 * regime boundary triggers an authored GSAP transition (the score
 * below) that plays while the drag continues. The envelopes are
 * continuous across the whole range, so a slow full drag reads as one
 * dissolve; the crossings add the choreographed events on top.
 *
 * The arc's proof is the promotion: the operator-state strip was on
 * the deck from boot as a monitoring channel, and the consciousness
 * end makes it the control surface. Promoted, never introduced.
 */
import { paradigmRegime, type ParadigmRegime } from "./machine";

export interface DissolveEnvelope {
  /**
   * Deck light level, 1 nominal to LIGHT_FLOOR at the consciousness
   * end: the room darkens as the instruments hand off their light.
   */
  light: number;
  /** The hero render's presence: dims to a ghost, never fully gone
   *  (the field is what the coherence coupling modulates). */
  hero: number;
  /** Peripheral telemetry (horizon strip, vacuum gauge): nearly gone. */
  telemetry: number;
  /** The translation layer: the first thing the operator lets go of. */
  panel: number;
  /** Operator strip promotion, 0 watcher to 1 control surface. */
  promotion: number;
  /** Coherence-to-field coupling gain; nonzero only in consciousness. */
  coupling: number;
}

/** The consciousness end is nearly dark, never black (house hand). */
export const LIGHT_FLOOR = 0.16;

function smooth(edge0: number, edge1: number, x: number): number {
  const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1);
  return t * t * (3 - 2 * t);
}

export function dissolveAt(p: number): DissolveEnvelope {
  const x = Math.min(Math.max(p, 0), 1);
  return {
    light: 1 - (1 - LIGHT_FLOOR) * smooth(0.12, 0.96, x),
    hero: 1 - 0.7 * smooth(0.3, 0.95, x),
    telemetry: 1 - 0.9 * smooth(0.25, 0.85, x),
    panel: 1 - smooth(0.18, 0.5, x),
    promotion: smooth(0.35, 0.8, x),
    coupling: smooth(2 / 3, 0.95, x),
  };
}

/**
 * The authored crossings' score, pure data like bootScore: the regime
 * caption swap, the emission pulse that walks the bench when a regime
 * boundary is crossed, and the chamber's arrival/departure beats at the
 * consciousness threshold. Choreography (eases, targets) stays in
 * src/works/flight-deck/timelines.
 */
export const paradigmScore = {
  /** Regime caption: old line out, new line in. */
  caption: { outMs: 220, inMs: 420 },
  /** The emission pulse acknowledging a crossing, boot's --emit grammar. */
  pulse: { toMs: 320, backMs: 640 },
  /**
   * The chamber's arrival: the strip's traces hand their light to the
   * center (substance transfer, the deck's one handoff grammar), the
   * chamber blooms, the promotion caption lands last, at reading pace.
   */
  chamber: { handoffMs: 500, bloomMs: 700, captionMs: 420 },
} as const;

export { paradigmRegime, type ParadigmRegime };

/** Regime boundary between two slider positions, if one was crossed. */
export function crossedRegime(
  from: number,
  to: number,
): { from: ParadigmRegime; to: ParadigmRegime } | null {
  const a = paradigmRegime(from);
  const b = paradigmRegime(to);
  return a === b ? null : { from: a, to: b };
}

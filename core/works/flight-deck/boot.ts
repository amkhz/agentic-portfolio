/**
 * The boot ritual's score (locked 2026-07-03, mission doc: D+A blend).
 * Pure data: the beats, their order, and their durations. The GSAP
 * timeline in src/works reads this score; choreography (eases, targets)
 * stays in the presentation layer, so the ritual's grammar is testable
 * without a DOM.
 *
 * Grammar per instrument: sweep, lamp flash in severity order, caption,
 * then data. Completion: one-breath deck settle (bench edge to operator
 * channel) plus emission on the ready light and gauges.
 */

export const SEVERITY_ORDER = ["advisory", "caution", "warning"] as const;
export type Severity = (typeof SEVERITY_ORDER)[number];

export const bootScore = {
  /**
   * The hold-to-start gesture. The hold scrubs the timeline's wake
   * segment; releasing before the threshold runs it backward (ABORT_WAKE).
   */
  hold: { durationMs: 1200, releaseReturnRate: 1.6 },
  /** One certification self-test per instrument, in bench scan order. */
  certification: {
    sweepMs: 850,
    lampFlashMs: 140,
    lampGapMs: 80,
    captionMs: 420,
    dataMs: 360,
    betweenInstrumentsMs: 160,
  },
  /**
   * The one-breath deck settle: a single brightness exhale, with
   * staggerMs pacing the emission wave bench edge -> operator channel
   * (live review 2026-07-03 cut the positional overshoot as a bounce).
   */
  settle: { durationMs: 640, staggerMs: 70 },
  /** Bloom once, hold a quiet glow: an awake deck gives off its own light. */
  emission: { bloomMs: 480, holdMs: 720 },
} as const;

/** Total certification time for one instrument, ms. */
export function certificationDurationMs(): number {
  const c = bootScore.certification;
  return (
    c.sweepMs +
    SEVERITY_ORDER.length * c.lampFlashMs +
    (SEVERITY_ORDER.length - 1) * c.lampGapMs +
    c.captionMs +
    c.dataMs
  );
}

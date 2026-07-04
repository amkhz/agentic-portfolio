/**
 * The commit's consequence, pure. A committed proposal becomes a trim on
 * the deck, and every instrument derives its response from the same
 * envelope functions, deterministic in (t, trim), so the field render,
 * the horizon, the vacuum gauge, and their readings can never disagree
 * about what the maneuver is doing.
 *
 * The envelope encodes the locked choreography's meaning: substance is
 * received and HELD through the lag (the gap between intent and action
 * is the piece's subject), the deformation blooms after it, then the
 * deck settles back to level over half a minute.
 */

export interface CommitTrim {
  /** Deck-clock seconds when the handoff completed. */
  atSeconds: number;
  /** Committed heading, radians in field space. */
  bearing: number;
  /** How hard the timeline pushes, 0 to 1. */
  urgency: number;
  /** Energy cost, rated-draw fraction. */
  draw: number;
}

/**
 * Commit choreography score (locked 2026-07-03: tighten, substance-
 * transfer handoff, lagged consequence; one timeline owns both layers).
 * Pure data like bootScore, so the beats are testable outside GSAP.
 */
export const commitScore = {
  tightenMs: 400,
  handoffMs: 500,
  lagMs: 600,
} as const;

export const COMMIT_LAG_S = commitScore.lagMs / 1000;
/** The arrival glow the field holds while the lag keeps the gap open. */
export const COMMIT_HOLD_GLOW = 0.35;
const ATTACK_S = 1.2;
const DECAY_TAU_S = 8;
/** The maneuver is fully settled and the trim is spent. */
export const COMMIT_DONE_S = 26;

function smooth(edge0: number, edge1: number, x: number): number {
  const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1);
  return t * t * (3 - 2 * t);
}

/**
 * The consequence envelope: zero through the lag, a bloom over the
 * attack, then a long exponential settle, clean zero by COMMIT_DONE_S.
 */
export function commitResponse(dtSeconds: number): number {
  if (dtSeconds < COMMIT_LAG_S || dtSeconds >= COMMIT_DONE_S) return 0;
  const rise = smooth(COMMIT_LAG_S, COMMIT_LAG_S + ATTACK_S, dtSeconds);
  const decay = Math.exp(
    -Math.max(dtSeconds - (COMMIT_LAG_S + ATTACK_S), 0) / DECAY_TAU_S,
  );
  const fade = 1 - smooth(COMMIT_DONE_S - 4, COMMIT_DONE_S, dtSeconds);
  return rise * decay * fade;
}

/**
 * What the field render shows: the received substance held through the
 * lag, then the deformation taking over from the arrival glow.
 */
export function commitGlow(dtSeconds: number): number {
  const held =
    dtSeconds >= 0 && dtSeconds < COMMIT_LAG_S + ATTACK_S
      ? COMMIT_HOLD_GLOW
      : 0;
  return Math.max(held, commitResponse(dtSeconds));
}

export interface OrientationDelta {
  bank: number;
  pitch: number;
  flow: number;
}

const ZERO_ORIENTATION: OrientationDelta = { bank: 0, pitch: 0, flow: 0 };

/**
 * The horizon's share of the maneuver: bank into the turn (side chosen
 * by the committed heading), a touch of nose, flow up with urgency.
 */
export function orientationCommitDelta(
  tSeconds: number,
  trim: CommitTrim | null | undefined,
): OrientationDelta {
  if (!trim) return ZERO_ORIENTATION;
  const r = commitResponse(tSeconds - trim.atSeconds);
  if (r === 0) return ZERO_ORIENTATION;
  const side = Math.cos(trim.bearing) >= 0 ? 1 : -1;
  return {
    bank: side * (1.2 + 2.1 * trim.urgency) * r,
    pitch: 0.5 * trim.urgency * r,
    flow: 0.12 * trim.urgency * r,
  };
}

export interface VacuumDelta {
  demand: number;
  extraction: number;
}

const ZERO_VACUUM: VacuumDelta = { demand: 0, extraction: 0 };

/**
 * The gauge's share: demand steps up and the drive answers most of it
 * at once, with the last third catching up over a couple of seconds, so
 * the margin visibly pinches toward the floor and then recovers. The
 * unmet fraction is bounded (never more than 0.35 of the draw, and the
 * draw is capped at 0.03 by the translation layer), so a commit can
 * kiss the floor but never flips the margin negative.
 */
export function vacuumCommitDelta(
  tSeconds: number,
  trim: CommitTrim | null | undefined,
): VacuumDelta {
  if (!trim) return ZERO_VACUUM;
  const dt = tSeconds - trim.atSeconds;
  if (dt < COMMIT_LAG_S || dt >= COMMIT_DONE_S) return ZERO_VACUUM;
  const settle =
    Math.exp(-Math.max(dt - (COMMIT_LAG_S + 2), 0) / 14) *
    (1 - smooth(COMMIT_DONE_S - 4, COMMIT_DONE_S, dt));
  const step = smooth(COMMIT_LAG_S, COMMIT_LAG_S + 0.8, dt);
  const demand = step * settle;
  const catchUp = smooth(COMMIT_LAG_S + 0.8, COMMIT_LAG_S + 2.4, dt);
  const extraction = (0.65 * step + 0.35 * catchUp) * settle;
  return {
    demand: trim.draw * demand,
    extraction: trim.draw * Math.min(extraction, demand),
  };
}

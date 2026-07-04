/**
 * Deck-local spring presets for the reactive lane (ADR-017 D4: if it
 * responds to the operator, it springs). Kept inside the deck's scope
 * rather than imported from the portfolio's motionConfig so the work
 * stays self-contained (D2). Doctrine holds either way: arrival is
 * critically damped, bounce 0, no overshoot on anything that reads as
 * telemetry.
 */

export const deckSpringSoft = {
  type: "spring",
  bounce: 0,
  duration: 0.5,
} as const;

/** The utilization needle: firm tracking, no wobble on a load meter. */
export const deckNeedleSpring = {
  stiffness: 120,
  damping: 26,
  mass: 0.8,
} as const;

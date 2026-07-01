/**
 * JS mirror of the motion tokens defined in `src/styles/globals.css` (@theme).
 *
 * motion/react needs literal numeric/array values (it can't read CSS custom
 * properties for its spring/bezier math), so the doctrine easing curve and the
 * duration bands are duplicated here intentionally. Keep these in sync with
 * `--ease-out-expo` and `--duration-*` if those ever change.
 *
 * Doctrine (VECTOR P4): ease-out-expo is the entrance/focus curve — a long
 * decelerating tail, no overshoot. No bounce, no elastic, ever.
 */

/**
 * Spring presets for entrance/arrival choreography. Real spring physics read as
 * organic and alive where a fixed bezier reads mechanical. `bounce: 0` keeps
 * them critically damped — settle, never overshoot (doctrine: no bounce).
 *   springSettle — the slow, cushioned arrival (hero settle, list cascade).
 *   springSoft   — a quicker settle for lightweight transitions (page entry).
 */
export const springSettle = { type: "spring", bounce: 0, duration: 0.9 } as const;
export const springSoft = { type: "spring", bounce: 0, duration: 0.55 } as const;

/**
 * Snappy arrival for micro-reveals — a term popover or small card that should
 * appear the instant it's summoned, not settle in like a page. Still bounce 0
 * (informational surfaces arrive without overshoot per doctrine); just quicker
 * than springSoft's page-entry cushion.
 */
export const springSnappy = { type: "spring", bounce: 0, duration: 0.3 } as const;

/**
 * Interaction spring for hover/focus lift. Unlike the arrival springs above this
 * one carries a small `bounce` — a deliberate, lightly-damped wave so the lift
 * settles with life instead of ramping mechanically. Micro-interaction only;
 * the arrival/page register stays overshoot-free per doctrine.
 */
export const springHover = { type: "spring", bounce: 0.3, duration: 0.4 } as const;

/** Smoothing spring for scroll-linked values (parallax) — gives drift weight. */
export const scrollSpring = { stiffness: 80, damping: 24, mass: 0.6 } as const;

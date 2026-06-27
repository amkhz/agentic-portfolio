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

/** cubic-bezier(0.16, 1, 0.3, 1) — mirrors --ease-out-expo. */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

/** Durations in seconds (motion/react unit). Mirror --duration-* (ms). */
export const duration = {
  fast: 0.1,
  normal: 0.2,
  slow: 0.4,
  slower: 0.6,
} as const;

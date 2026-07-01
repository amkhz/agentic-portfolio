// The Perihelion house mark (Workstream D, candidate A "Instrument").
// One geometry, two materializations switched by theme scope: on
// graphite the mark emits (gradient stroke, halo'd brass dot); on
// cream it is inked (solid stroke, no halo, the orbit broken at
// periapsis so the dot sits in clearspace, press logic). The register
// swap is pure CSS (.peri-mark rules in lab.css), so a mid-session
// theme flip repaints without remounting or replaying the draw-in.
//
// The 45deg cant is baked into the geometry (a rotate transform on the
// inner <g>, with the viewBox computed to bound the rotated mark), so
// the SVG's layout box is the visual box: clearspace is enforceable
// and overflow-hidden ancestors can't clip the orbit. Only the halo
// bleeds past the viewBox, which overflow="visible" allows for.
//
// Optional once-per-mount draw-in: orbit traces in, then the aphelion
// micro-dot, then the perihelion dot pops with slight overshoot, and
// the transit runs once as the final beat (so touch users and
// non-mousing visitors meet it too). prefers-reduced-motion always
// renders complete and static.
//
// Transit delight (live-accepted): a brass spark orbits once and the
// dot flares as it arrives at periapsis. Triggered by pointerenter or
// keyboard focus on the wrapping link, via the peri-mark--transit
// class that only clears on animationend, so a started transit always
// completes instead of vanishing mid-orbit. Reduced motion's global
// animation kill ends the transit instantly at its invisible state.
import { useEffect, useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { springSoft, springHover } from "@/components/effects/motionConfig";

interface PerihelionMarkProps {
  /** Rendered width in px; the viewBox is square, so height = width. */
  width?: number;
  /** Once-per-mount draw-in (ends with one transit). Reduced motion renders complete. */
  animated?: boolean;
  className?: string;
}

// Draw-in ends at 1.2s (perihelion pop 0.65 + 0.55); the first-load
// transit fires just after as the sequence's final beat.
const FIRST_TRANSIT_DELAY_MS = 1350;

export function PerihelionMark({
  width = 44,
  animated = false,
  className = "",
}: PerihelionMarkProps) {
  const shouldReduce = useReducedMotion();
  const isStatic = !animated || shouldReduce;

  // Transit runs while this is set and clears on animationend, so a
  // pointer that leaves mid-orbit doesn't kill the spark. Keyboard
  // focus is handled in CSS (a:focus-visible rules in lab.css).
  const [transiting, setTransiting] = useState(false);

  useEffect(() => {
    if (isStatic) return;
    const timer = setTimeout(() => setTransiting(true), FIRST_TRANSIT_DELAY_MS);
    return () => clearTimeout(timer);
  }, [isStatic]);

  // url(#...) references choke on the colons useId emits.
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const gradientId = `peri-grad-${uid}`;
  const haloId = `peri-halo-${uid}`;
  const punchId = `peri-punch-${uid}`;

  const orbit = isStatic
    ? { initial: { pathLength: 1 }, animate: { pathLength: 1 } }
    : {
        initial: { pathLength: 0 },
        animate: { pathLength: 1 },
        transition: { delay: 0.15, ...springSoft },
      };

  // Opacity animates on a wrapper <g> so the circle's own opacity can
  // stay register-driven (dim ember on graphite, full ink on cream).
  const aphelion = isStatic
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 0.55, ...springSoft },
      };

  const perihelion = isStatic
    ? { initial: { scale: 1, opacity: 1 }, animate: { scale: 1, opacity: 1 } }
    : {
        initial: { scale: 0, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        // The pop's "slight overshoot" now comes from real spring physics
        // (springHover carries the only sanctioned micro-overshoot) instead
        // of a hand-keyed 1.25 scale beat.
        transition: { delay: 0.65, ...springHover },
      };

  return (
    <svg
      aria-hidden
      className={`peri-mark ${transiting ? "peri-mark--transit" : ""} ${className}`.trim()}
      viewBox="6.5 -7.5 49 49"
      width={width}
      height={width}
      fill="none"
      overflow="visible"
      onPointerEnter={() => setTransiting(true)}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="64"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" className="peri-mark__stop-dim" />
          <stop offset="55%" className="peri-mark__stop-mid" />
          <stop offset="100%" className="peri-mark__stop-peri" />
        </linearGradient>
        <filter id={haloId} x="-300%" y="-300%" width="700%" height="700%">
          <feGaussianBlur stdDeviation="2.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Clearspace punch for the ink register. The mask is applied
            unconditionally as an SVG attribute (1.1-core, no CSS mask
            shorthand involved); the theme decides by recoloring the
            punch circle in lab.css: white (keep) on graphite, black
            (punch) on cream. */}
        <mask id={punchId} maskUnits="userSpaceOnUse" x="-6" y="-6" width="76" height="48">
          <rect x="-6" y="-6" width="76" height="48" fill="white" />
          <circle className="peri-mark__punch" cx="58" cy="18" r="5.5" />
        </mask>
      </defs>

      {/* Invisible hit area (axis-aligned, outside the canted group) so
          the transit pointerenter triggers anywhere over the mark's
          box, not just on the thin painted strokes. */}
      <rect className="peri-mark__hit" x="4" y="-10" width="54" height="54" />

      {/* All painted geometry lives in pre-rotation coordinates inside
          the canted group; gradient, mask, and the spark's offset-path
          (in lab.css) share that space, so none of them need rotated
          values. */}
      <g transform="rotate(45 32 18)">
        {/* Orbit */}
        <motion.ellipse
          className="peri-mark__orbit"
          cx="30"
          cy="18"
          rx="28"
          ry="14"
          stroke={`url(#${gradientId})`}
          mask={`url(#${punchId})`}
          {...orbit}
        />

        {/* Transit spark: behavior lives in the .peri-mark__spark rules
            in lab.css. animationend is the only thing that clears the
            transit, so a started orbit always completes. */}
        <circle
          className="peri-mark__spark"
          cx="0"
          cy="0"
          r="1.76"
          onAnimationEnd={(event) => {
            if (event.animationName === "peri-mark-transit") {
              setTransiting(false);
            }
          }}
        />

        {/* Aphelion, far-side micro dot */}
        <motion.g {...aphelion}>
          <circle className="peri-mark__aphelion" cx="2" cy="18" r="1" />
        </motion.g>

        {/* Perihelion, brass dot at closest approach */}
        <motion.circle
          className="peri-mark__dot"
          cx="58"
          cy="18"
          r="3"
          filter={`url(#${haloId})`}
          style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          {...perihelion}
        />
      </g>
    </svg>
  );
}

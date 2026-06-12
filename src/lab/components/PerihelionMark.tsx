// The Perihelion house mark (Workstream D, candidate A "Instrument").
// One geometry, two materializations switched by theme scope: on
// graphite the mark emits (gradient stroke, halo'd brass dot); on
// cream it is inked (solid stroke, no halo, the orbit broken at
// periapsis so the dot sits in clearspace, press logic). The register
// swap is pure CSS (.peri-mark rules in lab.css), so a mid-session
// theme flip repaints without remounting or replaying the draw-in.
//
// Optional once-per-mount draw-in: orbit traces in, then the aphelion
// micro-dot, then the perihelion dot pops with slight overshoot.
// prefers-reduced-motion always renders complete and static.
//
// Transit delight (live-accepted): hovering the mark sends a brass
// spark once around the orbit and the dot flares as it arrives. Pure
// CSS (.peri-mark__spark rules in lab.css), so reduced motion's global
// animation kill ends the transit instantly at its invisible state.
import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";

interface PerihelionMarkProps {
  /** Rendered width in px; height follows the 64:36 viewBox ratio. */
  width?: number;
  /** Once-per-mount draw-in. Reduced motion renders complete. */
  animated?: boolean;
  className?: string;
}

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export function PerihelionMark({
  width = 58,
  animated = false,
  className = "",
}: PerihelionMarkProps) {
  const shouldReduce = useReducedMotion();
  const isStatic = !animated || shouldReduce;

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
        transition: { delay: 0.15, duration: 0.52, ease: EASE_OUT },
      };

  // Opacity animates on a wrapper <g> so the circle's own opacity can
  // stay register-driven (dim ember on graphite, full ink on cream).
  const aphelion = isStatic
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 0.55, duration: 0.4, ease: EASE_OUT },
      };

  const perihelion = isStatic
    ? { initial: { scale: 1, opacity: 1 }, animate: { scale: 1, opacity: 1 } }
    : {
        initial: { scale: 0, opacity: 0 },
        animate: { scale: [0, 1.25, 1], opacity: [0, 1, 1] },
        transition: {
          delay: 0.65,
          duration: 0.55,
          times: [0, 0.55, 1],
          ease: "easeOut" as const,
        },
      };

  return (
    <svg
      aria-hidden
      className={`peri-mark ${className}`.trim()}
      viewBox="0 0 64 36"
      width={width}
      height={(width * 36) / 64}
      fill="none"
      overflow="visible"
      style={{ transform: "rotate(45deg)", transformOrigin: "50% 50%" }}
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
        {/* Clearspace punch for the ink register: lab.css applies it via
            the --peri-mark-punch var only under [data-theme="light"]. */}
        <mask id={punchId} maskUnits="userSpaceOnUse" x="-6" y="-6" width="76" height="48">
          <rect x="-6" y="-6" width="76" height="48" fill="white" />
          <circle cx="58" cy="18" r="5.5" fill="black" />
        </mask>
      </defs>

      {/* Invisible hit area so the transit hover triggers anywhere over
          the mark's box, not just on the thin painted strokes. */}
      <rect className="peri-mark__hit" x="-6" y="-8" width="76" height="52" />

      {/* Orbit */}
      <motion.ellipse
        className="peri-mark__orbit"
        cx="30"
        cy="18"
        rx="28"
        ry="14"
        stroke={`url(#${gradientId})`}
        style={{ ["--peri-mark-punch" as string]: `url(#${punchId})` }}
        {...orbit}
      />

      {/* Transit spark: hovering the mark sends it once around the
          orbit, the dot flares on its arrival at periapsis. Behavior
          lives in the .peri-mark__spark rules in lab.css. */}
      <circle className="peri-mark__spark" cx="0" cy="0" r="1.76" />

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
    </svg>
  );
}

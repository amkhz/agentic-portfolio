// Library ornament: the house mark's large register, elaborated into a
// confocal system. Three nested eccentric orbits whose closest approaches
// all land on the same brass periapsis point — many ideas in orbit, one
// moment of closest approach. Each ring carries a small body drifting at
// its own pace (inner rings faster, as orbits go), and the brass point
// exhales a faint ring once per inner-body orbit, timed to its closest
// approach. Ambient drift + pulse live in lab.css (.peri-sigil rules) so
// prefers-reduced-motion freezes the bodies at scattered static
// positions and hides the pulse via the global animation kill.
// Geometry and scale accepted from live iteration 2026-06-11
// (confocal + arrival pulse, inner ink 0.5, size 1.05, pulse 0.95).
//
// SPIKE (spike/sigil-arc-motion): one added arrival gesture on mount — a
// brass spark swings in along a CURVED orbital arc to closest approach,
// via Motion's arc() (transition.path). It nods to the house mark's
// transit (a spark reaching periapsis) without copying its full CSS
// ellipse orbit: this is a single incoming curve that settles on the
// brass dot. Wave-driven (springSettle, critically damped bounce 0),
// one signature moment, token color only. prefers-reduced-motion renders
// the sigil complete and static, spark hidden.
//
// STORYBOARD — "closest approach" (fires once, ~0.4s after mount)
//
//   t=0.00s  spark invisible at the inner-ring far point (aphelion side)
//            ·                                           ◍  ← brass periapsis
//   t≈0.5s   spark lit, arcing in/up along the curved path (not a straight line)
//                    ✦﹏﹏                                ◍
//                        ⤴ curve bulges perpendicular to travel (arc strength)
//   t≈1.0s   spark reaches closest approach, dissolving into the brass dot
//                                                    ✦→◍
//            (the ambient CSS pulse keeps exhaling underneath, untouched)
//
import { useMemo } from "react";
import { motion, useReducedMotion, arc } from "motion/react";
import { springSettle } from "@/components/effects/motionConfig";

interface PerihelionSigilProps {
  className?: string;
}

// The brass periapsis — the spark's destination and the sigil's anchor.
const PERIAPSIS = { cx: 58, cy: 18 } as const;

// The spark starts at the inner ring's far point (its aphelion side, x=30)
// and travels to the periapsis, so the offset is a pure inward sweep. The
// arc() bulge is perpendicular to this line, which reads as an orbital curve.
const SPARK_START = { x: 30 - PERIAPSIS.cx, y: 0 } as const; // { x: -28, y: 0 }

// arc() config — a restrained curve, not a loop. strength 0.34 keeps the
// bulge tasteful over the ~28-unit sweep; ccw picks a stable side; the spark
// is a dot, so tangent rotation is irrelevant (omitted).
const ARC_STRENGTH = 0.34;

// One beat after the manifesto fades in, so the gesture reads as arrival,
// not load noise.
const SPARK_DELAY_S = 0.4;

export function PerihelionSigil({ className = "" }: PerihelionSigilProps) {
  const shouldReduce = useReducedMotion();

  // Reuse the arc() instance across renders (its continuity closure has no
  // memory if recreated); a fresh one per render would reset mid-flight.
  const orbitalArc = useMemo(() => arc({ strength: ARC_STRENGTH, direction: "ccw" }), []);

  // Motion props for the arrival spark. Reduced motion → hidden + instant.
  const sparkMotion = shouldReduce
    ? { initial: { opacity: 0 }, animate: { opacity: 0 } }
    : {
        initial: { x: SPARK_START.x, y: SPARK_START.y, opacity: 0 },
        animate: { x: 0, y: 0, opacity: [0, 0.9, 0.9, 0] },
        transition: {
          path: orbitalArc,
          ...springSettle, // drives x/y arrival: critically damped, bounce 0
          delay: SPARK_DELAY_S,
          opacity: {
            duration: springSettle.duration,
            times: [0, 0.2, 0.7, 1],
            ease: "easeOut" as const,
            delay: SPARK_DELAY_S,
          },
        },
      };

  return (
    <span
      aria-hidden
      className={`inline-flex h-[124px] w-[124px] items-center justify-center ${className}`.trim()}
    >
      <svg
        viewBox="0 0 64 36"
        width="112"
        height="63"
        fill="none"
        overflow="visible"
        style={{ transform: "rotate(45deg)", transformOrigin: "50% 50%" }}
      >
        <defs>
          <linearGradient
            id="perihelion-orbit-gradient"
            x1="0"
            y1="0"
            x2="64"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              offset="0%"
              style={{ stopColor: "var(--lab-text-muted)", stopOpacity: 0.25 }}
            />
            <stop
              offset="55%"
              style={{ stopColor: "var(--lab-text-muted)", stopOpacity: 0.85 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "var(--guide-accent)", stopOpacity: 1 }}
            />
          </linearGradient>
          <filter
            id="perihelion-dot-halo"
            x="-300%"
            y="-300%"
            width="700%"
            height="700%"
          >
            <feGaussianBlur stdDeviation="2.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer orbit — the house mark's own geometry */}
        <ellipse
          cx="30"
          cy="18"
          rx="28"
          ry="14"
          stroke="url(#perihelion-orbit-gradient)"
          strokeWidth="1.25"
        />
        {/* Inner rings, tangent to the same periapsis */}
        <ellipse
          className="peri-sigil__ring"
          cx="37"
          cy="18"
          rx="21"
          ry="10"
          stroke="var(--lab-text-muted)"
          strokeWidth="0.9"
        />
        <ellipse
          className="peri-sigil__ring"
          cx="44"
          cy="18"
          rx="14"
          ry="6.5"
          stroke="var(--lab-text-muted)"
          strokeWidth="0.75"
        />

        {/* One body per ring, drifting (see lab.css) */}
        <circle className="peri-sigil__body peri-sigil__body--outer" r="1.1" />
        <circle className="peri-sigil__body peri-sigil__body--mid" r="0.9" />
        <circle className="peri-sigil__body peri-sigil__body--inner" r="0.7" />

        {/* Arrival pulse — exhales as the inner body reaches periapsis */}
        <circle
          className="peri-sigil__pulse"
          cx="58"
          cy="18"
          r="3"
          stroke="var(--guide-accent)"
          strokeWidth="0.6"
        />
        {/* The shared periapsis — brass dot with halo */}
        <circle
          cx="58"
          cy="18"
          r="3"
          fill="var(--guide-accent)"
          filter="url(#perihelion-dot-halo)"
        />

        {/* SPIKE: arc() arrival spark. Base position is the periapsis; the
            x/y offset above sweeps it in along the curved path, arriving at
            (0,0) = closest approach. Sits above the dot so it dissolves in. */}
        <motion.circle
          cx={PERIAPSIS.cx}
          cy={PERIAPSIS.cy}
          r="1.3"
          fill="var(--guide-accent)"
          {...sparkMotion}
        />
      </svg>
    </span>
  );
}

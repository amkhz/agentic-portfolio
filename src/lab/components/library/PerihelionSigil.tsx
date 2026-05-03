// A small typographic ornament for the library masthead: an elliptical
// orbit with a single filled dot at the perihelion point — the moment
// of closest approach. A faint aphelion micro-dot anchors the opposite
// extreme. The orbit stroke runs as a gradient from dim at apoapsis
// to brass at periapsis, with a soft glow so the geometry reads as
// holographic rather than diagrammatic. Tilted 45° for perspective.
//
// Animation sequence on mount: orbit stroke draws in (~520ms), aphelion
// dot fades in, then the perihelion dot pops in with a slight overshoot.
// prefers-reduced-motion renders everything fully drawn and static.
import { motion, useReducedMotion } from "motion/react";

interface PerihelionSigilProps {
  className?: string;
}

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export function PerihelionSigil({ className = "" }: PerihelionSigilProps) {
  const shouldReduce = useReducedMotion();

  const orbit = shouldReduce
    ? { initial: { pathLength: 1 }, animate: { pathLength: 1 } }
    : {
        initial: { pathLength: 0 },
        animate: { pathLength: 1 },
        transition: { delay: 0.5, duration: 0.52, ease: EASE_OUT },
      };

  const aphelion = shouldReduce
    ? { initial: { opacity: 0.4 }, animate: { opacity: 0.4 } }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 0.4 },
        transition: { delay: 0.95, duration: 0.4, ease: EASE_OUT },
      };

  const perihelion = shouldReduce
    ? { initial: { scale: 1, opacity: 1 }, animate: { scale: 1, opacity: 1 } }
    : {
        initial: { scale: 0, opacity: 0 },
        animate: { scale: [0, 1.25, 1], opacity: [0, 1, 1] },
        transition: {
          delay: 1.0,
          duration: 0.55,
          times: [0, 0.55, 1],
          ease: "easeOut" as const,
        },
      };

  return (
    <span
      aria-hidden
      className={`inline-flex h-[80px] w-[80px] items-center justify-center ${className}`.trim()}
    >
      <svg
        viewBox="0 0 64 36"
        width="64"
        height="36"
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
            id="perihelion-orbit-bloom"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feGaussianBlur stdDeviation="0.6" />
          </filter>
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

        {/* Soft outer bloom of the orbit (sits behind the sharp stroke) */}
        <motion.ellipse
          cx="30"
          cy="18"
          rx="28"
          ry="14"
          stroke="url(#perihelion-orbit-gradient)"
          strokeWidth="3"
          strokeOpacity="0.35"
          filter="url(#perihelion-orbit-bloom)"
          {...orbit}
        />
        {/* Sharp orbit stroke */}
        <motion.ellipse
          cx="30"
          cy="18"
          rx="28"
          ry="14"
          stroke="url(#perihelion-orbit-gradient)"
          strokeWidth="1.25"
          {...orbit}
        />

        {/* Aphelion — far-side micro dot */}
        <motion.circle
          cx="2"
          cy="18"
          r="1"
          fill="var(--lab-text-muted)"
          {...aphelion}
        />

        {/* Perihelion — brass dot with halo */}
        <motion.circle
          cx="58"
          cy="18"
          r="3"
          fill="var(--guide-accent)"
          filter="url(#perihelion-dot-halo)"
          style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          {...perihelion}
        />
      </svg>
    </span>
  );
}

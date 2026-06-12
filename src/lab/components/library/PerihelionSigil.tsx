// Library ornament: the house mark's large register, elaborated into a
// confocal system. Three nested eccentric orbits whose closest approaches
// all land on the same brass periapsis point — many ideas in orbit, one
// moment of closest approach. Each ring carries a small body drifting at
// its own pace (inner rings faster, as orbits go), and the brass point
// exhales a faint ring once per inner-body orbit, timed to its closest
// approach. All motion lives in lab.css (.peri-sigil rules) so
// prefers-reduced-motion freezes the bodies at scattered static
// positions and hides the pulse via the global animation kill.
// Geometry and scale accepted from live iteration 2026-06-11
// (confocal + arrival pulse, inner ink 0.5, size 1.05, pulse 0.95).

interface PerihelionSigilProps {
  className?: string;
}

export function PerihelionSigil({ className = "" }: PerihelionSigilProps) {
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
      </svg>
    </span>
  );
}

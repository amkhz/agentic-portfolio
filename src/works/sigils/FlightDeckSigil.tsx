/**
 * The Flight Deck's sigil (commissioned by the Works shelf shape brief,
 * vector/briefs/works-shelf-shape-2026-07-05.md §9): the field ring seen
 * as a gauge, drawn in the house sigil's hand. A bone-ink wall circle with
 * a dense arc at the top of its ramp, three radial ticks at the tracked
 * stress bearings, a committed-bearing stroke from center to wall, and a
 * single accent point with halo where the stroke meets the wall (the
 * arrival glow; cousin of the house mark's periapsis dot).
 *
 * Standalone leaf module with zero deck imports, so the lab shelf can
 * import it statically without pulling deck code into the labs bundle
 * (ADR-017 D5). No literal color anywhere: ink rides currentColor; the
 * accent point reads `--sigil-accent` (shelf sets it to the guide-accent
 * cascade, the decline card to the deck's caution amber); the halo's
 * strength reads `--sigil-halo`, so consumers can hover-gate the emission.
 */
interface FlightDeckSigilProps {
  className?: string;
}

// The committed bearing (34 degrees off vertical, the deck's own demo
// bearing) fixes the arrival point on the wall; the dense arc brackets it.
const ARRIVAL = { x: 35.5, y: 11.9 } as const;

export function FlightDeckSigil({ className = "" }: FlightDeckSigilProps) {
  return (
    <svg
      viewBox="0 0 52 52"
      fill="none"
      aria-hidden="true"
      overflow="visible"
      className={className}
    >
      <defs>
        <filter
          id="fd-sigil-halo"
          x="-300%"
          y="-300%"
          width="700%"
          height="700%"
        >
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
      </defs>

      {/* The wall ring */}
      <circle
        cx="26"
        cy="26"
        r="17"
        stroke="currentColor"
        strokeWidth="1.1"
        opacity="0.5"
      />
      {/* Dense sector at the ramp top, bracketing the arrival point */}
      <path
        d="M 28.95 9.26 A 17 17 0 0 1 39.9 16.25"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        opacity="0.9"
      />
      {/* Three tracked stress bearings, ticked just outside the wall */}
      <path
        d="M 16.75 9.98 L 15.5 7.81 M 44.22 22.79 L 46.68 22.35 M 9.98 35.25 L 7.81 36.5"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* The committed bearing: hub and stroke toward the wall */}
      <circle cx="26" cy="26" r="1.2" fill="currentColor" opacity="0.85" />
      <line
        x1="26"
        y1="26"
        x2="33.8"
        y2="14.4"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.75"
      />
      {/* Arrival emission: halo under the point, strength set per surface */}
      <circle
        cx={ARRIVAL.x}
        cy={ARRIVAL.y}
        r="3.2"
        fill="var(--sigil-accent, currentColor)"
        filter="url(#fd-sigil-halo)"
        style={{
          opacity: "var(--sigil-halo, 0.5)",
          transition: "opacity var(--duration-normal, 200ms) ease-out",
        }}
      />
      <circle
        cx={ARRIVAL.x}
        cy={ARRIVAL.y}
        r="2.1"
        fill="var(--sigil-accent, currentColor)"
      />
    </svg>
  );
}

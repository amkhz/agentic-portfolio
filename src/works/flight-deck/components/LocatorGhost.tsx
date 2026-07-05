import type { AxialRidgeMark } from "@core/works/flight-deck/field";

/**
 * The locator ghost (Works 01.1): the ultrasound body-marker move. A
 * schematic silhouette of the whole bubble, nose to the right (FORE
 * right, matching the scrubber's ends), with the one firm line at the
 * current cut (the vacuum gauge's "demand is the one firm line"
 * grammar) and faint axial ticks where the stress ridges run. SVG, not
 * a shader: it is a locator glyph, not a render; no loop, no third GL
 * context. Re-samples ride the readings cadence upstream; the slice
 * line tracks the scrubber input directly. Decorative (aria-hidden):
 * the readings line and mirror carry the plane for a11y, and the t=0
 * still serves the static plate for free.
 */

interface LocatorGhostProps {
  /** The current cut, -1 aft to +1 fore. */
  slice: number;
  /** Axial ridge positions from the model (three tracked + the flank). */
  marks: AxialRidgeMark[];
}

// Hull geometry in viewBox units: nose-right ellipse.
const CX = 32;
const CY = 13;
const RX = 26;
const RY = 9;
/** Axial s maps just inside the hull so the line never pokes the nose. */
const AXIS_REACH = RX - 2;

function sliceX(s: number): number {
  return CX + s * AXIS_REACH;
}

/** The cut line's half-height: the hull's own section at that station. */
function sliceHalfHeight(s: number): number {
  const nx = (s * AXIS_REACH) / RX;
  return Math.max(RY * Math.sqrt(Math.max(1 - nx * nx, 0)), 1.5);
}

export function LocatorGhost({ slice, marks }: LocatorGhostProps) {
  const x = sliceX(slice);
  const h = sliceHalfHeight(slice);
  return (
    <svg
      className="deck-ghost"
      viewBox="0 0 64 30"
      aria-hidden="true"
      fill="none"
    >
      {/* The whole bubble, in silhouette. */}
      <ellipse
        cx={CX}
        cy={CY}
        rx={RX}
        ry={RY}
        stroke="var(--deck-line)"
        strokeWidth="1"
      />
      {/* Where the ridges run along the axis, ticked under the hull. */}
      {marks.map((mark, i) => (
        <line
          key={i}
          x1={sliceX(mark.center)}
          y1={25.5}
          x2={sliceX(mark.center)}
          y2={28}
          stroke="var(--deck-ink-faint)"
          strokeWidth="1"
        />
      ))}
      {/* The one firm line: the current cut. */}
      <line
        x1={x}
        y1={CY - h}
        x2={x}
        y2={CY + h}
        stroke="var(--deck-ink)"
        strokeWidth="1.25"
      />
    </svg>
  );
}

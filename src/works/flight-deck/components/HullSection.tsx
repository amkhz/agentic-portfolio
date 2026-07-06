import type { AxialRidgeMark } from "@core/works/flight-deck/field";

/**
 * The bubble in silhouette, nose right, drawn to span whatever width its
 * host gives it (Works 01.1, reworked after Justin's live read: the
 * standalone locator glyph in the legend read as unrelated to the
 * scrubber, and the scale-only ring change read as zoom). This is now
 * the scrubber's own track: the operator drags a cut line through the
 * body itself, which is the whole 3D story told by the control. The
 * static plate reuses it with a fixed cut at the reference plane.
 *
 * preserveAspectRatio="none" stretches the hull to the host's box;
 * vector-effect keeps every hairline at line weight. Decorative
 * (aria-hidden by the host): the readings line and mirror carry the
 * plane for a11y.
 */

interface HullSectionProps {
  /** Axial ridge positions from the model (three tracked + the flank). */
  marks: AxialRidgeMark[];
  /** Draw a fixed cut line at this plane (the plate's still). Omit when
      the host overlays its own live cut (the scrubber's thumb). */
  cut?: number;
}

/** Axial s to viewBox x: -1 aft (left) to +1 fore (right). */
function axialX(s: number): number {
  return ((s + 1) / 2) * 100;
}

export function HullSection({ marks, cut }: HullSectionProps) {
  return (
    <svg
      className="deck-hull"
      viewBox="0 0 100 24"
      preserveAspectRatio="none"
      aria-hidden="true"
      fill="none"
    >
      {/* The hull, a spindle nose-to-tail across the full track. */}
      <path
        d="M 0 12 C 20 2.5, 80 2.5, 100 12 C 80 21.5, 20 21.5, 0 12 Z"
        stroke="var(--deck-line)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      {/* The keel line: the axis the cut travels. */}
      <line
        x1="0"
        y1="12"
        x2="100"
        y2="12"
        stroke="var(--deck-line)"
        strokeWidth="1"
        opacity="0.4"
        vectorEffect="non-scaling-stroke"
      />
      {/* The reference plane's home notch at midship. */}
      <line
        x1="50"
        y1="8.5"
        x2="50"
        y2="15.5"
        stroke="var(--deck-ink-faint)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      {/* Where the stress ridges run along the axis. */}
      {marks.map((mark, i) => (
        <line
          key={i}
          x1={axialX(mark.center)}
          y1={10}
          x2={axialX(mark.center)}
          y2={14}
          stroke="var(--deck-ink-faint)"
          strokeWidth="1"
          opacity="0.7"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {/* The plate's fixed cut, when asked for. */}
      {cut !== undefined ? (
        <line
          x1={axialX(cut)}
          y1={3.5}
          x2={axialX(cut)}
          y2={20.5}
          stroke="var(--deck-ink)"
          strokeWidth="1.25"
          vectorEffect="non-scaling-stroke"
        />
      ) : null}
    </svg>
  );
}

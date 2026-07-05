import type { ReactNode } from "react";

/**
 * The spectral ramp's key, per the Wallace ramp probe: a narrow vertical
 * colorbar, cool blue at the foot rising to the golden amber top. Plain
 * words instead of units; the ramp explains itself or it fails the
 * mission test. The locator ghost (Works 01.1) seats above the bar when
 * the consumer passes one: the legend column exists at every aspect, so
 * the ghost survives width regimes the annotation layer cannot.
 */
export function FieldLegend({ ghost }: { ghost?: ReactNode }) {
  return (
    <div className="deck-field__legend" aria-hidden="true">
      {ghost}
      <span className="deck-field__legend-label">Dense</span>
      <span className="deck-field__legend-bar" />
      <span className="deck-field__legend-label">Thin</span>
    </div>
  );
}

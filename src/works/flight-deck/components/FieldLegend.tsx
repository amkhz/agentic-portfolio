/**
 * The spectral ramp's key, per the Wallace ramp probe: a narrow vertical
 * colorbar, cool blue at the foot rising to the golden amber top. Plain
 * words instead of units; the ramp explains itself or it fails the
 * mission test.
 */
export function FieldLegend() {
  return (
    <div className="deck-field__legend" aria-hidden="true">
      <span className="deck-field__legend-label">Dense</span>
      <span className="deck-field__legend-bar" />
      <span className="deck-field__legend-label">Thin</span>
    </div>
  );
}

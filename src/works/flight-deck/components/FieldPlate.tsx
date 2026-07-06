import { deckCopy } from "@core/works/flight-deck/copy";
import {
  axialRidgeMarks,
  formatFieldReadings,
  formatSlicePlane,
  sampleFieldTelemetry,
} from "@core/works/flight-deck/field";
import { FieldLegend } from "./FieldLegend";
import { HullSection } from "./HullSection";

/**
 * Field Integrity at a legible nominal state, no WebGL and no motion:
 * one still serves both the reduced-motion and the no-WebGL plate
 * (ADR-017 D1). The ring is CSS from the same ramp tokens the shader
 * reads, so the plate and the live render can never disagree on color.
 */
const plateReadings = formatFieldReadings(sampleFieldTelemetry(0));

export function FieldPlate() {
  return (
    <div className="deck-field">
      <div className="deck-field__stage">
        <div className="deck-field__canvas" aria-hidden="true">
          <div className="deck-field-plate__ring" />
        </div>
        <FieldLegend />
      </div>
      {/* The hull still, cut at the reference plane: the slice plane's
          story survives into both plates (Works 01.1). */}
      <div className="deck-slice deck-slice--still" aria-hidden="true">
        <span className="deck-slice__label">{deckCopy.slice.label}</span>
        <span className="deck-slice__end">{deckCopy.slice.aft}</span>
        <div className="deck-slice__track-box">
          <HullSection marks={axialRidgeMarks(0)} cut={0} />
        </div>
        <span className="deck-slice__end">{deckCopy.slice.fore}</span>
        <span className="deck-slice__value">{formatSlicePlane(0)}</span>
      </div>
      <p
        className="mt-3 text-2xl tabular-nums text-[var(--deck-ink)]"
        aria-hidden="true"
      >
        {plateReadings.line}
      </p>
      <p className="sr-only">{plateReadings.mirror}</p>
    </div>
  );
}

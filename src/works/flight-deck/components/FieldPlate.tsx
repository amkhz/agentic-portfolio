import {
  formatFieldReadings,
  sampleFieldTelemetry,
} from "@core/works/flight-deck/field";
import { FieldLegend } from "./FieldLegend";

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

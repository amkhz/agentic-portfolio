import {
  formatOrientationReadings,
  sampleOrientation,
} from "@core/works/flight-deck/orientation";
import { PITCH_FULL_SCALE_DEG } from "./SyntheticOrientation";

/**
 * Synthetic Orientation at a legible nominal state, no WebGL and no
 * motion: one still serves both the reduced-motion and the no-WebGL
 * plate (ADR-017 D1). The horizon line holds the model's t=0 attitude
 * so the still and its readings agree; the ladder lines hold the bench
 * frame the way they do live.
 */
const t0 = sampleOrientation(0);
const plateReadings = formatOrientationReadings(t0);
// Pitch lifts the horizon on the same scale the shader uses.
const pitchShift = (t0.pitch / PITCH_FULL_SCALE_DEG) * 50;

export function OrientationPlate() {
  return (
    <div className="deck-orientation">
      <div className="deck-orientation__canvas" aria-hidden="true">
        <span className="deck-orientation-plate__ladder" />
        <span
          className="deck-orientation-plate__horizon"
          style={{
            transform: `translateY(${(-pitchShift).toFixed(2)}%) rotate(${(-t0.bank).toFixed(2)}deg)`,
          }}
        />
      </div>
      <p
        className="mt-2 text-base tabular-nums text-[var(--deck-ink-dim)]"
        aria-hidden="true"
      >
        {plateReadings.line}
      </p>
      <p className="sr-only">{plateReadings.mirror}</p>
    </div>
  );
}

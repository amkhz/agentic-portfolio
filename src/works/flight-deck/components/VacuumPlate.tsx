import {
  formatVacuumReadings,
  sampleVacuumTelemetry,
} from "@core/works/flight-deck/vacuum";
import { VacuumGauge } from "./VacuumEnergy";

/**
 * Vacuum Energy at a legible nominal state for the static plate: the
 * same gauge markup the live bench uses, frozen at the model's t=0, so
 * the still and the live gauge can never disagree on form or values.
 */
const t0 = sampleVacuumTelemetry(0);
const plateReadings = formatVacuumReadings(t0);

export function VacuumPlate() {
  return (
    <div className="deck-vacuum">
      <VacuumGauge v={t0} />
      <p
        className="mt-3 text-sm tabular-nums text-[var(--deck-ink)]"
        aria-hidden="true"
      >
        {plateReadings.line}
      </p>
      <p className="sr-only">{plateReadings.mirror}</p>
    </div>
  );
}

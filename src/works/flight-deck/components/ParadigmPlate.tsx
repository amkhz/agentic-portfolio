import { deckCopy } from "@core/works/flight-deck/copy";
import {
  REGIME_CENTERS,
  REGIME_ORDER,
} from "@core/works/flight-deck/paradigm";

/**
 * Movement 5 as an annotated still for the static plate: the paradigm
 * slider at its instrumented rest (the machine's t=0), the three
 * regimes named, the caption carrying the instrumented line. No input;
 * the plate is read, not worked, and the sr sentence mirrors it.
 */
export function ParadigmPlate() {
  const regime = deckCopy.paradigm.regimes.instrumented;
  return (
    <div className="deck-paradigm">
      <div className="deck-paradigm__head">
        <span className="deck-paradigm__label">{deckCopy.paradigm.label}</span>
        <span className="deck-paradigm__names" aria-hidden="true">
          {REGIME_ORDER.map((r) => (
            <span
              key={r}
              className="deck-paradigm__name"
              data-active={r === "instrumented" ? "" : undefined}
              style={{ left: `${REGIME_CENTERS[r] * 100}%` }}
            >
              {deckCopy.paradigm.regimes[r].name}
            </span>
          ))}
        </span>
      </div>
      <div className="deck-paradigm__track-box">
        <span className="deck-paradigm__track" aria-hidden="true">
          <span
            className="deck-paradigm__boundary"
            style={{ left: `${100 / 3}%` }}
          />
          <span
            className="deck-paradigm__boundary"
            style={{ left: `${200 / 3}%` }}
          />
        </span>
        <span
          className="deck-paradigm__thumb"
          aria-hidden="true"
          style={{ left: "0%" }}
        />
      </div>
      <p className="deck-paradigm__line">{regime.line}</p>
      <p className="sr-only">
        {deckCopy.paradigm.label}: {regime.name}. {regime.line}
      </p>
    </div>
  );
}

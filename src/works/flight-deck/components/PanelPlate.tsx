import { deckCopy } from "@core/works/flight-deck/copy";
import {
  DEFAULT_INTENT,
  DESTINATIONS,
  formatUtilization,
  proposeTrajectories,
  RISKS,
  TIMELINES,
  utilizationAt,
} from "@core/works/flight-deck/translation";
import { UtilizationMeter } from "./UtilizationMeter";

/**
 * The translation layer at a legible nominal state for the static
 * plate: the default intent spelled out, one drafted route as an
 * annotated still, and the utilization meter resting in the band. Same
 * pure model as the live panel, so the still cannot disagree with it.
 */
const t0Proposal = proposeTrajectories(DEFAULT_INTENT)[0];
const t0Utilization = utilizationAt(0, []);
const t0Reading = formatUtilization(t0Utilization);

const intentLine = [
  DESTINATIONS.find((o) => o.id === DEFAULT_INTENT.destination)?.label,
  TIMELINES.find((o) => o.id === DEFAULT_INTENT.timeline)?.label,
  RISKS.find((o) => o.id === DEFAULT_INTENT.risk)?.label,
]
  .filter(Boolean)
  .join(" · ");

export function PanelPlate() {
  return (
    <div className="deck-panel">
      <div>
        <p className="deck-intent__label">{deckCopy.panel.intentLegend}</p>
        <p className="mt-1 text-sm text-[var(--deck-ink-dim)]">{intentLine}</p>
      </div>
      <div className="deck-proposal">
        <p className="deck-proposal__style">{t0Proposal.style}</p>
        <p className="deck-proposal__summary">{t0Proposal.summary}</p>
        <svg className="deck-proposal__trace-box" viewBox="0 0 100 56" aria-hidden="true">
          <path
            className="deck-proposal__trace"
            d={t0Proposal.route
              .map(
                (p, i) =>
                  `${i === 0 ? "M" : "L"} ${(p.x * 100).toFixed(1)} ${(p.y * 56).toFixed(1)}`,
              )
              .join(" ")}
          />
        </svg>
        <p className="deck-proposal__cost">
          DRAW +{t0Proposal.draw.toFixed(3)} · UTIL +
          {t0Proposal.utilizationCost.toFixed(2)}
        </p>
      </div>
      <div className="deck-panel__meter">
        <div className="flex items-baseline justify-between">
          <span className="deck-intent__label">
            {deckCopy.panel.utilizationLabel}
          </span>
          <span
            className="text-sm tabular-nums text-[var(--deck-ink)]"
            aria-hidden="true"
          >
            {t0Reading.line}
          </span>
        </div>
        <UtilizationMeter value={t0Utilization} />
        <p className="deck-panel__explainer">
          {deckCopy.panel.utilizationExplainer}
        </p>
        <p className="sr-only">{t0Reading.mirror}</p>
      </div>
    </div>
  );
}

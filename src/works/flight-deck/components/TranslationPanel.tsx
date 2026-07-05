import { useEffect, useState, type MutableRefObject } from "react";
import { deckCopy } from "@core/works/flight-deck/copy";
import {
  DESTINATIONS,
  formatUtilization,
  RISKS,
  TIMELINES,
  utilizationAt,
  type DeckIntent,
  type IntentOption,
  type Proposal,
  type UtilizationEvent,
} from "@core/works/flight-deck/translation";
import { UtilizationMeter } from "./UtilizationMeter";

/**
 * The translation dock (option D, 2026-07-04): the slim always-visible
 * core of the translation layer. Intent fields on top, the layer's
 * status line, and the utilization meter docked at the base where the
 * operator's eye rests between decisions. The drafted routes themselves
 * surface in the review space beside the field render (ProposalRow);
 * the commit choreography is owned by DeckSession.
 */

interface TranslationPanelProps {
  /** True once the deck is past the boot ritual. */
  live: boolean;
  /** The shared deck clock, so utilization and trims agree everywhere. */
  clock: () => number;
  /** The operator activity ledger; DeckSession pushes commits into it. */
  activity: MutableRefObject<UtilizationEvent[]>;
  intent: DeckIntent;
  onIntentChange: (patch: Partial<DeckIntent>) => void;
  drafting: boolean;
  /** How many drafts sit on the bench for review. */
  draftedCount: number;
  /** The standing order after a commit, if any. */
  enRoute: Proposal | null;
}

const READINGS_INTERVAL_MS = 400;

function IntentRow({
  label,
  name,
  options,
  value,
  onChange,
}: {
  label: string;
  name: string;
  options: IntentOption[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="deck-intent__row" role="radiogroup" aria-label={label}>
      <span className="deck-intent__label">{label}</span>
      <div className="deck-intent__options">
        {options.map((option) => (
          <label key={option.id} className="deck-intent__option" title={option.hint}>
            <input
              type="radio"
              name={name}
              value={option.id}
              checked={value === option.id}
              onChange={() => onChange(option.id)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export function TranslationPanel({
  live,
  clock,
  activity,
  intent,
  onIntentChange,
  drafting,
  draftedCount,
  enRoute,
}: TranslationPanelProps) {
  const [utilization, setUtilization] = useState(() => utilizationAt(0, []));

  // The meter ticks on the bench readings cadence, same clock as the
  // instruments, so a commit's blip lands where the trim says it does.
  useEffect(() => {
    if (!live) return;
    const interval = window.setInterval(() => {
      setUtilization(utilizationAt(clock(), activity.current));
    }, READINGS_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [live, clock, activity]);

  const reading = formatUtilization(utilization);
  const status = drafting
    ? deckCopy.panel.proposalPending
    : draftedCount > 0
      ? deckCopy.panel.drafted
      : enRoute
        ? `${deckCopy.panel.enRoutePrefix} ${enRoute.summary}`
        : deckCopy.panel.idle;

  return (
    <div className="deck-panel" inert={!live || undefined}>
      <fieldset className="deck-intent js-deck-chrome">
        <legend className="deck-intent__legend">
          {deckCopy.panel.intentLegend}
        </legend>
        <IntentRow
          label={deckCopy.panel.destinationLabel}
          name="deck-destination"
          options={DESTINATIONS}
          value={intent.destination}
          onChange={(destination) => onIntentChange({ destination })}
        />
        <IntentRow
          label={deckCopy.panel.timelineLabel}
          name="deck-timeline"
          options={TIMELINES}
          value={intent.timeline}
          onChange={(timeline) => onIntentChange({ timeline })}
        />
        <IntentRow
          label={deckCopy.panel.riskLabel}
          name="deck-risk"
          options={RISKS}
          value={intent.risk}
          onChange={(risk) => onIntentChange({ risk })}
        />
      </fieldset>

      {/* Visible status only: state changes speak through the session's
          single announcer (the commit flow announces the standing order
          on completion), so the deck never double-speaks. */}
      <p className="deck-panel__status js-deck-chrome">{status}</p>

      {/* The 70% ceiling explainer is a hover reveal per the shape brief
          (and always in the mirror): the visible paragraph was crowding
          the vacuum region below once the paradigm slider claimed its
          height (Justin's live pass, 2026-07-05). */}
      <div
        className="deck-panel__meter js-deck-chrome"
        title={deckCopy.panel.utilizationExplainer}
      >
        <div className="flex items-baseline justify-between">
          <span className="deck-intent__label">
            {deckCopy.panel.utilizationLabel}
          </span>
          <span
            className="js-emit text-sm tabular-nums text-[var(--deck-ink)]"
            aria-hidden="true"
          >
            {reading.line}
          </span>
        </div>
        <UtilizationMeter value={utilization} />
        <p className="sr-only">
          {reading.mirror} {deckCopy.panel.utilizationExplainer}
        </p>
      </div>
    </div>
  );
}

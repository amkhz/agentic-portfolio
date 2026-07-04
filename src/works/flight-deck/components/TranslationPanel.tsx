import { useEffect, useRef, useState, type MutableRefObject } from "react";
import { AnimatePresence, motion } from "motion/react";
import { deckCopy } from "@core/works/flight-deck/copy";
import {
  DEFAULT_INTENT,
  DESTINATIONS,
  formatUtilization,
  proposeTrajectories,
  RISKS,
  TIMELINES,
  UTIL_CEILING,
  utilizationAt,
  type DeckIntent,
  type IntentOption,
  type Proposal,
  type UtilizationEvent,
} from "@core/works/flight-deck/translation";
import { deckSpringSoft } from "./deckMotion";
import { UtilizationMeter } from "./UtilizationMeter";

/**
 * The translation layer (phase 4): the operator states intent, the
 * layer drafts three routes, the operator reviews one against the
 * field render and commits. The commit choreography itself is owned by
 * DeckSession (authored lane, one timeline owns both layers); this
 * panel is the reactive lane: fields, cards, and the utilization meter.
 *
 * Cadence is honest to DIRD 34: intent changes cost attention, the
 * meter tracks it, and past the 0.70 ceiling the layer visibly slows
 * its drafting to protect the operator's picture.
 */

interface TranslationPanelProps {
  /** True once the deck is past the boot ritual. */
  live: boolean;
  /** The shared deck clock, so utilization and trims agree everywhere. */
  clock: () => number;
  /** The operator activity ledger; DeckSession pushes commits into it. */
  activity: MutableRefObject<UtilizationEvent[]>;
  /** Hands the chosen proposal to DeckSession's commit timeline. */
  onCommit: (proposal: Proposal) => void;
  /** True while the commit choreography is running. */
  committing: boolean;
}

const READINGS_INTERVAL_MS = 400;
const DRAFT_MS = 700;
const DRAFT_OVER_CEILING_MS = 2400;

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

function routePath(route: Proposal["route"]): string {
  return route
    .map((p, i) => `${i === 0 ? "M" : "L"} ${(p.x * 100).toFixed(1)} ${(p.y * 56).toFixed(1)}`)
    .join(" ");
}

export function TranslationPanel({
  live,
  clock,
  activity,
  onCommit,
  committing,
}: TranslationPanelProps) {
  const [intent, setIntent] = useState<DeckIntent>(DEFAULT_INTENT);
  const [proposals, setProposals] = useState<Proposal[]>(() =>
    proposeTrajectories(DEFAULT_INTENT),
  );
  const [drafting, setDrafting] = useState(false);
  const [utilization, setUtilization] = useState(() => utilizationAt(0, []));
  const draftTimerRef = useRef<number | null>(null);

  // Intent changes cost attention and send the layer back to drafting;
  // past the ceiling the redraft takes visibly longer (finding 8).
  const changeIntent = (patch: Partial<DeckIntent>) => {
    const next = { ...intent, ...patch };
    setIntent(next);
    activity.current.push({ at: clock(), cost: 0.04 });
    setDrafting(true);
    if (draftTimerRef.current !== null) {
      window.clearTimeout(draftTimerRef.current);
    }
    const over = utilizationAt(clock(), activity.current) > UTIL_CEILING;
    draftTimerRef.current = window.setTimeout(
      () => {
        setProposals(proposeTrajectories(next));
        setDrafting(false);
        draftTimerRef.current = null;
      },
      over ? DRAFT_OVER_CEILING_MS : DRAFT_MS,
    );
  };

  useEffect(
    () => () => {
      if (draftTimerRef.current !== null) {
        window.clearTimeout(draftTimerRef.current);
      }
    },
    [],
  );

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
          onChange={(destination) => changeIntent({ destination })}
        />
        <IntentRow
          label={deckCopy.panel.timelineLabel}
          name="deck-timeline"
          options={TIMELINES}
          value={intent.timeline}
          onChange={(timeline) => changeIntent({ timeline })}
        />
        <IntentRow
          label={deckCopy.panel.riskLabel}
          name="deck-risk"
          options={RISKS}
          value={intent.risk}
          onChange={(risk) => changeIntent({ risk })}
        />
      </fieldset>

      <div className="deck-proposals js-deck-chrome">
        <p className="deck-intent__label">{deckCopy.panel.proposalsLabel}</p>
        {drafting ? (
          <p className="deck-proposals__pending">
            {deckCopy.panel.proposalPending}
          </p>
        ) : (
          <AnimatePresence initial={false} mode="popLayout">
            {proposals.map((proposal) => (
              <motion.article
                key={proposal.id}
                className="deck-proposal"
                data-proposal-id={proposal.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={deckSpringSoft}
              >
                <p className="deck-proposal__style">{proposal.style}</p>
                <p className="deck-proposal__summary">{proposal.summary}</p>
                <svg
                  className="deck-proposal__trace-box"
                  viewBox="0 0 100 56"
                  aria-hidden="true"
                >
                  <path
                    className="js-route-trace deck-proposal__trace"
                    d={routePath(proposal.route)}
                    pathLength={1}
                  />
                  <circle
                    className="deck-proposal__mark"
                    cx={100}
                    cy={proposal.route[proposal.route.length - 1].y * 56}
                    r={2.5}
                  />
                </svg>
                <div className="deck-proposal__foot">
                  <span className="deck-proposal__cost">
                    DRAW +{proposal.draw.toFixed(3)} · UTIL +
                    {proposal.utilizationCost.toFixed(2)}
                  </span>
                  <button
                    type="button"
                    className="deck-commit"
                    disabled={committing}
                    onClick={() => onCommit(proposal)}
                  >
                    {deckCopy.panel.commit}
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        )}
      </div>

      <div className="deck-panel__meter js-deck-chrome">
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
        <p className="deck-panel__explainer">
          {deckCopy.panel.utilizationExplainer}
        </p>
        <p className="sr-only">{reading.mirror}</p>
      </div>
    </div>
  );
}

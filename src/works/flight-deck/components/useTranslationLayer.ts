import { useEffect, useRef, useState, type MutableRefObject } from "react";
import {
  DEFAULT_INTENT,
  proposeTrajectories,
  UTIL_CEILING,
  utilizationAt,
  type DeckIntent,
  type Proposal,
  type UtilizationEvent,
} from "@core/works/flight-deck/translation";

/**
 * The translation layer's session state, shared by the dock (intent,
 * status, meter) and the review row (the drafted routes surfaced beside
 * the field render). Lifted out of either component so the layout can
 * split them across the bench while they stay one instrument.
 *
 * Cadence is honest to DIRD 34: intent changes cost attention, and past
 * the 0.70 ceiling the layer visibly slows its drafting.
 */

const DRAFT_MS = 700;
const DRAFT_OVER_CEILING_MS = 2400;

export interface TranslationLayer {
  intent: DeckIntent;
  /** The drafts on the bench; empty after a commit until re-drafted. */
  proposals: Proposal[];
  drafting: boolean;
  /** The standing order after a commit, for the dock's status line. */
  enRoute: Proposal | null;
  changeIntent(patch: Partial<DeckIntent>): void;
  /** The commit consumed the drafts; the review space returns to quiet. */
  clearProposals(committed: Proposal): void;
}

export function useTranslationLayer(
  clock: () => number,
  activity: MutableRefObject<UtilizationEvent[]>,
): TranslationLayer {
  const [intent, setIntent] = useState<DeckIntent>(DEFAULT_INTENT);
  const [proposals, setProposals] = useState<Proposal[]>(() =>
    proposeTrajectories(DEFAULT_INTENT),
  );
  const [drafting, setDrafting] = useState(false);
  const [enRoute, setEnRoute] = useState<Proposal | null>(null);
  const draftTimerRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (draftTimerRef.current !== null) {
        window.clearTimeout(draftTimerRef.current);
      }
    },
    [],
  );

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

  const clearProposals = (committed: Proposal) => {
    setProposals([]);
    setEnRoute(committed);
  };

  return { intent, proposals, drafting, enRoute, changeIntent, clearProposals };
}

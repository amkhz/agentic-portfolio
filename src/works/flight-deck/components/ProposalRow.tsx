import { AnimatePresence, motion } from "motion/react";
import { deckCopy } from "@core/works/flight-deck/copy";
import {
  translationScore,
  type Proposal,
} from "@core/works/flight-deck/translation";
import { deckSpringSoft } from "./deckMotion";

/**
 * The review surface (option D, 2026-07-04): drafted routes surface as
 * a transient row in the bench's center space, beside the field render
 * they are reviewed against (shape brief: "reviewing — operator
 * inspects a proposal against the field render"). A commit consumes
 * them and the space returns to quiet; the same space stays free for
 * the drill in phase 5. Entrance springs are the reactive lane; the
 * commit exit is owned by DeckSession's authored timeline.
 *
 * On redraft (intent change mid-review) the drafts are withdrawn, not
 * deleted: the row leaves quicker and subtler than it arrived, on the
 * regime caption's exit idiom (phase 7 motion audit;
 * translationScore.withdrawMs). While a commit runs, the withdraw is
 * skipped so the authored timeline keeps sole ownership of that exit.
 */

interface ProposalRowProps {
  /** True once the deck is past the boot ritual. */
  live: boolean;
  proposals: Proposal[];
  onCommit: (proposal: Proposal) => void;
  committing: boolean;
}

function routePath(route: Proposal["route"]): string {
  return route
    .map(
      (p, i) =>
        `${i === 0 ? "M" : "L"} ${(p.x * 100).toFixed(1)} ${(p.y * 56).toFixed(1)}`,
    )
    .join(" ");
}

const withdrawExit = (committing: boolean) =>
  committing
    ? // Commit path: the authored timeline has already consumed the
      // cards; the row leaves without a second voice.
      { opacity: 0, transition: { duration: 0 } }
    : {
        opacity: 0,
        y: -3,
        // Withdrawn drafts do not take clicks on the way out.
        pointerEvents: "none" as const,
        transition: {
          duration: translationScore.withdrawMs / 1000,
          ease: "easeIn" as const,
        },
      };

export function ProposalRow({
  live,
  proposals,
  onCommit,
  committing,
}: ProposalRowProps) {
  return (
    <AnimatePresence custom={committing} initial={false}>
      {proposals.length > 0 && (
        <motion.div
          key="review"
          className="deck-review js-deck-chrome"
          inert={!live || undefined}
          custom={committing}
          exit="withdraw"
          variants={{ withdraw: withdrawExit }}
        >
          <p className="deck-intent__label">{deckCopy.panel.proposalsLabel}</p>
          <div className="deck-review__row">
            {proposals.map((proposal, i) => (
              <motion.article
                key={proposal.id}
                className="deck-proposal"
                data-proposal-id={proposal.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...deckSpringSoft, delay: i * 0.06 }}
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
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

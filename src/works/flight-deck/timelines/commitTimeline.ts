import gsap from "gsap";
import { COMMIT_HOLD_GLOW, commitScore } from "@core/works/flight-deck/commit";
import type { Proposal } from "@core/works/flight-deck/translation";
import type { FieldIntegrityHandle } from "../components/FieldIntegrity";

/**
 * The commit moment's authored timeline (locked 2026-07-03): tighten,
 * substance-transfer handoff (never a crossfade), lagged consequence;
 * one timeline owns both layers. The route trace retracts while the
 * identical value lights the field's arrival glow; at handoff's end the
 * trim lands (onTrimLand) and every instrument derives its consequence
 * from the shared envelope, which begins with the lag the choreography
 * holds open on purpose. After the lag the review row takes its leave
 * and onConsumed clears the state behind it.
 */

export interface CommitTimelineIO {
  card: HTMLElement;
  others: HTMLElement[];
  trace: SVGPathElement | null;
  proposal: Proposal;
  field: { current: FieldIntegrityHandle | null };
  onTrimLand: () => void;
  onConsumed: () => void;
  onComplete: () => void;
}

export function buildCommitTimeline({
  card,
  others,
  trace,
  proposal,
  field,
  onTrimLand,
  onConsumed,
  onComplete,
}: CommitTimelineIO): gsap.core.Timeline {
  const s = (ms: number) => ms / 1000;

  const tl = gsap.timeline({ onComplete });
  // 1. Tighten: the chosen card condenses, the others recede.
  tl.to(card, { scale: 0.97, duration: s(commitScore.tightenMs), ease: "power2.in" }, 0);
  tl.to(others, { opacity: 0.3, duration: s(commitScore.tightenMs), ease: "power2.out" }, 0);
  // 2. Handoff: one value crosses the boundary. The trace is consumed
  //    exactly as the field's arrival glow rises; substance conserved.
  const hand = { v: 0 };
  tl.to(hand, {
    v: 1,
    duration: s(commitScore.handoffMs),
    ease: "none",
    onUpdate: () => {
      if (trace) trace.style.strokeDashoffset = String(hand.v);
      field.current?.setCommit(proposal.bearing, COMMIT_HOLD_GLOW * hand.v);
    },
  });
  // 3. The trim lands; the lag lives inside the shared envelope.
  tl.call(onTrimLand);
  // 4. After the lag beat, the review space returns to quiet: the
  //    commit consumed the drafts, so the whole row takes its leave
  //    on the same timeline and the state clears behind it.
  tl.to(
    [card, ...others],
    {
      opacity: 0,
      y: 8,
      duration: 0.4,
      stagger: 0.05,
      ease: "power2.in",
    },
    `+=${s(commitScore.lagMs)}`,
  );
  tl.call(onConsumed);
  return tl;
}

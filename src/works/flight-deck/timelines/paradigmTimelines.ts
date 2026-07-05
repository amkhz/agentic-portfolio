import gsap from "gsap";
import { paradigmScore } from "@core/works/flight-deck/paradigm";

/**
 * The paradigm crossings' authored choreography (movement 5). The
 * dissolve itself is continuous and rides the slider's spring; these
 * timelines are the staged events on top: the emission pulse that
 * acknowledges a regime boundary, and the chamber's arrival at the
 * consciousness threshold, where the operator strip hands its light to
 * the center (the deck's one handoff grammar: substance transferred,
 * never crossfaded) and the promotion caption lands last, at reading
 * pace. Each plays while the drag continues (shape brief §7).
 */

const seconds = (ms: number) => ms / 1000;

/**
 * Any boundary crossing: the operator channel acknowledges with one
 * emission pulse, the boot's --emit grammar. The surviving light
 * answers the hand; nothing loops.
 */
export function buildCrossingPulseTimeline(
  container: HTMLElement,
): gsap.core.Timeline {
  const q = gsap.utils.selector(container);
  const tl = gsap.timeline();
  tl.to(
    q(".js-ready-lamp, .deck-opstrip__trace"),
    {
      "--emit": 1.5,
      duration: seconds(paradigmScore.pulse.toMs),
      ease: "power2.out",
    },
    0,
  );
  tl.to(q(".js-ready-lamp, .deck-opstrip__trace"), {
    "--emit": 1,
    duration: seconds(paradigmScore.pulse.backMs),
    ease: "power1.inOut",
  });
  return tl;
}

/**
 * The chamber's arrival: the strip's emission swells and hands off as
 * the chamber blooms in its place at center (one gesture, substance
 * conserved), then the caption lands. Built on mount, after React has
 * the chamber in the DOM.
 */
export function buildChamberArrivalTimeline(
  container: HTMLElement,
): gsap.core.Timeline {
  const q = gsap.utils.selector(container);
  const c = paradigmScore.chamber;
  const tl = gsap.timeline();
  // The handoff: the watcher's light leaves the strip...
  tl.fromTo(
    q(".deck-opstrip__trace"),
    { "--emit": 1.6 },
    {
      "--emit": 1,
      duration: seconds(c.handoffMs),
      ease: "power1.inOut",
      immediateRender: true,
    },
    0,
  );
  // ...and arrives at center as the chamber's parts bloom in.
  tl.fromTo(
    q(".js-chamber-part"),
    { opacity: 0, y: 8 },
    {
      opacity: 1,
      y: 0,
      duration: seconds(c.bloomMs),
      stagger: 0.09,
      ease: "power2.out",
      immediateRender: true,
    },
    seconds(c.handoffMs) * 0.5,
  );
  // The promotion caption lands last, at reading pace.
  tl.fromTo(
    q(".js-chamber-caption"),
    { opacity: 0, y: 6 },
    {
      opacity: 1,
      y: 0,
      duration: seconds(c.captionMs),
      ease: "power2.out",
      immediateRender: true,
    },
    `>-0.1`,
  );
  return tl;
}

/** Leaving consciousness: the chamber bows out; onDone unmounts it. */
export function buildChamberDepartureTimeline(
  container: HTMLElement,
  onDone: () => void,
): gsap.core.Timeline {
  const q = gsap.utils.selector(container);
  const tl = gsap.timeline({ onComplete: onDone });
  tl.to(q(".deck-chamber"), {
    opacity: 0,
    y: 6,
    duration: 0.35,
    ease: "power2.in",
  });
  return tl;
}

/**
 * The slider's one-time reveal after the drill is worked: the final
 * instrument blooms in quietly, in the emission grammar, never twice.
 */
export function buildSliderRevealTimeline(
  container: HTMLElement,
): gsap.core.Timeline {
  const q = gsap.utils.selector(container);
  const tl = gsap.timeline();
  tl.fromTo(
    q(".deck-paradigm"),
    { opacity: 0, y: 6 },
    { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", immediateRender: true },
    0,
  );
  tl.fromTo(
    q(".js-ready-lamp"),
    { "--emit": 1 },
    { "--emit": 1.5, duration: 0.3, ease: "power2.out", immediateRender: false },
    0.1,
  );
  tl.to(q(".js-ready-lamp"), { "--emit": 1, duration: 0.6, ease: "power1.inOut" });
  return tl;
}

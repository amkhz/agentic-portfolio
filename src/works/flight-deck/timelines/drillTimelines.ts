import gsap from "gsap";
import { drillScore } from "@core/works/flight-deck/drill";

/**
 * The drill's two authored moments on the bench chrome (phase 5).
 *
 * Recovery settle: the reverse boot echo. One brightness
 * inhale-and-return while the emission wave runs the bench backward,
 * operator channel up to the bench edge; when it lands the residual
 * status takes the review space (onComplete).
 *
 * Alert posting (annunciator design from Justin's live pass 2026-07-05):
 * when a beat posts, the bench exhales one breath darker while the alert
 * line blooms in and its lamp's emission swells to a held glow (the
 * boot's --emit grammar). Plays once per posting, never loops; severity
 * color comes from the CSS. The lamp's emission releases when the alert
 * resolves (releaseAlertLamp).
 */

export function buildRecoverySettleTimeline(
  container: HTMLElement,
  onComplete: () => void,
): gsap.core.Timeline {
  const q = gsap.utils.selector(container);
  const seconds = (ms: number) => ms / 1000;
  const tl = gsap.timeline({ onComplete });
  tl.fromTo(
    q(".deck-bench"),
    { filter: "brightness(0.955)" },
    {
      filter: "brightness(1)",
      duration: seconds(drillScore.settle.durationMs),
      ease: "power2.out",
      immediateRender: false,
    },
    0,
  );
  tl.fromTo(
    q(".js-emit, .js-ready-lamp"),
    { "--emit": 0.45 },
    {
      "--emit": 1,
      duration: seconds(drillScore.settle.durationMs),
      ease: "power1.inOut",
      stagger: { each: seconds(drillScore.settle.staggerMs), from: "end" },
      immediateRender: false,
    },
    0.1,
  );
  return tl;
}

export function buildAlertPostingTimeline(
  container: HTMLElement,
): gsap.core.Timeline {
  const q = gsap.utils.selector(container);
  const tl = gsap.timeline();
  tl.fromTo(
    q(".deck-bench"),
    { filter: "brightness(1)" },
    { filter: "brightness(0.955)", duration: 0.3, ease: "power2.out", immediateRender: false },
    0,
  );
  tl.to(q(".deck-bench"), {
    filter: "brightness(1)",
    duration: 0.6,
    ease: "power1.inOut",
  });
  tl.fromTo(
    q(".deck-alert"),
    { opacity: 0, y: -4 },
    { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", immediateRender: false },
    0.12,
  );
  tl.fromTo(
    q(".deck-alert__lamp"),
    { "--emit": 0 },
    { "--emit": 1.6, duration: 0.48, ease: "power2.out", immediateRender: false },
    0.12,
  );
  tl.to(q(".deck-alert__lamp"), {
    "--emit": 1,
    duration: 0.7,
    ease: "power1.inOut",
  });
  return tl;
}

export function releaseAlertLamp(container: HTMLElement): void {
  gsap.to(gsap.utils.selector(container)(".deck-alert__lamp"), {
    "--emit": 0,
    duration: 0.5,
    ease: "power1.out",
  });
}

import gsap from "gsap";
import {
  bootScore,
  certificationDurationMs,
  SEVERITY_ORDER,
} from "@core/works/flight-deck/boot";
import { deckCopy } from "@core/works/flight-deck/copy";
import { instruments } from "@core/works/flight-deck/instruments";
import type { FieldIntegrityHandle } from "../components/FieldIntegrity";

/**
 * The boot ritual's authored timeline (locked 2026-07-03, D+A blend).
 * One GSAP timeline owns the whole ritual: the hold-to-start gesture
 * scrubs the wake segment's playhead (releasing early runs it backward),
 * then the certification self-test walks each instrument in bench scan
 * order (sweep, lamp flash in severity order, caption, then data), the
 * one-breath deck settle lands, and the emission blooms once and holds:
 * an awake deck gives off its own light.
 *
 * Pure choreography over the bootScore. Session state (machine
 * dispatches, hold refs) stays in DeckSession; extracted per Roy's
 * phase-6 pre-read so the session file orchestrates instead of authoring.
 */

export interface BootTimelineIO {
  container: HTMLElement;
  field: { current: FieldIntegrityHandle | null };
  announce: (text: string) => void;
  onComplete: () => void;
}

export function buildBootTimeline({
  container,
  field,
  announce,
  onComplete,
}: BootTimelineIO): gsap.core.Timeline {
  const q = gsap.utils.selector(container);
  const seconds = (ms: number) => ms / 1000;
  const c = bootScore.certification;
  const holdS = seconds(bootScore.hold.durationMs);

  // Asleep initial states. Set before paint by the caller's layout
  // effect, so the static plate never depends on these classes.
  gsap.set(q(".deck-bench"), { opacity: 0.3 });
  // Names hold at 0 until their certification beat: the dormant deck
  // shows only the breathing indicator and the invitation (shape brief
  // dormant state), and a ghosted label would sit below AA contrast for
  // anyone who can barely see it (phase 7 audit; axe flags exactly this).
  gsap.set(q(".js-boot-name"), { opacity: 0 });
  gsap.set(q(".js-boot-caption, .js-boot-data"), { opacity: 0, y: 6 });
  gsap.set(q(".js-deck-chrome"), { opacity: 0 });

  const tl = gsap.timeline({ paused: true, onComplete });

  // Wake segment [0, holdS]: scrubbed by the hold, never auto-played.
  // The CSS breath animation would mask GSAP's transform, so the first
  // touch of the playhead silences it (scrubbing back past 0 restores).
  tl.set(q(".js-wake-lamp"), { animation: "none" }, 0.001);
  tl.to(
    q(".js-wake-lamp"),
    { scale: 1.3, "--emit": 1, duration: holdS, ease: "none" },
    0,
  );
  tl.to(
    q(".js-wake-ring"),
    { strokeDashoffset: 0, duration: holdS, ease: "none" },
    0,
  );
  tl.to(q(".js-wake-copy"), { opacity: 0.55, duration: holdS, ease: "none" }, 0);
  tl.to(q(".deck-bench"), { opacity: 1, duration: holdS, ease: "none" }, 0);

  // Commit: the overlay hands the room to the deck.
  tl.addLabel("certify", holdS);
  // autoAlpha ends the fade at visibility: hidden, so the dismissed
  // overlay leaves the tab order and the accessibility tree for the
  // whole certification (a reversed scrub restores it).
  tl.to(
    q(".js-wake"),
    { autoAlpha: 0, pointerEvents: "none", duration: 0.3 },
    "certify",
  );

  // Certification self-test per instrument, bench scan order.
  let at = holdS + 0.15;
  for (const instrument of instruments) {
    const root = `[data-boot-instrument="${instrument.id}"]`;
    tl.to(q(`${root} .js-boot-name`), { opacity: 1, duration: 0.25 }, at);

    // 1. Sweep.
    if (instrument.id === "field-integrity") {
      const sweep = { v: 0 };
      tl.to(
        sweep,
        {
          v: 1,
          duration: seconds(c.sweepMs),
          ease: "none",
          onUpdate: () => field.current?.setSweep(sweep.v),
        },
        at,
      );
    } else {
      // The sweep travels on transform, not left: a layout write per
      // frame during the showpiece ritual is the wrong bill to pay
      // (phase 7 motion audit). Width resolves when the beat plays.
      tl.fromTo(
        q(`${root} .deck-sweep`),
        { x: 0, opacity: 1 },
        {
          x: (_i: number, target: unknown) =>
            (target as HTMLElement).offsetParent?.clientWidth ?? 0,
          duration: seconds(c.sweepMs),
          ease: "none",
          immediateRender: false,
        },
        at,
      );
      tl.set(
        q(`${root} .deck-sweep`),
        { opacity: 0 },
        at + seconds(c.sweepMs),
      );
    }

    // 2. Lamp flash, severity order: advisory, caution, warning.
    const lampsAt = at + seconds(c.sweepMs);
    SEVERITY_ORDER.forEach((severity, i) => {
      tl.fromTo(
        q(`${root} .deck-lamp--${severity}`),
        { opacity: 0.18 },
        {
          opacity: 1,
          duration: seconds(c.lampFlashMs) / 2,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut",
          immediateRender: false,
        },
        lampsAt + i * seconds(c.lampFlashMs + c.lampGapMs),
      );
    });

    // 3. Caption, then 4. data.
    const captionAt =
      lampsAt +
      SEVERITY_ORDER.length * seconds(c.lampFlashMs) +
      (SEVERITY_ORDER.length - 1) * seconds(c.lampGapMs);
    tl.to(
      q(`${root} .js-boot-caption`),
      { opacity: 1, y: 0, duration: seconds(c.captionMs), ease: "power2.out" },
      captionAt,
    );
    tl.call(
      () => announce(`${instrument.name} online. ${instrument.caption}`),
      undefined,
      captionAt,
    );
    const dataAt = captionAt + seconds(c.captionMs);
    tl.to(
      q(`${root} .js-boot-data`),
      { opacity: 1, y: 0, duration: seconds(c.dataMs), ease: "power2.out" },
      dataAt,
    );
    if (instrument.id === "field-integrity") {
      const reveal = { v: 0 };
      tl.to(
        reveal,
        {
          v: 1,
          duration: seconds(c.dataMs),
          ease: "power1.inOut",
          onUpdate: () => field.current?.setReveal(reveal.v),
        },
        dataAt,
      );
    }

    at += seconds(certificationDurationMs() + c.betweenInstrumentsMs);
  }

  // The one-breath deck settle. Live review 2026-07-03 cut the
  // positional overshoot (read as a bounce): the breath is carried by
  // a single brightness exhale and the emission bloom traveling bench
  // edge to operator channel (DOM order matches the scan top-down).
  tl.addLabel("settle", at + 0.05);
  tl.to(
    q(".js-deck-chrome"),
    { opacity: 1, duration: 0.4, stagger: 0.08, ease: "power2.out" },
    "settle",
  );
  // Region names without a certification beat (the panel is a layer,
  // not an instrument) land with the settle; the instrument names are
  // already lit, so this is idempotent for them.
  tl.to(
    q(".js-boot-name"),
    { opacity: 1, duration: 0.4, ease: "power2.out" },
    "settle",
  );
  tl.fromTo(
    q(".deck-bench"),
    { filter: "brightness(1.06)" },
    {
      filter: "brightness(1)",
      duration: seconds(bootScore.settle.durationMs),
      ease: "power2.out",
      immediateRender: false,
    },
    "settle",
  );

  // Emission: bloom once, settle to a quiet held glow, the wave running
  // top of the bench down to the ready light in the operator channel.
  const travel = seconds(bootScore.settle.staggerMs);
  tl.fromTo(
    q(".js-emit, .js-ready-lamp"),
    { "--emit": 0 },
    {
      "--emit": 1.6,
      duration: seconds(bootScore.emission.bloomMs),
      ease: "power2.out",
      stagger: travel,
      immediateRender: false,
    },
    "settle+=0.15",
  );
  tl.to(q(".js-emit, .js-ready-lamp"), {
    "--emit": 1,
    duration: seconds(bootScore.emission.holdMs),
    ease: "power1.inOut",
    stagger: travel,
  });
  tl.call(() => announce(deckCopy.deckReady));

  return tl;
}

import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  bootScore,
  certificationDurationMs,
  SEVERITY_ORDER,
} from "@core/works/flight-deck/boot";
import {
  alertSignatures,
  confirmationTone,
} from "@core/works/flight-deck/alertGrammar";
import type { Severity } from "@core/works/flight-deck/boot";
import {
  COMMIT_HOLD_GLOW,
  commitScore,
  type CommitTrim,
} from "@core/works/flight-deck/commit";
import { deckCopy } from "@core/works/flight-deck/copy";
import { drillAlerts, drillScore } from "@core/works/flight-deck/drill";
import { instruments } from "@core/works/flight-deck/instruments";
import type { DeckEvent, DeckState } from "@core/works/flight-deck/machine";
import type {
  Proposal,
  UtilizationEvent,
} from "@core/works/flight-deck/translation";
import { enableDeckAudio, playSignature } from "../audio/deckAudio";
import { AlertRegion } from "./AlertRegion";
import { DeckBench } from "./DeckBench";
import { DrillProcedure } from "./DrillProcedure";
import { DrillResidual } from "./DrillResidual";
import { FieldIntegrity, type FieldIntegrityHandle } from "./FieldIntegrity";
import { ProposalRow } from "./ProposalRow";
import { SyntheticOrientation } from "./SyntheticOrientation";
import { TranslationPanel } from "./TranslationPanel";
import { useDrill } from "./useDrill";
import { useTranslationLayer } from "./useTranslationLayer";
import { VacuumEnergy } from "./VacuumEnergy";

gsap.registerPlugin(useGSAP);

// Dev-only field tuner (DialKit-style). The DEV gate is statically false
// in production builds, so the import() is dead-code-eliminated and no
// tuner chunk is ever emitted, let alone loaded.
const FieldTuner = import.meta.env.DEV
  ? lazy(() => import("../dev/FieldTuner"))
  : null;

interface DeckSessionProps {
  state: DeckState;
  dispatch: (event: DeckEvent) => void;
  onExitToColophon: () => void;
}

/**
 * The live session: the bench plus the boot ritual (locked 2026-07-03,
 * D+A blend). One GSAP timeline owns the whole ritual, authored lane per
 * ADR-017 D4. The hold-to-start gesture scrubs the wake segment's
 * playhead; releasing early runs it backward (ABORT_WAKE). Past the hold
 * threshold the timeline plays through each instrument's certification
 * self-test (sweep, lamp flash in severity order, caption, then data),
 * lands the one-breath deck settle from bench edge to operator channel,
 * and holds the quiet emission: an awake deck gives off its own light.
 */
export function DeckSession({ state, dispatch, onExitToColophon }: DeckSessionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<FieldIntegrityHandle>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const scrubRef = useRef<gsap.core.Tween | null>(null);
  const holdActiveRef = useRef(false);
  const committedRef = useRef(false);
  const [announcement, setAnnouncement] = useState("");

  const booted = state.phase !== "dormant" && state.phase !== "waking";
  // The ritual runs once per session: if this component mounts already
  // awake (a capability flip mid-session), skip straight to the end state.
  const initiallyBootedRef = useRef(booted);

  const dispatchRef = useRef(dispatch);
  dispatchRef.current = dispatch;

  // One deck clock for every instrument and the panel, so a commit
  // trim's timestamp means the same instant on all of them.
  const deckClock = useMemo(() => {
    let epoch: number | null = null;
    return () => {
      epoch ??= performance.now();
      return (performance.now() - epoch) / 1000;
    };
  }, []);

  // The riding maneuver and the operator's activity ledger (phase 4).
  const [trim, setTrim] = useState<CommitTrim | null>(null);
  const [committing, setCommitting] = useState(false);
  const committingRef = useRef(false);
  const utilEventsRef = useRef<UtilizationEvent[]>([]);
  const translation = useTranslationLayer(deckClock, utilEventsRef);
  const translationRef = useRef(translation);
  translationRef.current = translation;

  // The aural alert grammar (phase 5, ADR-017 D5): opt-in, synthesized,
  // Tone loaded only inside the toggle's own gesture. Everything the
  // deck can sound is also written, so off is a complete experience.
  const soundOnRef = useRef(state.soundOn);
  soundOnRef.current = state.soundOn;
  const toggleSound = async () => {
    if (soundOnRef.current) {
      dispatchRef.current({ type: "SET_SOUND", on: false });
      return;
    }
    const ok = await enableDeckAudio();
    if (!ok) return;
    dispatchRef.current({ type: "SET_SOUND", on: true });
    playSignature(confirmationTone);
  };

  // The drill (phase 5): pure script and reducer in core, timers and
  // beat marks in the hook, authored recovery choreography below.
  const drill = useDrill({
    phase: state.phase,
    clock: deckClock,
    dispatch,
    announce: setAnnouncement,
    playSeverity: (severity: Severity) => {
      if (soundOnRef.current) playSignature(alertSignatures[severity]);
    },
    playConfirmation: () => {
      if (soundOnRef.current) playSignature(confirmationTone);
    },
  });
  const drillRef = useRef(drill);
  drillRef.current = drill;
  const drillShowing =
    drill.progress.stage === "alerts" ||
    drill.progress.stage === "settling" ||
    drill.progress.stage === "residual";
  // The active alert, for the local echo: the affected instrument's own
  // cert lamp holds the severity while the alert is being worked.
  const activeAlert =
    drill.progress.stage === "alerts" && !drill.progress.betweenBeats
      ? drillAlerts[drill.progress.alertIndex]
      : null;

  // A remount mid-ritual has no hold to resume: put the machine back to
  // dormant so the gesture and the playhead agree.
  useEffect(() => {
    if (state.phase === "waking" && !holdActiveRef.current && !committedRef.current) {
      dispatch({ type: "ABORT_WAKE" });
    }
    // Mount-time reconciliation only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { contextSafe } = useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;
      const q = gsap.utils.selector(container);

      if (initiallyBootedRef.current) {
        committedRef.current = true;
        fieldRef.current?.setReveal(1);
        gsap.set(q(".js-ready-lamp, .js-emit"), { "--emit": 1 });
        return;
      }

      // Asleep initial states. Set here (layout effect, before paint), so
      // the static plate never depends on these classes being styled.
      gsap.set(q(".deck-bench"), { opacity: 0.3 });
      gsap.set(q(".js-boot-name"), { opacity: 0.3 });
      gsap.set(q(".js-boot-caption, .js-boot-data"), { opacity: 0, y: 6 });
      gsap.set(q(".js-deck-chrome"), { opacity: 0 });

      const seconds = (ms: number) => ms / 1000;
      const c = bootScore.certification;
      const holdS = seconds(bootScore.hold.durationMs);

      const tl = gsap.timeline({
        paused: true,
        onComplete: () => dispatchRef.current({ type: "BOOT_COMPLETE" }),
      });

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
      tl.to(
        q(".js-wake"),
        { opacity: 0, pointerEvents: "none", duration: 0.3 },
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
              onUpdate: () => fieldRef.current?.setSweep(sweep.v),
            },
            at,
          );
        } else {
          tl.fromTo(
            q(`${root} .deck-sweep`),
            { left: "0%", opacity: 1 },
            {
              left: "100%",
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
          () => setAnnouncement(`${instrument.name} online. ${instrument.caption}`),
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
              onUpdate: () => fieldRef.current?.setReveal(reveal.v),
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
      tl.call(() => setAnnouncement(deckCopy.deckReady));

      timelineRef.current = tl;
      return () => {
        timelineRef.current = null;
      };
    },
    { scope: containerRef },
  );

  // The commit moment (locked 2026-07-03): tighten, substance-transfer
  // handoff (never a crossfade), lagged consequence; one timeline owns
  // both layers. The route trace retracts while the identical value
  // lights the field's arrival glow; at handoff's end the trim lands and
  // every instrument derives its consequence from the shared envelope,
  // which begins with the lag the choreography holds open on purpose.
  const runCommit = contextSafe((proposal: Proposal) => {
    const container = containerRef.current;
    if (!container || committingRef.current) return;
    const card = container.querySelector<HTMLElement>(
      `[data-proposal-id="${proposal.id}"]`,
    );
    if (!card) return;
    const trace = card.querySelector<SVGPathElement>(".js-route-trace");
    const others = Array.from(
      container.querySelectorAll<HTMLElement>("[data-proposal-id]"),
    ).filter((el) => el !== card);

    committingRef.current = true;
    setCommitting(true);
    setTrim(null); // a new maneuver supersedes whatever was riding
    setAnnouncement(deckCopy.panel.committing);
    const s = (ms: number) => ms / 1000;

    const tl = gsap.timeline({
      onComplete: () => {
        committingRef.current = false;
        setCommitting(false);
      },
    });
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
        fieldRef.current?.setCommit(proposal.bearing, COMMIT_HOLD_GLOW * hand.v);
      },
    });
    // 3. The trim lands; the lag lives inside the shared envelope.
    tl.call(() => {
      utilEventsRef.current.push({ at: deckClock(), cost: 0.18 });
      setTrim({
        atSeconds: deckClock(),
        bearing: proposal.bearing,
        urgency: proposal.urgency,
        draw: proposal.draw,
      });
      setAnnouncement(deckCopy.panel.translating);
    });
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
    tl.call(() => {
      translationRef.current.clearProposals(proposal);
      // The commit landed and the review space is quiet: the machine may
      // now arm movement 4 (the first successful commit fires the drill,
      // once; afterwards this dispatch is a no-op by design).
      dispatchRef.current({ type: "COMMIT_SUCCEEDED" });
    });
  });

  // Beat 5, the recovery settle (authored lane): the reverse boot echo.
  // One brightness inhale-and-return while the emission wave runs the
  // bench backward, operator channel up to the bench edge; when it lands
  // the residual status takes the review space.
  const runRecoverySettle = contextSafe(() => {
    const container = containerRef.current;
    if (!container) {
      drillRef.current.settleComplete();
      return;
    }
    const q = gsap.utils.selector(container);
    const seconds = (ms: number) => ms / 1000;
    const tl = gsap.timeline({
      onComplete: () => drillRef.current.settleComplete(),
    });
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
  });
  const settling = drill.progress.stage === "settling";
  useEffect(() => {
    if (settling) runRecoverySettle();
    // runRecoverySettle is contextSafe-stable for the component's life.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settling]);

  // The master-caution moment (authored lane; annunciator design from
  // Justin's live pass 2026-07-05): when a beat posts, the bench exhales
  // one breath darker while the alert line blooms in and its lamp's
  // emission swells to a held glow (the boot's --emit grammar). Plays
  // once per posting, never loops; severity color comes from the CSS.
  const runAlertPosting = contextSafe(() => {
    const container = containerRef.current;
    if (!container) return;
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
  });
  // The lamp's emission releases when the alert resolves (the beat's
  // resolved line takes over; the light goes out before the next post).
  const releaseAlertLamp = contextSafe(() => {
    const container = containerRef.current;
    if (!container) return;
    gsap.to(gsap.utils.selector(container)(".deck-alert__lamp"), {
      "--emit": 0,
      duration: 0.5,
      ease: "power1.out",
    });
  });
  const postedBeat =
    drill.progress.stage === "alerts" && !drill.progress.betweenBeats
      ? drill.progress.alertIndex
      : -1;
  const resolvedBeat = drill.progress.betweenBeats;
  useEffect(() => {
    if (postedBeat >= 0) runAlertPosting();
    // contextSafe handlers are stable for the component's life.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postedBeat]);
  useEffect(() => {
    if (resolvedBeat) releaseAlertLamp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedBeat]);

  // Hold-to-start: the hold scrubs the playhead, release runs it backward.
  const beginHold = contextSafe(() => {
    const tl = timelineRef.current;
    if (!tl || holdActiveRef.current || committedRef.current) return;
    holdActiveRef.current = true;
    dispatchRef.current({ type: "WAKE" });
    const holdS = bootScore.hold.durationMs / 1000;
    scrubRef.current?.kill();
    scrubRef.current = gsap.to(tl, {
      time: holdS,
      duration: Math.max(holdS - tl.time(), 0.01),
      ease: "none",
      onComplete: () => {
        holdActiveRef.current = false;
        committedRef.current = true;
        tl.play();
      },
    });
  });

  const releaseHold = contextSafe(() => {
    const tl = timelineRef.current;
    if (!tl || !holdActiveRef.current || committedRef.current) return;
    holdActiveRef.current = false;
    dispatchRef.current({ type: "ABORT_WAKE" });
    scrubRef.current?.kill();
    scrubRef.current = gsap.to(tl, {
      time: 0,
      duration: tl.time() / bootScore.hold.releaseReturnRate,
      ease: "power1.out",
    });
  });

  return (
    <div ref={containerRef} className="deck-session">
      <DeckBench
        variant="live"
        onExitToColophon={onExitToColophon}
        alert={<AlertRegion progress={drill.progress} />}
        alertEcho={
          activeAlert
            ? { instrument: activeAlert.instrument, severity: activeAlert.severity }
            : null
        }
        soundControl={
          <button
            type="button"
            onClick={toggleSound}
            aria-pressed={state.soundOn}
            title={deckCopy.sound.hint}
            className="text-xs uppercase tracking-[0.2em] text-[var(--deck-ink-dim)] hover:text-[var(--deck-ink)]"
          >
            {deckCopy.sound.label}{" "}
            {state.soundOn ? deckCopy.sound.on : deckCopy.sound.off}
          </button>
        }
        hero={
          <FieldIntegrity
            ref={fieldRef}
            live={booted}
            clock={deckClock}
            trim={trim}
            drill={drill.timelineRef}
          />
        }
        orientation={
          <SyntheticOrientation
            live={booted}
            clock={deckClock}
            trim={trim}
            drill={drill.timelineRef}
          />
        }
        vacuum={
          <VacuumEnergy
            live={booted}
            clock={deckClock}
            trim={trim}
            drill={drill.timelineRef}
          />
        }
        panel={
          <TranslationPanel
            live={booted}
            clock={deckClock}
            activity={utilEventsRef}
            intent={translation.intent}
            onIntentChange={translation.changeIntent}
            drafting={translation.drafting}
            draftedCount={translation.proposals.length}
            enRoute={translation.enRoute}
          />
        }
        review={
          drillShowing ? (
            drill.progress.stage === "residual" ? (
              <DrillResidual
                progress={drill.progress}
                clock={deckClock}
                timeline={drill.timelineRef}
                onAcknowledge={drill.acknowledge}
              />
            ) : (
              <DrillProcedure
                progress={drill.progress}
                clock={deckClock}
                timeline={drill.timelineRef}
                onJudge={drill.judge}
              />
            )
          ) : (
            <ProposalRow
              live={booted}
              proposals={translation.drafting ? [] : translation.proposals}
              onCommit={runCommit}
              committing={committing}
            />
          )
        }
      />
      {!booted ? (
        <div className="deck-wake js-wake">
          <div>
            <button
              type="button"
              aria-label={deckCopy.wakeHold}
              className="deck-wake__control mx-auto"
              onPointerDown={beginHold}
              onPointerUp={releaseHold}
              onPointerLeave={releaseHold}
              onPointerCancel={releaseHold}
              onKeyDown={(e) => {
                if ((e.key === " " || e.key === "Enter") && !e.repeat) beginHold();
              }}
              onKeyUp={(e) => {
                if (e.key === " " || e.key === "Enter") releaseHold();
              }}
              onBlur={releaseHold}
            >
              <svg
                className="deck-wake__ring"
                viewBox="0 0 44 44"
                aria-hidden="true"
              >
                <circle className="deck-wake__ring-track" cx="22" cy="22" r="20" />
                <circle
                  className="js-wake-ring deck-wake__ring-progress"
                  cx="22"
                  cy="22"
                  r="20"
                  pathLength={1}
                />
              </svg>
              <span className="js-wake-lamp deck-breath deck-wake__lamp" />
            </button>
            <p className="js-wake-copy mt-8 font-[family-name:var(--deck-font-body)] text-base text-[var(--deck-ink-dim)]">
              {deckCopy.invitation}
            </p>
            <p className="js-wake-copy mt-2 text-xs uppercase tracking-[0.3em] text-[var(--deck-ink-label)]">
              {deckCopy.wakeHold}
            </p>
          </div>
        </div>
      ) : null}
      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>
      {FieldTuner ? (
        <Suspense fallback={null}>
          <FieldTuner
            onChange={(params) => fieldRef.current?.setMotion(params)}
          />
        </Suspense>
      ) : null}
    </div>
  );
}

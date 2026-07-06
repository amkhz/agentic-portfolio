import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { bootScore } from "@core/works/flight-deck/boot";
import {
  alertSignatures,
  confirmationTone,
} from "@core/works/flight-deck/alertGrammar";
import type { Severity } from "@core/works/flight-deck/boot";
import { deckCopy } from "@core/works/flight-deck/copy";
import { drillAlerts } from "@core/works/flight-deck/drill";
import type { CommitTrim } from "@core/works/flight-deck/commit";
import type { DeckEvent, DeckState } from "@core/works/flight-deck/machine";
import { paradigmRegime } from "@core/works/flight-deck/paradigm";
import type {
  Proposal,
  UtilizationEvent,
} from "@core/works/flight-deck/translation";
import { enableDeckAudio, playSignature } from "../audio/deckAudio";
import { buildBootTimeline } from "../timelines/bootTimeline";
import { buildCommitTimeline } from "../timelines/commitTimeline";
import {
  buildAlertPostingTimeline,
  buildRecoverySettleTimeline,
  releaseAlertLamp,
} from "../timelines/drillTimelines";
import { AlertRegion } from "./AlertRegion";
import { ConsciousnessChamber } from "./ConsciousnessChamber";
import { DeckBench } from "./DeckBench";
import { DrillProcedure } from "./DrillProcedure";
import { DrillResidual } from "./DrillResidual";
import { FieldIntegrity, type FieldIntegrityHandle } from "./FieldIntegrity";
import { OperatorStrip } from "./OperatorStrip";
import { ParadigmSlider } from "./ParadigmSlider";
import { ProposalRow } from "./ProposalRow";
import { StandingOrders } from "./StandingOrders";
import { SyntheticOrientation } from "./SyntheticOrientation";
import { TranslationPanel } from "./TranslationPanel";
import { useDrill } from "./useDrill";
import { useParadigmDissolve } from "./useParadigmDissolve";
import { useShutdown } from "./useShutdown";
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
  /** Fired when the power-down finishes: the parent resets and remounts. */
  onShutDown: () => void;
  /**
   * True when this mount follows a shutdown: the operator's focus died
   * with the old session's control, so the fresh mount hands it to the
   * wake control (phase 7 Roy note).
   */
  focusWakeOnMount?: boolean;
}

/**
 * The live session, orchestration only: machine dispatches, the shared
 * deck clock, the drill hook, and the paradigm dissolve's imperative
 * writes. The authored choreography lives in ../timelines (boot ritual,
 * commit moment, drill postings and recovery, paradigm crossings),
 * extracted per Roy's phase-6 pre-read; this file decides WHEN each
 * timeline runs and what state lands with it.
 */
export function DeckSession({
  state,
  dispatch,
  onExitToColophon,
  onShutDown,
  focusWakeOnMount,
}: DeckSessionProps) {
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

  // A mount that follows a shutdown hands focus to the wake control:
  // the control the operator pressed died with the old session, and
  // keyboard focus must never drop to the body (phase 7 Roy note).
  useEffect(() => {
    if (focusWakeOnMount && !booted) {
      containerRef.current
        ?.querySelector<HTMLButtonElement>(".deck-wake__control")
        ?.focus();
    }
    // Mount-time handoff only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { contextSafe } = useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      if (initiallyBootedRef.current) {
        committedRef.current = true;
        fieldRef.current?.setReveal(1);
        gsap.set(
          gsap.utils.selector(container)(".js-ready-lamp, .js-emit"),
          { "--emit": 1 },
        );
        return;
      }

      const tl = buildBootTimeline({
        container,
        field: fieldRef,
        announce: setAnnouncement,
        onComplete: () => dispatchRef.current({ type: "BOOT_COMPLETE" }),
      });
      timelineRef.current = tl;
      return () => {
        timelineRef.current = null;
      };
    },
    { scope: containerRef },
  );

  // The commit moment (locked 2026-07-03): tighten, substance-transfer
  // handoff, lagged consequence; buildCommitTimeline owns both layers.
  const runCommit = contextSafe((proposal: Proposal) => {
    const container = containerRef.current;
    if (!container || committingRef.current) return;
    const card = container.querySelector<HTMLElement>(
      `[data-proposal-id="${proposal.id}"]`,
    );
    if (!card) return;

    committingRef.current = true;
    setCommitting(true);
    setTrim(null); // a new maneuver supersedes whatever was riding
    setAnnouncement(deckCopy.panel.committing);

    buildCommitTimeline({
      card,
      others: Array.from(
        container.querySelectorAll<HTMLElement>("[data-proposal-id]"),
      ).filter((el) => el !== card),
      trace: card.querySelector<SVGPathElement>(".js-route-trace"),
      proposal,
      field: fieldRef,
      onTrimLand: () => {
        utilEventsRef.current.push({ at: deckClock(), cost: 0.18 });
        setTrim({
          atSeconds: deckClock(),
          bearing: proposal.bearing,
          urgency: proposal.urgency,
          draw: proposal.draw,
        });
        setAnnouncement(deckCopy.panel.translating);
      },
      onConsumed: () => {
        translationRef.current.clearProposals(proposal);
        // The commit landed and the review space is quiet: the machine
        // may now arm movement 4 (the first successful commit fires the
        // drill, once; afterwards this dispatch is a no-op by design).
        dispatchRef.current({ type: "COMMIT_SUCCEEDED" });
      },
      onComplete: () => {
        committingRef.current = false;
        setCommitting(false);
        // The standing order, spoken once the trim lands: the panel's
        // status line shows it, the announcer says it (single-announcer
        // contract; the status line itself is not live).
        setAnnouncement(
          `${deckCopy.panel.enRoutePrefix} ${proposal.summary}`,
        );
      },
    });
  });

  // Beat 5, the recovery settle (authored lane): the reverse boot echo.
  const runRecoverySettle = contextSafe(() => {
    const container = containerRef.current;
    if (!container) {
      drillRef.current.settleComplete();
      return;
    }
    buildRecoverySettleTimeline(container, () =>
      drillRef.current.settleComplete(),
    );
  });
  const settling = drill.progress.stage === "settling";
  useEffect(() => {
    if (settling) runRecoverySettle();
    // runRecoverySettle is contextSafe-stable for the component's life.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settling]);

  // The master-caution moment (authored lane; annunciator design from
  // Justin's live pass 2026-07-05): plays once per posting, never loops.
  const runAlertPosting = contextSafe(() => {
    const container = containerRef.current;
    if (container) buildAlertPostingTimeline(container);
  });
  const runReleaseAlertLamp = contextSafe(() => {
    const container = containerRef.current;
    if (container) releaseAlertLamp(container);
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
    if (resolvedBeat) runReleaseAlertLamp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedBeat]);

  /* ---------------------------------------------------------------- */
  /* Movement 5: the paradigm slider and the dissolve (phase 6),        */
  /* extracted to useParadigmDissolve per Roy's phase-7 flag.           */
  /* ---------------------------------------------------------------- */

  const { sliderRevealed, chamber, applyDissolveRef, handleCrossing } =
    useParadigmDissolve({
      containerRef,
      fieldRef,
      contextSafe,
      state,
      announce: setAnnouncement,
    });

  const regime = paradigmRegime(state.paradigm);

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

  // Shutdown: the boot's mirror plays, then the parent resets the
  // machine and remounts this component fresh (drill re-armed, paradigm
  // at rest, inline styles reverted by unmount) — the restart path that
  // used to need a page reload. Extracted per Roy's phase-7 flag.
  const runShutdown = useShutdown({
    containerRef,
    timelineRef,
    scrubRef,
    contextSafe,
    announce: setAnnouncement,
    onShutDown,
  });

  return (
    <div ref={containerRef} className="deck-session">
      <DeckBench
        variant="live"
        chromeInert={!booted}
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
            className="deck-hit text-xs uppercase tracking-[0.2em] text-[var(--deck-control)] hover:text-[var(--deck-caution)] transition-colors duration-150"
          >
            {deckCopy.sound.label}{" "}
            {state.soundOn ? deckCopy.sound.on : deckCopy.sound.off}
          </button>
        }
        shutdownControl={
          booted ? (
            <button
              type="button"
              onClick={runShutdown}
              title={deckCopy.shutdown.hint}
              className="deck-hit text-xs uppercase tracking-[0.2em] text-[var(--deck-control)] hover:text-[var(--deck-caution)] transition-colors duration-150"
            >
              {deckCopy.shutdown.label}
            </button>
          ) : null
        }
        hero={
          <FieldIntegrity
            ref={fieldRef}
            live={booted}
            clock={deckClock}
            trim={trim}
            drill={drill.timelineRef}
            alertActive={activeAlert !== null}
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
        operator={
          <OperatorStrip
            live={booted}
            clock={deckClock}
            drill={drill.timelineRef}
            trim={trim}
            promoted={regime === "consciousness"}
          />
        }
        paradigm={
          sliderRevealed ? (
            <ParadigmSlider
              value={state.paradigm}
              onChange={(value) =>
                dispatchRef.current({ type: "SET_PARADIGM", value })
              }
              onDissolve={(p) => applyDissolveRef.current(p)}
              onCrossing={handleCrossing}
            />
          ) : null
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
          ) : chamber !== "down" ? (
            <ConsciousnessChamber
              clock={deckClock}
              drill={drill.timelineRef}
              trim={trim}
            />
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
            <StandingOrders />
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

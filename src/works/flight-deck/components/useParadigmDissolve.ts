import { useEffect, useRef, useState, type RefObject } from "react";
import type gsap from "gsap";
import type { useGSAP } from "@gsap/react";
import { deckCopy } from "@core/works/flight-deck/copy";
import type { DeckState } from "@core/works/flight-deck/machine";
import {
  dissolveAt,
  paradigmRegime,
  paradigmScore,
  type ParadigmRegime,
} from "@core/works/flight-deck/paradigm";
import {
  buildChamberArrivalTimeline,
  buildChamberDepartureTimeline,
  buildCrossingPulseTimeline,
  buildSliderRevealTimeline,
} from "../timelines/paradigmTimelines";
import type { FieldIntegrityHandle } from "./FieldIntegrity";

type ContextSafe = ReturnType<typeof useGSAP>["contextSafe"];

interface UseParadigmDissolveArgs {
  containerRef: RefObject<HTMLDivElement | null>;
  fieldRef: RefObject<FieldIntegrityHandle | null>;
  contextSafe: ContextSafe;
  state: DeckState;
  announce: (text: string) => void;
}

export type ChamberState = "down" | "up" | "leaving";

/**
 * Movement 5's session logic (phase 6), extracted from DeckSession per
 * Roy's standing flag (phase 7): the slider's reveal, the dissolve's
 * imperative writes, and the chamber lifecycle at the consciousness
 * threshold. Behavior-identical to the in-session original; the cured
 * races (departure killed on re-arrival, arrival held too, kill never
 * fires onComplete) move with it.
 */
export function useParadigmDissolve({
  containerRef,
  fieldRef,
  contextSafe,
  state,
  announce,
}: UseParadigmDissolveArgs) {
  // The final instrument reveals once the drill has been worked and the
  // deck is back on watch; it stays revealed for the rest of the session.
  const [sliderRevealed, setSliderRevealed] = useState(
    () => !state.drillArmed && state.phase === "nominal",
  );
  const drillWorked = !state.drillArmed && state.phase === "nominal";
  useEffect(() => {
    if (drillWorked) setSliderRevealed(true);
  }, [drillWorked]);
  const runSliderReveal = contextSafe(() => {
    const container = containerRef.current;
    if (container) buildSliderRevealTimeline(container);
  });
  const revealPlayedRef = useRef(false);
  useEffect(() => {
    if (!sliderRevealed || revealPlayedRef.current) return;
    revealPlayedRef.current = true;
    runSliderReveal();
    announce(deckCopy.paradigm.revealed);
    // runSliderReveal is contextSafe-stable for the component's life.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sliderRevealed]);

  // The dissolve's continuous writes, riding the slider's spring: the
  // pure envelope decides, this applies. Light is a color-mix var, the
  // regions dim by presence, the panel goes inert when it is gone, and
  // the field takes the coupling gain. No React re-render per frame.
  // The bench regions are stable for the session; this runs per spring
  // frame for the whole drag, so the lookups are cached (phase 7 review).
  const dissolveRegionsRef = useRef<{
    hero: HTMLElement | null;
    horizon: HTMLElement | null;
    vacuum: HTMLElement | null;
    panel: HTMLElement | null;
  } | null>(null);
  const applyDissolve = (p: number) => {
    const container = containerRef.current;
    if (!container) return;
    const env = dissolveAt(p);
    container.style.setProperty("--dissolve", (1 - env.light).toFixed(4));
    container.style.setProperty("--promotion", env.promotion.toFixed(4));
    dissolveRegionsRef.current ??= {
      hero: container.querySelector<HTMLElement>(".deck-region--hero"),
      horizon: container.querySelector<HTMLElement>(".deck-region--horizon"),
      vacuum: container.querySelector<HTMLElement>(".deck-region--vacuum"),
      panel: container.querySelector<HTMLElement>(".deck-region--panel"),
    };
    const regions = dissolveRegionsRef.current;
    if (regions.hero) regions.hero.style.opacity = env.hero.toFixed(4);
    if (regions.horizon) regions.horizon.style.opacity = env.telemetry.toFixed(4);
    if (regions.vacuum) regions.vacuum.style.opacity = env.telemetry.toFixed(4);
    if (regions.panel) {
      regions.panel.style.opacity = env.panel.toFixed(4);
      regions.panel.toggleAttribute("inert", env.panel < 0.04);
    }
    fieldRef.current?.setCoupling(env.coupling);
  };
  const applyDissolveRef = useRef(applyDissolve);
  applyDissolveRef.current = applyDissolve;
  // A remount mid-session restores the dissolve the machine remembers.
  useEffect(() => {
    if (state.paradigm > 0) applyDissolveRef.current(state.paradigm);
    // Mount-time restoration only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The chamber's lifecycle at the consciousness threshold: arrival and
  // departure are authored; the dissolve keeps flowing underneath.
  const [chamber, setChamber] = useState<ChamberState>(() =>
    paradigmRegime(state.paradigm) === "consciousness" ? "up" : "down",
  );
  const chamberRef = useRef(chamber);
  chamberRef.current = chamber;
  // Speech debounces to the settled regime so a rapid boundary wiggle
  // announces once; the pulse answers every crossing (Roy, phase 6:
  // debounce announcements only, never the pulse).
  const announceTimerRef = useRef<number | null>(null);
  useEffect(
    () => () => {
      if (announceTimerRef.current !== null)
        window.clearTimeout(announceTimerRef.current);
    },
    [],
  );
  const handleCrossing = contextSafe(
    (crossing: { from: ParadigmRegime; to: ParadigmRegime }) => {
      const container = containerRef.current;
      if (!container) return;
      buildCrossingPulseTimeline(container);
      const regimeCopy = deckCopy.paradigm.regimes[crossing.to];
      if (announceTimerRef.current !== null)
        window.clearTimeout(announceTimerRef.current);
      announceTimerRef.current = window.setTimeout(() => {
        announceTimerRef.current = null;
        announce(`${regimeCopy.name}. ${regimeCopy.line}`);
      }, paradigmScore.announceDebounceMs);
      if (crossing.to === "consciousness") setChamber("up");
      else if (chamberRef.current !== "down") setChamber("leaving");
    },
  );
  // A departure in flight is killed by a re-arrival (kill never fires
  // onComplete), so a fast double-crossing of the consciousness
  // boundary can neither strand the regime chamberless nor leave the
  // room half-faded (Roy, phase 6).
  const departureRef = useRef<gsap.core.Timeline | null>(null);
  // The arrival is held too: a fast out-and-back inside the ~1.6s bloom
  // would otherwise leave two arrivals tweening the same chamber parts
  // (the unmirrored half of the departure race; phase 7 review).
  const arrivalRef = useRef<gsap.core.Timeline | null>(null);
  const runChamberArrival = contextSafe(() => {
    const container = containerRef.current;
    if (!container) return;
    departureRef.current?.kill();
    departureRef.current = null;
    arrivalRef.current?.kill();
    arrivalRef.current = buildChamberArrivalTimeline(container);
  });
  const runChamberDeparture = contextSafe(() => {
    const container = containerRef.current;
    if (!container) {
      setChamber("down");
      return;
    }
    arrivalRef.current?.kill();
    arrivalRef.current = null;
    departureRef.current?.kill();
    departureRef.current = buildChamberDepartureTimeline(container, () => {
      departureRef.current = null;
      setChamber("down");
    });
  });
  useEffect(() => {
    if (chamber === "up") runChamberArrival();
    if (chamber === "leaving") runChamberDeparture();
    // contextSafe handlers are stable for the component's life.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chamber]);

  return { sliderRevealed, chamber, applyDissolveRef, handleCrossing };
}

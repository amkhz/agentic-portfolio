import { useEffect, useReducer, useState } from "react";
import {
  deckReducer,
  initialDeckState,
} from "@core/works/flight-deck/machine";
import { getWork } from "@core/works/works";
import { useDeckCapabilities } from "./useDeckCapabilities";
import { BootSequence } from "./components/BootSequence";
import { DeckBench } from "./components/DeckBench";
import { DeclineCard } from "./components/DeclineCard";
import { Colophon } from "./components/Colophon";
import "./tokens.css";
import "./flight-deck.css";

/**
 * Works 01 root (ADR-017 D1): full-bleed, outside LabLayout, one route.
 * Phase 1 skeleton: mode gating, session state machine, bench scaffold,
 * colophon chrome, decline card, static plate. Instruments, choreography,
 * and sound arrive in phases 2-6.
 */
export function FlightDeck() {
  const mode = useDeckCapabilities();
  const [state, dispatch] = useReducer(deckReducer, initialDeckState);
  const [surface, setSurface] = useState<"deck" | "colophon">("deck");

  useEffect(() => {
    const work = getWork("flight-deck");
    document.title = `${work?.title ?? "Works"} · Perihelion Works`;
  }, []);

  // DeclineCard and Colophon carry their own visible h1; the operating
  // deck gets a screen-reader one (one h1 per surface, never two).
  return (
    <div className="flight-deck">
      {mode === "decline" ? (
        <DeclineCard />
      ) : surface === "colophon" ? (
        <Colophon onReturn={() => setSurface("deck")} />
      ) : (
        <>
          <h1 className="sr-only">The Flight Deck</h1>
          {mode === "static" ? (
            <DeckBench
              variant="plate"
              onExitToColophon={() => setSurface("colophon")}
            />
          ) : state.phase === "dormant" || state.phase === "waking" ? (
            <BootSequence phase={state.phase} dispatch={dispatch} />
          ) : (
            <DeckBench
              variant="live"
              onExitToColophon={() => setSurface("colophon")}
            />
          )}
        </>
      )}
    </div>
  );
}

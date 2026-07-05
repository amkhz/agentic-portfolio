import { useEffect, useReducer, useState } from "react";
import {
  deckReducer,
  initialDeckState,
} from "@core/works/flight-deck/machine";
import { getWork } from "@core/works/works";
import { useDeckCapabilities } from "./useDeckCapabilities";
import { DeckBench } from "./components/DeckBench";
import { DeckSession } from "./components/DeckSession";
import { DeclineCard } from "./components/DeclineCard";
import { Colophon } from "./components/Colophon";
import "./tokens.css";
import "./flight-deck.css";

/**
 * Works 01 root (ADR-017 D1): full-bleed, outside LabLayout, one route.
 * Mode gating, session state machine, colophon chrome, decline card,
 * static plate. As of phase 5 the full mode is the whole working
 * session: boot ritual, three instruments, the control panel and its
 * commits, and the drill with its alert grammar (visual + opt-in
 * aural). The paradigm slider (movement 5) arrives in phase 6.
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
          ) : (
            <DeckSession
              state={state}
              dispatch={dispatch}
              onExitToColophon={() => setSurface("colophon")}
            />
          )}
        </>
      )}
    </div>
  );
}

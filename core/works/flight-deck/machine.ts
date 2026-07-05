/**
 * The Flight Deck session state machine (ADR-017; shape brief key states).
 * Pure logic: no DOM, no timers. Choreography (GSAP timelines, spring
 * feel) lives in src/works and dispatches events here when beats land.
 *
 * Session arc: dormant -> waking -> nominal -> (first successful commit
 * triggers the drill, once) -> drill -> recovery -> nominal, with the
 * paradigm slider as a continuous position on top of the phase.
 */

export type DeckPhase =
  | "dormant" // movement 1: near-dark, one breathing indicator, invitation line
  | "waking" // movement 1: boot ritual running
  | "nominal" // movements 2-3: instruments live, intent panel open
  | "drill" // movement 4: the scripted failure drill
  | "recovery"; // movement 4, beats 5-6: systems settle, residual status

export type ParadigmRegime = "instrumented" | "hybrid" | "consciousness";

export interface DeckState {
  phase: DeckPhase;
  /** Paradigm slider position, 0 (instrumented) to 1 (consciousness). */
  paradigm: number;
  /** Audio is opt-in and defaults off (ADR-017 D5). */
  soundOn: boolean;
  /** The drill fires once per session, after the first successful commit. */
  drillArmed: boolean;
}

export type DeckEvent =
  | { type: "WAKE" }
  | { type: "ABORT_WAKE" } // the boot ritual may let the operator release early
  | { type: "BOOT_COMPLETE" }
  | { type: "COMMIT_SUCCEEDED" }
  | { type: "DRILL_RESOLVED" }
  | { type: "RECOVERY_SETTLED" }
  | { type: "SET_PARADIGM"; value: number }
  | { type: "SET_SOUND"; on: boolean }
  | { type: "SHUT_DOWN" };

export const initialDeckState: DeckState = {
  phase: "dormant",
  paradigm: 0,
  soundOn: false,
  drillArmed: true,
};

const REGIME_HYBRID_AT = 1 / 3;
const REGIME_CONSCIOUSNESS_AT = 2 / 3;

export function paradigmRegime(value: number): ParadigmRegime {
  if (value < REGIME_HYBRID_AT) return "instrumented";
  if (value < REGIME_CONSCIOUSNESS_AT) return "hybrid";
  return "consciousness";
}

function clamp01(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

/** Illegal events are no-ops and return the same state reference. */
export function deckReducer(state: DeckState, event: DeckEvent): DeckState {
  switch (event.type) {
    case "WAKE":
      return state.phase === "dormant" ? { ...state, phase: "waking" } : state;
    case "ABORT_WAKE":
      return state.phase === "waking" ? { ...state, phase: "dormant" } : state;
    case "BOOT_COMPLETE":
      return state.phase === "waking" ? { ...state, phase: "nominal" } : state;
    case "COMMIT_SUCCEEDED":
      if (state.phase !== "nominal" || !state.drillArmed) return state;
      return { ...state, phase: "drill", drillArmed: false };
    case "DRILL_RESOLVED":
      return state.phase === "drill" ? { ...state, phase: "recovery" } : state;
    case "RECOVERY_SETTLED":
      return state.phase === "recovery" ? { ...state, phase: "nominal" } : state;
    case "SET_PARADIGM": {
      const value = clamp01(event.value);
      return value === state.paradigm ? state : { ...state, paradigm: value };
    }
    case "SET_SOUND":
      return event.on === state.soundOn ? state : { ...state, soundOn: event.on };
    case "SHUT_DOWN":
      // Powering the deck off is a fresh session: the drill re-arms,
      // the paradigm rests, sound dies with the deck. A dormant deck
      // has nothing to shut down.
      return state.phase === "dormant" ? state : initialDeckState;
  }
}

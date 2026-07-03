import { describe, expect, it } from "vitest";
import {
  deckReducer,
  initialDeckState,
  paradigmRegime,
  type DeckEvent,
  type DeckState,
} from "./machine";

function run(state: DeckState, ...events: DeckEvent[]): DeckState {
  return events.reduce(deckReducer, state);
}

describe("deckReducer", () => {
  it("walks the full session arc", () => {
    let state = initialDeckState;
    expect(state.phase).toBe("dormant");

    state = run(state, { type: "WAKE" });
    expect(state.phase).toBe("waking");

    state = run(state, { type: "BOOT_COMPLETE" });
    expect(state.phase).toBe("nominal");

    state = run(state, { type: "COMMIT_SUCCEEDED" });
    expect(state.phase).toBe("drill");
    expect(state.drillArmed).toBe(false);

    state = run(state, { type: "DRILL_RESOLVED" });
    expect(state.phase).toBe("recovery");

    state = run(state, { type: "RECOVERY_SETTLED" });
    expect(state.phase).toBe("nominal");
  });

  it("lets the operator release early during the boot ritual", () => {
    const state = run(initialDeckState, { type: "WAKE" }, { type: "ABORT_WAKE" });
    expect(state.phase).toBe("dormant");
  });

  it("fires the drill once per session", () => {
    const afterDrill = run(
      initialDeckState,
      { type: "WAKE" },
      { type: "BOOT_COMPLETE" },
      { type: "COMMIT_SUCCEEDED" },
      { type: "DRILL_RESOLVED" },
      { type: "RECOVERY_SETTLED" },
    );
    const second = deckReducer(afterDrill, { type: "COMMIT_SUCCEEDED" });
    expect(second.phase).toBe("nominal");
    expect(second).toBe(afterDrill);
  });

  it("ignores events that are illegal for the current phase", () => {
    expect(deckReducer(initialDeckState, { type: "BOOT_COMPLETE" })).toBe(initialDeckState);
    expect(deckReducer(initialDeckState, { type: "DRILL_RESOLVED" })).toBe(initialDeckState);
    expect(deckReducer(initialDeckState, { type: "COMMIT_SUCCEEDED" })).toBe(initialDeckState);
  });

  it("clamps the paradigm position to 0..1", () => {
    expect(deckReducer(initialDeckState, { type: "SET_PARADIGM", value: 1.4 }).paradigm).toBe(1);
    expect(deckReducer(initialDeckState, { type: "SET_PARADIGM", value: -2 }).paradigm).toBe(0);
    expect(deckReducer(initialDeckState, { type: "SET_PARADIGM", value: Number.NaN }).paradigm).toBe(0);
  });

  it("defaults sound to off and toggles explicitly", () => {
    expect(initialDeckState.soundOn).toBe(false);
    const on = deckReducer(initialDeckState, { type: "SET_SOUND", on: true });
    expect(on.soundOn).toBe(true);
  });
});

describe("paradigmRegime", () => {
  it("maps slider thirds to the three regimes", () => {
    expect(paradigmRegime(0)).toBe("instrumented");
    expect(paradigmRegime(0.32)).toBe("instrumented");
    expect(paradigmRegime(0.5)).toBe("hybrid");
    expect(paradigmRegime(0.67)).toBe("consciousness");
    expect(paradigmRegime(1)).toBe("consciousness");
  });
});

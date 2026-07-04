// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { deckCopy } from "@core/works/flight-deck/copy";
import {
  initialDeckState,
  type DeckEvent,
  type DeckState,
} from "@core/works/flight-deck/machine";
import { DeckSession } from "./DeckSession";

// jsdom has no WebGL and no real rAF cadence: these tests cover the parts
// of the session that must not depend on either, the dormant surface and
// the hold gesture's contract with the state machine. The choreography
// itself is judged live (and by Roy) per the mission's review gates.

function renderSession(state: DeckState = initialDeckState) {
  const events: DeckEvent[] = [];
  render(
    <DeckSession
      state={state}
      dispatch={(e) => events.push(e)}
      onExitToColophon={() => {}}
    />,
  );
  return events;
}

function stubObservers() {
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
}

stubObservers();

describe("DeckSession", () => {
  it("renders the dormant deck: bench behind, one invitation, a hold control", () => {
    renderSession();
    expect(
      screen.getByRole("button", { name: deckCopy.wakeHold }),
    ).toBeInTheDocument();
    expect(screen.getByText(deckCopy.invitation)).toBeInTheDocument();
    // The bench is present (dark) behind the overlay from the start.
    expect(screen.getByText("Field Integrity")).toBeInTheDocument();
    expect(screen.getByText(deckCopy.readyLabel)).toBeInTheDocument();
  });

  it("dispatches WAKE on hold and ABORT_WAKE on early release", () => {
    const events = renderSession();
    const control = screen.getByRole("button", { name: deckCopy.wakeHold });

    fireEvent.pointerDown(control);
    expect(events).toEqual([{ type: "WAKE" }]);

    fireEvent.pointerUp(control);
    expect(events).toEqual([{ type: "WAKE" }, { type: "ABORT_WAKE" }]);
  });

  it("supports keyboard hold parity and ignores key repeat", () => {
    const events = renderSession();
    const control = screen.getByRole("button", { name: deckCopy.wakeHold });

    fireEvent.keyDown(control, { key: " " });
    fireEvent.keyDown(control, { key: " ", repeat: true });
    expect(events).toEqual([{ type: "WAKE" }]);

    fireEvent.keyUp(control, { key: " " });
    expect(events).toEqual([{ type: "WAKE" }, { type: "ABORT_WAKE" }]);
  });

  it("hides the wake overlay once the deck is awake", () => {
    renderSession({ ...initialDeckState, phase: "nominal" });
    expect(
      screen.queryByRole("button", { name: deckCopy.wakeHold }),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Field Integrity")).toBeInTheDocument();
  });

  it("reconciles a mid-ritual remount back to dormant", () => {
    const events = renderSession({ ...initialDeckState, phase: "waking" });
    expect(events).toEqual([{ type: "ABORT_WAKE" }]);
  });

  it("renders the phase 3 instruments with readings and sr mirrors", () => {
    renderSession();
    // Synthetic Orientation: bench line + sentence mirror (t=0 sample).
    expect(screen.getByText(/^BANK [LR]\d\.\d · PITCH/)).toBeInTheDocument();
    expect(
      screen.getByText(/^Synthetic orientation nominal\./),
    ).toBeInTheDocument();
    // Vacuum Energy: lattice gauge readings + sentence mirror.
    expect(screen.getByText(/^VAC 0\.\d{3} · DRAW/)).toBeInTheDocument();
    expect(screen.getByText(/^Vacuum energy nominal\./)).toBeInTheDocument();
  });
});

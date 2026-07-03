// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { instruments } from "@core/works/flight-deck/instruments";
import { deckCopy } from "@core/works/flight-deck/copy";
import type { DeckEvent } from "@core/works/flight-deck/machine";
import { BOOT_STEP_MS, BootSequence } from "./BootSequence";

describe("BootSequence", () => {
  it("shows the invitation while dormant and dispatches WAKE", () => {
    const events: DeckEvent[] = [];
    render(<BootSequence phase="dormant" dispatch={(e) => events.push(e)} />);

    fireEvent.click(screen.getByRole("button", { name: deckCopy.invitation }));
    expect(events).toEqual([{ type: "WAKE" }]);
  });

  describe("with fake timers", () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it("brings instruments online one at a time, then completes the boot", () => {
      const events: DeckEvent[] = [];
      render(<BootSequence phase="waking" dispatch={(e) => events.push(e)} />);

      act(() => vi.advanceTimersByTime(BOOT_STEP_MS));
      expect(screen.getByText(instruments[0].name)).toBeInTheDocument();
      expect(screen.queryByText(instruments[1].name)).not.toBeInTheDocument();

      for (let i = 0; i < instruments.length + 1; i += 1) {
        act(() => vi.advanceTimersByTime(BOOT_STEP_MS));
      }
      expect(screen.getByText(deckCopy.deckReady)).toBeInTheDocument();
      expect(events).toEqual([{ type: "BOOT_COMPLETE" }]);
    });
  });
});

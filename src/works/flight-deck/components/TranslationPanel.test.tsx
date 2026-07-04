// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { deckCopy } from "@core/works/flight-deck/copy";
import type { UtilizationEvent } from "@core/works/flight-deck/translation";
import { TranslationPanel } from "./TranslationPanel";

// jsdom covers the reactive lane's contract: fields, drafting cadence,
// the commit handoff to the session, and the a11y mirrors. The commit
// choreography itself is GSAP-owned and judged live per the mission's
// review gates.

function renderPanel(overrides: Partial<Parameters<typeof TranslationPanel>[0]> = {}) {
  const activity: { current: UtilizationEvent[] } = { current: [] };
  const onCommit = vi.fn();
  render(
    <TranslationPanel
      live
      clock={() => 50}
      activity={activity}
      onCommit={onCommit}
      committing={false}
      {...overrides}
    />,
  );
  return { activity, onCommit };
}

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("TranslationPanel", () => {
  it("renders the three intent groups with keyboard-native radios", () => {
    renderPanel();
    expect(screen.getAllByRole("radiogroup")).toHaveLength(3);
    expect(screen.getAllByRole("radio")).toHaveLength(9);
    expect(
      screen.getByRole("radio", { name: /the high shelf/i }),
    ).toBeChecked();
  });

  it("drafts three proposals with commit controls and cost lines", () => {
    renderPanel();
    const commits = screen.getAllByRole("button", {
      name: deckCopy.panel.commit,
    });
    expect(commits).toHaveLength(3);
    expect(screen.getByText(/^Straight run at/)).toBeInTheDocument();
    expect(screen.getAllByText(/^DRAW \+0\.\d{3} · UTIL \+0\.\d{2}$/)).toHaveLength(3);
  });

  it("goes back to drafting on an intent change and charges attention", () => {
    const { activity } = renderPanel();
    fireEvent.click(screen.getByRole("radio", { name: /back to harbor/i }));
    expect(activity.current).toHaveLength(1);
    expect(
      screen.getByText(deckCopy.panel.proposalPending),
    ).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(800);
    });
    expect(
      screen.queryByText(deckCopy.panel.proposalPending),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(/^Straight run at back to harbor/),
    ).toBeInTheDocument();
  });

  it("hands the chosen proposal to the session on commit", () => {
    const { onCommit } = renderPanel();
    fireEvent.click(
      screen.getAllByRole("button", { name: deckCopy.panel.commit })[0],
    );
    expect(onCommit).toHaveBeenCalledTimes(1);
    expect(onCommit.mock.calls[0][0]).toMatchObject({ style: "direct" });
  });

  it("locks the commit controls while a handoff is running", () => {
    renderPanel({ committing: true });
    for (const button of screen.getAllByRole("button", {
      name: deckCopy.panel.commit,
    })) {
      expect(button).toBeDisabled();
    }
  });

  it("speaks the utilization reading and the ceiling explainer", () => {
    renderPanel();
    expect(screen.getByText(/^UTIL 0\.\d{2}$/)).toBeInTheDocument();
    expect(
      screen.getByText(/^Operator utilization 0\.\d{2}/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(deckCopy.panel.utilizationExplainer),
    ).toBeInTheDocument();
  });
});

// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
} from "@testing-library/react";
import { deckCopy } from "@core/works/flight-deck/copy";
import {
  DEFAULT_INTENT,
  proposeTrajectories,
  type UtilizationEvent,
} from "@core/works/flight-deck/translation";
import { ProposalRow } from "./ProposalRow";
import { TranslationPanel } from "./TranslationPanel";
import { useTranslationLayer } from "./useTranslationLayer";

// jsdom covers the reactive lane's contract: the dock's fields and
// status, the review row's commit handoff, and the drafting cadence in
// the shared hook. The commit choreography itself is GSAP-owned and
// judged live per the mission's review gates.

const activityRef = () => ({ current: [] as UtilizationEvent[] });

function renderDock(overrides: Partial<Parameters<typeof TranslationPanel>[0]> = {}) {
  const activity = activityRef();
  const onIntentChange = vi.fn();
  render(
    <TranslationPanel
      live
      clock={() => 50}
      activity={activity}
      intent={DEFAULT_INTENT}
      onIntentChange={onIntentChange}
      drafting={false}
      draftedCount={3}
      enRoute={null}
      {...overrides}
    />,
  );
  return { activity, onIntentChange };
}

describe("TranslationPanel (dock)", () => {
  it("renders the three intent groups with keyboard-native radios", () => {
    renderDock();
    expect(screen.getAllByRole("radiogroup")).toHaveLength(3);
    expect(screen.getAllByRole("radio")).toHaveLength(9);
    expect(
      screen.getByRole("radio", { name: /the high shelf/i }),
    ).toBeChecked();
  });

  it("reports intent changes upward", () => {
    const { onIntentChange } = renderDock();
    fireEvent.click(screen.getByRole("radio", { name: /back to harbor/i }));
    expect(onIntentChange).toHaveBeenCalledWith({ destination: "harbor" });
  });

  it("speaks the layer's state: drafting, drafted, en route, idle", () => {
    renderDock({ drafting: true });
    expect(
      screen.getByText(deckCopy.panel.proposalPending),
    ).toBeInTheDocument();
  });

  it("shows the standing order once a route is committed", () => {
    const committed = proposeTrajectories(DEFAULT_INTENT)[0];
    renderDock({ draftedCount: 0, enRoute: committed });
    expect(
      screen.getByText(
        `${deckCopy.panel.enRoutePrefix} ${committed.summary}`,
      ),
    ).toBeInTheDocument();
  });

  it("speaks the utilization reading and the ceiling explainer", () => {
    renderDock();
    expect(screen.getByText(/^UTIL 0\.\d{2}$/)).toBeInTheDocument();
    expect(
      screen.getByText(/^Operator utilization 0\.\d{2}/),
    ).toBeInTheDocument();
    // The explainer is a hover reveal per the shape brief (the visible
    // paragraph crowded the vacuum region, live pass 2026-07-05): title
    // for pointers, always in the sr mirror.
    expect(screen.getByTitle(deckCopy.panel.utilizationExplainer)).toBeInTheDocument();
    expect(
      screen.getByText((_, el) =>
        (el?.textContent ?? "").includes(deckCopy.panel.utilizationExplainer) &&
        el?.classList.contains("sr-only") === true,
      ),
    ).toBeInTheDocument();
  });
});

describe("ProposalRow (review surface)", () => {
  it("surfaces the drafts with traces, costs, and commit controls", () => {
    render(
      <ProposalRow
        live
        proposals={proposeTrajectories(DEFAULT_INTENT)}
        onCommit={() => {}}
        committing={false}
      />,
    );
    expect(
      screen.getAllByRole("button", { name: deckCopy.panel.commit }),
    ).toHaveLength(3);
    expect(screen.getByText(/^Straight run at/)).toBeInTheDocument();
    expect(
      screen.getAllByText(/^DRAW \+0\.\d{3} · UTIL \+0\.\d{2}$/),
    ).toHaveLength(3);
  });

  it("hands the chosen proposal to the session on commit", () => {
    const onCommit = vi.fn();
    render(
      <ProposalRow
        live
        proposals={proposeTrajectories(DEFAULT_INTENT)}
        onCommit={onCommit}
        committing={false}
      />,
    );
    fireEvent.click(
      screen.getAllByRole("button", { name: deckCopy.panel.commit })[0],
    );
    expect(onCommit).toHaveBeenCalledTimes(1);
    expect(onCommit.mock.calls[0][0]).toMatchObject({ style: "direct" });
  });

  it("locks commits while a handoff runs, and vanishes when quiet", () => {
    const { rerender, container } = render(
      <ProposalRow
        live
        proposals={proposeTrajectories(DEFAULT_INTENT)}
        onCommit={() => {}}
        committing
      />,
    );
    for (const button of screen.getAllByRole("button", {
      name: deckCopy.panel.commit,
    })) {
      expect(button).toBeDisabled();
    }
    rerender(
      <ProposalRow live proposals={[]} onCommit={() => {}} committing={false} />,
    );
    expect(container).toBeEmptyDOMElement();
  });
});

describe("useTranslationLayer", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("drafts for the default intent immediately", () => {
    const { result } = renderHook(() =>
      useTranslationLayer(() => 0, activityRef()),
    );
    expect(result.current.proposals).toHaveLength(3);
    expect(result.current.drafting).toBe(false);
  });

  it("re-drafts after an intent change and charges attention", () => {
    const activity = activityRef();
    const { result } = renderHook(() =>
      useTranslationLayer(() => 50, activity),
    );
    act(() => {
      result.current.changeIntent({ destination: "harbor" });
    });
    expect(activity.current).toHaveLength(1);
    expect(result.current.drafting).toBe(true);
    act(() => {
      vi.advanceTimersByTime(800);
    });
    expect(result.current.drafting).toBe(false);
    expect(result.current.proposals[0].id).toContain("harbor");
  });

  it("clears the bench on commit and remembers the standing order", () => {
    const { result } = renderHook(() =>
      useTranslationLayer(() => 0, activityRef()),
    );
    const committed = result.current.proposals[0];
    act(() => {
      result.current.clearProposals(committed);
    });
    expect(result.current.proposals).toHaveLength(0);
    expect(result.current.enRoute).toBe(committed);
  });
});

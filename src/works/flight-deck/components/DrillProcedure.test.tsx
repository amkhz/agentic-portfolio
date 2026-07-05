// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { deckCopy } from "@core/works/flight-deck/copy";
import {
  drillAlerts,
  initialDrillProgress,
  type DrillProgress,
} from "@core/works/flight-deck/drill";
import type { DrillTimeline } from "@core/works/flight-deck/drillEnvelopes";
import { AlertRegion } from "./AlertRegion";
import { DrillProcedure } from "./DrillProcedure";
import { DrillResidual } from "./DrillResidual";

const timeline = (): { current: DrillTimeline } => ({
  current: { beatAt: {}, resolvedAt: {} },
});

const at = (patch: Partial<DrillProgress>): DrillProgress => ({
  ...initialDrillProgress,
  stage: "alerts",
  ...patch,
});

describe("AlertRegion", () => {
  it("rests quiet, and quieter-but-proud once the drill is worked", () => {
    render(<AlertRegion progress={initialDrillProgress} />);
    expect(screen.getByText(deckCopy.alerts.quiet)).toBeInTheDocument();
    render(<AlertRegion progress={at({ stage: "done" })} />);
    expect(screen.getByText(deckCopy.alerts.quietAfterDrill)).toBeInTheDocument();
  });

  it("posts severity word, label, and the plain line together", () => {
    render(<AlertRegion progress={at({ alertIndex: 2 })} />);
    expect(screen.getByText(deckCopy.alerts.severity.caution)).toBeInTheDocument();
    expect(screen.getByText(drillAlerts[2].label)).toBeInTheDocument();
    expect(screen.getByText(drillAlerts[2].plain)).toBeInTheDocument();
  });

  it("shows the resolved line between beats", () => {
    render(<AlertRegion progress={at({ alertIndex: 0, betweenBeats: true })} />);
    expect(screen.getByText(drillAlerts[0].resolved)).toBeInTheDocument();
  });
});

describe("DrillProcedure", () => {
  it("surfaces steps as they arrive, never ahead of the checklist", () => {
    render(
      <DrillProcedure
        progress={at({ alertIndex: 0, stepIndex: 1 })}
        clock={() => 50}
        timeline={timeline()}
        onJudge={() => {}}
      />,
    );
    expect(screen.getByText(drillAlerts[0].steps[0].text)).toBeInTheDocument();
    expect(screen.getByText(drillAlerts[0].steps[1].text)).toBeInTheDocument();
    expect(
      screen.queryByText(drillAlerts[0].steps[2].text),
    ).not.toBeInTheDocument();
  });

  it("offers the judgment choices, takes focus, and reports the call", () => {
    const judged: string[] = [];
    render(
      <DrillProcedure
        progress={at({ alertIndex: 3, stepIndex: 2 })}
        clock={() => 50}
        timeline={timeline()}
        onJudge={(id) => judged.push(id)}
      />,
    );
    const ring = screen.getByRole("button", { name: "Even ring" });
    expect(document.activeElement).toBe(ring);
    fireEvent.click(screen.getByRole("button", { name: "Shed to the trailing wall" }));
    expect(judged).toEqual(["shed"]);
  });

  it("renders the verify cross-check with disagreeing wall readings", () => {
    render(
      <DrillProcedure
        progress={at({ alertIndex: 1, stepIndex: 2 })}
        clock={() => 50}
        timeline={timeline()}
        onJudge={() => {}}
      />,
    );
    expect(screen.getByText(deckCopy.alerts.crossCheckLaneB)).toBeInTheDocument();
    expect(screen.getByText(deckCopy.alerts.crossCheckRender)).toBeInTheDocument();
    const values = document.querySelectorAll(".deck-drill__crosscheck-value");
    expect(values).toHaveLength(2);
    const claim = Number(values[0].textContent);
    const real = Number(values[1].textContent);
    expect(real - claim).toBeGreaterThan(0.04);
  });

  it("shows the response and the resolved line after the judgment", () => {
    render(
      <DrillProcedure
        progress={at({
          alertIndex: 1,
          stepIndex: 2,
          betweenBeats: true,
          response: drillAlerts[1].steps[2].choices![0].response,
        })}
        clock={() => 50}
        timeline={timeline()}
        onJudge={() => {}}
      />,
    );
    expect(
      screen.getByText(drillAlerts[1].steps[2].choices![0].response),
    ).toBeInTheDocument();
    expect(screen.getByText(drillAlerts[1].resolved)).toBeInTheDocument();
  });
});

describe("DrillResidual", () => {
  it("reads the after-state, live margin, and returns to watch", () => {
    vi.useFakeTimers();
    const acked: boolean[] = [];
    render(
      <DrillResidual
        progress={at({
          stage: "residual",
          choices: { "collapse-judge": "shed" },
        })}
        clock={() => 500}
        timeline={timeline()}
        onAcknowledge={() => acked.push(true)}
      />,
    );
    expect(
      screen.getByText(deckCopy.alerts.residual.trippedLabel),
    ).toBeInTheDocument();
    expect(screen.getByText(/trailing wall/)).toBeInTheDocument();
    // Live margin from the pure model, signed and tabular.
    expect(
      screen.getByText(/^[+-]0\.\d{3}$/),
    ).toBeInTheDocument();
    const button = screen.getByRole("button", {
      name: deckCopy.alerts.residual.acknowledge,
    });
    expect(document.activeElement).toBe(button);
    fireEvent.click(button);
    expect(acked).toEqual([true]);
    vi.useRealTimers();
  });
});

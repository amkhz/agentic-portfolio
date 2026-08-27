// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MetricCard } from "./MetricCard";

describe("MetricCard", () => {
  // R2a: the count-up took the FIRST number in the string and animated it
  // from zero, so a compound figure spent its whole animation stating
  // something false -- and a reader who glanced early read it as fact.
  it("prints a compound figure whole, with nothing counting", () => {
    render(<MetricCard value="17 min → <10 min" label="Review turnaround" />);
    expect(screen.getByText("17 min → <10 min")).toBeInTheDocument();
  });

  it("prints a plain figure at its stated value on first paint", () => {
    render(<MetricCard value="100%" label="Adoption" />);
    expect(screen.getByText("100%")).toBeInTheDocument();
    expect(screen.queryByText("0%")).not.toBeInTheDocument();
  });

  // R2b: the shouted captions the sweep measured all sit under values that
  // parse as figures, so the statement branch never saw them. Past the
  // sentence threshold the caption drops the mono-caps register whichever
  // branch it is on.
  it("sets a sentence-length caption under a figure as body prose", () => {
    const label = "Caption saved beside every image as the source of truth";
    render(<MetricCard value="1 spec" label={label} />);
    const caption = screen.getByText(label);
    expect(caption.className).toContain("font-body");
    expect(caption.className).not.toContain("uppercase");
  });

  it("keeps a terse ledger label in the mono register", () => {
    render(<MetricCard value="100%" label="Team AI tool adoption" />);
    const caption = screen.getByText("Team AI tool adoption");
    expect(caption.className).toContain("uppercase");
    expect(caption.className).toContain("font-mono");
  });

  // The statement branch is unchanged: a status phrase over a sentence-length
  // label inverts to kicker-plus-prose rather than a huge phrase.
  it("keeps the statement treatment for a non-numeric value with a long label", () => {
    const label =
      "The team ships design decisions the same week they are made, and the backlog no longer carries them.";
    render(<MetricCard value="Real, today" label={label} />);
    expect(screen.getByText("Real, today")).toBeInTheDocument();
    expect(screen.getByText(label)).toBeInTheDocument();
  });
});

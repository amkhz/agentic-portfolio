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

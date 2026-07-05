// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { deckCopy } from "@core/works/flight-deck/copy";
import { OperatorStrip } from "./OperatorStrip";

describe("OperatorStrip", () => {
  it("renders the three traces with labels and a sentence mirror", () => {
    render(<OperatorStrip live={false} />);
    expect(screen.getByText(deckCopy.operator.label)).toBeInTheDocument();
    expect(screen.getByText(deckCopy.operator.blink)).toBeInTheDocument();
    expect(screen.getByText(deckCopy.operator.respiration)).toBeInTheDocument();
    expect(screen.getByText(deckCopy.operator.coherence)).toBeInTheDocument();
    // The t=0 still doubles as the static plate: values + mirror present.
    expect(screen.getByText(/^Operator state steady\./)).toBeInTheDocument();
  });

  it("marks the promoted state and says so in the mirror", () => {
    const { container } = render(<OperatorStrip live={false} promoted />);
    expect(container.querySelector(".deck-opstrip")).toHaveAttribute(
      "data-promoted",
    );
    expect(screen.getByText(/holding the controls/)).toBeInTheDocument();
  });
});

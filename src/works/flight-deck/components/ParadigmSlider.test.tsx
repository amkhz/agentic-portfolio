// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { deckCopy } from "@core/works/flight-deck/copy";
import { ParadigmSlider } from "./ParadigmSlider";

function renderSlider(value = 0) {
  const onChange = vi.fn();
  const onDissolve = vi.fn();
  const onCrossing = vi.fn();
  render(
    <ParadigmSlider
      value={value}
      onChange={onChange}
      onDissolve={onDissolve}
      onCrossing={onCrossing}
    />,
  );
  return { onChange, onDissolve, onCrossing };
}

describe("ParadigmSlider", () => {
  it("is a real range input with the regime spoken in valuetext", () => {
    renderSlider(0);
    const input = screen.getByRole("slider", {
      name: deckCopy.paradigm.label,
    });
    expect(input).toHaveAttribute(
      "aria-valuetext",
      `${deckCopy.paradigm.regimes.instrumented.name}. ${deckCopy.paradigm.regimes.instrumented.line}`,
    );
  });

  it("names all three regimes on the track", () => {
    renderSlider(0);
    for (const regime of Object.values(deckCopy.paradigm.regimes)) {
      expect(screen.getByText(regime.name)).toBeInTheDocument();
    }
  });

  it("dispatches position changes as fractions", () => {
    const { onChange } = renderSlider(0);
    fireEvent.change(screen.getByRole("slider"), { target: { value: "50" } });
    expect(onChange).toHaveBeenCalledWith(0.5);
  });

  it("speaks the current regime's line beneath the track", () => {
    renderSlider(0.9);
    expect(
      screen.getByText(deckCopy.paradigm.regimes.consciousness.line),
    ).toBeInTheDocument();
    const input = screen.getByRole("slider");
    expect(input).toHaveAttribute("aria-valuetext", expect.stringContaining("Consciousness"));
  });
});

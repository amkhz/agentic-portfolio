// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import { deckCopy } from "@core/works/flight-deck/copy";
import { axialRidgeMarks } from "@core/works/flight-deck/field";
import { SliceScrubber } from "./SliceScrubber";

const marks = axialRidgeMarks(0);

const renderScrubber = (
  value = 0,
  disabled = false,
  onChange = vi.fn(),
  onSweep = vi.fn(),
) => ({
  onChange,
  onSweep,
  ...render(
    <SliceScrubber
      value={value}
      onChange={onChange}
      onSweep={onSweep}
      marks={marks}
      disabled={disabled}
    />,
  ),
});

describe("SliceScrubber", () => {
  it("is a real range input speaking the plane in plain words", () => {
    const { getByRole } = renderScrubber(0.3);
    const input = getByRole("slider", { name: deckCopy.slice.control });
    expect(input.getAttribute("aria-valuetext")).toBe("0.30 toward the bow");
    expect((input as HTMLInputElement).value).toBe("30");
  });

  it("speaks the reference plane at home", () => {
    const { getByRole } = renderScrubber(0);
    expect(
      getByRole("slider", { name: deckCopy.slice.control }).getAttribute(
        "aria-valuetext",
      ),
    ).toBe("At the reference plane");
  });

  it("maps the input's percent steps onto the plane", () => {
    const { getByRole, onChange } = renderScrubber(0);
    fireEvent.change(getByRole("slider"), { target: { value: "-45" } });
    expect(onChange).toHaveBeenCalledWith(-0.45);
  });

  it("rests disabled while an alert holds the plane home", () => {
    const { getByRole } = renderScrubber(0, true);
    expect((getByRole("slider") as HTMLInputElement).disabled).toBe(true);
  });

  it("shows the tabular plane readout", () => {
    const { getByText, rerender, onChange, onSweep } = renderScrubber(-0.85);
    expect(getByText("-0.85")).toBeTruthy();
    rerender(
      <SliceScrubber
        value={0}
        onChange={onChange}
        onSweep={onSweep}
        marks={marks}
      />,
    );
    expect(getByText("REF")).toBeTruthy();
  });

  it("carries the hull silhouette as its track (the body being cut)", () => {
    const { container } = renderScrubber();
    const hull = container.querySelector(".deck-hull");
    expect(hull).not.toBeNull();
    // Three tracked ridge ticks + the flank + the midship notch.
    expect(hull!.querySelectorAll("line").length).toBeGreaterThanOrEqual(5);
  });
});

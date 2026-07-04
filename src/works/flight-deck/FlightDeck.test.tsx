// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { deckCopy } from "@core/works/flight-deck/copy";
import { FlightDeck } from "./FlightDeck";

function renderDeck() {
  return render(
    <MemoryRouter>
      <FlightDeck />
    </MemoryRouter>,
  );
}

function setViewportWidth(width: number) {
  Object.defineProperty(window, "innerWidth", {
    value: width,
    configurable: true,
    writable: true,
  });
}

describe("FlightDeck", () => {
  // jsdom has no WebGL, so a desktop-width render lands on the static
  // instrument plate: exactly the no-WebGL fallback path.
  it("serves the static plate when WebGL is unavailable", () => {
    setViewportWidth(1440);
    renderDeck();
    expect(screen.getByText("Field Integrity")).toBeInTheDocument();
    expect(screen.getByText(deckCopy.staticPlate.note)).toBeInTheDocument();
  });

  it("shows all three instruments at nominal on the static plate", () => {
    setViewportWidth(1440);
    renderDeck();
    expect(screen.getByText(/^WALL 0\.\d{2} · EVEN/)).toBeInTheDocument();
    expect(screen.getByText(/^BANK [LR]\d\.\d · PITCH/)).toBeInTheDocument();
    expect(screen.getByText(/^VAC 0\.\d{3} · DRAW/)).toBeInTheDocument();
    // The plate keeps the sentence mirrors the a11y contract requires.
    expect(
      screen.getByText(/^Synthetic orientation nominal\./),
    ).toBeInTheDocument();
    expect(screen.getByText(/^Vacuum energy nominal\./)).toBeInTheDocument();
  });

  it("declines below the minimum bench width with the designed card", () => {
    setViewportWidth(500);
    renderDeck();
    expect(screen.getByText(deckCopy.decline.heading)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: deckCopy.colophon.exitToArchive }),
    ).toBeInTheDocument();
  });

  it("reaches the colophon by deliberate exit and returns", () => {
    setViewportWidth(1440);
    renderDeck();

    fireEvent.click(screen.getByRole("button", { name: "Colophon" }));
    expect(screen.getByText(deckCopy.colophon.thesis)).toBeInTheDocument();
    // The four source guides plus the Archive exit
    expect(screen.getAllByRole("link").length).toBeGreaterThanOrEqual(5);

    fireEvent.click(
      screen.getByRole("button", { name: deckCopy.colophon.exitToDeck }),
    );
    expect(screen.getByText(deckCopy.staticPlate.note)).toBeInTheDocument();
  });
});

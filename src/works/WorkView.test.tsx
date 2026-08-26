// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter, Route, Routes } from "react-router";
import { worksCopy } from "@core/works/copy";

// The real work is a WebGL/GSAP/Tone chunk jsdom cannot mount, and the
// behaviour under test is the boundary, not the deck. The fault is a
// latch rather than a counter: React re-renders a component that threw
// to recover a better stack, so anything self-clearing would be spent
// before the boundary ever caught it.
const fault = { active: false };
vi.mock("./flight-deck/FlightDeck", () => ({
  FlightDeck: () => {
    if (fault.active) throw new Error("instrument fault");
    return <div>the bench</div>;
  },
}));

const { WorkView } = await import("./WorkView");

function renderWork() {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={["/w/flight-deck"]}>
        <Routes>
          <Route path="/w/:slug" element={<WorkView />} />
          <Route path="/" element={<div>the archive</div>} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>,
  );
}

/** React logs boundary-caught errors on top of handing them to the
 *  boundary; the runner counts that as noise unless it is swallowed. */
function silenceReactErrorReporting() {
  vi.spyOn(console, "error").mockImplementation(() => {});
}

describe("WorkView", () => {
  afterEach(() => {
    fault.active = false;
    vi.restoreAllMocks();
  });

  it("renders the work when nothing throws", async () => {
    renderWork();
    expect(await screen.findByText("the bench")).toBeInTheDocument();
  });

  // R2a P0 1: an uncaught throw inside a work used to unmount the whole
  // lab entry to a blank page. The visitor gets the designed card now.
  it("catches a fault in the work and shows the card instead of a blank page", async () => {
    silenceReactErrorReporting();
    fault.active = true;
    renderWork();
    expect(
      await screen.findByRole("heading", { name: worksCopy.fault.heading }),
    ).toBeInTheDocument();
    expect(screen.queryByText("the bench")).not.toBeInTheDocument();
  });

  it("remounts the work from nothing when the card's restart is used", async () => {
    silenceReactErrorReporting();
    fault.active = true;
    renderWork();
    const restart = await screen.findByRole("button", {
      name: worksCopy.fault.restart,
    });
    fault.active = false;
    fireEvent.click(restart);
    expect(await screen.findByText("the bench")).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: worksCopy.fault.heading }),
    ).not.toBeInTheDocument();
  });

  it("leaves the fault card a way back to the archive", async () => {
    silenceReactErrorReporting();
    fault.active = true;
    renderWork();
    const exit = await screen.findByRole("link", {
      name: worksCopy.fault.exit,
    });
    expect(exit).toHaveAttribute("href", "/");
  });
});

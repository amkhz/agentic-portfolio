// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { renderSection } from "./renderSection";

describe("renderSection image plates", () => {
  beforeEach(() => {
    vi.stubGlobal("IntersectionObserver", class {
      observe() {}
      unobserve() {}
      disconnect() {}
    });
  });
  afterEach(() => vi.unstubAllGlobals());
  it.each(["dark", undefined] as const)("passes plate %s to ImageBlock", (plate) => {
    render(renderSection({ type: "image", src: "/images/before-flow.png",
      alt: "Diagram", placeholder: "Diagram", aspect: "16:9", plate }, 0));
    expect(screen.getByRole("button").classList.contains("bg-figure-plate"))
      .toBe(plate === "dark");
  });
});

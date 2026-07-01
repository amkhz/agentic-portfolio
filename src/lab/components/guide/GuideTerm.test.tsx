// @vitest-environment jsdom
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { GuideTerm } from "./GuideTerm";

describe("GuideTerm", () => {
  it("renders an interactive button with popover ARIA when onToggle is provided", () => {
    const onToggle = vi.fn();
    render(<GuideTerm term="ambiguity" active={false} onToggle={onToggle} />);
    const btn = screen.getByRole("button", { name: "ambiguity" });
    expect(btn).toHaveAttribute("aria-expanded", "false");
    expect(btn).toHaveAttribute("aria-controls");
  });

  it("renders static marked text (no button, no aria-controls) when non-interactive", () => {
    // Lists, tables, and blockquotes render terms without a popover; they must
    // not be dead buttons with an aria-controls pointing at an absent card.
    render(<GuideTerm term="anomaly" />);
    expect(screen.queryByRole("button")).toBeNull();
    const span = screen.getByText("anomaly");
    expect(span.tagName).toBe("SPAN");
    expect(span).not.toHaveAttribute("aria-controls");
  });
});

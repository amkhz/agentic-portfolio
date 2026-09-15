// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ImageBlock } from "./ImageBlock";

const image = { src: "/images/before-flow.png", alt: "An intact diagram" };

describe("ImageBlock dark plate", () => {
  it("insets the contained ratio image inside the outer border", () => {
    render(<ImageBlock {...image} plate="dark" />);
    expect(screen.getByRole("button")).toHaveClass("bg-[var(--theme-figure-plate)]", "border-border-subtle", "aspect-[16/9]");
    const img = screen.getByRole("img");
    expect(img).toHaveClass("object-contain");
    expect(img.parentElement?.parentElement).toHaveClass("absolute", "inset-[var(--figure-plate-inset)]");
  });
  it("preserves the unplated layout when absent", () => {
    render(<ImageBlock {...image} />);
    expect(screen.getByRole("button")).toHaveClass("bg-bg-elevated");
    expect(screen.getByRole("button")).not.toHaveClass("bg-[var(--theme-figure-plate)]");
    expect(screen.getByRole("img")).toHaveClass("absolute", "inset-0");
  });
  it("leaves bare covers unchanged", () => {
    render(<ImageBlock {...image} bare plate="dark" />);
    expect(screen.getByRole("button")).toHaveClass("bg-bg-elevated");
    expect(screen.getByRole("img")).toHaveClass("object-cover");
  });
  it("sizes a plated auto figure in flow", () => {
    render(<ImageBlock {...image} aspect="auto" plate="dark" />);
    const img = screen.getByRole("img");
    expect(img).toHaveClass("h-auto");
    expect(img).not.toHaveClass("absolute");
    expect(img.parentElement?.parentElement).toHaveClass("p-[var(--figure-plate-inset)]");
  });
  it.each(["Enter", " "])("opens the lightbox with %s", (key) => {
    render(<ImageBlock {...image} plate="dark" />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("tabindex", "0");
    expect(button).toHaveClass("focus-visible:ring-accent-primary");
    fireEvent.keyDown(button, { key });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

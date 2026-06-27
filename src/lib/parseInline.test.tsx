import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { parseInline } from "./parseInline";

const html = (text: string) => renderToStaticMarkup(<>{parseInline(text)}</>);

describe("parseInline", () => {
  it("renders **bold** as <strong>", () => {
    expect(html("a **bold** word")).toContain("<strong");
    expect(html("a **bold** word")).toContain("bold");
  });

  it("renders *italic* as <em>", () => {
    const out = html("an *italic* word");
    expect(out).toContain("<em");
    expect(out).toContain("italic");
    expect(out).not.toContain("*");
  });

  it("does not mistake **bold** for two italics", () => {
    const out = html("**bold**");
    expect(out).toContain("<strong");
    expect(out).not.toContain("<em");
  });

  it("renders a full-line italic dek without leaking asterisks", () => {
    const out = html("*Lead Product Designer at Kiavi, mid-2025 to mid-2026.*");
    expect(out).toContain("<em");
    expect(out).not.toContain("*");
  });

  it("renders [links](url) as anchors", () => {
    const out = html("see [the lab](https://labs.justinh.design)");
    expect(out).toContain("href=\"https://labs.justinh.design\"");
    expect(out).toContain("the lab");
  });

  it("leaves a lone unpaired asterisk literal", () => {
    expect(html("2 * 3 = 6")).toContain("2 * 3 = 6");
  });

  it("passes plain text through unchanged", () => {
    expect(html("just words")).toContain("just words");
  });
});

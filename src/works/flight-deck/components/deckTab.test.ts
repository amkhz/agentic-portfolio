import { describe, expect, it } from "vitest";

/**
 * Every interactive element on the deck must declare an explicit
 * tabIndex (see deckTab.ts: Safari under the default macOS keyboard
 * setting skips native buttons, links, and sliders on Tab; the
 * explicit attribute opts them back in). This scans the sources so a
 * new control cannot ship without opting in.
 */

// Raw sources of every deck component (dev/ is the DialKit tuner,
// absent from production; tests scan themselves out by filename).
const sources = import.meta.glob("../**/*.tsx", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

/** Extract each opening tag for the given element, brace-aware (JSX
 *  attribute expressions contain `=>` and `>`). */
function openingTags(source: string, element: string): string[] {
  const tags: string[] = [];
  const re = new RegExp(`<${element}[\\s/>]`, "g");
  let match: RegExpExecArray | null;
  while ((match = re.exec(source))) {
    let depth = 0;
    for (let i = match.index; i < source.length; i++) {
      const ch = source[i];
      if (ch === "{") depth++;
      else if (ch === "}") depth--;
      else if (ch === ">" && depth === 0 && source[i - 1] !== "=") {
        tags.push(source.slice(match.index, i + 1));
        break;
      }
    }
  }
  return tags;
}

describe("deck tab-order opt-in", () => {
  it("every button, link, and input declares an explicit tabIndex", () => {
    const offenders: string[] = [];
    let scanned = 0;
    for (const [path, source] of Object.entries(sources)) {
      if (path.includes(".test.") || path.includes("/dev/")) continue;
      for (const element of ["button", "input", "Link", "a"]) {
        for (const tag of openingTags(source, element)) {
          scanned++;
          if (!/\btabIndex=/.test(tag)) {
            offenders.push(`${path}: <${element}>`);
          }
        }
      }
    }
    // The scan is real: the deck ships with 14 opted-in controls.
    expect(scanned).toBeGreaterThanOrEqual(14);
    expect(offenders, offenders.join("\n")).toEqual([]);
  });
});

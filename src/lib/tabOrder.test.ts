import { describe, expect, it } from "vitest";

/**
 * Every interactive element on the site must declare an explicit
 * tabIndex (see tabOrder.ts: Safari under the default macOS keyboard
 * setting skips native buttons, links, and sliders on Tab; the
 * explicit attribute opts them back in). This scans the sources so a
 * new control cannot ship without opting in. The Flight Deck has its
 * own copy of this guard (deckTab.test.ts).
 */

// Raw sources of every component outside the deck (which guards
// itself); tests scan themselves out by filename.
const sources = import.meta.glob("../**/*.tsx", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

// Includes the motion-wrapped variants: motion.create(Link) aliases and
// motion.a/button render the same native elements and need the same
// opt-in (the homepage ledger links slipped through the first pass).
const ELEMENTS = [
  "button",
  "a",
  "Link",
  "NavLink",
  "MotionLink",
  "input",
  "select",
  "textarea",
  "summary",
  "motion\\.a",
  "motion\\.button",
  "motion\\.input",
];

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

describe("site tab-order opt-in", () => {
  it("every interactive element declares an explicit tabIndex", () => {
    const offenders: string[] = [];
    let scanned = 0;
    for (const [path, source] of Object.entries(sources)) {
      if (path.includes(".test.") || path.includes("works/flight-deck")) {
        continue;
      }
      for (const element of ELEMENTS) {
        for (const tag of openingTags(source, element)) {
          scanned++;
          if (!/\btabIndex=/.test(tag)) {
            offenders.push(`${path}: <${element}>`);
          }
        }
      }
    }
    // The scan is real: the site ships with dozens of opted-in controls.
    expect(scanned).toBeGreaterThanOrEqual(75);
    expect(offenders, offenders.join("\n")).toEqual([]);
  });
});

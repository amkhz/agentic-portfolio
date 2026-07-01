/**
 * Shared accent logic for the Reading Room shelf (T3). Every candidate layout —
 * Accession Register, The Ledger, The Lit Bay — publishes the per-guide accent
 * the same way, so the accent contract lives in exactly one place.
 *
 * The accent contract (ADR-009): each shelf item carries an inline style that
 * publishes `--guide-accent-dark` (from frontmatter `accent`) and, when curated,
 * `--guide-accent-light` (from `accentLight`; omitted otherwise so the light
 * scope's brass fallback in lab-tokens.css applies). The item root also carries
 * the `lab-guide-spine` class, whose CSS (src/lab/styles/lab.css) re-resolves
 * `--guide-accent` from that published pair right on the item — so a territory's
 * shelf shows each guide's OWN accent rather than inheriting the territory color.
 * The component never sets `--guide-accent` directly; the cascade owns that. This
 * is the one permitted inline-style exception: raw values from content flow
 * through as CSS custom properties because they originate in data, not UI code.
 * Do not extend this pattern to other lab UI.
 */
import type { CSSProperties } from "react";
import { useMemo } from "react";
import type { Guide, GuideStatus } from "@core/lab/guide-types";

// Which shelf layout the library index renders. A temporary prototype switch
// (ShelfLayoutToggle) flips between the three for live comparison; the losers
// and the toggle come out once a direction is chosen.
export type ShelfLayout = "register" | "ledger" | "bay";

export const STATUS_LABEL: Record<GuideStatus, string> = {
  complete: "Complete",
  "in-progress": "In progress",
  draft: "Draft",
};

/** Build the inline style that publishes the per-guide accent pair. */
export function useGuideAccentStyle(guide: Guide): CSSProperties {
  return useMemo<CSSProperties>(() => {
    const style: Record<string, string> = {
      "--guide-accent-dark": guide.frontmatter.accent,
    };
    if (guide.frontmatter.accentLight !== undefined) {
      style["--guide-accent-light"] = guide.frontmatter.accentLight;
    }
    return style as CSSProperties;
  }, [guide.frontmatter.accent, guide.frontmatter.accentLight]);
}

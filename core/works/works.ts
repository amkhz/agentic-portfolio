/**
 * The Works manifest (ADR-017 D1). Single registry for Perihelion's
 * applied-design arm, mirroring core/lab/guides.ts. One entry now,
 * shaped for more: Works 02+ inherits this template.
 */

export type WorkStatus = "in-progress" | "live";

/**
 * The Works arm line (ADR-017 D7, locked 2026-07-05 with the colophon
 * copy pass): the applied arm's own line beneath the house umbrella,
 * sibling of the Archive's "A reader's notebook. Designed to be prep,
 * not product." Renders on the Works colophon and as the Shelf
 * section's premise line; single source here.
 */
export const worksArmLine =
  "A working bench. Designed to be operated, not watched.";

export interface WorkEntry {
  slug: string;
  title: string;
  /** One-line thesis. Shelf, decline card, and colophon all draw on it. */
  thesisLine: string;
  /** Slugs in core/lab/guides that the piece is built from. */
  sourceGuides: string[];
  year: number;
  status: WorkStatus;
}

export const works: WorkEntry[] = [
  {
    slug: "flight-deck",
    title: "The Flight Deck",
    thesisLine: "Speculative design you can operate, not watch.",
    sourceGuides: [
      "dird-28-breakthrough-cockpits",
      "dird-34-cognitive-limits",
      "dird-13-warp-drive",
      "dird-15-vacuum-spacetime-engineering",
    ],
    year: 2026,
    status: "live",
  },
];

export function getWork(slug: string): WorkEntry | undefined {
  return works.find((work) => work.slug === slug);
}

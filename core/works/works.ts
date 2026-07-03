/**
 * The Works manifest (ADR-017 D1). Single registry for Perihelion's
 * applied-design arm, mirroring core/lab/guides.ts. One entry now,
 * shaped for more: Works 02+ inherits this template.
 */

export type WorkStatus = "in-progress" | "live";

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
    status: "in-progress",
  },
];

export function getWork(slug: string): WorkEntry | undefined {
  return works.find((work) => work.slug === slug);
}

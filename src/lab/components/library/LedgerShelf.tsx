/**
 * LedgerShelf — shelf layout "ledger", The Ledger (T3, ADR-016 "The Reading
 * Room"). The front-matter of a bound research annual: a masthead running rule
 * with the entry count, then folio-numbered catalog rows on a ruled baseline
 * grid. Each row: folio + text status lozenge (mono, ink only), a full Podkova
 * title with a Newsreader dek and full mono authorship, and a 2px per-guide
 * accent seam at the right edge (a drawn margin rule, not a glow). Titles read
 * horizontally and never truncate. On hover the title steps up in weight and
 * ink and the seam brightens to full accent — glow-free interaction.
 *
 * Per-guide accent publication lives in guideShelfCommon (see the note there).
 */
import { Link } from "react-router";
import type { Guide, GuideStatus } from "@core/lab/guide-types";
import { STATUS_LABEL, useGuideAccentStyle } from "./guideShelfCommon";

const STATUS_INK: Record<GuideStatus, string> = {
  complete: "text-guide-accent",
  "in-progress": "text-lab-text-secondary",
  draft: "text-lab-text-muted",
};

export function LedgerShelf({ guides }: { guides: Guide[] }) {
  return (
    <div className="mt-8">
      {/* Masthead: a running rule with the holdings count flush right. */}
      <div className="flex items-baseline gap-4">
        <span aria-hidden className="h-px flex-1 bg-lab-border-strong" />
        <span className="font-lab-mono text-[0.65rem] uppercase tracking-[0.18em] text-lab-text-muted">
          {guides.length} {guides.length === 1 ? "entry" : "entries"}
        </span>
      </div>

      <ul className="divide-y divide-lab-border-subtle">
        {guides.map((guide, i) => (
          <li key={guide.slug}>
            <LedgerEntry guide={guide} index={i + 1} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function LedgerEntry({ guide, index }: { guide: Guide; index: number }) {
  const { title, source, status, description } = guide.frontmatter;
  const accentStyle = useGuideAccentStyle(guide);

  return (
    <Link
      to={`/g/${guide.slug}`}
      style={accentStyle}
      aria-label={`${title} — ${STATUS_LABEL[status]}`}
      className="lab-guide-spine group relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-5 py-6 pr-5 md:grid-cols-[3.5rem_minmax(0,1fr)]"
    >
      {/* Folio + status lozenge — mono, ink only, no fill. */}
      <div className="flex flex-col gap-2 pt-1">
        <span className="font-lab-mono text-sm tracking-wide text-lab-text-muted">
          {String(index).padStart(2, "0")}
        </span>
        <span
          className={`font-lab-mono text-[0.55rem] uppercase tracking-wider ${STATUS_INK[status]}`}
        >
          · {STATUS_LABEL[status]}
        </span>
      </div>

      {/* Title, dek, authorship. */}
      <div className="min-w-0">
        <h3 className="font-lab-heading text-xl font-semibold leading-snug tracking-tight text-lab-text-primary transition-colors duration-[var(--duration-normal)] group-hover:font-bold group-hover:text-guide-accent md:text-2xl">
          {title}
        </h3>
        {description ? (
          <p className="mt-2 max-w-2xl font-lab-body text-base leading-relaxed text-lab-text-secondary">
            {description}
          </p>
        ) : null}
        <p className="mt-2.5 font-lab-mono text-xs tracking-wide text-lab-text-muted">
          {source.authors} — {source.year}
        </p>
      </div>

      {/* Per-guide accent seam — a drawn margin rule at the right edge. Dim at
          rest, brightens to full accent on hover. Pigment, never a halo. */}
      <span
        aria-hidden
        className="absolute right-0 top-4 bottom-4 w-[2px] bg-guide-accent opacity-40 transition-opacity duration-[var(--duration-normal)] group-hover:opacity-100"
      />
    </Link>
  );
}

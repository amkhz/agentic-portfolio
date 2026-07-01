/**
 * RegisterShelf — shelf layout "register", the Accession Register (T3, ADR-016
 * "The Reading Room"). A researcher's logged holdings: a left mono provenance
 * gutter (call-number · year · status) against a hairline, a wide entry field
 * (kicker, full Podkova title, Newsreader dek, full mono authorship), and the
 * source venue hung in the outer margin as a provenance annotation. Titles read
 * horizontally and never truncate. Interaction is glow-free: on hover the gutter
 * hairline thickens to the guide accent (a librarian's pencil-tick) and the
 * title steps up in weight and ink. Accent appears only as pigment (the
 * call-number ink + the hover rule), never as a lit border.
 *
 * The call-number and folio are derived from real data (territory + position),
 * not invented — the lab has no accession-ID field. Per-guide accent publication
 * lives in guideShelfCommon (see the accent-contract note there).
 */
import { Link } from "react-router";
import type { Guide, GuideStatus } from "@core/lab/guide-types";
import { STATUS_LABEL, useGuideAccentStyle } from "./guideShelfCommon";

const STATUS_DOT: Record<GuideStatus, string> = {
  complete: "text-guide-accent",
  "in-progress": "text-lab-text-secondary",
  draft: "text-lab-text-muted",
};

export function RegisterShelf({ guides }: { guides: Guide[] }) {
  return (
    <div className="mt-8">
      <ul className="divide-y divide-lab-border-subtle border-t border-lab-border-subtle">
        {guides.map((guide, i) => (
          <li key={guide.slug}>
            <RegisterEntry guide={guide} index={i + 1} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function RegisterEntry({ guide, index }: { guide: Guide; index: number }) {
  const { title, kicker, source, status, description, territory } =
    guide.frontmatter;
  const accentStyle = useGuideAccentStyle(guide);
  const callNumber = `${territory} · ${String(index).padStart(2, "0")}`;

  return (
    <Link
      to={`/g/${guide.slug}`}
      style={accentStyle}
      aria-label={`${title} — ${STATUS_LABEL[status]}`}
      className="lab-guide-spine group grid grid-cols-1 gap-x-6 gap-y-2 py-6 md:grid-cols-[7rem_minmax(0,1fr)_9rem]"
    >
      {/* Provenance gutter: call-number (accent pigment), year, status. The
          right hairline thickens to the guide accent on hover — the pencil-tick,
          not a glow. */}
      <div className="flex flex-col gap-1.5 border-lab-border-subtle transition-colors duration-[var(--duration-normal)] group-hover:border-guide-accent md:border-r md:pr-6 md:text-right">
        <span className="font-lab-mono text-xs uppercase tracking-wider text-guide-accent">
          {callNumber}
        </span>
        <span className="font-lab-mono text-xs tracking-wide text-lab-text-muted">
          {source.year}
        </span>
        <span className="flex items-center gap-1.5 font-lab-mono text-[0.6rem] uppercase tracking-wider text-lab-text-muted md:justify-end">
          <span aria-hidden className={STATUS_DOT[status]}>
            {status === "draft" ? "○" : "●"}
          </span>
          {STATUS_LABEL[status]}
        </span>
      </div>

      {/* Entry field: kicker, full title, dek, full authorship. */}
      <div className="min-w-0">
        <span className="block font-lab-mono text-[0.6rem] uppercase tracking-wider text-lab-text-muted">
          {kicker}
        </span>
        <h3 className="mt-1.5 font-lab-heading text-xl font-semibold leading-snug tracking-tight text-lab-text-primary transition-colors duration-[var(--duration-normal)] group-hover:font-bold group-hover:text-guide-accent md:text-2xl">
          {title}
        </h3>
        {description ? (
          <p className="mt-2 max-w-2xl font-lab-body text-base leading-relaxed text-lab-text-secondary">
            {description}
          </p>
        ) : null}
        <p className="mt-2.5 font-lab-mono text-xs tracking-wide text-lab-text-muted">
          {source.authors}
        </p>
      </div>

      {/* Hung provenance annotation — the source venue in the outer margin. */}
      <aside className="hidden font-lab-body text-xs italic leading-relaxed text-lab-text-muted md:block">
        {source.venue}
      </aside>
    </Link>
  );
}

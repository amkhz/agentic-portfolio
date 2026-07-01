/**
 * RegisterShelf — the Accession Register (T3, ADR-016 "The Reading Room"), the
 * chosen shelf layout. A researcher's logged holdings: a per-guide accent margin
 * rule (the bound edge — present at rest so the guide's domain color reads), a
 * mono provenance gutter (call-number · year · status) against a hairline, a wide
 * entry field (kicker, full Podkova title, Newsreader dek, full mono authorship),
 * and the source venue hung in the outer margin. Titles read horizontally and
 * never truncate.
 *
 * Interaction: on hover the accent margin rule brightens and gains a soft glow
 * (a restrained affordance/atmosphere glow — not the banned neon lush-border),
 * the row warms with a faint accent wash, and the title steps up in weight and
 * ink. RegisterUpcomingShelf renders pipeline guides in the same ledger grammar,
 * muted and non-interactive.
 *
 * The call-number and folio are derived from real data (territory + position),
 * not invented. Per-guide accent publication lives in guideShelfCommon.
 */
import { Link } from "react-router";
import type { Guide, GuideStatus } from "@core/lab/guide-types";
import type { UpcomingGuide, UpcomingStatus } from "@core/lab/upcoming";
import { STATUS_LABEL, useGuideAccentStyle } from "./guideShelfCommon";

const STATUS_DOT: Record<GuideStatus, string> = {
  complete: "text-guide-accent",
  "in-progress": "text-lab-text-secondary",
  draft: "text-lab-text-muted",
};

const UPCOMING_LABEL: Record<UpcomingStatus, string> = {
  drafting: "Drafting",
  planned: "Planned",
  researching: "Researching",
};

export function RegisterShelf({ guides }: { guides: Guide[] }) {
  return (
    <ul className="mt-8 divide-y divide-lab-border-subtle border-t border-lab-border-subtle">
      {guides.map((guide, i) => (
        <li key={guide.slug}>
          <RegisterEntry guide={guide} index={i + 1} />
        </li>
      ))}
    </ul>
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
      className="lab-guide-spine group grid grid-cols-1 gap-x-6 gap-y-2 rounded-sm px-4 py-6 transition-colors duration-[var(--duration-normal)] hover:bg-[color-mix(in_oklab,var(--guide-accent)_5%,transparent)] md:grid-cols-[7rem_minmax(0,1fr)_9rem] md:px-5"
    >
      {/* Provenance gutter: call-number in the guide accent, with a short accent
          tab rule beneath it. The tab carries the guide's domain color at rest —
          a horizontal catalog mark, not an always-on vertical border — and
          extends with a soft glow on hover as the affordance cue. */}
      <div className="flex flex-col items-start gap-1.5 border-lab-border-subtle md:items-end md:border-r md:pr-6 md:text-right">
        <span className="font-lab-mono text-xs uppercase tracking-wider text-guide-accent">
          {callNumber}
        </span>
        <span
          aria-hidden
          className="h-[2px] w-8 rounded-full bg-guide-accent opacity-70 transition-all duration-[var(--duration-normal)] group-hover:w-11 group-hover:opacity-100 group-hover:shadow-[0_0_8px_color-mix(in_oklab,var(--guide-accent)_50%,transparent)]"
        />
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

/**
 * RegisterUpcomingShelf — pipeline guides in the same ledger grammar, muted and
 * non-interactive (these are hints at what's coming, not links). The call-number
 * slot reads as an un-accessioned dash, the accent margin rule is a quiet dashed
 * neutral (no domain color yet), and the whole row sits back a step in tone.
 */
export function RegisterUpcomingShelf({ guides }: { guides: UpcomingGuide[] }) {
  return (
    <ul className="mt-6 divide-y divide-lab-border-subtle border-t border-lab-border-subtle">
      {guides.map((guide) => (
        <li key={guide.id}>
          <UpcomingEntry guide={guide} />
        </li>
      ))}
    </ul>
  );
}

function UpcomingEntry({ guide }: { guide: UpcomingGuide }) {
  const { title, source, status, note } = guide;

  return (
    <div
      aria-disabled="true"
      tabIndex={-1}
      className="grid grid-cols-1 gap-x-6 gap-y-2 px-4 py-6 opacity-75 md:grid-cols-[7rem_minmax(0,1fr)_9rem] md:px-5"
    >
      {/* Un-accessioned: the call-number slot is a dash and the tab is a quiet
          neutral placeholder — no domain color yet. */}
      <div className="flex flex-col items-start gap-1.5 border-lab-border-subtle md:items-end md:border-r md:pr-6 md:text-right">
        <span className="font-lab-mono text-xs uppercase tracking-wider text-lab-text-muted">
          —
        </span>
        <span
          aria-hidden
          className="h-[2px] w-8 rounded-full bg-lab-border-strong opacity-70"
        />
        <span className="flex items-center gap-1.5 font-lab-mono text-[0.6rem] uppercase tracking-wider text-lab-text-muted md:justify-end">
          <span aria-hidden>○</span>
          {UPCOMING_LABEL[status]}
        </span>
      </div>

      <div className="min-w-0">
        <span className="block font-lab-mono text-[0.6rem] uppercase tracking-wider text-lab-text-muted">
          In the pipeline
        </span>
        <h3 className="mt-1.5 font-lab-heading text-xl font-semibold leading-snug tracking-tight text-lab-text-secondary md:text-2xl">
          {title}
        </h3>
        {note ? (
          <p className="mt-2 max-w-2xl font-lab-body text-base italic leading-relaxed text-lab-text-muted">
            {note}
          </p>
        ) : null}
        <p className="mt-2.5 font-lab-mono text-xs tracking-wide text-lab-text-muted">
          {source}
        </p>
      </div>
    </div>
  );
}

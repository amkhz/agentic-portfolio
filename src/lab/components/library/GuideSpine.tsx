/**
 * GuideSpine — shelf layout B, "the Ledger Stack" (ADR-016 "The Reading Room",
 * T3). Each guide is a flat horizontal spine bar, bars stacked tight within a
 * territory like a pile of read-once books on a ledge: an accent left-cap (the
 * painted board-edge of the binding), a horizontal title, and meta + status at
 * the tail. Titles read left-to-right — never rotated (the standing-spine form
 * with vertical titles was rejected live). Bar thickness varies subtly by title
 * length so the stack has physical rhythm. Hover slides the bar out of the
 * stack toward the reader.
 *
 * The material surface is a placeholder (accent-tinted layered gradient). The
 * `--spine-material` background is where Wallace spine textures (T5) drop in
 * later, once the layout validates live. Per-guide accent publication and the
 * shared status pill live in guideShelfCommon — see the accent-contract note
 * there.
 */
import { Link } from "react-router";
import type { Guide } from "@core/lab/guide-types";
import { STATUS_LABEL, useGuideAccentStyle } from "./guideShelfCommon";
import { StatusPill } from "./StatusPill";

interface GuideSpineProps {
  guide: Guide;
}

// Three-step thickness derived from title length so longer guides read as
// heavier volumes. Deterministic (no reorder) — the stack rhythm comes from the
// content, not from shuffling guide order.
function thicknessClass(title: string): string {
  if (title.length > 38) return "py-5 md:py-6";
  if (title.length > 24) return "py-4 md:py-5";
  return "py-3.5 md:py-4";
}

export function GuideSpine({ guide }: GuideSpineProps) {
  const { title, kicker, source, status } = guide.frontmatter;
  const accentStyle = useGuideAccentStyle(guide);

  return (
    <Link
      to={`/g/${guide.slug}`}
      style={accentStyle}
      aria-label={`${title} — ${STATUS_LABEL[status]}`}
      className={[
        "lab-guide-spine group relative isolate flex w-full items-stretch gap-4 overflow-hidden rounded-[3px] pr-4",
        // Placeholder material: accent-tinted layered gradient with a soft light
        // seam at the top edge so the bar reads as a lit material surface, not a
        // flat panel. Wallace texture replaces --spine-material at T5.
        "[background:var(--spine-material,linear-gradient(105deg,color-mix(in_oklab,var(--guide-accent)_12%,var(--lab-bg-surface))_0%,var(--lab-bg-surface)_60%))]",
        "shadow-[inset_0_1px_0_color-mix(in_oklab,var(--lab-text-primary)_8%,transparent)]",
        "ring-1 ring-inset ring-lab-border-subtle",
        "transition duration-[var(--duration-normal)] hover:ring-guide-accent",
        // Slide out of the stack toward the reader on hover (the book being
        // pulled). Motion polish (spring) lands in T6.
        "motion-safe:transition-transform motion-safe:hover:translate-x-1",
      ].join(" ")}
    >
      {/* Accent left-cap — the painted board-edge of the binding. */}
      <span
        aria-hidden
        className={[
          "w-[5px] shrink-0 self-stretch bg-guide-accent",
          "shadow-[0_0_12px_color-mix(in_oklab,var(--guide-accent)_50%,transparent)]",
          "transition-[box-shadow,width] duration-[var(--duration-normal)]",
          "group-hover:w-[7px] group-hover:shadow-[0_0_20px_color-mix(in_oklab,var(--guide-accent)_80%,transparent)]",
        ].join(" ")}
      />

      <div
        className={[
          "flex min-w-0 flex-1 items-center gap-4",
          thicknessClass(title),
        ].join(" ")}
      >
        <div className="min-w-0 flex-1">
          <span className="block font-lab-mono text-[0.6rem] uppercase tracking-wider text-lab-text-muted">
            {kicker}
          </span>
          <h3 className="mt-1 truncate font-lab-heading text-lg font-semibold leading-snug tracking-tight text-lab-text-primary transition-colors duration-[var(--duration-normal)] group-hover:text-guide-accent md:text-xl">
            {title}
          </h3>
        </div>

        <span className="hidden shrink-0 truncate font-lab-mono text-xs tracking-wide text-lab-text-muted sm:block">
          {source.authors} · {source.year}
        </span>
        <StatusPill status={status} />
      </div>
    </Link>
  );
}

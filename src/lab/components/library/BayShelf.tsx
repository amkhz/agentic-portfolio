/**
 * BayShelf — shelf layout "bay", The Lit Bay (T3, ADR-016 "The Reading Room").
 * Each territory is a shelving bay washed by a single warm reading-lamp gradient
 * (surface → graphite, edge to edge, no border) over the lab grain; volumes rest
 * on a 1px ledge hairline with a soft contact-shadow, so depth is carried by
 * light and one line, not a 3D render. Each volume shows a flat per-guide accent
 * spine (pigment, not a lit edge), a full Podkova title, a Newsreader dek, full
 * mono authorship, and a mono status. On hover the volume eases off the ledge
 * and its inner tone warms from within (contained by its own bounds — never an
 * outward halo) while the title steps up in weight and ink.
 *
 * The atmosphere is neutral-warm, not accent-tinted: doctrine reserves accent
 * for interaction and green/material for atmosphere. Per-guide accent publication
 * lives in guideShelfCommon (see the note there).
 */
import { Link } from "react-router";
import type { Guide, GuideStatus } from "@core/lab/guide-types";
import { STATUS_LABEL, useGuideAccentStyle } from "./guideShelfCommon";

const STATUS_INK: Record<GuideStatus, string> = {
  complete: "border-guide-accent/50 text-guide-accent",
  "in-progress": "border-lab-border-strong text-lab-text-secondary",
  draft: "border-lab-border-subtle text-lab-text-muted",
};

export function BayShelf({ guides }: { guides: Guide[] }) {
  return (
    <div className="relative mt-8 overflow-hidden rounded-md [background:radial-gradient(130%_120%_at_12%_-10%,var(--lab-bg-raised)_0%,var(--lab-bg-deep)_72%)] p-5 md:p-8">
      {/* Grain — the lab texture, so the wash never reads as a flat panel. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60 [background-image:var(--lab-texture)]"
      />
      {/* Volumes resting on the ledge (the bottom hairline). */}
      <ul className="relative grid grid-cols-1 gap-5 border-b border-[color-mix(in_oklab,var(--lab-text-primary)_12%,transparent)] pb-8 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <li key={guide.slug}>
            <BayVolume guide={guide} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function BayVolume({ guide }: { guide: Guide }) {
  const { title, kicker, source, status, description } = guide.frontmatter;
  const accentStyle = useGuideAccentStyle(guide);

  return (
    <Link
      to={`/g/${guide.slug}`}
      style={accentStyle}
      aria-label={`${title} — ${STATUS_LABEL[status]}`}
      className={[
        "lab-guide-spine group relative flex h-full flex-col overflow-hidden rounded-[3px] border border-lab-border-subtle/70 py-5 pr-5 pl-6",
        // Inner page-block tone (receding), warms one step on hover — the lamp
        // turning toward the volume, contained inside its own bounds.
        "[background:linear-gradient(165deg,color-mix(in_oklab,var(--lab-text-primary)_5%,var(--lab-bg-surface))_0%,var(--lab-bg-surface)_65%)]",
        "shadow-[0_12px_22px_-16px_color-mix(in_oklab,var(--lab-bg-deep)_90%,transparent)]",
        "transition duration-[var(--duration-normal)] hover:[background:linear-gradient(165deg,color-mix(in_oklab,var(--lab-text-primary)_9%,var(--lab-bg-raised))_0%,var(--lab-bg-surface)_60%)]",
        "motion-safe:transition-transform motion-safe:hover:-translate-y-1",
      ].join(" ")}
    >
      {/* Flat accent spine — the binding pigment, not a lit edge. */}
      <span
        aria-hidden
        className="absolute left-0 top-0 h-full w-[4px] bg-guide-accent"
      />

      <span className="font-lab-mono text-[0.6rem] uppercase tracking-wider text-lab-text-muted">
        {kicker}
      </span>
      <h3 className="mt-2 font-lab-heading text-lg font-semibold leading-snug tracking-tight text-lab-text-primary transition-colors duration-[var(--duration-normal)] group-hover:font-bold group-hover:text-guide-accent md:text-xl">
        {title}
      </h3>
      {description ? (
        <p className="mt-2 line-clamp-2 font-lab-body text-sm leading-relaxed text-lab-text-secondary">
          {description}
        </p>
      ) : null}

      <div className="mt-auto flex items-center justify-between gap-3 pt-4">
        <span className="min-w-0 truncate font-lab-mono text-xs tracking-wide text-lab-text-muted">
          {source.authors} · {source.year}
        </span>
        <span
          className={`shrink-0 rounded-sm border px-2 py-0.5 font-lab-mono text-[0.55rem] uppercase tracking-wider ${STATUS_INK[status]}`}
        >
          {STATUS_LABEL[status]}
        </span>
      </div>
    </Link>
  );
}

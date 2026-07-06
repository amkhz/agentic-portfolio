/**
 * WorksShelf — the Perihelion Works section on the lab home (ADR-017 D1
 * home linking; shape brief vector/briefs/works-shelf-shape-2026-07-05.md).
 * One instrument resting on the library's shelf of books: kin to the
 * Accession Register (hairline shelf rules, mono registration line,
 * horizontal never-truncated title) but a different grammar (a drawn mark
 * plus a title block instead of a ledger row), so it reads as the applied
 * arm, not a fifth territory.
 *
 * The entry's accent rides the existing --guide-accent cascade untouched;
 * with no published per-guide pair the cascade falls back to the house
 * brass, which is the right voice for the arm (amber-means-touchable is
 * the deck's own grammar). Deck tokens never appear here (ADR-017 D2).
 *
 * WorksNotice is the section's introduction near the masthead (Justin,
 * 2026-07-05: the end-of-shelf placement stands, but visitors should not
 * have to scroll blind to discover the arm): one sentence and a jump link
 * that zips to the section, in the guide-anchor idiom (smooth scroll,
 * reduced-motion honored, focus handed to the section).
 */
import type { MouseEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router";
import { springSoft } from "@/components/effects/motionConfig";
import type { WorkEntry, WorkStatus } from "@core/works/works";
import { worksArmLine } from "@core/works/works";
import { workSigils } from "@/works/sigils";
import { SITE_TAB } from "@/lib/tabOrder";

const WORK_STATUS_LABEL: Record<WorkStatus, string> = {
  "in-progress": "In progress",
  live: "Live",
};

const WORKS_SECTION_ID = "works";

export function WorksNotice({ works }: { works: WorkEntry[] }) {
  const shouldReduce = useReducedMotion();
  if (works.length === 0) return null;
  const work = works[0];
  const Sigil = workSigils[work.slug];

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const target = document.getElementById(WORKS_SECTION_ID);
    target?.scrollIntoView({
      behavior: shouldReduce ? "auto" : "smooth",
      block: "start",
    });
    target?.focus({ preventScroll: true });
    window.history.replaceState(null, "", `#${WORKS_SECTION_ID}`);
  };

  return (
    <a
      tabIndex={SITE_TAB}
      href={`#${WORKS_SECTION_ID}`}
      onClick={handleClick}
      className="group mt-12 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-sm border-y border-lab-border-subtle px-1 py-4 transition-colors duration-[var(--duration-normal)] [--sigil-accent:var(--guide-accent)] [--sigil-halo:0.45] hover:bg-[color-mix(in_oklab,var(--guide-accent)_5%,transparent)] hover:[--sigil-halo:0.9] focus-visible:[--sigil-halo:0.9]"
    >
      {Sigil ? (
        <Sigil className="h-8 w-8 shrink-0 text-lab-text-secondary" />
      ) : null}
      <p className="min-w-0 flex-1 font-lab-body text-base leading-relaxed text-lab-text-secondary">
        Enter <span className="text-lab-text-primary">Perihelion Works</span>:
        the applied arm, opening with {work.title}.
      </p>
      <span className="shrink-0 font-lab-mono text-xs uppercase tracking-wider text-guide-accent">
        Skip to the bench <span aria-hidden>↓</span>
      </span>
    </a>
  );
}

export function WorksShelf({ works }: { works: WorkEntry[] }) {
  const shouldReduce = useReducedMotion();

  const sectionMotion = shouldReduce
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: springSoft,
      };

  return (
    <motion.section
      id={WORKS_SECTION_ID}
      tabIndex={-1}
      aria-labelledby="works-heading"
      className="mt-20 scroll-mt-10 outline-none md:mt-28"
      {...sectionMotion}
    >
      <header className="flex flex-col gap-3 border-b border-lab-border-subtle pb-6">
        <span className="font-lab-mono text-xs uppercase tracking-wider text-guide-accent">
          The applied arm
        </span>
        <h2
          id="works-heading"
          className="font-lab-heading text-2xl font-semibold tracking-tight text-lab-text-primary md:text-3xl"
        >
          Perihelion Works
        </h2>
        {/* The arm's own line (ADR-017 D7), doubling as the section premise. */}
        <p className="max-w-3xl font-lab-body text-base italic leading-relaxed text-lab-text-secondary md:text-lg">
          {worksArmLine}
        </p>
      </header>

      <ul className="mt-8 divide-y divide-lab-border-subtle border-y border-lab-border-subtle">
        {works.map((work, i) => (
          <li key={work.slug}>
            <WorkBenchEntry work={work} index={i + 1} />
          </li>
        ))}
      </ul>
    </motion.section>
  );
}

function WorkBenchEntry({ work, index }: { work: WorkEntry; index: number }) {
  const Sigil = workSigils[work.slug];
  const registration = `W · ${String(index).padStart(2, "0")} · ${work.year}`;
  const guideCount = work.sourceGuides.length;
  const meta = `Built from ${guideCount} Archive ${guideCount === 1 ? "guide" : "guides"}`;

  return (
    <Link
      tabIndex={SITE_TAB}
      to={`/w/${work.slug}`}
      aria-label={`${work.title} — ${WORK_STATUS_LABEL[work.status]}`}
      className="group grid grid-cols-1 gap-x-6 gap-y-4 rounded-sm px-4 py-8 transition-colors duration-[var(--duration-normal)] [--sigil-accent:var(--guide-accent)] [--sigil-halo:0.45] hover:bg-[color-mix(in_oklab,var(--guide-accent)_5%,transparent)] hover:[--sigil-halo:0.9] focus-visible:[--sigil-halo:0.9] md:grid-cols-[7rem_minmax(0,1fr)] md:px-5 md:py-10"
    >
      {/* The instrument mark, seated in the register's gutter column */}
      <div className="flex items-start text-lab-text-secondary md:justify-end md:border-r md:border-lab-border-subtle md:pr-6">
        {Sigil ? <Sigil className="h-16 w-16 md:h-20 md:w-20" /> : null}
      </div>

      {/* Title block: registration, title, thesis, provenance */}
      <div className="min-w-0">
        <span className="block font-lab-mono text-[0.6rem] uppercase tracking-wider text-guide-accent">
          {registration}
        </span>
        <h3 className="mt-1.5 font-lab-heading text-2xl font-semibold leading-snug tracking-tight text-lab-text-primary transition-colors duration-[var(--duration-normal)] group-hover:text-guide-accent md:text-3xl">
          {work.title}
        </h3>
        <p className="mt-2 max-w-2xl font-lab-body text-lg italic leading-relaxed text-lab-text-secondary">
          {work.thesisLine}
        </p>
        <p className="mt-3 flex items-center gap-1.5 font-lab-mono text-xs tracking-wide text-lab-text-muted">
          <span
            aria-hidden
            className={
              work.status === "live"
                ? "text-guide-accent"
                : "text-lab-text-secondary"
            }
          >
            ●
          </span>
          {meta}
          <span aria-hidden className="text-lab-border-strong">
            ·
          </span>
          {WORK_STATUS_LABEL[work.status]}
        </p>
      </div>
    </Link>
  );
}

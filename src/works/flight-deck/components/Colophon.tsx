import { Link } from "react-router";
import { guides } from "@core/lab/guides";
import { deckCopy } from "@core/works/flight-deck/copy";
import { getWork, worksArmLine } from "@core/works/works";
import { DECK_TAB } from "./deckTab";

interface ColophonProps {
  onReturn: () => void;
}

/**
 * The quiet surface reached by deliberate exit (ADR-017 D1): title,
 * thesis, source-guide links back to the Archive, exit, and the arm's
 * own line at the end (D7, mirroring where the Archive's line lives in
 * the lab footer). Copy final as of the 2026-07-05 Writer + Gaff pass.
 */
export function Colophon({ onReturn }: ColophonProps) {
  const work = getWork("flight-deck");
  const sources = (work?.sourceGuides ?? []).map((slug) => ({
    slug,
    title: guides.find((guide) => guide.slug === slug)?.frontmatter.title ?? slug,
  }));

  return (
    <main className="mx-auto max-w-2xl px-6 py-24">
      <p className="text-xs uppercase tracking-[0.3em] text-[var(--deck-ink-label)]">
        {deckCopy.colophon.kicker}
      </p>
      <h1 className="mt-4 font-[family-name:var(--deck-font-display)] text-4xl text-[var(--deck-ink)]">
        {deckCopy.colophon.title}
      </h1>
      <p className="mt-6 font-[family-name:var(--deck-font-body)] text-lg leading-relaxed text-[var(--deck-ink-dim)]">
        {deckCopy.colophon.thesis}
      </p>

      <h2 className="mt-14 text-xs uppercase tracking-[0.2em] text-[var(--deck-ink-dim)]">
        {deckCopy.colophon.sourcesHeading}
      </h2>
      <ul className="mt-4 space-y-2">
        {sources.map((source) => (
          <li key={source.slug}>
            <Link
              to={`/g/${source.slug}`}
              tabIndex={DECK_TAB}
              className="font-[family-name:var(--deck-font-body)] text-base text-[var(--deck-caution)] hover:text-[var(--deck-ink)]"
            >
              {source.title}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-16 flex gap-8">
        <button
          type="button"
          tabIndex={DECK_TAB}
          onClick={onReturn}
          className="text-sm uppercase tracking-[0.2em] text-[var(--deck-ink-dim)] hover:text-[var(--deck-ink)]"
        >
          {deckCopy.colophon.exitToDeck}
        </button>
        <Link
          to="/"
          tabIndex={DECK_TAB}
          className="text-sm uppercase tracking-[0.2em] text-[var(--deck-ink-dim)] hover:text-[var(--deck-ink)]"
        >
          {deckCopy.colophon.exitToArchive}
        </Link>
      </div>

      <p className="mt-14 font-[family-name:var(--deck-font-body)] text-sm italic leading-relaxed text-[var(--deck-ink-label)]">
        {worksArmLine}
      </p>
    </main>
  );
}

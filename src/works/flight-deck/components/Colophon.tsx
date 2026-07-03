import { Link } from "react-router";
import { guides } from "@core/lab/guides";
import { deckCopy } from "@core/works/flight-deck/copy";
import { getWork } from "@core/works/works";

interface ColophonProps {
  onReturn: () => void;
}

/**
 * The quiet surface reached by deliberate exit (ADR-017 D1): title,
 * thesis, source-guide links back to the Archive, exit. Copy here is
 * scaffold grade; the shipping pass is Writer + Gaff, Joi-gated.
 */
export function Colophon({ onReturn }: ColophonProps) {
  const work = getWork("flight-deck");
  const sources = (work?.sourceGuides ?? []).map((slug) => ({
    slug,
    title: guides.find((guide) => guide.slug === slug)?.frontmatter.title ?? slug,
  }));

  return (
    <main className="mx-auto max-w-2xl px-6 py-24">
      <p className="text-xs uppercase tracking-[0.3em] text-[var(--deck-ink-faint)]">
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
          onClick={onReturn}
          className="text-sm uppercase tracking-[0.2em] text-[var(--deck-ink-dim)] hover:text-[var(--deck-ink)]"
        >
          {deckCopy.colophon.exitToDeck}
        </button>
        <Link
          to="/"
          className="text-sm uppercase tracking-[0.2em] text-[var(--deck-ink-dim)] hover:text-[var(--deck-ink)]"
        >
          {deckCopy.colophon.exitToArchive}
        </Link>
      </div>
    </main>
  );
}

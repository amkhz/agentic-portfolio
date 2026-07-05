import { Link } from "react-router";
import { deckCopy } from "@core/works/flight-deck/copy";
import { getWork } from "@core/works/works";
import { FlightDeckSigil } from "../../sigils/FlightDeckSigil";

/**
 * The considered decline (ADR-017 D1): a designed card, never a broken
 * squeeze. The sigil mark landed with the Shelf work (its emission speaks
 * the deck's caution amber here). Capture slot ships in a later phase once
 * its format (still vs short clip) is decided.
 */
export function DeclineCard() {
  const work = getWork("flight-deck");
  return (
    <main className="grid min-h-dvh place-items-center px-6 py-16">
      <div className="max-w-md">
        <FlightDeckSigil className="h-16 w-16 text-[var(--deck-ink-dim)] [--sigil-accent:var(--deck-caution)] [--sigil-halo:0.55]" />
        <p className="mt-8 text-xs uppercase tracking-[0.3em] text-[var(--deck-ink-label)]">
          {deckCopy.colophon.kicker}
        </p>
        <h1 className="mt-4 font-[family-name:var(--deck-font-display)] text-3xl text-[var(--deck-ink)]">
          {work?.title}
        </h1>
        <p className="mt-2 font-[family-name:var(--deck-font-body)] text-lg italic text-[var(--deck-ink-dim)]">
          {work?.thesisLine}
        </p>
        <h2 className="mt-10 text-base text-[var(--deck-ink)]">
          {deckCopy.decline.heading}
        </h2>
        <p className="mt-3 font-[family-name:var(--deck-font-body)] text-base leading-relaxed text-[var(--deck-ink-dim)]">
          {deckCopy.decline.body}
        </p>
        <Link
          to="/"
          className="mt-10 inline-block text-sm uppercase tracking-[0.2em] text-[var(--deck-caution)] hover:text-[var(--deck-ink)]"
        >
          {deckCopy.colophon.exitToArchive}
        </Link>
      </div>
    </main>
  );
}

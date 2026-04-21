import { useMemo } from "react";

interface GuideGlossaryViewProps {
  glossary: Record<string, string>;
}

function groupLetter(term: string): string {
  const match = term.match(/[a-zA-Z]/);
  return match ? match[0].toUpperCase() : "#";
}

function scrollToTop() {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
}

export function GuideGlossaryView({ glossary }: GuideGlossaryViewProps) {
  const groups = useMemo(() => {
    const entries = Object.entries(glossary).sort(([a], [b]) =>
      a.localeCompare(b, undefined, { sensitivity: "base" }),
    );
    const map = new Map<string, Array<[string, string]>>();
    for (const entry of entries) {
      const letter = groupLetter(entry[0]);
      const bucket = map.get(letter);
      if (bucket) bucket.push(entry);
      else map.set(letter, [entry]);
    }
    return Array.from(map.entries());
  }, [glossary]);

  if (groups.length === 0) {
    return (
      <p className="mt-12 font-lab-mono text-xs tracking-wide text-lab-text-muted">
        This guide has no glossary terms.
      </p>
    );
  }

  return (
    <section
      aria-labelledby="glossary-heading"
      className="mt-10"
    >
      <h2 id="glossary-heading" className="sr-only">
        Glossary
      </h2>
      <nav
        aria-label="Glossary letters"
        className="lab-sticky-nav lab-hscroll sticky top-0 z-10 -mx-6 border-b border-lab-border-subtle bg-lab-bg-deep/90 px-6 py-3 backdrop-blur md:-mx-10 md:px-10"
      >
        <ul className="flex min-w-max gap-2">
          {groups.map(([letter]) => (
            <li key={letter}>
              <a
                href={`#glossary-${letter}`}
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-lab-border-subtle bg-lab-bg-surface font-lab-mono text-sm tracking-wide text-lab-text-secondary hover:border-guide-accent hover:text-guide-accent"
              >
                {letter}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-10 space-y-14">
        {groups.map(([letter, items]) => (
          <section
            key={letter}
            id={`glossary-${letter}`}
            aria-labelledby={`glossary-${letter}-heading`}
            className="scroll-mt-28"
          >
            <h3
              id={`glossary-${letter}-heading`}
              className="font-lab-heading text-xl font-semibold tracking-tight text-guide-accent"
            >
              {letter}
            </h3>
            <dl className="mt-5 space-y-6">
              {items.map(([term, definition]) => (
                <div
                  key={term}
                  className="border-l-2 border-lab-border-subtle pl-5"
                >
                  <dt className="font-lab-mono text-xs uppercase tracking-wider text-guide-accent">
                    {term}
                  </dt>
                  <dd className="mt-2 font-lab-body text-base leading-relaxed text-lab-text-secondary md:text-lg">
                    {definition}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>

      <div className="mt-16 flex justify-center">
        <button
          type="button"
          onClick={scrollToTop}
          className="font-lab-mono text-xs uppercase tracking-wider text-lab-text-muted hover:text-guide-accent"
        >
          ↑ Back to top
        </button>
      </div>
    </section>
  );
}

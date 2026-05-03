interface FieldNote {
  numeral: "01" | "02" | "03";
  kicker: string;
  headline: string;
  body: string;
}

const NOTES: FieldNote[] = [
  {
    numeral: "01",
    kicker: "What this is",
    headline: "A designer's preparation for work that's almost here.",
    body: "Work like this will need to be designed for all of us. We show up ready to design the future we want.",
  },
  {
    numeral: "02",
    kicker: "How the guides work",
    headline: "Primary sources, walked. Not summarized.",
    body: "Each guide takes a paper or a brief and walks the reasoning end to end. Citations stay close to the claim. Definitions live in context. Follow a footnote, check the work.",
  },
  {
    numeral: "03",
    kicker: "How to read along",
    headline: "No prerequisites. Pick what pulls you in.",
    body: "The territories aren't sequential. Follow your curiosity, leave when you've had enough. Applied research to come.",
  },
];

export function LibraryWelcome() {
  return (
    <section
      aria-labelledby="library-welcome-heading"
      className="mt-16 md:mt-24"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
        <h2
          id="library-welcome-heading"
          className="font-lab-mono text-xs uppercase tracking-wider text-lab-text-muted"
        >
          Field Notes
        </h2>
        <span
          aria-hidden
          className="hidden h-px flex-1 bg-lab-border-subtle md:block"
        />
        <p className="font-lab-mono text-xs tracking-wide text-lab-text-muted">
          Design Resources for the Frontier
        </p>
      </div>

      <ul className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        {NOTES.map((note) => (
          <li
            key={note.numeral}
            className="flex flex-col gap-4 border-t border-lab-border-subtle bg-lab-bg-surface p-7"
          >
            <div className="flex items-baseline gap-3">
              <span className="font-lab-mono text-xs tracking-wider text-guide-accent">
                {note.numeral}
              </span>
              <span className="font-lab-mono text-[0.65rem] uppercase tracking-[0.18em] text-lab-text-muted">
                {note.kicker}
              </span>
            </div>
            <h3 className="font-lab-heading text-lg font-semibold leading-snug tracking-tight text-lab-text-primary md:text-xl">
              {note.headline}
            </h3>
            <p className="font-lab-body text-base leading-relaxed text-lab-text-secondary">
              {note.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

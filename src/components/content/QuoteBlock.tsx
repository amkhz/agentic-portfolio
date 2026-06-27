interface QuoteBlockProps {
  text: string;
  attribution: string;
  role?: string;
}

export function QuoteBlock({ text, attribution, role }: QuoteBlockProps) {
  return (
    <blockquote className="relative my-6 pl-10">
      {/* Oversized hanging quotation mark replaces the struck brass side-stripe
          (side-stripe slop ban, 2026-06-10). Hedvig has no true italic, so the
          mark + display serif at scale carry the pull-quote, not faux-oblique. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1 select-none font-display text-5xl leading-none text-accent-primary"
      >
        &ldquo;
      </span>
      <p className="font-display text-xl leading-mid text-text-primary sm:text-2xl">
        {text}
      </p>
      <footer className="mt-4">
        <span className="font-heading text-sm text-text-secondary">
          {attribution}
        </span>
        {role && (
          <span className="font-heading text-sm text-text-muted">
            {" "}
            - {role}
          </span>
        )}
      </footer>
    </blockquote>
  );
}

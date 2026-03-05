interface QuoteBlockProps {
  text: string;
  attribution: string;
  role?: string;
}

export function QuoteBlock({ text, attribution, role }: QuoteBlockProps) {
  return (
    <blockquote className="border-l-4 border-accent-primary py-2 pl-6">
      <p className="font-display text-xl italic leading-snug text-text-primary">
        &ldquo;{text}&rdquo;
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

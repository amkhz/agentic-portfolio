import React from "react";
import { parseInline } from "./TextBlock";

interface CalloutBlockProps {
  label?: string;
  body: string;
}

export function CalloutBlock({ label, body }: CalloutBlockProps) {
  const paragraphs = body.split("\n\n");

  return (
    <aside className="rounded-r-lg border-l-4 border-accent-secondary bg-bg-elevated px-6 py-5">
      {label && (
        <span className="mb-3 block font-heading text-xs font-medium uppercase tracking-wide text-accent-secondary">
          {label}
        </span>
      )}
      {paragraphs.map((paragraph, i) => (
        <p
          key={i}
          className="mb-3 font-body text-sm leading-relaxed text-text-secondary last:mb-0"
        >
          {parseInline(paragraph)}
        </p>
      ))}
    </aside>
  );
}

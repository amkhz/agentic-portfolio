import React from "react";
import { parseInline } from "@/lib/parseInline";

interface CalloutBlockProps {
  label?: string;
  body: string;
}

export function CalloutBlock({ label, body }: CalloutBlockProps) {
  const paragraphs = body.split("\n\n");

  return (
    <aside className="my-4 rounded-lg border border-border-subtle bg-bg-elevated px-6 py-5">
      {label && (
        <span className="mb-3 block font-mono text-xs font-medium uppercase tracking-wide text-accent-primary">
          {label}
        </span>
      )}
      {paragraphs.map((paragraph, i) => (
        <p
          key={i}
          className="mb-3 font-body text-base leading-normal text-text-secondary last:mb-0"
        >
          {parseInline(paragraph)}
        </p>
      ))}
    </aside>
  );
}

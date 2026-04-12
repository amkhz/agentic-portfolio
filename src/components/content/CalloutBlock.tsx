import React from "react";
import { parseInline } from "@/lib/parseInline";

interface CalloutBlockProps {
  label?: string;
  body: string;
}

export function CalloutBlock({ label, body }: CalloutBlockProps) {
  const paragraphs = body.split("\n\n");

  return (
    <aside className="my-2 rounded-r-lg border-l-[6px] border-secondary-primary bg-bg-elevated px-6 py-5">
      {label && (
        <span className="mb-3 block font-heading text-xs font-medium uppercase tracking-wide text-secondary-primary">
          {label}
        </span>
      )}
      {paragraphs.map((paragraph, i) => (
        <p
          key={i}
          className="mb-3 font-body text-base leading-relaxed text-text-secondary last:mb-0"
        >
          {parseInline(paragraph)}
        </p>
      ))}
    </aside>
  );
}

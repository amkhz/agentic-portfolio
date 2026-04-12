import React from "react";

interface TextBlockProps {
  children: string;
}

export function parseInline(text: string): React.ReactNode[] {
  const tokenPattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(tokenPattern);

  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-text-primary">
          {part.slice(2, -2)}
        </strong>
      );
    }

    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a
          key={i}
          href={linkMatch[2]}
          className="text-accent-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
        >
          {linkMatch[1]}
        </a>
      );
    }

    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

export function TextBlock({ children }: TextBlockProps) {
  const paragraphs = children.split("\n\n");

  return (
    <div className="max-w-[65ch]">
      {paragraphs.map((paragraph, i) => (
        <p
          key={i}
          className="mb-6 font-body text-base leading-normal text-text-secondary last:mb-0 sm:text-lg"
        >
          {parseInline(paragraph)}
        </p>
      ))}
    </div>
  );
}

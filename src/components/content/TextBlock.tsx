import { parseInline } from "@/lib/parseInline";

interface TextBlockProps {
  children: string;
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

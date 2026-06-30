import { parseInline } from "@/lib/parseInline";

interface ListBlockProps {
  ordered: boolean;
  items: string[];
}

/**
 * Ordered or unordered list. Each row is a fixed-width marker slot plus the
 * item body, so multi-line items hang cleanly under their first line instead
 * of wrapping under the marker. Markers are decorative (the <ol>/<ul> carries
 * the semantics), so they're aria-hidden. Brass dot for bullets; a quiet mono
 * numeral for ordered steps.
 */
export function ListBlock({ ordered, items }: ListBlockProps) {
  const ListTag = ordered ? "ol" : "ul";

  return (
    <ListTag className="my-6 max-w-[65ch] list-none space-y-4 pl-0">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex gap-3 font-body text-base leading-normal text-text-primary sm:text-lg"
        >
          {ordered ? (
            <span
              className="shrink-0 select-none pt-0.5 font-mono text-sm tabular-nums text-text-secondary"
              aria-hidden="true"
            >
              {i + 1}.
            </span>
          ) : (
            <span
              className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-primary/70"
              aria-hidden="true"
            />
          )}
          <span>{parseInline(item)}</span>
        </li>
      ))}
    </ListTag>
  );
}

/**
 * DossierTags — case metadata as a mono instrument row rather than rounded
 * pills (ADR-013 / DESIGN.md). Uppercase mono labels separated by hairline
 * ticks; non-interactive. Replaces the chip reflex that reads as AI-default.
 */

interface DossierTagsProps {
  tags: string[];
  className?: string;
}

export function DossierTags({ tags, className }: DossierTagsProps) {
  return (
    <ul className={`flex flex-wrap items-center gap-x-3 gap-y-1.5 ${className ?? ""}`}>
      {tags.map((tag, i) => (
        <li key={tag} className="flex items-center gap-x-3">
          {i > 0 && (
            <span aria-hidden="true" className="h-3 w-px bg-border-strong" />
          )}
          <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
            {tag}
          </span>
        </li>
      ))}
    </ul>
  );
}

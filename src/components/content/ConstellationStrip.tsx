import type { ConstellationNode } from "@core/content/constellation";
import { readingOrder } from "@core/content/constellation";

interface ConstellationStripProps {
  nodes: ConstellationNode[];
  selectedId: string | null;
  onSelectNode: (id: string) => void;
}

/**
 * Mobile reading-state section nav. Sticky below the header. A horizontal dot
 * strip overflowed the viewport with 11 sections, so this is a single "jump to
 * section" select -- it does exactly what the strip did (move between the
 * constellation's sections) without running off the edge of a phone. The
 * spatial field is the lg+ way to navigate; this is its small-screen peer.
 */
export function ConstellationStrip({
  nodes,
  selectedId,
  onSelectNode,
}: ConstellationStripProps) {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  const ordered = readingOrder
    .map((id) => nodeMap.get(id))
    .filter((n): n is ConstellationNode => n != null);

  return (
    <nav
      aria-label="Case study sections"
      className="sticky z-40 border-b border-border-subtle bg-bg-deep/80 backdrop-blur-md lg:hidden"
      style={{ top: "64px" }}
    >
      <div className="flex items-center gap-3 px-4 py-2.5">
        <span
          aria-hidden="true"
          className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-text-muted"
        >
          Section
        </span>

        <div className="relative min-w-0 flex-1">
          <select
            aria-label="Jump to section"
            value={selectedId ?? ""}
            onChange={(e) => onSelectNode(e.target.value)}
            className="min-h-11 w-full appearance-none rounded-md border border-border-strong bg-bg-elevated py-1.5 pl-3 pr-9 font-mono text-xs uppercase tracking-wider text-text-primary transition-colors duration-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
          >
            {ordered.map((node) => (
              <option
                key={node.id}
                value={node.id}
                disabled={node.status === "planned"}
              >
                {node.title}
                {node.status === "planned" ? " — coming soon" : ""}
              </option>
            ))}
          </select>

          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-accent-primary"
          >
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path
                d="M1 1l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </nav>
  );
}

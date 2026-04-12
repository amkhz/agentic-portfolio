import { cn } from "@core/utils";
import type { ConstellationNode } from "@core/content/constellation";
import { readingOrder } from "@core/content/constellation";

interface ConstellationStripProps {
  nodes: ConstellationNode[];
  selectedId: string | null;
  onSelectNode: (id: string) => void;
}

/**
 * Compact horizontal strip of node dots for mobile reading state.
 * Sticky below the header. Shows node titles on hover/active.
 */
export function ConstellationStrip({
  nodes,
  selectedId,
  onSelectNode,
}: ConstellationStripProps) {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));
  const selectedNode = selectedId ? nodeMap.get(selectedId) : null;
  const selectedConnections = selectedNode?.connections ?? [];

  // Order nodes for the strip
  const ordered = readingOrder
    .map((id) => nodeMap.get(id))
    .filter((n): n is ConstellationNode => n != null);

  return (
    <nav
      aria-label="Case study topics"
      className={cn(
        "sticky z-40 border-b border-border-subtle lg:hidden",
        "bg-bg-deep/80 backdrop-blur-md"
      )}
      style={{ top: "64px" }}
    >
      {/* Dot row */}
      <div className="flex items-center justify-center gap-2 px-4 py-2">
        {ordered.map((node) => {
          const isSelected = node.id === selectedId;
          const isConnected = selectedConnections.includes(node.id);
          const isPlanned = node.status === "planned";

          return (
            <button
              key={node.id}
              type="button"
              onClick={!isPlanned ? () => onSelectNode(node.id) : undefined}
              disabled={isPlanned}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-md px-1.5 py-1 transition-[background-color] duration-normal",
                isSelected
                  ? "bg-bg-elevated/60"
                  : "hover:bg-bg-subtle/30",
                isPlanned && "cursor-default"
              )}
              aria-label={`${node.title}${isPlanned ? " (coming soon)" : ""}`}
              aria-current={isSelected ? "true" : undefined}
            >
              <div
                className={cn(
                  "rounded-full transition-[width,height,background-color,border-color,box-shadow] duration-normal",
                  isSelected
                    ? "h-2.5 w-2.5 bg-accent-primary shadow-[0_0_8px_var(--constellation-glow-shipped)]"
                    : isConnected
                      ? "h-2 w-2 bg-accent-primary/60"
                      : isPlanned
                        ? "h-1.5 w-1.5 border border-dashed border-text-muted/30"
                        : "h-2 w-2 border border-[var(--constellation-node-border)]"
                )}
              />
              <span
                className={cn(
                  "max-w-[48px] truncate font-heading text-[9px] font-medium leading-none tracking-wide",
                  isSelected
                    ? "text-accent-primary"
                    : isConnected
                      ? "text-text-muted"
                      : "text-text-muted/50"
                )}
              >
                {node.title.replace("The ", "")}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

import { useCallback, useMemo, useState } from "react";
import type { PositionedNode } from "@core/content/constellation";
import { cn } from "@core/utils";
import { ConstellationNode } from "./ConstellationNode";

interface ConstellationFieldProps {
  nodes: PositionedNode[];
  selectedId: string | null;
  onSelectNode: (id: string) => void;
  /** Compact mode for sidebar. Fills container height, thinner lines, always-visible labels. */
  compact?: boolean;
}

/** SVG connection line between two positioned nodes. */
function ConnectionLine({
  from,
  to,
  isHighlighted,
  compact,
  index,
}: {
  from: PositionedNode;
  to: PositionedNode;
  isHighlighted: boolean;
  compact?: boolean;
  index: number;
}) {
  return (
    <line
      x1={`${from.position.x * 100}%`}
      y1={`${from.position.y * 100}%`}
      x2={`${to.position.x * 100}%`}
      y2={`${to.position.y * 100}%`}
      pathLength={1}
      stroke={
        isHighlighted
          ? "var(--constellation-line-active)"
          : "var(--constellation-line-color)"
      }
      strokeWidth={isHighlighted ? 1.5 : compact ? 0.75 : 1}
      strokeOpacity={isHighlighted ? 0.6 : 0.3}
      strokeDasharray={1}
      className="transition-[stroke,stroke-width,stroke-opacity] duration-normal motion-safe:animate-[drawLine_800ms_ease-out_both]"
      style={{ animationDelay: `${index * 120}ms` }}
    />
  );
}

/**
 * Build unique connection pairs so each line is drawn once.
 * Returns tuples of [nodeA, nodeB] where nodeA.id < nodeB.id.
 */
function buildConnectionPairs(
  nodes: PositionedNode[],
): [PositionedNode, PositionedNode][] {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));
  const seen = new Set<string>();
  const pairs: [PositionedNode, PositionedNode][] = [];

  for (const node of nodes) {
    for (const connId of node.connections) {
      const key = [node.id, connId].sort().join("|");
      if (seen.has(key)) continue;
      seen.add(key);
      const target = nodeMap.get(connId);
      if (target) pairs.push([node, target]);
    }
  }

  return pairs;
}

export function ConstellationField({
  nodes,
  selectedId,
  onSelectNode,
  compact = false,
}: ConstellationFieldProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const connectionPairs = useMemo(() => buildConnectionPairs(nodes), [nodes]);

  const handleHover = useCallback((id: string | null) => {
    setHoveredId(id);
  }, []);

  const activeId = hoveredId ?? selectedId;

  // A connection is highlighted if either end is active
  const isConnectionHighlighted = (a: PositionedNode, b: PositionedNode) =>
    activeId === a.id || activeId === b.id;

  // A node is highlighted if it's active or connected to the active node
  const isNodeHighlighted = (node: PositionedNode) => {
    if (!activeId) return false;
    if (node.id === activeId) return true;
    return node.connections.includes(activeId);
  };

  return (
    <nav aria-label="Case study topics" className={compact ? "h-full" : undefined}>
      {/* Spatial field -- hidden on very small screens when not compact */}
      <div
        className={cn(
          "relative mx-auto w-full",
          compact ? "block h-full" : "hidden min-[375px]:block"
        )}
        style={
          compact
            ? undefined
            : { aspectRatio: "4 / 3", maxHeight: "min(60vh, 500px)" }
        }
      >
        {/* Connection lines */}
        <svg
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          {connectionPairs.map(([a, b], i) => (
            <ConnectionLine
              key={`${a.id}-${b.id}`}
              from={a}
              to={b}
              isHighlighted={isConnectionHighlighted(a, b)}
              compact={compact}
              index={i}
            />
          ))}
        </svg>

        {/* Nodes */}
        {nodes.map((node, i) => (
          <ConstellationNode
            key={node.id}
            node={node}
            isSelected={node.id === selectedId}
            isHighlighted={isNodeHighlighted(node)}
            onSelect={onSelectNode}
            onHover={handleHover}
            compact={compact}
            index={i}
          />
        ))}
      </div>

      {/* List fallback for very small screens (<375px) -- hero mode only */}
      {!compact && (
        <div className="flex flex-col gap-1 min-[375px]:hidden">
          {nodes.map((node) => (
            <button
              key={node.id}
              type="button"
              onClick={node.status !== "planned" ? () => onSelectNode(node.id) : undefined}
              disabled={node.status === "planned"}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-left",
                "transition-colors duration-normal",
                node.id === selectedId
                  ? "bg-bg-elevated"
                  : "hover:bg-bg-subtle/50",
                node.status === "planned" && "cursor-default opacity-50"
              )}
            >
              <div
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border",
                  node.id === selectedId
                    ? "border-[var(--constellation-node-active-border)] bg-[var(--constellation-node-bg)]"
                    : "border-[var(--constellation-node-border)] bg-[var(--constellation-node-bg)]",
                  node.status === "planned" && "border-dashed"
                )}
              >
                <div
                  className={cn(
                    "h-1.5 w-1.5 rounded-full bg-accent-primary",
                    node.id === selectedId ? "opacity-100" : "opacity-60"
                  )}
                />
              </div>
              <div className="min-w-0">
                <span
                  className={cn(
                    "block font-heading text-sm font-medium tracking-wide",
                    node.id === selectedId ? "text-accent-primary" : "text-text-primary"
                  )}
                >
                  {node.title}
                </span>
                <span className="block truncate font-body text-xs text-text-muted">
                  {node.status === "planned" ? "Coming soon" : node.inscription}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

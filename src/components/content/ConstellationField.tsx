import { useCallback, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router";
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

/** Dev-only: check for ?tune query param to enable position tuning mode. */
function useTuneMode() {
  const [searchParams] = useSearchParams();
  return import.meta.env.DEV && searchParams.has("tune");
}

export function ConstellationField({
  nodes: propNodes,
  selectedId,
  onSelectNode,
  compact = false,
}: ConstellationFieldProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const tuneMode = useTuneMode();
  const fieldRef = useRef<HTMLDivElement>(null);

  // In tune mode, maintain mutable positions
  const [tunedPositions, setTunedPositions] = useState<Record<string, { x: number; y: number }>>({});

  // Apply tuned positions over prop nodes
  const nodes = useMemo(() => {
    if (!tuneMode || Object.keys(tunedPositions).length === 0) return propNodes;
    return propNodes.map((n) => {
      const tuned = tunedPositions[n.id];
      return tuned ? { ...n, position: tuned } : n;
    });
  }, [propNodes, tunedPositions, tuneMode]);

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

  // Drag handling for tune mode
  const dragRef = useRef<{ nodeId: string; startX: number; startY: number; startPos: { x: number; y: number } } | null>(null);

  const handleTuneDragStart = useCallback((nodeId: string, e: React.PointerEvent) => {
    if (!tuneMode || !fieldRef.current) return;
    e.preventDefault();
    e.stopPropagation();
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return;
    dragRef.current = { nodeId, startX: e.clientX, startY: e.clientY, startPos: { ...node.position } };
    fieldRef.current.setPointerCapture(e.pointerId);
  }, [tuneMode, nodes]);

  const handleTuneDragMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current || !fieldRef.current) return;
    const rect = fieldRef.current.getBoundingClientRect();
    const dx = (e.clientX - dragRef.current.startX) / rect.width;
    const dy = (e.clientY - dragRef.current.startY) / rect.height;
    const newX = Math.max(0.05, Math.min(0.95, dragRef.current.startPos.x + dx));
    const newY = Math.max(0.05, Math.min(0.95, dragRef.current.startPos.y + dy));
    setTunedPositions((prev) => ({
      ...prev,
      [dragRef.current!.nodeId]: { x: newX, y: newY },
    }));
  }, []);

  const handleTuneDragEnd = useCallback(() => {
    dragRef.current = null;
  }, []);

  const copyPositions = useCallback(() => {
    const output = nodes.map((n) => `'${n.id}': { x: ${n.position.x.toFixed(2)}, y: ${n.position.y.toFixed(2)} }`).join(",\n");
    navigator.clipboard.writeText(output);
  }, [nodes]);

  return (
    <nav aria-label="Case study topics" className={compact ? "h-full" : undefined}>
      {/* Spatial field -- hidden on very small screens when not compact */}
      <div
        ref={fieldRef}
        className={cn(
          "relative mx-auto w-full",
          compact ? "block h-full" : "hidden min-[375px]:block",
          tuneMode && "cursor-crosshair"
        )}
        style={
          compact
            ? undefined
            : { aspectRatio: "4 / 3", maxHeight: "min(60vh, 500px)" }
        }
        onPointerMove={tuneMode ? handleTuneDragMove : undefined}
        onPointerUp={tuneMode ? handleTuneDragEnd : undefined}
      >
        {/* Connection lines -- behind nodes */}
        <svg
          className="absolute inset-0 z-0 h-full w-full pointer-events-none"
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
            onSelect={tuneMode ? () => {} : onSelectNode}
            onHover={handleHover}
            compact={compact}
            index={i}
            tuneMode={tuneMode}
            onTuneDragStart={tuneMode ? handleTuneDragStart : undefined}
          />
        ))}

        {/* Tune mode overlay */}
        {tuneMode && (
          <div className="absolute bottom-2 left-2 z-50 flex gap-2">
            <button
              type="button"
              onClick={copyPositions}
              className="rounded bg-accent-primary px-3 py-1.5 font-heading text-xs font-medium text-bg-base shadow-lg transition-opacity hover:opacity-80"
            >
              Copy positions
            </button>
            <span className="self-center font-body text-xs text-text-muted">
              Drag nodes to reposition. Click "Copy positions" when done.
            </span>
          </div>
        )}
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

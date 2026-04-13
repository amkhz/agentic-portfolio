import { cn } from "@core/utils";
import type { PositionedNode, NodeStatus } from "@core/content/constellation";

interface ConstellationNodeProps {
  node: PositionedNode;
  isSelected: boolean;
  isHighlighted: boolean;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  /** Compact sidebar mode: always show labels, smaller markers. */
  compact?: boolean;
  /** Index for staggered entrance animation. */
  index?: number;
  /** Dev-only: enable drag-to-tune positioning. */
  tuneMode?: boolean;
  /** Dev-only: pointer down handler for drag start. */
  onTuneDragStart?: (nodeId: string, e: React.PointerEvent) => void;
}

const statusStyles: Record<NodeStatus, string> = {
  shipped: "border-[var(--constellation-node-border)]",
  active: "border-[var(--constellation-node-active-border)]",
  planned: "border-dashed border-[var(--constellation-node-border)] opacity-50",
};

const sizeMap = {
  sm: "h-[var(--constellation-node-size-sm)] w-[var(--constellation-node-size-sm)]",
  md: "h-[var(--constellation-node-size-md)] w-[var(--constellation-node-size-md)]",
  lg: "h-[var(--constellation-node-size-lg)] w-[var(--constellation-node-size-lg)]",
};

const dotSize = {
  sm: "h-1 w-1",
  md: "h-1.5 w-1.5",
  lg: "h-2 w-2",
};

export function ConstellationNode({
  node,
  isSelected,
  isHighlighted,
  onSelect,
  onHover,
  compact = false,
  index = 0,
  tuneMode = false,
  onTuneDragStart,
}: ConstellationNodeProps) {
  const showLabel = compact || node.size === "lg" || isSelected || isHighlighted || node.status === "planned";

  return (
    <button
      type="button"
      onClick={node.status !== "planned" ? () => onSelect(node.id) : undefined}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(node.id)}
      onBlur={() => onHover(null)}
      disabled={node.status === "planned"}
      onPointerDown={tuneMode ? (e) => onTuneDragStart?.(node.id, e) : undefined}
      className={cn(
        "group absolute -translate-x-1/2 -translate-y-1/2 m-0 appearance-none border-none bg-transparent p-0 leading-none",
        "motion-safe:animate-[fadeIn_500ms_ease-out_both]",
        tuneMode ? "cursor-grab active:cursor-grabbing" : node.status === "planned" && "cursor-default"
      )}
      style={{
        left: `${node.position.x * 100}%`,
        top: `${node.position.y * 100}%`,
        zIndex: isSelected ? 20 : isHighlighted ? 10 : 2,
        animationDelay: `${300 + index * 80}ms`,
      }}
      aria-label={`${node.title}: ${node.inscription}${node.status === "planned" ? " (coming soon)" : ""}`}
      aria-current={isSelected ? "true" : undefined}
    >
      {/* Invisible touch target -- 44x44 minimum centered on the dot */}
      <div className="absolute left-1/2 top-1/2 min-h-[44px] min-w-[44px] -translate-x-1/2 -translate-y-1/2" />

      {/* Node marker -- this is the only layout child, so translate(-50%,-50%) centers it on the coordinate */}
      <div
        className={cn(
          "flex items-center justify-center rounded-full",
          "bg-[var(--constellation-node-bg)]",
          "transition-[border-color,box-shadow,transform] duration-fast",
          compact ? "h-5 w-5" : sizeMap[node.size],
          statusStyles[node.status],
          isSelected && "shadow-[0_0_20px_var(--constellation-glow-shipped)] border-[var(--constellation-node-active-border)]",
          isSelected && compact && "motion-safe:animate-[pulse_3s_ease-in-out_infinite]",
          isHighlighted && !isSelected && "shadow-[0_0_12px_var(--constellation-glow-shipped)]",
          node.status !== "planned" && "motion-safe:group-hover:scale-110",
          "focus-visible:outline-none"
        )}
      >
        <div
          className={cn(
            "rounded-full transition-opacity duration-normal",
            dotSize[node.size],
            isSelected
              ? "bg-accent-primary opacity-100"
              : node.status === "planned"
                ? "bg-accent-primary opacity-30"
                : "bg-accent-primary opacity-60 group-hover:opacity-100"
          )}
        />
      </div>

      {/* Label -- absolutely positioned below the dot so it doesn't shift the marker */}
      <div
        className={cn(
          "absolute left-1/2 top-full mt-1.5 flex -translate-x-1/2 flex-col items-center rounded px-1.5 py-0.5 transition-opacity duration-normal",
          "bg-bg-base/90",
          showLabel ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
        )}
      >
        <span
          className={cn(
            "whitespace-nowrap font-heading font-medium tracking-wide",
            compact ? "text-[10px]" : "text-xs",
            isSelected ? "text-accent-primary" : "text-text-primary"
          )}
        >
          {node.title}
        </span>
        {!compact && (
          <span className={cn(
            "mt-0.5 max-w-[18ch] text-center font-body text-xs leading-tight text-text-muted",
            "transition-opacity duration-normal",
            showLabel ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
          )}>
            {node.status === "planned" ? "Coming soon" : node.inscription}
          </span>
        )}
      </div>
    </button>
  );
}

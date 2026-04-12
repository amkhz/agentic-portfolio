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
      className={cn(
        "group absolute flex min-h-[44px] min-w-[44px] flex-col items-center justify-start",
        "motion-safe:animate-[fadeIn_500ms_ease-out_both]",
        node.status === "planned" && "cursor-default"
      )}
      style={{
        left: `${node.position.x * 100}%`,
        top: `${node.position.y * 100}%`,
        transform: "translate(-50%, -50%)",
        zIndex: isSelected ? 20 : isHighlighted ? 10 : 1,
        animationDelay: `${300 + index * 80}ms`,
      }}
      aria-label={`${node.title}: ${node.inscription}${node.status === "planned" ? " (coming soon)" : ""}`}
      aria-current={isSelected ? "true" : undefined}
    >
      {/* Node marker */}
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

      {/* Label -- shown on hover/focus/select/lg, with bg to clear connection lines */}
      <div
        className={cn(
          "mt-1.5 flex flex-col items-center rounded px-1.5 py-0.5 transition-opacity duration-normal",
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

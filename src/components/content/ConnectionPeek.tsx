import { cn } from "@core/utils";
import type { PositionedNode } from "@core/content/constellation";

interface ConnectionPeekProps {
  targetNode: PositionedNode;
  tease: string;
  onNavigate: (id: string) => void;
}

/** Inline peek into a connected constellation node. Appears within content flow. */
export function ConnectionPeek({ targetNode, tease, onNavigate }: ConnectionPeekProps) {
  return (
    <button
      type="button"
      onClick={() => onNavigate(targetNode.id)}
      className={cn(
        "group relative my-6 flex w-full items-start gap-4 rounded-lg p-4 text-left",
        "border border-[var(--constellation-peek-border)]",
        "bg-[var(--constellation-peek-bg)]",
        "transition-[border-color,box-shadow] duration-normal",
        "hover:border-accent-muted hover:shadow-[0_0_20px_var(--constellation-glow-shipped)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
      )}
    >
      {/* Node marker */}
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full",
          "h-8 w-8 border border-[var(--constellation-node-border)]",
          "bg-[var(--constellation-node-bg)]",
          "transition-[border-color,box-shadow] duration-normal",
          "group-hover:border-[var(--constellation-node-active-border)]",
          "group-hover:shadow-[0_0_12px_var(--constellation-glow-shipped)]"
        )}
      >
        <div className="h-1.5 w-1.5 rounded-full bg-accent-primary opacity-60 transition-opacity duration-normal group-hover:opacity-100" />
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <span className="block font-heading text-sm font-medium tracking-wide text-text-secondary transition-colors duration-normal group-hover:text-accent-primary">
          {targetNode.title}
        </span>
        <span className="mt-0.5 block font-body text-sm leading-normal text-text-muted">
          {tease}
        </span>
      </div>

      {/* Arrow */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="mt-1 shrink-0 text-text-muted transition-[color,transform] duration-normal motion-safe:group-hover:translate-x-0.5 group-hover:text-accent-primary"
        aria-hidden="true"
      >
        <path
          d="M6 3L11 8L6 13"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

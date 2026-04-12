import { cn } from "@core/utils";

interface CodexNodeProps {
  id: string;
  chapterId: string;
  index: number;
  title: string;
  inscription?: string;
  glyph?: string;
  isOpen: boolean;
  onToggle: () => void;
}

export function CodexNode({
  id,
  chapterId,
  index,
  title,
  inscription,
  glyph,
  isOpen,
  onToggle,
}: CodexNodeProps) {
  return (
    <button
      id={id}
      type="button"
      aria-expanded={isOpen}
      aria-controls={chapterId}
      onClick={onToggle}
      className={cn(
        "group relative z-10 flex w-full items-center gap-4 py-3 pl-3 pr-3 text-left sm:gap-5",
        "rounded-lg transition-colors duration-normal",
        "hover:bg-bg-subtle/50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
      )}
    >
      {/* Node marker -- rounded square on mobile, diamond on desktop */}
      <div className="relative shrink-0">
        <div
          className={cn(
            "flex items-center justify-center",
            "h-[var(--codex-node-size)] w-[var(--codex-node-size)]",
            "rounded-sm sm:rotate-45",
            "border transition-[border-color,box-shadow,transform] duration-slow",
            "motion-safe:group-hover:scale-110",
            isOpen
              ? "border-[var(--codex-node-active-border)] bg-[var(--codex-node-bg)] shadow-[0_0_16px_var(--codex-node-active-glow)]"
              : "border-[var(--codex-node-border)] bg-[var(--codex-node-bg)] group-hover:border-accent-muted"
          )}
        >
          <span
            className={cn(
              "sm:-rotate-45 font-heading text-xs font-medium tracking-wide transition-colors duration-normal select-none",
              isOpen
                ? "text-accent-primary"
                : "text-text-muted group-hover:text-text-secondary"
            )}
          >
            {glyph ?? String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Title + inscription */}
      <div className="min-w-0 flex-1">
        <span
          className={cn(
            "block font-heading text-base font-medium leading-snug tracking-normal transition-colors duration-normal sm:text-[1.0625rem]",
            isOpen
              ? "text-text-primary"
              : "text-text-secondary group-hover:text-text-primary"
          )}
        >
          {title}
        </span>
        {inscription && (
          <span
            className={cn(
              "mt-1 line-clamp-1 block font-body text-sm leading-normal transition-colors duration-normal",
              isOpen
                ? "text-text-muted"
                : "text-text-muted/60 group-hover:text-text-muted"
            )}
          >
            {inscription}
          </span>
        )}
      </div>

      {/* Expand chevron */}
      <div
        className={cn(
          "ml-auto flex shrink-0 items-center justify-center",
          "h-6 w-6 rounded-full",
          "transition-[background-color] duration-normal",
          isOpen
            ? "bg-accent-muted"
            : "bg-transparent group-hover:bg-bg-subtle"
        )}
        aria-hidden="true"
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          className={cn(
            "transition-transform duration-normal",
            isOpen ? "rotate-0" : "-rotate-90"
          )}
        >
          <path
            d="M2 3.5L5 6.5L8 3.5"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
              "transition-colors duration-normal",
              isOpen
                ? "text-accent-primary"
                : "text-text-muted group-hover:text-text-secondary"
            )}
          />
        </svg>
      </div>
    </button>
  );
}

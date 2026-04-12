import type { CaseStudySection } from "@core/content/case-studies";
import { cn } from "@core/utils";
import { renderSection } from "./renderSection";

interface CodexChapterProps {
  id: string;
  isOpen: boolean;
  nodeId: string;
  sections: CaseStudySection[];
  connections?: string[];
  onNavigate?: (chapterId: string) => void;
  chapterTitles?: Record<string, string>;
}

export function CodexChapter({
  id,
  isOpen,
  nodeId,
  sections,
  connections,
  onNavigate,
  chapterTitles,
}: CodexChapterProps) {
  return (
    <div
      id={id}
      role="region"
      aria-labelledby={nodeId}
      className={cn(
        "grid motion-safe:transition-[grid-template-rows] motion-safe:duration-slower motion-safe:ease-spring",
        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      )}
    >
      <div className="overflow-hidden">
        <div className="flex flex-col gap-10 pb-10 pt-4">
          {/* Top divider -- brass fade into border */}
          <div
            className="h-px w-full"
            style={{
              background:
                "linear-gradient(to right, var(--theme-accent-muted), var(--theme-border-subtle) 40%, transparent 80%)",
            }}
            aria-hidden="true"
          />

          {sections.map((section, index) => {
            const headingAs =
              "heading" in section &&
              typeof section.heading === "string" &&
              section.heading.length > 0
                ? ("h3" as const)
                : undefined;
            return renderSection(section, index, headingAs);
          })}

          {/* Connection tags */}
          {connections && connections.length > 0 && onNavigate && chapterTitles && (
            <nav
              aria-label="Related chapters"
              className="flex flex-wrap items-center gap-2 border-t border-border-subtle pt-6"
            >
              <span className="font-heading text-[11px] font-medium uppercase tracking-wider text-text-muted">
                Related
              </span>
              {connections.map((connId) => {
                const title = chapterTitles[connId];
                if (!title) return null;
                return (
                  <button
                    key={connId}
                    type="button"
                    onClick={() => onNavigate(connId)}
                    className={cn(
                      "rounded-full border border-border-subtle px-3 py-1",
                      "font-heading text-xs font-medium text-text-secondary",
                      "transition-all duration-normal",
                      "hover:border-accent-primary/40 hover:text-accent-primary hover:shadow-[0_0_12px_var(--theme-accent-glow)]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
                    )}
                  >
                    {title}
                  </button>
                );
              })}
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}

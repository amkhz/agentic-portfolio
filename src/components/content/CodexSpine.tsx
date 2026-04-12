import { useCallback, useEffect, useMemo, useState } from "react";
import type { CodexChapter as CodexChapterType } from "@core/content/codex";
import { cn } from "@core/utils";
import { CodexNode } from "./CodexNode";
import { CodexChapter } from "./CodexChapter";

/**
 * Spine layout geometry, derived from node marker size and button padding.
 * Node button has pl-3 (0.75rem), marker is --codex-node-size wide.
 * Spine center = left-padding + half the marker.
 */
const SPINE_CENTER = "calc(var(--codex-node-size) / 2 + 0.75rem)";

interface CodexSpineProps {
  chapters: CodexChapterType[];
}

export function CodexSpine({ chapters }: CodexSpineProps) {
  const [openChapters, setOpenChapters] = useState<Set<string>>(new Set());

  const chapterTitles = useMemo(
    () => Object.fromEntries(chapters.map((c) => [c.id, c.title])),
    [chapters]
  );

  const allOpen = openChapters.size === chapters.length;

  const toggle = useCallback((id: string) => {
    setOpenChapters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
    window.history.replaceState(null, "", `#${id}`);
  }, []);

  const toggleAll = useCallback(() => {
    if (allOpen) {
      setOpenChapters(new Set());
      window.history.replaceState(null, "", window.location.pathname);
    } else {
      setOpenChapters(new Set(chapters.map((c) => c.id)));
    }
  }, [allOpen, chapters]);

  const navigateToChapter = useCallback(
    (id: string) => {
      setOpenChapters((prev) => new Set(prev).add(id));
      window.history.replaceState(null, "", `#${id}`);
      requestAnimationFrame(() => {
        const node = document.getElementById(`codex-node-${id}`);
        node?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    },
    []
  );

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && chapters.some((c) => c.id === hash)) {
      setOpenChapters(new Set([hash]));
      requestAnimationFrame(() => {
        const node = document.getElementById(`codex-node-${hash}`);
        node?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [chapters]);

  return (
    <div className="relative">
      {/* Expand/collapse all */}
      <div className="mb-4 flex justify-end sm:mb-2">
        <button
          type="button"
          onClick={toggleAll}
          className={cn(
            "font-heading text-[11px] font-medium uppercase tracking-wider",
            "text-text-muted transition-colors duration-normal",
            "hover:text-accent-primary",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep",
            "rounded px-2 py-1"
          )}
        >
          {allOpen ? "Collapse all" : "Expand all"}
        </button>
      </div>

      {/* Mobile spine line with gradient fade at ends */}
      <div
        className="absolute bottom-0 left-0 top-0 sm:hidden"
        style={{
          width: "var(--codex-spine-width)",
          background: `linear-gradient(to bottom, transparent, var(--codex-spine-color) 2rem, var(--codex-spine-color) calc(100% - 2rem), transparent)`,
        }}
        aria-hidden="true"
      />

      {/* Chapter list */}
      <div className="flex flex-col pl-4 sm:pl-0">
        {chapters.map((chapter, index) => {
          const isOpen = openChapters.has(chapter.id);
          const nodeId = `codex-node-${chapter.id}`;
          const chapterId = `codex-chapter-${chapter.id}`;
          const isFirst = index === 0;
          const isLast = index === chapters.length - 1;

          return (
            <div key={chapter.id} className="relative">
              {/* Desktop spine segment */}
              <div
                className="absolute hidden w-[var(--codex-spine-width)] sm:block"
                style={{
                  left: SPINE_CENTER,
                  top: isFirst ? "50%" : "0",
                  bottom: isLast ? "50%" : "0",
                }}
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-[var(--codex-spine-color)]" />
                <div
                  className={cn(
                    "absolute inset-0 transition-opacity duration-slow",
                    isOpen ? "opacity-100" : "opacity-0"
                  )}
                  style={{
                    background: "var(--codex-spine-active)",
                    boxShadow: "0 0 10px var(--codex-node-active-glow)",
                  }}
                />
              </div>

              <CodexNode
                id={nodeId}
                chapterId={chapterId}
                index={index}
                title={chapter.title}
                inscription={chapter.inscription}
                glyph={chapter.glyph}
                isOpen={isOpen}
                onToggle={() => toggle(chapter.id)}
              />

              {/* Chapter content -- indented past the spine on desktop */}
              <div className={cn("sm:pl-[calc(var(--codex-node-size)+1.75rem)]")}>
                <CodexChapter
                  id={chapterId}
                  nodeId={nodeId}
                  isOpen={isOpen}
                  sections={chapter.sections}
                  connections={chapter.connections}
                  onNavigate={navigateToChapter}
                  chapterTitles={chapterTitles}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

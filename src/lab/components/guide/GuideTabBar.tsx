import { useRef } from "react";
import type { KeyboardEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { springSnappy } from "@/components/effects/motionConfig";

export type GuideMode = "guide" | "glossary";

interface GuideTabBarProps {
  mode: GuideMode;
  onModeChange: (mode: GuideMode) => void;
}

const TABS: { id: GuideMode; label: string }[] = [
  { id: "guide", label: "Guide" },
  { id: "glossary", label: "Glossary" },
];

export function GuideTabBar({ mode, onModeChange }: GuideTabBarProps) {
  const shouldReduce = useReducedMotion();
  const refs = useRef<Record<GuideMode, HTMLButtonElement | null>>({
    guide: null,
    glossary: null,
  });

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const currentIndex = TABS.findIndex((tab) => tab.id === mode);
    const delta = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (currentIndex + delta + TABS.length) % TABS.length;
    const nextTab = TABS[nextIndex];
    onModeChange(nextTab.id);
    refs.current[nextTab.id]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label="Guide view mode"
      className="mt-10 flex gap-8 border-b border-lab-border-subtle"
    >
      {TABS.map((tab) => {
        const selected = tab.id === mode;
        return (
          <button
            key={tab.id}
            ref={(el) => {
              refs.current[tab.id] = el;
            }}
            type="button"
            role="tab"
            id={`guide-tab-${tab.id}`}
            aria-selected={selected}
            aria-controls={`guide-panel-${tab.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onModeChange(tab.id)}
            onKeyDown={handleKeyDown}
            className={
              selected
                ? "relative -mb-px flex min-h-11 items-center border-b-2 border-transparent px-1 font-lab-mono text-sm uppercase tracking-wider text-guide-accent transition-colors duration-[var(--duration-fast)]"
                : "relative -mb-px flex min-h-11 items-center border-b-2 border-transparent px-1 font-lab-mono text-sm uppercase tracking-wider text-lab-text-muted transition-colors duration-[var(--duration-fast)] hover:text-lab-text-secondary"
            }
          >
            {tab.label}
            {/* One shared underline slides between tabs on select (springSnappy)
                instead of hard-cutting. Same layoutId across tabs = Motion
                tweens its position; reduced-motion snaps it instantly. */}
            {selected && (
              <motion.span
                layoutId="guide-tab-underline"
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 -bottom-px h-0.5 bg-guide-accent"
                transition={shouldReduce ? { duration: 0 } : springSnappy}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

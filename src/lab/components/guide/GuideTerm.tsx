import { termCardId } from "./termCardId";
import { SITE_TAB } from "@/lib/tabOrder";

interface GuideTermProps {
  term: string;
  active?: boolean;
  /** When omitted, the term isn't wired to a popover (lists, tables,
   *  blockquotes) and renders as styled static text instead of a button. */
  onToggle?: (term: string) => void;
}

export function GuideTerm({ term, active = false, onToggle }: GuideTermProps) {
  // Only paragraph terms open a definition card. Everywhere else, render the
  // term as static marked text — not a focusable button with an aria-controls
  // pointing at a card that is never rendered (a false affordance for AT).
  if (!onToggle) {
    return (
      <span className="border-b border-dotted border-guide-accent/70 px-0.5 text-guide-accent/90">
        {term}
      </span>
    );
  }

  return (
    <button
      tabIndex={SITE_TAB}
      type="button"
      onClick={() => onToggle(term)}
      aria-expanded={active}
      aria-controls={termCardId(term)}
      className={
        active
          ? "rounded-sm border-b border-guide-accent bg-guide-accent/15 px-0.5 text-guide-accent transition-colors duration-[var(--duration-fast)]"
          : "rounded-sm border-b border-dotted border-guide-accent/70 px-0.5 text-guide-accent/90 transition-colors duration-[var(--duration-fast)] hover:bg-guide-accent/10 hover:text-guide-accent"
      }
    >
      {term}
    </button>
  );
}

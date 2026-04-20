interface GuideTermProps {
  term: string;
  active: boolean;
  onToggle: (term: string) => void;
}

export function GuideTerm({ term, active, onToggle }: GuideTermProps) {
  return (
    <button
      type="button"
      onClick={() => onToggle(term)}
      aria-expanded={active}
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

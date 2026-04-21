interface GuidePrevNextProps {
  prevId?: string;
  prevLabel?: string;
  nextId?: string;
  nextLabel?: string;
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
  window.history.replaceState(null, "", `#${id}`);
}

export function GuidePrevNext({
  prevId,
  prevLabel,
  nextId,
  nextLabel,
}: GuidePrevNextProps) {
  const baseButton =
    "group flex min-h-[4rem] flex-1 flex-col gap-1 rounded-md border border-lab-border-subtle bg-lab-bg-surface px-5 py-3 text-left transition-colors duration-[var(--duration-normal)] disabled:cursor-not-allowed disabled:opacity-40";
  const enabled = "hover:border-guide-accent";

  return (
    <nav
      aria-label="Adjacent sections"
      className="mt-16 flex items-stretch gap-4 border-t border-lab-border-subtle pt-8"
    >
      <button
        type="button"
        disabled={!prevId}
        onClick={prevId ? () => scrollToSection(prevId) : undefined}
        className={prevId ? `${baseButton} ${enabled}` : baseButton}
      >
        <span className="font-lab-mono text-xs uppercase tracking-wider text-lab-text-muted">
          ← Previous
        </span>
        <span className="font-lab-body text-sm text-lab-text-primary">
          {prevLabel ?? "Start of guide"}
        </span>
      </button>
      <button
        type="button"
        disabled={!nextId}
        onClick={nextId ? () => scrollToSection(nextId) : undefined}
        className={
          nextId ? `${baseButton} ${enabled} text-right` : `${baseButton} text-right`
        }
      >
        <span className="font-lab-mono text-xs uppercase tracking-wider text-lab-text-muted">
          Next →
        </span>
        <span className="font-lab-body text-sm text-lab-text-primary">
          {nextLabel ?? "End of guide"}
        </span>
      </button>
    </nav>
  );
}

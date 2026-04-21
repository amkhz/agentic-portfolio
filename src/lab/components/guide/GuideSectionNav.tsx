import type { GuideSection } from "@core/lab/guide-types";

interface GuideSectionNavProps {
  sections: GuideSection[];
  activeSection: string;
  onActiveSectionChange: (id: string) => void;
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
}

export function GuideSectionNav({
  sections,
  activeSection,
  onActiveSectionChange,
}: GuideSectionNavProps) {
  if (sections.length === 0) return null;

  const handleClick = (id: string) => {
    onActiveSectionChange(id);
    scrollToSection(id);
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <nav
      aria-label="Guide sections"
      className="lab-sticky-nav lab-hscroll sticky top-0 z-10 -mx-6 border-b border-lab-border-subtle bg-lab-bg-deep/90 px-6 py-3 backdrop-blur md:-mx-10 md:px-10"
    >
      <ul className="flex min-w-max gap-2">
        {sections.map((section) => {
          const selected = section.id === activeSection;
          return (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => handleClick(section.id)}
                aria-current={selected ? "location" : undefined}
                className={
                  selected
                    ? "inline-flex items-center gap-2 rounded-md border border-guide-accent bg-lab-bg-raised px-3 py-1.5 font-lab-mono text-xs tracking-wide text-guide-accent"
                    : "inline-flex items-center gap-2 rounded-md border border-lab-border-subtle bg-lab-bg-surface px-3 py-1.5 font-lab-mono text-xs tracking-wide text-lab-text-secondary hover:border-lab-border-strong hover:text-lab-text-primary"
                }
              >
                {section.icon ? (
                  <span aria-hidden className="text-base leading-none">
                    {section.icon}
                  </span>
                ) : null}
                <span>{section.heading}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

import type { GuideSection } from "@core/lab/guide-types";
import { SectionIcon } from "./SectionIcon";
import { cn } from "@core/utils";
import { SITE_TAB } from "@/lib/tabOrder";

// Matches the callout-chip icon size; color inherits from the row.
const CHIP_ICON_SIZE = 13;

interface GuideSectionNavProps {
  sections: GuideSection[];
  activeSection: string;
  /** Navigate to a section. GuideRenderer owns mode-switch + scroll. */
  onSelect: (id: string) => void;
}

/**
 * The guide's section index, set as a vertical ledger for the reader rail
 * (T4). Accession-register vocabulary: a mono ordinal, the heading, and a
 * horizontal register tick that lengthens and takes the domain accent at the
 * active row. No vertical colored bar at rest — accent is carried by type and
 * the horizontal mark (Justin's live call on the shelf, applied here too).
 */
export function GuideSectionNav({
  sections,
  activeSection,
  onSelect,
}: GuideSectionNavProps) {
  if (sections.length === 0) return null;

  return (
    <nav aria-label="Guide sections">
      <p className="mb-3 font-lab-mono text-[0.65rem] uppercase tracking-[0.18em] text-lab-text-muted">
        Sections
      </p>
      <ol className="space-y-0.5">
        {sections.map((section, index) => {
          const selected = section.id === activeSection;
          return (
            <li key={section.id}>
              <button
                tabIndex={SITE_TAB}
                type="button"
                onClick={() => onSelect(section.id)}
                aria-current={selected ? "location" : undefined}
                className="group flex w-full items-center gap-2.5 py-2 text-left"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-px shrink-0 transition-all duration-[var(--duration-normal)] ease-spring motion-reduce:transition-none",
                    selected
                      ? "w-4 bg-guide-accent"
                      : "w-1.5 bg-lab-border-strong group-hover:w-3 group-hover:bg-lab-text-muted",
                  )}
                />
                <span
                  className={cn(
                    "shrink-0 font-lab-mono text-[0.65rem] tabular-nums tracking-wide transition-colors duration-[var(--duration-fast)] motion-reduce:transition-none",
                    selected
                      ? "text-guide-accent"
                      : "text-lab-text-muted group-hover:text-lab-text-secondary",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                {section.icon && (
                  <SectionIcon
                    name={section.icon}
                    size={CHIP_ICON_SIZE}
                    className={cn(
                      "shrink-0 transition-colors duration-[var(--duration-fast)] motion-reduce:transition-none",
                      selected
                        ? "text-guide-accent"
                        : "text-lab-text-muted group-hover:text-lab-text-secondary",
                    )}
                  />
                )}
                <span
                  className={cn(
                    "font-lab-mono text-xs leading-snug tracking-wide transition-colors duration-[var(--duration-fast)] motion-reduce:transition-none",
                    selected
                      ? "text-lab-text-primary"
                      : "text-lab-text-secondary group-hover:text-lab-text-primary",
                  )}
                >
                  {section.heading}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

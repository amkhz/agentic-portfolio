import { useEffect, useRef, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import type { GuideSection } from "@core/lab/guide-types";
import type { ReadingPrefs } from "@core/lab/reading-prefs";
import { LabThemeToggle } from "@lab/components/LabThemeToggle";
import { GuideSectionNav } from "./GuideSectionNav";
import { ReaderControls } from "./ReaderControls";

interface ReaderRailProps {
  sections: GuideSection[];
  activeSection: string;
  onSelect: (id: string) => void;
  prefs: ReadingPrefs;
  onPrefChange: <K extends keyof ReadingPrefs>(key: K, value: ReadingPrefs[K]) => void;
  onReset: () => void;
  isDefault: boolean;
  progress: number;
}

function ReadingProgress({ value }: { value: number }) {
  const pct = Math.round(value);
  return (
    <div>
      <div className="flex items-baseline justify-between font-lab-mono text-[0.65rem] uppercase tracking-[0.18em] text-lab-text-muted">
        <span>Progress</span>
        <span className="tabular-nums">{pct}%</span>
      </div>
      <div
        className="mt-2 h-px w-full bg-lab-border-subtle"
        role="progressbar"
        aria-label="Reading progress"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {/* Width comes from --reading-progress (published by GuideRenderer). */}
        <div className="lab-reading-progress-fill h-px bg-guide-accent transition-[width] duration-[var(--duration-fast)] motion-reduce:transition-none" />
      </div>
    </div>
  );
}

function ThemeRow() {
  return (
    <div className="flex items-center justify-between">
      <span className="font-lab-mono text-[0.7rem] tracking-wide text-lab-text-secondary">
        Theme
      </span>
      <LabThemeToggle className="rounded-md border border-lab-border-subtle bg-lab-bg-surface hover:border-lab-border-strong" />
    </div>
  );
}

/**
 * The rail's content, shared by the desktop sticky column and the mobile
 * drawer so both stay in lockstep. idPrefix disambiguates the control ids
 * when both instances are in the tree at once.
 */
function RailContent({
  sections,
  activeSection,
  onSelect,
  prefs,
  onPrefChange,
  onReset,
  isDefault,
  progress,
  idPrefix,
}: ReaderRailProps & { idPrefix: string }) {
  const hasSections = sections.length > 0;
  return (
    <div className="space-y-6">
      {hasSections && (
        <>
          <ReadingProgress value={progress} />
          <GuideSectionNav
            sections={sections}
            activeSection={activeSection}
            onSelect={onSelect}
          />
          <div className="border-t border-lab-border-subtle" />
        </>
      )}
      <ReaderControls
        prefs={prefs}
        onChange={onPrefChange}
        onReset={onReset}
        isDefault={isDefault}
        idPrefix={idPrefix}
      />
      <div className="border-t border-lab-border-subtle" />
      <ThemeRow />
    </div>
  );
}

/**
 * The reader rail (T4): a margin-dwelling column that follows the reader on
 * scroll, holding the section index, reading-accommodation controls, and the
 * theme toggle (relocated here from LabLayout's bottom-right float). At lg+ it
 * sits in the left track of the reading grid; below lg it collapses to a
 * slide-in drawer reached from a fixed trigger, so section nav + controls stay
 * reachable on a phone (the known small-viewport UX cliff).
 */
export function ReaderRail(props: ReaderRailProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Drawer plumbing: Esc closes, focus moves in on open and returns to the
  // trigger on close, and the body scroll locks while it's open.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const trigger = triggerRef.current;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      (previouslyFocused ?? trigger)?.focus();
    };
  }, [open]);

  // Selecting a section from the drawer navigates, then closes it.
  const handleDrawerSelect = (id: string) => {
    props.onSelect(id);
    setOpen(false);
  };

  return (
    <>
      {/* Desktop: sticky left column, in the reading grid's first track. */}
      <aside
        className="lab-reading-rail hidden lg:block"
        aria-label="Reader controls"
      >
        <RailContent {...props} idPrefix="rail" />
      </aside>

      {/* Mobile: fixed trigger + slide-in drawer. */}
      <div className="lg:hidden">
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-label="Open reader controls"
          className="fixed bottom-3 right-3 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-lab-border-subtle bg-lab-bg-raised text-lab-text-secondary transition-colors duration-[var(--duration-fast)] hover:border-lab-border-strong hover:text-guide-accent"
        >
          <SlidersHorizontal aria-hidden="true" className="h-5 w-5" />
        </button>

        {open && (
          <div className="fixed inset-0 z-50">
            <button
              type="button"
              aria-label="Close reader controls"
              tabIndex={-1}
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-lab-bg-deep/70 backdrop-blur-sm"
            />
            <div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Reader controls"
              tabIndex={-1}
              className="lab-drawer-panel absolute inset-y-0 left-0 w-[min(20rem,85vw)] overflow-y-auto border-r border-lab-border-subtle bg-lab-bg-deep px-5 py-5 outline-none"
            >
              <div className="mb-5 flex items-center justify-between">
                <p className="font-lab-mono text-[0.7rem] uppercase tracking-[0.18em] text-lab-text-muted">
                  Reader
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close reader controls"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-md text-lab-text-muted transition-colors duration-[var(--duration-fast)] hover:text-lab-text-primary"
                >
                  <X aria-hidden="true" className="h-5 w-5" />
                </button>
              </div>
              <RailContent
                {...props}
                onSelect={handleDrawerSelect}
                idPrefix="drawer"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

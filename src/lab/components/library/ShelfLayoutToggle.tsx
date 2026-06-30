/**
 * ShelfLayoutToggle — TEMPORARY prototype switch (T3). Flips the library shelf
 * between the two candidate layouts for live comparison: "stack" (the Ledger
 * Stack, GuideSpine) and "ledger" (the Accession Ledger, GuideLedgerRow). Once
 * the direction is chosen, this control and the losing layout come out. It is
 * labelled PROTOTYPE so it never reads as a shipped preference.
 */
import type { ShelfLayout } from "./guideShelfCommon";

interface ShelfLayoutToggleProps {
  value: ShelfLayout;
  onChange: (next: ShelfLayout) => void;
}

const OPTIONS: { id: ShelfLayout; label: string }[] = [
  { id: "stack", label: "Ledger Stack" },
  { id: "ledger", label: "Accession Ledger" },
];

export function ShelfLayoutToggle({ value, onChange }: ShelfLayoutToggleProps) {
  return (
    <div className="mt-16 flex flex-wrap items-center justify-end gap-3 md:mt-24">
      <span className="font-lab-mono text-[0.6rem] uppercase tracking-[0.18em] text-lab-text-muted">
        Prototype · shelf layout
      </span>
      <div
        role="radiogroup"
        aria-label="Shelf layout"
        className="inline-flex items-center gap-1 rounded-sm border border-lab-border-subtle bg-lab-bg-surface p-1"
      >
        {OPTIONS.map((option) => {
          const active = option.id === value;
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(option.id)}
              className={
                active
                  ? "inline-flex min-h-[40px] items-center rounded-[3px] border border-guide-accent/60 bg-guide-accent/10 px-3 font-lab-mono text-[0.65rem] uppercase tracking-wider text-guide-accent transition duration-[var(--duration-normal)]"
                  : "inline-flex min-h-[40px] items-center rounded-[3px] border border-transparent px-3 font-lab-mono text-[0.65rem] uppercase tracking-wider text-lab-text-muted transition duration-[var(--duration-normal)] hover:text-lab-text-secondary"
              }
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

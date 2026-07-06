import { READING_BOUNDS, type ReadingPrefs } from "@core/lab/reading-prefs";
import { cn } from "@core/utils";
import { SITE_TAB } from "@/lib/tabOrder";

interface ReaderControlsProps {
  prefs: ReadingPrefs;
  onChange: <K extends keyof ReadingPrefs>(
    key: K,
    value: ReadingPrefs[K],
  ) => void;
  onReset: () => void;
  isDefault: boolean;
  /** Disambiguates control ids when the rail + drawer are both mounted. */
  idPrefix: string;
}

const MEASURE_LABELS: Record<number, string> = {
  48: "Narrow",
  56: "Default",
  64: "Wide",
};

function weightReadout(delta: number): string {
  if (delta === 0) return "Default";
  return delta > 0 ? `Bolder +${delta}` : `Lighter ${delta}`;
}

/**
 * The reader's accommodation levers (T4): type size, serif weight, and
 * measure. Each overrides the locked per-mode anchor within a11y-safe bounds
 * (see core/lab/reading-prefs.ts); the CSS clamps in lab.css are the backstop.
 * Native range + segmented controls keep it keyboard-operable for free;
 * accent-color themes the thumbs to the guide's domain color.
 */
export function ReaderControls({
  prefs,
  onChange,
  onReset,
  isDefault,
  idPrefix,
}: ReaderControlsProps) {
  const sizeId = `${idPrefix}-size`;
  const weightId = `${idPrefix}-weight`;

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <button
          tabIndex={SITE_TAB}
          type="button"
          onClick={onReset}
          disabled={isDefault}
          className="-mr-2 inline-flex min-h-11 items-center px-2 font-lab-mono text-[0.65rem] uppercase tracking-[0.12em] text-lab-text-muted transition-colors duration-[var(--duration-fast)] hover:text-guide-accent disabled:cursor-default disabled:opacity-40 disabled:hover:text-lab-text-muted"
        >
          Reset
        </button>
      </div>

      <div>
        <label
          htmlFor={sizeId}
          className="flex items-baseline justify-between font-lab-mono text-[0.7rem] tracking-wide text-lab-text-secondary"
        >
          <span>Type size</span>
          <span className="tabular-nums text-lab-text-muted">
            {prefs.sizePct}%
          </span>
        </label>
        <input
          tabIndex={SITE_TAB}
          id={sizeId}
          type="range"
          min={READING_BOUNDS.size.min}
          max={READING_BOUNDS.size.max}
          step={READING_BOUNDS.size.step}
          value={prefs.sizePct}
          onChange={(e) => onChange("sizePct", Number(e.target.value))}
          aria-valuetext={`${prefs.sizePct} percent`}
          className="mt-2 w-full cursor-pointer [accent-color:var(--guide-accent)]"
        />
      </div>

      <div>
        <label
          htmlFor={weightId}
          className="flex items-baseline justify-between font-lab-mono text-[0.7rem] tracking-wide text-lab-text-secondary"
        >
          <span>Weight</span>
          <span className="tabular-nums text-lab-text-muted">
            {weightReadout(prefs.weight)}
          </span>
        </label>
        <input
          tabIndex={SITE_TAB}
          id={weightId}
          type="range"
          min={READING_BOUNDS.weight.min}
          max={READING_BOUNDS.weight.max}
          step={READING_BOUNDS.weight.step}
          value={prefs.weight}
          onChange={(e) => onChange("weight", Number(e.target.value))}
          aria-valuetext={weightReadout(prefs.weight)}
          className="mt-2 w-full cursor-pointer [accent-color:var(--guide-accent)]"
        />
      </div>

      <div>
        <p
          id={`${idPrefix}-measure-label`}
          className="font-lab-mono text-[0.7rem] tracking-wide text-lab-text-secondary"
        >
          Measure
        </p>
        <div
          role="group"
          aria-labelledby={`${idPrefix}-measure-label`}
          className="mt-2 grid grid-cols-3 gap-1"
        >
          {READING_BOUNDS.measure.options.map((option) => {
            const selected = prefs.measure === option;
            return (
              <button
                tabIndex={SITE_TAB}
                key={option}
                type="button"
                onClick={() => onChange("measure", option)}
                aria-pressed={selected}
                className={cn(
                  "min-h-9 rounded-sm px-2 py-1.5 font-lab-mono text-[0.65rem] uppercase tracking-[0.1em] transition-colors duration-[var(--duration-fast)]",
                  selected
                    ? "bg-lab-bg-raised text-guide-accent"
                    : "text-lab-text-muted hover:bg-lab-bg-surface hover:text-lab-text-secondary",
                )}
              >
                {MEASURE_LABELS[option]}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

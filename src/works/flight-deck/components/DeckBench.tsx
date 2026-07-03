import { instruments } from "@core/works/flight-deck/instruments";
import { deckCopy } from "@core/works/flight-deck/copy";

interface DeckBenchProps {
  /** "plate" renders the reduced-motion / no-WebGL still; "live" is the session. */
  variant: "live" | "plate";
  onExitToColophon: () => void;
}

interface RegionProps {
  area: string;
  label: string;
  caption?: string;
  children: React.ReactNode;
}

function Region({ area, label, caption, children }: RegionProps) {
  return (
    <section className={`deck-region--${area}`} aria-label={label}>
      <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--deck-ink-dim)]">
        {label}
      </h2>
      {caption ? (
        <p className="mt-1 font-[family-name:var(--deck-font-body)] text-sm italic text-[var(--deck-ink-dim)]">
          {caption}
        </p>
      ) : null}
      <div className="mt-4">{children}</div>
    </section>
  );
}

function StandbyReading({ value }: { value: string }) {
  return (
    <p className="text-2xl tabular-nums text-[var(--deck-ink)]">{value}</p>
  );
}

const captions = new Map(instruments.map((i) => [i.id, i.caption]));
const names = new Map(instruments.map((i) => [i.id, i.name]));

/**
 * Phase 1 scaffold of the instrument bench. Every region is placed per the
 * shape brief's scan logic; real instruments replace the placeholder
 * readings in phases 2-4. The plate variant doubles as the reduced-motion
 * and no-WebGL fallback (one fallback serves both).
 */
export function DeckBench({ variant, onExitToColophon }: DeckBenchProps) {
  return (
    <div className="deck-bench">
      <div className="deck-region--alert" role="status" aria-label="Alerts">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--deck-ink-faint)]">
          No active alerts
        </p>
      </div>

      <Region
        area="hero"
        label={names.get("field-integrity") ?? ""}
        caption={captions.get("field-integrity")}
      >
        <div
          className="grid min-h-64 place-items-center border border-[var(--deck-line)]"
          aria-hidden="true"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--deck-ink-faint)]">
            Field render arrives in phase 2
          </p>
        </div>
        <StandbyReading value="WALL 1.00 · EVEN 1.00 · STRESS 0" />
      </Region>

      <Region area="panel" label="Translation layer">
        <p className="text-sm text-[var(--deck-ink-dim)]">
          Intent fields, proposal cards, and the utilization meter dock here
          in phase 4.
        </p>
        <StandbyReading value="UTIL 0.00" />
      </Region>

      <Region
        area="vacuum"
        label={names.get("vacuum-energy") ?? ""}
        caption={captions.get("vacuum-energy")}
      >
        <StandbyReading value="VAC 0.000" />
      </Region>

      <Region
        area="horizon"
        label={names.get("synthetic-orientation") ?? ""}
        caption={captions.get("synthetic-orientation")}
      >
        <div
          className="h-8 border-y border-[var(--deck-line)]"
          aria-hidden="true"
        />
        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[var(--deck-ink-faint)]">
          Horizon level · flow fields arrive in phase 3
        </p>
      </Region>

      <div className="deck-region--operator">
        <div className="flex items-baseline justify-between border-t border-[var(--deck-line)] pt-3">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--deck-ink-dim)]">
            Operator state · blink — · respiration — · coherence —
          </p>
          <button
            type="button"
            onClick={onExitToColophon}
            className="text-xs uppercase tracking-[0.2em] text-[var(--deck-ink-dim)] hover:text-[var(--deck-ink)]"
          >
            Colophon
          </button>
        </div>
        {variant === "plate" ? (
          <p className="mt-3 font-[family-name:var(--deck-font-body)] text-sm text-[var(--deck-ink-dim)]">
            {deckCopy.staticPlate.note}
          </p>
        ) : null}
      </div>
    </div>
  );
}

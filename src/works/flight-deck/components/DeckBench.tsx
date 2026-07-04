import { instruments, type InstrumentId } from "@core/works/flight-deck/instruments";
import { SEVERITY_ORDER } from "@core/works/flight-deck/boot";
import { deckCopy } from "@core/works/flight-deck/copy";
import { FieldPlate } from "./FieldPlate";
import { OrientationPlate } from "./OrientationPlate";
import { VacuumPlate } from "./VacuumPlate";

interface DeckBenchProps {
  /** "plate" renders the reduced-motion / no-WebGL still; "live" is the session. */
  variant: "live" | "plate";
  onExitToColophon: () => void;
  /**
   * The live instruments, owned by DeckSession so the boot timeline can
   * hold their handles and gate their readings on the machine phase.
   * The plate variant ignores these and renders the stills.
   */
  hero?: React.ReactNode;
  orientation?: React.ReactNode;
  vacuum?: React.ReactNode;
}

/** Certification lamp cluster: unlit at nominal, flashed by the boot ritual. */
function CertLamps() {
  return (
    <span className="deck-lamps" aria-hidden="true">
      {SEVERITY_ORDER.map((severity) => (
        <span key={severity} className={`deck-lamp deck-lamp--${severity}`} />
      ))}
    </span>
  );
}

interface RegionProps {
  area: string;
  label: string;
  caption?: string;
  /** Marks an instrument region as a boot-ritual certification target. */
  bootId?: InstrumentId;
  children: React.ReactNode;
}

function Region({ area, label, caption, bootId, children }: RegionProps) {
  return (
    <section
      className={`deck-region--${area} js-gauge`}
      aria-label={label}
      data-boot-instrument={bootId}
    >
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="js-boot-name text-xs font-medium uppercase tracking-[0.2em] text-[var(--deck-ink-dim)]">
          {label}
        </h2>
        {bootId ? <CertLamps /> : null}
      </div>
      {caption ? (
        <p className="js-boot-caption mt-1 font-[family-name:var(--deck-font-body)] text-sm italic text-[var(--deck-ink-dim)]">
          {caption}
        </p>
      ) : null}
      <div className="deck-region-body mt-4">
        {children}
        {bootId ? <span className="deck-sweep" aria-hidden="true" /> : null}
      </div>
    </section>
  );
}

function StandbyReading({ value }: { value: string }) {
  return (
    <p className="js-boot-data js-emit text-2xl tabular-nums text-[var(--deck-ink)]">
      {value}
    </p>
  );
}

const captions = new Map(instruments.map((i) => [i.id, i.caption]));
const names = new Map(instruments.map((i) => [i.id, i.name]));

/**
 * The instrument bench. Regions are placed per the shape brief's scan
 * logic; Field Integrity is live as of phase 2, the remaining instruments
 * replace their placeholder readings in phases 3-4. The plate variant
 * doubles as the reduced-motion and no-WebGL fallback (one fallback
 * serves both). The js-* classes are the boot timeline's targets; on the
 * plate they are inert and everything renders at its awake state.
 */
export function DeckBench({
  variant,
  onExitToColophon,
  hero,
  orientation,
  vacuum,
}: DeckBenchProps) {
  return (
    <div className="deck-bench">
      <div
        className="deck-region--alert js-gauge js-deck-chrome"
        role="status"
        aria-label="Alerts"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--deck-ink-label)]">
          No active alerts
        </p>
      </div>

      <Region
        area="hero"
        label={names.get("field-integrity") ?? ""}
        caption={captions.get("field-integrity")}
        bootId="field-integrity"
      >
        {variant === "live" ? hero : <FieldPlate />}
      </Region>

      <Region area="panel" label="Translation layer">
        <p className="js-deck-chrome text-sm text-[var(--deck-ink-dim)]">
          Intent fields, proposal cards, and the utilization meter dock here
          in phase 4.
        </p>
        <StandbyReading value="UTIL 0.00" />
      </Region>

      <Region
        area="vacuum"
        label={names.get("vacuum-energy") ?? ""}
        caption={captions.get("vacuum-energy")}
        bootId="vacuum-energy"
      >
        {variant === "live" ? vacuum : <VacuumPlate />}
      </Region>

      <Region
        area="horizon"
        label={names.get("synthetic-orientation") ?? ""}
        caption={captions.get("synthetic-orientation")}
        bootId="synthetic-orientation"
      >
        {variant === "live" ? orientation : <OrientationPlate />}
      </Region>

      <div className="deck-region--operator js-gauge js-deck-chrome">
        <div className="flex items-baseline justify-between border-t border-[var(--deck-line)] pt-3">
          <p className="flex items-baseline gap-2 text-xs uppercase tracking-[0.2em] text-[var(--deck-ink-dim)]">
            <span className="js-ready-lamp" aria-hidden="true" />
            <span>{deckCopy.readyLabel}</span>
            <span aria-hidden="true">·</span>
            <span>Operator state · blink — · respiration — · coherence —</span>
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

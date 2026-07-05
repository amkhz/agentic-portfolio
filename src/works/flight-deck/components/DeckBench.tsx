import { instruments, type InstrumentId } from "@core/works/flight-deck/instruments";
import { SEVERITY_ORDER } from "@core/works/flight-deck/boot";
import { deckCopy } from "@core/works/flight-deck/copy";
import { FieldPlate } from "./FieldPlate";
import { OrientationPlate } from "./OrientationPlate";
import { PanelPlate } from "./PanelPlate";
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
  panel?: React.ReactNode;
  /** The transient review surface: drafted routes beside the render. */
  review?: React.ReactNode;
  /** The alert region's content (phase 5); quiet line when absent. */
  alert?: React.ReactNode;
  /** The opt-in sound toggle, deck chrome beside the colophon exit. */
  soundControl?: React.ReactNode;
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
  panel,
  review,
  alert,
  soundControl,
}: DeckBenchProps) {
  return (
    <div className="deck-bench">
      {/* Master-caution position, top of the scan. Not a live region:
          postings speak through the session's single announcer, so the
          drill is never double-spoken. */}
      <section
        className="deck-region--alert js-gauge js-deck-chrome"
        aria-label="Alerts"
      >
        {variant === "live" && alert ? (
          alert
        ) : (
          <p className="deck-alert__quiet">{deckCopy.alerts.quiet}</p>
        )}
      </section>

      <Region
        area="hero"
        label={names.get("field-integrity") ?? ""}
        caption={captions.get("field-integrity")}
        bootId="field-integrity"
      >
        {variant === "live" ? hero : <FieldPlate />}
      </Region>

      <Region area="panel" label="Translation layer">
        {variant === "live" ? panel : <PanelPlate />}
      </Region>

      {/* The review space: quiet until the layer drafts, consumed by a
          commit, and reserved for the drill's attention in phase 5. */}
      <section className="deck-region--review" aria-label="Route review">
        {variant === "live" ? review : null}
      </section>

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
          <span className="flex items-baseline gap-5">
            {variant === "live" ? soundControl : null}
            <button
              type="button"
              onClick={onExitToColophon}
              className="text-xs uppercase tracking-[0.2em] text-[var(--deck-ink-dim)] hover:text-[var(--deck-ink)]"
            >
              Colophon
            </button>
          </span>
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

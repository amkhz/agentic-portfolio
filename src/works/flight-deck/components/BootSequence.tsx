import { useEffect, useState } from "react";
import { instruments } from "@core/works/flight-deck/instruments";
import { deckCopy } from "@core/works/flight-deck/copy";
import type { DeckEvent, DeckPhase } from "@core/works/flight-deck/machine";

interface BootSequenceProps {
  phase: Extract<DeckPhase, "dormant" | "waking">;
  dispatch: (event: DeckEvent) => void;
}

/**
 * Movement 1 scaffold: dormant deck, one breathing indicator, then the
 * instruments introduce themselves one at a time. The stagger here is a
 * placeholder cadence; the real boot ritual is a GSAP timeline (authored
 * lane, ADR-017 D4) choreographed in a later phase once the ritual's
 * direction is locked.
 */
export const BOOT_STEP_MS = 1100;

export function BootSequence({ phase, dispatch }: BootSequenceProps) {
  const [bootStep, setBootStep] = useState(0);

  useEffect(() => {
    if (phase !== "waking") {
      setBootStep(0);
      return;
    }
    if (bootStep > instruments.length) {
      dispatch({ type: "BOOT_COMPLETE" });
      return;
    }
    const timer = window.setTimeout(
      () => setBootStep((step) => step + 1),
      BOOT_STEP_MS,
    );
    return () => window.clearTimeout(timer);
  }, [phase, bootStep, dispatch]);

  if (phase === "dormant") {
    return (
      <main className="grid min-h-dvh place-items-center">
        <div className="text-center">
          <button
            type="button"
            onClick={() => dispatch({ type: "WAKE" })}
            className="deck-breath mx-auto block size-4 rounded-full bg-[var(--deck-caution)]"
            aria-label={deckCopy.invitation}
          />
          <p className="mt-8 font-[family-name:var(--deck-font-body)] text-base text-[var(--deck-ink-dim)]">
            {deckCopy.invitation}
          </p>
        </div>
      </main>
    );
  }

  const online = instruments.slice(0, bootStep);
  const ready = bootStep >= instruments.length;

  return (
    <main
      className="grid min-h-dvh place-items-center"
      aria-live="polite"
    >
      <div className="w-full max-w-xl px-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--deck-ink-faint)]">
          Pre-flight
        </p>
        <ul className="mt-8 space-y-6">
          {online.map((instrument) => (
            <li key={instrument.id}>
              <p className="text-sm uppercase tracking-[0.2em] text-[var(--deck-ink)]">
                {instrument.name}
              </p>
              <p className="mt-1 font-[family-name:var(--deck-font-body)] text-base italic text-[var(--deck-ink-dim)]">
                {instrument.caption}
              </p>
            </li>
          ))}
        </ul>
        {ready ? (
          <p className="mt-10 font-[family-name:var(--deck-font-body)] text-base text-[var(--deck-ink)]">
            {deckCopy.deckReady}
          </p>
        ) : null}
      </div>
    </main>
  );
}

/**
 * The operator-state model: the system watching the watcher (DIRD 34
 * Design Hook 2: overload is classifiable from physiology at >98% in
 * ATC data, so a supervisory cockpit carries a real-time operator-state
 * channel as a first-class instrument). Blink rate, respiration,
 * coherence. Pure and deterministic like the vehicle models, so the
 * strip's traces, the readings, and the text mirror can never disagree;
 * the consciousness chamber (phase 6) reads the same samples when the
 * paradigm slider promotes this channel from monitor to control.
 *
 * On the deck from boot in instrumented mode, per the shape brief: the
 * paradigm slider does not introduce biometrics at the consciousness
 * end, it promotes an instrument that was there all along.
 *
 * The drill leans on these traces through drillOperatorDelta (the
 * envelopes' contract: additive deltas, deterministic in (t, timeline)).
 */

export interface OperatorTelemetry {
  /** Blink rate, blinks per minute. Drops under visual workload. */
  blink: number;
  /** Respiration, breaths per minute. Rises under load. */
  respiration: number;
  /** Coherence, 0 to 1: the composite steadiness read (EEG-coherence register). */
  coherence: number;
  /**
   * The breath waveform itself, -1 to 1: the trace the chamber breathes
   * with and the input the consciousness coupling feeds to the field.
   */
  breath: number;
}

/** Additive out-of-band input, same contract as the vehicle deltas. */
export interface OperatorDelta {
  blink: number;
  respiration: number;
  coherence: number;
}

/** Below this the mirror stops calling the operator "steady". */
export const COHERENCE_STEADY_FLOOR = 0.6;

/** Incommensurate slow sines: smooth, non-repeating-feeling nominal drift. */
function drift(t: number, freq: number, phase: number): number {
  return Math.sin(t * freq + phase);
}

export function sampleOperator(
  tSeconds: number,
  disturb?: OperatorDelta | null,
): OperatorTelemetry {
  const t = tSeconds;
  const d = disturb ?? null;
  const respiration = Math.max(
    13.1 + 0.7 * drift(t, 0.031, 1.9) + 0.3 * drift(t, 0.013, 0.4) +
      (d?.respiration ?? 0),
    6,
  );
  // The breath trace integrates its own rate closely enough for a
  // display instrument: a sine at the current breaths-per-minute, its
  // phase drifting so long sessions never read as a metronome.
  const breath = Math.sin((t * respiration * Math.PI) / 30 + 0.6 * drift(t, 0.011, 2.2));
  return {
    blink: Math.max(
      17.2 + 1.6 * drift(t, 0.023, 0.8) + 0.8 * drift(t, 0.049, 2.6) +
        (d?.blink ?? 0),
      2,
    ),
    respiration,
    coherence: Math.min(
      Math.max(
        0.72 + 0.05 * drift(t, 0.017, 1.1) + 0.02 * drift(t, 0.041, 3.1) +
          (d?.coherence ?? 0),
        0.05,
      ),
      0.98,
    ),
    breath,
  };
}

export interface OperatorReadings {
  /** The strip line, tabular mono: "BLINK 17 · RESP 13.2 · COH 0.74". */
  line: string;
  /** The screen-reader mirror, a full sentence per the a11y contract. */
  mirror: string;
}

/** The status word: honest to the load the drill puts on the watcher. */
export function operatorStatus(o: OperatorTelemetry): "steady" | "working" {
  return o.coherence < COHERENCE_STEADY_FLOOR ? "working" : "steady";
}

export function formatOperatorReadings(
  o: OperatorTelemetry,
  promoted = false,
): OperatorReadings {
  const blink = Math.round(o.blink).toString();
  const respiration = o.respiration.toFixed(1);
  const coherence = o.coherence.toFixed(2);
  return {
    line: `BLINK ${blink} · RESP ${respiration} · COH ${coherence}`,
    mirror:
      `Operator state ${operatorStatus(o)}${promoted ? ", holding the controls" : ""}. ` +
      `Blink ${blink} per minute, respiration ${respiration} per minute, ` +
      `coherence ${coherence}.`,
  };
}

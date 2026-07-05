/**
 * The aural alert grammar, pure data (shape brief: real crew alerting
 * pairs severity with distinct aural signatures, so the audio is part of
 * the alert semantics argument, not garnish). Three severity signatures
 * plus a confirmation tone, synthesized in src/works via Tone.js behind
 * the opt-in sound toggle (ADR-017 D5: dynamic import, muted by default,
 * never autoplay). Zero audio assets: these are synthesis instructions.
 *
 * Register: calm, bounded, procedural. A signature plays once per
 * posting and stops; nothing loops, nothing klaxons.
 */

import type { Severity } from "./boot";

export interface ToneEvent {
  /** Offset from the signature's start, seconds. */
  at: number;
  freqHz: number;
  durationS: number;
}

export interface AlertSignature {
  events: ToneEvent[];
}

/**
 * Severity signatures, in the deck's own dialect of the real grammar:
 * advisory is a single soft touch, caution a repeated two-tone, warning
 * a repeated three-tone (the only signature with urgency in its step).
 */
export const alertSignatures: Record<Severity, AlertSignature> = {
  advisory: {
    events: [{ at: 0, freqHz: 622, durationS: 0.22 }],
  },
  caution: {
    events: [
      { at: 0, freqHz: 740, durationS: 0.16 },
      { at: 0.22, freqHz: 587, durationS: 0.16 },
      { at: 0.62, freqHz: 740, durationS: 0.16 },
      { at: 0.84, freqHz: 587, durationS: 0.16 },
    ],
  },
  warning: {
    events: [
      { at: 0, freqHz: 880, durationS: 0.13 },
      { at: 0.17, freqHz: 660, durationS: 0.13 },
      { at: 0.34, freqHz: 880, durationS: 0.13 },
      { at: 0.68, freqHz: 880, durationS: 0.13 },
      { at: 0.85, freqHz: 660, durationS: 0.13 },
      { at: 1.02, freqHz: 880, durationS: 0.13 },
    ],
  },
};

/** A completed step or a landed judgment: a short rising pair. */
export const confirmationTone: AlertSignature = {
  events: [
    { at: 0, freqHz: 523, durationS: 0.09 },
    { at: 0.11, freqHz: 659, durationS: 0.12 },
  ],
};

/** A signature's total sounding time, seconds. */
export function signatureDurationS(signature: AlertSignature): number {
  return signature.events.reduce(
    (end, event) => Math.max(end, event.at + event.durationS),
    0,
  );
}

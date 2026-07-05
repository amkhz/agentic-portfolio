import type { AlertSignature } from "@core/works/flight-deck/alertGrammar";

/**
 * The deck's synth voice (ADR-017 D5): Tone.js loads only when the
 * operator opts in through the sound toggle, inside that click's user
 * gesture, so the AudioContext starts legally and the library never
 * touches the deck chunk (dynamic import, its own chunk). Muted by
 * default, never autoplay; everything played here is mirrored in text.
 *
 * Synthesis only, zero audio assets: the signatures are pure data from
 * core/works/flight-deck/alertGrammar.
 */

type ToneModule = typeof import("tone");

let tone: ToneModule | null = null;
let synth: InstanceType<ToneModule["PolySynth"]> | null = null;

/** Load and unlock the audio path. Returns false if the deck stays silent. */
export async function enableDeckAudio(): Promise<boolean> {
  try {
    tone ??= await import("tone");
    await tone.start();
    if (!synth) {
      synth = new tone.PolySynth(tone.Synth, {
        oscillator: { type: "sine" },
        envelope: { attack: 0.01, decay: 0.08, sustain: 0.4, release: 0.14 },
      }).toDestination();
      // Instrument register, not notification register: quiet by design.
      synth.volume.value = -14;
    }
    return true;
  } catch {
    return false;
  }
}

/** Play a signature once. A no-op until enableDeckAudio has succeeded. */
export function playSignature(signature: AlertSignature): void {
  if (!tone || !synth) return;
  const now = tone.now();
  for (const event of signature.events) {
    synth.triggerAttackRelease(event.freqHz, event.durationS, now + event.at);
  }
}

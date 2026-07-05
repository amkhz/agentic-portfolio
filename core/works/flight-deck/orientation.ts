/**
 * Synthetic Orientation's data model: the attitude the window cannot
 * give you. Bank, pitch, and the apparent peripheral flow rate, per the
 * shape brief's sensory-substitution grounding (TSAS lineage): true
 * orientation fed continuously through an underused channel. Pure and
 * deterministic like the field model, so the shader strip, the HTML
 * readings, and the text mirror can never disagree.
 *
 * Nominal drift, plus the committed maneuver when a trim is riding
 * (phase 4): the horizon banks into the turn on the shared commit
 * envelope, deterministic in (t, trim). The drill (phase 5) pushes
 * these out of band the same way: an adversarial OrientationDelta from
 * the drill's pure envelopes rides on top of the nominal shape.
 */
import {
  orientationCommitDelta,
  type CommitTrim,
  type OrientationDelta,
} from "./commit";

export interface OrientationTelemetry {
  /** Bank angle, degrees. Positive rolls right. Nominal stays inside ±3. */
  bank: number;
  /** Pitch, degrees. Positive is nose up. Nominal stays inside ±1.5. */
  pitch: number;
  /** Apparent flow through the peripheral field, 0 to 1 of scale. */
  flow: number;
}

/** Incommensurate slow sines: smooth, non-repeating-feeling nominal drift. */
function drift(t: number, freq: number, phase: number): number {
  return Math.sin(t * freq + phase);
}

export function sampleOrientation(
  tSeconds: number,
  trim?: CommitTrim | null,
  disturb?: OrientationDelta | null,
): OrientationTelemetry {
  const t = tSeconds;
  const commit = orientationCommitDelta(t, trim);
  const d = disturb ?? null;
  return {
    bank:
      1.9 * drift(t, 0.047, 0.6) + 0.8 * drift(t, 0.019, 2.3) + commit.bank +
      (d?.bank ?? 0),
    pitch:
      0.9 * drift(t, 0.061, 1.4) + 0.4 * drift(t, 0.027, 0.2) + commit.pitch +
      (d?.pitch ?? 0),
    flow: Math.min(
      0.62 + 0.06 * drift(t, 0.053, 1.1) + 0.03 * drift(t, 0.023, 3.4) +
        commit.flow + (d?.flow ?? 0),
      0.95,
    ),
  };
}

export interface OrientationReadings {
  /** The bench line, tabular mono: "BANK R1.2 · PITCH +0.4 · FLOW 0.63". */
  line: string;
  /** The screen-reader mirror, a full sentence per the a11y contract. */
  mirror: string;
}

const signed = (value: number) =>
  `${value < 0 ? "-" : "+"}${Math.abs(value).toFixed(1)}`;

/**
 * The status word is the caller's call: a commanded bank (a commit) is
 * nominal however steep, an uncommanded one (the drill holding the
 * horizon off its band) is not, and telemetry alone cannot tell them
 * apart. Pass upset = true while a drill disturbance is riding.
 */
export function formatOrientationReadings(
  o: OrientationTelemetry,
  upset = false,
): OrientationReadings {
  const bankSide = o.bank < 0 ? "L" : "R";
  const bank = `${bankSide}${Math.abs(o.bank).toFixed(1)}`;
  const pitch = signed(o.pitch);
  const flow = o.flow.toFixed(2);
  return {
    line: `BANK ${bank} · PITCH ${pitch} · FLOW ${flow}`,
    mirror:
      `Synthetic orientation ${upset ? "off nominal" : "nominal"}. ` +
      `Bank ${Math.abs(o.bank).toFixed(1)} ` +
      `degrees ${o.bank < 0 ? "left" : "right"}, pitch ` +
      `${Math.abs(o.pitch).toFixed(1)} degrees ` +
      `${o.pitch < 0 ? "down" : "up"}, peripheral flow ${flow} of scale.`,
  };
}

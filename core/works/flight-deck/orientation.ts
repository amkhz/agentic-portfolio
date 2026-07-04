/**
 * Synthetic Orientation's data model: the attitude the window cannot
 * give you. Bank, pitch, and the apparent peripheral flow rate, per the
 * shape brief's sensory-substitution grounding (TSAS lineage): true
 * orientation fed continuously through an underused channel. Pure and
 * deterministic like the field model, so the shader strip, the HTML
 * readings, and the text mirror can never disagree.
 *
 * Nominal drift only. The drill (phase 5) will push these out of band
 * by feeding the same shapes adversarial inputs, not by a second model.
 */

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

export function sampleOrientation(tSeconds: number): OrientationTelemetry {
  const t = tSeconds;
  return {
    bank: 1.9 * drift(t, 0.047, 0.6) + 0.8 * drift(t, 0.019, 2.3),
    pitch: 0.9 * drift(t, 0.061, 1.4) + 0.4 * drift(t, 0.027, 0.2),
    flow: 0.62 + 0.06 * drift(t, 0.053, 1.1) + 0.03 * drift(t, 0.023, 3.4),
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

export function formatOrientationReadings(
  o: OrientationTelemetry,
): OrientationReadings {
  const bankSide = o.bank < 0 ? "L" : "R";
  const bank = `${bankSide}${Math.abs(o.bank).toFixed(1)}`;
  const pitch = signed(o.pitch);
  const flow = o.flow.toFixed(2);
  return {
    line: `BANK ${bank} · PITCH ${pitch} · FLOW ${flow}`,
    mirror:
      `Synthetic orientation nominal. Bank ${Math.abs(o.bank).toFixed(1)} ` +
      `degrees ${o.bank < 0 ? "left" : "right"}, pitch ` +
      `${Math.abs(o.pitch).toFixed(1)} degrees ` +
      `${o.pitch < 0 ? "down" : "up"}, peripheral flow ${flow} of scale.`,
  };
}

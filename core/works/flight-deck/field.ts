/**
 * Field Integrity's data model: the warp bubble's wall thickness, energy
 * distribution evenness, and topology stress points (the three readings
 * DIRD 28 names for the new engine gauge). Pure and deterministic: given
 * a time, the same field comes back, so telemetry drift is testable and
 * the shader, the HTML readings, and the text mirror can never disagree.
 *
 * Nominal drift, plus the drill's adversarial inputs when one is riding
 * (phase 5): the same shapes pushed out of band by a FieldDelta from the
 * drill's pure envelopes, not by a second model.
 */

export interface StressPoint {
  /** Position on the bubble wall, radians. */
  angle: number;
  /** Angular half-width of the concentration, radians. */
  width: number;
  /** 0 (quiet) to 1 (the ramp's amber top). */
  intensity: number;
}

export interface FieldTelemetry {
  /** Mean wall thickness against spec, 1.00 = on the line. */
  wall: number;
  /** Energy distribution evenness, 0 to 1. */
  even: number;
  /** The three tracked concentrations, always in slot order. */
  stress: [StressPoint, StressPoint, StressPoint];
  /** How many concentrations currently read above the visible floor. */
  activeStress: number;
}

/** Below this a concentration is background texture, not a counted reading. */
export const STRESS_FLOOR = 0.3;

/** Out of these bands the field reads off nominal, whatever the cause. */
export const WALL_BAND_FLOOR = 0.94;
export const EVEN_BAND_FLOOR = 0.92;

/**
 * An adversarial input into the field's shape: additive, so a zero delta
 * is exactly the nominal model. The drill's envelopes produce these.
 */
export interface FieldDelta {
  wall: number;
  even: number;
  /** Added intensity per tracked slot. */
  stress: [number, number, number];
}

const TAU = Math.PI * 2;

/** Incommensurate slow sines: smooth, non-repeating-feeling nominal drift. */
function drift(t: number, freq: number, phase: number): number {
  return Math.sin(t * freq + phase);
}

export function sampleFieldTelemetry(
  tSeconds: number,
  disturb?: FieldDelta | null,
): FieldTelemetry {
  const t = tSeconds;
  const d = disturb ?? null;
  const wall =
    0.98 + 0.016 * drift(t, 0.11, 0.4) + 0.007 * drift(t, 0.043, 1.7) +
    (d?.wall ?? 0);
  const even =
    0.968 + 0.018 * drift(t, 0.073, 0.9) + 0.008 * drift(t, 0.031, 2.2) +
    (d?.even ?? 0);

  const intensity = (base: number, slot: number) =>
    Math.min(1, Math.max(0, base + (d?.stress[slot] ?? 0)));

  const stress: [StressPoint, StressPoint, StressPoint] = [
    {
      angle: (0.9 + 0.08 * drift(t, 0.021, 0)) % TAU,
      width: 0.35,
      intensity: intensity(0.42 * drift(t, 0.09, 0.2) + 0.18, 0),
    },
    {
      angle: (2.8 + 0.1 * drift(t, 0.017, 1.1)) % TAU,
      width: 0.28,
      intensity: intensity(0.38 * drift(t, 0.061, 2.6) + 0.12, 1),
    },
    {
      angle: (4.9 + 0.06 * drift(t, 0.026, 0.7)) % TAU,
      width: 0.42,
      intensity: intensity(0.34 * drift(t, 0.047, 4.1) + 0.08, 2),
    },
  ];

  return {
    wall: Math.min(Math.max(wall, 0), 1.005),
    even: Math.min(Math.max(even, 0), 0.995),
    stress,
    activeStress: stress.filter((s) => s.intensity >= STRESS_FLOOR).length,
  };
}

export interface FieldReadings {
  /** The bench line, tabular mono: "WALL 0.98 · EVEN 0.97 · STRESS 1". */
  line: string;
  /** The screen-reader mirror, a full sentence per the a11y contract. */
  mirror: string;
}

/**
 * Bearing as the operator reads it off the round display: 12 o'clock is
 * zero, clockwise positive. Field angles are math-convention radians.
 */
export function bearingDegrees(angle: number): number {
  const deg = Math.round(90 - (angle * 180) / Math.PI);
  return ((deg % 360) + 360) % 360;
}

/**
 * One annotation lane per tracked concentration, always in slot order.
 * The visible lane is presentation; the mirror sentence is the reading's
 * a11y contract, spoken whether or not the annotation layer has the
 * width to draw.
 */
export type StressTrend = "rising" | "easing" | "steady";

/** Below this intensity move between samples a lane reads steady. */
const TREND_DEADBAND = 0.012;

export interface StressLaneReading {
  /** Stable slot label: "ST 1". */
  label: string;
  /** Three-digit bearing off 12 o'clock, clockwise: "038". */
  bearing: string;
  /** Intensity at two decimals: "0.42". */
  intensity: string;
  /**
   * Where the reading is headed, from the model's own history (the field
   * is pure in time, so the derivative is real, never staged). Present
   * only when an earlier sample was supplied.
   */
  trend?: StressTrend;
  /** At or past STRESS_FLOOR: a counted reading, not background texture. */
  onWatch: boolean;
  /** The screen-reader sentence for this lane. */
  mirror: string;
}

/**
 * Lane vocabulary (decided with the drill's alert grammar, 2026-07-05,
 * from Justin's parked sketchpad riff): the columns speak plain words
 * where the drill makes a visitor read them under pressure. BEARING is
 * spelled out where the layer shows (the width is already earned), and
 * each lane carries a trend word beside its level. Pass the model's
 * sample from a moment earlier to light the trend.
 */
export function formatStressLanes(
  field: FieldTelemetry,
  earlier?: FieldTelemetry | null,
): StressLaneReading[] {
  return field.stress.map((point, i) => {
    const onWatch = point.intensity >= STRESS_FLOOR;
    const deg = bearingDegrees(point.angle);
    const intensity = point.intensity.toFixed(2);
    let trend: StressTrend | undefined;
    if (earlier) {
      const move = point.intensity - earlier.stress[i].intensity;
      trend =
        move > TREND_DEADBAND
          ? "rising"
          : move < -TREND_DEADBAND
            ? "easing"
            : "steady";
    }
    return {
      label: `ST ${i + 1}`,
      bearing: String(deg).padStart(3, "0"),
      intensity,
      trend,
      onWatch,
      mirror:
        `Stress concentration ${i + 1}: bearing ${deg} degrees, ` +
        `intensity ${intensity}${trend ? ` and ${trend}` : ""}, ` +
        `${onWatch ? "on watch" : "below the watch floor"}.`,
    };
  });
}

/** The status word the mirror speaks; honest to the same bands the drill crosses. */
export function fieldStatus(field: FieldTelemetry): "nominal" | "off nominal" {
  return field.wall < WALL_BAND_FLOOR || field.even < EVEN_BAND_FLOOR
    ? "off nominal"
    : "nominal";
}

export function formatFieldReadings(field: FieldTelemetry): FieldReadings {
  const wall = field.wall.toFixed(2);
  const even = field.even.toFixed(2);
  return {
    line: `WALL ${wall} · EVEN ${even} · STRESS ${field.activeStress}`,
    mirror:
      `Field integrity ${fieldStatus(field)}. Wall thickness ${wall} of spec, ` +
      `energy evenness ${even}, ${field.activeStress} stress ` +
      `${field.activeStress === 1 ? "concentration" : "concentrations"} on watch.`,
  };
}

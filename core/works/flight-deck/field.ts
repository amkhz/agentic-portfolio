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
  /** How many tracked concentrations currently read above the visible floor. */
  activeStress: number;
  /** The slice plane this sample was cut at: -1 aft, +1 fore, 0 = reference. */
  slice: number;
  /**
   * The flank concentration (Works 01.1): a ridge the tracked lanes do
   * not carry, centered off-plane so the reference view cannot see it.
   * Sweeping the cut is the only way to find it, which is the slice
   * plane's argument. Intensity is effectively zero at the reference
   * plane (asserted under test).
   */
  flank: StressPoint;
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

/* ------------------------------------------------------------------ */
/* The axial dimension (Works 01.1): the slice plane.                  */
/* ------------------------------------------------------------------ */

/**
 * The cut ring's scale at slice position s (aft -1 to fore +1): a
 * softened superellipse so the ring shrinks toward the bubble's poles
 * without collapsing. Consumed by the shader (as a uniform) AND the
 * annotation projection, so the caliper anchors stay glued to the
 * rendered wall by construction: the geometry has exactly one home.
 * ringScale(0) is exactly 1: the reference plane is today's display.
 */
export function ringScale(s: number): number {
  const a = Math.min(Math.abs(s), 1);
  return Math.max(0.35, Math.pow(1 - Math.pow(a, 2.4), 0.55));
}

/**
 * Each tracked concentration is a ridge running along the hull axis:
 * an axial center (drifting slowly, like the bearings do) and a
 * half-extent. In-slice intensity is the midship intensity times an
 * axial profile NORMALIZED TO 1 AT s = 0, so every reference-plane
 * number, test, and drill guarantee is untouched by construction. The
 * ratio form means a ridge whose center sits off-plane can read hotter
 * there than the reference view ever showed it.
 */
const RIDGE_AXIS = [
  { center: 0.18, driftFreq: 0.013, driftPhase: 0.5, driftAmp: 0.06, halfExtent: 0.55 },
  { center: -0.32, driftFreq: 0.017, driftPhase: 1.8, driftAmp: 0.05, halfExtent: 0.42 },
  { center: 0.45, driftFreq: 0.011, driftPhase: 3.1, driftAmp: 0.04, halfExtent: 0.5 },
] as const;

/** The flank ridge's axial home: far enough aft that the reference
    plane reads it as background (< 0.02 of peak, asserted under test). */
const FLANK_AXIS = {
  center: -0.55,
  driftFreq: 0.011,
  driftPhase: 3.3,
  driftAmp: 0.04,
  halfExtent: 0.26,
} as const;

function ridgeCenter(
  axis: { center: number; driftFreq: number; driftPhase: number; driftAmp: number },
  t: number,
): number {
  return axis.center + axis.driftAmp * drift(t, axis.driftFreq, axis.driftPhase);
}

/** Gaussian ratio: exactly 1 at s = 0, falling off along the axis. */
function axialFactor(s: number, center: number, halfExtent: number): number {
  const g = (x: number) =>
    Math.exp(-((x - center) * (x - center)) / (halfExtent * halfExtent));
  return g(s) / g(0);
}

export interface AxialRidgeMark {
  /** Axial position, -1 aft to +1 fore. */
  center: number;
  /** False for the flank ridge the lanes do not carry. */
  tracked: boolean;
}

/** The locator ghost's tick data: where the ridges run along the axis. */
export function axialRidgeMarks(t: number): AxialRidgeMark[] {
  return [
    ...RIDGE_AXIS.map((axis) => ({ center: ridgeCenter(axis, t), tracked: true })),
    { center: ridgeCenter(FLANK_AXIS, t), tracked: false },
  ];
}

export function sampleFieldTelemetry(
  tSeconds: number,
  disturb?: FieldDelta | null,
  slice = 0,
): FieldTelemetry {
  const t = tSeconds;
  const d = disturb ?? null;
  const s = Math.min(Math.max(slice, -1), 1);
  /* Flanks run slightly thinner and less even; mild enough that a
     nominal session never crosses the off-nominal bands at any plane
     (property-tested), and exactly 1 at the reference plane. */
  const axialWall = 1 - 0.012 * s * s;
  const axialEven = 1 - 0.01 * s * s;
  const wall =
    (0.98 + 0.016 * drift(t, 0.11, 0.4) + 0.007 * drift(t, 0.043, 1.7) +
      (d?.wall ?? 0)) * axialWall;
  const even =
    (0.968 + 0.018 * drift(t, 0.073, 0.9) + 0.008 * drift(t, 0.031, 2.2) +
      (d?.even ?? 0)) * axialEven;

  const intensity = (base: number, slot: number) => {
    const midship = Math.min(1, Math.max(0, base + (d?.stress[slot] ?? 0)));
    const axis = RIDGE_AXIS[slot];
    return Math.min(
      1,
      midship * axialFactor(s, ridgeCenter(axis, t), axis.halfExtent),
    );
  };

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

  /* The flank ridge: an absolute axial gaussian (no midship identity to
     preserve; it has no reference-plane presence to be identical to). */
  const flankCenter = ridgeCenter(FLANK_AXIS, t);
  const flankPeak = Math.min(
    1,
    Math.max(0, 0.55 + 0.18 * drift(t, 0.053, 1.9)),
  );
  const flank: StressPoint = {
    angle: (3.9 + 0.09 * drift(t, 0.019, 2.4)) % TAU,
    width: 0.3,
    intensity:
      flankPeak *
      Math.exp(
        -((s - flankCenter) * (s - flankCenter)) /
          (FLANK_AXIS.halfExtent * FLANK_AXIS.halfExtent),
      ),
  };

  return {
    wall: Math.min(Math.max(wall, 0), 1.005),
    even: Math.min(Math.max(even, 0), 0.995),
    stress,
    activeStress: stress.filter((p) => p.intensity >= STRESS_FLOOR).length,
    slice: s,
    flank,
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

/** The bench line's plane segment: REF at zero, signed two decimals off it. */
export function formatSlicePlane(s: number): string {
  if (s === 0) return "REF";
  return `${s > 0 ? "+" : "-"}${Math.abs(s).toFixed(2)}`;
}

/** The plane in plain words: the scrubber's valuetext and the mirror share it. */
export function describeSlicePlane(s: number): string {
  if (s === 0) return "At the reference plane";
  return `${Math.abs(s).toFixed(2)} toward the ${s > 0 ? "bow" : "stern"}`;
}

export function formatFieldReadings(field: FieldTelemetry): FieldReadings {
  const wall = field.wall.toFixed(2);
  const even = field.even.toFixed(2);
  /* The readings stay honest to the DISPLAYED plane: the cut is named
     on the bench line and spoken in the mirror, and the flank ridge is
     called out when the current cut actually shows it. */
  const flankVisible = field.flank.intensity >= STRESS_FLOOR;
  const flankSentence = flankVisible
    ? ` An untracked concentration reads on the flank: bearing ` +
      `${bearingDegrees(field.flank.angle)} degrees, intensity ` +
      `${field.flank.intensity.toFixed(2)}.`
    : "";
  return {
    line: `WALL ${wall} · EVEN ${even} · STRESS ${field.activeStress} · PLANE ${formatSlicePlane(field.slice)}`,
    mirror:
      `Field integrity ${fieldStatus(field)}. Wall thickness ${wall} of spec, ` +
      `energy evenness ${even}, ${field.activeStress} stress ` +
      `${field.activeStress === 1 ? "concentration" : "concentrations"} on watch. ` +
      `${describeSlicePlane(field.slice)}.${flankSentence}`,
  };
}

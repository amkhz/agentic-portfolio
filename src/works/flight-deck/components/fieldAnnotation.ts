/**
 * Field-space to canvas-space projection for the annotation layer
 * ("earn the width", locked 2026-07-04). Mirrors the shader's transform
 * exactly -- frame dials, aspect guard, ring centerline -- so a leader
 * line's anchor and the rendered concentration can never disagree. The
 * shader stays the single source of the geometry; this file is its
 * inverse, and the numeric literals below are shader constants, not
 * tuning knobs.
 */
import type { FieldTelemetry } from "@core/works/flight-deck/field";
import type { FieldMotionParams } from "./fieldMotion";

/** The lane column: canvas fractions shared by the DOM slots and the
    leader-line geometry, so lines land where the type sits. */
export const LANE_X = 0.66;
export const LANE_YS = [0.22, 0.5, 0.78] as const;

/** Horizontal breath between a leader's end and the lane's first glyph. */
export const LANE_GAP_PX = 12;

/** Presence window: the layer fades in across the aspect regime where
    the shader's anchor guard pushes the ring left and frees the right of
    the canvas. A square hero has no width to earn; the layer stays dark
    there and the readings line carries the story alone. */
export const ANNOT_ASPECT_FOOT = 2.0;
export const ANNOT_ASPECT_FULL = 2.4;

export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1);
  return t * t * (3 - 2 * t);
}

export function annotationPresence(aspect: number): number {
  return smoothstep(ANNOT_ASPECT_FOOT, ANNOT_ASPECT_FULL, aspect);
}

/** Ring centerline radius at angle theta: the shader's R, line for line.
    The slice plane's scale (core ringScale) multiplies the whole
    centerline, exactly as uRingScale does in the shader (Works 01.1). */
export function ringRadius(
  theta: number,
  t: number,
  even: number,
  m: FieldMotionParams,
  scale = 1,
): number {
  const uneven = 1 - even;
  return (
    scale *
    (0.74 +
      m.breathAmp * Math.sin(t * m.breathRate) +
      (0.018 + 0.5 * uneven) * Math.sin(2 * theta + t * m.driftCenter2) +
      (0.01 + 0.3 * uneven) * Math.sin(3 * theta - t * m.driftCenter3 + 1.3))
  );
}

export interface CanvasPoint {
  x: number;
  y: number;
}

/**
 * Project a field-space point at (radius, theta) to canvas pixels by
 * inverting the shader's UV transform. The shader subtracts the guarded
 * anchor offset before measuring the field, so the inverse adds it back;
 * GL's v axis points up, CSS y points down, hence the flip.
 */
export function projectFieldPoint(
  radius: number,
  theta: number,
  m: FieldMotionParams,
  width: number,
  height: number,
): CanvasPoint {
  const aspect = width / height;
  const px =
    radius * Math.cos(theta) + m.centerX * smoothstep(1.7, 2.6, aspect);
  const py = radius * Math.sin(theta);
  const u = px / (aspect * m.zoom) + 0.5;
  const v = py / m.zoom + 0.5;
  return { x: u * width, y: (1 - v) * height };
}

export interface StressAnchor {
  /** On the wall at the concentration's center: the leader's origin. */
  at: CanvasPoint;
  /** Caliper arc ends, one angular half-width to each side. */
  from: CanvasPoint;
  to: CanvasPoint;
  intensity: number;
}

export function projectStressAnchors(
  field: FieldTelemetry,
  t: number,
  m: FieldMotionParams,
  width: number,
  height: number,
  scale = 1,
): StressAnchor[] {
  return field.stress.map((s) => {
    const pointAt = (theta: number) =>
      projectFieldPoint(
        ringRadius(theta, t, field.even, m, scale),
        theta,
        m,
        width,
        height,
      );
    return {
      at: pointAt(s.angle),
      from: pointAt(s.angle - s.width),
      to: pointAt(s.angle + s.width),
      intensity: s.intensity,
    };
  });
}

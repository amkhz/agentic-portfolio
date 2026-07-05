/**
 * The field render's tunable motion parameters. Defaults are the shipped
 * look (live-tuned with Justin 2026-07-03); the dev-only tuner drives
 * them as shader uniforms, and chosen values get baked back here. The
 * panel is a tuning tool, not a config layer.
 */

export interface FieldMotionParams {
  /** Frame: where the bubble sits in the canvas and how much it fills. */
  centerX: number;
  zoom: number;
  speckleAmp: number;
  speckleDriftX: number;
  speckleDriftY: number;
  crestAmp: number;
  crestSpeed: number;
  driftCenter2: number;
  driftCenter3: number;
  driftThick3: number;
  driftThick5: number;
  breathAmp: number;
  breathRate: number;
  wallBase: number;
  shellFalloff: number;
  /**
   * Out-of-band response (phase 5): how hard the render leans into a
   * wall deficit the drill pushes below the readings' band floor.
   * Nominal telemetry never engages these.
   */
  thinGain: number;
  neckDepth: number;
  thinCool: number;
}

export const FIELD_MOTION_DEFAULTS: FieldMotionParams = {
  centerX: -1.1,
  zoom: 2.1,
  speckleAmp: 0.14,
  speckleDriftX: 0.3,
  speckleDriftY: -0.5,
  crestAmp: 0.07,
  crestSpeed: 0.7,
  driftCenter2: 0.38,
  driftCenter3: 0.31,
  driftThick3: 0.34,
  driftThick5: 0.25,
  breathAmp: 0.01,
  breathRate: 0.9,
  wallBase: 0.1,
  shellFalloff: 2.3,
  thinGain: 0.38,
  neckDepth: 0.55,
  thinCool: 0.08,
};

export const MOTION_UNIFORMS: Record<keyof FieldMotionParams, string> = {
  centerX: "uCenterX",
  zoom: "uZoom",
  speckleAmp: "uSpeckleAmp",
  speckleDriftX: "uSpeckleDriftX",
  speckleDriftY: "uSpeckleDriftY",
  crestAmp: "uCrestAmp",
  crestSpeed: "uCrestSpeed",
  driftCenter2: "uDriftCenter2",
  driftCenter3: "uDriftCenter3",
  driftThick3: "uDriftThick3",
  driftThick5: "uDriftThick5",
  breathAmp: "uBreathAmp",
  breathRate: "uBreathRate",
  wallBase: "uWallBase",
  shellFalloff: "uShellFalloff",
  thinGain: "uThinGain",
  neckDepth: "uNeckDepth",
  thinCool: "uThinCool",
};

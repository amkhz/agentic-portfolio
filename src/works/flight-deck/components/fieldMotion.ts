/**
 * The field render's tunable motion parameters. Defaults are the shipped
 * look (live-tuned with Justin 2026-07-03); the dev-only tuner drives
 * them as shader uniforms, and chosen values get baked back here. The
 * panel is a tuning tool, not a config layer.
 */

export interface FieldMotionParams {
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
}

export const FIELD_MOTION_DEFAULTS: FieldMotionParams = {
  speckleAmp: 0.12,
  speckleDriftX: 0.32,
  speckleDriftY: -0.5,
  crestAmp: 0.05,
  crestSpeed: 0.7,
  driftCenter2: 0.38,
  driftCenter3: 0.28,
  driftThick3: 0.35,
  driftThick5: 0.25,
  breathAmp: 0.006,
  breathRate: 0.6,
  wallBase: 0.085,
  shellFalloff: 2.2,
};

export const MOTION_UNIFORMS: Record<keyof FieldMotionParams, string> = {
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
};

import {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type Ref,
} from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";
import { commitGlow, type CommitTrim } from "@core/works/flight-deck/commit";
import {
  drillFieldDelta,
  operatorLoadAt,
  type DrillTimeline,
} from "@core/works/flight-deck/drillEnvelopes";
import { COUPLING_LAG_S } from "@core/works/flight-deck/paradigm";
import {
  axialRidgeMarks,
  formatFieldReadings,
  formatStressLanes,
  ringScale,
  sampleFieldTelemetry,
} from "@core/works/flight-deck/field";
import { sampleOperator } from "@core/works/flight-deck/operator";
import {
  annotationPresence,
  LANE_GAP_PX,
  LANE_X,
  LANE_YS,
  projectStressAnchors,
} from "./fieldAnnotation";
import {
  FIELD_MOTION_DEFAULTS,
  MOTION_UNIFORMS,
  type FieldMotionParams,
} from "./fieldMotion";
import { FieldLegend } from "./FieldLegend";
import { readOklabToken } from "./oklabTokens";
import { SliceScrubber } from "./SliceScrubber";

/**
 * Field Integrity, the hero instrument (Design Hook 1: the field health
 * display is the new engine gauge). A computed cross-section of the warp
 * bubble wall in the medical-imaging register: wall thickness and energy
 * density mapped through the deck's spectral ramp, blue through violet to
 * the amber top; red never appears here, it stays the warning's monopoly.
 *
 * All color reaches the shader from tokens.css: computed custom properties
 * are parsed to OKLab and interpolated in-shader in OKLab, so the
 * violet-to-amber passage desaturates through warm neutral instead of
 * detouring through red hue. Readings stay HTML (probe outcome, 2026-07-03)
 * with a screen-reader sentence mirror.
 *
 * The annotation layer ("earn the width", locked 2026-07-04) rides the
 * width the center-left anchor frees: caliper arcs hug the wall at the
 * three tracked stress concentrations, hairline leaders run to per-lane
 * readouts on the right. Anchors are projected by inverting the shader's
 * own transform from the same clock and pure field model, so the arc and
 * the rendered concentration cannot disagree. Presence is aspect-driven,
 * not timed: the layer fades in across the same regime where the anchor
 * guard frees the width, and a square hero never shows it.
 */

export interface FieldIntegrityHandle {
  /** Certification sweep, 0 to 1: the boot ritual's angular self-test wipe. */
  setSweep(value: number): void;
  /** Data presence, 0 to 1: how awake the render is after certification. */
  setReveal(value: number): void;
  /** Live motion tuning (the dev tuner's hook; harmless in production). */
  setMotion(params: FieldMotionParams): void;
  /**
   * The commit handoff's field side (phase 4): the timeline drives the
   * arrival glow here while the panel's route retracts; once the trim
   * lands, the render loop owns the glow from the shared envelope.
   */
  setCommit(bearing: number, glow: number): void;
  /**
   * The consciousness coupling (phase 6): with gain above zero the
   * render loop samples the operator model on the shared clock and the
   * bubble breathes with the operator's respiration, its density
   * leaning with coherence. The paradigm dissolve drives the gain.
   */
  setCoupling(gain: number): void;
}

interface FieldIntegrityProps {
  ref?: Ref<FieldIntegrityHandle>;
  /** True once the deck is past the boot ritual: readings tick live. */
  live: boolean;
  /** The shared deck clock; defaults to a local epoch outside a session. */
  clock?: () => number;
  /** The riding maneuver, if any: the commit's consequence on the wall. */
  trim?: CommitTrim | null;
  /** The drill's beat marks (phase 5): adversarial inputs, same shapes. */
  drill?: { current: DrillTimeline } | null;
  /**
   * True while a drill alert is posted (Works 01.1): the slice plane
   * snaps home and the scrubber rests, because procedures read against
   * the reference plane (ECAM posture, Justin's call 2026-07-05).
   */
  alertActive?: boolean;
}

const vertex = /* glsl */ `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = /* glsl */ `
precision highp float;

varying vec2 vUv;

uniform float uTime;
uniform float uAspect;
uniform float uSweep;
uniform float uReveal;
uniform float uWall;
uniform float uEven;
uniform vec3 uStressA; // angle, half-width, intensity
uniform vec3 uStressB;
uniform vec3 uStressC;
uniform vec3 uStressD; // the flank ridge: reads only off the reference plane
uniform float uRingScale; // core ringScale(slice): the cut ring at this plane
uniform vec3 uStop0; // spectral ramp stops, OKLab
uniform vec3 uStop1;
uniform vec3 uStop2;
uniform vec3 uStop3;
uniform vec3 uStop4;
uniform vec3 uInk; // bone ink, OKLab: the sweep arm
uniform float uCommitAngle; // committed heading, radians
uniform float uCommitGlow;  // the maneuver's envelope, 0 to 1

/* The consciousness coupling (phase 6): operator state as input. */
uniform float uCoupling;    // dissolve envelope gain, 0 to 1
uniform float uOpBreath;    // the operator's breath waveform, -1 to 1
uniform float uOpCoherence; // coherence, 0 to 1

/* Motion parameters (FIELD_MOTION_DEFAULTS; dev tuner drives them live). */
uniform float uCenterX;
uniform float uZoom;
uniform float uSpeckleAmp;
uniform float uSpeckleDriftX;
uniform float uSpeckleDriftY;
uniform float uCrestAmp;
uniform float uCrestSpeed;
uniform float uDriftCenter2;
uniform float uDriftCenter3;
uniform float uDriftThick3;
uniform float uDriftThick5;
uniform float uBreathAmp;
uniform float uBreathRate;
uniform float uWallBase;
uniform float uShellFalloff;
uniform float uThinGain;
uniform float uNeckDepth;
uniform float uThinCool;

const float PI = 3.141592653589793;
const float TAU = 6.283185307179586;

vec3 oklabToLinear(vec3 c) {
  float l_ = c.x + 0.3963377774 * c.y + 0.2158037573 * c.z;
  float m_ = c.x - 0.1055613458 * c.y - 0.0638541728 * c.z;
  float s_ = c.x - 0.0894841775 * c.y - 1.2914855480 * c.z;
  l_ = l_ * l_ * l_;
  m_ = m_ * m_ * m_;
  s_ = s_ * s_ * s_;
  return vec3(
    4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    -0.0041960863 * l_ - 0.7034186147 * m_ + 1.7076147010 * s_
  );
}

vec3 linearToSrgb(vec3 c) {
  c = clamp(c, 0.0, 1.0);
  vec3 lo = 12.92 * c;
  vec3 hi = 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055;
  return mix(lo, hi, step(0.0031308, c));
}

/* Piecewise-linear ramp in OKLab across the five token stops. */
vec3 ramp(float x) {
  x = clamp(x, 0.0, 1.0) * 4.0;
  vec3 lab = mix(uStop0, uStop1, clamp(x, 0.0, 1.0));
  lab = mix(lab, uStop2, clamp(x - 1.0, 0.0, 1.0));
  lab = mix(lab, uStop3, clamp(x - 2.0, 0.0, 1.0));
  lab = mix(lab, uStop4, clamp(x - 3.0, 0.0, 1.0));
  return lab;
}

float angDist(float a, float b) {
  return abs(mod(a - b + PI, TAU) - PI);
}

/* Cheap value noise for the living speckle: computed data never sits
   still, the way an ultrasound image shimmers even over calm anatomy. */
float hash21(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash21(i), hash21(i + vec2(1.0, 0.0)), u.x),
    mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float stressBump(float theta, vec3 s) {
  float d = angDist(theta, s.x) / max(s.y, 1e-3);
  return s.z * exp(-d * d);
}

void main() {
  vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0) * uZoom;
  /* Aspect guard on the baked anchor: full center-left offset on wide
     benches, easing back to centered as the hero column narrows, so the
     ring never clips the canvas edge at the 1024px end. */
  p.x -= uCenterX * smoothstep(1.7, 2.6, uAspect);
  float r = length(p);
  float theta = atan(p.y, p.x);
  float t = uTime;

  /* Wall centerline: wobble grows as evenness drops; the ring itself
     breathes faintly. Rates are watchable (10-30s cycles), never nervous. */
  float uneven = 1.0 - uEven;
  /* The committed maneuver (phase 4): the wall leans toward the heading
     the operator handed off, on the shared commit envelope. */
  float commitBump = uCommitGlow
    * exp(-pow(angDist(theta, uCommitAngle) / 0.55, 2.0));
  /* The whole centerline scales with the slice plane (Works 01.1): the
     cut ring shrinks toward the bubble's poles. uRingScale comes from
     core ringScale(s), the same function the annotation projection
     reads, so the calipers stay glued at every plane. */
  float R = uRingScale * (0.74
    + uBreathAmp * sin(t * uBreathRate)
    + (0.018 + 0.5 * uneven) * sin(2.0 * theta + t * uDriftCenter2)
    + (0.010 + 0.3 * uneven) * sin(3.0 * theta - t * uDriftCenter3 + 1.3)
    + 0.035 * commitBump
    /* Coupled, the bubble breathes with the operator: the whole ring
       swells and settles on the human cadence, unmistakably not the
       field's own slow drift. */
    + uCoupling * 0.022 * uOpBreath);

  /* Wall half-thickness varies around the ring: thin reads cool, dense hot. */
  float thickness = uWallBase * uWall * (1.0
    + 0.38 * sin(3.0 * theta + t * uDriftThick3 + 0.7)
    + 0.22 * sin(5.0 * theta - t * uDriftThick5 + 2.1));

  /* Out-of-band wall deficit (phase 5, Justin's live pass): when the
     drill pushes the wall below the same band floor the readings call
     off nominal (0.94, core WALL_BAND_FLOOR), the render shows it: the
     shell gaunts everywhere and necks hardest where the stress
     concentrates, the danger picture of a bright concentration on a
     thinning wall. Nominal telemetry never reaches this; deficit is
     zero anywhere above the floor. Centerline R is untouched, so the
     annotation projection stays glued. */
  float deficit = clamp((0.94 - uWall) / 0.05, 0.0, 1.0);
  float hot = clamp(
    stressBump(theta, uStressA) + stressBump(theta, uStressB)
      + stressBump(theta, uStressC) + stressBump(theta, uStressD),
    0.0, 1.0);
  thickness *= (1.0 - uThinGain * deficit)
    * (1.0 - uNeckDepth * deficit * hot);
  thickness = max(thickness, 0.02);

  float d = (r - R) / thickness;
  float shell = exp(-d * d * uShellFalloff);

  /* Local energy density: thickness plus the tracked stress
     concentrations. The gaunt thickness already pulls density toward
     the ramp's cool bottom; uThinCool adds a direct chill on top (thin
     reads cool, per the legend). */
  float density = 0.30 + 0.42 * (thickness / uWallBase - 0.55)
    - uThinCool * deficit;
  density += stressBump(theta, uStressA);
  density += stressBump(theta, uStressB);
  density += stressBump(theta, uStressC);
  density += stressBump(theta, uStressD);

  /* Circulation: a low crest of energy traveling the wall, the bubble
     visibly holding itself. Periodic in theta, so no seam. */
  density += uCrestAmp * sin(2.0 * theta - t * uCrestSpeed + 1.0);

  /* The committed route lights up where the wall inherited it. */
  density += 0.45 * commitBump;

  /* Coupled, coherence leans on the whole field's warmth: a steadier
     operator reads as a steadier, slightly brighter bubble. Centered on
     the model's nominal so the takeover never jolts. */
  density += uCoupling * (0.16 * (uOpCoherence - 0.72) + 0.04 * uOpBreath);

  /* Living speckle, drifting through the field in cartesian space (no
     angular seam): two octaves, the medium alive under calm data. */
  vec2 sp = p * 9.0 + vec2(t * uSpeckleDriftX, t * uSpeckleDriftY);
  float speckle = vnoise(sp) * 0.6 + vnoise(sp * 2.3 + 7.7) * 0.4;
  density *= 1.0 + uSpeckleAmp * (speckle - 0.5);

  /* Blue-noise-ish dither so the ramp never bands. */
  float n = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  float x = clamp(density + (n - 0.5) * 0.02, 0.0, 1.0);

  /* Certification sweep: an angular wipe from the 12 o'clock mark. */
  float sweepA = -PI + uSweep * TAU;
  float swept = smoothstep(0.0, 0.14, sweepA - theta);
  float present = max(swept * step(0.001, uSweep), uReveal);

  float inside = 1.0 - smoothstep(R - thickness * 1.4, R, r);
  float fill = inside * 0.045;

  float alpha = clamp(shell * (0.22 + 0.78 * x) + fill, 0.0, 1.0) * present;
  vec3 color = linearToSrgb(oklabToLinear(ramp(x))) * alpha;

  /* Off the reference plane, a faint bone hairline holds the midship
     diameter (Works 01.1 live pass: without it, the shrinking cut read
     as zoom; against the full-size reference the smaller ring reads as
     the hull narrowing at this station, the ultrasound read). Strength
     rises as the cut leaves home and the line sits exactly where the
     reference cut would: R is the scaled centerline, so R/uRingScale
     is the same centerline at scale 1. */
  float refR = r - (R / max(uRingScale, 0.05));
  float refLine = exp(-refR * refR * 90000.0);
  float refStrength = smoothstep(0.015, 0.10, 1.0 - uRingScale) * 0.20 * present;
  color += linearToSrgb(oklabToLinear(uInk)) * refLine * refStrength;
  alpha = min(alpha + refLine * refStrength, 1.0);

  /* The sweep arm itself: a bone-ink test edge, gone once certified. */
  float armActive = step(0.001, uSweep) * (1.0 - step(0.999, uSweep));
  float arm = exp(-angDist(theta, sweepA) * 16.0) * (shell + inside * 0.25) * armActive;
  color += linearToSrgb(oklabToLinear(uInk)) * arm * 0.85;
  alpha = min(alpha + arm * 0.85, 1.0);

  gl_FragColor = vec4(color, alpha);
}
`;

const RAMP_TOKENS = [
  "--deck-field-stop-0",
  "--deck-field-stop-1",
  "--deck-field-stop-2",
  "--deck-field-stop-3",
  "--deck-field-stop-4",
] as const;

const READINGS_INTERVAL_MS = 400;
/** How far back the lane trend looks, seconds. */
const TREND_LOOKBACK_S = 1.6;

export function FieldIntegrity({
  ref,
  live,
  clock: clockProp,
  trim,
  drill,
  alertActive = false,
}: FieldIntegrityProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const glStateRef = useRef<{
    sweep: number;
    reveal: number;
    commitAngle: number;
    commitGlow: number;
    coupling: number;
  }>({
    sweep: 0,
    reveal: 0,
    commitAngle: 0,
    commitGlow: 0,
    coupling: 0,
  });
  // One clock for the shader and the readings, so both sample the field
  // model at the same instant and the mirror can never contradict the
  // render. A session passes the shared deck clock so commit trims mean
  // the same instant on every instrument.
  const epochRef = useRef<number | null>(null);
  const localClock = () => {
    epochRef.current ??= performance.now();
    return (performance.now() - epochRef.current) / 1000;
  };
  const clockRef = useRef(localClock);
  clockRef.current = clockProp ?? localClock;
  const clock = () => clockRef.current();
  const trimRef = useRef<CommitTrim | null>(null);
  trimRef.current = trim ?? null;
  const drillRef = useRef<{ current: DrillTimeline } | null>(null);
  drillRef.current = drill ?? null;
  const uniformsRef = useRef<Record<string, { value: number }>>({});
  const [readings, setReadings] = useState(() =>
    formatFieldReadings(sampleFieldTelemetry(0)),
  );
  const [lanes, setLanes] = useState(() =>
    formatStressLanes(sampleFieldTelemetry(0)),
  );

  // The slice plane (Works 01.1). The range input owns the value as
  // state; the per-frame consumers (shader uniform, render loop sample,
  // annotation scale) read the ref so a sweep never re-renders the
  // canvas host. The ghost's ticks re-sample on the readings cadence.
  const [slice, setSlice] = useState(0);
  const sliceRef = useRef(0);
  // The input value is state; the model and uniform follow the
  // scrubber's SPRING via onSweep (per frame, no re-render), so the cut
  // eases between planes with the same damped feel as the thumb.
  const applySlice = (value: number) => {
    sliceRef.current = value;
    const u = uniformsRef.current.uRingScale;
    if (u) u.value = ringScale(value);
  };
  const [ghostMarks, setGhostMarks] = useState(() => axialRidgeMarks(0));

  // Snap home when an alert posts: procedures read against the
  // reference plane, so the display and the copy can never disagree.
  // The scrubber's spring carries the travel home.
  useEffect(() => {
    if (alertActive) setSlice(0);
  }, [alertActive]);

  // The annotation layer only exists over a live canvas; jsdom and lost
  // contexts fall back to the readings line alone.
  const [glReady, setGlReady] = useState(false);
  // The projection tracks the tuner's frame dials live, same as the shader.
  const motionRef = useRef<FieldMotionParams>(FIELD_MOTION_DEFAULTS);
  const sizeRef = useRef({ width: 0, height: 0 });
  const presenceRef = useRef(0);
  const annotLayerRef = useRef<HTMLDivElement>(null);
  const arcRefs = useRef<(SVGPathElement | null)[]>([]);
  const leaderRefs = useRef<(SVGLineElement | null)[]>([]);
  const groupRefs = useRef<(SVGGElement | null)[]>([]);

  useImperativeHandle(
    ref,
    () => ({
      setSweep(value: number) {
        glStateRef.current.sweep = value;
        const u = uniformsRef.current.uSweep;
        if (u) u.value = value;
      },
      setReveal(value: number) {
        glStateRef.current.reveal = value;
        const u = uniformsRef.current.uReveal;
        if (u) u.value = value;
      },
      setMotion(params: FieldMotionParams) {
        motionRef.current = params;
        const uniforms = uniformsRef.current;
        for (const key of Object.keys(MOTION_UNIFORMS) as (keyof FieldMotionParams)[]) {
          const u = uniforms[MOTION_UNIFORMS[key]];
          if (u) u.value = params[key];
        }
      },
      setCommit(bearing: number, glow: number) {
        glStateRef.current.commitAngle = bearing;
        glStateRef.current.commitGlow = glow;
        const angle = uniformsRef.current.uCommitAngle;
        if (angle) angle.value = bearing;
        const g = uniformsRef.current.uCommitGlow;
        if (g) g.value = glow;
      },
      setCoupling(gain: number) {
        glStateRef.current.coupling = gain;
        const u = uniformsRef.current.uCoupling;
        if (u) u.value = gain;
      },
    }),
    [],
  );

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // The deck only mounts this in "full" mode, but jsdom and lost
    // contexts still deserve a soft landing: readings keep working.
    let renderer: Renderer;
    try {
      renderer = new Renderer({
        alpha: true,
        dpr: Math.min(window.devicePixelRatio || 1, 2), // D6 budget
      });
    } catch {
      return;
    }
    const gl = renderer.gl;
    if (!gl) return;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA); // shader premultiplies

    const style = getComputedStyle(host);
    const stops = RAMP_TOKENS.map((token) => readOklabToken(style, token));
    const ink = readOklabToken(style, "--deck-ink");

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uAspect: { value: 1 },
        uSweep: { value: glStateRef.current.sweep },
        uReveal: { value: glStateRef.current.reveal },
        uWall: { value: 1 },
        uEven: { value: 1 },
        uStressA: { value: [0, 0.3, 0] },
        uStressB: { value: [0, 0.3, 0] },
        uStressC: { value: [0, 0.3, 0] },
        uStressD: { value: [0, 0.3, 0] },
        uRingScale: { value: ringScale(sliceRef.current) },
        uStop0: { value: stops[0] },
        uStop1: { value: stops[1] },
        uStop2: { value: stops[2] },
        uStop3: { value: stops[3] },
        uStop4: { value: stops[4] },
        uInk: { value: ink },
        uCommitAngle: { value: glStateRef.current.commitAngle },
        uCommitGlow: { value: glStateRef.current.commitGlow },
        uCoupling: { value: glStateRef.current.coupling },
        uOpBreath: { value: 0 },
        uOpCoherence: { value: 0.72 },
        ...Object.fromEntries(
          (Object.keys(MOTION_UNIFORMS) as (keyof FieldMotionParams)[]).map(
            (key) => [MOTION_UNIFORMS[key], { value: FIELD_MOTION_DEFAULTS[key] }],
          ),
        ),
      },
    });
    uniformsRef.current = program.uniforms as Record<string, { value: number }>;
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
    host.appendChild(gl.canvas as HTMLCanvasElement);

    const resize = () => {
      const { clientWidth, clientHeight } = host;
      if (!clientWidth || !clientHeight) return;
      renderer.setSize(clientWidth, clientHeight);
      program.uniforms.uAspect.value = clientWidth / clientHeight;
      sizeRef.current = { width: clientWidth, height: clientHeight };
      presenceRef.current = annotationPresence(clientWidth / clientHeight);
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();

    // Render loop, gated twice (D6): off-viewport and hidden-tab both pause.
    let frame = 0;
    let running = false;
    let inView = true;

    const update = () => {
      const t = clock();
      const field = sampleFieldTelemetry(
        t,
        drillFieldDelta(t, drillRef.current?.current),
        sliceRef.current,
      );
      program.uniforms.uTime.value = t;
      program.uniforms.uWall.value = field.wall;
      program.uniforms.uEven.value = field.even;
      program.uniforms.uStressA.value = [
        field.stress[0].angle,
        field.stress[0].width,
        field.stress[0].intensity,
      ];
      program.uniforms.uStressB.value = [
        field.stress[1].angle,
        field.stress[1].width,
        field.stress[1].intensity,
      ];
      program.uniforms.uStressC.value = [
        field.stress[2].angle,
        field.stress[2].width,
        field.stress[2].intensity,
      ];
      program.uniforms.uStressD.value = [
        field.flank.angle,
        field.flank.width,
        field.flank.intensity,
      ];

      // The consciousness coupling: while the dissolve holds the gain
      // open, the loop reads the operator COUPLING_LAG_S behind on the
      // same clock the chamber samples — the deck's one lag, kept open
      // even when the intent is a breath. The chamber's FIELD echo
      // reads the identical function, so the echo IS this response.
      if (glStateRef.current.coupling > 0) {
        const tLag = t - COUPLING_LAG_S;
        const op = sampleOperator(
          tLag,
          operatorLoadAt(tLag, drillRef.current?.current, trimRef.current),
        );
        program.uniforms.uOpBreath.value = op.breath;
        program.uniforms.uOpCoherence.value = op.coherence;
      }

      // Once a trim is riding, the loop owns the commit glow from the
      // shared envelope (it starts at the hold value the handoff left,
      // so the takeover is seamless). Before that, only setCommit writes.
      const riding = trimRef.current;
      if (riding) {
        const glow = commitGlow(t - riding.atSeconds);
        glStateRef.current.commitAngle = riding.bearing;
        glStateRef.current.commitGlow = glow;
        program.uniforms.uCommitAngle.value = riding.bearing;
        program.uniforms.uCommitGlow.value = glow;
      }

      // Annotation anchors, glued to the same sample the shader just drew.
      const layer = annotLayerRef.current;
      if (layer) {
        const presence = presenceRef.current;
        layer.style.setProperty("--annot-presence", presence.toFixed(3));
        if (presence > 0) {
          const { width, height } = sizeRef.current;
          const anchors = projectStressAnchors(
            field,
            t,
            motionRef.current,
            width,
            height,
            ringScale(sliceRef.current),
          );
          anchors.forEach((a, i) => {
            const group = groupRefs.current[i];
            const arc = arcRefs.current[i];
            const leader = leaderRefs.current[i];
            if (!group || !arc || !leader) return;
            // Quadratic through the three wall samples: the caliper
            // hugging the arc of the concentration it measures.
            const cx = 2 * a.at.x - (a.from.x + a.to.x) / 2;
            const cy = 2 * a.at.y - (a.from.y + a.to.y) / 2;
            arc.setAttribute(
              "d",
              `M ${a.from.x.toFixed(1)} ${a.from.y.toFixed(1)} ` +
                `Q ${cx.toFixed(1)} ${cy.toFixed(1)} ` +
                `${a.to.x.toFixed(1)} ${a.to.y.toFixed(1)}`,
            );
            leader.setAttribute("x1", a.at.x.toFixed(1));
            leader.setAttribute("y1", a.at.y.toFixed(1));
            leader.setAttribute("x2", (LANE_X * width - LANE_GAP_PX).toFixed(1));
            leader.setAttribute("y2", (LANE_YS[i] * height).toFixed(1));
            // The mark firms with the reading; watch-floor crossings
            // stay smooth because intensity itself is smooth.
            group.style.opacity = (
              0.2 + 0.6 * Math.min(a.intensity, 1)
            ).toFixed(3);
          });
        }
      }

      renderer.render({ scene: mesh });
      frame = requestAnimationFrame(update);
    };
    const syncLoop = () => {
      const shouldRun = inView && !document.hidden;
      if (shouldRun && !running) {
        running = true;
        frame = requestAnimationFrame(update);
      } else if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(frame);
      }
    };
    const intersection = new IntersectionObserver((entries) => {
      inView = entries[0]?.isIntersecting ?? true;
      syncLoop();
    });
    intersection.observe(host);
    const onVisibility = () => syncLoop();
    document.addEventListener("visibilitychange", onVisibility);
    syncLoop();
    setGlReady(true);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      intersection.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      uniformsRef.current = {};
      if (host.contains(gl.canvas as HTMLCanvasElement)) {
        host.removeChild(gl.canvas as HTMLCanvasElement);
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  // Readings tick on their own slow cadence once the deck is live; the
  // shader reads the same pure model every frame, so they cannot diverge.
  // Lane text shares the tick and the sample: one instant, every surface.
  // The trend word comes from the same model a moment earlier: the field
  // is pure in time, so the derivative is real, never staged.
  useEffect(() => {
    if (!live) return;
    const interval = window.setInterval(() => {
      const t = clock();
      const timeline = drillRef.current?.current;
      const s = sliceRef.current;
      const field = sampleFieldTelemetry(t, drillFieldDelta(t, timeline), s);
      const earlier = sampleFieldTelemetry(
        t - TREND_LOOKBACK_S,
        drillFieldDelta(t - TREND_LOOKBACK_S, timeline),
        s,
      );
      setReadings(formatFieldReadings(field));
      setLanes(formatStressLanes(field, earlier));
      setGhostMarks(axialRidgeMarks(t));
    }, READINGS_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [live]);

  return (
    <div className="deck-field">
      <div className="deck-field__stage js-boot-data">
        <div ref={hostRef} className="deck-field__canvas" aria-hidden="true">
          {glReady ? (
            <div ref={annotLayerRef} className="deck-annot">
              <svg className="deck-annot__lines">
                {lanes.map((lane, i) => (
                  <g
                    key={lane.label}
                    style={{ opacity: 0 }}
                    ref={(el) => {
                      groupRefs.current[i] = el;
                    }}
                  >
                    <path
                      className="deck-annot__arc"
                      ref={(el) => {
                        arcRefs.current[i] = el;
                      }}
                    />
                    <line
                      className="deck-annot__leader"
                      ref={(el) => {
                        leaderRefs.current[i] = el;
                      }}
                    />
                  </g>
                ))}
              </svg>
              {lanes.map((lane, i) => (
                <p
                  key={lane.label}
                  className="deck-annot__lane"
                  data-watch={lane.onWatch ? "" : undefined}
                  style={{
                    left: `${LANE_X * 100}%`,
                    top: `${LANE_YS[i] * 100}%`,
                  }}
                >
                  {/* Lane vocabulary decided with the drill's alert
                      grammar (2026-07-05): plain words where the drill
                      makes a visitor read under pressure, and a trend
                      word from the model's real derivative. */}
                  <span className="deck-annot__label">{lane.label}</span>
                  <span className="deck-annot__value">
                    BEARING {lane.bearing}
                  </span>
                  <span className="deck-annot__value">
                    {lane.intensity}
                    {lane.trend ? ` · ${lane.trend}` : ""}
                  </span>
                  <span className="deck-annot__state">
                    {lane.onWatch ? "WATCH" : "QUIET"}
                  </span>
                </p>
              ))}
            </div>
          ) : null}
        </div>
        <FieldLegend />
      </div>
      <SliceScrubber
        value={slice}
        onChange={setSlice}
        onSweep={applySlice}
        marks={ghostMarks}
        disabled={!live || alertActive}
      />
      <p
        className="js-boot-data mt-3 text-2xl tabular-nums text-[var(--deck-ink)]"
        aria-hidden="true"
      >
        {readings.line}
      </p>
      <p className="sr-only">
        {[readings.mirror, ...lanes.map((lane) => lane.mirror)].join(" ")}
      </p>
    </div>
  );
}

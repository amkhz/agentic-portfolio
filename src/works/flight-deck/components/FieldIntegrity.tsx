import {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type Ref,
} from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";
import {
  formatFieldReadings,
  sampleFieldTelemetry,
} from "@core/works/flight-deck/field";
import { oklchToOklab, parseOklch } from "@core/works/oklch";
import { FieldLegend } from "./FieldLegend";

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
 */

export interface FieldIntegrityHandle {
  /** Certification sweep, 0 to 1: the boot ritual's angular self-test wipe. */
  setSweep(value: number): void;
  /** Data presence, 0 to 1: how awake the render is after certification. */
  setReveal(value: number): void;
}

interface FieldIntegrityProps {
  ref?: Ref<FieldIntegrityHandle>;
  /** True once the deck is past the boot ritual: readings tick live. */
  live: boolean;
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
uniform vec3 uStop0; // spectral ramp stops, OKLab
uniform vec3 uStop1;
uniform vec3 uStop2;
uniform vec3 uStop3;
uniform vec3 uStop4;
uniform vec3 uInk; // bone ink, OKLab: the sweep arm

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
  vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0) * 2.3;
  float r = length(p);
  float theta = atan(p.y, p.x);
  float t = uTime;

  /* Wall centerline: wobble grows as evenness drops; the ring itself
     breathes faintly. Rates are watchable (10-30s cycles), never nervous. */
  float uneven = 1.0 - uEven;
  float R = 0.74
    + 0.006 * sin(t * 0.6)
    + (0.018 + 0.5 * uneven) * sin(2.0 * theta + t * 0.38)
    + (0.010 + 0.3 * uneven) * sin(3.0 * theta - t * 0.28 + 1.3);

  /* Wall half-thickness varies around the ring: thin reads cool, dense hot. */
  float thickness = 0.085 * uWall * (1.0
    + 0.38 * sin(3.0 * theta + t * 0.35 + 0.7)
    + 0.22 * sin(5.0 * theta - t * 0.25 + 2.1));
  thickness = max(thickness, 0.02);

  float d = (r - R) / thickness;
  float shell = exp(-d * d * 2.2);

  /* Local energy density: thickness plus the tracked stress concentrations. */
  float density = 0.30 + 0.42 * (thickness / 0.085 - 0.55);
  density += stressBump(theta, uStressA);
  density += stressBump(theta, uStressB);
  density += stressBump(theta, uStressC);

  /* Circulation: a low crest of energy traveling the wall, the bubble
     visibly holding itself. Periodic in theta, so no seam. */
  density += 0.05 * sin(2.0 * theta - t * 0.7 + 1.0);

  /* Living speckle, drifting through the field in cartesian space (no
     angular seam): two octaves, +/-6%, the medium alive under calm data. */
  vec2 sp = p * 9.0 + vec2(t * 0.32, -t * 0.5);
  float speckle = vnoise(sp) * 0.6 + vnoise(sp * 2.3 + 7.7) * 0.4;
  density *= 1.0 + 0.12 * (speckle - 0.5);

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

function readOklabToken(style: CSSStyleDeclaration, token: string): number[] {
  const parsed = parseOklch(style.getPropertyValue(token).trim());
  // tokens.css owns these; a parse miss is a build error, not a runtime state.
  return parsed ? [...oklchToOklab(parsed)] : [0, 0, 0];
}

const READINGS_INTERVAL_MS = 400;

export function FieldIntegrity({ ref, live }: FieldIntegrityProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const glStateRef = useRef<{ sweep: number; reveal: number }>({
    sweep: 0,
    reveal: 0,
  });
  // One clock for the shader and the readings, so both sample the field
  // model at the same instant and the mirror can never contradict the render.
  const epochRef = useRef<number | null>(null);
  const clock = () => {
    epochRef.current ??= performance.now();
    return (performance.now() - epochRef.current) / 1000;
  };
  const uniformsRef = useRef<Record<string, { value: number }>>({});
  const [readings, setReadings] = useState(() =>
    formatFieldReadings(sampleFieldTelemetry(0)),
  );

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
        uStop0: { value: stops[0] },
        uStop1: { value: stops[1] },
        uStop2: { value: stops[2] },
        uStop3: { value: stops[3] },
        uStop4: { value: stops[4] },
        uInk: { value: ink },
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
      const field = sampleFieldTelemetry(t);
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
  useEffect(() => {
    if (!live) return;
    const interval = window.setInterval(() => {
      setReadings(formatFieldReadings(sampleFieldTelemetry(clock())));
    }, READINGS_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [live]);

  return (
    <div className="deck-field">
      <div className="deck-field__stage js-boot-data">
        <div ref={hostRef} className="deck-field__canvas" aria-hidden="true" />
        <FieldLegend />
      </div>
      <p
        className="js-boot-data mt-3 text-2xl tabular-nums text-[var(--deck-ink)]"
        aria-hidden="true"
      >
        {readings.line}
      </p>
      <p className="sr-only">{readings.mirror}</p>
    </div>
  );
}

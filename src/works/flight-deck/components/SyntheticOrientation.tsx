import { useEffect, useRef, useState } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";
import {
  formatOrientationReadings,
  sampleOrientation,
} from "@core/works/flight-deck/orientation";
import { readOklabToken } from "./oklabTokens";

/**
 * Synthetic Orientation, the horizon that exists because the window
 * cannot be trusted (shape brief: sensory substitution, TSAS lineage).
 * A slim full-width strip: the synthetic horizon line banks and pitches
 * with the pure orientation model while faint flow streaks stream along
 * it, the vehicle's felt velocity in the peripheral channel. Meant to be
 * felt before it is looked at, so everything stays low-contrast bone
 * ink; the amber top remains the field render's monopoly and severity
 * color stays the alerts'.
 *
 * The ladder reference lines hold still in the bench frame; only the
 * horizon moves. Orientation is read as the disagreement between them.
 */

interface SyntheticOrientationProps {
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
uniform float uBank;  // radians
uniform float uPitch; // strip units, +0.5 is the top edge
uniform float uFlow;  // 0-1 of scale
uniform vec3 uInk;    // horizon line, OKLab (ink-dim)
uniform vec3 uFaint;  // flow streaks and ladder, OKLab (ink-faint)

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

void main() {
  vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0);

  /* Into the horizon frame: rotate by bank, lift by pitch. */
  float cb = cos(uBank);
  float sb = sin(uBank);
  vec2 ph = vec2(p.x * cb + p.y * sb, -p.x * sb + p.y * cb);
  float d = ph.y - uPitch;

  /* The synthetic horizon: one confident hairline. */
  float line = exp(-d * d * 2200.0);

  /* Flow streaks: noise stretched long and low, advected with the felt
     velocity, parallel to the horizon and hugging its band. Two octaves
     so the medium never sits still. */
  float drift = uTime * (0.35 + 0.9 * uFlow);
  vec2 sp = vec2(ph.x * 1.6 - drift, d * 26.0);
  float streaks = vnoise(sp) * 0.6 + vnoise(sp * 2.1 + 7.7) * 0.4;
  streaks = smoothstep(0.55, 0.95, streaks);
  float band = exp(-d * d * 9.0);
  float flowA = streaks * band * 0.4;

  /* Ladder reference lines, fixed in the bench frame: the still thing
     the moving horizon is read against. */
  float ladder = exp(-pow((p.y - 0.25) * 60.0, 2.0))
    + exp(-pow((p.y + 0.25) * 60.0, 2.0));
  float ladderA = ladder * 0.22;

  /* Blue-noise-ish dither so the faint bands never step. */
  float n = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);

  float alpha = clamp(line * 0.85 + flowA + ladderA + (n - 0.5) * 0.015, 0.0, 1.0);
  vec3 tone = mix(uFaint, uInk, clamp(line, 0.0, 1.0));
  vec3 color = linearToSrgb(oklabToLinear(tone)) * alpha;

  gl_FragColor = vec4(color, alpha);
}
`;

const READINGS_INTERVAL_MS = 400;
const DEG2RAD = Math.PI / 180;
/** Degrees of pitch that would move the horizon a full half-strip. */
export const PITCH_FULL_SCALE_DEG = 6;

export function SyntheticOrientation({ live }: SyntheticOrientationProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  // One clock for the shader and the readings, same contract as the field.
  const epochRef = useRef<number | null>(null);
  const clock = () => {
    epochRef.current ??= performance.now();
    return (performance.now() - epochRef.current) / 1000;
  };
  const [readings, setReadings] = useState(() =>
    formatOrientationReadings(sampleOrientation(0)),
  );

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

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
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uAspect: { value: 1 },
        uBank: { value: 0 },
        uPitch: { value: 0 },
        uFlow: { value: 0 },
        uInk: { value: readOklabToken(style, "--deck-ink-dim") },
        uFaint: { value: readOklabToken(style, "--deck-ink-faint") },
      },
    });
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
      const o = sampleOrientation(t);
      program.uniforms.uTime.value = t;
      program.uniforms.uBank.value = o.bank * DEG2RAD;
      program.uniforms.uPitch.value = (o.pitch / PITCH_FULL_SCALE_DEG) * 0.5;
      program.uniforms.uFlow.value = o.flow;
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
      if (host.contains(gl.canvas as HTMLCanvasElement)) {
        host.removeChild(gl.canvas as HTMLCanvasElement);
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  // Readings tick on the bench cadence once the deck is live; the shader
  // reads the same pure model every frame, so they cannot diverge.
  useEffect(() => {
    if (!live) return;
    const interval = window.setInterval(() => {
      setReadings(formatOrientationReadings(sampleOrientation(clock())));
    }, READINGS_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [live]);

  return (
    <div className="deck-orientation">
      <div
        ref={hostRef}
        className="js-boot-data deck-orientation__canvas"
        aria-hidden="true"
      />
      <p
        className="js-boot-data js-emit mt-2 text-base tabular-nums text-[var(--deck-ink-dim)]"
        aria-hidden="true"
      >
        {readings.line}
      </p>
      <p className="sr-only">{readings.mirror}</p>
    </div>
  );
}

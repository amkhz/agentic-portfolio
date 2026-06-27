import { useEffect, useRef, useState, type ReactNode } from "react";
import { StaticMeshGradient } from "@paper-design/shaders-react";
import { useTheme } from "@/lib/useTheme";

/**
 * SPIKE PROTOTYPE (T4d) — NOT WIRED INTO ANY SHIPPED SURFACE.
 *
 * A static (zero-animation) WebGL mesh-gradient atmosphere for a case-study
 * cover, tinted entirely from Conservatory OKLCH tokens. Proves out
 * @paper-design/shaders-react against the OKLCH-only doctrine.
 *
 * Load-bearing constraint resolved by this component:
 *   The shader's `colors` prop does NOT accept oklch() strings — its parser
 *   (getShaderColorFromString) understands hex / rgb() / hsl() only and falls
 *   back to black on anything else. So we never hardcode color: we read the
 *   live token values off :root at runtime and let the browser resolve each
 *   oklch() token to an sRGB hex via a throwaway canvas 2D context (the
 *   canvas fillStyle getter normalizes any CSS color the browser can parse to
 *   #rrggbb / rgba()). The resolved endpoints are exact token values; only the
 *   blend BETWEEN stops happens in the shader's working space, not OKLCH
 *   (the package's oklch GPU transforms exist but are unwired in 0.0.76).
 *
 * Static = no recurring cost: with speed=0 the mount stops its rAF loop
 * entirely, so there is no motion budget and nothing for prefers-reduced-motion
 * to gate. The CSS token gradient under it is the reduced-motion / no-WebGL /
 * pre-resolve fallback, so the surface is never a flat panel.
 *
 * Dual-mode aware: re-resolves tokens whenever the theme flips (night/day).
 */

/** Token names this cover reads from :root. Atmosphere + light, per DESIGN.md:
 *  humus base depth, green as living material, brass as the light spot. */
const TOKEN_STOPS = [
  "--theme-bg-deep",
  "--theme-bg-elevated",
  "--theme-secondary-primary", // green: atmosphere / material only
  "--theme-bg-subtle",
  "--theme-accent-primary", // brass: the light
] as const;

/**
 * Resolve a CSS color string (e.g. an oklch() token value) to a form the
 * shader parser accepts (#rrggbb / rgba()), using the browser's own color
 * engine via a canvas 2D context. Returns null if it cannot be resolved.
 */
function resolveColor(ctx: CanvasRenderingContext2D, input: string): string | null {
  const value = input.trim();
  if (!value) return null;
  // The canvas leaves fillStyle untouched on a color it cannot parse, so seed
  // a known sentinel first; if it survives, the token did not resolve.
  const sentinel = "#010203";
  ctx.fillStyle = sentinel;
  ctx.fillStyle = value;
  const resolved = ctx.fillStyle;
  return resolved === sentinel ? null : resolved;
}

function readTokenColors(): string[] {
  const root = document.documentElement;
  const styles = getComputedStyle(root);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return [];
  const out: string[] = [];
  for (const token of TOKEN_STOPS) {
    const raw = styles.getPropertyValue(token);
    const resolved = resolveColor(ctx, raw);
    if (resolved) out.push(resolved);
  }
  return out;
}

interface ShaderCoverProps {
  /** Content composited above the shader atmosphere (e.g. a Wallace render). */
  children?: ReactNode;
  className?: string;
}

export function ShaderCover({ children, className }: ShaderCoverProps) {
  const { theme } = useTheme();
  const [colors, setColors] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  // Re-resolve token colors on mount and whenever the mode flips.
  useEffect(() => {
    setColors(readTokenColors());
  }, [theme]);

  const ready = colors.length >= 2;

  return (
    <div
      ref={ref}
      className={className}
      style={{ position: "relative", overflow: "hidden", isolation: "isolate" }}
    >
      {/* Token-driven CSS fallback: also the reduced-motion / no-WebGL floor.
          Never a flat panel — a layered radial + linear humus wash. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(120% 90% at 78% 18%, var(--theme-accent-glow), transparent 60%)," +
            "radial-gradient(120% 100% at 12% 95%, var(--theme-secondary-glow), transparent 55%)," +
            "linear-gradient(160deg, var(--theme-bg-deep), var(--theme-bg-elevated))",
        }}
      />

      {ready && (
        <StaticMeshGradient
          colors={colors}
          // Static: no animation, no rAF, no motion budget.
          speed={0}
          // Composition: smooth atmospheric blend, soft warp, faint grain so it
          // reads as material/light, not a solid effect panel.
          positions={24}
          waveX={0.6}
          waveY={0.75}
          mixing={0.55}
          grainMixer={0.35}
          grainOverlay={0.32}
          scale={1.5}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            // SPIKE: cranked to max presence to judge the ceiling.
            opacity: 1,
          }}
        />
      )}

      {/* Content layer (Wallace render / cover type) sits above the atmosphere. */}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

export default ShaderCover;

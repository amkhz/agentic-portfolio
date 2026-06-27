/**
 * HeroScrim — token-only gradient overlay for full-bleed hero images.
 *
 * Two jobs:
 *  1. Legibility: darken the edges where copy sits (bottom, left) so type holds
 *     contrast over a busy atmospheric image.
 *  2. Seam: fade the TOP edge into the page background so a hero that sits under
 *     the sticky, translucent header doesn't meet it with a hard contrast line.
 *     This matters most in light mode, where a dark hero against the light
 *     header reads as an abrupt seam (Justin, 2026-06-25).
 *
 * All layers resolve to `--theme-bg-deep`, so the scrim re-tints itself per mode
 * (humus-black at night, sand-light by day) and stays within the OKLCH token
 * system — no literal colors. Stops are tunable per call site.
 */
interface HeroScrimProps {
  /** Fade the top edge into the page bg (blends under the sticky header). */
  top?: boolean;
  /** Darken the bottom edge for copy legibility. */
  bottom?: boolean;
  /** Darken the left edge to anchor lower-left copy. */
  left?: boolean;
  /** How far down the top fade reaches before going transparent. */
  topStop?: string;
  className?: string;
}

export function HeroScrim({
  top = true,
  bottom = true,
  left = false,
  topStop = "16%",
  className = "",
}: HeroScrimProps) {
  const layers = [
    top &&
      `linear-gradient(to bottom, var(--theme-bg-deep) 0%, transparent ${topStop})`,
    bottom &&
      "linear-gradient(to top, var(--theme-bg-deep) 6%, transparent 64%)",
    left &&
      "linear-gradient(to right, var(--theme-bg-deep) 4%, transparent 52%)",
  ].filter(Boolean) as string[];

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 -z-10 ${className}`}
      style={{ background: layers.join(", ") }}
    />
  );
}

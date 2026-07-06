/**
 * LabThemeToggle — the lab's register of the portfolio ThemeToggle.
 *
 * Same candle-to-sun glyph and useTheme contract as
 * src/components/interactive/ThemeToggle.tsx, restyled for the lab's mono
 * chrome: the portfolio's token utilities (text-text-secondary, bg-bg-subtle,
 * ring-accent-primary) are not generated in the lab bundle because lab.css
 * owns its own @theme. Focus styling comes from the lab's global
 * button:focus-visible rule in lab.css.
 *
 * Mounted once by LabLayout as a floating control (fixed, bottom right) so
 * the theme stays reachable mid-scroll on long guides. Justin's live-review
 * call (2026-06-10), superseding the spec's in-flow placement. The floating
 * chrome (position, pill surface, border) is passed in by the layout;
 * this component owns only the glyph and the interaction.
 */
import { useTheme } from "@/lib/useTheme";
import { cn } from "@core/utils";
import { SITE_TAB } from "@/lib/tabOrder";

export function LabThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      tabIndex={SITE_TAB}
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "relative inline-flex h-11 w-11 items-center justify-center rounded-md",
        // text-secondary, not muted: the glyph dims its strokes to draw the
        // candle/sun, so the resting base must start high enough that the
        // dimmest stroke (0.4 opacity) still clears 3:1 on bg-raised
        // (Roy C.3 flag, fixed with the D identity PR).
        "text-lab-text-secondary",
        "transition-colors duration-[var(--duration-fast)] hover:text-guide-accent",
        className,
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="motion-reduce:transition-none"
      >
        {/* Dark-mode dimming ladder sits on text-secondary so every
            at-rest stroke clears the 3:1 non-text minimum on bg-raised:
            wick 0.55 (3.46:1), base lines 0.6 (3.86:1), bowl 0.7
            (4.75:1). Measured 2026-06-12, closing the Roy C.3 flag. */}
        <path
          d="M9 18h6"
          className={cn(
            "transition-opacity duration-[var(--duration-normal)] motion-reduce:transition-none",
            isDark ? "opacity-60" : "opacity-100",
          )}
        />
        <path
          d="M10 22h4"
          className={cn(
            "transition-opacity duration-[var(--duration-normal)] motion-reduce:transition-none",
            isDark ? "opacity-60" : "opacity-100",
          )}
        />
        <path
          d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5"
          className={cn(
            "transition-[opacity,stroke-width] duration-[var(--duration-normal)] motion-reduce:transition-none",
            isDark ? "opacity-70" : "opacity-100",
          )}
        />
        <path
          d="M10 13V8.5C10 7.67 10.67 7 11.5 7v0c.83 0 1.5.67 1.5 1.5V13"
          className={cn(
            "transition-[opacity,stroke-width] duration-[var(--duration-normal)] motion-reduce:transition-none",
            isDark
              ? "opacity-55 [stroke-width:1.5]"
              : "opacity-100 [stroke-width:2]",
          )}
        />
        <line
          x1="12"
          y1="1"
          x2="12"
          y2="3"
          className={cn(
            "transition-opacity duration-[var(--duration-normal)] motion-reduce:transition-none",
            isDark ? "opacity-0" : "opacity-60",
          )}
        />
        <line
          x1="4.22"
          y1="4.22"
          x2="5.64"
          y2="5.64"
          className={cn(
            "transition-opacity duration-[var(--duration-normal)] motion-reduce:transition-none",
            isDark ? "opacity-0" : "opacity-40",
          )}
        />
        <line
          x1="19.78"
          y1="4.22"
          x2="18.36"
          y2="5.64"
          className={cn(
            "transition-opacity duration-[var(--duration-normal)] motion-reduce:transition-none",
            isDark ? "opacity-0" : "opacity-40",
          )}
        />
      </svg>
    </button>
  );
}

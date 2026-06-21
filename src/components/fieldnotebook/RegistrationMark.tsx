import type { CSSProperties } from "react";

/**
 * Registration marks — the brass L-bracket corner ticks that frame a Field
 * Notebook panel (ADR-013 / DESIGN.md). Purely decorative instrument framing;
 * always aria-hidden. Geometry and color come from the --fieldnote-* tokens,
 * so the marks adapt across day/night with no per-mode overrides.
 *
 * Render inside a `position: relative` parent. The overlay is non-interactive.
 */

type Corner = "tl" | "tr" | "bl" | "br";

const ALL_CORNERS: Corner[] = ["tl", "tr", "bl", "br"];

const markBase: CSSProperties = {
  position: "absolute",
  width: "var(--fieldnote-mark-size)",
  height: "var(--fieldnote-mark-size)",
  borderStyle: "solid",
  borderColor: "var(--fieldnote-mark-color)",
  borderWidth: 0,
};

const inset = "var(--fieldnote-mark-inset)";
const stroke = "var(--fieldnote-mark-stroke)";

const CORNER_STYLES: Record<Corner, CSSProperties> = {
  tl: { top: inset, left: inset, borderTopWidth: stroke, borderLeftWidth: stroke },
  tr: { top: inset, right: inset, borderTopWidth: stroke, borderRightWidth: stroke },
  bl: { bottom: inset, left: inset, borderBottomWidth: stroke, borderLeftWidth: stroke },
  br: { bottom: inset, right: inset, borderBottomWidth: stroke, borderRightWidth: stroke },
};

interface RegistrationMarkProps {
  /** Which corners to draw. Defaults to all four. */
  corners?: Corner[];
  className?: string;
}

export function RegistrationMark({ corners = ALL_CORNERS, className }: RegistrationMarkProps) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className ?? ""}`}
    >
      {corners.map((corner) => (
        <span key={corner} style={{ ...markBase, ...CORNER_STYLES[corner] }} />
      ))}
    </span>
  );
}

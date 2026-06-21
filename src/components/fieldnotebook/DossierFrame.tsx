import type { CSSProperties, ReactNode } from "react";
import { RegistrationMark } from "./RegistrationMark";

/**
 * DossierFrame — a hairline-ruled panel with brass registration marks and an
 * optional mono kicker header. The instrument/dossier container of the Field
 * Notebook grammar (ADR-013 / DESIGN.md). Holds specimen panels, TOC blocks,
 * or any content that should read as a drafted plate.
 *
 * Hairline + marks reference --fieldnote-* tokens, so both modes adapt with no
 * overrides. The kicker is a mono small-caps label sitting above the content
 * behind a hairline rule, echoing the north-star's "INSTRUMENT REFERENCE" band.
 */

const frameStyle: CSSProperties = {
  borderWidth: "var(--fieldnote-mark-stroke)",
  borderStyle: "solid",
  borderColor: "var(--fieldnote-rule-color)",
  padding: "var(--fieldnote-frame-pad)",
};

const ruleStyle: CSSProperties = {
  borderBottomWidth: "var(--fieldnote-mark-stroke)",
  borderBottomStyle: "solid",
  borderColor: "var(--fieldnote-rule-color)",
};

interface DossierFrameProps {
  children: ReactNode;
  /** Optional mono kicker rendered as a dossier header band. */
  kicker?: string;
  /** Show registration marks at the corners. Default true. */
  marked?: boolean;
  className?: string;
}

export function DossierFrame({ children, kicker, marked = true, className }: DossierFrameProps) {
  return (
    <div className={`relative ${className ?? ""}`} style={frameStyle}>
      {kicker && (
        <header
          className="mb-5 flex items-center gap-3 pb-3 font-mono text-xs uppercase tracking-wider text-text-muted"
          style={ruleStyle}
        >
          <span>{kicker}</span>
        </header>
      )}
      {children}
      {marked && <RegistrationMark />}
    </div>
  );
}

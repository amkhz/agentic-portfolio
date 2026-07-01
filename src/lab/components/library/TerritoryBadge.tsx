// Per-territory identifier for the library index. A small square framed with
// Field Notebook register marks (the portfolio's corner-tick vocabulary) around
// a mono T-id, in the territory accent. Replaces the earlier circular chip with
// its pulsing/settling ring — a "live/neon" motif that clashed with the editorial
// Accession Register direction. Static: hierarchy is carried by the lifecycle
// label beside it and the queued-section dimming, not by animation.
import type { CSSProperties } from "react";
import { RegistrationMark } from "@/components/fieldnotebook/RegistrationMark";

interface TerritoryBadgeProps {
  id: string;
}

// Tighten the register marks for this small square: shorter arms, flush to the
// corners, drawn in the resolved territory accent.
const badgeMarkVars = {
  "--fieldnote-mark-size": "0.5rem",
  "--fieldnote-mark-inset": "0px",
  "--fieldnote-mark-color": "var(--guide-accent)",
} as CSSProperties;

export function TerritoryBadge({ id }: TerritoryBadgeProps) {
  return (
    <span
      style={badgeMarkVars}
      className="relative inline-flex h-10 w-10 items-center justify-center"
    >
      <RegistrationMark />
      <span className="font-lab-mono text-xs tracking-wide text-guide-accent">
        {id}
      </span>
    </span>
  );
}

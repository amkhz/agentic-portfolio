/**
 * StatusPill — small accent-aware status chip shared by both Reading Room shelf
 * layouts (GuideSpine, GuideLedgerRow). Complete reads in the guide accent;
 * in-progress and draft step down to neutral lab tones. See guideShelfCommon
 * for the accent contract.
 */
import type { GuideStatus } from "@core/lab/guide-types";
import { STATUS_LABEL } from "./guideShelfCommon";

export function StatusPill({ status }: { status: GuideStatus }) {
  const tone =
    status === "complete"
      ? "border-guide-accent/60 bg-guide-accent/10 text-guide-accent"
      : status === "in-progress"
        ? "border-lab-border-strong bg-lab-bg-raised text-lab-text-secondary"
        : "border-lab-border-subtle bg-transparent text-lab-text-muted";
  return (
    <span
      className={`shrink-0 rounded-sm border px-2 py-0.5 font-lab-mono text-[0.6rem] uppercase tracking-wider ${tone}`}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

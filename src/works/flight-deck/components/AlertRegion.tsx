import { motion } from "motion/react";
import { deckCopy } from "@core/works/flight-deck/copy";
import { drillAlerts, type DrillProgress } from "@core/works/flight-deck/drill";
import { deckSpringSoft } from "./deckMotion";

/**
 * The alert region, top center (master-caution position: aviation puts
 * it at the top of the scan). One line, always: severity lamp, severity
 * word, label, then the plain-language line, so the bench's alert row
 * never changes height mid-drill. Severity is carried by light and
 * grammar together, shape + position + label always redundant with
 * color; announcements ride the session's single live region, so this
 * surface is presentation only.
 */

interface AlertRegionProps {
  progress: DrillProgress;
}

export function AlertRegion({ progress }: AlertRegionProps) {
  const { stage, alertIndex, betweenBeats } = progress;

  if (stage === "idle") {
    return <p className="deck-alert__quiet">{deckCopy.alerts.quiet}</p>;
  }
  if (stage === "done") {
    return <p className="deck-alert__quiet">{deckCopy.alerts.quietAfterDrill}</p>;
  }
  if (stage === "settling") {
    return <p className="deck-alert__quiet">{deckCopy.alerts.settling}</p>;
  }
  if (stage === "residual") {
    return (
      <p className="deck-alert__quiet">{deckCopy.alerts.residual.kicker}</p>
    );
  }

  const alert = drillAlerts[alertIndex];
  return (
    <motion.p
      key={`${alert.beat}${betweenBeats ? "-resolved" : ""}`}
      className="deck-alert"
      data-severity={alert.severity}
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={deckSpringSoft}
    >
      <span className="deck-alert__lamp" aria-hidden="true" />
      <span className="deck-alert__word">
        {deckCopy.alerts.severity[alert.severity]}
      </span>
      <span className="deck-alert__label">{alert.label}</span>
      <span className="deck-alert__plain">
        {betweenBeats ? alert.resolved : alert.plain}
      </span>
    </motion.p>
  );
}

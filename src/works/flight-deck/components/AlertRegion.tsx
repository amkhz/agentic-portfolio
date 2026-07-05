import { deckCopy } from "@core/works/flight-deck/copy";
import { drillAlerts, type DrillProgress } from "@core/works/flight-deck/drill";

/**
 * The alert region, top center (master-caution position: aviation puts
 * it at the top of the scan). One line, always, in a row reserved at
 * the posted size, so the bench never reflows and the quiet state stays
 * a whisper inside the same height. A posting speaks at instrument
 * scale with a severity-lit lamp.
 *
 * Presentation only: the posting choreography (the bench's one-breath
 * exhale, the alert bloom, the lamp's --emit hold and its release on
 * resolution) is a choreographed event and belongs to DeckSession's
 * authored GSAP lane (ADR-017 D4), which targets these class names.
 * Announcements ride the session's single live region.
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

  // Keyed per beat only: resolution swaps the plain line for the
  // resolved line in place, so the lamp's held emission can be released
  // by a tween instead of a remount.
  const alert = drillAlerts[alertIndex];
  return (
    <p className="deck-alert" data-severity={alert.severity} key={alert.beat}>
      <span className="deck-alert__lamp" aria-hidden="true" />
      <span className="deck-alert__word">
        {deckCopy.alerts.severity[alert.severity]}
      </span>
      <span className="deck-alert__label">{alert.label}</span>
      <span className="deck-alert__plain">
        {betweenBeats ? alert.resolved : alert.plain}
      </span>
    </p>
  );
}

import { deckCopy } from "@core/works/flight-deck/copy";

/**
 * The first-watch brief (phase 7, Justin's ask: a first-time visitor
 * has no way to know the arc). It rides the dormant wake overlay, the
 * pre-flight placard moment, because the deck boots with routes
 * already on the bench: there is no quiet review space to teach from,
 * and a tour overlay would break the piece's fiction. Once flying, the
 * deck teaches in place (status line, captions, procedures that tick
 * themselves); the drill and the slider introduce themselves.
 */
export function StandingOrders() {
  return (
    <div className="deck-orders js-wake-copy">
      <p className="deck-intent__label">{deckCopy.orders.kicker}</p>
      {deckCopy.orders.lines.map((line) => (
        <p key={line} className="deck-orders__line">
          {line}
        </p>
      ))}
    </div>
  );
}

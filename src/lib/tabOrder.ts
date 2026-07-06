/**
 * Explicit tab-order membership for every interactive element on the
 * site (portfolio entry + Perihelion Archive).
 *
 * Safari honors the macOS keyboard-navigation setting (off by
 * default: System Settings -> Keyboard -> "Keyboard navigation") and
 * skips native buttons, links, and sliders on Tab, visiting only
 * text-field-like controls. An explicit tabindex attribute opts an
 * element back into Safari's tab order (verified live 2026-07-05 on
 * the Flight Deck, PR #194). Chromium browsers tab natively
 * regardless, and the attribute changes nothing there.
 *
 * The Flight Deck keeps its own copy (src/works/flight-deck/
 * components/deckTab.ts) per ADR-017 D2 self-containment; this is the
 * single source for everything else. Guard test: tabOrder.test.ts.
 */
export const SITE_TAB = 0;

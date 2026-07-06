/**
 * Explicit tab-order membership for every deck control.
 *
 * Safari honors the macOS keyboard-navigation setting (off by
 * default: System Settings -> Keyboard -> "Keyboard navigation") and
 * skips native buttons, links, and sliders on Tab, visiting only
 * text-field-like controls. The deck has none, so in Safari Tab found
 * nothing at all and escaped to the browser chrome. An explicit
 * tabindex attribute opts an element back into Safari's tab order
 * (verified live 2026-07-05: probe page + the fixed deck). Chromium
 * browsers tab natively regardless, and the attribute changes nothing
 * there. The deck is designed to be operated, so every control opts
 * in.
 *
 * Radio groups use the roving pattern (checked ? DECK_TAB : -1), which
 * mirrors the native one-stop-per-group contract everywhere while
 * keeping the checked radio reachable under Safari's policy.
 */
export const DECK_TAB = 0;

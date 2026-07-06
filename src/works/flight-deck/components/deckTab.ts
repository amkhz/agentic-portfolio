/**
 * Explicit tab-order membership for every deck control.
 *
 * macOS browsers with the system keyboard-navigation setting off (the
 * default: System Settings -> Keyboard -> "Keyboard navigation") skip
 * native buttons, links, and sliders on Tab and only visit text
 * fields. The deck has no text fields, so Tab found nothing at all and
 * escaped to the browser chrome. An explicit tabindex attribute opts
 * an element back into the tab order under that policy (verified live
 * on Safari, Chrome, and Comet, 2026-07-05). The deck is designed to
 * be operated, so every control opts in.
 *
 * Radio groups use the roving pattern (checked ? DECK_TAB : -1), which
 * mirrors the native one-stop-per-group contract everywhere while
 * keeping the checked radio reachable under the macOS policy.
 */
export const DECK_TAB = 0;

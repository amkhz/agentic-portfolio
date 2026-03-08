# ADR-004: Last.fm Integration Architecture

**Date:** 2026-03-07
**Status:** accepted
**Deciders:** Justin Hernandez, Tyrell (agent)

## Context

The portfolio needed a way to show personality beyond static project work. Music is a consistent part of Justin's creative practice, and Last.fm scrobble data provides a low-friction, always-on signal of what he is listening to. The integration needed to follow the four-layer architecture strictly, add zero new auth complexity, and degrade gracefully when the API is unavailable or environment variables are missing.

Several constraints shaped the approach:

- **No OAuth flows.** A portfolio site should not ask visitors to authenticate anything, and the build pipeline should not manage token refresh.
- **Minimal network overhead.** Scrobble data updates at human pace, not machine pace. Polling faster than every 30 seconds wastes bandwidth for no visible benefit.
- **Architecture compliance.** The Investiture Doctrine requires that types live in core/, API calls live in services/, and components in src/ only render data. No shortcuts.

## Decision

Integrate Last.fm's `user.getRecentTracks` endpoint as a live NowPlaying widget in the site header, with strict four-layer separation:

| Layer | File | Responsibility |
|-------|------|----------------|
| **Core** | `core/content/lastfm.ts` | Pure type definitions: `Track` and `NowPlayingData`. No imports, no side effects. |
| **Services** | `services/lastfm.ts` | `fetchNowPlaying()` function. Builds the API URL, fetches from Last.fm, parses the response into core types. All external communication lives here. |
| **UI (hook)** | `src/lib/useNowPlaying.ts` | Polling hook. Calls the service on a 30-second interval, pauses when the tab is hidden via `document.visibilitychange`, and retains the last good response on error. |
| **UI (component)** | `src/components/interactive/NowPlaying.tsx` | Renders the widget. Inverted tab design hanging below the header, expand/collapse via `grid-template-rows` animation, frosted glass backdrop matching the header. |

### Polling strategy

- **30-second interval** via `setInterval`, with a `document.hidden` guard so background tabs do not fire requests.
- **Visibility resume:** When the tab regains focus, `visibilitychange` triggers an immediate poll to refresh stale data.
- **Error resilience:** On fetch failure, the hook keeps displaying `lastGoodData` from a `useRef`. The widget never flashes empty due to a transient network error.

### Environment variables

Two `VITE_`-prefixed variables are required: `VITE_LASTFM_API_KEY` and `VITE_LASTFM_USER`. Both are configured on Vercel for all environments (production, preview, development). If either is missing, the service call will fail and the widget simply does not render.

### API key exposure

The Last.fm API key is embedded in client-side code via `import.meta.env`. This key is read-only with no write access to the Last.fm account. The risk is minimal: an attacker could make read requests against the same public scrobble data that Last.fm already exposes on the user's profile page. A future improvement is to proxy requests through a Vercel serverless function to remove the key from client bundles entirely.

### UI design

- **Inverted tab** positioned absolutely below the header, right-aligned on desktop, centered on mobile.
- **Collapsed state** shows equalizer bars and a "Now listening" / "Last listened" label.
- **Expanded state** reveals album art, track name (with DecryptedText animation on change), artist, and a link to the Last.fm profile.
- **Expand/collapse** uses `grid-rows-[0fr]` to `grid-rows-[1fr]` transition for smooth height animation without JavaScript measurement.
- **Frosted glass** via `bg-bg-elevated/80 backdrop-blur-md`, matching the header treatment.

## Consequences

**Positive:**

- Adds live personality to the site without any user interaction or auth flow required
- Demonstrates clean service layer architecture: the component knows nothing about fetch, URLs, or API shape
- Zero new dependencies: uses native `fetch`, `setInterval`, and `document.visibilitychange`
- Graceful degradation: if the API is down, env vars are missing, or the user has no recent tracks, the widget simply does not render

**Negative:**

- Client-exposed API key, though the risk is low (read-only, public data)
- 30-second polling adds minor but continuous network overhead for every visitor
- `backdrop-blur` does not render on the expanded panel content due to `overflow-hidden` on the grid animation wrapper (known visual limitation)
- The widget depends on Last.fm's uptime and API availability, which is outside our control

## Alternatives Considered

**Spotify API** -- Rejected. Requires OAuth 2.0 authorization code flow with PKCE or server-side token refresh. The token expires every hour. Far too much auth machinery for a portfolio widget that displays one line of text.

**Server-side proxy from day one** -- Deferred, not rejected. Proxying through a Vercel serverless function would hide the API key and allow response caching. Since the Last.fm key is read-only and the scrobble data is already public on the user's profile, the added complexity is not justified yet. This is the natural next step if the key scope changes or rate limiting becomes an issue.

**WebSocket / Server-Sent Events for real-time updates** -- Rejected. Last.fm scrobbles are written when a track finishes or at defined intervals. The data changes at most every few minutes. A persistent connection adds infrastructure complexity (WebSocket server or SSE endpoint) for no perceptible improvement over 30-second polling.

**Footer placement instead of header** -- Rejected. The header is the first thing visitors see, and the inverted tab design creates a distinctive visual element that hangs naturally from the navigation bar. Footer placement would bury the widget below the fold on most pages and miss the opportunity for the tab interaction pattern.

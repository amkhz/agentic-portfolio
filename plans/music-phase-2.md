# Feature: Music Phase 2 -- The Archive, The Selector, The Lounge

> Dreamer output from 2026-07-06 session. Successor to `plans/archive/lastfm-music-integration.md` (Tier 1 shipped; this plan supersedes its Tier 1.5/2/3 sections). Four tracks, one shared foundation.

## Summary

Turn twenty years of scrobbles (Last.fm since 2005) into an agent-accessible archive, then spend it three ways: a flagship "Twenty Years of Listening" portfolio experience, a DJ set-building workflow with rekordbox and Serato exports, and a virtual hi-fi listening lounge inhabited by music-reactive avatars.

## Context

- Tier 1 (NowPlaying widget) is live; ADR-004 governs it. The API key is still client-side; the serverless proxy was deferred, not rejected. It gets folded in here.
- The roadmap's infrastructure section already names the direction: "Last.fm MCP server first. Pattern extends to other data sources."
- The Sound case study establishes the story: 20+ years of listening history, "I wanted to share it and use it for my own wild ideas."
- Prior art exists (community last.fm MCP servers, e.g. rianvdm/lastfm-mcp). Ours differs on purpose: archive-first (full local history, not live-API-only), DJ-workflow-aware (local library cross-reference), and a portfolio artifact demonstrating the agent-directing practice.

## The shared foundation: archive-first

Everything downstream needs more than the live API can comfortably serve. A 20-year history is ~1,000+ paginated `user.getRecentTracks` calls; mining and aggregation over it should never hammer Last.fm per question.

**Decision (proposed, needs ADR at Mission A start):** a one-time backfill + incremental sync writes the full scrobble history to a local SQLite archive. The MCP server reads the archive for history questions and hits the live API only for now-playing and discovery (similar artists/tracks, tag search). Consumers:

| Consumer | Reads via |
|----------|-----------|
| Agents (Claude Code, DJ workflow) | MCP tools |
| Portfolio flagship (Track B) | Build-time JSON aggregates exported from the archive |
| Lounge (Track D) | Live `/api/lastfm` proxy for now-playing + baked aggregates for the room's memory |

**Repo location:** separate repo, `~/projects/lastfm-mcp` (working name). The projects workspace convention is one repo per project, the portfolio repo is a Vite app not a monorepo, and a standalone repo is the stronger portfolio artifact (own README, installable, linkable from The Sound). Ratify via invest-adr.

---

## Track A -- Mission 1: the Last.fm MCP server

**Stack:** TypeScript, `@modelcontextprotocol/sdk`, STDIO transport first (local Claude Code / Cursor use). SQLite via `better-sqlite3`. HTTP transport is a later option if remote use ever matters.

**Scope:**
1. Sync engine: full-history backfill (rate-limited, resumable) + incremental sync command
2. The ten tools already spec'd in the archived plan (now_playing, recent_tracks, top artists/tracks/albums, loved_tracks, weekly_chart, similar artists/tracks, tag search)
3. Archive-powered tools the live API cannot answer well: `get_listening_stats` (era summaries, first-plays, streaks), `find_forgotten_favorites` (heavy rotation then silence), `get_era_snapshot` (what a month/year sounded like)
4. Resources + prompts per the original spec
5. Aggregate exporter: `lastfm-mcp export --for portfolio` writes the JSON the flagship consumes

**Fold-in (portfolio repo, small separate PR, can ship immediately):** Vercel serverless function `api/lastfm.ts` proxying `user.getRecentTracks`; `services/lastfm.ts` points at `/api/lastfm`; `VITE_LASTFM_*` env vars become server-side `LASTFM_*`. Closes ADR-004's deferred item. Layer impact: services/ + new api/ dir; core types and the widget untouched.

## Track B -- Mission 2: "Twenty Years of Listening" (flagship portfolio experience)

The portfolio currently looks at one track; this looks at two decades. A Conservatory-native data experience built from baked archive aggregates (zero client API calls, zero runtime cost beyond its route chunk).

**Candidate forms (pick during /shape, they compose):**
- Genre constellation: the site already speaks constellation; listening data as a star map is the natural dialect (clusters = genres, stars = artists, brightness = play count)
- Eras timeline: twenty years as seasons; what dominated each stretch of life, wave-driven reveal
- Rediscovery shelf: loved-then-forgotten tracks resurfaced, pulling the visitor into the personal register

**Route/home:** extends The Sound's orbit (likely `/work/the-sound` deepening or a dedicated surface; decide at shape). Design via `/shape` first, then tokens -> core -> services -> src. Imagery restraint doctrine applies; motion through the craft skills; wave-driven mandate applies.

**Perf guard:** mobile INP investigation is active (plans/lighthouse-perf-followup.md). The flagship must be route-split, static-data-driven, and add zero JS to existing routes.

## Track C -- The Selector: DJ set-building workflow (riff, ready to shape)

Agent-driven set building on top of the MCP server. Working name "The Selector" (sound-system culture; Justin names it).

**The workflow:**
1. **Brief** -- Justin states intent: occasion, length, energy arc ("Sunday morning, deep and warm, 90 minutes, peak at 70%")
2. **Mine** -- agent works the archive: loved tracks, era snapshots, tag filtering, forgotten favorites, then expands via live similar-track/tag discovery for fresh candidates
3. **Cross-reference** -- candidates are matched against the *local* DJ library. This is the elegant move: Serato and rekordbox have already analyzed BPM and key on Justin's actual files. serato-tools (Python, PyPI) reads the Serato database and crates directly; rekordbox exports its collection XML. Last.fm has no BPM/key data; Justin's own library does. Only playable tracks make the set; each arrives with real BPM/key.
4. **Sequence** -- harmonic ordering (Camelot adjacency), BPM arc against the requested energy curve, tension/release notes
5. **Deliver** -- three artifacts: rekordbox XML playlist (verified: rekordbox 7 imports via Preferences -> Advanced -> rekordbox xml), Serato crate written directly via serato-tools (m3u8 + Lexicon as fallback bridge), and a set-notes markdown (why each transition works, mix-in points)
6. **Iterate** -- Justin reacts track-by-track; agent re-mines with the feedback

**Shape open question:** skill vs. companion CLI in the lastfm-mcp repo. Leaning: thin crew skill orchestrating MCP tools + a small `selector` export module in the repo (the .crate/XML writers live next to the archive). The Serato writer is Python (serato-tools); everything else TS. Also surfaces the Tier 3 "library cross-reference" idea for free (scrobbled-but-not-owned report).

## Track D -- The Lounge: virtual hi-fi listening room (concept, needs its own shape cycle)

Tier 1.5 "ambient influence" grown up: not the site reacting to music, but a *place* where the music lives. A virtual hi-fi lounge / club: a rendered room, a system playing what Justin scrobbles, and digital avatars who inhabit it and react to the sound.

**The concept sketch:**
- The room runs on the NowPlaying signal: Justin scrobbles, the lounge's "system" is playing that track
- Avatars: the crew as inhabitants (Tyrell, Roy, Joi, Gaff, the Dreamer, the Writer...) -- they live there, idle, chat-posture, and *react* when the music moves (genre shifts the lighting register; energy moves their behavior)
- Visitors arrive as guests, not operators: presence, atmosphere, maybe leave a mark (guestbook-as-request-slip)
- Audio reality: full tracks are not licensable. 30-second previews (iTunes Search API, free, proxied through our serverless layer) run through a Web Audio AnalyserNode for *genuine* audio-reactivity, behind an opt-in sound toggle per the ADR-017 grammar. Silent mode falls back to metadata-driven mood (tags + BPM/key from the Track C library bridge)

**Placement (open question, my lean stated):** Works 02 at `/w/the-lounge` (name TBD). ADR-017's ratified template is nearly a prebuilt chassis: full-bleed standalone route outside LabLayout, per-work scoped OKLCH tokens (a club palette without touching Conservatory or Reading Room), two-lane motion rule, mobile decline card, per-work performance budget, and Tone.js already sanctioned with opt-in audio. The honest tension: Works pieces are chartered as Archive-research-derived (colophon links to source guides); the lounge is personal practice. Resolving it means a small charter amendment (ADR: Works pieces may also derive from documented personal practice, with The Sound as the colophon's source line) or homing it on the portfolio instead, which would mean rebuilding ADR-017-grade isolation there from scratch. My lean: Works 02 + amendment.

**Tech direction (validate at shape):** React Three Fiber v9 (React 19 compatible) + drei for the scene and avatars (stylized low-poly, DRACO-compressed GLTF; custom, not Ready Player Me -- the crew should look like ours). ogl (installed) stays an option if the scene proves simpler than expected. Whole experience lazy-chunked per D6 discipline. WCAG: full keyboard traversal of the space's interactive points, reduced-motion = static room with live metadata, captions for anything audio conveys.

**This track gets its own Dreamer -> /shape -> ADR cycle before any code.** It is the biggest lift and the least defined; it should not block Tracks A-C.

## Sequencing

```
Now:        A fold-in (API proxy PR, portfolio repo)        -- small, immediate
Mission 1:  A (lastfm-mcp repo: sync + archive + tools)     -- unblocks everything
Mission 2:  B (flagship, portfolio)  <- needs A's aggregates
Parallel:   C shape session          <- needs A's tools; exports need no portfolio work
Parallel:   D shape + ADR cycle      <- independent of B/C; build after B ships
```

## Layer Impact (portfolio repo only; lastfm-mcp is its own house)

- design-system/: Track B may add flagship-scoped tokens; Track D per-work tokens under `src/works/<slug>/` per ADR-017 D2
- core/: Track B baked aggregates (`core/content/` or `core/music/`), types; Track D works manifest entry
- services/: `api/lastfm.ts` proxy + `services/lastfm.ts` retarget (fold-in); preview-audio proxy later (Track D)
- src/: Track B flagship components (route-split); Track D lounge under the lab app's Works pattern

## Dependencies

- lastfm-mcp repo: `@modelcontextprotocol/sdk`, `better-sqlite3`, `zod` (tool schemas); Python `serato-tools` + `mutagen` for the Serato writer (Track C)
- Portfolio: none for A/B beyond what exists. Track D proposes `three` + `@react-three/fiber` + `@react-three/drei` inside the lounge's lazy chunk only -- must earn its place at the D shape session per VECTOR.md's soft constraint

## Accessibility Requirements

- Flagship: keyboard-completeness for any interactive viz (Safari tab-policy lesson from PR #194/#195 applies), reduced-motion static variants, no color-only encoding of listening data, AA contrast in both modes
- Selector: terminal/skill workflow, standard
- Lounge: opt-in audio only, captions/transcript equivalence for audio-driven meaning, reduced-motion room, keyboard traversal, decline card on mobile

## Open Questions

1. **Lounge placement:** Works 02 with a charter amendment, or portfolio-side? (My lean: Works 02.)
2. **Selector shape:** crew skill + export module in lastfm-mcp (my lean), or standalone CLI?
3. **Flagship form:** constellation, eras timeline, rediscovery shelf, or a composition? Decide at `/shape`.
4. **MCP repo name:** `lastfm-mcp` is the working name; Justin may want something with more character.

## Handoff

- First action: fold-in proxy PR (portfolio), then invest-adr for the archive-first + separate-repo decision, then invest-crew to scope Mission 1.
- Track B starts with `/shape`; implementation order tokens -> core -> services -> UI; finish with `/audit`.
- Track D returns to the Dreamer with `/shape` before anything else.
- Director: pitch-worthy angles -- an MCP server as portfolio artifact; the local-library BPM/key bridge; crew avatars inhabiting a rendered space.

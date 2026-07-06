# Mission: lastfm-mcp Server (Music Phase 2, Mission 1)

**Feature:** Justin (and his agents) can query twenty years of listening history in milliseconds: a standalone MCP server over a local SQLite archive, with live Last.fm access for now-playing and discovery, and a versioned JSON exporter feeding the portfolio flagship.
**Date:** 2026-07-06
**Doctrine source:** ADR-018, plans/music-phase-2.md, portfolio VECTOR.md/ARCHITECTURE.md/CLAUDE.md (consumption contracts only; the new repo authors its own doctrine in T1)

## Constraint Check

- **Cross-repo boundary (ADR-018):** every task in this mission lives in `~/projects/lastfm-mcp`. Nothing here touches the portfolio repo. Portfolio-side consumption of aggregates is Mission 2.
- **Aggregate schema is a public contract (ADR-018):** the exporter's JSON carries a `schemaVersion` from its first commit. Breaking it later breaks the portfolio build.
- **Workspace convention:** new repo ships Investiture doctrine (VECTOR.md, CLAUDE.md, ARCHITECTURE.md) from day one; the four-layer pattern adapts to a headless server (proposed: `core/` pure logic + schema, `services/` Last.fm HTTP client, `server/` MCP transport + tool registration, `cli/` sync + export commands). T1 ratifies or amends this.
- **Portfolio visual constraints (OKLCH, type, motion) do not apply** -- headless server, no UI surfaces.
- **Rate-limit courtesy:** backfill and sync must be rate-limited and resumable; hammering Last.fm violates the spirit of the free read-only API this whole arc depends on.
- **Not in scope:** Serato/rekordbox export modules (Track C), portfolio flagship (Mission 2), HTTP transport (later option per ADR-018).

No doctrine violations found.

## Tasks

### T1: Repo scaffold and doctrine
**Layer:** repo root (new repo `~/projects/lastfm-mcp`)
**Owner:** Tyrell
**Branch:** `feat/scaffold`
**Commit prefix:** `chore:`
**Inputs:** None -- can start immediately
**Outputs:** Buildable empty repo: package.json (TypeScript strict, vitest, eslint), tsconfig, layer directories, VECTOR.md + CLAUDE.md + ARCHITECTURE.md (layer model ratified), .env convention (`LASTFM_API_KEY`, `LASTFM_USER`), README stub, git init + GitHub repo `amkhz/lastfm-mcp` (private until Justin flips it)
**Scope boundary:** This task does NOT implement any sync, tool, or schema logic; no dependencies beyond dev tooling and the four runtime packages installed unused.

### T2: Archive schema and pure aggregation core
**Layer:** `core/` (new repo)
**Owner:** Tyrell
**Branch:** `feat/core-archive`
**Commit prefix:** `feat:`
**Inputs:** T1 (repo exists, layer model ratified)
**Outputs:** SQLite schema + migrations (scrobbles, artists, albums, tracks, sync_state; indices on timestamp/artist/track), typed data model, pure aggregation functions (era rollups, top-N by period, streak/gap detection, first-play detection) with tests
**Scope boundary:** This task does NOT call the Last.fm API, register MCP tools, or write CLI commands. Pure logic + storage schema only.

### T3: Last.fm API client
**Layer:** `services/` (new repo)
**Owner:** Tyrell
**Branch:** `feat/lastfm-client`
**Commit prefix:** `feat:`
**Inputs:** T1
**Outputs:** Typed client for user.getRecentTracks (paginated), getTopArtists/Tracks/Albums, getLovedTracks, getWeeklyChartList/getWeeklyTrackChart, artist.getSimilar, track.getSimilar, tag.getTopArtists/TopTracks; built-in rate limiter (~4 req/s ceiling) and retry-with-backoff; fixture-based tests
**Scope boundary:** This task does NOT persist anything, know about SQLite, or expose MCP tools. HTTP + parsing into core types only.

### T4: Sync engine (backfill + incremental)
**Layer:** `cli/` (new repo)
**Owner:** Tyrell
**Branch:** `feat/sync-engine`
**Commit prefix:** `feat:`
**Inputs:** T2 (schema), T3 (client)
**Outputs:** `lastfm-mcp sync --full` (resumable backfill: page cursor persisted in sync_state, safe to interrupt across ~1,000+ pages) and `lastfm-mcp sync` (incremental since last scrobble); progress reporting; idempotent upserts
**Scope boundary:** This task does NOT define new schema (migrations belong to T2) or touch MCP registration.

### T5: MCP server -- tools, resources, prompts
**Layer:** `server/` (new repo)
**Owner:** Tyrell
**Branch:** `feat/mcp-server`
**Commit prefix:** `feat:`
**Inputs:** T2 (archive reads), T3 (live calls)
**Outputs:** STDIO server registering: live tools (`get_now_playing`, `find_similar_artists`, `find_similar_tracks`, `search_by_tag`), archive tools (`get_recent_tracks`, `get_top_artists`, `get_top_tracks`, `get_top_albums`, `get_loved_tracks`, `get_weekly_chart`), archive-only tools (`get_listening_stats`, `find_forgotten_favorites`, `get_era_snapshot`), the profile/weekly-report resources, and the four spec'd prompts; zod schemas on every tool; graceful "archive empty -- run sync" errors
**Scope boundary:** This task does NOT implement aggregation math (imports it from core/) or sync logic. Registration, validation, and wiring only.

### T6: Portfolio aggregate exporter
**Layer:** `cli/` (new repo)
**Owner:** Tyrell
**Branch:** `feat/aggregate-exporter`
**Commit prefix:** `feat:`
**Inputs:** T2 (aggregation core)
**Outputs:** `lastfm-mcp export --for portfolio --out <dir>` writing versioned JSON (`schemaVersion: 1`): per-year era rollups, all-time top artists/tracks/albums, genre/tag distributions, first-plays timeline, loved-tracks index; schema documented in README and validated by a test fixture
**Scope boundary:** This task does NOT write into the portfolio repo or decide the flagship's visual form. It produces files; Mission 2 consumes them.

### T7: Integration pass -- real backfill, agent registration, docs
**Layer:** repo root (new repo)
**Owner:** Tyrell (build) then Roy (review)
**Branch:** `feat/integration`
**Commit prefix:** `chore:`
**Inputs:** T4, T5, T6
**Outputs:** Full backfill of Justin's real account completed; server registered in Claude Code (`.mcp.json` in the projects workspace) and answering all thirteen tools live; first real aggregate export generated and eyeballed; README complete (install, sync, tool reference, aggregate schema); lint/build/test green
**Scope boundary:** This task does NOT add features. Integration, verification, and documentation only.

## Execution Order

**Immediately:** T1
**After T1 (parallel):** T2, T3
**After T2 + T3 (parallel):** T4, T5
**After T2:** T6 (parallel with T4/T5)
**After T4 + T5 + T6:** T7

**Critical path:** T1 → T2 → T4 → T7 (4 sequential tasks)

## Done State

This mission is complete when:
- `lastfm-mcp sync --full` has ingested Justin's complete history (scrobble count sanity-checked against the Last.fm profile) and survives interruption/resume
- All thirteen tools answer correctly in a live Claude Code session; archive tools answer without network access
- `export --for portfolio` emits schema-versioned JSON that validates against its fixture
- The new repo's own lint/build/test gates pass; doctrine files ratified
- Roy has reviewed against this manifest and ADR-018
- Mission recorded: roadmap exploration #4 updated, memory updated

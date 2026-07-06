# ADR-018: Archive-First Last.fm Data Architecture in a Standalone MCP Repo

**Date:** 2026-07-06
**Status:** accepted
**Deciders:** Justin Hernandez (direction); drafted by Tyrell via invest-adr

## Context

Music Phase 2 (`plans/music-phase-2.md`) commits to three consumers of Justin's Last.fm listening data: a flagship "Twenty Years of Listening" portfolio experience, an agent-driven DJ set-building workflow, and a virtual listening-lounge concept. The data spans 20+ years of scrobbles (since 2005), which the Last.fm API serves only as ~1,000+ paginated `user.getRecentTracks` calls. The portfolio's doctrine declares it a pure client-side SPA with no backend and no database (VECTOR.md "What This Is Not"); the sole standing exception is the thin serverless proxy governed by ADR-004. Without a decision, each consumer would improvise its own data access, and the heavy machinery would gravitate into the portfolio repo where doctrine forbids it. The roadmap already names the direction ("Last.fm MCP server first. Pattern extends to other data sources"); this ADR fixes its shape.

## Decision Drivers

- **The portfolio stays a static SPA** (VECTOR.md hard posture): no runtime data dependencies beyond the ADR-004 proxy, no database, no Node-only packages in the app repo.
- **No heavy dependencies in the portfolio** (VECTOR.md soft constraint): SQLite drivers, MCP SDK, and sync tooling must not enter its dependency tree.
- **One repo per project** (projects-workspace convention): the portfolio is explicitly "not a monorepo"; sibling projects get sibling repos.
- **API practicality:** full-history questions ("what did 2011 sound like?") cannot be answered tolerably by live pagination on every ask; Last.fm rate limits and courtesy both demand fetch-once-mine-many.
- **Reuse across three consumers:** the flagship, the Selector (DJ workflow), and the Lounge must read the same data through contracts, not copy-pasted fetch logic.
- **Portfolio-artifact value:** a standalone, installable MCP server with its own README is itself a public proof of the agent-directing practice.

## Options Considered

### Option A: Live-API-only MCP server (no archive)

An MCP server whose tools call the Last.fm API directly on every invocation.

**Pros:**
- No sync engine, no storage layer; smallest initial build.
- Data is always current; no freshness discipline needed.

**Cons:**
- Full-history questions are practically unanswerable (minutes of pagination per ask, repeated on every ask).
- Every agent mining session re-downloads the same twenty years; hostile to rate limits and slow for the DJ workflow's iterative loops.
- The flagship would need its own separate data path anyway, splitting the architecture this ADR exists to unify.

### Option B: Archive-first inside the portfolio repo (`packages/` or `tools/`)

The sync engine, SQLite archive, and MCP server live in a subdirectory of agentic-portfolio.

**Pros:**
- One repo to clone; aggregates land next to their consumer with no handoff.
- Shared TypeScript types between server and portfolio without publishing.

**Cons:**
- Converts the portfolio into a de facto monorepo against workspace convention and the "not a template, not a backend" doctrine posture.
- Drags `better-sqlite3`, the MCP SDK, and Node-only tooling into a static SPA's tree (soft constraint violation with no offsetting need).
- The server's identity as a standalone artifact dissolves into a subfolder.

### Option C: Archive-first in a standalone repo with defined consumption contracts (chosen)

A new sibling repo (`~/projects/lastfm-mcp`, working name) houses the sync engine, the SQLite archive, and the MCP server. Tools read the archive for history; only now-playing and discovery (similar artists/tracks, tag search) hit the live API. Consumers read through three contracts: MCP tools (agents), exported build-time JSON aggregates (portfolio flagship), and the ADR-004 proxy (live now-playing surfaces).

**Pros:**
- Fetch once, mine forever: history questions answer in milliseconds from SQLite; Last.fm sees one backfill plus incremental syncs.
- Portfolio doctrine intact: its only new inputs are static JSON files checked in at build time.
- The server is a real, publishable portfolio artifact and a daily tool; the pattern extends to future data sources.
- Each consumer's contract is independently testable and versionable.

**Cons:**
- Cross-repo coordination: the aggregate JSON handoff needs a versioned schema and a refresh ritual.
- Archive freshness lags the live feed between syncs; consumers must tolerate or declare staleness.
- A second repo to maintain, release, and document.

## Decision

**We will build Option C: an archive-first Last.fm data platform in the standalone `lastfm-mcp` repo, consumed through three defined contracts.**

The portfolio's static-SPA posture and the workspace's repo-per-project convention rule out Option B; the DJ workflow's iterative mining and the flagship's twenty-year aggregations rule out Option A. The deciding driver is reuse: three planned consumers, one archive, contracts instead of copies.

## Consequences

**Positive:**
- The flagship ships with zero runtime data dependencies: aggregates are computed offline and committed like any other content.
- Archive-only tools (era snapshots, listening stats, forgotten favorites) become possible; they have no live-API equivalent.
- Agent sessions and the Selector iterate against local data at local speed.
- The repo doubles as public evidence of the practice the portfolio narrates.

**Negative:**
- Forecloses live-computed history on portfolio surfaces; anything the flagship shows must be bakeable at build time (now-playing remains live via ADR-004's proxy).
- The aggregate schema is a cross-repo API: breaking it breaks the portfolio build, so it must be versioned from the first export.
- The SQLite archive is local, personal data outside any deploy pipeline; backup is Justin's responsibility (the sync engine makes re-derivation possible but slow).

**Neutral:**
- Transport starts STDIO-only (local Claude Code / Cursor); an HTTP transport is a later option, not a commitment.
- The repo name `lastfm-mcp` is a working title; renaming before first publish is free.
- This ADR lives in the portfolio's decision log because the portfolio is the deciding house; the new repo will carry its own doctrine files per Investiture convention.

## Related Decisions

- ADR-004: Last.fm integration architecture -- unchanged; its proxy remains the live now-playing contract, now with the key server-side (2026-07-06 amendment).
- ADR-009: Lab subdomain architecture -- untouched; no new build entries.
- ADR-017: Perihelion Works arm -- context only; if the Lounge lands as Works 02, its data access follows this ADR's contracts.

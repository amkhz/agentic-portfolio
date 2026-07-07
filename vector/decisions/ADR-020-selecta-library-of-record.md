# ADR-020: The Archive Becomes the Library of Record (Selecta Architecture)

**Date:** 2026-07-06
**Status:** accepted
**Deciders:** Justin Hernandez (direction, all picks); drafted by Tyrell via invest-adr

## Context

Music Phase 2's Track C (`plans/music-phase-2.md`) commits to an agent-driven DJ set-building workflow, now named **Selecta** and fully planned in `plans/selecta.md` (2026-07-06 session). The workflow needs what Last.fm cannot provide: BPM, key, and file paths from Justin's real DJ library (Serato database, rekordbox collection XML, 6000+ digital tracks) so that only playable tracks make a set, plus a way to match archive-mined and discovery-invented candidates against that library. ADR-018 chartered the lastfm-mcp archive for scrobbles; without a decision here, library data would either live in a second store (splitting identity from the listening history) or get re-parsed ad hoc every session (matching quality never compounds). This ADR fixes where library data lives, how Selecta composes, and where the one cross-language dependency sits.

## Decision Drivers

- **Matching must compound:** fuzzy artist/track resolution (the issue #10/#11 family: name variants, feat. suffixes) is expensive to get right; a correct match resolved once must stay resolved.
- **The not-owned join is a core feature:** "scrobbled heavily but absent from the crates" requires scrobbles and library rows in the same queryable store.
- **Judgment stays with the agent** (Justin's pick, board 4): sequencing for narrative and tension-release is the craft being practiced and taught; code referees, it does not author.
- **Gear flexibility** (Justin's pick, board 2): Serato is primary today, but a rekordbox migration must be a config flip, not a schema rewrite.
- **lastfm-mcp doctrine holds:** four layers (core/services/server/cli), SQL only in the archive service, pure math in core/, TypeScript-first.
- **Repo may go public:** personal set data and taste data must stay out of git by construction.

## Options Considered

### Option A: Skill-only, no repo changes

A crew skill parses the Serato DB and rekordbox XML ad hoc each session with scratch scripts.

**Pros:**
- Zero build cost; starts immediately.

**Cons:**
- Re-derives parsing every session; fragile against Serato DB quirks.
- No persistent match table: every set re-pays the fuzzy-matching tax, and confirmations evaporate.
- No not-owned join, no shared machinery for Nibiru or future consumers.

### Option B: Standalone CLI pipeline

A `selecta` command runs brief-to-deliverables end to end, deterministically.

**Pros:**
- Testable, scriptable, no session state.

**Cons:**
- Sequencing and taste flatten into heuristics, or a model call hides inside a CLI; either way the conversational track-by-track iteration loop (the point of the workflow) dies.
- Teaching, which Justin explicitly wants built in, has no conversational surface.

### Option C: Separate library database beside the archive

Library tables in their own SQLite file; the archive stays scrobbles-only.

**Pros:**
- ADR-018's archive stays untouched; independent migration cadence.

**Cons:**
- The not-owned report and match table become cross-database joins or duplicated identity logic.
- Two stores describing one music self; the Discogs collection (issue #13) would make it three.

### Option D: One house -- archive extension + thin skill + repo machinery (chosen)

The ADR-018 SQLite archive grows `library_tracks` (per-source rows from Serato and rekordbox, raw key + normalized Camelot, config-driven `analysis_precedence` defaulting to Serato) and `track_matches` (persistent scrobble-to-library matching; `confirmed` rows survive rebuilds). Selecta composes as a thin crew skill in `lastfm-mcp/.claude/skills/selecta/` (intake, mining, sequencing judgment, teaching, iteration) over deterministic machinery in the repo: MCP tools (`match_tracks`, `get_library_track`, `find_not_owned`, `score_transition`, `validate_set`) and CLI commands (`library import`, `library status`, `set export`). The single Python dependency (serato-tools crate writer) is a PEP 723 single-file script run via `uv run`, subprocess-called from the TypeScript CLI.

**Pros:**
- One queryable music self: plays, files, and (via issue #13, same pattern) vinyl; every join is local SQL.
- Matching compounds: import-time precomputed table for the static join, query-time tool for session-invented candidates, confirmations persistent.
- Skill = judgment, tools = referees, CLI = deterministic I/O: the agent sequences, code keeps it honest, and the teaching layer lives where the conversation is.
- Discogs (#13) and the lounge export (#12) already follow this exact shape; Selecta is the second citizen of the pattern, not a new one.

**Cons:**
- Schema version bump and migration in lastfm-mcp; the archive is no longer scrobbles-only.
- Two languages in one repo (bounded to one Python file, one boundary).
- MCP tool ergonomics become load-bearing for set quality.

## Decision

**We will build Option D: extend the ADR-018 archive into the library of record and compose Selecta as a thin skill over repo machinery.**

Option A is ruled out by the matching-must-compound driver, Option B by the judgment-stays-with-the-agent driver, and Option C by the not-owned join. The deciding insight is that the archive's job was never "scrobbles"; it was Justin's listening identity, and the library and collection are facets of the same identity.

## Consequences

**Positive:**
- Vinyl surfacing (owned-on-vinyl badges in hybrid sets) becomes a config-and-join follow-up when #13 lands, not a design event.
- The scrobbled-but-not-owned report and the set-notes acquire list come nearly free.
- A future rekordbox gear migration is `ANALYSIS_PRECEDENCE=rekordbox,serato` and nothing else.
- The vibe lexicon and match confirmations make Selecta better every set, durably.

**Negative:**
- Forecloses a fully deterministic pipeline: sets are unreproducible without the conversation (the set directory's brief, rounds log, and notes are the record instead).
- lastfm-mcp takes on `uv` as a runtime expectation for crate export (m3u8 fallback keeps exports functional without it).
- Read-only posture against the libraries must be enforced forever: the only writes are new .crate files and `sets/` output; the Serato DB and rekordbox collection are never mutated.

**Neutral:**
- `sets/` and the vibe lexicon are gitignored personal data; the public flip stays clean.
- No auto-sequencer in v1; a beam-search `suggest_order` is deferred until first drafts feel slow, and adding it later contradicts nothing here.
- This ADR lives in the portfolio's decision log because the portfolio is the deciding house (same convention as ADR-018); implementation detail lives in `plans/selecta.md` and the lastfm-mcp issues.

## Related Decisions

- ADR-018: Archive-first Last.fm data architecture -- extended, not amended; the three consumption contracts stand, and Selecta reads through the MCP-tools contract.
- ADR-019: Aphelion third arm -- shares fuel: issue #13 (Discogs) feeds both Nibiru's record wall and Selecta's vinyl surfacing.
- ADR-004: Last.fm integration -- untouched; Selecta never touches portfolio surfaces.

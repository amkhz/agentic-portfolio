# Mission: Selecta (Music Phase 2, Track C, Mission 1)

**Feature:** Justin briefs an agent in his own vibe language and gets back a playable DJ set: mined from 21 years of scrobbles plus live discovery, cross-referenced against his real Serato/rekordbox library for BPM and key, sequenced with harmonic math as referee, delivered as rekordbox XML + Serato crate + coaching set notes, and iterated slot-by-slot. Selecta teaches the craft as it works.
**Date:** 2026-07-06
**Doctrine source:** ADR-020, `plans/selecta.md`, lastfm-mcp ARCHITECTURE.md/CLAUDE.md/VECTOR.md (all tasks land in `~/projects/lastfm-mcp`; this manifest lives in the portfolio per Mission 1 convention)

## Constraint Check

- **Cross-repo boundary:** every task lives in `~/projects/lastfm-mcp`. Nothing touches the portfolio, Perihelion, or Aphelion.
- **Read-only against the libraries (ADR-020):** readers never mutate the Serato database or rekordbox collection. The only writes anywhere are new `.crate` files and `sets/` output. First crate write happens against a backed-up `_Serato_` directory (T8).
- **lastfm-mcp layer doctrine holds:** SQL execution only in `services/`, pure math and schema DDL in `core/`, registration only in `server/`, argument parsing only in `cli/`. Import direction: server/cli -> services -> core.
- **Personal-data posture:** `sets/` and `selecta/lexicon.yaml` are gitignored from the first commit that could create them (T1 owns the `.gitignore` edit; no other task touches it). Test fixtures are synthetic library rows, never Justin's real files or listening data.
- **No new unthrottled network path:** Selecta adds zero new fetch code; discovery rides the existing rate-limited client.
- **Python boundary refinement (sanctioned deviation from plans/selecta.md wording):** the plan names a Python "crate writer." Reading the Serato binary database in TS would mean hand-porting a binary format, so the single Python file becomes `tools/serato_bridge.py` with two subcommands (`read-db` emits JSON to stdout, `write-crate` writes a crate file), PEP 723 inline deps (`serato-tools` pinned), run via `uv run`, subprocess-called from services/cli. Same boundary, one file, two verbs. `uv` becomes a documented runtime expectation for Serato features only; rekordbox import and m3u8/XML export work without it.
- **Schema migration convention:** append-only `MIGRATIONS[]`, `SCHEMA_VERSION` bump, idempotent DDL (existing repo convention).
- **Not in scope:** Discogs sync (#13 is its own thread; vinyl surfacing is the S5 fast-follow), `suggest_order` auto-sequencer, cue-hint accuracy tuning beyond the honest-estimate v1, any portfolio/Nibiru consumption.

No doctrine violations found.

## Tasks

### T1: Library schema, key normalization, archive queries
**Layer:** `core/` + `services/` (schema DDL is core; query execution is services -- they must change together)
**Owner:** Tyrell
**Branch:** `feat/library-schema`
**Commit prefix:** `feat(library):`
**Inputs:** None -- can start immediately
**Outputs:** Migration adding `library_tracks` (per-source rows, unique `(source, file_path)`, raw key + `key_camelot` columns) and `track_matches` (with `method` and `confirmed_at`; `confirmed` rows survive rebuilds) per plans/selecta.md data model; `core/library/keyNotation.ts` normalizing classical (Am), Camelot (8A), and Open Key to Camelot with tests; `LibraryTrack`/`TrackMatch` types; archive-service queries (per-source replace-import, lookups, `ANALYSIS_PRECEDENCE` resolution helper, config default `serato,rekordbox`); `.gitignore` entries for `sets/` and `selecta/lexicon.yaml`
**Scope boundary:** This task does NOT read Serato or rekordbox files, do fuzzy matching, register tools, or add CLI commands. Schema, key math, and queries only. No other task edits `.gitignore` or migration files.

### T2: Library readers (Serato bridge + rekordbox XML)
**Layer:** `services/` (+ the single Python file at `tools/serato_bridge.py`)
**Owner:** Tyrell
**Branch:** `feat/library-readers`
**Commit prefix:** `feat(library):`
**Inputs:** T1 (LibraryTrack type, key normalizer)
**Outputs:** `tools/serato_bridge.py` (`read-db` subcommand: Serato database V2 -> JSON on stdout; PEP 723 header pinning serato-tools; `uv run` invocation wrapped in a services/ subprocess module with a clear "install uv" error); rekordbox collection XML reader in TS (DJ_PLAYLISTS format -> LibraryTrack rows); both readers normalize keys via T1 and never write to source libraries; synthetic-fixture tests for both
**Scope boundary:** This task does NOT write to the archive (returns rows; T6 persists via T1's queries), does NOT implement `write-crate` (that verb ships in T6's PR even though the file is created here -- stub the subcommand), and does NOT touch matching.

### T3: Matching -- normalizers, match table, precomputed build
**Layer:** `core/` + `services/`
**Owner:** Tyrell
**Branch:** `feat/matching`
**Commit prefix:** `feat(matching):`
**Inputs:** T1 (tables, types)
**Outputs:** `core/matching/` pure normalizers (case, feat./ft., remaster and edition suffixes, `&`/`and` -- the issue #10 dedupe family grown up) and a confidence-scored fuzzy matcher (algorithm is implementer's call, decided by tests against realistic name variants); services/ match-table build (incremental at import time, `confirmed` rows preserved) and query-time candidate matching used later by the `match_tracks` tool; not-owned query (scrobble-weighted, unmatched by the table)
**Scope boundary:** This task does NOT register MCP tools, read library files, or touch CLI. Pure matching logic + SQL only.

### T4: Sequencing referee -- Camelot/BPM math, arcs, set documents
**Layer:** `core/` (pure, disjoint from T1/T3 directories: `core/sequencing/`)
**Owner:** Tyrell
**Branch:** `feat/sequencing-core`
**Commit prefix:** `feat(sequencing):`
**Inputs:** None -- can start immediately (parallel with T1; imports only T1's key type once merged, coordinate at integration)
**Outputs:** Camelot wheel adjacency + key-compatibility scoring (including energy-boost moves), BPM compatibility with halftime/doubletime awareness (87 into 174 scores as valid), `scoreTransition` returning scores plus human-readable reasons, named arc shapes (slow burn, single peak, double peak, plateau, comedown) normalized to `(time%, energy%)` waypoints, `validateSet` (per-transition scores, arc deviation, clash flags, runtime vs target); `SetDocument`/`Brief`/`Slot` types matching the set directory format in plans/selecta.md; exhaustive tests (the referee must be trustworthy or the teaching layer teaches wrong)
**Scope boundary:** This task does NOT sequence anything (no ordering search, no `suggest_order`), does NOT touch SQL, tools, or CLI. Pure math and types only.

### T5: MCP tools -- registration and zod schemas
**Layer:** `server/`
**Owner:** Tyrell
**Branch:** `feat/selecta-tools`
**Commit prefix:** `feat(server):`
**Inputs:** T1 + T2 + T3 + T4
**Outputs:** Five tools registered: `match_tracks` (candidates in; matches with BPM/key/path/confidence plus unmatched remainder out), `get_library_track`, `find_not_owned`, `score_transition`, `validate_set`; zod input schemas on every tool; graceful "library empty -- run library import" errors mirroring the existing "archive empty" pattern
**Scope boundary:** This task does NOT implement matching or scoring logic (imports it), does NOT add CLI commands, does NOT alter the existing 13 tools.

### T6: CLI -- library import, library status, set export + writers
**Layer:** `cli/` (+ pure writer helpers in `core/export/`, + the `write-crate` verb in `tools/serato_bridge.py`)
**Owner:** Tyrell
**Branch:** `feat/selecta-cli`
**Commit prefix:** `feat(cli):`
**Inputs:** T1 + T2 (import path), T4 (set document types for export)
**Outputs:** `library import --source serato|rekordbox [--path <p>]` (idempotent per-source replace, triggers match-table rebuild, reports counts + match stats), `library status`; `set export --dir sets/<slug> [--cue-hints]` reading `set.yaml` and writing all three artifacts to `exports/`: rekordbox XML (DJ_PLAYLISTS, `file://` locations from library paths, playlist node `SELECTA/<set>`, memory cues named `SELECTA: mix window` only with `--cue-hints`), m3u8 (always, the Serato fallback bridge), and `.crate` via the bridge's `write-crate` (crate name `Selecta - <set>`; skipped with a warning when uv is absent); XML/m3u8 generation as pure tested functions in `core/export/`
**Scope boundary:** This task does NOT write set notes or any prose (the skill owns notes.md), does NOT touch MCP registration, and NEVER writes into the Serato database or rekordbox collection -- new crate files and `exports/` only.

### T7: The Selecta skill
**Layer:** `.claude/skills/selecta/` (create-only; no source files)
**Owner:** Tyrell
**Branch:** `feat/selecta-skill`
**Commit prefix:** `docs(skill):`
**Inputs:** Tool and CLI surfaces as spec'd in plans/selecta.md (can be drafted in parallel; verified against reality in T8)
**Outputs:** SKILL.md encoding the full flow (door detect: brief/vibe/seed/**hand-picked** (Justin's tracks matched then pre-locked in round-zero slots) -> guided intake with teaching -> mine -> bridge -> sequence with referee tools -> present -> slots-and-locks iteration -> export -> close with lexicon update); the teaching register (plain language first, term second, defined on first use; coaching depth per board 4: rationale + mix-in guidance + technique when earned + per-set glossary); set directory format (brief.yaml, set.yaml, rounds.md, notes.md, board.html, exports/); vibe lexicon format (learned parameters PLUS exemplar tracks) and update ritual including the explicit **teach move** ("call these jungle riddims" -- during intake, mid-round, or standalone outside any set; exemplars seed similar-track discovery when the phrase is used); references/ for the Camelot wheel primer and notes.md template
**Scope boundary:** This task does NOT touch core/, services/, server/, or cli/. Skill documentation only. Tool names and CLI flags must match T5/T6 exactly -- deviations reported, not improvised.

### T9: The set board -- local HTML view (added 2026-07-06, Justin's ask)
**Layer:** `core/export/` (pure HTML generation) + `cli/` (`set view`)
**Owner:** Tyrell
**Branch:** `feat/set-board`
**Commit prefix:** `feat(board):`
**Inputs:** T4 (set document types, scores), T6 (CLI patterns, export hook)
**Outputs:** Pure, tested `renderBoard(setDocument, brief, scores) -> string` in `core/export/` producing a single self-contained `board.html` (inline CSS/JS, no CDN, no framework, works via file://): brief header, target-arc SVG with actual sequenced energy overlaid, ordered slot cards (artist/track, BPM, Camelot badge, lock state, vinyl badge post-#13), transition connectors colored by referee score with coach reasons attached, runtime bar, acquire list; `set view --dir sets/<slug>` CLI command regenerating and opening it; `set export` also regenerates the board so the finished artifact ships with its visual
**Scope boundary:** This task does NOT add interactivity that mutates set state (read-only board; clickable lock/cut is a parked v2 needing a local server), does NOT touch the skill, MCP tools, or any writer from T6, and adds zero dependencies.

### T8: Integration -- real import, first set with Justin, docs, review
**Layer:** repo root
**Owner:** Tyrell (build) then Roy (review)
**Branch:** `feat/selecta-integration`
**Commit prefix:** `chore:`
**Inputs:** T5 + T6 + T7
**Outputs:** Back up `_Serato_`, then real import of both libraries (6000+ tracks; per-source counts and match-rate stats reported); not-owned report eyeballed against known gaps; all five tools answering in a live session; **first end-to-end set built with Justin in the room** (his brief, his reactions, real export imported into rekordbox 7 and visible in Serato -- this is the acceptance test and the first teaching session); README updated (library import, Selecta section, uv expectation, set directory format); lint/build/test green; Roy reviews against this manifest and ADR-020; deviations logged
**Scope boundary:** This task does NOT add features. Integration, verification, documentation, review only.

## Execution Order

**Immediately (parallel):** T1, T4
**After T1 (parallel):** T2, T3
**After T2+T3+T4 (parallel):** T5, T6, T7 (T7 may draft earlier; it gates on nothing but verifies in T8)
**After T6 (parallel with T7/T5 tail):** T9
**After T5+T6+T7+T9:** T8

**Critical path:** T1 -> T2 -> T6 -> T8 (4 sequential tasks; matches Mission 1's shape)

**Worktree pattern (proven in Mission 1):** each parallel task in its own `git worktree add ../lastfm-mcp-wt-tN -b feat/<slug> origin/main`; waves 2 and 3 are create-only against existing files wherever possible (T1 pre-creates the shared touchpoints: migration, `.gitignore`, barrel exports left for T8); commit+push in one command chain; PR per task; T8 wires the seams. Brief every agent with: doctrine pointers (lastfm-mcp ARCHITECTURE.md, ADR-020, plans/selecta.md), exact deliverables, scope boundary, finish protocol, and "report deviations with reasons."

## Done State

This mission is complete when:
- `library import` has ingested Justin's real Serato and rekordbox libraries; per-source rows retained; precedence resolves per config; re-import is idempotent
- The match table reports its build stats; `find_not_owned` answers with plausible, spot-checked results; a confirmed match survives a rebuild (tested)
- `score_transition` and `validate_set` pass exhaustive fixture tests including halftime/doubletime and named-arc normalization
- A real set exists in `sets/`: built conversationally through `/selecta`, exported, **imported into rekordbox 7 and visible in Serato**, with notes.md carrying full coaching and a glossary, and its board.html rendering the finished set in a browser
- `sets/` and the lexicon are demonstrably untracked (`git status` clean after a set)
- lastfm-mcp gates green; Roy has reviewed against this manifest and ADR-020
- Mission recorded: roadmap + music-phase-2.md pointers updated, memory updated, handoff section appended

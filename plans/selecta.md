# Selecta -- the DJ set-building workflow

> Planning record from the 2026-07-06 Fable deep-planning session. Governs the build. ADR-020 is the architecture charter; `plans/music-phase-2.md` Track C is the ancestor. All decisions below are Justin's picks from four riff boards; nothing here should need re-deciding at build time.

## What this is

**Selecta** (sound-system culture: the selecta chooses the records; the deejay works the mic) is an agent-driven DJ set-building workflow on top of the lastfm-mcp archive. Justin briefs it in his own vibe language ("funky Mizell grooves", "nighttime bangers", "Zamrock, fuzzy guitars"), the agent mines 21 years of scrobbles plus live discovery, cross-references his real library for BPM and key, sequences with harmonic math as referee, delivers rekordbox XML + a Serato crate + coaching set notes, and iterates track-by-track until the set is right.

Load-bearing framing: **Justin is newer to DJing and wants Selecta to teach as it works.** The coaching layer is a feature, not a mode. Plain language first, term second, defined on first use.

## Locked decisions (2026-07-06)

1. **Name: Selecta.** Skill invocation `/selecta`. The agent selects; Justin plays.
2. **Architecture: one house.** A thin crew skill at `lastfm-mcp/.claude/skills/selecta/` is the brain (intake, mining, sequencing judgment, iteration, teaching). Deterministic machinery ships in the lastfm-mcp repo: library tables in the same SQLite archive, CLI import, new MCP tools, export writers. The one Python piece (Serato .crate writer via `serato-tools`) is a single script with PEP 723 inline deps run via `uv run`, subprocess-called from the CLI. Everything else TypeScript.
3. **Library bridge:**
   - Sources: Serato database (via serato-tools semantics) and rekordbox collection XML in v1; Discogs collection joins via lastfm-mcp issue #13 as the vinyl fast-follow.
   - **Serato is primary via config, not constant.** `analysis_precedence` (default `serato,rekordbox`) decides which source's analysis wins when the agent asks for one answer per track. Per-source rows are always retained; a future rekordbox gear migration is a one-line config flip.
   - Both raw key notation and normalized Camelot are stored for every library row.
   - **Matching is both precomputed and query-time.** An import-time job builds a scrobble-to-library match table (fast joins over 221k scrobbles x 6000+ tracks; powers the not-owned report). A query-time `match_tracks` MCP tool covers candidates invented at session time by discovery. Confirmed matches persist forever: a fuzzy case resolved once ("Knxwledge" vs "KNXWLEDGE") stays resolved.
   - **v1 is digital.** Vinyl is a surfacing layer, not a separate mode: once #13 lands, candidates carry an owned-on-vinyl badge so hybrid sets can flag what can be dropped from the shelf.
   - **Scrobbled-but-not-owned report ships in v1** (one query once the tables exist), and set notes carry an acquire list: tracks the agent wanted for the set that Justin does not own.
4. **Intake: guided hybrid with teaching built in.** Conversational riff plus a light interview that teaches the lingo as it goes; never gates on knowing a term. Justin's vibe vocabulary is the first-class input; the skill translates it into archive queries (tags, similar artists, eras, energy inference).
   - **Three doors, one engine:** brief-first ("Sunday morning, 90 minutes"), vibe-first ("deep psychedelic and Latin grooves"), seed-first ("pull up that jazz song from last Saturday" -- an archive query, confirmed with Justin, set built outward from the anchor).
   - **Persistent vibe lexicon.** What "nighttime banger" turned out to mean is learned from keeps and cuts and stored, so translation compounds across sets like the match table does.
5. **Energy arc: named shapes.** Small vocabulary (slow burn, single peak, double peak, plateau, comedown) plus freeform bends ("single peak but late"), normalized internally to `(time%, energy%)` waypoints the validator checks against. Raw waypoints remain accepted input.
6. **Sequencing: agent sequences, code referees.** The math ships as code; the order is the agent's. Code provides Camelot adjacency and key-compatibility scoring, BPM compatibility with halftime/doubletime awareness (87 into 174 is a valid liquid move), `score_transition` with reasons, and `validate_set` against the arc. Deliberate rule-breaks are allowed and must be named in the notes. No auto-sequencer in v1; a beam-search `suggest_order` is deferred until first drafts feel slow.
7. **Iteration: slots and locks.** The set is numbered slots. Justin reacts in plain language ("cut 4, more like 7, keep the opener"); keeps lock, cuts open their slot, "more like N" seeds that slot's re-mine. Only open slots re-mine; transitions re-validate around every change. The set directory is the state, so any set is resumable days later.
8. **Deliverables per set:** rekordbox XML playlist (import validated: Preferences -> Advanced -> rekordbox xml), Serato .crate written directly (m3u8 always written as the fallback bridge), and set-notes markdown with **full coaching**: per-transition rationale in plain language, where to bring the next track in, what to listen for, one technique note when it earns its place, plus a per-set lingo glossary (terms defined at first use).
9. **Cue hints: per-set opt-in, labeled estimates.** Off by default. When requested, the rekordbox XML carries memory cues named `SELECTA: mix window`. Positions are duration/phrase estimates, not beat-accurate; accuracy gets tested on the real library before the feature is trusted, and it gets dropped without regret if it annoys.
10. **Sets live at `lastfm-mcp/sets/`, gitignored.** Personal listening data stays out of git so the public flip stays clean. The vibe lexicon is gitignored for the same reason. Iteration history lives in the set doc's round log, not git.

## Data model (new tables, same SQLite archive)

Extends the ADR-018 archive; migrations follow the existing append-only `MIGRATIONS[]` convention with a `SCHEMA_VERSION` bump.

- **`library_tracks`** -- one row per track per source. Columns: `id`, `source` (`serato` | `rekordbox`), `source_track_id`, `artist`, `track`, `album`, `duration_s`, `bpm`, `key_raw`, `key_camelot`, `file_path`, `date_added`, `imported_at`. Unique on `(source, file_path)`. Import is idempotent re-import (replace per source).
- **`track_matches`** -- normalized scrobble identity `(artist_norm, track_norm)` to `library_track_id`, with `confidence`, `method` (`exact` | `fuzzy` | `confirmed`), `confirmed_at`. Rebuilt incrementally at import; `confirmed` rows survive rebuilds.
- **Config:** `ANALYSIS_PRECEDENCE` (default `serato,rekordbox`), `SELECTA_SETS_DIR` (default `./sets`). Env/config, never hardcoded.
- Crate/playlist import from Serato is out of scope for v1 (taste signal lives in the archive already); revisit only if set quality wants it.

## Tool and CLI surface

New MCP tools (server/ layer, math and SQL below them per doctrine):

| Tool | Purpose |
|------|---------|
| `match_tracks` | candidates in, matches out with BPM/key/path/confidence + the unmatched remainder |
| `get_library_track` | full analysis detail for one owned track |
| `find_not_owned` | scrobbled heavy, absent from the library (min plays, optional window) |
| `score_transition` | key score, BPM score, combined score, human-readable reasons |
| `validate_set` | ordered entries + arc in; per-transition scores, arc deviation, clash flags, runtime vs target out |

CLI commands: `library import --source serato|rekordbox [--path <p>]`, `library status`, `set export --dir sets/<slug> [--cue-hints]`. Export reads the set doc and writes all three artifacts; the Python crate writer runs inside it via `uv run`.

Division of labor: **skill = judgment, CLI = deterministic I/O, tools = queries and referees.**

## Set directory format

```
sets/YYYY-MM-DD-<slug>/
  brief.yaml    # normalized brief: door, occasion, length, format, arc (shape + waypoints), anchors, avoids, leanings, freshness
  set.yaml      # slots: position, artist, track, library_track_id, bpm, key_camelot, locked, source (archive|discovery), vinyl (post-#13)
  rounds.md     # round-by-round log: reactions, what re-mined, what changed
  notes.md      # final set notes (coaching deliverable)
  exports/      # <slug>.xml, <slug>.crate, <slug>.m3u8
```

`notes.md` structure: tracklist table up top (slot, artist, track, BPM, key, badges), per-transition coaching, per-set glossary, acquire list.

## The skill flow

1. **Door detect** -- brief, vibe, or seed; seed-first resolves the memory against the archive and confirms.
2. **Guided intake** -- riff plus at most a couple of gap questions; teach terms as they come up; consult the vibe lexicon.
3. **Mine** -- archive tools (loved, era snapshots, forgotten favorites, top lists) + live discovery (similar tracks/artists, tags), weighted by the freshness dial.
4. **Bridge** -- `match_tracks` everything; unmatched wanted tracks go to the acquire list; matched arrive with real BPM/key.
5. **Sequence** -- agent orders for narrative and tension-release, consulting `score_transition`, then `validate_set` before presenting.
6. **Present** -- tracklist with plain-language why per transition; flag any deliberate rule-break.
7. **Iterate** -- slots and locks until Justin calls it.
8. **Export** -- `set export`, plus cue hints only if asked.
9. **Close** -- write `notes.md`, update the vibe lexicon from keeps/cuts, log the round history.

## Build phases (each lands as normal PRs in lastfm-mcp)

- **S0** -- schema migration + library import (both readers, precedence config) + `library status`
- **S1** -- matching: normalizers in core/ (the issue #10 dedupe family grows up), match-table build, `match_tracks` + `get_library_track` + `find_not_owned`
- **S2** -- sequencing referee: Camelot/BPM math in core/, `score_transition` + `validate_set`
- **S3** -- writers + `set export`: rekordbox XML (+ opt-in cue hints), m3u8, uv-run Python crate writer
- **S4** -- the skill: SKILL.md, set directory format, vibe lexicon, teaching register; first real set end to end
- **S5 (fast-follows)** -- vinyl surfacing on #13, cue-hint accuracy pass on the real library, `suggest_order` only if drafts feel slow

## Constraints

- **Read-only against the libraries.** Selecta never mutates the Serato database or rekordbox collection; the only writes are new .crate files into Subcrates and files under `sets/`. First crate write happens against a backed-up `_Serato_` directory.
- lastfm-mcp four-layer doctrine holds: SQL only in services/archive, pure math in core/, tools in server/, commands in cli/. `serato-tools` version pinned.
- Discovery calls ride the existing rate-limited client; no new unthrottled path.
- Personal-data posture: `sets/` and the lexicon are gitignored; nothing personal ships if the repo goes public.
- Key normalization covers the notations in the wild: classical (Am), Camelot (8A), and Open Key.

## Open for build (implementer's calls, non-blocking)

- Fuzzy match algorithm (trigram vs token-set ratio) -- S1 call, decided by tests against real library names
- m3u8 path style for Serato compatibility -- validate on first export
- Cue-hint position math -- S3 spike, honest about accuracy in the marker name

## Session log

- 2026-07-06: Fable deep-planning session. Four boards riffed (name + architecture; library bridge; brief + loop; sequencing + deliverables). All decisions locked as Justin's picks, including two course corrections that improved the design: teaching-first guided intake with vibe vocabulary as the primary input, and vinyl as a surfacing layer rather than a mode. ADR-020 chartered, mission manifest generated via invest-crew (`vector/missions/selecta-mission-1.md`), machinery filed as lastfm-mcp issues #14 (S0), #15 (S1), #16 (S2), #17 (S3), #18 (S4); #13 gates the vinyl fast-follow.

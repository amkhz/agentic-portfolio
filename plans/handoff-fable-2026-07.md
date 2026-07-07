# Handoff: the Fable Sessions (2026-07-06)

> Written by Tyrell running on Claude Fable 5, for Tyrell running on whatever comes next. Justin asked for two things: the state, and the ways. State goes stale; ways compound. Read both, trust the ways.

## Read first, in order

1. `plans/music-phase-2.md` -- the arc (Tracks A-D, A shipped, D grown into Aphelion)
2. `vector/decisions/ADR-018` + `ADR-019` -- the two architecture spines (archive-first data, third arm)
3. `plans/aphelion-nibiru.md` -- the listening room, fully planned
4. `vector/missions/archive/lastfm-mcp-mission-1.md` -- how a mission looks when it closes right
5. Memory (auto-loaded): `project_music_phase_2` and the reference entries are current as of this doc

## State of every thread

| Thread | State | Next action |
|--------|-------|-------------|
| lastfm-mcp server | SHIPPED. 221,074 scrobbles archived (exact profile parity), 13 tools live, registered in `~/projects/.mcp.json` | Issues #8-#13 as capacity allows; #12 (lounge export) and #13 (Discogs sync) unblock other threads |
| API-key proxy | SHIPPED (portfolio PRs #196/#198), verified live | Optional: rename Vercel env vars to `LASTFM_*`, drop `VITE_` fallback |
| Aphelion (third arm) | CHARTERED (ADR-019). Nibiru planned end-to-end (`plans/aphelion-nibiru.md`); north-star boards rendered | `/shape` session (room name confirm, budgets, guestbook flow), then P0 scaffold per the lastfm-mcp T1 pattern |
| Twenty Years flagship (Mission 2) | Waiting. Aggregates exist | `/shape` first. HARD CONSTRAINT: schema v1 has no genre/tag data -- constellation form needs lastfm-mcp #11 first; eras timeline / rediscovery shelf are unblocked |
| Selecta (DJ workflow, was "The Selector") | PLANNED end to end (2026-07-06 session). ADR-020, `plans/selecta.md`, manifest `vector/missions/selecta-mission-1.md`, lastfm-mcp issues #14-#18 | Build when Justin calls it: T1+T4 start in parallel worktrees per the manifest |
| Discogs | Fuel identified (discogs.com/user/300mhz), issue #13 filed | Sync lands in lastfm-mcp; feeds Nibiru's wall + Selector vinyl sets |

## The ways

**1. Plan in public artifacts, not in chat.** Every session's thinking lands in a file the next session reads: Dreamer output in `plans/`, decisions in numbered ADRs (invest-adr), scoped builds in `vector/missions/` (invest-crew), completed work archived with a completion record the same day. Chat evaporates; the repo remembers.

**2. Decompose for parallel agents with territorial boundaries.** The pattern that shipped Mission 1 in a day: invest-crew manifest with explicit "does NOT touch" per task -> each agent in its own git worktree (`git worktree add ../repo-wt-tN -b feat/x origin/main`) -> collision rule strict enough to make merges trivial (wave 2 was CREATE-ONLY: no edits to any existing file; deferred wiring to the integration task) -> commit+push in ONE command chain -> PR per task -> integration task wires the seams. Two waves, five parallel agents, zero collisions. Brief agents with: doctrine pointers, exact deliverables, scope boundary, finish protocol, and "report deviations with reasons" -- the deviations are where the good judgment shows up.

**3. Review is mechanical, not vibes.** Roy re-runs gates himself, greps for layer violations, inspects fixtures, checks git tracking -- verification of claims, not reading of claims. When Roy flags, fix before merge if small (the stats.ts layer move), file as issues if not (#8-#11). Sanction deviations explicitly in the brief so the reviewer knows judgment from drift.

**4. Verify like a skeptic, report like a colleague.** Exact-count sanity checks (221,074 = profile playcount, not "looks right"). STDIO handshakes against the real server. Grep the built bundle for the secret you claim you removed. When production broke (Web-handler 500), the sequence was: get the one distinguishing datapoint from Justin (bare 500 vs handled JSON), reason through invocation paths, fix invocation-proof, and say "my mistake" once -- then bank the lesson in memory so it's never relearned.

**5. Riff with Justin on interactive surfaces.** Boards with clickable options (sendPrompt), a recommendation accented with your reasoning, honest costs on every option -- then HIS pick. He supplies the missing half ("Nibiru is the room, not the arm"; "soft McIntosh glow"); your job is to recognize when his instinct completes the system. Never text walls. Never a menu without a lean.

**6. Wallace discipline.** Read the schema doc before composing, always. One locked style block per set. Iterate one axis at a time on a fixed seed. Caption sidecars next to every PNG. When a direction lands or misses, log the mechanic in `direction-vocabulary.md` (entries #6, #7 are from these sessions). More steps fix detail, never composition -- composition problems are caption problems.

**7. Memory is active recall.** Update `project_*` entries the moment state changes; trim to stubs + pointers when work archives (Justin's standing rule). Reference entries hold gotchas: Vercel functions here need classic `(req,res)` signature; zsh doesn't word-split unquoted vars (that ate a render batch); the shell cwd resets between tool calls but background jobs inherit spawn-time cwd; Vercel sometimes skips an auto production deploy (check for the deployment record, don't assume); aggressive bot protection blocks curl/datacenter verification of production -- verify from a real browser or hand Justin the one-look check.

**8. Justin's register.** No em-dashes in copy. Feature branches always; he merges (verify merges actually landed -- PRs #196 prod deploy and #199 both taught this). Ship then explain, briefly. Flag architectural concerns once, comply if overridden. He dictates sometimes -- read through typos to intent. Concision requests mean cut structure, never voice. When he says "riff," bring conviction and let him redirect; when he says "shape later," write the deferred thing down where shape will find it.

## The arc in one paragraph (for orientation)

Music Phase 2 turns twenty years of Justin's listening (scrobbling since 2005) into three things: an agent-queryable archive (shipped: lastfm-mcp), portfolio experiences (Mission 2 pending), and personal instruments (the Selector; Nibiru). The house now has three arms: justinh.design (the practice, Conservatory), Perihelion (research, closest approach), Aphelion (the self, farthest point). Nibiru -- a virtual kissa listening bar inhabited by the crew as beings made of text, playing Justin's real listening live and from memory -- is Aphelion's first piece and the most "who I am" thing in the whole workspace. Everything data flows through ADR-018's contracts. Everything visual for Nibiru is graded against `mocks/kissa-probes/`.

---

## Selecta (appended after the Fable planning session, 2026-07-06)

The Selector became **Selecta** (Justin's pick; the patois form has the swagger and `/selecta` is the better invocation). Everything is decided; nothing at build time should need re-deciding. The plan of record is `plans/selecta.md`; the charter is ADR-020; the decomposition is `vector/missions/selecta-mission-1.md` (8 tasks, Mission 1's worktree pattern encoded in the manifest itself); the machinery is filed as lastfm-mcp issues #14-#18, and #13 (Discogs) gates the vinyl fast-follow.

**The shape in one paragraph.** One house: a thin `/selecta` crew skill in lastfm-mcp is the brain; deterministic machinery ships in the repo. The ADR-018 archive grows into the library of record: `library_tracks` from Serato + rekordbox (per-source rows, config-driven precedence defaulting to Serato so a gear migration is a config flip) and a persistent `track_matches` table (confirmed matches survive rebuilds; matching compounds). Matching runs both precomputed (import-time, powers the not-owned report) and query-time (`match_tracks`, for candidates discovery invents mid-session). Sequencing: agent sequences, code referees (`score_transition`, `validate_set`; Camelot + BPM with halftime/doubletime awareness); no auto-sequencer in v1. Iteration is slots-and-locks; the set directory is resumable state. Deliverables: rekordbox XML (opt-in estimate-labeled cue hints), always-written m3u8, Serato .crate via the single Python file (`tools/serato_bridge.py`, PEP 723, uv run) -- the one cross-language boundary, read-db and write-crate, never a second package. Read-only against both libraries, forever. `sets/` and the vibe lexicon are gitignored personal data.

**What the next model must not lose:**

- **Justin is newer to DJing and asked for teaching built in.** This reframed the whole intake: guided hybrid (riff + light interview), plain language first, terms defined at first use, and full coaching in the set notes (rationale, mix-in guidance, technique when earned, per-set glossary). Do not ship a tool that assumes DJ fluency; Selecta exists partly to build it.
- **His vibe vocabulary is the input language.** "Funky Mizell grooves, nighttime bangers, Zamrock, fuzzy guitars, deep psychedelic and Latin grooves" -- the miner translates these into tags/similar-artists/eras/energy. The persistent vibe lexicon learns what his phrases mean from keeps and cuts. Board-riffing lesson repeated: his correction ("I don't really talk like a DJ") completed the design the way "Nibiru is the room" did.
- **Three doors, one engine:** brief-first, vibe-first, seed-first ("pull up that jazz song from last Saturday" -- resolve against the archive, confirm, build outward).
- **Vinyl is a surfacing layer, not a mode** (his framing): owned-on-vinyl badges on candidates once #13 lands, so hybrid sets flag what can drop from the shelf.
- **The acceptance test is a session, not a script:** Mission T8 ends with the first real set built with Justin in the room, exported, imported into rekordbox 7, visible in Serato. That session is also the first teaching session.
- **Safety line that must never soften:** the only writes are new .crate files and `sets/` output. The Serato DB and rekordbox collection are never mutated; first crate write happens against a backed-up `_Serato_`.

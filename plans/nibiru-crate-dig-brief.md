# Nibiru, the Crate Dig: Ritual Brief

> Dreamer brief, 2026-07-24 (P3 opener). Seed = the P2''' riff. The glow lane closed 2026-07-23 (aphelion PR #12): the wall rests as faded memory, the era lens murmurs the years back. This brief shapes the next touch — pulling a record off the wall — and draws the data contract it needs from lastfm-mcp. Everything here respects the living-painting doctrine (`plans/nibiru-living-painting-brief.md`): nothing geometric moves except what the ritual animates, wave/spring only, browser is the only grading surface.

## 1. The ritual

The era lens taught the wall to answer a glance. The crate dig teaches it to answer a reach.

Hover an era and the lens already wakes it. **Press, and the keeper pulls a record from that shelf**: a sleeve slides out on a spring — up and toward you, the way a record actually leaves a crate — and settles into a presentation pose in the near field. The cover art arrives through the proxy; until it does (and whenever art misses), the walnut-black house sleeve carries the pull, stamp out.

Beside the sleeve, a card. **The card is the archive talking, never a wiki:**

> *Madvillainy · Madvillain*
> *You played this 214 times, mostly 2011, mostly after midnight.*
> *Not since March 2019.*

Every line is assembled from baked per-album stats in the archive's voice. No release dates, no personnel, no genre prose — the room only knows what you did with the record.

Then the fork: **put it back** (the sleeve returns on the same spring, same tempo, and the wall is whole) or **keep it out** — the keeper hangs it in the wall's picture frame, where it stays for the rest of the visit. The frame vessel and its art lane already exist (P2 `AlbumArtLayer`); the kept record simply takes precedence over the weekly-top hotlink for the session.

**Listen** rides the card as quiet deep links (v1); when Bottle Keep lands, the same affordance becomes the pour (v2, unchanged charter).

## 2. Choreography

| Beat | Motion | Notes |
|---|---|---|
| Pull | Sleeve quad born at the pointer's shelf position (era sampler gives the row; exact spine is the paint's illusion), springs out along a slight arc to presentation pose | Critically-damped, ritual-schedule idiom; the era's glow holds its lens-woken state while its record is out |
| Present | Sleeve at rest slightly off-center, card fades in beside it, one line at a time on a short stagger | Card = SleeveCaption lineage, multi-line; art crossfades onto the house sleeve when the proxy answers |
| Put back | Exact reverse, same spring constants | Putting back is the same care as pulling — never a faster exit, never a fade-to-gone |
| Keep | Sleeve springs to the frame, art seats in the vessel; card thanks and fades | Frame quad already graded; kept state is session-local v1 |
| Dealer's choice | Same pull choreography from whichever era owns the chosen record | See §5 |

Reduced motion: no travel — the presented sleeve and card crossfade in place; return is a crossfade; the wall never animates. All springs go through the existing rigs (`snapFades` for capture poses — the lens lane's lesson).

## 3. Reverence rules (doctrine)

1. **One record out at a time.** Pulling while one is out returns the current record first — full return choreography, then the new pull. No snatching, no stacking, no shelf of pulled records.
2. **Putting back is the same care as pulling.** Same tempo, same arc. There is no "dismiss".
3. **The room outranks the dig.** If the needle drops mid-pull, the ritual dim proceeds; the pulled record dims with the room and stays out. The dig never blocks the live layer, and never competes with it for light.
4. **The keeper pulls; you receive.** The pointer chooses an era, not a spine — in fiction the keeper knows the wall and hands you the record. This is also what makes painted spines honest: we never pretend the pixels under the cursor are the specific record.
5. **The wall stays whole.** No painted hole where the record "was" — the plate is a graded asset. The pulled sleeve exists in the live layer above it; the era's glow acknowledges the pull (its lens-woken light holds), which reads as the wall knowing.

## 4. The camera call: the wall serves alone (v1)

**Recommendation: no new shot.** The dig lives in the wall-of-years shot; the flip-bin s11 render stays banked.

- The graded wall master already *contains* flip bins in its near field — the "still being dug" era. The dig fiction is present in-frame without a cut.
- The era lens is already the gateway touch, in this shot, live on prod. Pull-on-press is its natural escalation; a camera cut between glance and reach would break the one continuous gesture.
- P1' taught that every new master is a full grading arc (composition rejections, registration, depth map). The ritual needs zero new paint — that's the whole living-painting dividend.
- If the dig ever wants its own room — leafing through bins rather than receiving from the keeper — the banked s11 becomes a P4 "deeper dig" shot with its own brief. Justin's call whether that door ever opens; nothing in v1 forecloses it.

## 5. Dealer's choice

A quiet affordance in the wall shot — proposed: pressing the **flip bins** (the newest era's trapezoid doubles as the "surprise me" surface), plus a keyboard-reachable control — asks the keeper to choose. The pull is weighted toward **forgotten favorites**, the house concept `find_forgotten_favorites` already defines: heavily played once, quiet since.

Weight is computed client-side from baked fields — `weight = plays × dormancyYears`, normalized, with a floor so nothing is unpullable — seeded per visit. Client-side keeps the export dumb and the tuning in DialKit (a dormancy-bias dial for the grading rounds, baked when Justin locks it).

## 6. The data contract (what needs lastfm-mcp)

`lounge.json` cannot carry this lane: its years hold top-5 albums each, and the card needs stats for *any* pullable record. **New export artifact, same lane as issue #12: `crate.json`** — a sibling under the same `AGGREGATE_SCHEMA_VERSION` discipline, built by `export --for lounge` (additive flag or sibling `--for crate`, implementer's choice).

**No MCP-at-build.** The CLI export precedent (bake at export time, commit the artifact) is the house lane; wiring MCP calls into aphelion's build would add a live dependency for data that changes only when the archive syncs.

### The crate

One entry per album with **≥ 25 lifetime plays** — 1,546 records against today's archive (17,547 distinct albums total; ≥50 would give 781). Twenty-five plays ≈ three full listens: the threshold for "this is a record you lived with," and it sizes the artifact right.

Per record (compact keys, bar-time bucketing via `core/bartime.ts`):

| Field | Feeds |
|---|---|
| artist, album | card title, art lookup, deep links |
| plays | "214 times" |
| top year + its share | "mostly 2011" |
| night share (plays landing 00:00–04:00 bar time) | "mostly after midnight" |
| first / last play (uts) | "not since March 2019", dealer dormancy |
| dominant era slot (0–5, the wall's rows) | which shelf the keeper pulls it from |

Estimated ~200 KB raw / **~50–80 KB gz**. Card copy renders client-side from thresholds (e.g. top-year share > .5 → "mostly 2011"; night share > .4 → "mostly after midnight"; dormancy > 2 y → the "not since" line) — the copy voice iterates in aphelion without re-exporting.

**Privacy call for Justin:** the crate is a 1,546-line listing of the collection with play stats, in a public repo — a step past the top-5 exposure of `lounge.json`. Precedent says yes (the Discogs collection is already public at discogs.com/user/300mhz; the wall *is* the archive made visible), but it's his line to draw. Raw scrobble rows still never leave, per doctrine.

### Cover art

**Not baked.** CDN URLs rot and the export shouldn't hold 1,500 of them. Runtime, frame-lane precedent: aphelion's proxy (`api/lastfm.ts`) gains one mode — `mode=albuminfo&artist=&album=` wrapping `album.getInfo` — and the card hotlinks the returned art. The existing placeholder-hash detection (`PLACEHOLDER_HASHES`, `services/nowPlaying.ts`) and the house sleeve carry every miss. Art loads only on pull: zero cost until the ritual is touched.

## 7. Listen: deep links v1, the pour v2

The card's last line. v1 links, in order of confidence:

1. **Last.fm album page** — canonical to the data, always resolvable from artist + album.
2. **Streaming search deep links** (Apple Music / Spotify search URLs) — optional, Justin picks which services belong on the card, if any.

No embeds, no players, no audio — the audio posture is unchanged. When Bottle Keep arrives (Tidal spike first, per the banked pile), the listen line becomes the pour and this section retires.

## 8. Accessibility

- The pull gets a **keyboard path**: the era-lens facts are already in an aria-live region; add a focusable control per the lens's cycle (arrow keys move eras, Enter pulls, Escape returns, K keeps). Pointer and keyboard drive the same FSM.
- The card is real text (it already must be — it's typographic by design); links are real anchors; the live region announces the card lines on present and the return on put-back.
- Reduced motion per §2. Focus is held on the card while a record is out; returning restores it to the wall control.

## 9. Performance budget

| Number | Note |
|---|---|
| Room chunk ≤ 250 KB gz | currently 247.80 — the dig mounts from a tiny trigger; **all ritual code is its own lazy chunk** (EraLens/liveArt pattern, est. 3–4 KB gz) |
| crate.json | lazy-fetched on first pull intent (era-lens hover arms a prefetch), never in any bundle; ~50–80 KB gz |
| Art | one proxy call + one image per pull, only on pull |
| Draw calls | +1 sleeve quad, +0 for the card (DOM) |
| First-visit total | unchanged — nothing loads until the wall is touched |

## 10. Layer impact & build order

**lastfm-mcp** (round 0, before any aphelion round):
- `core/loungeAggregates.ts` or sibling `core/crateAggregates.ts`: pure builder + zod contract + fixture guard (the lounge lane's pattern)
- `cli/export.ts`: emit `crate.json`
- File as a new issue (the #12 successor); gates as usual

**aphelion** (rounds 1–3, each ends at Justin's browser):
- design-system/: none (tokens hold)
- core/: `core/scene/crateDig.ts` — pure FSM (rest → pulling → presented → returning / keeping), spring schedule, card-line assembly from thresholds, dealer weighting. Testable without a browser, like `ritual.ts`.
- services/: crate fetch + album-art proxy client (placeholder-hash reuse); `api/lastfm.ts` +albuminfo mode
- src/: `CrateDig` lazy chunk — sleeve quad, card, keyboard control; `AlbumArtLayer` learns kept-record precedence; rigs `?pull=<era>` / `?dealer` / `?kept` for capture

| Round | Ships | Graded on |
|---|---|---|
| R1 | Pull / present / return, house sleeve only, card from real crate.json | the gesture's feel, card voice |
| R2 | Art proxy + placeholder fallback + keep-it-out → frame | art seating, keep fiction |
| R3 | Dealer's choice + listen links + a11y polish | the whole ritual |

Rigs before build, per house rule; every round graded in a real browser (pane rAF is dead).

## 11. Open questions (Justin)

1. **Privacy line** (§6): publish the 1,546-record crate listing? (Recommended yes — Discogs precedent — but it's his call. A middle path exists: raise the threshold to ≥50 → 781 records.)
2. **Camera** (§4): confirm the wall serves alone in v1; flip-bin s11 stays banked for a possible P4 deeper dig.
3. **Listen links** (§7): Last.fm only, or add streaming search links — and which services?
4. **Keep persistence**: session-only v1 (proposed), or should the keeper's ledger (Upstash, guestbook spec) remember the kept record across visits as a later round?
5. **Dealer's-choice surface** (§5): flip bins as the "surprise me" press — right, or should it be a spoken keeper affordance elsewhere?

---

*Pitch note for the Director: "the card is the archive talking" is the sharpest demo line of the arm so far — a personal-data interface with zero wiki prose, in one sentence of card copy.*

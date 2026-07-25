# Nibiru, the Crate Dig: Ritual Brief

> Dreamer brief, 2026-07-24 (P3 opener). Seed = the P2''' riff. The glow lane closed 2026-07-23 (aphelion PR #12): the wall rests as faded memory, the era lens murmurs the years back. This brief shapes the next touch — pulling a record off the wall — and draws the data contract it needs from lastfm-mcp. Everything here respects the living-painting doctrine (`plans/nibiru-living-painting-brief.md`): nothing geometric moves except what the ritual animates, wave/spring only, browser is the only grading surface.

## 1. The ritual

The era lens taught the wall to answer a glance. The crate dig teaches it to answer a reach.

Hover an era and the lens already wakes it. **Press, and the keeper pulls a record from that shelf**: a sleeve slides out on a spring — up and toward you, the way a record actually leaves a crate — and settles into a presentation pose in the near field. The cover art arrives through the proxy; until it does (and whenever art misses), the walnut-black house sleeve carries the pull, stamp out.

Beside the sleeve, a card. **The card is the archive talking, never a wiki — and it speaks in an informational register, written for any visitor, not addressed to the owner** (graded 2026-07-24):

> *Madvillainy · Madvillain*
> *hip-hop · underground rap*
> *Played 214 times, mostly in 2011, mostly after midnight.*
> *Not since March 2019.*

The stats lines are assembled from baked per-album data; the quiet metadata line (genre tags, so a stranger knows what they're holding) arrives at runtime with the cover art — `album.getInfo` returns last.fm's top tags in the same proxy call, so genre costs the export nothing and the archive schema (which has no genre dimension; lastfm-mcp issue #11) stays untouched. Top 2–3 tags, lowercase, no prose. No release dates, no personnel, no wiki paragraphs.

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

## 5. Dealer's choice: two hands (graded 2026-07-24)

The keeper has two ways of choosing, both keyboard-reachable:

1. **The dig (true random).** Uniform over the *entire* crate — all 17,547 records, including the ones played once or twice. This is the peek into the whole wall: most pulls will be records barely remembered, and that's the point. Proposed surface: pressing the **flip bins** — bins are for digging.
2. **The keeper's pick (forgotten favorites).** Weighted by the house concept `find_forgotten_favorites` defines: heavily played once, quiet since. `weight = plays × dormancyYears`, normalized, floored so nothing is unpullable, seeded per visit. Proposed surface: a quiet spoken affordance near the rail.

Both weights/draws compute client-side from baked fields — the export stays dumb, the tuning lives in DialKit (a dormancy-bias dial for the keeper's pick, baked when Justin locks it).

## 6. The data contract (what needs lastfm-mcp)

`lounge.json` cannot carry this lane: its years hold top-5 albums each, and the card needs stats for *any* pullable record. **New export artifact, same lane as issue #12: `crate.json`** — a sibling under the same `AGGREGATE_SCHEMA_VERSION` discipline, built by `export --for lounge` (additive flag or sibling `--for crate`, implementer's choice).

**No MCP-at-build.** The CLI export precedent (bake at export time, commit the artifact) is the house lane; wiring MCP calls into aphelion's build would add a live dependency for data that changes only when the archive syncs.

### The crate

**GRADED 2026-07-24: the full crate publishes.** One entry per album with ≥1 play — **all 17,547 records**. The privacy call is resolved (Discogs precedent; the wall *is* the archive made visible), and the true-random dig (§5) requires the whole wall anyway: a threshold would quietly delete exactly the records the dig exists to surface. Raw scrobble rows still never leave, per doctrine.

Per record (bar-time bucketing via `core/bartime.ts`):

| Field | Feeds |
|---|---|
| artist, album | card title, art + genre lookup, deep links |
| plays | "played 214 times" |
| top year + its share | "mostly in 2011" |
| night share (plays landing 00:00–04:00 bar time) | "mostly after midnight" |
| first / last play (uts) | "not since March 2019", keeper's-pick dormancy |

The era slot dropped out of the contract on purpose: the wall's six rows are an aphelion authored asset (his painted map), so aphelion derives the shelf from `topYear` client-side — repainting eras never forces a re-export.

Estimated ~2 MB raw / **~300–450 KB gz** (measure at build; lounge.json's 306 KB gz is the sibling precedent). Lazy-fetched only on pull intent, never bundled. Card copy renders client-side from thresholds (top-year share > .5 → "mostly in 2011"; night share > .4 → "mostly after midnight"; dormancy > 2 y → the "not since" line) — the copy voice iterates in aphelion without re-exporting.

### Cover art & genre

**Not baked.** CDN URLs rot, the export shouldn't hold 17,547 of them, and genre would cost 17,547 rate-limited API calls per export. Runtime, frame-lane precedent: aphelion's proxy (`api/lastfm.ts`) gains one mode — `mode=albuminfo&artist=&album=` wrapping `album.getInfo` — and the card takes both the hotlinked art **and the top tags for the genre line** from that single call. The existing placeholder-hash detection (`PLACEHOLDER_HASHES`, `services/nowPlaying.ts`) and the house sleeve carry every art miss; a missing tag list simply drops the genre line. Loads only on pull: zero cost until the ritual is touched.

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
| crate.json | lazy-fetched on first pull intent (era-lens hover arms a prefetch), never in any bundle; ~300–450 KB gz for the full 17,547-record crate (lounge.json 306 KB gz is the sibling precedent) |
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
| R3 | Dealer's choice + listen links + record vessels in every room (§12) + keep murmur + a11y polish | the whole ritual |

Rigs before build, per house rule; every round graded in a real browser (pane rAF is dead).

## 11. Open questions (Justin)

Resolved at the 2026-07-24 grade: ~~privacy~~ (full crate publishes), ~~camera~~ (wall serves alone, s11 stays banked), ~~voice~~ (informational register + genre metadata line), dealer's choice gains the true-random dig alongside forgotten favorites.

Still open:

1. **Listen links** (§7): Last.fm only, or add streaming search links — and which services?
2. **Keep persistence**: session-only v1 (proposed), or should the keeper's ledger (Upstash, guestbook spec) remember the kept record across visits as a later round?
3. **Dealer surfaces** (§5): flip bins = the random dig, spoken affordance = the keeper's pick — confirm the mapping at the R3 grade.
4. ~~**Vessel precedence**~~ Resolved at the 2026-07-25 grade — reframed as **two lanes** (§12): the vessel holds the visitor's lane while one exists (a kept record), the keeper's lane otherwise (now playing). Tuning back in = returning the kept record.
5. ~~**Discogs on the card**~~ Resolved: **option B** — the card gains a `label · year` mono line. His words: the cards should let visitors learn a thing or two, about him and about his music. Discogs also becomes the art fallback (§13).

## 12. R3 amendment (2026-07-25): the record travels

R2 shipped keep-it-out into the altar's picture frame, and the first live grade named the gap: the keep happens on the archive, the frame hangs in the altar — nobody but the keeper and the builder would connect them. The fix is also the answer to a second want: showing **what's playing** in every room.

**Every room gets one record vessel** — a measured surface where the room's one live record sits:

- **Altar**: already built — the sleeve stand (now playing) and the frame (kept). Unchanged.
- **Counter**: a sleeve leaning against the raised counter rail, right of the glass, in the lamp's pool (master has clean lamp-lit wood there).
- **Booth**: a sleeve propped on the banquette backrest at the right end of the table (near-vertical quad; the flat-on-table option foreshortens too hard).
- **The archive**: the pulled sleeve itself is the vessel; no second seat.

**The fiction — two lanes (his grade, 2026-07-25)**: the room carries two listening lanes. The **keeper's lane** is what's actually spinning — his live scrobbles, the altar's needle-drop ritual. The **visitor's lane** opens the moment they pull and keep a record: they're exploring the archive on their own, sometimes while the keeper listens to something else entirely — and that's the point, they should be free. The vessel in each room holds *the visitor's lane while one exists* (their kept record), and the keeper's lane otherwise (now playing). Returning the kept record is how a visitor **tunes back in** to the keeper's lane — the vessels everywhere quietly swap back to what he's playing. When Bottle Keep lands (Apple Music / Tidal pours), the visitor's lane gains real audio and a service indicator, and this section's semantics carry over unchanged: the lanes were designed before the sound arrives.

**Method** (all proven plumbing): one measured quad per master (luminance edge-fits, never eyeballed) + `AlbumArtLayer` graded into the paint (exposure/wash/feather, passive under `finalDim`) + depth co-move at the surface's Depth Pro depth (the rain-pane/breath precedent on DepthPlate shots). Kept art and now-playing art feed from the state that already exists (`keptRecord`, `liveTrack`).

**The keep murmur**: the instant KEEP IT OUT is pressed, a SleeveCaption-voice line — "Kept out." — rides the sleeve's return, so the action answers even before the visitor tours to another room.

**Tuning back in**: a press on any vessel holding a kept record returns it to the wall (the keeper re-shelves it with the same care) and the vessels swap back to the keeper's lane. Keyboard: the K that keeps also releases.

**Watch items**: the room chunk sits at 247.97/250 gz and the quads + mounts land in it (vessel render code joins the lazy liveArt pattern where possible); the counter and booth seats are the same real estate the P3 crew figures will want — place vessels so a figure can still sit (or plan the handoff).

## 13. Discogs metadata lane (his call, 2026-07-25)

Discogs' API can deepen what a pulled or spinning record knows about itself: **label, release year, genres, and styles** — and Discogs *styles* ("boom bap", "jazzy hip-hop") are meaningfully sharper than Last.fm's top tags, which would upgrade the card's existing gear-blue genre slot without new UI.

**Runtime lane (fits R3+)**: a second proxy mode or `api/discogs.ts` — server-side token, required User-Agent, `database/search?artist=&release_title=&type=master` for original-release year + genres/styles + label. Rate doctrine: 60 req/min authenticated is generous for per-pull calls behind a 24h+ edge cache (same shape as albuminfo); misses change nothing, per posture. Matching is fuzzy (masters vs pressings) — take the top master hit, drop the line on low confidence, never guess.

**Doctrine amended (his grade, 2026-07-25): option B.** The card gains a second mono data line — `label · year` — and Discogs styles upgrade the gear-blue genre slot when they beat Last.fm's tags. The voice rule evolves rather than breaks: the archive still speaks first (plays, years, dormancy), but the card now also teaches — visitors should learn a thing or two, about the keeper and about the music. The line renders only from a confident master match; no guess ever prints.

**Discogs as art fallback (his call, same grade)**: the search response carries `cover_image` — the art chain becomes Last.fm CDN → Discogs cover → house sleeve. Same hotlink posture as the frame's weekly top; the placeholder-hash miss that today seats the house sleeve first tries Discogs. One caveat to verify at build: Discogs image URLs are served from their CDN via authenticated search responses — confirm they hotlink cleanly from the browser (if not, the proxy relays the URL resolution, never the bytes).

**Not this lane**: syncing his real collection (lastfm-mcp #13, the wall-as-real-collection dream) and baking a genre dimension into the archive schema (#11) stay their own missions — this lane is runtime-only, one record at a time.

---

*Pitch note for the Director: "the card is the archive talking" is the sharpest demo line of the arm so far — a personal-data interface with zero wiki prose, in one sentence of card copy.*

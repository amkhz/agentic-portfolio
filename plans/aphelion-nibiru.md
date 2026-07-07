# Aphelion / Nibiru -- the Listening Room

> Dreamer + Wallace output, 2026-07-06. The planning record for Aphelion's first piece. Governs until superseded by the shape brief. ADR-019 is the arm's charter; `plans/music-phase-2.md` Track D is the ancestor.

## What this is

**Aphelion** (aphelion.justinh.design, repo `~/projects/aphelion`) is the third arm: personal, experimental, after-dark. **Nibiru** (working title, confirm at shape) is its first piece: a tiny virtual hi-fi listening bar -- Japanese kissa reverence, ~8 seats, seen through a real-time 3D room -- inhabited by the crew as beings made of text, playing what Justin plays.

## Locked decisions (2026-07-06 session)

1. **Fiction: the kissa.** Ember-lit analog chiaroscuro. ~80% darkness, all light in-world: hot tungsten filaments, one cream paper lamp per table, VU breath, soft blue McIntosh-style meter faces on the gear (the one cool note, element-level only). Materials: oiled walnut gone black, cracked oxblood leather, dust allowed. Reverence ceiling: the room reacts in watch-hands increments; nobody dances.
2. **North stars:** `agentic-portfolio/mocks/kissa-probes/*--q48.png` -- the altar, the counter, the glyph regular (v2), the wall of years. Caption sidecars alongside; renders are reproducible and riffable by single-field edits. The R3F build is graded against these frames.
3. **Crew: glyph beings.** Figures of luminous monospace glyphs in a polygon room -- agents rendered in their native material. Per-member glyph alphabets: Roy solid blocks, Joi flowing lowercase + canon flicker, Gaff punctuation + accumulating origami, Tyrell braces at the counter, Dreamer ellipses, Writer serifs, Director arrows at the door. Each has an idle loop, a small reaction vocabulary, and the reverence ceiling. Render recipe proven (Wallace direction-vocabulary entry #7: explicit anatomy + glyph scale hierarchy, restrained luminosity).
4. **The room lives on Justin's clock.** Circadian layer: day/night cycle synced to his timezone. Daytime is the bar closed-but-alive (grey daylight through the one window, chairs up, crew on day routines: Gaff sweeping, Tyrell restocking, Writer at the counter with coffee). Night is the bar open. Crew routines are scheduled, so returning visitors learn the room's rhythms.
5. **Away-mode: the Memory DJ.** Justin listening = needle drops on the live scrobble. Justin away = the archive plays memory ("this hour in 2013"), with the light dimmed one register so memory is legible as memory. Deep fallback (no data / reduced-motion) = the sleeping room: dim, idle crew, last-played on the sleeve stand.
6. **Weather of the week's listening.** The window's weather is driven by listening stats (volume/energy of the week) -- rain, clear, fog. Subtle; a returning visitor's second read.
7. **Visitor model: ambient scene + camera drift + four interactive points.** You arrive, you watch, the room performs. No walk-the-room controls in v1 (explorable camera is v2 if ever). The four points, all keyboard-reachable:
   - **The shelves:** crate-dig the archive (browse eras/top records from baked data; if the Discogs sync lands, the wall's spines are his real collection)
   - **The sleeve stand:** inspect now-playing or the current memory
   - **The crew:** focus a figure, learn who they are
   - **The request slip:** guestbook -- leave a slip; slips are stored for Justin's review (moderated by default, never auto-public)
8. **Audio: no licensed playback in v1.** Justin's call on licensing, and the fiction absorbs it beautifully: *you can't hear what he hears; you see what it does to the room.* Sound opt-in enables the room's own foley (vinyl crackle, needle drop, room tone, rain on glass -- all ours) plus optional metadata sonification (a low Tone.js hum in the key/tempo of the playing track -- abstract, not the song, zero licensing). 30s previews (iTunes/Deezer) stay a parked v2 option pending a real licensing read.

## Data plumbing (all through ADR-018 contracts)

- **Live now-playing:** Aphelion's own `api/lastfm.ts` proxy (same pattern as portfolio PR #198 -- classic Node handler signature, see memory), reading the same env vars.
- **Memory DJ:** new lastfm-mcp export target `--for lounge`: on-this-day/on-this-hour slices across 21 years + era summaries, baked JSON (est. 1-2 MB). Files as a lastfm-mcp issue.
- **Crate-dig:** the existing `--for portfolio` aggregates + the lounge export.
- **Discogs (new fuel, 2026-07-06):** Justin's physical collection at discogs.com/user/300mhz. Discogs API sync lands in lastfm-mcp (issue to file): collection tables + tools (owned-on-vinyl checks, scrobbled-but-not-owned) + an export so **the record wall renders his actual collection** -- the wall of years made literal. Also feeds the Selector (vinyl-only set building).

## Build phases (each ships; the room is never broken in public)

- **P0** -- Repo scaffold + doctrine (lastfm-mcp T1 pattern), Vercel project + subdomain, tokens file from the north-star palette (OKLCH, by name -- method is universal even though the register is Aphelion's own)
- **P1** -- The room: materials, light, camera drift; static; graded against the boards
- **P2** -- The ritual: now-playing via proxy, needle-drop choreography, sleeve stand
- **P3** -- The first figure: the Dreamer, straight from the v2 s11 board; idle loop + reaction vocabulary
- **P4** -- The Memory DJ + circadian layer + sleeping room
- **P5** -- Sound opt-in: foley + sonification (Tone.js, lazy, muted by default)
- **P6+** -- Remaining six figures, weather layer, guestbook, Discogs wall, explorable camera (v2 candidates, ordered at shape)

## Constraints

- WCAG 2.2 AA: keyboard-complete interactive points, reduced-motion = sleeping room (static, live text data intact), captions/text equivalence for anything audio conveys, no color-only signaling
- OKLCH via tokens, referenced by name; Aphelion owns its own tokens file
- Perf: ADR-017 D6-style budget adapted at shape (lazy chunks, DPR cap 2, render loop paused off-viewport/hidden); zero bytes added to portfolio or Perihelion
- Personal-data posture: guestbook slips private-by-default; archive data ships only as baked aggregates, never raw scrobbles

## Open for the shape session

1. Room name final confirm (Nibiru vs a name from Justin's obsessions -- riff planned)
2. Per-figure reaction vocabularies beyond the Dreamer; how much lore the crew bios expose
3. Perf budget numbers; tablet/mobile posture (decline card vs reduced room)
4. Guestbook storage + review flow (KV vs simple store; moderation UX)
5. Camera drift choreography (authored path vs slow orbit)

## Session log

- 2026-07-06: fiction locked (kissa), crew treatment locked (glyph beings), floor plan sketched, Wallace pass run (4 north-star boards + glyph iteration, `mocks/kissa-probes/`), arm named **Aphelion** (ADR-019), room working-titled **Nibiru**, away-mode/circadian/weather/visitor/audio decisions locked (this doc), Discogs surfaced as fuel.

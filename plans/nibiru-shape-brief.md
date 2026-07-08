# Nibiru, the Listening Room: Shape Brief

> Shape session output, 2026-07-07 (Tyrell + Justin). Supersedes the "Open for the shape session" list in `plans/aphelion-nibiru.md`; that plan remains the ancestor record for everything locked on 2026-07-06. ADR-019 is the arm's charter. This brief guides implementation from P0 onward.

## Session decisions (all Justin's picks, 2026-07-07)

| Question | Decision |
|---|---|
| Room name | **Nibiru**, confirmed. No longer a working title. The hidden planet keeps the chair. |
| Crew bio lore depth | Fiction leads, plus one true line per figure connecting to the practice. |
| Reaction vocabulary | Five moves per figure: idle, needle drop, signature, memory mode, circadian. |
| Perf budget | Accepted as proposed (table below), Roy-enforceable. |
| Mobile posture | The postcard: framed still with live data, zero WebGL on phones. Tablet gets the full room at DPR 1.5. |
| Mobile room spike | Scheduled after P2, measured on a real phone against the real scene. Result decides whether the postcard upgrades to a reduced room in v2. |
| Guestbook | Upstash Redis via Vercel marketplace, keeper's ledger review flow. Slips never auto-public. |
| Camera | Authored shot list with slow dolly drift, plus a shot rail so visitors can pin a vantage and linger. |

---

## 1. Feature summary

Nibiru is the first piece of the Aphelion arm (aphelion.justinh.design, repo `~/projects/aphelion`): a tiny virtual hi-fi listening bar rendered as a real-time 3D room, inhabited by the crew as beings made of glyphs, playing what Justin plays. Visitors arrive, the room performs; four interactive points reward the curious. It is a personal-expression piece: the archive of twenty-two years of listening made into a place.

## 2. Primary user action

Watch the room. Everything else (crate-digging the shelves, reading the sleeve stand, meeting the crew, leaving a slip) is optional depth. Success is a visitor who stays for one full shot cycle and understands, without being told, that the room is alive and reacting to real listening.

## 3. Design direction

Ember-lit analog chiaroscuro, the kissa register locked in `plans/aphelion-nibiru.md`: roughly 80% darkness, all light in-world (tungsten filaments, cream paper lamps, VU breath, the one cool note of gear-blue meter faces). Materials are oiled walnut gone black, broken-in oxblood leather (deep patina, supple and cared for, never cracked or tattered; wabi-sabi is history and care, not damage), dust allowed. The reverence ceiling governs everything: the room reacts in watch-hands increments, nobody dances. The R3F build is graded against the four north-star boards in `agentic-portfolio/mocks/kissa-probes/*--q48.png` (altar, counter, glyph figure v2, wall of years v2), with caption sidecars as the reproducible source.

Aphelion owns this register. Conservatory and Reading Room doctrine do not apply here; the method constraints do (OKLCH by named token, WCAG 2.2 AA).

## 4. Layout strategy

The surface is a scene, not a page. Spatial hierarchy comes from the shot list:

1. **The altar** (establishing shot): horns flanking the tube rack, blue meters, the thesis frame.
2. **The counter**: lamp pool, glass, backlit bottles, the sleeve stand within reach.
3. **The booth**: a crew figure in the oxblood chair, the intimate shot.
4. **The wall of years**: raking eye-level run along the record wall, the archive made visible.

Each shot holds 45 to 90 seconds with a very slow dolly drift, then a long crossfade to the next. HTML overlay elements (sleeve stand detail, bios, slip form, crate-dig browser) render as quiet in-world-adjacent panels anchored to their shot, never as floating modal chrome. One `h1` (the room's name), visually treated as signage, not a hero banner.

## 5. Key states

| State | Trigger | What the visitor sees |
|---|---|---|
| Night, open, live | Justin scrobbling now | Needle-drop ritual on each new track, crew reacting, full light |
| Night, open, memory | Justin away | The Memory DJ plays "this hour in years past" from baked archive slices; light dimmed one register so memory reads as memory |
| Day, closed, live | Justin scrobbling by day | The staff-listening state: chairs up, grey daylight, and the turntable going anyway; needle drops fire as at night, crew pause their routines a beat to listen. The owner spinning records before opening is the most personal shot in the piece. |
| Day, closed, quiet | Daytime, Justin not playing | Grey daylight through the one window, chairs up, day routines: Gaff sweeping, Tyrell restocking, Writer at the counter with coffee |
| Sleeping room | No data, API failure, or `prefers-reduced-motion` | Dim static room, idle crew, last-played on the sleeve stand; live text data intact |
| Postcard | Phones, or WebGL unavailable | Framed still of the room + live now-playing, sleeve stand, crew bios, slip form; no 3D |
| Slip flow | Visitor writes a slip | Compose, confirm, "the keeper will read this" acknowledgment; no public echo |
| Keeper's ledger | Justin, token-gated `/keeper` | Reads slips, keeps or discards; private |

**No state gates access.** "Open" and "closed" are fiction, never a lockout: every state is fully visitable at any hour, all four touchpoints work, and live listening drives the needle-drop ritual whenever it happens, day or night. The circadian layer changes light and choreography only.

## 6. Interaction model

**Camera.** Authored shot list as above, autonomous by default. A quiet shot rail (four small marks, bottom edge) lets a visitor pin a vantage: click or arrow keys, camera settles there and keeps its slow drift; release (Esc, or re-click) resumes the tour. Fully keyboard-operable, and each interactive point has a home shot the camera pulls to on focus.

**Four touchpoints** (all keyboard-reachable, from the ancestor plan): shelves (crate-dig baked archive data), sleeve stand (now-playing or current memory), crew figures (focus to read bios), request slip (guestbook).

**Crew reaction vocabulary, five moves per figure.** All triggers derive from data already flowing (proxy now-playing, baked archive aggregates, loved tracks, transition scores, clock). Reverence ceiling: nothing faster than watch-hands.

| Figure | Idle loop | Needle drop | Signature (trigger) | Memory mode | Circadian (day/closing) |
|---|---|---|---|---|---|
| Dreamer `…` | ellipses rise like lamp smoke | head tilts back | sinks deeper on low-energy weeks | ellipses drift downward, settling | asleep in the booth, barely luminous |
| Roy `█` | one block row breathes with the VU | head turns to the altar | blocks snap to sharp alignment on a rediscovery (first play in 2+ years) | stands at the wall, facing the playing era's shelf | at the window, watching the rain light |
| Joi `~` | tildes stream at track tempo | flow briefly reverses | canon flicker on a loved track | stream slows to the remembered era's pace | rearranges the sleeve stand |
| Gaff `;` | taps a semicolon like ash | pauses mid-fold | folds one origami glyph per session; the counter row accumulates as visit memory | unfolds an old origami, studies it | sweeps glyph dust |
| Tyrell `{}` | braces align and nest | straightens | braces interlock on a high transition score | inspects the altar gear, adjusts one knob a hair | restocks behind the counter |
| Writer serifs | nib glyphs hover over a ledger | looks up | writes a ledger line on milestone plays | old ledger pages ripple open | at the counter with coffee |
| Director `→` | arrows sweep the room like a minute hand | points at the sleeve stand | dims the lamps at closing time | arrows orient to the playing year on the wall | at the door, checking the hours |

**Crew bios: fiction plus one true line.** The fiction leads; one closing line each connects to the practice without a lore dump. Working set (Writer refines at P3+): Roy "reviews everything Justin ships." Joi "keeps his voice; every word on these sites passed through her." Gaff "cuts what doesn't earn its place." Tyrell "built the rooms you're standing in." Dreamer "turns Justin's what-ifs into plans." Writer "drafts the case studies." Director "keeps the practice on schedule."

**Audio** (locked in the ancestor plan, restated for completeness): no licensed playback in v1. Opt-in sound enables room foley and optional Tone.js metadata sonification. You can't hear what he hears; you see what it does to the room.

## 7. Content requirements

- Room signage and about copy: the Aphelion cosmology in two sentences, no permission framing, no em-dashes. Voice through Joi's profile, Writer drafts.
- Seven crew bios: 2 to 3 fiction sentences plus the one true line each.
- Slip form microcopy: invitation ("leave a slip for the keeper"), 500-character cap message, confirmation, failure state ("the keeper's ledger is full tonight, try again later").
- Sleeve stand fields: track, artist, album art if available, timestamp or memory-year label ("tonight" vs "this hour, 2013").
- Crate-dig labels: era names, top-records framing, sourced from baked exports; Discogs wall labels arrive with lastfm-mcp issue #13.
- Postcard copy: one line explaining the room is bigger on a bigger screen, invitational, not a lockout.
- Dynamic ranges: track titles up to ~100 chars, artist names with full unicode (the SMB-ghost lesson), archive spans 2005 to now, slips 0 to 500 chars.

## 8. Performance budget (Roy-enforceable gates)

| Number | What it gates |
|---|---|
| Entry JS ≤ 100 KB gzipped | Pre-paint path: poster frame, live now-playing text, router. Phones never download the engine. |
| Room chunk ≤ 500 KB gzipped | three + R3F + drei subset + all scene/choreography code, lazy behind the poster. Forbids physics libs and postprocessing sprawl; one composer pass fits. |
| First-visit total ≤ 2.0 MB | JS + KTX2 textures + fonts. 1K textures default, 2K only for counter top and horn flare. |
| ≤ 120 draw calls | Each glyph figure is one InstancedMesh; room shell geometry-merged. |
| ≤ 250k triangles | Panels in darkness; only horns and lamp shades are curve-hungry. |
| DPR cap 2 desktop, 1.5 tablet | Fill rate is the melting point in an 80%-dark room. |
| 60 fps target, 30 floor; render loop pauses off-tab and off-viewport | Thermals, battery, silent laptop fans. |
| INP < 200 ms | The portfolio's mobile lesson travels to every arm. |

**Spike, scheduled after P2:** full room on a real phone. three.js is already WebGL2; the question is thermals, INP, and fill rate at DPR 1 with baked lighting. Outcome upgrades the postcard to a reduced room in v2, or confirms the postcard stands.

## 9. Guestbook specification

- **Store:** Upstash Redis (Vercel marketplace). Slips as a list: `{ id, ts, name?, text, status: new | kept | discarded }`.
- **Write path:** `api/slip.ts`, classic `(req, res)` Node handler signature (the proxy lesson). Honeypot field, per-IP rate limit (3/hour via INCR + EXPIRE), 500-char cap, no emails collected.
- **Review:** `/keeper` route, token-gated (`APHELION_KEEPER_TOKEN` bearer). In fiction, the keeper's ledger. Keep or discard; kept slips are eligible for a v2 in-room slips wall, which remains opt-in future work. Nothing auto-publishes, ever.

## 10. Data plumbing (unchanged from the ancestor plan)

All through ADR-018 contracts: Aphelion's own `api/lastfm.ts` proxy for live now-playing; lastfm-mcp `--for lounge` export for Memory DJ slices (lastfm-mcp issue #12); existing portfolio aggregates for crate-dig; Discogs sync for the record wall (lastfm-mcp issue #13).

## 11. Roadmap (P-phases from the ancestor plan, spike inserted)

- **P0**: repo scaffold + doctrine, Vercel project + `aphelion.justinh.design`, tokens from the locked palette. Ships a poster page.
- **P1**: the room: materials, light, camera shot list + rail; static; graded against the boards.
- **P2**: the ritual: now-playing proxy, needle-drop choreography, sleeve stand.
- **Spike**: mobile room feasibility on a real phone; decides the postcard's v2 fate.
- **P3**: the Dreamer, from the v2 s11 board; five-move vocabulary as the template.
- **P4**: Memory DJ + circadian layer + sleeping room.
- **P5**: sound opt-in: foley + sonification, lazy, muted by default.
- **P6+**: remaining six figures, weather layer, guestbook, Discogs wall, explorable camera, the Bottle Keep (v2 candidates).

### The Bottle Keep (v2, banked 2026-07-07)

Visitors connect their own streaming subscription and hear the actual track Justin is playing, poured through their own account. In fiction: bottle keep, the Japanese bar custom of keeping your own bottle behind the counter; the house pours what the owner's drinking. Justin's call: "cool as fuck." Supersedes the parked 30-second-preview idea (cleaner legally, better fiction).

- **Apple Music first, viable now.** MusicKit JS gives full-track browser playback to any Apple Music subscriber. Entails: Apple Developer Program ($99/yr), MusicKit signing key, a small `api/` endpoint minting the developer-token JWT, one-time visitor authorize for the music user token. Works in Safari and Chrome, no user caps.
- **Tidal: second first-class pour, spike-worthy.** Open developer platform (free registration, OAuth2); the Web SDK's Player module is the sanctioned path for third-party full-track playback for logged-in subscribers, with catalog search on the same platform. Younger and rougher than MusicKit, so it gets a small spike before commitment. Resonance bonus: Tidal is the DJ's service (Serato and rekordbox integrate it), so this crowd disproportionately has it.
- **Spotify: deep link only, for now.** Their February 2026 policy cut development-mode apps to 5 users with owner-held Premium, and extended quota requires a registered business at 250k MAU. No visitor OAuth is worth building against that. Fallback: an "open in Spotify" link on the sleeve stand (match via a cross-service resolver like Odesli), zero quota needed. Revisit if policy thaws.
- **Qobuz: deep link, plus an optional side quest.** The API is partner-only (email api@qobuz.com; terms written for hi-fi hardware integrators), so no public build path. But a reverent listening room is the most on-brand partner pitch Qobuz will ever get; writing them someday is sanctioned. Until then, sleeve-stand deep link.
- **Mechanics:** needle drop, catalog search for artist + track on the visitor's service, their player starts. Sync is loose by design (scrobbles mark starts, not positions): listening along, not sample-accurate.
- **The floor holds:** unmatched tracks (white labels, rips) fall back to the v1 fiction, you see what it does to the room. Playback needs a user gesture; sound is already opt-in, so doctrine is unchanged.
- **Sequencing:** rides P2's now-playing plumbing and P5's sound opt-in; slots after P5.

## 12. Recommended references

- `/impeccable` motion-design guidance and `/interface-craft` DialKit for tuning drift amplitude, shot timing, and figure-motion feel (feel-territory constants get sliders, not prompt-per-value).
- `/design-motion-principles` for the choreography audit once P1 lands (Aphelion is creative-license zone, but slop patterns are slop everywhere).
- Wallace direction-vocabulary entries #6 (gear-blue element-level rule) and #7 (glyph anatomy recipe) when generating any further boards.

## 13. Open questions for the build (resolve in-phase, none block P0)

1. Shot timings and drift amplitudes: feel territory, tune with DialKit in P1.
2. Glyph figure font: JetBrains Mono is the house monospace and the default candidate; validate legibility at figure scale in P3.
3. KTX2 pipeline tooling (toktx vs basisu) and texture authoring source: P1.
4. Postcard still: Wallace render vs captured frame of the real scene: P2, after the room exists.
5. Whether the shot rail marks carry labels or stay pure marks: P1, on the real surface.

---

**Perf provenance note:** library sizes are current three/R3F ecosystem measurements; INP and main-thread numbers derive from the 2026-06 mobile RES investigation (`plans/lighthouse-perf-followup.md`); the budget-before-build pattern follows Works 01.

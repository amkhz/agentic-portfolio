# Nibiru, the Living Painting: Direction Brief

> Direction pivot, 2026-07-15 (Tyrell + Justin). Supersedes the room-rendering strategy of `plans/nibiru-shape-brief.md` §3-4 and the P1 roadmap entry; everything else in that brief (fiction, states, crew vocabularies, guestbook, data plumbing, audio posture) carries forward unchanged. The modeled-room approach (programmatic Blender geometry, baked lightmaps, R3F hybrid) is retired: two days of fix rounds established that the fidelity cliff between path-traced references and live three.js elements is structural, and that programmatic geometry caps model quality below Justin's bar. The room concept stands. The medium changes.

## 1. The reframe

**Theatre, not simulation.** Nibiru becomes a stage set of painted flats. The paint is Wallace (Ideogram 4) at full render quality, in the locked kissa register. Everything alive is layered between and over the flats: light, weather, atmosphere, instruments, and the crew. Nothing geometric ever moves. The reverence ceiling stops being a constraint to enforce and becomes the physics of the medium.

The four north-star boards (`mocks/kissa-probes/*--q48.png`) stop being grading targets and become source material. There is one artist in the room.

## 2. Architecture: the plate stack

Each shot is a composition of layers, back to front:

1. **Back flat** (painted plate)
2. **Light pass** (blend layer: the delta between lit and unlit renders of the same plate; breathes, dims, blooms)
3. **Crew layer** (live typographic beings, occluded by nearer flats)
4. **Mid flat(s)** (painted plates: furniture band, counter, chairs)
5. **Atmosphere** (shader layers: dust motes, smoke, fog, rain on the window pane)
6. **Instruments** (live composited elements: meter faces, sleeve stand, clock, playing-year glow)
7. **Front flat** (painted plate: near horn edge, lamp silhouette, foreground darkness)
8. **Grade** (full-frame shader: film grain, paper tooth, vignette; the register's final finish)

Camera: depth-mapped micro-parallax across the stack, driving the existing shot list, dolly drift, and shot rail unchanged. Drift amplitudes stay watch-hands slow; the tour and pin/linger interactions carry over verbatim from the current `core/scene` code.

### Plate production pipeline (Wallace)

- Flats are generated as **separate compositions per depth band**, not slices of one master image: a back-wall plate, a furniture plate on transparent/dark ground, a foreground plate. Palette coherence comes from the locked register plus shared caption scaffolds; the 80% darkness hides band seams in shadow.
- Every plate ships with its **caption sidecar** (existing Wallace convention) so any plate is reproducible and re-gradeable.
- **Light variants:** each shot renders in its lighting states (night-lit, night-dim, day-grey). Difference masks between states become the live light-pass layers.
- **Depth maps** per shot (authored or model-assisted from the composite) drive parallax displacement. Subtle by doctrine; artifacts hide below the drift amplitude.
- Naming: `plates/<shot>/<band>--<state>--s<seed>.avif` + sidecars, stored in the aphelion repo `public/plates/`.

## 3. The state matrix

Same states as the shape brief, now cheap to ship:

| State | Plates | Light pass | Notes |
|---|---|---|---|
| Night, open, live | night set | full, breathing with VU | needle-drop ritual: dip, then pools bloom back one by one |
| Night, open, memory | night set | dimmed one register (blend toward unlit) | memory legible as memory |
| Day, closed, live | day set | staff-listening: lamps off, turntable pool on | the owner spinning records before opening |
| Day, closed, quiet | day set | grey window light only | day routines, chairs up |
| Sleeping room | current set | static, dimmest | reduced-motion collapses here; live text intact |

State transitions are slow plate/light crossfades. `prefers-reduced-motion` gets the sleeping room still frame with live text, unchanged from doctrine.

## 4. Alive: reactive and procedural inventory

All triggers already flow through the ADR-018 contracts (proxy now-playing, baked archive aggregates, clock; weather and Discogs arrive with their existing planned issues).

| Element | Type | Driven by |
|---|---|---|
| Meter needles + faces (cut from plate, drawn live from the `gen_meter_face` dial art) | reactive | now-playing state, VU idle breath |
| Sleeve stand artwork + label | reactive | live scrobble / Memory DJ slice |
| Window: rain streaks, condensation, dawn grey, night blue | reactive + procedural | listening-weather, circadian clock |
| Playing-year shelf glow (wall of years) | reactive | archive aggregates |
| Light choreography: needle-drop dip and bloom, closing-time dim, memory register | reactive | scrobbles, loved tracks, clock |
| Dust motes in lamp cones, smoke curls, glass glints, day-state coffee steam | procedural | always-on idle life |
| Film grain / paper tooth breathing | procedural | full-frame grade, subliminal |
| Camera drift + parallax | procedural | existing tour math |

## 5. The crew: typographic beings between the flats

The figures render as live text systems composited into the stack at their seated positions, occluded naturally by nearer flats. The five-move vocabularies from the shape brief map one-to-one onto glyph animation:

- **Dreamer `…`** ellipses rise like lamp smoke (particle glyphs in the booth)
- **Roy `█`** block rows breathe with the VU light layer; snap-align on a rediscovery
- **Joi `~`** tilde stream at track tempo along the sleeve stand; canon flicker on loved tracks
- **Gaff `;`** folds origami glyphs that accumulate in the counter plate corner as visit memory
- **Tyrell `{}`** braces interlock on high transition scores at the altar gear
- **Writer / Director** per the vocabulary table, unchanged

Figures are DOM/canvas/WebGL text, not sprites: crisp at any DPR, accessible (focusable, named, bios on focus per the touchpoint spec), and cheap. The v2 s11 board remains the anatomy reference (glyph scale hierarchy, explicit head/shoulders). P3 builds the Dreamer first, as before.

## 6. Shader stack

> Filled from the 2026-07-15 research dive; sources and licensing in §7.

**Framework:** stay in three/R3F with an orthographic camera and layered plane quads (custom `shaderMaterial` per layer class). Rationale: the tour/drift/feel/DialKit infrastructure carries over untouched, and the room chunk shrinks regardless (no glTF/Draco/KTX2 loaders, no PBR). A lighter stack (ogl/pixi) is noted as a fallback if bundle math demands it; not the default.

Framework notes from the 2026-07-15 research dive: three's TSL went stable in r184 with automatic WebGL2 fallback, but for 4-8 quads classic GLSL `ShaderMaterial` is the pragmatic lane. ogl (~30 KB gz) is the named fallback if we ever drop three; pixi v8 and curtains.js were evaluated and passed over (full 2D engine cost; dormancy since May 2024, respectively). A hand-rolled ~300-line WebGL2 harness is the proven floor: Radiant ships a full rain simulation in ~1000 dependency-free lines.

**Techniques to build or remix** (each becomes a small, owned shader; attribution in code where remixed):

| Effect | Primary remix source (license) | Study source |
|---|---|---|
| Rain on glass (window pane) | Radiant `/learn/rain-on-glass` full teardown, or Lucas Bebber's Codrops RainEffect (both MIT) | "Heartfelt" by BigWings + The Art of Code video series (technique study only, see §7) |
| Dust motes / lamp cones | Radiant "Velvet Spotlight" (MIT) | Maxime Heckel "On Shaping Light" (volumetric raymarching) |
| Smoke / steam | Paper Shaders `gemSmoke` / `smokeRing` exported GLSL (Apache-2.0) | Inigo Quilez domain warping + fbm articles; Heckel cloudscapes |
| Film grain / paper tooth | Paper Shaders `paperTexture` / `grainGradient` GLSL (Apache-2.0), or a trivial hash-noise pass | Book of Shaders noise chapters (read only, see §7) |
| Ember flicker / light breathing | Radiant "Smolder", "Burning Film", "Neon Revival" (MIT); layered low-frequency value noise driving light-pass blend weights | Quilez noise articles |
| Depth parallax from stills | akella/fake3d + the 2019 Codrops "Fake 3D Image Effect" article (MIT): single quad, depth-map-displaced UV lookup | Codrops 2025 WebGPU depth-map piece; depth maps authored by hand (blurred grayscale bands) or model-assisted (Depth Anything class) |

The rain technique is worth naming because it is cheap by design: a Canvas 2D droplet simulation stamps into a small RGBA "water map" (offset + depth + mask), and the fragment shader just refracts the backdrop through that map with a two-blur-levels trick (heavy blur behind glass, light blur inside drops). Swap the blurred city backdrop for the blurred kissa plate and it is nearly verbatim our window pane. Note also that the stacked plates already give inter-layer parallax; the depth-map trick adds cheap intra-plate depth per flat.

**Paper Shaders integration path:** the core package exports every fragment shader as a plain GLSL string with typed uniforms, so we lift GLSL into our own materials rather than mounting their per-component canvases. Known gap, verified current in July 2026: their color props still reject `oklch()` strings; the bypass is numeric `[r,g,b]` arrays in 0-1, converted from our OKLCH tokens at build time. Token doctrine holds.

## 7. Sources and licensing

The repo is public, and the portfolio is commercial-adjacent, so licensing is a doctrine matter, not a footnote. The copy-safe lane is Radiant + Paper Shaders + Codrops + MIT-headed Quilez snippets; the two most famous learning sources are the two we cannot copy from.

| Source | License | Remix into this public repo? |
|---|---|---|
| Radiant (radiant-shaders.com, github.com/pbakaus/radiant, ~94+ effects, March 2026) | MIT | Yes; remixing explicitly encouraged, attribute in code |
| Paper Shaders (`@paper-design/shaders`, v0.0.77) | Apache-2.0 | Yes; keep LICENSE/NOTICE with copied GLSL |
| Codrops downloadable demos (RainEffect 2015, fake3d 2019) | MIT | Yes |
| akella/fake3d | Codrops-era MIT demo, repo unlabeled | Yes in practice; attribute to be clean |
| Shadertoy defaults, incl. "Heartfelt" | CC BY-NC-SA 3.0 | No code copying. Classroom, not parts bin: learn, then clean-room reimplement (The Art of Code walkthroughs are the sanctioned path) |
| Inigo Quilez articles/shaders | Per-shader; many carry MIT headers | MIT-headed snippets yes; otherwise reimplement |
| Lygia | Prosperity + Patron (commercial needs a license) | Caution: reference only, do not vendor |
| The Book of Shaders | All rights reserved (2025 LICENSE) | No code reuse; read and rewrite |
| Maxime Heckel blog | Educational; demo licenses vary | Learn freely; check per demo |
| three.js / drei / ogl | MIT | Yes |

## 8. Performance budget (revised)

The old gates collapse; the new ones are lighter and phones get the real room:

| Number | What it gates |
|---|---|
| Entry JS <= 100 KB gz | unchanged: poster, live text, router |
| Room chunk <= 250 KB gz | halved: three + plate compositor + shaders, no model/texture-compression loaders |
| First-visit total <= 1.5 MB | plates (AVIF, dark images compress hard) + JS + fonts |
| Draw calls: one per layer + instruments | trivially < 40 |
| 60 fps target, 30 floor; frameloop pauses off-tab | unchanged |
| DPR cap 2 | unchanged |
| INP < 200 ms | unchanged |
| **Phones: the full room** | the postcard remains only as the no-JS/reduced-data fallback; the post-P2 mobile spike is deleted |

## 9. Roadmap (revised)

- **Spike (first):** the altar, end to end: three flats + one light pass + live meters + dust motes + one needle-drop light ritual, graded by Justin against the q48 altar board. Answers plate-seams, depth-parallax quality, and light-pass craft in one build.
- **P1':** all four shots as plate stacks; tour + rail carry over; postcard demoted to fallback.
- **P2:** the ritual (now-playing proxy, needle-drop choreography, sleeve stand) — unchanged scope, now driving light layers instead of point lights.
- **P3+:** crew figures (Dreamer first), Memory DJ + circadian plates, sound opt-in, guestbook, remaining figures. Per the ancestor plan.

## 10. What carries over untouched

Fiction and register doctrine (VECTOR.md), the crew vocabularies and bios, guestbook spec, audio posture (no licensed playback; foley + sonification opt-in), privacy posture, ADR-018 data contracts, the poster/entry path, `core/scene` tour math, DialKit feel-tuning workflow, and the Wallace pipeline with caption sidecars. The Blender pipeline commits stay in history; Cycles renders remain available as reference or as plate sources if useful.

## 11. Open questions (resolve in-spike)

1. Plate band count per shot (3 vs 4-5) and where the crew layer slots per shot.
2. Depth maps: authored gradients vs model-assisted, and how much parallax the seams tolerate.
3. Light passes: Ideogram lit/unlit deltas vs hand-authored masks per pool; likely per-shot judgment.
4. Meter integration: plate cutout + live canvas faces vs fully live overlay — decided at the spike against the board.
5. Whether the aphelion repo drops three for a lighter stack later; not a spike blocker.

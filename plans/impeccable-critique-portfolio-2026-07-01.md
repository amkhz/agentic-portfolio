# /impeccable critique — Main Portfolio

**Date:** 2026-07-01
**Target:** agentic-portfolio main portfolio (justinh.design). **Out of scope:** `src/lab/` (Perihelion).
**Method:** two isolated assessments — (A) LLM design review vs. Conservatory doctrine, (B) `npx impeccable --json` deterministic detector. No browser overlay this run (matches the 2026-06-27 method).

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Resume skeleton/error, live NowPlaying, active nav solid; no reading progress on long case studies |
| 2 | Match System / Real World | 4 | Field-notebook metaphor (dossier/specimen/accession) coherent and legible |
| 3 | User Control and Freedom | 4 | Theme toggle, skip link, back links, reduced-motion honored everywhere |
| 4 | Consistency and Standards | 3 | Glow appears on some surfaces not others; two divergent list variants |
| 5 | Error Prevention | 3 | Low surface area; external links flagged |
| 6 | Recognition Rather Than Recall | 4 | Persistent nav, breadcrumb back-links, mono kickers label every context |
| 7 | Flexibility and Efficiency | 3 | Anchor TOC, PDF download, focus rings; no in-page nav on very long studies |
| 8 | Aesthetic and Minimalist | 3 | Excellent type restraint undercut by glow orbs + decrypt + tilt ornament |
| 9 | Error Recovery | 3 | 404 offers escape; resume error gives PDF fallback |
| 10 | Help and Documentation | 3 | Appropriate for a portfolio; contact + resume clear |
| **Total** | | **33/40** | **Above the typical 20-32 band — held down by self-inflicted slop (H8) and consistency leaks (H4)** |

## Anti-Patterns Verdict

**Does this look AI-generated? Mixed — and the slop is concentrated and removable.**

- **LLM assessment:** The structural bones are a real designer — Field Notebook grammar, TOC-not-cards work index, de-slopped Callout/Metric, asymmetric editorial spreads. That survives the "did AI make this?" challenge. But the `effects/`+`interactive/` layer leaks the four most recognizable tells onto the highest-traffic elements: (1) **every primary CTA glows** (`Button.tsx:18` bakes `shadow-glow-brass`), (2) **gradient orbs behind hero type** (`GlowEffect` on Home/Work/case-study/404), (3) **scramble-decrypt text** on the NowPlaying track (`NowPlaying.tsx:146`), (4) **holographic tilt card** on the About portrait (`ProfileCard`). A design lead would say "the layout is a real designer; the shiny bits are AI."
- **Deterministic scan:** `npx impeccable --json` across `src/pages` + all five main component dirs returned **clean** — `[]` everywhere except two `broken-image` warnings in `ResponsiveImage.tsx:23,27`, both **false positives** (`<img>` mentions inside the JSDoc comment block, not real tags). The detector does not catch semantic-glow or doctrine-specific bans, which is why the LLM lens carries this critique.

## Overall Impression

A disciplined, genuinely custom editorial system wearing a handful of component-library ornaments it doesn't need. The single biggest opportunity: **cut the accent-glow vocabulary entirely.** It violates the project's own `feedback_no_accent_glow` ban, and removing it would make the craft read *louder*, not quieter — the type and material are strong enough to carry every surface without a halo.

## What's Working

1. **`TocLinkList` is the star** (`TocLinkList.tsx:112-158`) — leader-ruled registration rows with specimen thumbnails and brass-warming labels. The doctrine ("index as table of contents, not a card grid") executed with real editorial craft, reused coherently across Home/Work/Notes/case-study contents.
2. **Accessibility is baked, not bolted** — 44px targets, skip link, focus-visible rings, `sr-only` real text under the decrypt scramble, reduced-motion branches in every animated component. Above portfolio norm.
3. **Case-study hero spread** (`CaseStudyPageTemplate.tsx`) — asymmetric cover-plate + inked type column on a critically-damped spring, paired with the per-project `DraftedObjectMark` "Specimen." Distinctive and on-register.

## Priority Issues

### [P0] Primary CTA glow violates the project's own ban
- **Where:** `Button.tsx:18` — `primary` variant hardcodes `shadow-glow-brass`. Every "View My Work," "Email me," "Download Resume" wears a brass halo.
- **Why it matters:** most-clicked element on every page, wearing the exact halo `feedback_no_accent_glow` calls AI-slop. First-impression cost for the senior eyes the portfolio is built to win.
- **Fix:** drop the shadow; interaction = brass fill + `active:scale-95` (already present) + weight/ink shift. One-line change.
- **Command:** `polish`

### [P0] Kill the gradient orbs
- **Where:** `GlowEffect` behind hero type on `ProjectCard.tsx:69`, `WorkPage.tsx:72`, `CaseStudyPageTemplate.tsx:149`, `NotFoundPage.tsx:15`.
- **Why it matters:** "soft colored glow blob behind the headline" is the loudest AI-landing cliché and contradicts "life comes from material/type, not a halo." Also the mobile overflow-x risk from the audit.
- **Fix:** remove GlowEffect from hero surfaces; let the atrium image + type carry depth. If atmosphere is needed, use grain/material, not a colored radial.
- **Command:** `polish`

### [P1] De-slop NowPlaying
- **Where:** decrypt scramble (`NowPlaying.tsx:146`), accent-glow drop-shadows (24, 134), brass→green EQ gradient (37).
- **Why it matters:** three anti-references stacked in a persistent header widget; the brass→green blend puts green into interaction/status chrome, breaking the color law.
- **Fix:** swap `DecryptedText` for a plain fade/cross-dissolve; remove the glow shadows; make EQ bars single-token brass (or pure secondary as material, not a blend into interaction).
- **Command:** `polish` / `clarify`

### [P2] Reconsider the holographic tilt portrait
- **Where:** `ProfileCard` 3D/gyro tilt on `AboutPage.tsx:36` + `AboutSnippet.tsx:11` (also the source of the 16 hardcoded hsl/hex values).
- **Why it matters:** reads as component-library gimmick against a wabi-sabi / Danish-craft register.
- **Fix:** a still, well-framed portrait in a registration frame is more on-brand; if kept, damp the effect hard and codify the color exception.
- **Command:** `quieter` / decision

## Persona Red Flags

- **Hiring manager / design lead (5-second craft scan):** homepage type-settle reads senior on arrival — good. But the eye lands on the featured dossier and catches the **brass glow orb** behind the title and the **glowing CTA** — the two cues that trip "template/AI" exactly when you want "editorial designer." The Field Notebook ledger recovers it, but first impression is compromised by ornament the doctrine bans.
- **First-time visitor (Home → Work → case study):** system reads clearly; strong hero + clean Contents TOC. The friction is the **persistent NowPlaying widget scrambling text** in the corner during reading, and no reading-progress indicator on long studies (minor).

## Minor Observations

- Consistency leak: glow present on some surfaces, absent on others — resolving the glow ban settles this too.
- No reading-progress affordance on long case studies (H1/H7).
- **Corrected false positive:** an earlier pass flagged the Home hero CTA "View My Work" as an `#work` in-page jump; it is actually `to="/work"` (`HomePage.tsx:73`), a correct router link. No issue.

## Questions to Consider

1. Your own memory bans accent glow as AI-slop — so why does *every primary button and every hero* still ship a brass halo? Is the glow load-bearing, or the one habit the recalibration didn't finish removing?
2. The Field Notebook layer says "disciplined editorial designer." The effects layer (decrypt, tilt, orbs, particles) says "showcasing library components." Would cutting the glow-and-gimmick set make the craft read *louder*?
3. If a reviewer only saw the persistent header (logo + nav + scrambling NowPlaying), would that chrome argue "inhabited biophilic craft" — or nothing in particular?

---

## Recommended Actions (pending Justin's priority answers)

1. **`polish`** — remove accent-glow vocabulary (Button shadow, GlowEffect hero orbs, NowPlaying/ImageBlock glow shadows). The headline fix.
2. **`polish` / `clarify`** — de-slop NowPlaying (decrypt → fade, single-token EQ).
3. **`quieter`** — damp or cut the ProfileCard tilt; codify or convert its hardcoded color.
4. **`harden`** — ImageLightbox focus management (from the audit).
5. **`optimize`** — GrainOverlay mobile blend cost (from the audit; ties to known INP).
6. **`impeccable polish`** — final sweep.

> Run these one at a time, all at once, or in any order. Re-run `/impeccable critique` after fixes to watch H8 + H4 climb (target ~36-37/40).

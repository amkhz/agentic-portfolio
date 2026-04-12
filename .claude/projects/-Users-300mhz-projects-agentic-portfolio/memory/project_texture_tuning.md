---
name: Texture tuning TODO
description: Light mode wood grain + linen texture needs further tuning, and dark mode needs its own texture treatment
type: project
---

Light mode CSS texture (wood grain under translucent linen) is in place but needs further opacity/density tuning. Dark mode also needs a texture treatment -- not yet explored. Come back to both after Phase 2 (home page composition, typeset, work page).

**Why:** Textures are a key differentiator for the portfolio's craft story. Both modes should feel equally intentional.

**How to apply:** When returning to texture work, the token is `--texture-linen` in `design-system/tokens.css`. Dark mode currently has `--texture-linen: none`. All alpha channels are the tuning lever.

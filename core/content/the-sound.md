## The Sound

Music has always been part of me, since I was young. Mornings as a kid waking up to dad playing records, and later, music was a constant companion while I worked and moved through the world. I love all sorts of music - and finding new music is still something I love to do. Visualizing the listening data is like giving the musical side of my life a more real presence. I've been using [Last.fm](https://www.last.fm/user/amkhz_) to track my listening since 2005. That's over 20 years of memories and history - something I wanted to share and use for my own wild ideas.

The NowPlaying widget started as something I always wanted (and had a few times before on my old blogs - Xanga, anyone?) a simple but personal widget that showed what I was listening to right now. And now with my AI crew I've got a way for me to use all that data to make playlists, DJ sets, and more. Last.fm scrobbles every track across Apple Music, Sonos, and most other places I listen to music. The API is read-only, rate-limited, and free. A natural fit for a lightweight integration.

The architecture followed the four-layer pattern. A Last.fm API client lives in the services layer. A polling hook in src/ queries every 30 seconds, pausing when the browser tab is hidden. Core types define the track shape. The widget itself is an inverted tab in the header: collapsed by default, expanding to show album art, track name, and artist with a frosted glass backdrop that matches the header surface.

::: callout The Details That Matter
The equalizer bars are randomized on each render. Three bars with different keyframe animations and negative delays so they never sync up. The track name uses a character-cycling reveal (DecryptedText effect) when a new song starts. The expand/collapse uses a spring-physics animation. All of it respects prefers-reduced-motion.
:::

The widget is small but it touches every layer of the architecture. The API key is exposed client-side (read-only, low risk, documented in ADR-004). The polling is visibility-aware to avoid wasting requests. The design uses token colors exclusively. The frosted glass effect matches the header's existing backdrop-blur.

::: peek the-process
The NowPlaying widget was planned by the Dreamer, built by the Builder, and shipped through the same pipeline as every other feature.
:::

The bigger vision is still forming. Listening history visualizations: genre maps, time-of-day patterns. DJ playlist mining that surfaces patterns across tempos and moods. A Last.fm MCP server that lets agents query "what has Justin been listening to this week?" and use the answer as creative context. The widget is the first node in a larger constellation of music-as-material thinking.

::: peek the-material
The OKLCH color system and the music integration share a principle: make the invisible structure visible.
:::

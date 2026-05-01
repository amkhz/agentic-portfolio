# Last.fm Music Integration

> Dreamer output from 2026-03-05 session. Covers the full music integration vision from portfolio widget to MCP server to creative experiments.

**Design brief:** "Music is my sanctuary." This isn't a widget. It's a window into who Justin is.

---

## The Vision

Music as a living presence on the site. When Justin is listening, the site knows. When he's not, it remembers. The experience is informative and expressive but not overwhelming. Subtle influence, not spectacle.

---

## Tier 1: Now Playing (ships first)

### What it does
- When listening: album art, track name, artist, a living indicator (subtle pulse or glow)
- When not listening: "lately listening to" -- last track or recent rotation, small stack of album art
- The component is quieter in the idle state but still present, still personal

### Placement (explore during build)
- Persistent element visible on every page -- fixed bottom corner or strip along bottom of header
- Expands on hover/tap for more detail
- Must work well on all viewports -- collapses gracefully on mobile

### Architecture
- Vercel serverless function at `/api/lastfm` proxies the API call (keeps key server-side)
- Custom hook polls every 15-30 seconds
- Component at `src/components/interactive/NowPlaying.tsx`
- Service wrapper at `services/lastfm.ts`

### API endpoints used
- `user.getRecentTracks` (limit=1) -- includes `nowplaying=true` flag for current track
- `user.getRecentTracks` (limit=5-10) -- for the "lately listening to" idle state

### Design direction
- Filament metaphor: the component glows warm when music is flowing, dims when idle (echoes the theme toggle icon)
- Album art as a small luminous square -- the only photographic element in the UI, which makes it stand out naturally
- Token colors only for text and borders. The album art provides its own color.
- `prefers-reduced-motion`: no pulse animation, static glow state instead

---

## Tier 1.5: Ambient Influence (experimental, explore after Tier 1 ships)

The page subtly responds to what's playing. Not layout changes -- mood.

**Ideas to prototype:**
- GlowEffect shifts warmth based on genre or energy (jazz = warmer brass, electronic = cooler magenta)
- Background gets a barely perceptible tint from the album art's dominant color
- The "living" quality of the site changes -- faster ambient animations during energetic music, slower during ambient
- All behind `prefers-reduced-motion` and a user toggle

This is the kind of thing that makes someone say "wait, what just happened?" -- the page feels different but they can't immediately tell why.

---

## Tier 2: Last.fm MCP Server

A standalone MCP server that makes listening data agent-accessible. Both a tool for Justin and a portfolio artifact.

### Tools to expose
| Tool | Description | Last.fm Method |
|------|-------------|----------------|
| `get_now_playing` | Current track or most recent | `user.getRecentTracks` (limit=1) |
| `get_recent_tracks` | Last N tracks with timestamps | `user.getRecentTracks` |
| `get_top_artists` | By time period, with play counts | `user.getTopArtists` |
| `get_top_tracks` | By time period | `user.getTopTracks` |
| `get_top_albums` | By time period | `user.getTopAlbums` |
| `get_loved_tracks` | Curated favorites | `user.getLovedTracks` |
| `get_weekly_chart` | Weekly listening snapshot | `user.getWeeklyTrackChart` |
| `find_similar_artists` | Discovery from a seed artist | `artist.getSimilar` |
| `find_similar_tracks` | Discovery from a seed track | `track.getSimilar` |
| `search_by_tag` | Genre/mood-based exploration | `tag.getTopArtists`, `tag.getTopTracks` |

### Resources
- `lastfm://user/{username}/profile` -- user stats overview
- `lastfm://user/{username}/weekly-report` -- this week's listening summary

### Prompts
- "Analyze my listening patterns for the last month"
- "Build a DJ set based on my recent favorites"
- "What genres have I been gravitating toward?"
- "Find tracks similar to what I've been playing this week"

### Architecture
- TypeScript, `@modelcontextprotocol/sdk`
- STDIO transport (local use with Claude Code / Cursor)
- Lives as `packages/mcp-lastfm/` or separate repo
- API key stored in environment variable

---

## Tier 3: Creative Experiments (/experiments)

Where the music data becomes visual and interactive. Push far, pull back.

### Genre Constellation
Listening data visualized as a star map. Genres are clusters, artists are stars, brightness = play count. Same celestial visual language as the codex. Interactive -- click a star to hear similar artists, see connections.

### Album Art Alchemy
Pull dominant colors from album art. Generate mood boards. Feed palettes into generative backgrounds. The album art is the raw material; the output is abstract, atmospheric, warm.

### Tempo/Energy Timeline
Listening mapped by BPM and energy over time. When did you listen to fast music? Slow? What patterns emerge across weeks and months? A personal rhythm visualization.

### DJ Playlist Generator
Agent uses the MCP server to analyze listening history, identify thematic threads (mood, tempo, genre flow), and suggest a set list. Exports to:
- Rekordbox XML (native format, most compatible)
- `.m3u` playlist files (universal)
- `.csv` for manual import to Serato via third-party tools (MIXO, Lexicon)

### Library Cross-Reference
Cross-reference Last.fm scrobbles with Apple Music library and Audirvana/local folders. Surface:
- What you've scrobbled but don't own
- What you own but never play
- Genre gaps in your library
- Listening themes and flows across platforms

---

## Build Order

1. Get Last.fm API key -- DONE
2. Tier 1: Serverless proxy + NowPlaying component. Ship to production.
3. Tier 1.5: Prototype ambient influence in /experiments
4. Tier 2: MCP server scaffold with `get_now_playing` and `get_recent_tracks`
5. Tier 2: Expand MCP tools (top artists, similar tracks, tag search)
6. Tier 3: First experiment (genre constellation or album art alchemy)
7. Tier 3: DJ playlist generator

---

## Open Questions

- Where exactly does the NowPlaying element live? Fixed corner, header strip, or something else? Prototype a few placements.
- How aggressive should the polling interval be? 15 seconds feels responsive. 30 seconds saves API calls. Last.fm rate limits are generous but worth respecting.
- Should the MCP server live in this repo (monorepo) or as a separate project? Separate repo is cleaner but adds coordination overhead.
- For the ambient influence: how do we detect "genre" or "energy" from Last.fm data? Tags are the most reliable signal. BPM data isn't available from Last.fm directly -- may need a secondary source (Spotify API, MusicBrainz).

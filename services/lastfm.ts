import type { NowPlayingData, Track } from "@core/content/lastfm";

// Same-origin serverless proxy (api/lastfm.ts). The key and username
// live server-side; the client only ever sees scrobble data.
const PROXY_URL = "/api/lastfm";

function parseTrack(raw: Record<string, unknown>): Track {
  const images = raw.image as Array<{ "#text": string; size: string }> | undefined;
  const largeImage = images?.find((img) => img.size === "large")?.["#text"] ?? "";

  return {
    name: (raw.name as string) ?? "",
    artist:
      typeof raw.artist === "string"
        ? raw.artist
        : (raw.artist as Record<string, string>)?.["#text"] ?? "",
    album:
      typeof raw.album === "string"
        ? raw.album
        : (raw.album as Record<string, string>)?.["#text"] ?? "",
    albumArt: largeImage,
    url: (raw.url as string) ?? "",
  };
}

export async function fetchNowPlaying(): Promise<NowPlayingData> {
  const response = await fetch(`${PROXY_URL}?limit=5`);

  if (!response.ok) {
    throw new Error(`Last.fm API error: ${response.status}`);
  }

  const data = await response.json();
  const tracks = data?.recenttracks?.track;

  if (!Array.isArray(tracks) || tracks.length === 0) {
    return { isPlaying: false, track: null, recentTracks: [] };
  }

  const firstTrack = tracks[0];
  const isPlaying =
    firstTrack?.["@attr"]?.nowplaying === "true";

  const recentTracks = tracks.slice(0, 5).map(parseTrack);

  return {
    isPlaying,
    track: recentTracks[0] ?? null,
    recentTracks,
  };
}

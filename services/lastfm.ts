import type { NowPlayingData, Track } from "@core/content/lastfm";

const API_KEY = import.meta.env.VITE_LASTFM_API_KEY;
const USER = import.meta.env.VITE_LASTFM_USER;
const BASE_URL = "https://ws.audioscrobbler.com/2.0/";

function buildUrl(method: string, params: Record<string, string> = {}): string {
  const searchParams = new URLSearchParams({
    method,
    user: USER,
    api_key: API_KEY,
    format: "json",
    ...params,
  });
  return `${BASE_URL}?${searchParams}`;
}

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
  const url = buildUrl("user.getRecentTracks", { limit: "5" });
  const response = await fetch(url);

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

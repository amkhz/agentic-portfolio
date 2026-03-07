/** Last.fm data types -- pure data, no API calls */

export interface Track {
  name: string;
  artist: string;
  album: string;
  albumArt: string;
  url: string;
}

export interface NowPlayingData {
  isPlaying: boolean;
  track: Track | null;
  recentTracks: Track[];
}

// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { NowPlayingData } from "@core/content/lastfm";

const data: NowPlayingData = {
  isPlaying: true,
  track: {
    name: "Sunlight",
    artist: "Homeboy Sandman",
    album: "Rich",
    albumArt: "",
    url: "https://example.test/track",
  },
  recentTracks: [],
};

vi.mock("@services/lastfm", () => ({
  fetchNowPlaying: () => Promise.resolve(data),
}));

const { NowPlaying } = await import("./NowPlaying");

describe("NowPlaying", () => {
  afterEach(() => vi.restoreAllMocks());

  // R2a P0 3: the panel collapses with grid-rows-[0fr] + opacity-0, which
  // hides it visually and leaves its link in the tab order on every page
  // of the site. Tab found an invisible stop on the front door.
  it("keeps the collapsed panel out of the tab order", async () => {
    render(<NowPlaying />);
    const profile = await screen.findByRole("link", {
      name: "View Last.fm profile",
    });
    expect(profile.closest("[inert]")).not.toBeNull();
  });

  it("hands the panel back once it is opened", async () => {
    render(<NowPlaying />);
    const trigger = await screen.findByRole("button", { name: /Sunlight/ });
    fireEvent.click(trigger);
    await waitFor(() => {
      const profile = screen.getByRole("link", {
        name: "View Last.fm profile",
      });
      expect(profile.closest("[inert]")).toBeNull();
    });
  });
});

/**
 * Vercel serverless proxy for Last.fm user.getRecentTracks.
 *
 * Keeps the API key out of the client bundle (closes ADR-004's deferred
 * item). The edge cache collapses polling across visitors: one upstream
 * call per 30s window serves everyone.
 *
 * Deploy infrastructure, not app code -- lives outside the four layers
 * and outside tsconfig's include, so it declares its own process global
 * instead of pulling in @types/node.
 */

declare const process: { env: Record<string, string | undefined> };

const BASE_URL = "https://ws.audioscrobbler.com/2.0/";

export default async function handler(request: Request): Promise<Response> {
  const apiKey = process.env.LASTFM_API_KEY ?? process.env.VITE_LASTFM_API_KEY;
  const user = process.env.LASTFM_USER ?? process.env.VITE_LASTFM_USER;

  if (!apiKey || !user) {
    return Response.json(
      { error: "Last.fm proxy is not configured" },
      { status: 500 },
    );
  }

  const requested = Number(new URL(request.url).searchParams.get("limit"));
  const limit = Number.isInteger(requested)
    ? Math.min(Math.max(requested, 1), 50)
    : 5;

  const upstream = new URL(BASE_URL);
  upstream.search = new URLSearchParams({
    method: "user.getRecentTracks",
    user,
    api_key: apiKey,
    format: "json",
    limit: String(limit),
  }).toString();

  const response = await fetch(upstream);

  if (!response.ok) {
    return Response.json(
      { error: `Last.fm API error: ${response.status}` },
      { status: 502 },
    );
  }

  const data = await response.text();

  return new Response(data, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, s-maxage=30, stale-while-revalidate=30",
    },
  });
}

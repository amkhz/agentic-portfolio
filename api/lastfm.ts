/**
 * Vercel serverless proxy for Last.fm user.getRecentTracks.
 *
 * Keeps the API key out of the client bundle (closes ADR-004's deferred
 * item). The edge cache collapses polling across visitors: one upstream
 * call per 30s window serves everyone.
 *
 * Uses the classic Node (req, res) handler signature -- the Web-standard
 * Request/Response form 500'd on the production runtime (relative
 * req.url broke `new URL()` when invoked Node-style). Deploy
 * infrastructure, not app code: lives outside the four layers and
 * outside tsconfig's include, so it declares its own minimal types
 * instead of pulling in @vercel/node.
 */

declare const process: { env: Record<string, string | undefined> };

interface ProxyRequest {
  url?: string;
}

interface ProxyResponse {
  statusCode: number;
  setHeader(name: string, value: string): void;
  end(body: string): void;
}

const BASE_URL = "https://ws.audioscrobbler.com/2.0/";

function send(
  res: ProxyResponse,
  status: number,
  body: string,
  cacheable = false,
): void {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  if (cacheable) {
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=30, stale-while-revalidate=30",
    );
  }
  res.end(body);
}

export default async function handler(
  req: ProxyRequest,
  res: ProxyResponse,
): Promise<void> {
  const apiKey = process.env.LASTFM_API_KEY ?? process.env.VITE_LASTFM_API_KEY;
  const user = process.env.LASTFM_USER ?? process.env.VITE_LASTFM_USER;

  if (!apiKey || !user) {
    send(res, 500, JSON.stringify({ error: "Last.fm proxy is not configured" }));
    return;
  }

  // req.url is a relative path on the Node runtime; give URL a base.
  const requested = Number(
    new URL(req.url ?? "/", "http://localhost").searchParams.get("limit"),
  );
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

  try {
    const response = await fetch(upstream);
    if (!response.ok) {
      send(
        res,
        502,
        JSON.stringify({ error: `Last.fm API error: ${response.status}` }),
      );
      return;
    }
    send(res, 200, await response.text(), true);
  } catch {
    send(res, 502, JSON.stringify({ error: "Last.fm upstream unreachable" }));
  }
}

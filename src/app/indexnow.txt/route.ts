// IndexNow key file (https://www.indexnow.org). Bing/Yandex/etc. fetch this to
// confirm we own the host before accepting URL submissions from
// scripts/notify-search-engines.mjs, which passes this URL as `keyLocation`.
// The key comes from INDEXNOW_KEY in the server's .env.local (build-time).
export const dynamic = "force-static";

export function GET() {
  const key = process.env.INDEXNOW_KEY;
  if (!key) return new Response("Not Found", { status: 404 });
  return new Response(key, { headers: { "content-type": "text/plain; charset=utf-8" } });
}

#!/usr/bin/env node
// Tell search engines which pages changed, right after a deploy.
//   npm run notify                 → every URL in the live sitemap
//   npm run notify -- <url> <url>  → just those URLs
//   npm run notify -- --dry-run    → print what would be sent, send nothing
//
// Reads (from .env.local via `node --env-file`):
//   NEXT_PUBLIC_SITE_URL  site origin, default https://www.01weichuang.com
//   INDEXNOW_KEY          IndexNow key (Bing, Yandex, Naver, Seznam …). Served at /indexnow.txt.
//   BAIDU_PUSH_TOKEN      百度站长平台 → 普通收录 → API提交 里的 token
// A missing key/token just skips that engine. Google has no push API: it reads sitemap.xml.

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.01weichuang.com").replace(/\/$/, "");
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const given = args.filter((a) => a.startsWith("http"));

async function sitemapUrls() {
  const res = await fetch(`${SITE}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml → HTTP ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

async function indexNow(urls) {
  const key = process.env.INDEXNOW_KEY;
  if (!key) return "skipped (INDEXNOW_KEY not set)";
  const body = { host: new URL(SITE).host, key, keyLocation: `${SITE}/indexnow.txt`, urlList: urls };
  if (dryRun) return `dry-run: would POST ${urls.length} urls to api.indexnow.org`;
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  // 200 = ok, 202 = accepted (key will be validated later)
  return `${res.status} ${res.ok ? "ok" : (await res.text()).slice(0, 200)}`;
}

async function baidu(urls) {
  const token = process.env.BAIDU_PUSH_TOKEN;
  if (!token) return "skipped (BAIDU_PUSH_TOKEN not set)";
  // Baidu serves Chinese search: only push the zh pages, the daily quota is small.
  const zh = urls.filter((u) => u === `${SITE}/zh` || u.startsWith(`${SITE}/zh/`));
  if (dryRun) return `dry-run: would POST ${zh.length} zh urls to data.zz.baidu.com`;
  const res = await fetch(`http://data.zz.baidu.com/urls?site=${encodeURIComponent(SITE)}&token=${token}`, {
    method: "POST",
    headers: { "content-type": "text/plain" },
    body: zh.join("\n"),
  });
  const text = await res.text();
  return `${res.status} ${text.slice(0, 200)}`;
}

const urls = given.length ? given : await sitemapUrls();
console.log(`site: ${SITE}\nurls: ${urls.length}${dryRun ? " (dry-run)" : ""}`);
if (given.length || dryRun) urls.forEach((u) => console.log("  " + u));

const results = await Promise.allSettled([indexNow(urls), baidu(urls)]);
const names = ["IndexNow (Bing…)", "Baidu"];
let failed = false;
results.forEach((r, i) => {
  const msg = r.status === "fulfilled" ? r.value : `ERROR ${r.reason?.message ?? r.reason}`;
  if (r.status === "rejected" || /^[45]\d\d/.test(msg) || msg.startsWith("ERROR")) failed = true;
  console.log(`${names[i]}: ${msg}`);
});
process.exit(failed ? 1 : 0);

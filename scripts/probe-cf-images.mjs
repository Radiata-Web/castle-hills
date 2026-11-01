#!/usr/bin/env node
/**
 * Probe img.chstainandrestoration.com for object keys used by the site.
 *
 * Usage:
 *   node scripts/probe-cf-images.mjs
 *   node scripts/probe-cf-images.mjs --keys-file /tmp/r2-keys.txt
 *
 * Exit 0 always; prints a markdown table of results.
 */

const CDN = (process.env.VITE_IMAGE_CDN_BASE || "https://img.chstainandrestoration.com").replace(
  /\/$/,
  "",
);
const REFERER = process.env.PROBE_REFERER || "https://chstainandrestoration.com/";

const DEFAULT_IDS = [
  "paint/ex-paint-1-after",
  "paint/ex-paint-1-before",
  "paint/ex-paint-2",
  "paint/ex-paint-4",
  "paint/in-paint-1",
  "paint/in-paint-2",
  "stain/stain-2",
  "stain/stain-4",
  "pergolas/pergola-1",
  "pergolas/pergola-6",
  "patio-cover",
  "gates/gate-1",
  "garages/garage-1",
];

function keysForId(id) {
  const base = id.replace(/^\/+/, "").replace(/^photos\//, "").replace(/\.(webp|jpe?g|png)$/i, "");
  return [
    `photos/${base}.webp`,
    `${base}.webp`,
    `photos/${base}.jpg`,
    `${base}.jpg`,
    `photos/${base}.jpeg`,
    `photos/${base}.png`,
  ];
}

async function head(url) {
  const res = await fetch(url, {
    method: "HEAD",
    headers: {
      "User-Agent": "castle-hills-image-probe/1.0",
      Referer: REFERER,
    },
    redirect: "manual",
  });
  return res.status;
}

async function main() {
  const args = process.argv.slice(2);
  let ids = DEFAULT_IDS;
  const keysFileIdx = args.indexOf("--keys-file");
  if (keysFileIdx >= 0 && args[keysFileIdx + 1]) {
    const { readFileSync } = await import("node:fs");
    ids = readFileSync(args[keysFileIdx + 1], "utf8")
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);
  }

  console.log(`CDN: ${CDN}`);
  console.log(`Referer: ${REFERER}`);
  console.log("");
  console.log("| logical id | first 200 key | status |");
  console.log("|---|---|---|");

  for (const id of ids) {
    let hit = null;
    let hitStatus = null;
    for (const key of keysForId(id)) {
      const status = await head(`${CDN}/${key}`);
      if (status === 200) {
        hit = key;
        hitStatus = status;
        break;
      }
      hitStatus = status;
    }
    const transformStatus = hit
      ? await head(`${CDN}/cdn-cgi/image/width=400,format=auto/${hit}`)
      : "—";
    console.log(
      `| \`${id}\` | ${hit ? `\`${hit}\`` : "_none_"} | raw ${hitStatus}${hit ? `, transform ${transformStatus}` : ""} |`,
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

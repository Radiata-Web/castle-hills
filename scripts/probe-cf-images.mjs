#!/usr/bin/env node
/**
 * Probe img.chstainandrestoration.com for painting/ + staining/ object keys.
 *
 * Usage: pnpm run probe:images
 */

const CDN = (process.env.VITE_IMAGE_CDN_BASE || "https://img.chstainandrestoration.com").replace(
  /\/$/,
  "",
);
const REFERER = process.env.PROBE_REFERER || "https://chstainandrestoration.com/";

const KNOWN = [
  "painting/paint-ext-1a",
  "painting/paint-ext-1b",
  "painting/paint-ext-2",
  "painting/paint-ext-3a",
  "painting/paint-ext-3b",
  "painting/paint-ext-4",
  "painting/paint-ext-5a",
  "painting/paint-ext-5b",
  "painting/paint-ext-6a",
  "painting/paint-ext-6b",
  "painting/paint-ext-7",
  "painting/paint-ext-8a",
  "painting/paint-ext-8b",
  "painting/paint-ext-9a",
  "painting/paint-ext-9b",
  "painting/paint-int-1a",
  "painting/paint-int-1b",
  "staining/stain-1",
  "staining/stain-2",
  "staining/stain-3",
  "staining/stain-4",
  "staining/stain-5",
  "staining/stain-6",
];

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
  console.log(`CDN: ${CDN}`);
  console.log(`Referer: ${REFERER}`);
  console.log("");
  console.log("| key | raw | transform |");
  console.log("|---|---|---|");

  let ok = 0;
  for (const id of KNOWN) {
    const key = `${id}.jpg`;
    const raw = await head(`${CDN}/${key}`);
    const transform =
      raw === 200 ? await head(`${CDN}/cdn-cgi/image/width=400,format=auto/${key}`) : "—";
    if (raw === 200) ok += 1;
    console.log(`| \`${key}\` | ${raw} | ${transform} |`);
  }
  console.log("");
  console.log(`OK ${ok}/${KNOWN.length}`);
  if (ok !== KNOWN.length) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

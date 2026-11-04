#!/usr/bin/env node
/**
 * Probe production (or SITE_URL) redirects after Phase 2+ cutover deploy.
 *
 * Usage: pnpm run probe:redirects
 * Optional: SITE_URL=https://chstainandrestoration.com pnpm run probe:redirects
 */

const SITE = (process.env.SITE_URL || "https://chstainandrestoration.com").replace(/\/$/, "");

/** Legacy paths that must 301 to the new IA (final Location path). */
const REDIRECTS = [
  ["/contact", "/contact-us"],
  ["/luxury-finishes-coatings", "/painting"],
  ["/fence-services", "/wood-staining/fence"],
  ["/custom-wood-structures-outdoor-design", "/wood-staining/patio-pergola"],
  ["/interior-exterior-restoration-renovation", "/painting"],
  ["/home-restoration-remodeling", "/painting"],
  ["/interior-painting", "/painting/interior"],
  ["/exterior-painting", "/painting/exterior"],
  ["/interior-exterior-painting", "/painting"],
  ["/fence-staining", "/wood-staining/fence"],
  ["/fence-and-garage-door-stain", "/wood-staining/fence"],
  ["/wood-fences", "/wood-staining/fence"],
  ["/metal-fences", "/wood-staining"],
  ["/automatic-gates", "/wood-staining"],
  ["/pergolas-and-patio-covers", "/wood-staining/patio-pergola"],
  ["/patio-covers", "/wood-staining/patio-pergola"],
];

/** Launch URLs that must be live 200 (not 404). */
const LIVE = [
  "/",
  "/contact-us",
  "/painting",
  "/painting/interior",
  "/painting/exterior",
  "/wood-staining",
  "/wood-staining/fence",
  "/wood-staining/patio-pergola",
  "/wood-staining/exterior-wood",
  "/sitemap.xml",
];

function normalizePath(location) {
  if (!location) return "";
  try {
    if (location.startsWith("http://") || location.startsWith("https://")) {
      return new URL(location).pathname.replace(/\/$/, "") || "/";
    }
  } catch {
    /* fall through */
  }
  return location.split("?")[0].replace(/\/$/, "") || "/";
}

async function head(path) {
  const res = await fetch(`${SITE}${path}`, {
    method: "HEAD",
    redirect: "manual",
    headers: { "User-Agent": "castle-hills-redirect-probe/1.0" },
  });
  return {
    status: res.status,
    location: normalizePath(res.headers.get("location")),
  };
}

async function main() {
  console.log(`SITE: ${SITE}`);
  console.log("");
  console.log("## Redirects (expect 301 → canonical)");
  console.log("| from | status | location | ok |");
  console.log("|---|---|---|---|");

  let redirectOk = 0;
  for (const [from, to] of REDIRECTS) {
    const { status, location } = await head(from);
    const ok = status === 301 && location === to;
    if (ok) redirectOk += 1;
    console.log(`| \`${from}\` | ${status} | \`${location || "—"}\` | ${ok ? "yes" : "NO"} |`);
  }

  console.log("");
  console.log("## Live launch URLs (expect 200)");
  console.log("| path | status | ok |");
  console.log("|---|---|---|");

  let liveOk = 0;
  for (const path of LIVE) {
    const { status } = await head(path);
    const ok = status === 200;
    if (ok) liveOk += 1;
    console.log(`| \`${path}\` | ${status} | ${ok ? "yes" : "NO"} |`);
  }

  console.log("");
  console.log(
    `Redirects ${redirectOk}/${REDIRECTS.length} · Live ${liveOk}/${LIVE.length}`,
  );
  if (redirectOk !== REDIRECTS.length || liveOk !== LIVE.length) {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

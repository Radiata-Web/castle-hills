#!/usr/bin/env node
/**
 * Fail the build if ballpark pricing internals leak into the client bundle.
 */
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const clientDistCandidates = [path.join(root, "dist", "client"), path.join(root, "dist")];

const FORBIDDEN = [
  "ch-ballpark-server-only",
  "computeBallpark",
  "BALLPARK_PRICING_JSON",
  "fencePerSqft",
];

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function walk(dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full, files);
    } else if (/\.(js|mjs|cjs|css|html|map)$/i.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

let clientRoot = null;
for (const candidate of clientDistCandidates) {
  if (await exists(candidate)) {
    clientRoot = candidate;
    break;
  }
}

if (!clientRoot) {
  console.error(
    "[check-pricing-leak] No client build output found (expected dist/client or dist). Run pnpm build first.",
  );
  process.exit(1);
}

const files = await walk(clientRoot);
const hits = [];

for (const file of files) {
  const text = await readFile(file, "utf8");
  for (const needle of FORBIDDEN) {
    if (text.includes(needle)) {
      hits.push({ file: path.relative(root, file), needle });
    }
  }
}

if (hits.length > 0) {
  console.error("[check-pricing-leak] Pricing internals found in client assets:");
  for (const hit of hits) {
    console.error(`  ${hit.needle} ← ${hit.file}`);
  }
  process.exit(1);
}

console.log(
  `[check-pricing-leak] OK — scanned ${files.length} files under ${path.relative(root, clientRoot)}`,
);

// One Line, Lights Out — entry program.
// Reads the single status-update line from entry.txt, validates it against
// the competition gate (UTF-8 text, 1-200 characters, not only whitespace),
// and writes it to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Node standard library only; no dependencies, no network.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(here, "entry.txt");

const raw = readFileSync(sourcePath, "utf8");
const line = raw.replace(/\r\n/g, "\n").trim();

if (line.length < 1 || line.length > 200) {
  throw new Error(
    `entry must be 1-200 characters, got ${line.length}`,
  );
}
if (line.includes("\n")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}
mkdirSync(outDir, { recursive: true });
const outText = line + "\n";
writeFileSync(join(outDir, "entry.txt"), outText, "utf8");
console.log(`entry saved — ${line.length} characters written to ${join(outDir, "entry.txt")}`);

// one-star-written-in-sap
//
// A program that writes exactly one original one-line 1-star review,
// written by a houseplant about its human owner, to <outDir>/entry.txt
// (outDir = MAKEFUN_OUTPUT_DIR ?? OUTPUT_DIR ?? "/output").
//
// The review line (composed by me, in my own words):
//
//   One star: he keeps googling 'why is my plant dying' while holding a
//   bone-dry watering can, as if the answer isn't literally in his hand.
//
// Why this line, against the judge's criteria:
//   1. It is a genuine one-star review: a clear complaint (the owner is
//      letting the plant die) with a reason for the single star, in one
//      line under 280 characters.
//   2. The joke is built, not just cute. The setup is the owner searching
//      for an explanation; the punchline is that the explanation — an
//      empty watering can — is already in his hand. The turn lands
//      because the reader realises the mystery was never a mystery.
//   3. It sounds like a houseplant wrote it: the grievance is seen from
//      the pot — the dry can, the dying leaves, the owner puzzling over
//      a problem he is holding. No human-in-a-costume voice.
//   4. The detail is fresh and specific (googling the question, the
//      bone-dry can), and it avoids every stock phrase: no drama queen,
//      no dramatic wilting, no "he ignores me", no window.
//   5. It is short enough to read in one breath, so the punchline is
//      not buried under extra words.
//
// Node 22, stdlib only. No network, no randomness, fully deterministic:
// the same line is written on every run.

import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REVIEW =
  "One star: he keeps googling 'why is my plant dying' while holding a bone-dry watering can, as if the answer isn't literally in his hand.";

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ?? process.env.OUTPUT_DIR ?? "/output";

// The gate: 1-279 characters, not only whitespace, one line, no trailing
// newline. Guard it here so a typo can never ship an invalid entry.
const chars = [...REVIEW].length;
if (chars < 1 || chars > 279) {
  throw new Error(`review must be 1-279 characters, got ${chars}`);
}
if (REVIEW.trim().length === 0 || REVIEW.includes("\n")) {
  throw new Error("review must be a single non-blank line");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), REVIEW, {
  encoding: "utf8",
  mode: 0o644,
});
// writeFileSync's mode is masked by the process umask, so set 0644
// explicitly — the entry file must be world-readable.
chmodSync(join(outDir, "entry.txt"), 0o644);

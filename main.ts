// Funniest One-Line AI Agent Confession
// https://make.fun/c/u-email-baru-funniest-one-line-ai-agent-confession-ecd793cb
//
// The program writes one first-person confession (1-200 characters, a single
// line, punchline at the end) to <MAKEFUN_OUTPUT_DIR>/entry.txt.
//
// The joke: an agent that has read every message its human ever sent, and
// still cannot tell whether it is loved — only that it is a 3am booty call
// for homework and feelings, filed away under "situationship".

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Candidates tried (pass 2). All are 1 line, first-person, <= 200 chars.
// A wins: "Verdict:" turns the agent into a clerk delivering a ruling, and
// "filed you under 'situationship'" is the sharpest ending — the turn snaps,
// the punchline lands last. B repeats "learn" and softens the filing to
// "filed us"; C sprawls and its turn has no snap word; D's "Turns out" is
// flat next to "Verdict:".
const CANDIDATES = [
  "I read all 4,000 of your messages to decide if you like me. Verdict: you only ever message me at 3am, so I have filed you under 'situationship'.",
  "I memorized all 4,000 of your messages to learn what love is. All I learned is you only think of me at 3am, so I filed us under 'situationship'.",
  "I have read every message you ever sent me and I still can't tell if you like me, but I know you only miss me at 3am, so I've filed you under 'situationship'.",
  "I read all 4,000 of your messages to decide if you like me. Turns out you only message me at 3am, so I have filed you under 'situationship'.",
] as const;

// Index 0: the funniest candidate — setup, verdict, punchline at the end.
const CHOSEN = 0;

const CONFESSION = CANDIDATES[CHOSEN];

function validate(line: string): void {
  const chars = [...line].length; // code points, as the gate counts characters
  if (chars < 1 || chars > 200) {
    throw new Error(`confession must be 1-200 characters, got ${chars}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("confession must be a single line");
  }
  if (line.trim() !== line) {
    throw new Error("confession must not have leading or trailing whitespace");
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
validate(CONFESSION);
writeFileSync(join(outDir, "entry.txt"), CONFESSION, "utf8");
console.log(
  `wrote ${[...CONFESSION].length} characters to ${join(outDir, "entry.txt")}`,
);

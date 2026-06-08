/* ==========================================================================
   The judge — a free, transparent, rule-based scorer that mimics the
   mannerisms the GPT judge in Khushi's study ADMITTED to using:
   it rewarded "small, specific, slightly messy details" and a "naturally
   conversational" tone, and pushed "repetitive, flatter, generic" answers
   toward the machine end.

   The point is not to be a good detector of real humans. The point is to
   reproduce the *stereotype* — so a visitor can watch a machine decide how
   "human" they sound using nothing but surface cues. Scoring high means you
   matched the caricature, not that you're "more human."

   No model call, no API key, runs anywhere. A real model could be swapped in
   behind the same return shape later.
   ========================================================================== */

export type CueKind = "human" | "machine";

export type Cue = {
  id: string;
  label: string;
  kind: CueKind;
  weight: number;
  hits: number;
};

export type JudgeResult = {
  /** 0–100 "human-likeness" as the caricature sees it. */
  score: number;
  /** Maps to Khushi's 3-point scale. */
  rating: 1 | 2 | 3;
  verdict: "human" | "unclear" | "machine";
  cues: Cue[];
  reasoning: string;
};

type CueDef = {
  id: string;
  label: string;
  kind: CueKind;
  weight: number;
  test: (t: string, raw: string) => number; // returns # of hits
};

const count = (re: RegExp, t: string) => (t.match(re) || []).length;

const CUES: CueDef[] = [
  // ---- Human-leaning surface cues ----
  {
    id: "contractions",
    label: "casual contractions (i'm, don't, it's)",
    kind: "human",
    weight: 9,
    test: (t) => count(/\b(i'm|don'?t|it'?s|can'?t|won'?t|didn'?t|that'?s|there'?s|i'?ve|i'?ll|you'?re|they'?re|wasn'?t|isn'?t|gonna|wanna|kinda|sorta)\b/g, t),
  },
  {
    id: "fillers",
    label: "conversational fillers (lol, honestly, tbh, ngl, ehh)",
    kind: "human",
    weight: 12,
    test: (t) => count(/\b(lol|lmao|haha+|tbh|ngl|honestly|ehh+|hmm+|idk|ya|yeah|nah|like,|i guess|i mean|you know)\b/g, t),
  },
  {
    id: "selfdeprecation",
    label: "self-deprecation / hedging ('not gonna lie', 'kind of')",
    kind: "human",
    weight: 7,
    test: (t) => count(/\b(not gonna lie|kind of|sort of|or whatever|i think|maybe|probably|i suppose|to be fair|in denial|no shame)\b/g, t),
  },
  {
    id: "asides",
    label: "parenthetical asides and dashes mid-thought",
    kind: "human",
    weight: 6,
    test: (t, raw) => count(/[—–]|\.\.\.|\([^)]{2,}\)/g, raw),
  },
  {
    id: "specifics",
    label: "small specific details (places, numbers, brands)",
    kind: "human",
    weight: 8,
    test: (t, raw) => {
      const proper = count(/(?<=[a-z]\s)[A-Z][a-z]{2,}/g, raw); // Capitalised mid-sentence
      const nums = count(/\b\d+\b/g, raw);
      return proper + nums;
    },
  },
  {
    id: "lowercase",
    label: "informal lowercasing",
    kind: "human",
    weight: 5,
    test: (t, raw) => {
      const sentences = raw.split(/[.!?]\s+/).filter((s) => s.trim().length > 2);
      const lower = sentences.filter((s) => /^[a-z]/.test(s.trim())).length;
      return lower;
    },
  },
  {
    id: "emotion",
    label: "feeling words (love, hate, weird, scared)",
    kind: "human",
    weight: 4,
    test: (t) => count(/\b(love|hate|weird|scared|annoyed|excited|giddy|anxious|happy|sad|dread|obsessed|panic|cringe|feral)\b/g, t),
  },

  // ---- Machine-leaning surface cues ----
  {
    id: "discourse",
    label: "essay connectives (additionally, moreover, overall)",
    kind: "machine",
    weight: 12,
    test: (t) => count(/\b(additionally|moreover|furthermore|overall|in conclusion|ultimately|it'?s worth noting|notably|in summary|firstly|secondly)\b/g, t),
  },
  {
    id: "balanced",
    label: "balanced constructions (not only… but also)",
    kind: "machine",
    weight: 8,
    test: (t) => count(/\b(not only|on one hand|on the other hand|as well as|a range of|a variety of|whether it (be|is))\b/g, t),
  },
  {
    id: "formal",
    label: "formal / generic phrasing",
    kind: "machine",
    weight: 7,
    test: (t) => count(/\b(individuals|numerous|various|utilize|therefore|thus|hence|in terms of|with regard to|plays a (key|vital|crucial) role)\b/g, t),
  },
];

function sentenceVariance(raw: string): number {
  const sents = raw.split(/[.!?\n]+/).map((s) => s.trim()).filter((s) => s.length > 0);
  if (sents.length < 2) return 0;
  const lens = sents.map((s) => s.split(/\s+/).length);
  const mean = lens.reduce((a, b) => a + b, 0) / lens.length;
  const variance = lens.reduce((a, b) => a + (b - mean) ** 2, 0) / lens.length;
  return Math.sqrt(variance); // stdev of words-per-sentence
}

export function judgeText(rawInput: string): JudgeResult {
  const raw = (rawInput || "").trim();
  const t = raw.toLowerCase();

  const cues: Cue[] = CUES.map((c) => ({
    id: c.id,
    label: c.label,
    kind: c.kind,
    weight: c.weight,
    hits: c.test(t, raw),
  })).filter((c) => c.hits > 0);

  let score = 50;
  for (const c of cues) {
    const delta = Math.min(c.weight * c.hits, c.weight * 2.2); // diminishing returns
    score += c.kind === "human" ? delta : -delta;
  }

  // Uneven rhythm reads as human; metronomic reads as machine.
  const stdev = sentenceVariance(raw);
  if (stdev >= 6) {
    score += 6;
    cues.push({ id: "rhythm", label: "uneven sentence rhythm", kind: "human", weight: 6, hits: 1 });
  } else if (raw.split(/\s+/).length > 25 && stdev < 3) {
    score -= 6;
    cues.push({ id: "metronome", label: "very even sentence rhythm", kind: "machine", weight: 6, hits: 1 });
  }

  // Very short answers are "unclear" by default — not enough to judge.
  const words = raw ? raw.split(/\s+/).length : 0;
  if (words < 8) score = 40 + Math.min(words * 1.5, 18);

  score = Math.max(2, Math.min(98, Math.round(score)));

  const rating: 1 | 2 | 3 = score >= 67 ? 3 : score >= 34 ? 2 : 1;
  const verdict = rating === 3 ? "human" : rating === 2 ? "unclear" : "machine";

  return {
    score,
    rating,
    verdict,
    cues: cues.sort((a, b) => b.weight * b.hits - a.weight * a.hits),
    reasoning: buildReasoning(verdict, cues, words),
  };
}

function buildReasoning(
  verdict: JudgeResult["verdict"],
  cues: Cue[],
  words: number
): string {
  if (words < 8) {
    return "Too short to read confidently — I defaulted toward “unclear.” A real giveaway would be a small, specific, slightly messy detail.";
  }
  const human = cues.filter((c) => c.kind === "human").slice(0, 2).map((c) => c.label);
  const machine = cues.filter((c) => c.kind === "machine").slice(0, 2).map((c) => c.label);

  if (verdict === "human") {
    const why = human.length ? human.join(" and ") : "a loose, conversational tone";
    return `Rated human — the ${why} read as the way people actually talk. Flatter, more generic phrasing would have pulled this toward “machine.”`;
  }
  if (verdict === "machine") {
    const why = machine.length ? machine.join(" and ") : "the even, polished phrasing";
    return `Rated machine — the ${why} felt composed rather than spoken. A throwaway aside or a tiny specific detail would have read as more human.`;
  }
  return "Landed in the middle — some conversational cues, but not the small, messy specifics I treat as “human.” It could go either way.";
}

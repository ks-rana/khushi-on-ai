/* ==========================================================================
   Storage for the live crowd data.

   - If Vercel KV / Upstash env vars are present, it uses them (durable, shared).
   - Otherwise it falls back to an in-memory store seeded with Khushi's study,
     so the site fully works locally and on a fresh deploy with no database.
     (In-memory does not persist across serverless cold starts — that's the
     cue to add the free KV database, which flips this on with zero code change.)
   ========================================================================== */

import { STUDY_RESULT, SPOT_PAIRS } from "@/content/spotData";

export type BeJudgedPayload = {
  type: "bejudged";
  score: number; // 0–100 overall
  rating: number; // total on the 3-pt scale
  max: number;
  cues: { id: string; kind: "human" | "machine"; hits: number }[];
  answer?: string; // opt-in only
  domain?: string;
};

export type BeJudgePayload = {
  type: "bejudge";
  correct: number;
  total: number;
};

export type FeedbackPayload = {
  type: "feedback";
  text: string;
};

export type Payload = BeJudgedPayload | BeJudgePayload | FeedbackPayload;

export type Stats = {
  beJudged: { count: number; avgScore: number; buckets: [number, number, number] };
  beJudge: { count: number; correct: number; total: number; accuracy: number };
  aiJudgeAccuracy: number; // how often the AI judge picked the human, from the study pairs
  cues: { id: string; count: number }[];
  wall: { text: string; score: number }[];
  study: typeof STUDY_RESULT;
};

// ---------- AI-judge accuracy on the real pairs (it almost never picks the human) ----------
const AI_JUDGE_CORRECT = SPOT_PAIRS.filter((p) => p.human.judge > p.ai.judge).length;
const AI_JUDGE_ACCURACY = Math.round((AI_JUDGE_CORRECT / SPOT_PAIRS.length) * 100);

// ---------- In-memory fallback, seeded with the study ----------
const mem = {
  bj_count: 1, // Khushi is data point #1
  bj_sum: Math.round((STUDY_RESULT.humanScore / STUDY_RESULT.max) * 100),
  buckets: [0, 1, 0] as [number, number, number], // her ~67% lands in the middle bucket
  j_count: 0,
  j_correct: 0,
  j_total: 0,
  cues: new Map<string, number>(),
  wall: [] as { text: string; score: number }[],
  feedback: [] as string[],
};

function bucketOf(score: number): 0 | 1 | 2 {
  return score >= 67 ? 2 : score >= 34 ? 1 : 0;
}

// ---------- Optional Vercel KV / Upstash REST ----------
const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;
const useKV = Boolean(KV_URL && KV_TOKEN);

async function kv(cmd: (string | number)[]): Promise<unknown> {
  const res = await fetch(KV_URL as string, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${KV_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cmd),
    cache: "no-store",
  });
  const json = (await res.json()) as { result?: unknown };
  return json.result;
}

async function seedKVIfEmpty() {
  const exists = await kv(["EXISTS", "seeded"]);
  if (exists) return;
  await kv(["SET", "seeded", "1"]);
  await kv(["HSET", "stats", "bj_count", mem.bj_count, "bj_sum", mem.bj_sum, "b1", 1]);
}

export async function record(p: Payload): Promise<void> {
  if (useKV) {
    if (p.type === "bejudged") {
      await seedKVIfEmpty();
      await kv(["HINCRBY", "stats", "bj_count", 1]);
      await kv(["HINCRBY", "stats", "bj_sum", Math.round(p.score)]);
      await kv(["HINCRBY", "stats", `b${bucketOf(p.score)}`, 1]);
      for (const c of p.cues) await kv(["HINCRBY", "cues", c.id, c.hits]);
      if (p.answer) {
        await kv(["LPUSH", "wall", JSON.stringify({ text: p.answer.slice(0, 600), score: p.score })]);
        await kv(["LTRIM", "wall", 0, 199]);
      }
    } else if (p.type === "bejudge") {
      await kv(["HINCRBY", "stats", "j_count", 1]);
      await kv(["HINCRBY", "stats", "j_correct", p.correct]);
      await kv(["HINCRBY", "stats", "j_total", p.total]);
    } else if (p.type === "feedback") {
      await kv(["LPUSH", "feedback", p.text.slice(0, 1000)]);
      await kv(["LTRIM", "feedback", 0, 499]);
    }
    return;
  }

  // in-memory
  if (p.type === "bejudged") {
    mem.bj_count++;
    mem.bj_sum += Math.round(p.score);
    mem.buckets[bucketOf(p.score)]++;
    for (const c of p.cues) mem.cues.set(c.id, (mem.cues.get(c.id) || 0) + c.hits);
    if (p.answer) {
      mem.wall.unshift({ text: p.answer.slice(0, 600), score: p.score });
      mem.wall = mem.wall.slice(0, 200);
    }
  } else if (p.type === "bejudge") {
    mem.j_count++;
    mem.j_correct += p.correct;
    mem.j_total += p.total;
  } else if (p.type === "feedback") {
    mem.feedback.unshift(p.text.slice(0, 1000));
    mem.feedback = mem.feedback.slice(0, 500);
  }
}

export async function getStats(): Promise<Stats> {
  if (useKV) {
    await seedKVIfEmpty();
    const s = ((await kv(["HGETALL", "stats"])) as string[]) || [];
    const map: Record<string, number> = {};
    for (let i = 0; i < s.length; i += 2) map[s[i]] = Number(s[i + 1]) || 0;
    const cuesRaw = ((await kv(["HGETALL", "cues"])) as string[]) || [];
    const cues: { id: string; count: number }[] = [];
    for (let i = 0; i < cuesRaw.length; i += 2) cues.push({ id: cuesRaw[i], count: Number(cuesRaw[i + 1]) || 0 });
    const wallRaw = ((await kv(["LRANGE", "wall", 0, 19])) as string[]) || [];
    const wall = wallRaw.map((w) => { try { return JSON.parse(w); } catch { return null; } }).filter(Boolean);

    const bjCount = map.bj_count || 1;
    const jTotal = map.j_total || 0;
    return {
      beJudged: {
        count: bjCount,
        avgScore: Math.round((map.bj_sum || 0) / bjCount),
        buckets: [map.b0 || 0, map.b1 || 0, map.b2 || 0],
      },
      beJudge: {
        count: map.j_count || 0,
        correct: map.j_correct || 0,
        total: jTotal,
        accuracy: jTotal ? Math.round(((map.j_correct || 0) / jTotal) * 100) : 0,
      },
      aiJudgeAccuracy: AI_JUDGE_ACCURACY,
      cues: cues.sort((a, b) => b.count - a.count),
      wall,
      study: STUDY_RESULT,
    };
  }

  // in-memory
  return {
    beJudged: {
      count: mem.bj_count,
      avgScore: Math.round(mem.bj_sum / mem.bj_count),
      buckets: mem.buckets,
    },
    beJudge: {
      count: mem.j_count,
      correct: mem.j_correct,
      total: mem.j_total,
      accuracy: mem.j_total ? Math.round((mem.j_correct / mem.j_total) * 100) : 0,
    },
    aiJudgeAccuracy: AI_JUDGE_ACCURACY,
    cues: [...mem.cues.entries()].map(([id, count]) => ({ id, count })).sort((a, b) => b.count - a.count),
    wall: mem.wall.slice(0, 20),
    study: STUDY_RESULT,
  };
}

import { NextRequest, NextResponse } from "next/server";
import { judgeText, type JudgeResult } from "@/lib/judge";

export const runtime = "nodejs";

// ---- Tiny in-memory rate limiter (per IP, sliding window) ----
const WINDOW_MS = 60_000;
const MAX_REQ = 30;
const hits = new Map<string, number[]>();

function limited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > MAX_REQ;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "local";

  if (limited(ip)) {
    return NextResponse.json(
      { error: "Slow down a moment — too many requests." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const answers = (body as { answers?: unknown })?.answers;
  if (!Array.isArray(answers) || answers.length === 0 || answers.length > 12) {
    return NextResponse.json({ error: "Expected 1–12 answers." }, { status: 400 });
  }

  const results: JudgeResult[] = answers.map((a) =>
    judgeText(String(a ?? "").slice(0, 2000))
  );

  const overall = Math.round(
    results.reduce((s, r) => s + r.score, 0) / results.length
  );
  const total15 = results.reduce((s, r) => s + r.rating, 0); // out of (n*3)

  return NextResponse.json({
    results,
    overall,
    total: total15,
    max: results.length * 3,
    mode: "heuristic",
  });
}

import { NextRequest, NextResponse } from "next/server";
import { record, getStats, type Payload } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Tiny per-IP rate limit for writes.
const WINDOW_MS = 60_000;
const MAX_WRITES = 20;
const hits = new Map<string, number[]>();
function limited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > MAX_WRITES;
}

export async function GET() {
  try {
    const stats = await getStats();
    return NextResponse.json(stats);
  } catch {
    return NextResponse.json({ error: "Could not load stats." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "local";
  if (limited(ip)) {
    return NextResponse.json({ error: "Too many submissions." }, { status: 429 });
  }

  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Validate by type — never trust the client.
  try {
    if (body.type === "bejudged") {
      if (typeof body.score !== "number") throw 0;
      await record({
        type: "bejudged",
        score: Math.max(0, Math.min(100, body.score)),
        rating: Number(body.rating) || 0,
        max: Number(body.max) || 0,
        cues: Array.isArray(body.cues) ? body.cues.slice(0, 20) : [],
        answer: typeof body.answer === "string" ? body.answer.slice(0, 600) : undefined,
        domain: typeof body.domain === "string" ? body.domain.slice(0, 60) : undefined,
      });
    } else if (body.type === "bejudge") {
      await record({
        type: "bejudge",
        correct: Math.max(0, Math.min(50, Number(body.correct) || 0)),
        total: Math.max(0, Math.min(50, Number(body.total) || 0)),
      });
    } else if (body.type === "feedback") {
      const text = String(body.text || "").trim();
      if (text.length < 2) throw 0;
      await record({ type: "feedback", text: text.slice(0, 1000) });
    } else {
      throw 0;
    }
  } catch {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}

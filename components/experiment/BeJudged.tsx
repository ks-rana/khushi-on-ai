"use client";

import { useState } from "react";
import type { JudgeResult } from "@/lib/judge";
import s from "./experiment.module.css";

const PROMPTS = [
  "What’s a normal weekday usually like for you?",
  "What’s a small thing that instantly makes your day better?",
  "What’s a random memory that always makes you smile?",
];

type ApiResp = {
  results: JudgeResult[];
  overall: number;
  total: number;
  max: number;
};

export default function BeJudged({
  save,
  onDone,
}: {
  save: boolean;
  onDone: (yourScore: number) => void;
}) {
  const [answers, setAnswers] = useState(["", "", ""]);
  const [share, setShare] = useState(false);
  const [data, setData] = useState<ApiResp | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const ready = answers.every((a) => a.trim().split(/\s+/).length >= 4);

  async function submit() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/judge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      if (!res.ok) throw new Error();
      const json: ApiResp = await res.json();
      setData(json);

      if (save) {
        const cueMap = new Map<string, { id: string; kind: "human" | "machine"; hits: number }>();
        json.results.forEach((r) =>
          r.cues.forEach((c) => {
            const cur = cueMap.get(c.id) || { id: c.id, kind: c.kind, hits: 0 };
            cur.hits += c.hits;
            cueMap.set(c.id, cur);
          })
        );
        const longest = [...answers].sort((a, b) => b.length - a.length)[0];
        fetch("/api/stats", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "bejudged",
            score: json.overall,
            rating: json.total,
            max: json.max,
            cues: [...cueMap.values()],
            answer: share ? longest : undefined,
          }),
        }).catch(() => {});
      }
    } catch {
      setError("The judge didn’t respond. Try again in a moment.");
    } finally {
      setLoading(false);
    }
  }

  if (data) {
    const verdict =
      data.overall >= 67 ? "human" : data.overall >= 34 ? "unclear" : "machine";
    return (
      <div className={s.pad}>
        <p className={s.tag}>The verdict</p>
        <div className={s.verdict}>
          <span className={`${s.verdictNum} ${s[verdict]}`}>{data.overall}</span>
          <span className={s.muted}>
            / 100 — the machine reads you as{" "}
            <strong className={s[verdict]}>
              {verdict === "human" ? "human" : verdict === "machine" ? "a machine" : "unclear"}
            </strong>
          </span>
        </div>
        <p className={s.muted}>
          Remember what this number means: not whether you <em>are</em> human, but
          whether you matched the caricature of “human” the judge was trained to
          reward. Here’s what it reacted to, answer by answer.
        </p>

        {data.results.map((r, i) => (
          <div key={i} className={s.answerResult}>
            <p className={s.qLabel}>
              {PROMPTS[i]} — <span className={s[r.verdict]}>{r.verdict} ({r.score})</span>
            </p>
            <p className={s.reasoning}>{r.reasoning}</p>
            {r.cues.length > 0 && (
              <ul className={s.cueList}>
                {r.cues.slice(0, 4).map((c) => (
                  <li key={c.id} className={s.cue}>
                    <span className={`${s.cueDot} ${s[c.kind]}`} />
                    <span className={s.cueLabel}>
                      {c.kind === "human" ? "read as human:" : "read as machine:"} {c.label}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <hr className={s.divider} />
        <div className={s.row}>
          <button className={s.btn} onClick={() => onDone(data.overall)}>
            See how you compare →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={s.pad}>
      <p className={s.tag}>Be judged · answer as yourself</p>
      <h3 className={s.h}>How human do you sound?</h3>
      <p className={s.p}>
        Answer these three the way you actually talk. A free, transparent judge —
        built to imitate the cues the AI in my study used — will score how human
        you sound, and show its reasoning.
      </p>

      {PROMPTS.map((q, i) => (
        <div key={i} style={{ marginTop: "var(--space-m)" }}>
          <label className={s.q} htmlFor={`a${i}`}>
            {q}
          </label>
          <textarea
            id={`a${i}`}
            className={s.textarea}
            value={answers[i]}
            maxLength={600}
            placeholder="Type a sentence or two…"
            onChange={(e) =>
              setAnswers((prev) => prev.map((a, j) => (j === i ? e.target.value : a)))
            }
          />
          <div className={s.counter}>{answers[i].length}/600</div>
        </div>
      ))}

      {save && (
        <label className={s.optin}>
          <input
            type="checkbox"
            checked={share}
            onChange={(e) => setShare(e.target.checked)}
          />
          <span>
            Add my longest answer (anonymously) to the public wall. Don’t include
            anything you wouldn’t want a stranger to read.
          </span>
        </label>
      )}

      {error && <p className={`${s.muted}`} style={{ color: "var(--accent)" }}>{error}</p>}

      <div className={s.row}>
        <button className={s.btn} onClick={submit} disabled={!ready || loading}>
          {loading ? "Judging…" : "Judge me"}
        </button>
        {!ready && <span className={s.muted}>A few words per answer, please.</span>}
      </div>
    </div>
  );
}

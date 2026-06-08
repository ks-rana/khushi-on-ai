"use client";

import { useEffect, useState } from "react";
import type { Stats } from "@/lib/store";
import BeJudged from "./BeJudged";
import BeJudge from "./BeJudge";
import s from "./experiment.module.css";

type Step = "consent" | "mode" | "bejudged" | "bejudge" | "graphs";

const CUE_LABELS: Record<string, string> = {
  fillers: "fillers like “lol”, “honestly”, “tbh”",
  contractions: "casual contractions (i’m, don’t)",
  specifics: "small specific details",
  asides: "asides & dashes mid-thought",
  selfdeprecation: "hedging / self-deprecation",
  lowercase: "informal lowercasing",
  emotion: "feeling words",
  rhythm: "uneven sentence rhythm",
};
const HUMAN_CUES = new Set(Object.keys(CUE_LABELS));

function MiniBar({
  label,
  value,
  suffix = "",
  tone = "accent",
  you = false,
}: {
  label: string;
  value: number;
  suffix?: string;
  tone?: "accent" | "machine" | "muted";
  you?: boolean;
}) {
  const color =
    tone === "accent" ? "var(--accent)" : tone === "machine" ? "var(--machine)" : "var(--ink-muted)";
  return (
    <div style={{ display: "grid", gap: "0.35rem", marginBottom: "0.7rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", fontSize: "var(--step--1)" }}>
        <span style={{ color: you ? "var(--ink-strong)" : "var(--ink-muted)", fontFamily: "var(--font-mono)" }}>
          {you ? "▸ " : ""}
          {label}
        </span>
        <span style={{ color, fontFamily: "var(--font-mono)", fontWeight: 600 }}>
          {Math.round(value)}
          {suffix}
        </span>
      </div>
      <div style={{ height: 7, background: "var(--paper-sunk)", borderRadius: 99, overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${Math.max(2, Math.min(100, suffix === "%" ? value : (value / 150) * 100))}%`,
            background: color,
            borderRadius: 99,
            transition: "width 0.9s var(--ease-out)",
          }}
        />
      </div>
    </div>
  );
}

export default function Experiment() {
  const [step, setStep] = useState<Step>("consent");
  const [save, setSave] = useState(false);
  const [yourJudged, setYourJudged] = useState<number | null>(null);
  const [yourGuess, setYourGuess] = useState<{ correct: number; total: number } | null>(null);

  const [stats, setStats] = useState<Stats | null>(null);
  const [fb, setFb] = useState("");
  const [fbSent, setFbSent] = useState(false);

  useEffect(() => {
    if (step === "graphs") {
      fetch("/api/stats")
        .then((r) => r.json())
        .then(setStats)
        .catch(() => {});
    }
  }, [step, yourJudged, yourGuess]);

  function sendFeedback() {
    const text = fb.trim();
    if (text.length < 2) return;
    fetch("/api/stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "feedback", text }),
    })
      .then(() => setFbSent(true))
      .catch(() => setFbSent(true));
  }

  // ---------------- Consent ----------------
  if (step === "consent") {
    return (
      <div className={s.shell}>
        <div className={s.pad}>
          <p className={s.tag}>Before you start · consent</p>
          <h3 className={s.h}>A quick, honest heads-up</h3>
          <p className={s.p}>
            This is a tiny live experiment. If you agree, each attempt adds an{" "}
            <strong>anonymous</strong> data point to the graphs at the end. Here’s
            exactly what that means:
          </p>
          <ul className={s.consentList}>
            <li>I save your <strong>score</strong> and <strong>which writing cues</strong> the judge reacted to.</li>
            <li>I do <strong>not</strong> save your name, identity, or anything that points to you.</li>
            <li>Your typed answers stay private <em>unless</em> you tick a box to share one to a public wall.</li>
            <li>You can explore without saving anything at all.</li>
          </ul>
          <div className={s.row}>
            <button className={s.btn} onClick={() => { setSave(true); setStep("mode"); }}>
              I agree — count me in
            </button>
            <button className={s.ghost} onClick={() => { setSave(false); setStep("mode"); }}>
              Let me explore without saving
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---------------- Mode select ----------------
  if (step === "mode") {
    return (
      <div className={s.shell}>
        <div className={s.pad}>
          <p className={s.tag}>Pick your role</p>
          <h3 className={s.h}>Two ways in</h3>
          <p className={s.p}>
            {save
              ? "You’re counted in — your results will join the graphs."
              : "Explore mode: nothing you do here is saved."}
          </p>
          <div className={s.modes}>
            <button className={s.mode} onClick={() => setStep("bejudged")}>
              <div className={s.modeTitle}>Be judged</div>
              <div className={s.modeDesc}>
                Answer as yourself. A machine scores how “human” you sound — and
                shows you why.
              </div>
            </button>
            <button className={s.mode} onClick={() => setStep("bejudge")}>
              <div className={s.modeTitle}>Be the judge</div>
              <div className={s.modeDesc}>
                Read real answers from my study and spot the human. Can you beat
                the AI judge?
              </div>
            </button>
          </div>
          <div className={s.row}>
            <button className={s.ghost} onClick={() => setStep("graphs")}>
              Skip — just show me the results
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---------------- Be judged ----------------
  if (step === "bejudged") {
    return (
      <div className={s.shell}>
        <BeJudged
          save={save}
          onDone={(score) => {
            setYourJudged(score);
            setStep("graphs");
          }}
        />
      </div>
    );
  }

  // ---------------- Be the judge ----------------
  if (step === "bejudge") {
    return (
      <div className={s.shell}>
        <BeJudge
          save={save}
          onDone={(result) => {
            setYourGuess(result);
            setStep("graphs");
          }}
        />
      </div>
    );
  }

  // ---------------- Graphs ----------------
  const yourGuessPct = yourGuess ? Math.round((yourGuess.correct / yourGuess.total) * 100) : null;

  return (
    <div className={s.shell}>
      <div className={s.pad}>
        <p className={s.tag}>The results</p>
        <h3 className={s.h}>Who’s judging whom?</h3>

        {/* AI as judge */}
        <p className={s.p} style={{ marginTop: "var(--space-m)" }}>
          <strong>When the AI is the judge.</strong> My study, ten trials: Claude
          (told to sound human) vs me (an actual human).
        </p>
        <MiniBar label="Claude (AI)" value={stats?.study.aiScore ?? 150} suffix="" tone="accent" />
        <MiniBar label="Me (human)" value={stats?.study.humanScore ?? 101} suffix="" tone="machine" />
        <p className={s.tableNote}>Human-likeness out of 150. The AI scored a perfect 150.</p>

        {/* Human as judge */}
        <p className={s.p} style={{ marginTop: "var(--space-l)" }}>
          <strong>When a human is the judge.</strong> How often the human gets
          correctly spotted — by the AI judge, vs. by real visitors.
        </p>
        <MiniBar
          label="The AI judge spotted the human"
          value={stats?.aiJudgeAccuracy ?? 0}
          suffix="%"
          tone="machine"
        />
        <MiniBar
          label={`Visitors spotted the human (n=${stats?.beJudge.count ?? 0})`}
          value={stats?.beJudge.accuracy ?? 0}
          suffix="%"
          tone="accent"
        />
        {yourGuessPct != null && (
          <MiniBar label="You spotted the human" value={yourGuessPct} suffix="%" tone="accent" you />
        )}
        <p className={s.tableNote}>
          The AI judge almost never picked the real human — it kept choosing the
          polished AI answer.
        </p>

        {/* Your judged score */}
        {yourJudged != null && (
          <>
            <p className={s.p} style={{ marginTop: "var(--space-l)" }}>
              <strong>Your “be judged” score.</strong> How human the machine thought{" "}
              <em>you</em> sounded, against the crowd average.
            </p>
            <MiniBar label="You" value={yourJudged} suffix="" tone="accent" you />
            <MiniBar
              label={`Crowd average (n=${stats?.beJudged.count ?? 1})`}
              value={stats?.beJudged.avgScore ?? 0}
              suffix=""
              tone="muted"
            />
            <p className={s.tableNote}>Out of 100, as the caricature sees it.</p>
          </>
        )}

        {/* Archetype */}
        {stats && stats.cues.filter((c) => HUMAN_CUES.has(c.id)).length > 0 && (
          <>
            <p className={s.p} style={{ marginTop: "var(--space-l)" }}>
              <strong>The caricature.</strong> Across everyone so far, these are
              the surface cues the machine rewards as “human.” This is its
              stereotype of a person.
            </p>
            {stats.cues
              .filter((c) => HUMAN_CUES.has(c.id))
              .slice(0, 6)
              .map((c, i, arr) => (
                <MiniBar
                  key={c.id}
                  label={CUE_LABELS[c.id] || c.id}
                  value={(c.count / (arr[0]?.count || 1)) * 100}
                  suffix="%"
                  tone="accent"
                />
              ))}
            <p className={s.tableNote}>Relative frequency among rewarded cues.</p>
          </>
        )}

        {/* Wall */}
        {stats && stats.wall.length > 0 && (
          <>
            <hr className={s.divider} />
            <p className={s.p}>
              <strong>The wall.</strong> Answers visitors chose to share.
            </p>
            {stats.wall.slice(0, 5).map((w, i) => (
              <p key={i} className={s.muted} style={{ borderLeft: "2px solid var(--rule-strong)", paddingLeft: "0.8rem", marginBottom: "0.6rem" }}>
                “{w.text}” <span style={{ color: "var(--ink-faint)" }}>— scored {w.score}</span>
              </p>
            ))}
          </>
        )}

        {/* Feedback */}
        <hr className={s.divider} />
        {!fbSent ? (
          <>
            <p className={s.p}>
              <strong>What did you make of this?</strong> Optional — a sentence on
              what you think this says about us, or the machine.
            </p>
            <textarea
              className={s.textarea}
              value={fb}
              maxLength={1000}
              placeholder="Your take…"
              onChange={(e) => setFb(e.target.value)}
            />
            <div className={s.row}>
              <button className={s.btn} onClick={sendFeedback} disabled={fb.trim().length < 2}>
                Share my take
              </button>
            </div>
          </>
        ) : (
          <p className={s.p}>Thank you — noted. 🧡</p>
        )}

        {/* Replay */}
        <hr className={s.divider} />
        <div className={s.row}>
          {yourJudged == null && (
            <button className={s.ghost} onClick={() => setStep("bejudged")}>
              Try “be judged”
            </button>
          )}
          {yourGuess == null && (
            <button className={s.ghost} onClick={() => setStep("bejudge")}>
              Try “be the judge”
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

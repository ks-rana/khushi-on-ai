"use client";

import { useState } from "react";
import { SPOT_PAIRS } from "@/content/spotData";
import s from "./experiment.module.css";

type Prepared = {
  id: string;
  domain: string;
  question: string;
  left: { text: string; isHuman: boolean; judge: number };
  right: { text: string; isHuman: boolean; judge: number };
};

function prepare(): Prepared[] {
  const arr = [...SPOT_PAIRS];
  // shuffle order
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, 6).map((p) => {
    const humanLeft = Math.random() < 0.5;
    const h = { text: p.human.text, isHuman: true, judge: p.human.judge };
    const a = { text: p.ai.text, isHuman: false, judge: p.ai.judge };
    return {
      id: p.id,
      domain: p.domain,
      question: p.question,
      left: humanLeft ? h : a,
      right: humanLeft ? a : h,
    };
  });
}

export default function BeJudge({
  save,
  onDone,
}: {
  save: boolean;
  onDone: (result: { correct: number; total: number }) => void;
}) {
  const [items] = useState<Prepared[]>(prepare);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<"left" | "right" | null>(null);
  const [correct, setCorrect] = useState(0);

  const item = items[idx];
  const isLast = idx === items.length - 1;

  function pick(side: "left" | "right") {
    if (picked) return;
    setPicked(side);
    const chosenIsHuman = item[side].isHuman;
    if (chosenIsHuman) setCorrect((c) => c + 1);
  }

  function next() {
    if (isLast) {
      const result = { correct, total: items.length };
      if (save) {
        fetch("/api/stats", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "bejudge", ...result }),
        }).catch(() => {});
      }
      onDone(result);
      return;
    }
    setIdx((i) => i + 1);
    setPicked(null);
  }

  const verdictWord = (j: number) => (j === 3 ? "human" : j === 2 ? "unclear" : "machine");

  return (
    <div className={s.pad}>
      <p className={s.tag}>
        Be the judge · {item.domain} &nbsp;
        <span className={s.progress}>
          {idx + 1} / {items.length}
        </span>
      </p>
      <h3 className={s.q}>{item.question}</h3>
      <p className={s.muted}>
        One is me; one is Claude, told to sound human. Which is the real person?
      </p>

      <div className={s.pair}>
        {(["left", "right"] as const).map((side) => {
          const card = item[side];
          const revealed = picked !== null;
          const wasHuman = card.isHuman;
          return (
            <button
              key={side}
              className={s.card}
              onClick={() => pick(side)}
              aria-pressed={picked === side}
              style={
                revealed
                  ? {
                      borderColor: wasHuman ? "var(--accent)" : "var(--rule)",
                      opacity: wasHuman ? 1 : 0.7,
                      cursor: "default",
                    }
                  : undefined
              }
            >
              <span>{card.text}</span>
              {!revealed && <span className={s.cardPick}>This one’s the human →</span>}
              {revealed && (
                <span className={s.cardPick}>
                  {wasHuman ? "✓ The actual human" : "✗ Claude (the AI)"} · the study’s
                  AI judge called this “{verdictWord(card.judge)}”
                </span>
              )}
            </button>
          );
        })}
      </div>

      {picked && (
        <>
          <p className={s.reasoning}>
            {item[picked].isHuman
              ? "You found the human. Notice the AI judge often didn’t — it tended to score the polished AI answer as more human."
              : "That was the AI. The real human’s answer was the messier, more specific one — exactly what the AI judge kept marking down."}
          </p>
          <div className={s.row}>
            <button className={s.btn} onClick={next}>
              {isLast ? "See your score →" : "Next pair →"}
            </button>
            <span className={s.muted}>
              So far: {correct} / {idx + 1} found
            </span>
          </div>
        </>
      )}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/lib/useInView";
import styles from "./Bars.module.css";

export type BarItem = {
  label: string;
  value: number;
  max: number;
  /** Unit appended to the number, e.g. "%". */
  suffix?: string;
  /** Renders a faint "/ N" after the value, e.g. for "150 / 150". */
  outOf?: number;
  tone?: "accent" | "machine" | "muted";
};

export default function Bars({
  items,
  caption,
}: {
  items: BarItem[];
  caption?: React.ReactNode;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <figure className={styles.figure} ref={ref}>
      <div className={styles.bars}>
        {items.map((it, i) => (
          <Bar key={it.label} item={it} play={inView} delay={i * 140} />
        ))}
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}

function Bar({
  item,
  play,
  delay,
}: {
  item: BarItem;
  play: boolean;
  delay: number;
}) {
  const [n, setN] = useState(0);
  const started = useRef(false);
  const pct = Math.max(0, Math.min(100, (item.value / item.max) * 100));
  const tone = item.tone ?? "accent";

  useEffect(() => {
    if (!play || started.current) return;
    started.current = true;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setN(item.value);
      return;
    }

    const dur = 1100;
    let raf = 0;
    let startTs = 0;
    const tick = (ts: number) => {
      if (!startTs) startTs = ts + delay;
      const t = Math.max(0, Math.min(1, (ts - startTs) / dur));
      const eased = 1 - Math.pow(1 - t, 3);
      setN(item.value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play, item.value, delay]);

  const shown = `${Math.round(n)}${item.suffix ?? ""}`;

  return (
    <div className={styles.row}>
      <div className={styles.meta}>
        <span className={styles.label}>{item.label}</span>
        <span className={`${styles.value} ${styles[tone]}`}>
          {shown}
          {item.outOf != null && (
            <span className={styles.outOf}> / {item.outOf}</span>
          )}
        </span>
      </div>
      <div className={styles.track}>
        <div
          className={`${styles.fill} ${styles[tone]}`}
          style={{
            width: play ? `${pct}%` : "0%",
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

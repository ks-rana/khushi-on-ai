"use client";

import { useEffect, useState } from "react";
import { STATIONS } from "@/content/stations";
import styles from "./Nav.module.css";

export default function Nav() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const sections = STATIONS.map((s) => document.getElementById(s.id)).filter(
      Boolean
    ) as HTMLElement[];

    const obs = new IntersectionObserver(
      (entries) => {
        // Pick the entry nearest the top that is intersecting.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          const idx = STATIONS.findIndex((s) => s.id === visible[0].target.id);
          if (idx >= 0) setActive(idx);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => obs.observe(s));

    // Reveal the rail only after the reader leaves the hero.
    const onScroll = () => setStarted(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function go(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  }

  const progress = ((active + 1) / STATIONS.length) * 100;

  return (
    <>
      {/* Desktop left rail */}
      <nav
        className={`${styles.rail} ${started ? styles.railOn : ""}`}
        aria-label="Sections"
      >
        <ol className={styles.list}>
          {STATIONS.map((s, i) => (
            <li key={s.id}>
              <button
                className={`${styles.item} ${i === active ? styles.itemActive : ""}`}
                onClick={() => go(s.id)}
                aria-current={i === active ? "true" : undefined}
              >
                <span className={styles.dot} aria-hidden="true" />
                <span className={styles.num}>{s.n}</span>
                <span className={styles.label}>{s.short}</span>
              </button>
            </li>
          ))}
        </ol>
      </nav>

      {/* Mobile top bar */}
      <div className={`${styles.bar} ${started ? styles.barOn : ""}`}>
        <div className={styles.barFill} style={{ width: `${progress}%` }} />
        <button
          className={styles.barButton}
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="nav-sheet"
        >
          <span className={styles.barNum}>{STATIONS[active].n}</span>
          <span className={styles.barLabel}>{STATIONS[active].question}</span>
          <span className={styles.barChevron} aria-hidden="true">
            {open ? "▴" : "▾"}
          </span>
        </button>
        {open && (
          <ol id="nav-sheet" className={styles.sheet}>
            {STATIONS.map((s, i) => (
              <li key={s.id}>
                <button
                  className={`${styles.sheetItem} ${i === active ? styles.sheetActive : ""}`}
                  onClick={() => go(s.id)}
                >
                  <span className={styles.num}>{s.n}</span>
                  {s.question}
                </button>
              </li>
            ))}
          </ol>
        )}
      </div>
    </>
  );
}

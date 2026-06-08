"use client";

import ThemeToggle from "./ThemeToggle";
import styles from "./Hero.module.css";

export default function Hero() {
  function jump(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <header className={styles.hero}>
      <div className={styles.topbar}>
        <span className={`mono ${styles.byline}`}>Khushi&nbsp;Suresh&nbsp;Rana</span>
        <ThemeToggle />
      </div>

      <div className={styles.center}>
        <p className={`mono ${styles.kicker}`}>
          An interactive essay · through a psychology lens
        </p>
        <h1 className={styles.title}>
          Is it <em>smart</em>,<br />
          or does it just{" "}
          <span className={styles.accent}>sound</span> like us?
        </h1>
        <p className={styles.standfirst}>
          Five questions I actually investigated about artificial intelligence —
          and one live experiment where a machine decides how human{" "}
          <em>you</em> sound. Spoiler from my own study: it rated the AI as more
          human than me.
        </p>

        <div className={styles.actions}>
          <button className={styles.primary} onClick={() => jump("smart")}>
            Start reading
          </button>
          <button className={styles.ghost} onClick={() => jump("human")}>
            Skip to the experiment
          </button>
        </div>
      </div>

      <button
        className={styles.scrollCue}
        onClick={() => jump("smart")}
        aria-label="Scroll to begin"
      >
        <span className={styles.scrollText}>Scroll</span>
        <span className={styles.scrollLine} aria-hidden="true" />
      </button>
    </header>
  );
}

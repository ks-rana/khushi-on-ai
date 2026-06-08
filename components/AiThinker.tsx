import styles from "./AiThinker.module.css";

/**
 * A small, on-theme animated AI: a minimal machine head that gently floats,
 * blinks, and wonders, with a bobbing question mark beside it. Decorative —
 * hidden from assistive tech. All motion is disabled under prefers-reduced-motion.
 */
export default function AiThinker() {
  return (
    <svg
      className={styles.svg}
      viewBox="0 0 260 300"
      fill="none"
      role="img"
      aria-label="An illustration of an AI, wondering"
    >
      {/* faint orbit ring */}
      <ellipse cx="120" cy="150" rx="96" ry="104" className={styles.orbit} />

      <g className={styles.float}>
        {/* antenna */}
        <line x1="120" y1="84" x2="120" y2="56" className={styles.wire} />
        <circle cx="120" cy="50" r="7" className={styles.spark} />

        {/* head */}
        <rect x="60" y="84" width="120" height="108" rx="24" className={styles.head} />
        {/* face inset */}
        <rect x="78" y="104" width="84" height="58" rx="14" className={styles.face} />

        {/* eyes */}
        <circle cx="104" cy="132" r="7.5" className={styles.eye} />
        <circle cx="136" cy="132" r="7.5" className={`${styles.eye} ${styles.eyeR}`} />
        {/* wondering mouth */}
        <path d="M106 152 q14 -9 28 0" className={styles.mouth} />

        {/* neck + base */}
        <line x1="120" y1="192" x2="120" y2="204" className={styles.wire} />
        <rect x="86" y="204" width="68" height="12" rx="6" className={styles.base} />

        {/* ear nodes */}
        <circle cx="56" cy="138" r="5" className={styles.node} />
        <circle cx="184" cy="138" r="5" className={styles.node} />
      </g>

      {/* the question */}
      <text x="196" y="78" className={styles.q}>
        ?
      </text>
      <circle cx="40" cy="92" r="4" className={styles.dotA} />
      <circle cx="214" cy="206" r="5" className={styles.dotB} />
    </svg>
  );
}

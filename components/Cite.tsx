import styles from "./Cite.module.css";

/**
 * A citation marker with a margin sidenote. On wide screens the note floats
 * into the right margin (Tufte style); on narrow screens it collapses inline
 * just after the sentence. Pure server component.
 */
export default function Cite({
  n,
  children,
}: {
  n: number;
  children: React.ReactNode;
}) {
  return (
    <>
      <sup className={styles.ref}>
        <a id={`ref-${n}`} href={`#note-${n}`} aria-label={`Note ${n}`}>
          {n}
        </a>
      </sup>
      <small className={styles.note} id={`note-${n}`} role="note">
        <a href={`#ref-${n}`} className={styles.noteNum} aria-label={`Back to reference ${n}`}>
          {n}
        </a>
        <span>{children}</span>
      </small>
    </>
  );
}

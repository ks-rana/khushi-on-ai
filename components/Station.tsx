import Reveal from "./Reveal";
import styles from "./Station.module.css";

/**
 * A numbered station in the spine. Renders a semantic <section> with the
 * question as its heading and the reading column inside.
 */
export default function Station({
  id,
  n,
  question,
  kicker,
  children,
}: {
  id: string;
  n: string;
  question: string;
  /** Short overline above the question, e.g. "The argument". */
  kicker?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={styles.station} aria-labelledby={`${id}-title`}>
      <div className={styles.inner}>
        <Reveal as="header" className={styles.head}>
          <p className={`mono ${styles.n}`}>
            {n} {kicker && <span className={styles.kicker}>/ {kicker}</span>}
          </p>
          <h2 id={`${id}-title`} className={styles.question}>
            {question}
          </h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

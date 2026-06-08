import styles from "./References.module.css";

export type Ref = {
  n: number;
  /** Full citation text (APA-ish). */
  text: string;
  /** Optional DOI / URL. */
  href?: string;
};

export default function References({ items }: { items: Ref[] }) {
  return (
    <section className={styles.wrap} aria-label="References">
      <h3 className={styles.heading}>Sources</h3>
      <ol className={styles.list}>
        {items.map((r) => (
          <li key={r.n} id={`source-${r.n}`} className={styles.item}>
            <span className={styles.num}>{r.n}</span>
            <span className={styles.text}>
              {r.text}{" "}
              {r.href && (
                <a href={r.href} target="_blank" rel="noopener noreferrer">
                  ↗
                </a>
              )}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

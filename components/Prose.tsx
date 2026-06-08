import styles from "./Prose.module.css";

/** Reading column: constrains measure and styles descendant prose elements. */
export default function Prose({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`${styles.prose} ${className}`}>{children}</div>;
}

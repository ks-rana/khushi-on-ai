"use client";

import { useInView } from "@/lib/useInView";
import styles from "./Reveal.module.css";

/**
 * Subtle scroll reveal: a short fade + rise. Reduced-motion users get the
 * content immediately with no transform (handled by useInView + CSS).
 */
export default function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    // @ts-expect-error — dynamic tag with a forwarded ref is fine at runtime
    <Tag
      ref={ref}
      className={`${styles.reveal} ${inView ? styles.in : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

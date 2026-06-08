"use client";

import type { ElementType, Ref } from "react";
import { useInView } from "@/lib/useInView";
import styles from "./Reveal.module.css";

/**
 * Subtle scroll reveal: a short fade + rise. Reduced-motion users get the
 * content immediately with no transform (handled by useInView + CSS).
 */
export default function Reveal({
  children,
  delay = 0,
  as = "div",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const Tag: ElementType = as;
  return (
    <Tag
      ref={ref as Ref<HTMLElement>}
      className={`${styles.reveal} ${inView ? styles.in : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

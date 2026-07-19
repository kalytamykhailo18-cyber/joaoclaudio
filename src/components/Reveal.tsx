"use client";
import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";
import { observeReveal } from "./revealObserver";

// <Reveal> anima UM item na entrada da viewport (opacity + translate + blur,
// easing expo-out, com stagger via `index`). É polimórfico: renderiza COMO o
// próprio elemento (as="section" | Link | "h2" | "a" ...), então não cria
// wrapper extra e não quebra grids/flex.
//
// O estado "revelado" é do React (useState) → a classe `in` faz parte do
// className do JSX e sobrevive a re-renders (ex.: abrir/fechar um acordeão).
// O estado escondido inicial vem do CSS (html.reveal-ready .rv) → sem flash e
// seguro sem JS / reduced-motion.
export default function Reveal({
  as = "div",
  index = 0,
  className = "",
  style,
  children,
  ...rest
}: {
  as?: ElementType;
  index?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  [key: string]: unknown;
}) {
  const Tag = as as ElementType;
  const ref = useRef<Element | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (ref.current) return observeReveal(ref.current, () => setShown(true));
  }, []);

  return (
    <Tag
      ref={ref}
      className={`rv${shown ? " in" : ""} ${className}`.trim()}
      style={{ ...(style ?? {}), "--ri": index } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}

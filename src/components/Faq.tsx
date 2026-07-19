"use client";
import { useState } from "react";
import Reveal from "@/components/Reveal";

// Acordeão com abertura/fechamento suave (animação de altura via grid-rows).
// Substitui o <details> nativo (que não anima). O primeiro item abre por padrão.
// `renderItemEdit` (opcional) injeta o lápis de edição inline em cada item.
export default function Faq({
  items,
  renderItemEdit,
}: {
  items: { q: string; a: string }[];
  renderItemEdit?: (index: number) => React.ReactNode;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="faq">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <Reveal as="div" index={i} className={`faq-item${isOpen ? " open" : ""}`} key={i}>
            {renderItemEdit && <span className="faq-edit">{renderItemEdit(i)}</span>}
            <button
              type="button"
              className="faq-q"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span>{f.q}</span>
              <span className="faq-ico" aria-hidden>
                +
              </span>
            </button>
            <div className="faq-a">
              <div className="faq-a-inner">
                <p>{f.a}</p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

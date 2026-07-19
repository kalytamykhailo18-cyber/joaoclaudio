"use client";
import Faq from "@/components/Faq";
import { InlineArrayItem, InlineArrayAdd } from "@/components/inline/InlineEdit";

// Wrapper client: FAQ com CRUD inline (editar/excluir por item + adicionar).
// Fica no client para poder passar a função de render de item ao acordeão.
const FAQ_FIELDS = [
  { name: "q", label: "Pergunta", type: "text" as const },
  { name: "a", label: "Resposta", type: "textarea" as const },
];

type Target = { collection?: string; id?: string | number; globalSlug?: string; field: string };

export default function FaqInline({
  items,
  target,
  addLabel = "Pergunta frequente",
}: {
  items: { q: string; a: string }[];
  target: Target;
  addLabel?: string;
}) {
  const { field, ...parent } = target;
  return (
    <>
      {items.length > 0 && (
        <Faq
          items={items}
          renderItemEdit={(i) => (
            <InlineArrayItem
              {...parent}
              field={field}
              items={items}
              index={i}
              title={`Editar pergunta ${i + 1}`}
              itemFields={FAQ_FIELDS}
            />
          )}
        />
      )}
      <InlineArrayAdd
        {...parent}
        field={field}
        items={items}
        label={addLabel}
        title="Nova pergunta"
        itemFields={FAQ_FIELDS}
      />
    </>
  );
}

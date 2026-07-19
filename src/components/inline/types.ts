// Tipos compartilhados entre os wrappers (InlineEdit) e o editor (EditModal).
// Arquivo só de tipos: não gera JS no bundle.
export type EditField = {
  name: string; // caminho: "h1" ou "hero.h1"
  label: string;
  type: "text" | "textarea" | "image";
  value: string; // texto, ou (image) URL atual para pré-visualização
};

export type Target = { collection?: string; id?: string | number; globalSlug?: string };
export type Props = Target & { title?: string; fields: EditField[] };

// Uma alteração de campo texto: valor exibido antes → depois.
export type Patch = { name: string; oldValue: string; newValue: string };
export type OnSaved = (patches: Patch[]) => boolean; // true = aplicado in-place (sem refresh)

export type ItemField = { name: string; label: string; type: "text" | "textarea" };

"use client";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useIsAdmin } from "./useIsAdmin";
import type { EditField, Target, Props, Patch, OnSaved, ItemField } from "./types";

// Editor pesado carregado sob demanda. Visitantes (admin=false) nunca renderizam
// os wrappers, então este chunk não é baixado; admins baixam ao abrir um lápis.
const EditModal = dynamic(() => import("./EditModal"), { ssr: false });

const PencilIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);

function editable(t: Target) {
  return Boolean(t.globalSlug) || (t.id !== undefined && t.id !== null);
}

// Atualiza o texto exibido no próprio DOM (update otimista, sem recarregar a rota).
// Procura, dentro do container editado, o nó de texto que mostra o valor antigo e
// troca pelo novo. Retorna true só se TODAS as alterações foram refletidas.
function applyPatches(container: HTMLElement | null, patches: Patch[]): boolean {
  if (!container) return false;
  let all = true;
  for (const { oldValue, newValue } of patches) {
    if (oldValue === newValue) continue;
    const oldT = oldValue.trim();
    if (!oldT) { all = false; continue; } // sem texto antigo não há como localizar
    const walk = () => document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
    let done = false;
    // 1ª passada: nó cujo texto é exatamente o valor antigo.
    let w = walk(), node: Node | null;
    while ((node = w.nextNode())) {
      const nv = node.nodeValue ?? "";
      if (nv.trim() === oldT) { node.nodeValue = nv.replace(oldT, newValue); done = true; break; }
    }
    // 2ª passada: nó que contém o valor antigo (texto interpolado).
    if (!done) {
      w = walk();
      while ((node = w.nextNode())) {
        const nv = node.nodeValue ?? "";
        if (nv.includes(oldT)) { node.nodeValue = nv.replace(oldT, newValue); done = true; break; }
      }
    }
    if (!done) all = false;
  }
  return all;
}

// Hook: mantém overrides locais (valor atual de cada campo) para que reabrir a
// modal mostre o último valor salvo, sem recarregar a página.
function useOverrides(fields: EditField[]) {
  const [ov, setOv] = useState<Record<string, string>>({});
  const merged = fields.map((f) => ({ ...f, value: ov[f.name] ?? f.value }));
  const remember = (patches: Patch[]) =>
    setOv((prev) => {
      const next = { ...prev };
      for (const p of patches) next[p.name] = p.newValue;
      return next;
    });
  return { merged, remember };
}

// Envolve um container inteiro (seção): wrapper + lápis no canto.
export default function InlineEdit({ collection, id, globalSlug, title, fields, children }: Props & { children: React.ReactNode }) {
  const admin = useIsAdmin();
  const [open, setOpen] = useState(false);
  const zoneRef = useRef<HTMLDivElement>(null);
  const { merged, remember } = useOverrides(fields);
  if (!admin || !editable({ collection, id, globalSlug })) return <>{children}</>;

  const onSaved: OnSaved = (patches) => {
    const ok = applyPatches(zoneRef.current, patches);
    if (ok) remember(patches);
    return ok;
  };
  return (
    <div className="inline-zone" ref={zoneRef}>
      {children}
      <button className="inline-pencil" onClick={() => setOpen(true)} aria-label="Editar" title="Editar conteúdo">
        <PencilIcon />
      </button>
      {open && <EditModal collection={collection} id={id} globalSlug={globalSlug} title={title ?? "Editar"} fields={merged} onSaved={onSaved} onClose={() => setOpen(false)} />}
    </div>
  );
}

// Contêiner (card/item) mais próximo do lápis, usado para o update otimista.
const ITEM_SELECTOR = ".card, .item, .step, .faq-item, li, .inline-zone";
function nearestContainer(el: HTMLElement | null): HTMLElement | null {
  if (!el) return null;
  return (el.closest(ITEM_SELECTOR) as HTMLElement | null) ?? el.parentElement;
}

// Lápis para dentro de um card (que já é position:relative). Uma modal por card.
export function InlinePencil({ collection, id, globalSlug, title, fields, canDelete }: Props & { canDelete?: boolean }) {
  const admin = useIsAdmin();
  const [open, setOpen] = useState(false);
  const spanRef = useRef<HTMLSpanElement>(null);
  const { merged, remember } = useOverrides(fields);
  if (!admin || !editable({ collection, id, globalSlug })) return null;

  const onSaved: OnSaved = (patches) => {
    const ok = applyPatches(nearestContainer(spanRef.current), patches);
    if (ok) remember(patches);
    return ok;
  };
  return (
    <>
      <span
        ref={spanRef}
        className="inline-pencil inline-pencil-card"
        role="button"
        tabIndex={0}
        aria-label="Editar"
        title="Editar"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
      >
        <PencilIcon />
      </span>
      {open && <EditModal collection={collection} id={id} globalSlug={globalSlug} title={title ?? "Editar"} fields={merged} canDelete={canDelete} onSaved={onSaved} onClose={() => setOpen(false)} />}
    </>
  );
}

// Botão "Adicionar": cria um novo documento na coleção (modo create).
// `preset` injeta valores fixos no novo doc (ex.: relacionamento region).
export function InlineAdd({ collection, title, fields, label = "Adicionar", className, preset }: Props & { label?: string; className?: string; preset?: Record<string, unknown> }) {
  const admin = useIsAdmin();
  const [open, setOpen] = useState(false);
  if (!admin || !collection) return null;
  return (
    <>
      <button
        type="button"
        className={className ?? "inline-add"}
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(true); }}
        title={label}
      >
        <span className="inline-add-plus" aria-hidden>+</span>
        <span>{label}</span>
      </button>
      {open && <EditModal collection={collection} create preset={preset} title={title ?? "Adicionar"} fields={fields} onClose={() => setOpen(false)} />}
    </>
  );
}

// Pencil para editar/excluir UM item de um array (credenciais, passos, FAQ…).
// O alvo é um global (globalSlug) ou um doc de coleção (collection + id); `field`
// é o nome do array e `items` o array atual (grava o array inteiro ao salvar).
export function InlineArrayItem({
  collection, id, globalSlug, field, items, index, itemFields, title,
}: Target & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: string; items: any[]; index: number; itemFields: ItemField[]; title?: string;
}) {
  const admin = useIsAdmin();
  const [open, setOpen] = useState(false);
  const spanRef = useRef<HTMLSpanElement>(null);
  const baseFields: EditField[] = itemFields.map((f) => ({ ...f, value: String(items[index]?.[f.name] ?? "") }));
  const { merged, remember } = useOverrides(baseFields);
  if (!admin) return null;

  const onSaved: OnSaved = (patches) => {
    const ok = applyPatches(nearestContainer(spanRef.current), patches);
    if (ok) remember(patches);
    return ok;
  };
  return (
    <>
      <span
        ref={spanRef}
        className="inline-pencil inline-pencil-card"
        role="button"
        tabIndex={0}
        aria-label="Editar"
        title="Editar"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(true); }}
      >
        <PencilIcon />
      </span>
      {open && (
        <EditModal
          collection={collection} id={id} globalSlug={globalSlug}
          title={title ?? "Editar item"} fields={merged}
          arrayField={field} arrayItems={items} arrayIndex={index}
          onSaved={onSaved}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

// Botão para adicionar um item a um array.
export function InlineArrayAdd({
  collection, id, globalSlug, field, items, itemFields, title, label = "Adicionar", className,
}: Target & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: string; items: any[]; itemFields: ItemField[]; title?: string; label?: string; className?: string;
}) {
  const admin = useIsAdmin();
  const [open, setOpen] = useState(false);
  if (!admin) return null;
  const fields: EditField[] = itemFields.map((f) => ({ ...f, value: "" }));
  return (
    <>
      <button
        type="button"
        className={className ?? "inline-add-row"}
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(true); }}
        title={label}
      >
        <span className="inline-add-plus" aria-hidden>+</span>
        <span>{label}</span>
      </button>
      {open && (
        <EditModal
          collection={collection} id={id} globalSlug={globalSlug}
          title={title ?? "Adicionar item"} fields={fields}
          arrayField={field} arrayItems={items} arrayIndex={null}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

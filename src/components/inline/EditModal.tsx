"use client";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useUI } from "@/components/UIProvider";
import type { Props, Patch, OnSaved } from "./types";

// slug amigável a partir de um texto (remove acentos, espaços → hífens).
function slugify(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Editor pesado (formulário + upload + confirmação). Carregado sob demanda
// (code-split): visitantes anônimos nunca baixam este chunk.
export default function EditModal({
  collection, id, globalSlug, title, fields, create, canDelete, preset,
  arrayField, arrayItems, arrayIndex, onSaved, onClose,
}: Props & {
  title: string; create?: boolean; canDelete?: boolean; preset?: Record<string, unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  arrayField?: string; arrayItems?: any[]; arrayIndex?: number | null;
  onSaved?: OnSaved;
  onClose: () => void;
}) {
  const router = useRouter();
  const ed = useUI().editor;
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(fields.map((f) => [f.name, f.value ?? ""])),
  );
  // Arquivos de imagem em espera (por campo), enviados no salvar.
  const [files, setFiles] = useState<Record<string, File>>({});
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  // Confirmação obrigatória antes de gravar/excluir (modal custom).
  const [confirm, setConfirm] = useState<null | "save" | "delete">(null);
  const [error, setError] = useState<string | null>(null);

  const isGlobal = Boolean(globalSlug);
  const isArray = Boolean(arrayField);
  const isArrayEdit = isArray && arrayIndex !== undefined && arrayIndex !== null;
  const isArrayAdd = isArray && (arrayIndex === undefined || arrayIndex === null);
  const showDelete = isArrayEdit || (canDelete && !isGlobal && !create && id !== undefined && id !== null);
  // URL/method do alvo pai (usado por save de array e por delete).
  const parentUrl = isGlobal ? `/api/globals/${globalSlug}` : `/api/${collection}/${id}`;
  const parentMethod = isGlobal ? "POST" : "PATCH";

  // Envia um arquivo ao /api/media e devolve o id do documento criado.
  async function uploadMedia(file: File, alt: string): Promise<number | string> {
    const fd = new FormData();
    fd.append("file", file);
    // Payload 3 espera os campos do documento em _payload (JSON), não avulsos.
    fd.append("_payload", JSON.stringify({ alt }));
    const res = await fetch("/api/media", { method: "POST", credentials: "include", body: fd });
    if (!res.ok) throw new Error(`Falha no upload da imagem (HTTP ${res.status})`);
    const json = await res.json();
    return json?.doc?.id;
  }

  function setPath(body: Record<string, unknown>, name: string, v: unknown) {
    if (name.includes(".")) {
      const [g, k] = name.split(".");
      const grp = (body[g] as Record<string, unknown>) || {};
      grp[k] = v;
      body[g] = grp;
    } else {
      body[name] = v;
    }
  }

  async function doSave() {
    setSaving(true);
    setError(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body: any = {};
    let hasImage = false;
    try {
      for (const f of fields) {
        if (f.type === "image") {
          const file = files[f.name];
          if (file) {
            hasImage = true;
            const mediaId = await uploadMedia(file, f.label);
            setPath(body, f.name, mediaId);
          }
          continue;
        }
        setPath(body, f.name, values[f.name] ?? "");
      }
    } catch (e) {
      setSaving(false);
      setError(e instanceof Error ? e.message : "Erro no upload");
      return;
    }
    // No modo create: injeta valores fixos (ex.: region) e gera slug do nome.
    if (create) {
      if (preset) Object.assign(body, preset);
      if ("slug" in body && !body.slug) {
        const base = body.name || body.title || "";
        if (base) body.slug = slugify(String(base));
      }
    }
    // Item de array: reconstrói o array inteiro e grava no pai (global ou doc).
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let payload: any = body;
    let url = isGlobal ? `/api/globals/${globalSlug}` : create ? `/api/${collection}` : `/api/${collection}/${id}`;
    let method = isGlobal || create ? "POST" : "PATCH";
    if (isArray && arrayField) {
      const arr = arrayItems ? [...arrayItems] : [];
      if (arrayIndex === undefined || arrayIndex === null) arr.push(body);
      else arr[arrayIndex] = { ...arr[arrayIndex], ...body };
      payload = { [arrayField]: arr };
      url = parentUrl;
      method = parentMethod;
    }
    try {
      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => null);
        const msg = j?.errors?.[0]?.message || `Falha ao salvar (HTTP ${res.status})`;
        throw new Error(msg);
      }
      setSaving(false);
      onClose();
      // Update otimista in-place para EDIÇÕES; refresh só para create/add/imagem
      // ou quando o texto não pôde ser localizado no DOM.
      const structural = create || isArrayAdd || hasImage;
      let applied = false;
      if (!structural && onSaved) {
        const patches: Patch[] = fields
          .filter((f) => f.type === "text" || f.type === "textarea")
          .map((f) => ({ name: f.name, oldValue: f.value ?? "", newValue: values[f.name] ?? "" }))
          .filter((p) => p.oldValue !== p.newValue);
        applied = patches.length === 0 ? true : onSaved(patches);
      }
      if (!applied) router.refresh();
    } catch (e) {
      setSaving(false);
      setError(e instanceof Error ? e.message : "Erro ao salvar");
    }
  }

  async function doDelete() {
    setSaving(true);
    setError(null);
    try {
      let res: Response;
      if (isArrayEdit && arrayField) {
        // Remove o item do array e regrava o pai.
        const arr = (arrayItems ?? []).filter((_, i) => i !== arrayIndex);
        res = await fetch(parentUrl, {
          method: parentMethod,
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ [arrayField]: arr }),
        });
      } else {
        res = await fetch(`/api/${collection}/${id}`, { method: "DELETE", credentials: "include" });
      }
      if (!res.ok) throw new Error(`Falha ao excluir (HTTP ${res.status})`);
      setSaving(false);
      onClose();
      router.refresh(); // exclusão remove um elemento: recarrega a lista
    } catch (e) {
      setSaving(false);
      setError(e instanceof Error ? e.message : "Erro ao excluir");
    }
  }

  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="inline-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="inline-modal" onClick={(e) => e.stopPropagation()}>
        <div className="inline-modal-head">
          <h3>{title}</h3>
          <button onClick={onClose} aria-label="Fechar">×</button>
        </div>
        <div className="inline-modal-body">
          {fields.map((f) => (
            <label key={f.name} className="inline-field">
              <span>{f.label}</span>
              {f.type === "textarea" ? (
                <textarea rows={4} value={values[f.name] ?? ""} onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))} />
              ) : f.type === "image" ? (
                <div className="inline-image-field">
                  {(previews[f.name] || f.value) && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="inline-image-preview" src={previews[f.name] || f.value} alt="" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setFiles((s) => ({ ...s, [f.name]: file }));
                      setPreviews((p) => ({ ...p, [f.name]: URL.createObjectURL(file) }));
                    }}
                  />
                </div>
              ) : (
                <input value={values[f.name] ?? ""} onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))} />
              )}
            </label>
          ))}
          {error && <p className="inline-error">{error}</p>}
        </div>
        <div className="inline-modal-foot">
          {showDelete ? (
            <button className="inline-delete" onClick={() => setConfirm("delete")} disabled={saving}>
              {ed.excluir}
            </button>
          ) : <span />}
          <div className="inline-foot-right">
            <button className="inline-cancel" onClick={onClose} disabled={saving}>{ed.cancelar}</button>
            <button className="inline-save" onClick={() => setConfirm("save")} disabled={saving}>
              {saving ? ed.salvando : create ? ed.criar : ed.salvar}
            </button>
          </div>
        </div>
      </div>
      {confirm && (
        <ConfirmDialog
          danger={confirm === "delete"}
          busy={saving}
          title={confirm === "delete" ? ed.confirmDeleteTitle : create ? ed.confirmCreateTitle : ed.confirmSaveTitle}
          message={confirm === "delete" ? ed.confirmDeleteMsg : create ? ed.confirmCreateMsg : ed.confirmSaveMsg}
          confirmLabel={confirm === "delete" ? ed.excluir : create ? ed.criar : ed.salvar}
          cancelLabel={ed.cancelar}
          onCancel={() => setConfirm(null)}
          onConfirm={() => {
            const kind = confirm;
            setConfirm(null);
            if (kind === "delete") doDelete();
            else doSave();
          }}
        />
      )}
    </div>,
    document.body,
  );
}

// Modal de confirmação custom (substitui window.confirm) — obrigatório antes de
// gravar ou excluir. Renderizado acima da modal de edição.
function ConfirmDialog({
  title, message, confirmLabel, cancelLabel, danger, busy, onConfirm, onCancel,
}: {
  title: string; message: string; confirmLabel: string; cancelLabel: string; danger?: boolean; busy?: boolean;
  onConfirm: () => void; onCancel: () => void;
}) {
  return (
    <div className="inline-confirm-overlay" onClick={onCancel} role="alertdialog" aria-modal="true">
      <div className="inline-confirm" onClick={(e) => e.stopPropagation()}>
        <h4>{title}</h4>
        <p>{message}</p>
        <div className="inline-confirm-foot">
          <button className="inline-cancel" onClick={onCancel} disabled={busy}>{cancelLabel}</button>
          <button className={danger ? "inline-delete" : "inline-save"} onClick={onConfirm} disabled={busy} autoFocus>
            {busy ? "…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

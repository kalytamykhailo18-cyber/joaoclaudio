"use client";
import { useState } from "react";
import { useUI } from "@/components/UIProvider";

// Formulário de acesso do administrador (médico). Autentica no Payload via
// /api/users/login e, em sucesso, leva à home já renderizada como admin
// (edição inline habilitada). Fica dentro do grupo (frontend): tem header e footer.
export default function LoginForm() {
  const t = useUI().login;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error(t.errorAuth);
      // Cookie leve (não-httpOnly) que habilita a UI de edição no client sem fetch.
      // Não é segurança: a API do Payload valida cada gravação pelo token real.
      document.cookie = "jc_admin=1; path=/; max-age=604800; samesite=lax";
      // Navegação dura para a home: recarrega toda a árvore (inclusive o header
      // persistente do layout) já com o estado de admin, com a edição inline ativa.
      window.location.assign("/");
    } catch (err) {
      setSaving(false);
      setError(err instanceof Error ? err.message : t.errorGeneric);
    }
  }

  return (
    <form className="login-form" onSubmit={submit}>
      <label className="login-field">
        <span>{t.email}</span>
        <input
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
        />
      </label>
      <label className="login-field">
        <span>{t.senha}</span>
        <input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      {error && <p className="login-error">{error}</p>}
      <button className="btn btn-gold login-submit" type="submit" disabled={saving}>
        {saving ? t.loading : t.button}
      </button>
    </form>
  );
}

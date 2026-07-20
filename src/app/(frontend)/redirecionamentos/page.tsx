import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import Breadcrumb from "@/components/Breadcrumb";
import Reveal from "@/components/Reveal";
import { InlinePencil, InlineAdd } from "@/components/inline/InlineEdit";

// Tela de gestão de redirecionamentos 301/302 (fora do painel Payload, no padrão
// inline do site). Só o admin logado vê os controles de edição/criação. Os
// redirecionamentos em si são aplicados pelo middleware. noindex.
export const metadata: Metadata = {
  title: "Redirecionamentos (301)",
  robots: { index: false, follow: false },
  alternates: { canonical: "/redirecionamentos" },
};

export const revalidate = 60;

type Redirect = { id: string | number; from: string; to: string; permanent?: boolean };

async function getRedirects(): Promise<Redirect[]> {
  try {
    const payload = await getPayload({ config });
    const res = await payload.find({ collection: "redirects", limit: 1000, depth: 0, pagination: false });
    return res.docs as Redirect[];
  } catch {
    return [];
  }
}

export default async function RedirectsPage() {
  const redirects = await getRedirects();
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <Reveal as="div" index={0}>
            <Breadcrumb items={[{ name: "Início", url: "/" }, { name: "Redirecionamentos" }]} />
          </Reveal>
          <Reveal as="span" className="eyebrow" index={1}>Administração</Reveal>
          <Reveal as="h1" index={2}>Redirecionamentos 301</Reveal>
          <Reveal as="p" index={3}>
            Quando uma página muda de endereço, crie um redirecionamento para não perder
            o SEO nem deixar o paciente em uma página de erro. Faça login para gerenciar.
          </Reveal>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="redir-list">
            {redirects.length === 0 && (
              <p style={{ color: "var(--ink)" }}>Nenhum redirecionamento cadastrado ainda.</p>
            )}
            {redirects.map((r) => (
              <div className="redir-row" key={r.id}>
                <code className="redir-from">{r.from}</code>
                <span className="redir-arrow">→</span>
                <code className="redir-to">{r.to}</code>
                <span className="redir-badge">{r.permanent === false ? "302" : "301"}</span>
                <InlinePencil
                  collection="redirects"
                  id={r.id}
                  canDelete
                  title={`Editar redirecionamento: ${r.from}`}
                  fields={[
                    { name: "from", label: "De (caminho antigo, ex.: /pagina-antiga)", type: "text", value: r.from },
                    { name: "to", label: "Para (caminho novo ou URL completa)", type: "text", value: r.to },
                  ]}
                />
              </div>
            ))}
            <InlineAdd
              collection="redirects"
              label="Adicionar redirecionamento"
              title="Novo redirecionamento (301)"
              fields={[
                { name: "from", label: "De (caminho antigo, ex.: /pagina-antiga)", type: "text", value: "" },
                { name: "to", label: "Para (caminho novo ou URL completa)", type: "text", value: "" },
              ]}
            />
          </div>
          <p style={{ marginTop: 26, fontSize: 13.5, color: "var(--ink)" }}>
            Novos redirecionamentos são permanentes (301), o padrão para SEO. Casos
            temporários (302) podem ser ajustados no cadastro do registro.
          </p>
        </div>
      </section>
    </>
  );
}

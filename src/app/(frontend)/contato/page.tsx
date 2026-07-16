import type { Metadata } from "next";
import { site, whatsappLink } from "@/content/site";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Contato e Agendamento",
  description:
    "Agende sua avaliação com o Dr. João Cláudio Miranda em Goiânia. Atendimento por WhatsApp e telefone.",
  alternates: { canonical: "/contato" },
};

export default function ContatoPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <Breadcrumb items={[{ name: "Início", url: "/" }, { name: "Contato" }]} />
          <span className="eyebrow">Contato</span>
          <h1>Agende sua avaliação</h1>
          <p>Marque uma avaliação e receba um plano de tratamento pensado para o seu caso.</p>
        </div>
      </section>

      <section>
        <div className="wrap prose">
          <h2>Fale com a clínica</h2>
          <p><strong>Endereço:</strong> {site.address}</p>
          <p><strong>Telefone:</strong> {site.phone}</p>
          <p><strong>Instagram:</strong> {site.instagram}</p>
          <div className="cta-row" style={{ display: "flex", gap: 14, marginTop: 24, flexWrap: "wrap" }}>
            <a className="btn btn-wa" href={whatsappLink()} target="_blank" rel="noopener">
              Falar no WhatsApp
            </a>
            <a className="btn btn-outline-l" href={`tel:${site.phone.replace(/\D/g, "")}`}>
              Ligar agora
            </a>
          </div>
          <p style={{ color: "#8a6a2f", fontStyle: "italic", marginTop: 28 }}>
            [Mapa do Google e formulário de contato entram aqui com os dados reais da clínica.]
          </p>
        </div>
      </section>
    </>
  );
}

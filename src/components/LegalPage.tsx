import Breadcrumb from "@/components/Breadcrumb";

export default function LegalPage({ title }: { title: string }) {
  return (
    <section className="page-hero" style={{ minHeight: "60vh" }}>
      <div className="wrap">
        <Breadcrumb items={[{ name: "Início", url: "/" }, { name: title }]} />
        <span className="eyebrow">Documento legal</span>
        <h1>{title}</h1>
        <p style={{ color: "#8a6a2f", fontStyle: "italic" }}>
          [Estrutura pronta no CMS — o conteúdo jurídico é fornecido ou revisado por você e
          renderizado aqui.]
        </p>
      </div>
    </section>
  );
}

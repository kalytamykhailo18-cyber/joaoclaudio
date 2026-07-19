import type { Field, GlobalConfig } from "payload";
import { revalidateChange } from "../hooks/revalidate";

type F = { name: string; label: string; type?: "text" | "textarea" };
const group = (name: string, label: string, fields: F[]): Field => ({
  name,
  type: "group",
  label,
  fields: fields.map((f) => ({ name: f.name, type: f.type ?? "text", label: f.label })) as Field[],
});

// Textos estruturais/compartilhados de toda a interface. Nada fica fixo no código.
export const UI: GlobalConfig = {
  slug: "ui",
  label: "Textos da interface",
  admin: { group: "Conteúdo" },
  access: { read: () => true },
  hooks: { afterChange: [revalidateChange] },
  fields: [
    group("nav", "Navegação (menu e rodapé)", [
      { name: "contato", label: "Contato" },
      { name: "tratamentos", label: "Tratamentos" },
      { name: "dorCronica", label: "Dor crônica" },
      { name: "oMedico", label: "O médico" },
      { name: "blog", label: "Blog" },
      { name: "depoimentos", label: "Depoimentos" },
      { name: "agendar", label: "Agendar" },
      { name: "acesso", label: "Acesso" },
      { name: "entrar", label: "Entrar" },
      { name: "sair", label: "Sair" },
      { name: "colAreas", label: "Rodapé — coluna Áreas" },
      { name: "colMais", label: "Rodapé — coluna Mais" },
      { name: "privacidade", label: "Link — Privacidade" },
      { name: "cookies", label: "Link — Cookies" },
      { name: "termos", label: "Link — Termos" },
    ]),
    group("breadcrumb", "Breadcrumb", [
      { name: "inicio", label: "Início" },
      { name: "tratamentos", label: "Tratamentos" },
    ]),
    group("chips", "Rótulos de links", [
      { name: "verCondicoes", label: "Ver condições" },
      { name: "verTratamento", label: "Ver tratamento" },
      { name: "saibaMais", label: "Saiba mais" },
      { name: "lerArtigo", label: "Ler artigo" },
      { name: "explorar", label: "Explorar" },
      { name: "sobre", label: "Prefixo 'Sobre'" },
      { name: "ver", label: "Prefixo 'Ver'" },
      { name: "conhecaMedico", label: "Conheça o médico" },
    ]),
    group("conditionPage", "Páginas de condição (rótulos)", [
      { name: "oQue", label: "Prefixo 'O que é'" },
      { name: "comoTrata", label: "Título 'Como o médico trata'" },
      { name: "tratamentosIndicados", label: "Título 'Tratamentos indicados'" },
      { name: "perguntasFrequentes", label: "Título 'Perguntas frequentes'" },
      { name: "condicoesRelacionadas", label: "Título 'Condições relacionadas'" },
    ]),
    group("notFound", "Página 404", [
      { name: "eyebrow", label: "Rótulo" },
      { name: "title", label: "Título" },
      { name: "text", label: "Texto", type: "textarea" },
      { name: "button", label: "Botão" },
      { name: "tratamentos", label: "Link Tratamentos" },
    ]),
    group("emBreve", "Página em breve", [
      { name: "eyebrow", label: "Rótulo" },
      { name: "title", label: "Título" },
      { name: "text", label: "Texto", type: "textarea" },
      { name: "btnHome", label: "Botão home" },
      { name: "btnSample", label: "Botão amostra" },
    ]),
    group("login", "Login", [
      { name: "eyebrow", label: "Rótulo" },
      { name: "title", label: "Título" },
      { name: "sub", label: "Subtítulo", type: "textarea" },
      { name: "email", label: "Rótulo e-mail" },
      { name: "senha", label: "Rótulo senha" },
      { name: "button", label: "Botão" },
      { name: "loading", label: "Carregando" },
      { name: "errorAuth", label: "Erro de credenciais" },
      { name: "errorGeneric", label: "Erro genérico" },
    ]),
    group("editor", "Editor inline (ferramenta)", [
      { name: "salvar", label: "Salvar" },
      { name: "criar", label: "Criar" },
      { name: "cancelar", label: "Cancelar" },
      { name: "excluir", label: "Excluir" },
      { name: "salvando", label: "Salvando" },
      { name: "confirmSaveTitle", label: "Confirmar alteração (título)" },
      { name: "confirmCreateTitle", label: "Confirmar criação (título)" },
      { name: "confirmDeleteTitle", label: "Confirmar exclusão (título)" },
      { name: "confirmSaveMsg", label: "Confirmar alteração (msg)", type: "textarea" },
      { name: "confirmCreateMsg", label: "Confirmar criação (msg)", type: "textarea" },
      { name: "confirmDeleteMsg", label: "Confirmar exclusão (msg)", type: "textarea" },
    ]),
    group("blog", "Blog (rótulos)", [
      { name: "authorCreds", label: "Credenciais do autor" },
      { name: "reviewNote", label: "Nota de revisão clínica", type: "textarea" },
      { name: "minLeitura", label: "Sufixo 'min de leitura'" },
      { name: "perguntasFrequentes", label: "Título FAQ" },
    ]),
    group("testimonials", "Depoimentos (rótulos)", [
      { name: "realNote", label: "Nota (avaliações reais)" },
    ]),
    group("contact", "Rótulos de contato", [
      { name: "endereco", label: "Endereço:" },
      { name: "telefone", label: "Telefone:" },
      { name: "instagram", label: "Instagram:" },
      { name: "whatsapp", label: "WhatsApp:" },
    ]),
    group("reviews", "Rótulos de avaliações", [
      { name: "avaliacoesGoogle", label: "avaliações no Google" },
      { name: "perfilVerificado", label: "Perfil verificado" },
    ]),
  ],
};

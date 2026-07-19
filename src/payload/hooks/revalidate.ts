import { revalidatePath } from "next/cache";

// Purga o cache de rotas (ISR) de todo o site após qualquer alteração de conteúdo,
// para que edições do CMS apareçam imediatamente (sem esperar a revalidação por tempo).
// "/" + "layout" revalida todas as páginas sob o layout do site (nav, footer, cards).
function purge() {
  try {
    revalidatePath("/", "layout");
  } catch {
    // Fora do escopo de request (ex.: seed/CLI): ignora; o ISR por tempo cobre.
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const revalidateChange = ({ doc }: { doc?: any } = {}) => {
  purge();
  return doc;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const revalidateDelete = ({ doc }: { doc?: any } = {}) => {
  purge();
  return doc;
};

import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import LoginForm from "@/components/LoginForm";
import { getUI } from "@/lib/content";

export const metadata: Metadata = {
  title: "Entrar",
  robots: { index: false, follow: false }, // área de acesso não deve ser indexada
};
export const revalidate = 60;

export default async function EntrarPage() {
  const t = (await getUI()).login;
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <Reveal as="span" className="eyebrow" index={0}>{t.eyebrow}</Reveal>
          <Reveal as="h1" index={1}>{t.title}</Reveal>
          <Reveal as="p" className="sub" index={2}>{t.sub}</Reveal>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="login-wrap">
            <LoginForm />
          </div>
        </div>
      </section>
    </>
  );
}

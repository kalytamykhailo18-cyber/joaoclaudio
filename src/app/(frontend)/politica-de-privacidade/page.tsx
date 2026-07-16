import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
export const metadata: Metadata = { title: "Política de Privacidade", alternates: { canonical: "/politica-de-privacidade" }, robots: { index: false } };
export default function Page() { return <LegalPage title="Política de Privacidade" />; }

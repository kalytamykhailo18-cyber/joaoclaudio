import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
export const metadata: Metadata = { title: "Termos de Uso", alternates: { canonical: "/termos-de-uso" }, robots: { index: false } };
export const revalidate = 60;
export default function Page() { return <LegalPage title="Termos de Uso" docKey="terms" />; }

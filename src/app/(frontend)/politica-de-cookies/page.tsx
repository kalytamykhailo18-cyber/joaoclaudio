import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
export const metadata: Metadata = { title: "Política de Cookies", alternates: { canonical: "/politica-de-cookies" }, robots: { index: false } };
export const revalidate = 60;
export default function Page() { return <LegalPage title="Política de Cookies" docKey="cookies" />; }

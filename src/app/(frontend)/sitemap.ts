import type { MetadataRoute } from "next";
import { regions, treatments, applications } from "@/content/clusters";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.domain;
  const staticRoutes = ["", "/tratamentos", "/sobre", "/contato"];
  const legal = ["/politica-de-privacidade", "/politica-de-cookies", "/termos-de-uso"];

  const regionRoutes = regions.map((r) => `/${r.slug}`);
  const conditionRoutes = regions.flatMap((r) =>
    r.conditions.map((c) => `/${r.slug}/${c.slug}`),
  );
  const treatmentRoutes = treatments.map((t) => `/tratamentos/${t.slug}`);
  const applicationRoutes = applications.map(
    (a) => `/tratamentos/${a.treatment}/${a.condition}`,
  );

  const all = [
    ...staticRoutes,
    ...regionRoutes,
    ...conditionRoutes,
    ...treatmentRoutes,
    ...applicationRoutes,
    ...legal,
  ];

  return all.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path.split("/").length > 3 ? 0.6 : 0.8,
  }));
}

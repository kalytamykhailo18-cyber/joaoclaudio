import type { MetadataRoute } from "next";
import { regions, treatments, applications } from "@/content/clusters";
import { posts } from "@/content/blog";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.domain;
  const staticRoutes = ["", "/dor-cronica", "/tratamentos", "/sobre", "/contato", "/agendar", "/depoimentos", "/blog"];
  // Páginas legais ficam fora do sitemap (noindex).

  const regionRoutes = regions.map((r) => `/${r.slug}`);
  const conditionRoutes = regions.flatMap((r) =>
    r.conditions.map((c) => `/${r.slug}/${c.slug}`),
  );
  const treatmentRoutes = treatments.map((t) => `/tratamentos/${t.slug}`);
  const applicationRoutes = applications.map(
    (a) => `/tratamentos/${a.treatment}/${a.condition}`,
  );
  const blogRoutes = posts.map((p) => `/blog/${p.slug}`);

  const all = [
    ...staticRoutes,
    ...regionRoutes,
    ...conditionRoutes,
    ...treatmentRoutes,
    ...applicationRoutes,
    ...blogRoutes,
  ];

  return all.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path.split("/").length > 3 ? 0.6 : 0.8,
  }));
}

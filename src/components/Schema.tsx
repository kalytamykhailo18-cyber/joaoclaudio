import { site } from "@/content/site";
import { getSiteSettings } from "@/lib/content";

// Injeta JSON-LD sem escapar aspas (dangerouslySetInnerHTML é o padrão para Schema.org no Next).
function Ld({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export async function PhysicianSchema() {
  const site = await getSiteSettings();
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "Physician",
        name: site.doctor,
        medicalSpecialty: ["Orthopedic", "PainMedicine"],
        description: `Ortopedista especializado em dor crônica, coluna, joelho, ombro e quadril em ${site.city}.`,
        url: site.domain,
        areaServed: `${site.city}, ${site.region}`,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.street,
          addressLocality: site.city,
          addressRegion: site.region,
          postalCode: site.postalCode,
          addressCountry: site.country,
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: site.rating,
          reviewCount: site.reviewCount,
          bestRating: 5,
        },
      }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: it.name,
          item: `${site.domain}${it.url}`,
        })),
      }}
    />
  );
}

export function FaqSchema({ faq }: { faq: { q: string; a: string }[] }) {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }}
    />
  );
}

export function MedicalConditionSchema({ name, description }: { name: string; description: string }) {
  return (
    <Ld data={{ "@context": "https://schema.org", "@type": "MedicalCondition", name, description }} />
  );
}

export function MedicalTherapySchema({ name, description }: { name: string; description: string }) {
  return (
    <Ld data={{ "@context": "https://schema.org", "@type": "MedicalTherapy", name, description }} />
  );
}

export function MedicalSpecialtySchema({ name, description }: { name: string; description: string }) {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        about: { "@type": "MedicalSpecialty", name },
        name,
        description,
        provider: { "@type": "Physician", name: site.doctor, url: site.domain },
      }}
    />
  );
}

export function ArticleSchema({
  headline,
  description,
  url,
  datePublished,
}: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
}) {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        headline,
        description,
        datePublished,
        mainEntityOfPage: `${site.domain}${url}`,
        author: { "@type": "Physician", name: site.doctor, url: site.domain },
        publisher: { "@type": "Organization", name: site.clinicName },
      }}
    />
  );
}

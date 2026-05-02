import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { LongRead } from "@/components/site/long-read";
import {
  PARTNER_PAGES,
  getPartnerPageBySlug,
} from "@/lib/partner-pages";
import { articleJsonLd, breadcrumbJsonLd, buildMeta } from "@/lib/seo";

export function generateStaticParams() {
  return PARTNER_PAGES.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(
  props: PageProps<"/partners/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const partner = getPartnerPageBySlug(slug);
  if (!partner) return { title: "Партнёры — Паритет Events" };
  const title =
    partner.seo?.seoTitle?.trim() || `${partner.title} — Паритет Events`;
  const description =
    partner.seo?.metaDescription?.trim() ||
    partner.seo?.ogDescription?.trim() ||
    partner.description;
  return buildMeta({
    path: `/partners/${partner.slug}`,
    title,
    description,
    image: partner.image,
    type: "article",
  });
}

export default async function PartnerPage(
  props: PageProps<"/partners/[slug]">,
) {
  const { slug } = await props.params;
  const partner = getPartnerPageBySlug(slug);
  if (!partner) notFound();

  const articleSchema = articleJsonLd({
    url: `/partners/${partner.slug}`,
    title: partner.title,
    description: partner.seo?.metaDescription?.trim() || partner.description,
    image: partner.image,
  });
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Главная", url: "/" },
    { name: "Партнёры", url: "/partners" },
    { name: partner.title, url: `/partners/${partner.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <Header />
      <main className="flex-1">
        <LongRead
          title={partner.title}
          eyebrow="Партнёр Паритет Events"
          description={partner.description}
          heroImage={partner.image}
          body={partner.body}
        />
      </main>
      <Footer />
    </>
  );
}

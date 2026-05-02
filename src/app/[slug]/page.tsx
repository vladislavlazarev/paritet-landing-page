import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { LongRead } from "@/components/site/long-read";
import { BLOG, getBlogPostBySlug } from "@/lib/blog";
import { articleJsonLd, breadcrumbJsonLd, buildMeta } from "@/lib/seo";

/**
 * Catch-all root route for the legacy blog. Each post lived at `/<slug>/`
 * on the original WordPress site (the sitemap explicitly lists root URLs),
 * so we keep that exact structure to preserve indexed positions.
 *
 * Static segments (`/about`, `/portfolio`, `/services`, etc.) take precedence
 * over this dynamic route in Next.js routing, and the 28 root-level service
 * slugs are 308'd via next.config.ts before hitting here. So the only slugs
 * this route handles are blog post slugs — anything else returns 404.
 */
export function generateStaticParams() {
  return BLOG.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(
  props: PageProps<"/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Паритет Events" };
  const title = post.seo?.seoTitle?.trim() || `${post.title} — Паритет Events`;
  const description =
    post.seo?.metaDescription?.trim() ||
    post.seo?.ogDescription?.trim() ||
    post.description;
  return buildMeta({
    path: `/${post.slug}`,
    title,
    description,
    image: post.image,
    type: "article",
  });
}

export default async function BlogPostPage(props: PageProps<"/[slug]">) {
  const { slug } = await props.params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const articleSchema = articleJsonLd({
    url: `/${post.slug}`,
    title: post.title,
    description: post.seo?.metaDescription?.trim() || post.description,
    image: post.image,
  });
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Главная", url: "/" },
    { name: "Статьи", url: "/stati" },
    { name: post.title, url: `/${post.slug}` },
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
          title={post.title}
          eyebrow="Статьи · Паритет Events"
          description={post.description}
          heroImage={post.image}
          body={post.body}
        />
      </main>
      <Footer />
    </>
  );
}

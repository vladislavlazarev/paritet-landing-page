import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import {
  CATEGORY_LABEL,
  PORTFOLIO,
  type PortfolioBlock,
  getNextPortfolio,
  getPortfolioBySlug,
} from "@/lib/portfolio";
import {
  buildMeta,
  articleJsonLd,
  breadcrumbJsonLd,
} from "@/lib/seo";

export function generateStaticParams() {
  return PORTFOLIO.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata(
  props: PageProps<"/portfolio/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const event = getPortfolioBySlug(slug);
  if (!event) return { title: "Портфолио — Паритет Events" };
  const firstParagraph = event.body.find((b) => b.kind === "paragraph");
  // Prefer SEO fields scraped from the source so we keep the same title and
  // description that earned the page its current ranking.
  const title =
    event.seo?.seoTitle?.trim() ||
    `${event.title} — Паритет Events`;
  const description =
    event.seo?.metaDescription?.trim() ||
    event.seo?.ogDescription?.trim() ||
    (firstParagraph ? firstParagraph.text.slice(0, 200) : undefined);
  return buildMeta({
    path: `/portfolio/${event.slug}`,
    title,
    description,
    image: event.coverImage,
    type: "article",
  });
}

function BlockView({ block }: { block: PortfolioBlock }) {
  if (block.kind === "heading") {
    return (
      <h2 className="font-heading text-[22px] sm:text-[28px] lg:text-[32px] leading-[1.15] tracking-[-0.02em] text-brand mt-8 sm:mt-12">
        {block.text}
      </h2>
    );
  }
  if (block.kind === "paragraph" || block.kind === "lead") {
    return (
      <p className="text-[16px] sm:text-[17px] leading-relaxed text-ink">
        {block.text}
      </p>
    );
  }
  return (
    <ul className="space-y-2 text-[16px] sm:text-[17px] leading-relaxed text-ink">
      {block.items.map((it, j) => (
        <li key={j} className="flex gap-3">
          <span aria-hidden className="text-accent-coral mt-2 inline-block h-1.5 w-1.5 rounded-full shrink-0" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function GalleryGrid({
  images,
  title,
  startIndex,
}: {
  images: string[];
  title: string;
  startIndex: number;
}) {
  if (images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div className="relative w-full overflow-hidden rounded-[16px] sm:rounded-[20px] ring-1 ring-hairline aspect-[16/8]">
        <Image
          src={images[0]}
          alt={`${title} — фото ${startIndex + 1}`}
          fill
          sizes="(min-width:1240px) 1240px, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  const colsCls =
    images.length === 2
      ? "sm:grid-cols-2"
      : images.length === 3
        ? "sm:grid-cols-3"
        : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid grid-cols-1 ${colsCls} gap-4 sm:gap-5 lg:gap-6`}>
      {images.map((src, i) => (
        <div
          key={src}
          className="relative overflow-hidden rounded-[16px] sm:rounded-[20px] ring-1 ring-hairline aspect-[4/3]"
        >
          <Image
            src={src}
            alt={`${title} — фото ${startIndex + i + 1}`}
            fill
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

export default async function PortfolioEventPage(
  props: PageProps<"/portfolio/[slug]">,
) {
  const { slug } = await props.params;
  const event = getPortfolioBySlug(slug);
  if (!event) notFound();

  const next = getNextPortfolio(slug);
  const heroImage = event.images[0];
  const heroSmall = event.images.slice(1, 5);
  const restImages = event.images.slice(5);

  const firstParagraph = event.body.find((b) => b.kind === "paragraph");
  const articleSchema = articleJsonLd({
    url: `/portfolio/${event.slug}`,
    title: event.title,
    description:
      event.seo?.metaDescription?.trim() ||
      (firstParagraph ? firstParagraph.text.slice(0, 200) : undefined),
    image: heroImage,
  });
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Главная", url: "/" },
    { name: "Портфолио", url: "/portfolio" },
    { name: event.title, url: `/portfolio/${event.slug}` },
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
        <section
          className="relative bg-brand text-white overflow-hidden"
          style={{
            backgroundImage:
              "radial-gradient(1000px 600px at 80% 0%, rgba(120,40,200,0.55), transparent 60%), radial-gradient(800px 500px at 0% 100%, rgba(238,59,86,0.25), transparent 60%)",
          }}
        >
          <div className="container-page pt-24 sm:pt-36 lg:pt-48 pb-10 sm:pb-16 lg:pb-20">
            <div className="grid grid-cols-[auto,1fr] gap-x-4 sm:gap-x-10 lg:gap-x-14 items-start">
              <Link
                href="/portfolio"
                aria-label="Назад в портфолио"
                className="mt-3 sm:mt-5 grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-full text-white hover:bg-white/10 transition-colors"
              >
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 8L10 18l12 10" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10 18h22" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <div>
                <p className="text-[12px] sm:text-[13px] tracking-[0.22em] uppercase text-white/55">
                  {CATEGORY_LABEL[event.category]}
                </p>
                <h1 className="mt-3 font-heading text-[28px] sm:text-[40px] md:text-[56px] lg:text-[72px] leading-[1.05] tracking-[-0.025em] text-white">
                  {event.title}
                </h1>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="container-page pt-10 sm:pt-14 lg:pt-16 pb-10 sm:pb-14">
            {heroImage && (
              <div
                className="relative w-full overflow-hidden rounded-[20px] sm:rounded-[24px]"
                style={{ aspectRatio: "16 / 7" }}
              >
                <Image
                  src={heroImage}
                  alt={event.title}
                  fill
                  priority
                  sizes="(min-width: 1240px) 1240px, 100vw"
                  className="object-cover"
                />
              </div>
            )}

            {heroSmall.length > 0 && (
              <div
                className={`mt-4 sm:mt-5 lg:mt-6 grid ${
                  heroSmall.length === 1
                    ? "grid-cols-1"
                    : heroSmall.length === 2
                      ? "grid-cols-2"
                      : heroSmall.length === 3
                        ? "grid-cols-2 sm:grid-cols-3"
                        : "grid-cols-2 lg:grid-cols-4"
                } gap-3 sm:gap-4 lg:gap-5`}
              >
                {heroSmall.map((src, i) => (
                  <div
                    key={src}
                    className="relative overflow-hidden rounded-[14px] sm:rounded-[18px] ring-1 ring-hairline aspect-square"
                  >
                    <Image
                      src={src}
                      alt={`${event.title} — фото ${i + 2}`}
                      fill
                      priority={i < 2}
                      sizes="(min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="container-page pb-12 sm:pb-16 lg:pb-20">
            <div className="max-w-[760px] mx-auto space-y-5 sm:space-y-6">
              {event.body.map((block, i) => (
                <BlockView key={i} block={block} />
              ))}
            </div>
          </div>

          {restImages.length > 0 && (
            <div className="container-page pb-12 sm:pb-16 lg:pb-20">
              <GalleryGrid
                images={restImages}
                title={event.title}
                startIndex={1 + heroSmall.length}
              />
            </div>
          )}
        </section>

        <section className="bg-white">
          <div className="container-page py-8 sm:py-12">
            <Link
              href={`/portfolio/${next.slug}`}
              className="group relative block overflow-hidden rounded-[20px] text-white"
              style={{
                background:
                  "linear-gradient(95deg, #0d0a3a 0%, #1f1a55 40%, #2d2683 100%)",
              }}
            >
              <div
                aria-hidden
                className="absolute inset-y-0 left-0 w-1/3"
                style={{
                  backgroundImage:
                    "radial-gradient(420px 240px at 20% 50%, rgba(120,80,210,0.45), transparent 70%)",
                }}
              />
              <div className="relative grid grid-cols-1 sm:grid-cols-[1fr,auto] gap-6 sm:gap-10 items-center px-5 sm:px-10 lg:px-14 py-8 sm:py-14 lg:py-16">
                <div>
                  <p className="text-[14px] text-white/60">
                    Следующее мероприятие
                  </p>
                  <p className="mt-2 font-heading text-[20px] sm:text-[28px] lg:text-[32px] leading-[1.15] tracking-[-0.02em] text-white max-w-[560px]">
                    {next.title}
                  </p>
                </div>
                <span className="inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full ring-1 ring-white/30 transition-transform group-hover:translate-x-1">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>

          <div className="container-page pb-12 sm:pb-16">
            <p className="text-[15px] sm:text-[16px] text-body">
              Время загадывать желания: готовим{" "}
              <a
                href="/#contact"
                className="text-accent-coral underline underline-offset-4 hover:text-accent-coral-strong"
              >
                новогодний корпоратив
              </a>
              , о котором будут говорить весь год
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

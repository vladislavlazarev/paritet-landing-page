import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { BLOG } from "@/lib/blog";
import { breadcrumbJsonLd, buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/stati",
  title: "Статьи Паритет Events: организация мероприятий — советы и кейсы",
  description:
    "Полезные статьи об организации корпоративов, тимбилдингов и частных праздников от команды Paritet Events.",
});

const breadcrumbs = breadcrumbJsonLd([
  { name: "Главная", url: "/" },
  { name: "Статьи", url: "/stati" },
]);

export default function BlogIndexPage() {
  return (
    <>
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
            <h1 className="font-heading text-[44px] sm:text-[80px] md:text-[112px] lg:text-[140px] leading-[0.95] tracking-[-0.03em] text-white">
              Статьи
            </h1>
            <p className="mt-6 max-w-2xl text-[15px] sm:text-[17px] leading-relaxed text-white/85">
              Опыт команды Paritet Events: о выборе площадки, форматах
              корпоративов, новогодних программах и закулисье event-индустрии.
            </p>
          </div>
        </section>

        <section className="bg-white">
          <div className="container-page py-12 sm:py-16 lg:py-20">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
              {BLOG.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/${post.slug}`}
                    className="group block bg-white rounded-[20px] overflow-hidden ring-1 ring-hairline hover:shadow-[0_12px_40px_-20px_rgba(31,26,85,0.45)] transition-shadow"
                  >
                    <div className="aspect-[4/3] relative overflow-hidden bg-surface-soft">
                      {post.image && (
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          sizes="(min-width:1024px) 380px, (min-width:640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      )}
                    </div>
                    <div className="px-6 sm:px-7 py-5 sm:py-6">
                      <h3 className="text-[18px] sm:text-[20px] leading-snug text-ink">
                        {post.title}
                      </h3>
                      {post.description && (
                        <p className="mt-3 text-[14px] leading-relaxed text-body line-clamp-3">
                          {post.description}
                        </p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

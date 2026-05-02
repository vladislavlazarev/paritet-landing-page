import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { PortfolioGrid } from "@/components/site/portfolio-grid";
import { PORTFOLIO } from "@/lib/portfolio";
import { buildMeta, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/portfolio",
  title: "Портфолио — Паритет Events: реализованные мероприятия в Санкт-Петербурге",
  description:
    "Реализованные проекты Паритет Events: 100+ корпоративных мероприятий, концертов, тимбилдингов и частных праздников в Санкт-Петербурге.",
});

const breadcrumbs = breadcrumbJsonLd([
  { name: "Главная", url: "/" },
  { name: "Портфолио", url: "/portfolio" },
]);

export default function PortfolioPage() {
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
            <h1 className="font-heading text-[52px] sm:text-[88px] md:text-[120px] lg:text-[160px] leading-[0.92] tracking-[-0.03em] text-white">
              Портфолио
            </h1>
          </div>

          <PortfolioGrid events={PORTFOLIO} />
        </section>
      </main>
      <Footer />
    </>
  );
}

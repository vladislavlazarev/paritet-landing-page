import type { Metadata } from "next";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { PortfolioGrid } from "@/components/site/portfolio-grid";
import { PORTFOLIO } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Портфолио — Паритет Events",
  description:
    "Реализованные проекты Паритет Events: корпоративные мероприятия, концерты, тимбилдинги, частные праздники.",
};

export default function PortfolioPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section
          className="relative bg-brand text-white overflow-hidden"
          style={{
            backgroundImage:
              "radial-gradient(1000px 600px at 80% 0%, rgba(120,40,200,0.55), transparent 60%), radial-gradient(800px 500px at 0% 100%, rgba(238,59,86,0.25), transparent 60%)",
          }}
        >
          <div className="container-page pt-32 sm:pt-40 lg:pt-48 pb-12 sm:pb-16 lg:pb-20">
            <h1 className="font-heading text-[56px] sm:text-[88px] md:text-[112px] lg:text-[140px] leading-[0.95] tracking-[-0.03em] text-white">
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

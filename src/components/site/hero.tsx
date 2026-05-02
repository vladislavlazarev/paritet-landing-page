export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0a0b0d] text-white min-h-[100svh] flex items-end pt-24 sm:pt-28">
      <video
        className="absolute inset-0 h-full w-full object-cover -z-20"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/hero-poster.jpg"
        aria-label="Show-reel Паритет Events: организация мероприятий в Санкт-Петербурге"
      >
        {/* Drop a show-reel into /public/videos/showreel.mp4 (or .webm) */}
        <source src="/videos/showreel.mp4" type="video/mp4" />
        <source src="/videos/showreel.webm" type="video/webm" />
      </video>

      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(900px 600px at 75% 30%, rgba(120,40,200,0.4), transparent 60%), radial-gradient(700px 500px at 20% 70%, rgba(238,59,86,0.25), transparent 60%), linear-gradient(180deg, rgba(10,11,13,0.45) 0%, rgba(21,4,31,0.55) 60%, rgba(10,11,13,0.85) 100%)",
        }}
      />

      <div className="container-page pb-8 sm:pb-10 lg:pb-14">
        <div className="max-w-3xl">
          {/*
            SEO-семантика и визуальный дизайн разнесены:
            • <h1> — keyword-богатый заголовок страницы для поисковиков и
              скринридеров; визуально скрыт через sr-only.
            • Большой поэтичный заголовок ниже — визуальный <h2>, чтобы
              сохранить голос бренда без потери видимости в SERP.
          */}
          <h1 className="sr-only">
            Организация мероприятий в Санкт-Петербурге: корпоративы,
            тимбилдинги, концерты и новогодние корпоративы — Паритет Events
          </h1>
          <h2 className="font-heading text-[36px] sm:text-[56px] md:text-[64px] lg:text-[84px] leading-[1.05] sm:leading-[1.02] tracking-[-0.025em] text-white">
            Профессионально
            <br />
            <span className="text-white/85">об искусстве</span>
            <br />
            мероприятий
          </h2>
          <p className="mt-5 sm:mt-7 max-w-xl text-[15px] sm:text-[16px] leading-relaxed text-white/75">
            Организуем корпоративы, тимбилдинги, концерты и новогодние
            корпоративы в Санкт-Петербурге и Ленинградской области под ключ.
            Более 20 лет создаём события для частных клиентов и компаний
            с мировым именем — от камерных праздников до фестивалей
            на тысячи гостей.
          </p>
          <div className="mt-7 sm:mt-9">
            <a
              href="tel:+79214102121"
              className="sm:hidden inline-flex h-12 items-center gap-2 rounded-full bg-accent-coral px-5 text-[14px] font-semibold text-white hover:bg-accent-coral-strong transition-colors"
            >
              Позвонить
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <a
              href="#contact"
              className="hidden sm:inline-flex h-14 items-center gap-2 rounded-full bg-accent-coral px-7 text-[15px] font-semibold text-white hover:bg-accent-coral-strong transition-colors"
            >
              Позвонить
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

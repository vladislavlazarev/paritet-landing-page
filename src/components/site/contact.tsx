export function Contact() {
  return (
    <section id="contact" className="relative bg-white">
      <div className="container-page py-16 sm:py-20 lg:py-24">
        <div
          className="rounded-[20px] sm:rounded-[28px] px-5 sm:px-12 lg:px-20 py-10 sm:py-16 lg:py-24 text-white relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #1f1a55 0%, #2a1a78 60%, #3a107a 100%)",
          }}
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(600px 400px at 80% 0%, rgba(238,59,86,0.45), transparent 60%), radial-gradient(500px 350px at 0% 100%, rgba(120,40,200,0.5), transparent 60%)",
            }}
          />

          <div className="relative max-w-3xl">
            <h2 className="font-heading text-[28px] sm:text-[44px] md:text-[64px] leading-[1.08] sm:leading-[1.02] tracking-[-0.025em]">
              Начнём планировать?
            </h2>
            <p className="mt-5 sm:mt-7 text-[15px] sm:text-[16px] leading-relaxed text-white/80 max-w-lg">
              Позвоните нам или напишите в&nbsp;Telegram:
            </p>

            <div className="mt-8 sm:mt-10 space-y-2 sm:space-y-3">
              <a
                href="tel:+79214102121"
                className="block font-heading text-[24px] sm:text-[40px] md:text-[52px] leading-none tracking-[-0.02em] hover:text-accent-coral transition-colors"
              >
                +7 (921) 410-21-21
              </a>
              <a
                href="tel:+79219519282"
                className="block font-heading text-[24px] sm:text-[40px] md:text-[52px] leading-none tracking-[-0.02em] hover:text-accent-coral transition-colors"
              >
                +7 (921) 951-92-82
              </a>
            </div>

            <div className="mt-8 sm:mt-10 flex flex-wrap gap-3">
              <a
                href="tel:+79214102121"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-white/10 hover:bg-white/15 transition-colors px-5 text-[14px] font-medium text-white"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.5 0 1 .4 1 1V20c0 .5-.5 1-1 1-9.4 0-17-7.6-17-17 0-.5.5-1 1-1h3.4c.6 0 1 .5 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1z" /></svg>
                Позвонить
              </a>
              <a
                href="https://t.me/paritetevents"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-white/10 hover:bg-white/15 transition-colors px-5 text-[14px] font-medium text-white"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22 3 2 11l6 2 2 7 4-5 6 5 2-17z" /></svg>
                Telegram
              </a>
            </div>
          </div>
        </div>

        <p className="mt-8 sm:mt-10 text-[14px] text-body max-w-2xl">
          Время загадывать желания: готовим{" "}
          <a href="#services" className="text-brand underline underline-offset-4 hover:text-accent-coral">
            новогодний корпоратив
          </a>
          , о котором будут говорить весь год.
        </p>
      </div>
    </section>
  );
}

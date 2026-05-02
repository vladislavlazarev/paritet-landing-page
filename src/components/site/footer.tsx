import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="bg-brand-strong text-white/70">
      <div className="container-page py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-6 text-[14px] leading-relaxed max-w-xs">
              Paritet Events — организация и проведение праздничных
              мероприятий в Санкт-Петербурге. © 2000–2026
            </p>
          </div>
          <div className="lg:col-span-3">
            <h4 className="text-white text-[12px] font-semibold tracking-[0.22em] uppercase mb-5">
              Контакты
            </h4>
            <ul className="space-y-3 text-[14px]">
              <li>г. Санкт-Петербург</li>
              <li>Невский проспект, 109, офис 27</li>
              <li>
                <a href="tel:+79214102121" className="hover:text-white">
                  +7 (921) 410-21-21
                </a>
              </li>
              <li>
                <a href="tel:+79219519282" className="hover:text-white">
                  +7 (921) 951-92-82
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@party-paritet.com"
                  className="underline underline-offset-4 hover:text-white"
                >
                  info@party-paritet.com
                </a>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-2">
            <h4 className="text-white text-[12px] font-semibold tracking-[0.22em] uppercase mb-5">
              Разделы
            </h4>
            <ul className="space-y-3 text-[14px]">
              <li><a href="#portfolio" className="hover:text-white">Портфолио</a></li>
              <li><a href="#services" className="hover:text-white">Услуги</a></li>
              <li><a href="#about" className="hover:text-white">О компании</a></li>
              <li><a href="#contact" className="hover:text-white">Контакты</a></li>
            </ul>
          </div>
          <div className="lg:col-span-3">
            <h4 className="text-white text-[12px] font-semibold tracking-[0.22em] uppercase mb-5">
              Соцсети
            </h4>
            <div className="flex gap-3">
              {["YT", "VK", "TG", "IG"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-[12px] font-semibold text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                  aria-label={s}
                >
                  {s}
                </a>
              ))}
            </div>
            <p className="mt-6 text-[12px] leading-relaxed text-white/45">
              * Instagram принадлежит Meta Platforms Inc., которая признана
              экстремистской и запрещена в России.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3 sm:items-center justify-between text-[12px] text-white/45">
          <span>© 2000–2026 Paritet Events. Все права защищены.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white">Условия использования</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="bg-brand-strong text-white/70">
      <div className="container-page py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10">
          <div className="sm:col-span-2 lg:col-span-4">
            <Logo />
            <p className="mt-5 sm:mt-6 text-[14px] leading-relaxed max-w-xs">
              Paritet Events — организация и проведение праздничных
              мероприятий в Санкт-Петербурге. © 2000–2026
            </p>
          </div>
          <div className="lg:col-span-3">
            <h4 className="text-white text-[12px] font-semibold tracking-[0.22em] uppercase mb-4 sm:mb-5">
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
            <h4 className="text-white text-[12px] font-semibold tracking-[0.22em] uppercase mb-4 sm:mb-5">
              Разделы
            </h4>
            <ul className="space-y-3 text-[14px]">
              <li><a href="#portfolio" className="hover:text-white">Портфолио</a></li>
              <li><a href="#services" className="hover:text-white">Услуги</a></li>
              <li><a href="#about" className="hover:text-white">О компании</a></li>
              <li><a href="#contact" className="hover:text-white">Контакты</a></li>
            </ul>
          </div>
          <div className="sm:col-span-2 lg:col-span-3">
            <h4 className="text-white text-[12px] font-semibold tracking-[0.22em] uppercase mb-4 sm:mb-5">
              Соцсети
            </h4>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="YouTube"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="ВКонтакте"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12.8 17.4c-5.7 0-9.3-4-9.4-10.5h2.9c.1 4.8 2.2 6.8 3.9 7.2V6.9h2.7v4.2c1.7-.2 3.4-2.1 4-4.2h2.7c-.5 2.6-2.4 4.5-3.7 5.3 1.3.6 3.5 2.3 4.4 5.2h-3c-.7-2.2-2.3-3.9-4.4-4.1v4.1h-.1Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 sm:mt-12 pt-5 sm:pt-6 border-t border-white/10 text-[12px] text-white/45">
          <span>© 2000–2026 Paritet Events. Все права защищены.</span>
        </div>
      </div>
    </footer>
  );
}

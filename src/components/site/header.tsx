"use client";

import { useEffect, useState } from "react";
import { Logo } from "./logo";

const NAV = [
  { href: "/portfolio", label: "Портфолио" },
  { href: "/services", label: "Услуги" },
  { href: "/services/timbilding-koncertmeister", label: "Тимбилдинги" },
  { href: "/about", label: "О нас" },
  { href: "/contacts", label: "Контакты" },
];

const LOCALES = ["Ru", "En", "Zh"] as const;

type HeaderProps = {
  theme?: "transparent" | "light";
  active?: string;
};

export function Header({ theme = "transparent", active }: HeaderProps) {
  const [locale, setLocale] = useState<(typeof LOCALES)[number]>("Ru");
  const [open, setOpen] = useState(false);
  const isLight = theme === "light";

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  const navTextBase = isLight
    ? "text-brand/80 hover:text-brand"
    : "text-white/85 hover:text-white";
  const navTextActive = isLight ? "text-accent-coral" : "text-accent-coral";
  const localeIdle = isLight
    ? "text-brand/55 hover:text-brand"
    : "text-white/60 hover:text-white";
  const burgerColor = isLight
    ? "text-brand hover:bg-brand/5"
    : "text-white hover:bg-white/10";

  return (
    <header
      className={
        isLight
          ? "relative z-50 bg-transparent"
          : "absolute top-0 inset-x-0 z-50 bg-transparent"
      }
    >
      <div
        className={`container-page relative flex h-16 sm:h-20 lg:h-[120px] items-center justify-between ${
          isLight ? "text-brand" : "text-white"
        }`}
      >
        <Logo variant={isLight ? "dark" : "light"} />

        <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8 lg:gap-10 text-[16px] lg:text-[21px] font-medium">
          {NAV.map((n) => {
            const isActive = active === n.href || active === n.label;
            return (
              <a
                key={n.href}
                href={n.href}
                className={`transition-colors ${
                  isActive ? navTextActive : navTextBase
                }`}
              >
                {n.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <div className="hidden sm:flex items-center gap-1 text-[13px] lg:text-[20px] font-medium">
            {LOCALES.map((l) => (
              <button
                key={l}
                onClick={() => setLocale(l)}
                className={`px-2.5 py-1 lg:px-4 lg:py-1.5 rounded-full transition-colors ${
                  locale === l ? "text-accent-coral" : localeIdle
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            className={`md:hidden grid h-10 w-10 place-items-center rounded-full transition-colors ${burgerColor}`}
          >
            {open ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /></svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" /></svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div
          className="md:hidden fixed inset-0 top-16 z-40 bg-[#0a0b0d]/95 backdrop-blur-sm overflow-y-auto"
          onClick={() => setOpen(false)}
        >
          <div
            className="container-page pt-6 pb-10"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col divide-y divide-white/10">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="font-heading text-[24px] sm:text-[28px] tracking-[-0.02em] text-white py-4 sm:py-5 hover:text-accent-coral transition-colors"
                >
                  {n.label}
                </a>
              ))}
            </nav>

            <div className="mt-8 flex items-center gap-2 sm:hidden">
              {LOCALES.map((l) => (
                <button
                  key={l}
                  onClick={() => setLocale(l)}
                  className={`px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                    locale === l
                      ? "bg-white/15 text-accent-coral"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://wa.me/79214102121"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-accent-coral px-5 text-[14px] font-semibold text-white"
              >
                WhatsApp
              </a>
              <a
                href="tel:+79214102121"
                onClick={() => setOpen(false)}
                className="inline-flex h-12 items-center gap-2 rounded-full border border-white/20 px-5 text-[14px] font-medium text-white"
              >
                +7 (921) 410-21-21
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

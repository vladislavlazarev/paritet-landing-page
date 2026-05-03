"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { useLocale } from "@/lib/i18n/locale-context";
import {
  LOCALES,
  LOCALE_LABEL,
  type Locale,
} from "@/lib/i18n/config";
import { p, neutralPath } from "@/lib/i18n/paths";

type HeaderProps = {
  theme?: "transparent" | "light";
  /**
   * Locale-neutral key for the active nav item, e.g. "/portfolio".
   * Pass the same key on every page so the active highlight works in any
   * language.
   */
  active?: string;
};

export function Header({ theme = "transparent", active }: HeaderProps) {
  const { locale, dict } = useLocale();
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

  const NAV: { href: string; label: string }[] = [
    { href: "/portfolio", label: dict.nav.portfolio },
    { href: "/services", label: dict.nav.services },
    {
      href: "/services/timbilding-koncertmeister",
      label: dict.nav.teambuildings,
    },
    { href: "/about", label: dict.nav.about },
    { href: "/contacts", label: dict.nav.contacts },
  ];

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

  // Language switcher: resolve current pathname's neutral form so we can
  // re-prefix it with the target locale and stay on the same page.
  const switchHref = (target: Locale): string => {
    if (typeof window === "undefined") return p(target, "/");
    return p(target, neutralPath(window.location.pathname));
  };

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
        <Logo variant={isLight ? "dark" : "light"} homeHref={p(locale, "/")} />

        <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8 lg:gap-10 text-[16px] lg:text-[21px] font-medium">
          {NAV.map((n) => {
            const isActive = active === n.href;
            return (
              <Link
                key={n.href}
                href={p(locale, n.href)}
                className={`transition-colors ${
                  isActive ? navTextActive : navTextBase
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <div
            className="hidden sm:flex items-center gap-1 text-[13px] lg:text-[20px] font-medium"
            aria-label={dict.nav.languageLabel}
          >
            {LOCALES.map((l) => (
              <a
                key={l}
                href={switchHref(l)}
                hrefLang={l}
                aria-current={l === locale ? "true" : undefined}
                className={`px-2.5 py-1 lg:px-4 lg:py-1.5 rounded-full transition-colors ${
                  l === locale ? "text-accent-coral" : localeIdle
                }`}
              >
                {LOCALE_LABEL[l]}
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
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
                <Link
                  key={n.href}
                  href={p(locale, n.href)}
                  onClick={() => setOpen(false)}
                  className="font-heading text-[24px] sm:text-[28px] tracking-[-0.02em] text-white py-4 sm:py-5 hover:text-accent-coral transition-colors"
                >
                  {n.label}
                </Link>
              ))}
            </nav>

            <div
              className="mt-8 flex items-center gap-2 sm:hidden"
              aria-label={dict.nav.languageLabel}
            >
              {LOCALES.map((l) => (
                <a
                  key={l}
                  href={switchHref(l)}
                  hrefLang={l}
                  aria-current={l === locale ? "true" : undefined}
                  className={`px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                    l === locale
                      ? "bg-white/15 text-accent-coral"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {LOCALE_LABEL[l]}
                </a>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="tel:+79214102121"
                onClick={() => setOpen(false)}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-accent-coral px-5 text-[14px] font-semibold text-white hover:bg-accent-coral-strong transition-colors"
              >
                {dict.nav.callUs}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
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

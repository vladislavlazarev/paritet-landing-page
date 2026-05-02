"use client";

import { useState } from "react";
import { Logo } from "./logo";

const NAV = [
  { href: "#portfolio", label: "Портфолио" },
  { href: "#services", label: "Услуги" },
  { href: "#about", label: "О нас" },
  { href: "#contact", label: "Контакты" },
];

const LOCALES = ["Ru", "En", "Zh"] as const;

export function Header() {
  const [locale, setLocale] = useState<(typeof LOCALES)[number]>("Ru");

  return (
    <header className="absolute top-0 inset-x-0 z-50 bg-transparent">
      <div className="container-page flex h-20 items-center justify-between text-white">
        <Logo />

        <nav className="hidden md:flex items-center gap-10 text-[14px] font-medium">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-white/85 hover:text-white transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1 text-[13px] font-medium">
          {LOCALES.map((l) => (
            <button
              key={l}
              onClick={() => setLocale(l)}
              className={`px-2.5 py-1 rounded-full transition-colors ${
                locale === l
                  ? "text-accent-coral"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

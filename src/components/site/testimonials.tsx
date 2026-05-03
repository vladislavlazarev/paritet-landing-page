"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Carousel } from "./carousel";
import { reviews, type Review } from "@/lib/testimonials-data";
import { useLocale } from "@/lib/i18n/locale-context";

type TestimonialsProps = {
  eyebrow?: string;
  heading?: string;
};

export function Testimonials({
  eyebrow,
  heading,
}: TestimonialsProps = {}) {
  const { dict } = useLocale();
  const [open, setOpen] = useState<Review | null>(null);
  const headingText = heading ?? dict.testimonials.sectionTitle;

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = original;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <section className="relative bg-white text-ink overflow-hidden">
      <div className="container-page pt-16 sm:pt-24 lg:pt-32 pb-8 sm:pb-12">
        <div className="max-w-2xl">
          {eyebrow && (
            <p className="text-[11px] sm:text-[12px] tracking-[0.28em] uppercase text-muted-fg">
              {eyebrow}
            </p>
          )}
          <h2 className="mt-4 font-heading text-[28px] sm:text-[40px] md:text-[52px] leading-[1.08] sm:leading-[1.04] tracking-[-0.025em] text-ink">
            {headingText}
          </h2>
        </div>
      </div>

      <div className="container-page-left pb-16 sm:pb-24 lg:pb-32">
        <Carousel
          showCount
          bleed="bleed-right"
          itemClassName="w-[88vw] sm:w-[64vw] lg:w-[42vw] max-w-[560px]"
          persistKey="home-testimonials"
        >
          {reviews.map((r) => (
            <article
              key={r.slug}
              className="rounded-[24px] bg-surface-soft p-5 sm:p-8 lg:p-10 ring-1 ring-hairline h-full flex flex-col"
            >
              <div className="flex items-center gap-4 mb-6 sm:mb-7">
                <span className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-[14px] bg-white ring-1 ring-hairline overflow-hidden shrink-0 grid place-items-center p-2">
                  <Image
                    src={r.logo}
                    alt={r.brand}
                    width={120}
                    height={120}
                    className="max-h-full max-w-full object-contain"
                  />
                </span>
                <div className="min-w-0">
                  <p className="text-[14px] sm:text-[15px] font-semibold text-ink leading-tight">
                    {r.brand}
                  </p>
                  {r.role && (
                    <p className="text-[12px] sm:text-[13px] text-muted-fg mt-1 leading-snug">
                      {r.role}
                    </p>
                  )}
                </div>
              </div>

              <p className="text-[15px] sm:text-[16px] leading-relaxed text-ink line-clamp-6 grow">
                «{r.quote}»
              </p>

              <div className="mt-6 sm:mt-7 pt-5 sm:pt-6 border-t border-hairline flex items-center justify-between gap-3">
                {r.author ? (
                  <span className="text-[13px] sm:text-[14px] font-medium text-ink truncate">
                    {r.author}
                  </span>
                ) : (
                  <span />
                )}
                <button
                  type="button"
                  onClick={() => setOpen(r)}
                  className="inline-flex items-center gap-1.5 text-[14px] font-medium text-brand hover:text-accent-coral transition-colors shrink-0"
                >
                  {dict.testimonials.readFull}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </Carousel>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[100] bg-[#0a0b0d]/70 backdrop-blur-sm flex items-start sm:items-center justify-center p-4 sm:p-8 overflow-y-auto"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${dict.testimonials.sectionTitle}: ${open.brand}`}
        >
          <div
            className="relative w-full max-w-[760px] my-auto rounded-[20px] sm:rounded-[24px] bg-white p-6 sm:p-10 lg:p-12 shadow-[0_24px_80px_-20px_rgba(10,11,13,0.5)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label={dict.testimonials.closeAria}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 grid h-10 w-10 place-items-center rounded-full text-ink/60 hover:text-ink hover:bg-surface-soft transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>

            <p className="text-[11px] sm:text-[12px] tracking-[0.28em] uppercase text-muted-fg">
              {dict.testimonials.letterEyebrow}
            </p>

            <div className="mt-3 flex items-center gap-4">
              <span className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-[14px] bg-white ring-1 ring-hairline overflow-hidden shrink-0 grid place-items-center p-2">
                <Image
                  src={open.logo}
                  alt={open.brand}
                  width={120}
                  height={120}
                  className="max-h-full max-w-full object-contain"
                />
              </span>
              <div>
                <h3 className="font-heading text-[22px] sm:text-[28px] leading-tight tracking-[-0.02em] text-brand">
                  {open.brand}
                </h3>
                {open.role && (
                  <p className="text-[12px] sm:text-[13px] text-muted-fg mt-1 leading-snug">
                    {open.role}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 sm:mt-8 space-y-4 text-[15px] sm:text-[16px] leading-relaxed text-ink">
              {open.full.split(/\n+/).map((para, j) => (
                <p key={j}>{para}</p>
              ))}
            </div>

            {open.author && (
              <p className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-hairline text-[14px] font-medium text-ink">
                {open.author}
              </p>
            )}

            {open.letter && (
              <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-hairline">
                <p className="text-[11px] sm:text-[12px] tracking-[0.28em] uppercase text-muted-fg mb-4 sm:mb-5">
                  {dict.testimonials.letterOriginal}
                </p>
                <a
                  href={open.letter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative rounded-[14px] sm:rounded-[16px] overflow-hidden ring-1 ring-hairline bg-surface-soft"
                  aria-label={dict.testimonials.letterOpenAria}
                >
                  <Image
                    src={open.letter}
                    alt={`${dict.testimonials.letterEyebrow} — ${open.brand}`}
                    width={1200}
                    height={1600}
                    className="w-full h-auto object-contain"
                  />
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

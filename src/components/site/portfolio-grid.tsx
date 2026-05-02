"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  CATEGORY_LABEL,
  type PortfolioCategory,
  type PortfolioEvent,
} from "@/lib/portfolio";

type Filter = "all" | PortfolioCategory;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "Все" },
  { value: "corporate", label: CATEGORY_LABEL.corporate },
  { value: "concerts", label: CATEGORY_LABEL.concerts },
  { value: "teambuilding", label: CATEGORY_LABEL.teambuilding },
  { value: "private", label: CATEGORY_LABEL.private },
  { value: "business", label: CATEGORY_LABEL.business },
  { value: "holidays", label: CATEGORY_LABEL.holidays },
];

const NOISE_SVG =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'><filter id='n'><feTurbulence baseFrequency='0.7' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")";

export function PortfolioGrid({ events }: { events: PortfolioEvent[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(
    () =>
      filter === "all" ? events : events.filter((e) => e.category === filter),
    [events, filter],
  );

  return (
    <>
      <div className="container-page pb-12 sm:pb-14 lg:pb-16">
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {FILTERS.map((f) => {
            const active = f.value === filter;
            return (
              <button
                key={f.value}
                type="button"
                onClick={() => setFilter(f.value)}
                className={`inline-flex h-10 sm:h-12 items-center rounded-full px-4 sm:px-6 text-[13px] sm:text-[15px] font-medium transition-colors ${
                  active
                    ? "bg-accent-coral text-white"
                    : "text-white/85 hover:text-white hover:bg-white/10"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-white">
        <div className="container-page py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
            {visible.map((e) => (
              <Link
                key={e.slug}
                href={`/portfolio/${e.slug}`}
                className="group bg-white rounded-[20px] overflow-hidden ring-1 ring-hairline transition-shadow hover:shadow-[0_12px_40px_-20px_rgba(31,26,85,0.45)]"
              >
                <div
                  className="aspect-[4/3] relative overflow-hidden"
                  style={{ background: e.cover.gradient }}
                >
                  {e.coverImage ? (
                    <Image
                      src={e.coverImage}
                      alt={e.title}
                      fill
                      sizes="(min-width:1024px) 380px, (min-width:640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <>
                      <div
                        aria-hidden
                        className="absolute inset-0 mix-blend-overlay opacity-25"
                        style={{ backgroundImage: NOISE_SVG }}
                      />
                      <span className="absolute top-5 left-5 text-white text-[42px] leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
                        {e.cover.glyph}
                      </span>
                    </>
                  )}
                </div>
                <div className="px-6 sm:px-7 pt-5 sm:pt-6 pb-7 sm:pb-8">
                  <p className="text-[13px] sm:text-[14px] text-muted-fg">
                    {CATEGORY_LABEL[e.category]}
                  </p>
                  <h3 className="mt-3 text-[18px] sm:text-[20px] leading-snug text-ink">
                    {e.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          {visible.length === 0 && (
            <p className="text-center text-body py-16">
              В этой категории пока нет проектов.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

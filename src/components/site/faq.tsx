"use client";

import { useState } from "react";
import type { Faq } from "@/data/service-faq";

type Props = {
  items: Faq[];
};

export function FaqAccordion({ items }: Props) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-hairline rounded-[20px] ring-1 ring-hairline bg-white overflow-hidden">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-6 text-left px-5 sm:px-7 py-5 sm:py-6 transition-colors hover:bg-surface-soft"
            >
              <span className="text-[16px] sm:text-[18px] font-semibold text-ink leading-snug">
                {item.question}
              </span>
              <span
                aria-hidden
                className={`shrink-0 grid h-9 w-9 place-items-center rounded-full transition-colors ${
                  isOpen
                    ? "bg-accent-coral text-white"
                    : "bg-surface-strong text-ink"
                }`}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`transition-transform ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  <path d="M7 1v12M1 7h12" strokeLinecap="round" />
                </svg>
              </span>
            </button>
            {isOpen && (
              <div className="px-5 sm:px-7 pb-6 pt-0 text-[15px] sm:text-[16px] leading-relaxed text-body">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

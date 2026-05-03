"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale } from "@/lib/i18n/locale-context";

type Props = {
  children: React.ReactNode;
  className?: string;
  itemClassName?: string;
  showCount?: boolean;
  controlsTone?: "light" | "dark";
  /**
   * "container" — track sits inside container-page padding (default).
   * "bleed-right" — track flows from parent's left edge to viewport right edge.
   *   Wrap with `container-page-left` so the left edge aligns with the container.
   *   Controls below stay aligned with the container's right edge.
   */
  bleed?: "container" | "bleed-right";
  /**
   * When set, the track's horizontal scrollLeft is persisted in sessionStorage
   * so the slider keeps its position when the user navigates away and back.
   * Use a stable, page-scoped key (e.g. "home-events", "home-testimonials").
   */
  persistKey?: string;
};

export function Carousel({
  children,
  className = "",
  itemClassName = "",
  showCount = false,
  controlsTone = "light",
  bleed = "container",
  persistKey,
}: Props) {
  const { dict } = useLocale();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    setCount(track.children.length);
    if (persistKey && typeof window !== "undefined") {
      const saved = sessionStorage.getItem(`carousel:${persistKey}`);
      if (saved !== null) {
        track.scrollLeft = Number(saved);
      }
    }
  }, [children, persistKey]);

  const scrollTo = useCallback((idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    const item = track.children[idx] as HTMLElement | undefined;
    if (!item) return;
    track.scrollTo({ left: item.offsetLeft, behavior: "smooth" });
  }, []);

  const onScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const left = track.scrollLeft;
    let best = 0;
    let bestDist = Infinity;
    Array.from(track.children).forEach((c, i) => {
      const el = c as HTMLElement;
      const d = Math.abs(el.offsetLeft - left);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setActive(best);
    if (persistKey && typeof window !== "undefined") {
      sessionStorage.setItem(`carousel:${persistKey}`, String(left));
    }
  }, [persistKey]);

  const prev = () => scrollTo(Math.max(0, active - 1));
  const next = () => scrollTo(Math.min(count - 1, active + 1));

  const arrowBase =
    "grid h-12 w-12 place-items-center rounded-full transition-colors disabled:opacity-40 disabled:cursor-not-allowed";
  const arrow =
    controlsTone === "dark"
      ? `${arrowBase} text-white border border-white/20 hover:bg-white/10`
      : `${arrowBase} text-ink border border-hairline hover:bg-surface-soft`;

  const trackClass =
    bleed === "bleed-right"
      ? "no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pr-5 sm:pr-8"
      : "no-scrollbar -mx-5 sm:-mx-8 lg:-mx-12 px-5 sm:px-8 lg:px-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth";

  const controlsClass =
    bleed === "bleed-right"
      ? "mt-8 flex items-center justify-between container-page-right"
      : "mt-8 flex items-center justify-between";

  return (
    <div className={className}>
      <div ref={trackRef} onScroll={onScroll} className={trackClass}>
        {Array.isArray(children)
          ? children.map((child, i) => (
              <div
                key={i}
                className={`snap-start shrink-0 ${itemClassName}`}
              >
                {child}
              </div>
            ))
          : children}
      </div>

      <div className={controlsClass}>
        {showCount ? (
          <span
            className={`text-[12px] tracking-[0.3em] uppercase ${
              controlsTone === "dark" ? "text-white/55" : "text-muted-fg"
            }`}
          >
            {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
        ) : (
          <span />
        )}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={prev}
            aria-label={dict.carousel.prev}
            disabled={active === 0}
            className={arrow}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label={dict.carousel.next}
            disabled={active >= count - 1}
            className={arrow}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

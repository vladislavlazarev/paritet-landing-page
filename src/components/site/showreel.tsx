"use client";

import { useEffect, useRef, useState } from "react";

export function Showreel() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [autoplaying, setAutoplaying] = useState(false);
  const [unmuted, setUnmuted] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onPlaying = () => setAutoplaying(true);
    const onError = () => setAutoplaying(false);

    v.addEventListener("playing", onPlaying);
    v.addEventListener("error", onError);

    return () => {
      v.removeEventListener("playing", onPlaying);
      v.removeEventListener("error", onError);
    };
  }, []);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.play();
    setUnmuted(true);
  };

  // The play overlay only appears once the muted preview is actually
  // running. If energy-saving mode or a slow connection prevents autoplay,
  // `playing` never fires and we fall back to the gradient backdrop alone.
  const showPlayOverlay = autoplaying && !unmuted;

  return (
    <button
      type="button"
      onClick={showPlayOverlay ? play : undefined}
      aria-label="Смотреть промо-ролик"
      className={`group relative block w-full overflow-hidden rounded-[20px] sm:rounded-[28px] aspect-[16/9] ring-1 ring-white/10 focus:outline-none ${
        showPlayOverlay
          ? "cursor-pointer focus:ring-2 focus:ring-accent-coral"
          : "cursor-default"
      }`}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop={!unmuted}
        playsInline
        preload="metadata"
        controls={unmuted}
      >
        <source src="/videos/showreel.mp4" type="video/mp4" />
        <source src="/videos/showreel.webm" type="video/webm" />
      </video>

      {!unmuted && (
        <>
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/55 transition-opacity duration-300 group-hover:opacity-90"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(800px 500px at 50% 50%, rgba(120,40,200,0.30), transparent 60%)",
            }}
          />

          {showPlayOverlay && (
            <div className="absolute inset-0 grid place-items-center text-white">
              <div className="flex flex-col items-center gap-4 sm:gap-5">
                <span className="grid h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 place-items-center rounded-full bg-white/15 backdrop-blur ring-1 ring-white/30 transition-transform duration-300 group-hover:scale-110">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="ml-1 sm:h-7 sm:w-7"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <span className="font-heading text-[18px] sm:text-[22px] lg:text-[26px] tracking-[-0.01em]">
                  Смотреть промо-ролик
                </span>
              </div>
            </div>
          )}
        </>
      )}
    </button>
  );
}

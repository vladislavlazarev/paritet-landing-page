"use client";

import { useRef } from "react";
import { useProgressiveVideo } from "@/lib/use-progressive-video";

type Props = {
  className?: string;
  poster?: string;
  ariaLabel?: string;
};

const LOW = { mp4: "/videos/showreel-low.mp4", webm: "/videos/showreel-low.webm" };
const HIGH = { mp4: "/videos/showreel.mp4", webm: "/videos/showreel.webm" };

export function HeroBackgroundVideo({ className, poster, ariaLabel }: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const { upgraded } = useProgressiveVideo({ videoRef: ref, low: LOW, high: HIGH });

  const sources = upgraded ? HIGH : LOW;

  return (
    <video
      ref={ref}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-label={ariaLabel}
    >
      <source src={sources.mp4} type="video/mp4" />
      {sources.webm && <source src={sources.webm} type="video/webm" />}
    </video>
  );
}

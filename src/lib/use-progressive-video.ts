"use client";

import { useEffect, useState, type RefObject } from "react";

type SourceSet = {
  mp4: string;
  webm?: string;
};

type Options = {
  videoRef: RefObject<HTMLVideoElement | null>;
  /** Currently rendered (low-quality) sources — kept on the type to document
   * intent and to give callers a single object to pass; not read at runtime. */
  low: SourceSet;
  high: SourceSet;
  /**
   * Delay before kicking off the high-quality preload, so the initial
   * low-quality stream wins the bandwidth race on first paint.
   */
  delayMs?: number;
};

type Result = {
  /** Once `true`, render the high-quality `<source>` set. */
  upgraded: boolean;
};

/**
 * Loads the low-quality video first (visible, autoplaying), then silently
 * preloads the HQ version in a detached element. When the HQ version is
 * fully buffered, swaps the visible video over while preserving currentTime
 * and play/mute state.
 *
 * Skipped on save-data and 2g/3g connections — the swap there would burn
 * bandwidth without any quality gain the user can perceive on a small screen.
 */
export function useProgressiveVideo({
  videoRef,
  high,
  delayMs = 1500,
}: Options): Result {
  const [upgraded, setUpgraded] = useState(false);

  useEffect(() => {
    const visible = videoRef.current;
    if (!visible) return;

    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (conn?.saveData) return;
    if (conn?.effectiveType && /^(slow-2g|2g|3g)$/.test(conn.effectiveType)) {
      return;
    }

    // Probe in a detached element so the visible player keeps its first-paint
    // priority. We pick the format the browser actually chose for the visible
    // video so we don't pay for two codecs in parallel.
    const probe = document.createElement("video");
    probe.preload = "auto";
    probe.muted = true;
    probe.playsInline = true;

    const pickHighSrc = (): string => {
      const cur = visible.currentSrc || "";
      if (cur.endsWith(".webm") && high.webm) return high.webm;
      return high.mp4;
    };

    let done = false;
    let onLoaded: (() => void) | null = null;

    const swap = () => {
      if (done) return;
      done = true;

      const t = visible.currentTime;
      const wasPaused = visible.paused;
      const wasMuted = visible.muted;

      setUpgraded(true);

      // Wait for React to mount the new <source> children, then reload.
      requestAnimationFrame(() => {
        try {
          visible.load();
        } catch {
          /* ignore */
        }
        onLoaded = () => {
          if (!onLoaded) return;
          visible.removeEventListener("loadedmetadata", onLoaded);
          onLoaded = null;
          try {
            visible.currentTime = t || 0;
          } catch {
            /* seek can fail mid-buffer; the loop will recover */
          }
          visible.muted = wasMuted;
          if (!wasPaused) visible.play().catch(() => {});
        };
        visible.addEventListener("loadedmetadata", onLoaded);
      });
    };

    probe.addEventListener("canplaythrough", swap, { once: true });

    const timer = window.setTimeout(() => {
      probe.src = pickHighSrc();
      probe.load();
    }, delayMs);

    return () => {
      window.clearTimeout(timer);
      probe.removeEventListener("canplaythrough", swap);
      if (onLoaded) {
        visible.removeEventListener("loadedmetadata", onLoaded);
        onLoaded = null;
      }
      try {
        probe.removeAttribute("src");
        probe.load();
      } catch {
        /* ignore */
      }
    };
    // The hook is intentionally fire-and-forget per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { upgraded };
}

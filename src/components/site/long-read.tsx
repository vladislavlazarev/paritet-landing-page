import Image from "next/image";
import type { ServiceBlock } from "@/lib/services";
import type { Dictionary } from "@/lib/i18n/types";
import ruDict from "@/lib/i18n/dictionaries/ru";

type Props = {
  title: string;
  eyebrow?: string;
  description?: string;
  heroImage?: string;
  body: ServiceBlock[];
  /**
   * Locale of the body content (the long-form text). Defaults to "ru".
   * The wrapper sets `lang` on the prose container so screen readers and
   * search engines flag the content correctly even when the surrounding
   * chrome is in another language.
   */
  contentLang?: "ru" | "en" | "zh";
  /** Optional notice shown above the content (e.g. translation hint). */
  notice?: string;
  /** UI dictionary; defaults to RU. */
  dict?: Dictionary;
  /** Optional meta row shown under the H1 — e.g. "29 июля 2019 · 4 мин чтения". */
  meta?: { dateText?: string; readingMinutes?: number };
};

function BlockView({ block }: { block: ServiceBlock }) {
  if (block.kind === "heading") {
    return (
      <h2 className="font-heading text-[24px] sm:text-[28px] lg:text-[32px] leading-[1.15] tracking-[-0.02em] text-brand mt-10 sm:mt-12">
        {block.text}
      </h2>
    );
  }
  if (block.kind === "paragraph") {
    return (
      <p className="text-[16px] sm:text-[17px] leading-relaxed text-ink">
        {block.text}
      </p>
    );
  }
  if (block.kind === "list") {
    return (
      <ul className="space-y-2 text-[16px] sm:text-[17px] leading-relaxed text-ink">
        {block.items.map((it, j) => (
          <li key={j} className="flex gap-3">
            <span
              aria-hidden
              className="text-accent-coral mt-2 inline-block h-1.5 w-1.5 rounded-full shrink-0"
            />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    );
  }
  return null;
}

export function LongRead({
  title,
  eyebrow,
  description,
  heroImage,
  body,
  contentLang = "ru",
  notice,
  meta,
}: Props) {
  const metaParts: string[] = [];
  if (meta?.dateText) metaParts.push(meta.dateText);
  if (meta?.readingMinutes) {
    metaParts.push(
      `${meta.readingMinutes} мин чтения`,
    );
  }
  return (
    <>
      <section
        className="relative bg-brand text-white overflow-hidden"
        style={{
          backgroundImage:
            "radial-gradient(1000px 600px at 80% 0%, rgba(120,40,200,0.55), transparent 60%), radial-gradient(800px 500px at 0% 100%, rgba(238,59,86,0.25), transparent 60%)",
        }}
      >
        <div className="container-page pt-32 sm:pt-40 lg:pt-48 pb-12 sm:pb-16 lg:pb-20">
          {eyebrow && (
            <p className="text-[12px] sm:text-[13px] tracking-[0.22em] uppercase text-white/55 mb-4">
              {eyebrow}
            </p>
          )}
          <h1
            lang={contentLang === "ru" ? undefined : contentLang}
            className="font-heading text-[32px] sm:text-[44px] md:text-[56px] lg:text-[72px] leading-[1.05] tracking-[-0.025em] text-white max-w-4xl"
          >
            {title}
          </h1>
          {metaParts.length > 0 && (
            <p className="mt-4 text-[13px] sm:text-[14px] tracking-[0.02em] text-white/60">
              {metaParts.join(" · ")}
            </p>
          )}
          {description && (
            <p
              lang={contentLang === "ru" ? undefined : contentLang}
              className="mt-7 max-w-2xl text-[15px] sm:text-[17px] leading-relaxed text-white/85"
            >
              {description}
            </p>
          )}
        </div>
      </section>

      <section className="bg-white">
        {heroImage && (
          <div className="container-page pt-10 sm:pt-14 lg:pt-16 pb-10 sm:pb-14">
            <div
              className="relative w-full overflow-hidden rounded-[20px] sm:rounded-[24px]"
              style={{ aspectRatio: "16 / 7" }}
            >
              <Image
                src={heroImage}
                alt={title}
                fill
                priority
                sizes="(min-width: 1240px) 1240px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        )}

        <div className="container-page pb-12 sm:pb-16 lg:pb-20">
          <div className="max-w-[760px] mx-auto space-y-5 sm:space-y-6">
            {notice && (
              <p className="not-prose mb-4 text-[14px] leading-relaxed text-muted-fg border-l-2 border-accent-coral/40 pl-4">
                {notice}
              </p>
            )}
            <div lang="ru" className="space-y-5 sm:space-y-6">
              {body.map((block, i) => (
                <BlockView key={i} block={block} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// keep unused import suppressed when notice/dict don't apply
void ruDict;

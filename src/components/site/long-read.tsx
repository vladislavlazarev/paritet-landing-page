import Image from "next/image";
import type { ServiceBlock } from "@/lib/services";

type Props = {
  title: string;
  eyebrow?: string;
  description?: string;
  heroImage?: string;
  body: ServiceBlock[];
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
}: Props) {
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
          <h1 className="font-heading text-[32px] sm:text-[44px] md:text-[56px] lg:text-[72px] leading-[1.05] tracking-[-0.025em] text-white max-w-4xl">
            {title}
          </h1>
          {description && (
            <p className="mt-7 max-w-2xl text-[15px] sm:text-[17px] leading-relaxed text-white/85">
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
            {body.map((block, i) => (
              <BlockView key={i} block={block} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

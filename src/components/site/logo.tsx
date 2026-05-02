import Image from "next/image";

type LogoProps = {
  variant?: "light" | "dark";
};

export function Logo({ variant = "light" }: LogoProps) {
  if (variant === "dark") {
    return (
      <a href="/" className="flex items-center gap-3">
        <span className="relative block h-12 sm:h-16 lg:h-[90px] w-12 sm:w-16 lg:w-[72px] overflow-hidden">
          <Image
            src="/logo-white.png"
            alt=""
            width={240}
            height={300}
            priority
            className="absolute inset-x-0 top-0 h-auto w-full"
            style={{ clipPath: "inset(0 0 55% 0)" }}
          />
        </span>
        <span className="flex flex-col leading-none">
          <span className="font-heading text-[20px] sm:text-[26px] lg:text-[32px] tracking-[0.02em] font-medium text-brand">
            ПАРИТЕТ
          </span>
          <span className="text-[11px] sm:text-[13px] lg:text-[15px] tracking-[0.18em] text-accent-coral mt-1">
            events
          </span>
        </span>
      </a>
    );
  }

  return (
    <a href="/" className="flex items-center">
      <Image
        src="/logo-white.png"
        alt="Паритет Events"
        width={240}
        height={300}
        priority
        className="h-12 sm:h-16 lg:h-[90px] w-auto"
      />
    </a>
  );
}

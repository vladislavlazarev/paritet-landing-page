import Image from "next/image";

export function Logo() {
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

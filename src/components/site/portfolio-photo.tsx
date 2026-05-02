const NOISE_SVG =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'><filter id='n'><feTurbulence baseFrequency='0.7' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")";

type PhotoProps = {
  gradient: string;
  glyph: string;
  aspect: string;
  hueShift?: number;
  rounded?: string;
  className?: string;
};

export function PortfolioPhoto({
  gradient,
  glyph,
  aspect,
  hueShift = 0,
  rounded = "20px",
  className = "",
}: PhotoProps) {
  return (
    <div
      className={`relative overflow-hidden ring-1 ring-hairline ${className}`}
      style={{
        background: gradient,
        aspectRatio: aspect,
        borderRadius: rounded,
        filter: hueShift ? `hue-rotate(${hueShift}deg)` : undefined,
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-overlay opacity-25"
        style={{ backgroundImage: NOISE_SVG }}
      />
      <span className="absolute inset-0 grid place-items-center text-white leading-none drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
        style={{ fontSize: "clamp(64px, 14vw, 180px)" }}
      >
        {glyph}
      </span>
    </div>
  );
}

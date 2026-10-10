import { brand } from "@/config/site";

/**
 * Fairward wordmark. Renders the uploaded SVG logo when `brand.logo.src` is
 * configured; otherwise a typographic placeholder: "fairward."
 */
export function Wordmark({
  tone = "dark",
  href = "/",
  className,
}: {
  tone?: "dark" | "light";
  href?: string | null;
  className?: string;
}) {
  const src = tone === "light" ? (brand.logo.srcOnDark ?? brand.logo.src) : brand.logo.src;
  const classes = ["wordmark", tone === "light" && "wordmark--light", className]
    .filter(Boolean)
    .join(" ");

  const content = src ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={brand.name} width={brand.logo.width} height={brand.logo.height} />
  ) : (
    <>
      <span aria-hidden="true">{brand.wordmark}</span>
      <span aria-hidden="true" className="wordmark__dot">
        .
      </span>
      <span className="sr-only">{brand.name}</span>
    </>
  );

  if (!href) return <span className={classes}>{content}</span>;
  return (
    <a href={href} className={classes} aria-label={`${brand.name} home`}>
      {content}
    </a>
  );
}

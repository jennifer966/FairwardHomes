import Image from "next/image";
import { useId } from "react";

type Variant = "dusk" | "interior";

/**
 * Architectural image slot. Renders the configured photograph when supplied,
 * otherwise an illustrated placeholder of contemporary California
 * architecture (clearly captioned as a placeholder when `caption` is on).
 */
export function ArchImage({
  src,
  alt,
  variant = "dusk",
  caption = false,
  priority = false,
  sizes = "(min-width: 1000px) 50vw, 100vw",
}: {
  src?: string | null;
  alt: string;
  variant?: Variant;
  caption?: boolean;
  priority?: boolean;
  sizes?: string;
}) {
  if (src) {
    return (
      <div className="arch">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} style={{ objectFit: "cover" }} />
      </div>
    );
  }
  return (
    <div className="arch">
      {variant === "dusk" ? <Dusk label={alt} /> : <Interior label={alt} />}
      {caption && <span className="arch__caption">Placeholder illustration · photography to come</span>}
    </div>
  );
}

function Dusk({ label }: { label: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" role="img" aria-label={label}>
      <defs>
        <linearGradient id={`${id}sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c9d3d4" />
          <stop offset="0.55" stopColor="#ecdccb" />
          <stop offset="1" stopColor="#f3e3cf" />
        </linearGradient>
        <linearGradient id={`${id}glow`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6d5a8" />
          <stop offset="1" stopColor="#e2a873" />
        </linearGradient>
        <linearGradient id={`${id}wall`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#efe9df" />
          <stop offset="1" stopColor="#e2d9cb" />
        </linearGradient>
        <linearGradient id={`${id}wood`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#a8795a" />
          <stop offset="1" stopColor="#8d6247" />
        </linearGradient>
        <linearGradient id={`${id}ground`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b9c9bc" />
          <stop offset="1" stopColor="#9fb3a4" />
        </linearGradient>
        <linearGradient id={`${id}pool`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9fb7bf" />
          <stop offset="1" stopColor="#7d9aa6" />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill={`url(#${id}sky)`} />
      <circle cx="640" cy="170" r="70" fill="#f7e7d1" opacity="0.7" />
      {/* distant hills */}
      <path d="M0 360 C120 330 220 345 330 335 C460 322 560 300 800 330 L800 420 L0 420Z" fill="#c4cfc5" opacity="0.7" />
      {/* ground */}
      <rect y="410" width="800" height="190" fill={`url(#${id}ground)`} />
      {/* lower volume */}
      <rect x="120" y="300" width="520" height="130" fill={`url(#${id}wall)`} />
      <rect x="170" y="318" width="300" height="112" fill={`url(#${id}glow)`} />
      {[230, 290, 350, 410].map((x) => (
        <rect key={x} x={x} y="318" width="2.5" height="112" fill="#6b5446" opacity="0.55" />
      ))}
      <rect x="170" y="318" width="300" height="3" fill="#6b5446" opacity="0.4" />
      {/* interior hints */}
      <rect x="250" y="388" width="70" height="20" rx="3" fill="#c98f61" opacity="0.6" />
      <rect x="380" y="360" width="4" height="48" fill="#8b6a52" opacity="0.5" />
      <circle cx="382" cy="356" r="12" fill="#f9e3c3" opacity="0.9" />
      {/* wood clad side */}
      <rect x="500" y="318" width="120" height="112" fill={`url(#${id}wood)`} />
      {Array.from({ length: 14 }, (_, i) => (
        <rect key={i} x={504 + i * 8.4} y="318" width="1.2" height="112" fill="#6f4c37" opacity="0.45" />
      ))}
      {/* upper cantilevered volume */}
      <rect x="260" y="212" width="440" height="90" fill="#223a4e" />
      <rect x="300" y="228" width="250" height="58" fill={`url(#${id}glow)`} opacity="0.92" />
      {[350, 400, 450, 500].map((x) => (
        <rect key={x} x={x} y="228" width="2" height="58" fill="#223a4e" opacity="0.7" />
      ))}
      <rect x="250" y="204" width="460" height="10" fill="#1a2e3f" />
      <rect x="110" y="294" width="160" height="8" fill="#1a2e3f" />
      {/* low wall + planting */}
      <rect x="60" y="430" width="300" height="22" fill="#e7dfd2" />
      <rect x="60" y="452" width="300" height="4" fill="#cdbfa9" />
      {/* pool */}
      <rect x="400" y="448" width="320" height="34" fill={`url(#${id}pool)`} />
      <rect x="430" y="458" width="200" height="3" fill="#f3d3a8" opacity="0.55" />
      <rect x="470" y="468" width="120" height="2" fill="#f3d3a8" opacity="0.4" />
      {/* olive tree */}
      <path d="M86 430 C90 390 84 360 96 330" stroke="#5b5048" strokeWidth="5" fill="none" />
      <path d="M94 360 C106 350 116 346 128 340" stroke="#5b5048" strokeWidth="3" fill="none" />
      <g fill="#7f9584" opacity="0.92">
        <ellipse cx="80" cy="300" rx="48" ry="30" />
        <ellipse cx="124" cy="318" rx="40" ry="24" />
        <ellipse cx="60" cy="330" rx="30" ry="18" />
        <ellipse cx="104" cy="282" rx="34" ry="22" />
      </g>
      <g fill="#93a898" opacity="0.8">
        <ellipse cx="96" cy="296" rx="26" ry="14" />
        <ellipse cx="136" cy="308" rx="18" ry="10" />
      </g>
      {/* grasses */}
      <g stroke="#83998a" strokeWidth="2" strokeLinecap="round">
        {Array.from({ length: 16 }, (_, i) => (
          <path key={i} d={`M${370 + i * 2} 448 q ${(i % 3) - 1} -14 ${(i % 5) - 2} -24`} fill="none" />
        ))}
        {Array.from({ length: 12 }, (_, i) => (
          <path key={`b${i}`} d={`M${730 + i * 3} 450 q ${(i % 3) - 1} -12 ${(i % 4) - 1} -22`} fill="none" />
        ))}
      </g>
      <rect y="482" width="800" height="118" fill="#a9bcad" opacity="0.5" />
    </svg>
  );
}

function Interior({ label }: { label: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 800 700" preserveAspectRatio="xMidYMid slice" role="img" aria-label={label}>
      <defs>
        <linearGradient id={`${id}wall`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f4efe6" />
          <stop offset="1" stopColor="#e6dccd" />
        </linearGradient>
        <linearGradient id={`${id}view`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d6dfd8" />
          <stop offset="0.6" stopColor="#c3d1c5" />
          <stop offset="1" stopColor="#a8bcab" />
        </linearGradient>
        <linearGradient id={`${id}floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c7a98d" />
          <stop offset="1" stopColor="#b08d6f" />
        </linearGradient>
        <linearGradient id={`${id}light`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff6e6" stopOpacity="0.75" />
          <stop offset="1" stopColor="#fff6e6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="800" height="700" fill={`url(#${id}wall)`} />
      {/* floor-to-ceiling glazing */}
      <rect x="300" y="60" width="460" height="440" fill={`url(#${id}view)`} />
      <g fill="#8fa594" opacity="0.8">
        <ellipse cx="420" cy="330" rx="90" ry="60" />
        <ellipse cx="640" cy="300" rx="110" ry="80" />
        <ellipse cx="540" cy="360" rx="70" ry="40" />
      </g>
      {[415, 530, 645].map((x) => (
        <rect key={x} x={x} y="60" width="5" height="440" fill="#3b4a55" />
      ))}
      <rect x="296" y="56" width="468" height="8" fill="#3b4a55" />
      <rect x="296" y="496" width="468" height="6" fill="#3b4a55" />
      {/* light wash */}
      <path d="M300 500 L760 500 L560 700 L60 700Z" fill={`url(#${id}light)`} />
      {/* floor */}
      <rect y="500" width="800" height="200" fill={`url(#${id}floor)`} />
      <path d="M300 500 L760 500 L640 700 L120 700Z" fill="#fff4e2" opacity="0.28" />
      {/* sofa */}
      <rect x="120" y="440" width="300" height="80" rx="14" fill="#e9e1d4" />
      <rect x="120" y="420" width="300" height="46" rx="14" fill="#f3ede3" />
      <rect x="132" y="520" width="8" height="18" fill="#6b5446" />
      <rect x="400" y="520" width="8" height="18" fill="#6b5446" />
      <rect x="160" y="430" width="56" height="34" rx="8" fill="#b9c9bc" />
      <rect x="226" y="432" width="50" height="32" rx="8" fill="#d4a88a" />
      {/* coffee table */}
      <ellipse cx="350" cy="590" rx="110" ry="20" fill="#7d5a42" />
      <rect x="342" y="590" width="16" height="30" fill="#6b4a35" />
      <ellipse cx="320" cy="580" rx="18" ry="6" fill="#ece5d9" />
      {/* pendant */}
      <rect x="219" y="0" width="2" height="190" fill="#3b4a55" />
      <path d="M190 190 h60 l-10 28 h-40 z" fill="#223a4e" />
      <ellipse cx="220" cy="220" rx="18" ry="4" fill="#f7deb4" />
      {/* plant */}
      <rect x="40" y="420" width="56" height="70" rx="6" fill="#d9cdbc" />
      <g fill="#7f9584">
        <ellipse cx="68" cy="390" rx="26" ry="42" />
        <ellipse cx="44" cy="370" rx="16" ry="34" transform="rotate(-20 44 370)" />
        <ellipse cx="94" cy="372" rx="16" ry="34" transform="rotate(20 94 372)" />
      </g>
      {/* artwork */}
      <rect x="110" y="200" width="140" height="160" fill="#f9f6f0" stroke="#d8cdbd" />
      <rect x="128" y="220" width="104" height="120" fill="#b18162" opacity="0.35" />
      <circle cx="180" cy="270" r="26" fill="#223a4e" opacity="0.5" />
    </svg>
  );
}

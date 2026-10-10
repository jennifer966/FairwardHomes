type P = { size?: number; className?: string };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
});

export const ArrowRight = ({ size = 18, className }: P) => (
  <svg {...base(size)} className={["arrow", className].filter(Boolean).join(" ")}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const Check = ({ size = 16, className }: P) => (
  <svg {...base(size)} strokeWidth={2} className={className}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const Info = ({ size = 18, className }: P) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 8h.01" />
  </svg>
);

export const Shield = ({ size = 18, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const Person = ({ size = 18, className }: P) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" />
  </svg>
);

export const Layers = ({ size = 20, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="m12 3 9 5-9 5-9-5 9-5Z" />
    <path d="m3 13 9 5 9-5" />
  </svg>
);

export const Scale = ({ size = 20, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M12 4v16M7 20h10M5 8h14" />
    <path d="m5 8-2.5 6a3 3 0 0 0 5 0L5 8ZM19 8l-2.5 6a3 3 0 0 0 5 0L19 8Z" />
  </svg>
);

export const Sparkle = ({ size = 16, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M12 4v4M12 16v4M4 12h4M16 12h4" />
  </svg>
);

export const Send = ({ size = 16, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/** Equal Housing Opportunity mark (simplified, for placement in the compliance block). */
export const EqualHousing = ({ size = 40, className }: P) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    className={className}
    role="img"
    aria-label="Equal Housing Opportunity"
  >
    <path d="M4 18 20 6l16 12" />
    <path d="M8 16v18h24V16" />
    <path d="M14 21h12M14 27h12" />
  </svg>
);

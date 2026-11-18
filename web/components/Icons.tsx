import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement>;
const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', viewBox: '0 0 24 24', 'aria-hidden': true } as const;

export const GoogleG = (p: P) => (
  <svg viewBox="0 0 48 48" aria-hidden="true" {...p}>
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
    <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
  </svg>
);

export const WhatsApp = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.56.93.95-3.47-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.43-9.43a9.37 9.37 0 0 1 6.67 2.77 9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.23 9.43-9.44 9.43zm8.03-17.46A11.27 11.27 0 0 0 12.05.72C5.8.72.7 5.8.7 12.07c0 2 .52 3.95 1.52 5.67L.6 23.62l6.02-1.58a11.32 11.32 0 0 0 5.42 1.38h.01c6.25 0 11.34-5.09 11.34-11.35 0-3.03-1.18-5.88-3.32-8.03z" />
  </svg>
);

export const YouTube = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
  </svg>
);

export const Star = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12 2.6l2.86 6.02 6.62.77-4.9 4.5 1.3 6.53L12 17.1l-5.88 3.32 1.3-6.53-4.9-4.5 6.62-.77z" />
  </svg>
);

// ---- custom service glyphs (Lucide-matched: 24px, 1.5 stroke) ----
export const Glyph = ({ name, ...p }: P & { name: string }) => {
  switch (name) {
    case 'droplet':
      return (
        <svg {...base} {...p}>
          <path d="M3 19h18" />
          <path d="M12 3.5s-4.5 5-4.5 8.2a4.5 4.5 0 0 0 9 0C16.5 8.5 12 3.5 12 3.5z" />
          <path d="M10.2 12.6a1.9 1.9 0 0 0 1.8 1.6" />
        </svg>
      );
    case 'shield':
      return (
        <svg {...base} {...p}>
          <path d="M12 3l7.5 3v5.4c0 4.5-3.2 8-7.5 9.6-4.3-1.6-7.5-5.1-7.5-9.6V6z" />
          <path d="M8 12.5l7.5-3" />
          <path d="M8 15.5l7.5-3" />
        </svg>
      );
    case 'sparkle':
      return (
        <svg {...base} {...p}>
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
          <path d="M12 8.5l1.2 2.3 2.3 1.2-2.3 1.2L12 15.5l-1.2-2.3L8.5 12l2.3-1.2z" />
        </svg>
      );
    case 'roll':
      return (
        <svg {...base} {...p}>
          <ellipse cx="6.5" cy="12" rx="3" ry="7" />
          <path d="M6.5 5H17c1.7 0 3 3.1 3 7s-1.3 7-3 7H6.5" />
          <path d="M9.5 12H20" />
        </svg>
      );
    case 'sun':
      return (
        <svg {...base} {...p}>
          <circle cx="8" cy="8" r="3" />
          <path d="M8 2v1.5M2 8h1.5M3.8 3.8l1 1M12.2 3.8l-1 1" />
          <path d="M5 21l6-10h9.5L19 21z" />
        </svg>
      );
    case 'speaker':
      return (
        <svg {...base} {...p}>
          <rect x="5" y="2.5" width="14" height="19" rx="2.5" />
          <circle cx="12" cy="14.5" r="3.6" />
          <circle cx="12" cy="7" r="1.4" />
        </svg>
      );
    case 'seat':
      return (
        <svg {...base} {...p}>
          <path d="M8 3.5h5a2 2 0 0 1 2 2.3l-1.3 8.2H7.6L6.5 5.8A2 2 0 0 1 8 3.5z" />
          <path d="M6.5 14h11a2 2 0 0 1 2 2v1.5H5.5V15a1 1 0 0 1 1-1z" />
          <path d="M8 17.5V21M17 17.5V21" />
        </svg>
      );
    case 'lamp':
      return (
        <svg {...base} {...p}>
          <path d="M10 6c-3.6 0-6 2.7-6 6s2.4 6 6 6h2V6z" />
          <path d="M15 8l5-1.5M15 12h5.5M15 16l5 1.5" />
        </svg>
      );
    case 'wheel':
      return (
        <svg {...base} {...p}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="2" />
          <path d="M12 3v7M12 14v7M3.5 9.2l6.6 2.1M13.9 12.7l6.6 2.1M6.7 19.3l4.1-5.6M13.2 10.3l4.1-5.6" />
        </svg>
      );
    case 'sponge':
      return (
        <svg {...base} {...p}>
          <rect x="3.5" y="10" width="17" height="10" rx="2.5" />
          <path d="M7 14h.01M11 16h.01M15 14h.01M17 17h.01" />
          <path d="M8 3.5l.7 1.6 1.6.7-1.6.7L8 8.1l-.7-1.6-1.6-.7 1.6-.7zM16.5 3l.5 1.1 1.1.5-1.1.5-.5 1.1-.5-1.1-1.1-.5 1.1-.5z" />
        </svg>
      );
    case 'plug':
      return (
        <svg {...base} {...p}>
          <path d="M9 3v4M15 3v4" />
          <path d="M6.5 7h11v3.5a5.5 5.5 0 0 1-11 0z" />
          <path d="M12 16v5" />
        </svg>
      );
    case 'oil':
      return (
        <svg {...base} {...p}>
          <path d="M4 10h10l3-3 3.5 1.2-4 4.8v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
          <path d="M7 10V7.5h4V10" />
          <path d="M20.5 15.5s-1 1.3-1 2a1 1 0 0 0 2 0c0-.7-1-2-1-2z" />
        </svg>
      );
    default:
      return (
        <svg {...base} {...p}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
  }
};

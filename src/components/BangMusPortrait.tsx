import { useId } from 'react';

// Display a window of the supplied reference sheet without altering the original artwork.
export function BangMusPortrait({ className = '', full = false, decorative = false }: {
  className?: string; full?: boolean; decorative?: boolean;
}) {
  const clip = useId();
  return <svg
    className={`bang-mus-portrait ${className}`}
    viewBox={full ? '280 140 248 408' : '35 254 265 307'}
    role={decorative ? undefined : 'img'}
    aria-label={decorative ? undefined : 'Bang Mus, maskot Dimsum Hallo Dek'}
    aria-hidden={decorative || undefined}
    focusable="false"
  >
    <defs><clipPath id={clip}><rect x={full ? 280 : 35} y={full ? 140 : 254} width={full ? 248 : 265} height={full ? 408 : 307} /></clipPath></defs>
    <image clipPath={`url(#${clip})`} href={`/assets/bang-mus/${full ? 'reference' : 'expressions'}.webp`} width="1536" height="1024" />
  </svg>;
}

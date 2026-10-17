import { useId } from 'react';

const poses = {
  welcome: [566, 850],
  pointing: [410, 615],
  idea: [450, 675],
  shopping: [450, 675],
  explore: [450, 675],
  planning: [480, 600],
} as const;

// Full poses retain the client's transparent artwork; portraits use the expression sheet.
export function BangMusPortrait({ className = '', full = false, decorative = false, pose = 'welcome' }: {
  className?: string; full?: boolean; decorative?: boolean; pose?: keyof typeof poses;
}) {
  const clip = useId();
  if (full) return <img
    className={`bang-mus-portrait ${className}`}
    src={`/assets/client/bang-mus-${pose}.webp`}
    width={poses[pose][0]}
    height={poses[pose][1]}
    alt={decorative ? '' : 'Bang Musmid, maskot Dimsum Hallo Dek'}
    loading="lazy"
    decoding="async"
  />;
  return <svg
    className={`bang-mus-portrait ${className}`}
    viewBox="35 254 265 307"
    role={decorative ? undefined : 'img'}
    aria-label={decorative ? undefined : 'Bang Musmid, maskot Dimsum Hallo Dek'}
    aria-hidden={decorative || undefined}
    focusable="false"
  >
    <defs><clipPath id={clip}><rect x={35} y={254} width={265} height={307} /></clipPath></defs>
    <image clipPath={`url(#${clip})`} href="/assets/bang-mus/expressions.webp" width="1536" height="1024" />
  </svg>;
}

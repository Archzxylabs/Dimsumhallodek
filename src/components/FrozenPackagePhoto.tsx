export function FrozenPackagePhoto({ variant }: { variant: '15g' | '28g' }) {
  return <div className={`frozen-package-photo frozen-package-photo-${variant}`}>
    <img
      src="/assets/client/frozen-catalog.webp"
      width={720}
      height={1280}
      alt={`Kemasan asli Dimsum Frozen ${variant === '15g' ? '15 gram' : 'reguler 28 gram'}`}
      loading="lazy"
      decoding="async"
    />
  </div>;
}

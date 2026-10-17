import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Plus } from 'lucide-react';
import catalog from '../../data/catalog.json';
import { BangMusPortrait } from './BangMusPortrait';
import { CatalogModal, type CatalogKind } from './CatalogModal';
import { Headline, StaggerCard } from './MotionElements';

const flavors = [
  { id: 'mentai', name: 'Mentai', description: 'Creamy, gurih, jadi favorit.', portions: [3, 6] },
  { id: 'tartar', name: 'Tartar', description: 'Lembut dengan rasa yang segar.', portions: [3, 6] },
  { id: 'carbonara', name: 'Carbonara', description: 'Cheesy dan creamy dalam satu gigitan.', portions: [3, 6] },
  { id: 'hot-lava', name: 'Hot Lava', description: 'Buat yang suka sentuhan pedas.', portions: [3, 6] },
  { id: 'mix', name: 'Mix Sauces', description: 'Beberapa rasa, satu pilihan.', portions: [3, 6] },
  { id: 'original', name: 'Original Kukus', description: 'Rasa klasik tanpa tambahan saus.', portions: [4] },
];
const rupiah = (price: number) => `Rp${price.toLocaleString('id-ID')}`;

export function FlavorCollection() {
  const [glide, setGlide] = useState(() => typeof window !== 'undefined' && !matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [activeCatalog, setActiveCatalog] = useState<CatalogKind | null>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const railRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const travelRef = useRef(0);

  useEffect(() => {
    const query = matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setGlide(!query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  // Scroll-pinned glide: vertical scroll inside the rail drives the horizontal
  // position of the track 1:1, so pan runs out exactly when the rail ends and
  // normal page scroll takes over to the next section.
  useEffect(() => {
    if (!glide) return;
    const rail = railRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!rail || !viewport || !track) return;
    let frame = 0;

    const paint = () => {
      const rail = railRef.current;
      const track = trackRef.current;
      if (!rail || !track) return;
      const y = Math.min(Math.max(-rail.getBoundingClientRect().top, 0), travelRef.current);
      track.style.transform = `translate3d(${-y}px, 0, 0)`;
      if (fillRef.current) fillRef.current.style.transform = `scaleX(${travelRef.current ? y / travelRef.current : 0})`;
      const nextEdge = { start: y <= 1, end: y >= travelRef.current - 1 };
      setEdge(previous => previous.start === nextEdge.start && previous.end === nextEdge.end ? previous : nextEdge);
    };
    const measure = () => {
      const rail = railRef.current;
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!rail || !viewport || !track) return;
      cancelAnimationFrame(frame);
      travelRef.current = Math.max(0, Math.round(track.scrollWidth - track.clientWidth));
      rail.style.height = `${Math.max(window.innerHeight, viewport.offsetHeight) + travelRef.current}px`;
      frame = requestAnimationFrame(paint);
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(paint);
    };
    const onScroll = () => schedule();
    const onToggle = () => measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    track.addEventListener('toggle', onToggle, true);
    document.fonts?.ready.then(measure, () => {});
    measure();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      track.removeEventListener('toggle', onToggle, true);
      cancelAnimationFrame(frame);
    };
  }, [glide]);

  const browse = (direction: number) => {
    const track = trackRef.current;
    const rail = railRef.current;
    if (!track || !rail) return;
    if (!glide) {
      track.scrollBy({ left: direction * track.clientWidth, behavior: 'smooth' });
      return;
    }
    const rect = rail.getBoundingClientRect();
    const y = Math.min(Math.max(-rect.top, 0), travelRef.current);
    const next = Math.min(Math.max(y + direction * track.clientWidth, 0), travelRef.current);
    window.scrollTo({ top: window.scrollY + rect.top + next, behavior: 'smooth' });
  };

  const widthClass = glide ? ' page-width' : '';
  const trackKeyEvents = (event: React.KeyboardEvent) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    if (!glide) { event.stopPropagation(); return; }
    event.preventDefault();
    event.stopPropagation();
    browse(event.key === 'ArrowLeft' ? -1 : 1);
  };

  const content = <>
    <div className={`collection-heading${widthClass}`}>
      <div><p className="eyebrow">01 / Temukan rasa kamu</p><Headline id="flavors-title" className="editorial-heading" lines={[{ text: 'Beda saus.' }, { text: 'Sama-sama nagih.', accent: 'orange' }]} /></div>
      <aside className="mascot-guide" aria-label="Tips dari Bang Musmid">
        <div><span>Bang Musmid bantu pilih</span><p>Tim creamy atau pedas? Kenalan sama rasanya, lalu pilih isi yang pas buat kamu.</p></div>
        <BangMusPortrait full decorative pose="idea" />
      </aside>
    </div>
    <div className={`flavor-browse${widthClass}`}><span>{glide ? '6 rasa untuk ditemukan · gulir ke bawah untuk menjelajah' : '6 rasa untuk ditemukan · geser untuk lihat lainnya'}</span><span className="flavor-progress" aria-hidden="true"><span ref={fillRef} /></span><div><button type="button" onClick={() => browse(-1)} disabled={edge.start} aria-label="Pilihan rasa sebelumnya"><ArrowLeft size={18} /></button><button type="button" onClick={() => browse(1)} disabled={edge.end} aria-label="Pilihan rasa berikutnya"><ArrowRight size={18} /></button></div></div>
    <div className={`flavor-grid${widthClass}`} ref={trackRef} onScroll={glide ? undefined : () => {
      const gallery = trackRef.current;
      if (gallery) setEdge({ start: gallery.scrollLeft < 2, end: gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth - 2 });
    }} role="region" aria-label="Galeri pilihan rasa dimsum" tabIndex={0} onKeyDown={trackKeyEvents}>
      {flavors.map((flavor, index) => {
        const options = catalog.filter(product => product.id.startsWith(`${flavor.id}-`));
        const first = options[0];
        return <StaggerCard className="flavor-card" key={flavor.id} index={index}>
          <figure className="flavor-photo">
            <img src={`/assets/client/${flavor.id}-16.webp`} alt={`Dimsum ${flavor.name}, contoh sajian 16 pcs`} width={800} height={640} loading="lazy" decoding="async" />
            <figcaption>Contoh sajian · 16 pcs</figcaption>
          </figure>
          <div className="flavor-content">
            <div className="flavor-title"><h3>{flavor.name}</h3><span>{rupiah(first.price)}<small>mulai {first.id.split('-').pop()} pcs</small></span></div>
            <p>{flavor.description}</p>
            <details className="flavor-options">
              <summary>Pilihan isi & harga <Plus size={16} /></summary>
              <ul>{options.map(option => <li key={option.id}><span>{option.id.split('-').pop()} pcs</span><strong>{rupiah(option.price)}</strong></li>)}</ul>
              <div className="portion-photos">{flavor.portions.map(portion => <figure key={portion}><img src={`/assets/client/${flavor.id}-${portion}.webp`} width={800} height={640} alt={`Contoh dimsum ${flavor.name} isi ${portion} pcs`} loading="lazy" decoding="async" /><figcaption>Foto {portion} pcs</figcaption></figure>)}</div>
            </details>
          </div>
        </StaggerCard>;
      })}
    </div>
    <div className={`collection-footnote${widthClass}`}><p>Harga acuan katalog. Pilihan isi, harga transaksi, dan ketersediaan dikonfirmasi gerai.</p><button type="button" onClick={() => setActiveCatalog('menu')}>Buka katalog menu</button></div>
  </>;

  return <section id="pilihan-rasa" className={glide ? 'flavor-glide flavor-collection section-space' : 'flavor-collection page-width section-space'} aria-labelledby="flavors-title">
    {glide ? <div className="flavor-rail" ref={railRef}><div className="flavor-viewport" ref={viewportRef}>{content}</div></div> : content}
    {activeCatalog && <CatalogModal kind={activeCatalog} onClose={() => setActiveCatalog(null)} />}
  </section>;
}

import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Plus } from 'lucide-react';
import catalog from '../../data/catalog.json';
import { BangMusPortrait } from './BangMusPortrait';

const flavors = [
  { id: 'mentai', name: 'Mentai', description: 'Creamy, gurih, jadi favorit.', portions: [3, 6] },
  { id: 'tartar', name: 'Tartar', description: 'Lembut dengan rasa yang segar.', portions: [3, 6] },
  { id: 'carbonara', name: 'Carbonara', description: 'Cheesy dan creamy dalam satu gigitan.', portions: [3, 6] },
  { id: 'hot-lava', name: 'Hot Lava', description: 'Buat yang suka sentuhan pedas.', portions: [3, 6] },
  { id: 'mix', name: 'Mix Sauces', description: 'Beberapa rasa, satu pilihan.', portions: [3, 6] },
  { id: 'original', name: 'Original Kukus', description: 'Rasa klasik tanpa tambahan saus.', portions: [6] },
];
const rupiah = (price: number) => `Rp${price.toLocaleString('id-ID')}`;

export function FlavorCollection() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const updateEdges = () => {
    const gallery = galleryRef.current;
    if (gallery) setEdge({ start: gallery.scrollLeft < 2, end: gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth - 2 });
  };
  const browse = (direction: number) => {
    const gallery = galleryRef.current;
    if (gallery) gallery.scrollBy({ left: direction * gallery.clientWidth, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };
  return <section id="pilihan-rasa" className="flavor-collection page-width section-space" aria-labelledby="flavors-title">
    <div className="collection-heading">
      <div><p className="eyebrow">01 / Temukan rasa kamu</p><h2 id="flavors-title" className="editorial-heading">Beda saus.<br /><span className="text-orange">Sama-sama nagih.</span></h2></div>
      <aside className="mascot-guide" aria-label="Tips dari Bang Mus">
        <div><span>Bang Mus bantu pilih</span><p>Tim creamy atau pedas? Kenalan sama rasanya, lalu pilih isi yang pas buat kamu.</p></div>
        <BangMusPortrait full decorative pose="idea" />
      </aside>
    </div>
    <div className="flavor-browse"><span>6 rasa untuk ditemukan · geser untuk lihat lainnya</span><div><button type="button" onClick={() => browse(-1)} disabled={edge.start} aria-label="Pilihan rasa sebelumnya"><ArrowLeft size={18} /></button><button type="button" onClick={() => browse(1)} disabled={edge.end} aria-label="Pilihan rasa berikutnya"><ArrowRight size={18} /></button></div></div>
    <div className="flavor-grid" ref={galleryRef} onScroll={updateEdges} role="region" aria-label="Galeri pilihan rasa dimsum" tabIndex={0} onKeyDown={event => { if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') event.stopPropagation(); }}>
      {flavors.map(flavor => {
        const options = catalog.filter(product => product.id.startsWith(`${flavor.id}-`));
        const first = options[0];
        return <article className="flavor-card" key={flavor.id}>
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
              {flavor.id === 'original' && <p>Harga katalog Original untuk 4 pcs. Foto menunjukkan contoh isi 6 dan 16 pcs; harga pilihan isi lain dikonfirmasi tim.</p>}
            </details>
          </div>
        </article>;
      })}
    </div>
    <div className="collection-footnote"><p>Harga acuan katalog. Pilihan isi, harga transaksi, dan ketersediaan dikonfirmasi gerai.</p><a href="/assets/client/menu.webp" target="_blank" rel="noopener noreferrer">Buka katalog menu ↗</a></div>
  </section>;
}

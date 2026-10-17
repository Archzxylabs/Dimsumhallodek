import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Check, X } from 'lucide-react';
import { whatsappUrl } from '../lib/business';

export type CatalogKind = 'menu' | 'wedding' | 'birthday' | 'cake' | 'frozen' | 'kemitraan';

const rupiah = (price: number) => `Rp${price.toLocaleString('id-ID')}`;

interface Tier {
  tier: string;
  price: number;
  highlights: string[];
}

interface PriceRow {
  portion: string;
  price: number;
}

interface MenuEntry {
  name: string;
  badge?: string;
  description: string;
  rows: PriceRow[];
}

interface CakeEntry {
  name: string;
  includes: string[];
  price: number;
}

const PACKAGE_SUBTITLE = 'Dimsum Mentai & Original';

const PACKAGE_SHEETS: Record<'wedding' | 'birthday', { tierNote: string; packages: Tier[] }> = {
  wedding: {
    tierNote: 'Cileungsi & sekitarnya; di luar rute dihitung bareng tim.',
    packages: [
      { tier: 'Paket Ekonomis', price: 1_550_000, highlights: ['Dimsum 500 pcs', 'Free saus mentai 1.600 ml', 'Free Saus Original 500 ml', 'Kukusan & kompor 1 set', '250 set piring kecil + garpu (free)', '2 orang tim Dimsum Hallo Dek', 'Free ongkir Cileungsi & sekitarnya'] },
      { tier: 'Paket Standar', price: 2_100_000, highlights: ['Dimsum 700 pcs', 'Free saus mentai 2.000 ml', 'Free Saus Original 1.000 ml', 'Kukusan & kompor 1 set', '350 set piring kecil + garpu (free)', '2 orang tim Dimsum Hallo Dek', 'Free ongkir Cileungsi & sekitarnya'] },
      { tier: 'Paket Premium', price: 2_850_000, highlights: ['Dimsum 1.000 pcs', 'Free saus mentai 5.000 ml', 'Free Saus Original 2.000 ml', 'Kukusan & kompor 1 set', '500 set piring kecil + garpu (free)', '2 orang tim Dimsum Hallo Dek', 'Free ongkir Cileungsi & sekitarnya'] },
    ],
  },
  birthday: {
    tierNote: 'Paket besar dapat berisian sesuai selera — bahas bareng tim.',
    packages: [
      { tier: 'Paket Ekonomis', price: 310_000, highlights: ['Dimsum 100 pcs', 'Free saus mentai 500 ml', 'Free Saus Original 500 ml', 'Free 50 set piring kecil + garpu'] },
      { tier: 'Paket Standar', price: 600_000, highlights: ['Dimsum 200 pcs', 'Free saus mentai 800 ml', 'Free Saus Original 500 ml', 'Free 100 set piring kecil + garpu', 'Kukusan + 1 set kompor', '2 orang tim Dimsum Hallo Dek', 'Free ongkir Cileungsi & sekitarnya'] },
      { tier: 'Paket Premium', price: 870_000, highlights: ['Dimsum 300 pcs', 'Free saus mentai 800 ml', 'Free Saus Original 500 ml', 'Free 150 set piring kecil + garpu', 'Kukusan & kompor 1 set', '2 orang tim Dimsum Hallo Dek', 'Free ongkir Cileungsi & sekitarnya'] },
    ],
  },
};

const MENU_BROCHURE: MenuEntry[] = [
  { name: 'Mentai', badge: 'Best Seller', description: 'Dimsum ayam disajikan dengan saus mentai creamy dan gurih + taburan nori.', rows: [{ portion: '3 pcs', price: 10_000 }, { portion: '6 pcs', price: 20_000 }, { portion: '16 pcs', price: 50_000 }] },
  { name: 'Tartar', badge: 'Best Seller', description: 'Dimsum ayam disajikan dengan saus tartar gurih, creamy, dan segar + taburan nori.', rows: [{ portion: '3 pcs', price: 10_000 }, { portion: '6 pcs', price: 20_000 }, { portion: '16 pcs', price: 50_000 }] },
  { name: 'Hot Lava', description: 'Dimsum ayam disajikan dengan saus hot lava pedas + saus mentai creamy, gurih, dan lezat + taburan nori.', rows: [{ portion: '3 pcs', price: 15_000 }, { portion: '6 pcs', price: 25_000 }, { portion: '16 pcs', price: 70_000 }] },
  { name: 'Carbonara', badge: 'Baru!', description: 'Dimsum ayam disajikan dengan saus carbonara cheesy, creamy, dan gurih + taburan nori.', rows: [{ portion: '3 pcs', price: 15_000 }, { portion: '6 pcs', price: 25_000 }, { portion: '16 pcs', price: 70_000 }] },
  { name: 'Original (kukus)', description: 'Dimsum ayam juicy nikmat + saus original khas sajian dimsum kukus.', rows: [{ portion: '4 pcs', price: 10_000 }] },
  { name: 'Mix Sauces', description: 'Mix saus tartar/mentai + carbonara + hot lava; kombinasi rasa gurih, cheesy, creamy, segar, dan pedas yang lezat.', rows: [{ portion: '3 pcs', price: 15_000 }, { portion: '6 pcs', price: 25_000 }, { portion: '16 pcs', price: 60_000 }] },
  { name: 'Big Melt', badge: 'Baru!', description: 'Isian mozzarella lumer — lebih besar, lebih juicy, lebih yummy; free pilih saus (mentai, tartar, carbonara, atau hot lava).', rows: [{ portion: '6 pcs', price: 35_000 }, { portion: '12 pcs', price: 70_000 }] },
];

const CAKE_ADDONS: Array<{ name: string; price: number; note?: string }> = [
  { name: 'Kardus', price: 5_000 },
  { name: 'Papan cake', price: 5_000 },
  { name: 'Lilin', price: 1_000 },
  { name: 'Topper', price: 5_000 },
  { name: 'Keju', price: 10_000 },
  { name: 'Saus', price: 10_000, note: 'khusus Carbonara/Hot Lava' },
];

const CAKE_BROCHURE: CakeEntry[] = [
  { name: 'Small Size (S)', includes: ['18 pcs dimsum mentai', 'Topper Happy Birthday', 'Chili oil'], price: 75_000 },
  { name: 'Medium Size (M)', includes: ['22 pcs dimsum mentai', 'Topper Happy Birthday', 'Chili oil & lilin'], price: 100_000 },
  { name: 'Bouquet (M)', includes: ['22 pcs dimsum mentai', 'Topper Happy Birthday', 'Chili oil & lilin'], price: 140_000 },
  { name: 'Large Size (L)', includes: ['26 pcs dimsum mentai', 'Topper Happy Birthday', 'Chili oil & lilin'], price: 130_000 },
  { name: 'Wooden Plate (XL)', includes: ['35 pcs dimsum mentai', 'Topper Happy Birthday', 'Chili oil & lilin'], price: 150_000 },
  { name: 'Wooden Plate (2XL)', includes: ['49 pcs dimsum (bisa mix saus)', 'Topper Happy Birthday', 'Chili oil & lilin'], price: 175_000 },
  { name: 'Wooden Plate (3XL)', includes: ['62 pcs dimsum (bisa mix saus)', 'Topper Happy Birthday', 'Chili oil & lilin'], price: 250_000 },
  { name: '16 pcs + Tulisan', includes: ['18 pcs dimsum mentai', 'Chili oil', 'Free tulisan keju'], price: 65_000 },
];

const FROZEN_BROCHURE: MenuEntry[] = [
  { name: 'Dimsum Frozen', description: 'Ukuran 15 gram/pcs — beku basah siap kukus.', rows: [{ portion: 'Isi 25 pcs', price: 35_000 }, { portion: 'Isi 50 pcs', price: 65_000 }] },
  { name: 'Dimsum Frozen Reguler', description: 'Ukuran 28 gram/pcs — porsi lebih ampuh.', rows: [{ portion: 'Isi 25 pcs', price: 60_000 }] },
  { name: 'Chili Oil', description: 'Sambal jagaan andalan dapur DHD.', rows: [{ portion: '100 ml', price: 15_000 }, { portion: '200 ml', price: 25_000 }] },
  { name: 'Saus Mentai', description: 'Saus creamy favorit, praktis untuk stok di rumah.', rows: [{ portion: 'Per 100 gram', price: 15_000 }] },
];

const SHEET_META: Record<CatalogKind, { kicker: string; title: string; subtitle?: string }> = {
  menu: { kicker: 'Katalog · Menu', title: 'Dimsum Hallo Dek Menu', subtitle: '7 sajian siap santap · harga acuan per porsi' },
  wedding: { kicker: 'Katalog · Wedding', title: 'Serving Package Wedding', subtitle: PACKAGE_SUBTITLE },
  birthday: { kicker: 'Katalog · Birthday', title: 'Serving Package Birthday', subtitle: PACKAGE_SUBTITLE },
  cake: { kicker: 'Katalog · Cake', title: 'Menu Dimsum Cake', subtitle: 'Pemesanan H-1 · dekorasi nama & topper' },
  frozen: { kicker: 'Katalog · Frozen', title: 'Dimsum Frozen Pre-Order', subtitle: 'Tersertifikasi Halal · ID32110076823560626' },
  kemitraan: { kicker: 'Deck · Kemitraan', title: 'Bangun Bisnis Bersama DHD', subtitle: 'Panduan kemitraan · PDF 25 halaman' },
};

interface WaCtaProps {
  message: string;
  label?: string;
  partnership?: boolean;
}

const WaCta = ({ message, label = 'Tanya harga & ketersediaan via WhatsApp', partnership = false }: WaCtaProps) => (
  <a className="brochure-wa" href={whatsappUrl(message, partnership)} target="_blank" rel="noopener noreferrer">{label}</a>
);

function PackageBody({ kind }: { kind: 'wedding' | 'birthday' }) {
  const sheet = PACKAGE_SHEETS[kind];
  return <div className="brochure-packages">
    <p className="brochure-lead">Satu meja full daging ayam — pilih skala porsiannya, sisanya tim kami siapkan.</p>
    <div className="brochure-tiers">
      {sheet.packages.map((paket) => <article className="brochure-tier" key={paket.tier}>
        <h3>{paket.tier}</h3>
        <strong>{rupiah(paket.price)}</strong>
        <ul>
          {paket.highlights.map((line) => <li key={line}><Check size={14} />{line}</li>)}
        </ul>
      </article>)}
    </div>
    <p className="brochure-note">{sheet.tierNote}</p>
    <WaCta message={`Halo Bang Musmid, saya tertarik dengan paket ${kind} Dimsum Hallo Dek. Mohon info ketersediaan tanggal, lokasi, dan penawaran resminya.`} />
  </div>;
}

function MenuBody() {
  return <div className="brochure-packages">
    <p className="brochure-lead">Harga acuan katalog; isi, saus murni, dan ketersediaan dikonfirmasi gerai.</p>
    <div className="brochure-menu-list">
      {MENU_BROCHURE.map((item) => <article className="brochure-menu-row" key={item.name}>
        <div className="brochure-menu-head">
          <h3>{item.name}</h3>
          {item.badge && <span className={`brochure-badge${item.badge === 'Baru!' ? ' brochure-badge-new' : ''}`}>{item.badge}</span>}
        </div>
        <p>{item.description}</p>
        <div className="brochure-rows">
          {item.rows.map((row) => <div key={row.portion}><span>{row.portion}</span><span className="brochure-rows-dots" aria-hidden="true" /><strong>{rupiah(row.price)}</strong></div>)}
        </div>
      </article>)}
    </div>
    <p className="brochure-note">Free “Chili Oil” untuk pre-order tertentu · Dimsum Cake dipesan H-1 sebelum hari-H.</p>
    <WaCta message="Halo Bang Musmid, saya ingin pesan dimsum dari katalog menu. Mohon konfirmasi toleransi stok, saus, dan ekstra pengiriman kemudian." />
  </div>;
}

function CakeBody() {
  return <div className="brochure-packages">
    <p className="brochure-lead">Dimsum alias “kue ulang tahun kekinian” — semua paket dipesan H-1 dan disusun bareng tim.</p>
    <div className="brochure-cake-grid">
      {CAKE_BROCHURE.map((entry) => <article className="brochure-cake-card" key={entry.name}>
        <h3>{entry.name}</h3>
        <ul>
          {entry.includes.map((line) => <li key={line}><Check size={14} />{line}</li>)}
        </ul>
        <strong>{rupiah(entry.price)}</strong>
      </article>)}
    </div>
    <div className="brochure-addons">
      <h3>Add on</h3>
      <ul>
        {CAKE_ADDONS.map((addon) => <li key={addon.name}>
          <span>{addon.name}{addon.note ? <em> · {addon.note}</em> : null}</span>
          <strong>{rupiah(addon.price)}</strong>
        </li>)}
      </ul>
    </div>
    <p className="brochure-note">Dekorasi nama, warna pita, dan tulisan dikonsultasikan dulu — jadwal oven menyesuaikan.</p>
    <WaCta message="Halo Bang Musmid, saya tertarik dengan Dimsum Cake. Mohon info dekorasi nama, jadwal H-1, dan harga resminya." />
  </div>;
}

function FrozenBody() {
  return <div className="brochure-packages">
    <p className="brochure-lead">Stok di rumah jadi rincian aman: kukus 15–20 menit langsung siap santap.</p>
    <div className="brochure-menu-list">
      {FROZEN_BROCHURE.map((item) => <article className="brochure-menu-row" key={item.name}>
        <div className="brochure-menu-head">
          <h3>{item.name}</h3>
        </div>
        <p>{item.description}</p>
        <div className="brochure-rows">
          {item.rows.map((row) => <div key={row.portion}><span>{row.portion}</span><span className="brochure-rows-dots" aria-hidden="true" /><strong>{rupiah(row.price)}</strong></div>)}
        </div>
      </article>)}
    </div>
    <p className="brochure-note">Tersertifikasi Halal · ID32110076823560626. Pre-order dibuka berkala — ketersediaan dikonfirmasi tim.</p>
    <WaCta message="Halo Bang Musmid, saya ingin pre-order Dimsum Frozen. Mohon info jadwal pre-order dan ketersediaan sausnya." />
  </div>;
}

function DeckBody() {
  return <div className="brochure-packages">
    <iframe className="brochure-pdf" src="/assets/kemitraan/bangun-bisnis-bersama-dhd.pdf" title="Deck kemitraan Dimsum Hallo Dek" loading="lazy" />
    <p className="brochure-note">PDF · 25 halaman · Informasi paket kemitraan terbaru. Proyeksi bisnis dalam dokumen bukan jaminan hasil; tinjau penawaran dan perjanjian bersama tim.</p>
    <WaCta message="Halo tim kemitraan Dimsum Hallo Dek, saya sudah membaca deck kemitraan dan ingin tanya lebih lanjut." label="Diskusikan deck ke tim kemitraan via WhatsApp" partnership />
  </div>;
}

const BODY_BY_KIND: Record<CatalogKind, (() => React.JSX.Element) | null> = {
  menu: MenuBody,
  wedding: () => <PackageBody kind="wedding" />,
  birthday: () => <PackageBody kind="birthday" />,
  cake: CakeBody,
  frozen: FrozenBody,
  kemitraan: DeckBody,
};

export function CatalogModal({ kind, onClose }: { kind: CatalogKind; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);
  const meta = SHEET_META[kind];
  const Body = BODY_BY_KIND[kind];
  return createPortal(
    <div className="catalog-modal" role="dialog" aria-modal="true" aria-label={meta.title}>
      <button type="button" className="catalog-modal-backdrop" onClick={onClose} tabIndex={-1} aria-hidden="true" />
      <article className="catalog-modal-panel">
        <header className="catalog-modal-head">
          <div>
            <p className="catalog-modal-kicker">{meta.kicker}</p>
            <h2 className="catalog-modal-title">{meta.title}</h2>
            {meta.subtitle && <p className="catalog-modal-subtitle">{meta.subtitle}</p>}
          </div>
          <button type="button" ref={closeRef} className="catalog-modal-close" onClick={onClose} aria-label="Tutup katalog">
            <X size={20} />
          </button>
        </header>
        <div className="catalog-modal-body">{Body ? <Body /> : null}</div>
      </article>
    </div>,
    document.body,
  );
}

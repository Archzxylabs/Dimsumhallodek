import { Link } from 'react-router';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { useSessionState } from '../lib/useSessionState';
import { MENU_ITEMS } from '../data/menuData';
import { REGIONS_DATA } from '../data/locationsData';
import { BangMusPortrait } from '../components/BangMusPortrait';
import { KineticShowcase } from '../components/KineticShowcase';
import { FlavorCollection } from '../components/FlavorCollection';
import { ArrowLink, Marquee, Reveal } from '../components/DesignElements';
import { Headline, ScrollScene } from '../components/MotionElements';

export function HomePage() {
  const [currentIndex, setCurrentIndex] = useSessionState('menu-slide', 0, (v): v is number => Number.isInteger(v) && typeof v === 'number' && v >= 0 && v < MENU_ITEMS.length);
  return <>
    <KineticShowcase items={MENU_ITEMS} currentIndex={currentIndex} onSelectIndex={setCurrentIndex} />
    <nav className="home-shortcuts page-width" aria-label="Jelajahi Dimsum Hallo Dek">
      <span>Hari ini mau yang mana?</span>
      <a href="#pilihan-rasa">Pilihan rasa <ArrowUpRight size={15} /></a>
      <Link to="/produk">Hadiah & frozen <ArrowUpRight size={15} /></Link>
      <Link to="/event">Untuk acara <ArrowUpRight size={15} /></Link>
      <Link to="/kemitraan">Jadi mitra <ArrowUpRight size={15} /></Link>
    </nav>

    <FlavorCollection />
    <Marquee text="GURIHNYA NYAMBUNG. HAPPYNYA NULAR." variant="marquee-yellow home-motion-ribbon" />

    <section className="occasion-section page-width section-space" aria-labelledby="occasions-title">
      <Reveal className="collection-heading occasion-heading">
        <div><p className="eyebrow">02 / Lebih dari camilan</p><Headline id="occasions-title" className="editorial-heading" lines={[{ text: 'Ada dimsum untuk' }, { text: 'setiap cerita.', accent: 'orange' }]} /></div>
        <p>Buat bilang selamat, buat orang tersayang, atau buat stok di rumah. Tinggal pilih momennya.</p>
      </Reveal>
      <Reveal className="occasion-grid">
        <Link to="/produk#cake" className="occasion-card occasion-cake">
          <div><p className="eyebrow">Rayakan dengan yang gurih</p><h3>Dimsum Cake</h3><p>Dekorasi nama untuk momen yang lebih personal.</p><span className="occasion-price">Mulai Rp65.000 <ArrowUpRight size={20} /></span></div>
          <img src="/assets/client/cake-personal.webp" width={192} height={198} alt="Contoh cake dimsum di wooden plate dari katalog produk" loading="lazy" decoding="async" />
        </Link>
        <Link to="/produk#bouquet" className="occasion-card occasion-bouquet">
          <div><p className="eyebrow">Hadiah yang bisa dinikmati</p><h3>Dimsum Bouquet</h3><p>22 pcs, dengan dekorasi nama untuk si penerima.</p><span className="occasion-price">Rp140.000 <ArrowUpRight size={20} /></span></div>
          <img src="/assets/client/bouquet.webp" width={195} height={182} alt="Dimsum Bouquet M dengan dekorasi dari katalog produk" loading="lazy" decoding="async" />
        </Link>
      </Reveal>
      <Link to="/produk#frozen" className="frozen-strip"><img src="/assets/client/frozen-15g.webp" width={198} height={152} alt="Kemasan Dimsum Frozen" loading="lazy" decoding="async" /><div><span className="eyebrow">Simpan untuk nanti</span><h3>Dimsum Frozen</h3><p>Mulai Rp35.000 / 25 pcs · Pilihan saus tersedia.</p></div><span>Kenali pilihan frozen <ArrowUpRight size={19} /></span></Link>
    </section>

    <section className="home-event section-space">
      <div className="page-width home-event-layout">
        <Reveal><p className="eyebrow">03 / Momen kamu, sajian kita</p><Headline className="editorial-heading" lines={[{ text: 'Meja yang ramai.' }, { text: 'Momen yang hangat.', accent: 'yellow' }]} /><p className="section-description">Wedding, acara sekolah, kantor, khitanan, atau lamaran. Ceritakan acaranya, kita bantu bahas kebutuhan dimsumnya.</p><div className="event-labels"><span>Wedding</span><span>Sekolah</span><span>Kantor</span><span>Khitanan</span><span>Lamaran</span></div><ArrowLink to="/event" className="light-link">Rencanakan acara kamu</ArrowLink></Reveal>
        <div className="event-catalog-preview">
          <ScrollScene className="event-catalog-sheet" turn={-4} depth={26}><a href="/assets/client/wedding-catalog.webp" target="_blank" rel="noopener noreferrer"><img src="/assets/client/wedding-catalog.webp" alt="Katalog paket wedding Dimsum Hallo Dek" width={1024} height={1280} loading="lazy" decoding="async" /><span>Lihat katalog wedding <ArrowUpRight size={16} /></span></a></ScrollScene>
          <ScrollScene className="event-catalog-sheet" turn={4} depth={-22}><a href="/assets/client/birthday-catalog.webp" target="_blank" rel="noopener noreferrer"><img src="/assets/client/birthday-catalog.webp" alt="Katalog paket birthday Dimsum Hallo Dek" width={1024} height={1280} loading="lazy" decoding="async" /><span>Lihat katalog birthday <ArrowUpRight size={16} /></span></a></ScrollScene>
        </div>
      </div>
    </section>

    <section className="home-benefits page-width section-space">
      <Reveal className="member-invitation"><div><p className="eyebrow">Membership Hallo Dek</p><h2>Makan enak.<br />Happynya terkumpul.</h2><p>Dapat poin sebesar 1% dari harga produk. Daftar dan cek poin lewat admin.</p><ArrowLink to="/membership">Kenali membership</ArrowLink></div><BangMusPortrait full decorative /></Reveal>
      <Reveal className="partner-invitation" delay={0.08}><figure><img src="/assets/client/store-concept.webp" width={610} height={421} alt="Referensi konsep gerai Dimsum Hallo Dek dari deck kemitraan" loading="lazy" decoding="async" /><figcaption>Konsep gerai · deck kemitraan</figcaption></figure><div><p className="eyebrow">Tumbuh bareng Hallo Dek</p><h2>Satu brand.<br />Tiga cara bermitra.</h2><p>Flexible, Collaborative, atau Full Managed. Temukan peran yang pas buat rencana usahamu.</p><ArrowLink to="/kemitraan">Lihat pilihan kemitraan</ArrowLink></div></Reveal>
    </section>

    <section className="nearby-section section-space"><div className="page-width"><div className="collection-heading"><div className="nearby-host"><BangMusPortrait full decorative pose="explore" /><div><p className="eyebrow"><MapPin size={15} /> Lebih dekat dari yang kamu kira</p><h2 className="editorial-heading">Mampir ke<br />gerai favoritmu.</h2></div></div><ArrowLink to="/gerai#locations">Cari alamat gerai</ArrowLink></div><div className="region-directory">{REGIONS_DATA.map(group => <Link to="/gerai#locations" key={group.region}><div><h3>{group.region}</h3><span>{group.count} gerai dalam daftar</span></div><ArrowUpRight size={22} /></Link>)}</div></div></section>
  </>;
}

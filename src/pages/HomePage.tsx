import { useSessionState } from '../lib/useSessionState';
import { Link } from "react-router";
import { ArrowUpRight, MapPin } from "lucide-react";
import { MENU_ITEMS } from "../data/menuData";
import { BangMusPortrait } from "../components/BangMusPortrait";
import { KineticShowcase } from "../components/KineticShowcase";
import {
  ArrowLink,
  BouquetArt,
  Dumpling,
  Marquee,
  Reveal,
  Spark,
} from "../components/DesignElements";

export function HomePage() {
  const [currentIndex, setCurrentIndex] = useSessionState('menu-slide', 0, (v): v is number => Number.isInteger(v) && typeof v === 'number' && v >= 0 && v < MENU_ITEMS.length);
  return (
    <>
      <KineticShowcase
        items={MENU_ITEMS}
        currentIndex={currentIndex}
        onSelectIndex={setCurrentIndex}
      />
      <nav className="home-shortcuts page-width" aria-label="Jelajahi Dimsum Hallo Dek">
        <span>Mau cari apa?</span>
        <Link to="/produk#cake">Cake & Bouquet <ArrowUpRight size={16} /></Link>
        <Link to="/produk#frozen">Dimsum Frozen <ArrowUpRight size={16} /></Link>
        <Link to="/event">Dimsum untuk event <ArrowUpRight size={16} /></Link>
        <Link to="/kemitraan">Jadi mitra <ArrowUpRight size={16} /></Link>
      </nav>
      <Marquee />
      <section className="home-intro page-width section-space">
        <Reveal>
          <p className="eyebrow">
            <span className="mini-dot" /> Lebih dari dimsum harian
          </p>
          <h2 className="editorial-heading">
            Sedikit dimsum.
            <br />
            Banyak alasan
            <br />
            buat <span className="handwritten">happy.</span>
          </h2>
        </Reveal>
        <Reveal className="home-intro-aside" delay={0.1}>
          <Dumpling className="intro-dumpling" />
          <p>
            Ada yang buat nemenin hari. Ada yang buat hadiah. Ada juga yang
            bikin satu acara ikut happy.
          </p>
          <ArrowLink to="/produk">Temukan favorit barumu</ArrowLink>
        </Reveal>
      </section>
      <section
        className="home-product-grid page-width"
        aria-label="Pilihan produk"
      >
        <Reveal>
          <Link to="/produk#cake" className="feature-tile cake-tile">
            <div className="tile-top">
              <span>01 / BUAT PERAYAAN</span>
              <ArrowUpRight />
            </div>
            <div className="tile-photo">
              <img
                src="/assets/optimized/cake-800.webp"
                    srcSet="/assets/optimized/cake-480.webp 480w, /assets/optimized/cake-800.webp 800w, /assets/optimized/cake-1200.webp 930w"
                    sizes="(max-width: 359px) calc(100vw - 40px), (max-width: 767px) calc((100vw - 52px) / 2), 45vw"
                    decoding="async"
                alt="Sajian dimsum dengan aneka saus"
                loading="lazy"
              />
            </div>
            <div className="tile-caption">
              <h3>
                Make a wish.
                <br />
                Take a bite.
              </h3>
              <span>Dimsum Cake</span>
            </div>
            <div className="tile-stamp">
              HAPPY
              <br />
              BIRTHDAY!
            </div>
          </Link>
        </Reveal>
        <Reveal delay={0.12}>
          <Link to="/produk#bouquet" className="feature-tile bouquet-tile">
            <div className="tile-top">
              <span>02 / BUAT ORANG SPESIAL</span>
              <ArrowUpRight />
            </div>
            <BouquetArt />
            <div className="tile-caption">
              <h3>
                Kasih sayang,
                <br />
                dibungkus gurih.
              </h3>
              <span>Dimsum Bouquet</span>
            </div>
          </Link>
        </Reveal>
      </section>
      <section className="page-width home-frozen">
        <Link to="/produk#frozen">
          <Dumpling />
          <div><p className="eyebrow">Untuk stok di rumah</p><h3>Dimsum Frozen</h3><p>Kenali pilihan kemasan dan rencanakan pesananmu.</p></div>
          <span>Lihat frozen <ArrowUpRight size={20} /></span>
        </Link>
      </section>
      <section className="page-width home-membership">
        <Link to="/membership"><BangMusPortrait decorative /><div><p className="eyebrow">Membership Hallo Dek</p><h3>Makan enak. Dapat poin.</h3><p>Kumpulkan poin 1% dari harga produk bareng Bang Mus.</p></div><span>Kenali membership <ArrowUpRight size={20} /></span></Link>
      </section>
      <section className="home-event section-space">
        <div className="page-width home-event-layout">
          <Reveal>
            <p className="eyebrow">Momen kamu, sajian kita</p>
            <h2 className="editorial-heading">
              MOMEN
              <br />
              BESAR.
              <br />
              <span className="text-yellow">
                GIGITAN
                <br />
                KECIL.
              </span>
            </h2>
            <ArrowLink to="/event" className="light-link">
              Bikin acara makin happy
            </ArrowLink>
          </Reveal>
          <Reveal className="home-event-photo" delay={0.1}>
            <img
              src="/assets/optimized/platter-800.webp"
                srcSet="/assets/optimized/platter-480.webp 480w, /assets/optimized/platter-800.webp 768w"
                sizes="(max-width: 767px) calc(100vw - 40px), 45vw"
                decoding="async"
              alt="Dimsum mentai untuk dinikmati bersama"
              loading="lazy"
            />
            <div className="photo-note">
              <Spark />
              Wedding, sekolah, kantor,
              <br />
              khitanan, sampai lamaran.
            </div>
          </Reveal>
        </div>
      </section>
      <section className="home-partner page-width section-space">
        <Reveal className="partner-note">
          <p className="eyebrow">Growing together</p>
          <span className="partner-serial">DHD / 03</span>
          <Spark />
        </Reveal>
        <Reveal className="home-partner-copy">
          <h2 className="editorial-heading">
            Satu rasa.
            <br />
            Banyak peluang.
          </h2>
          <p>
            Mulai cerita usahamu bersama Dimsum Hallo Dek. Kenali tiga pilihan
            kerja sama dan temukan yang cocok dengan rencanamu.
          </p>
          <ArrowLink to="/kemitraan">Kenalan dengan kemitraan</ArrowLink>
        </Reveal>
      </section>
      <section id="locations" className="home-locations">
        <div className="page-width">
          <Reveal>
            <p className="eyebrow">
              <MapPin size={16} /> Dekat kamu, dekat happy
            </p>
            <div className="home-location-heading">
              <h2>
                Bogor.
                <br />
                Bekasi.
                <br />
                Sukabumi.
                <br />
                Bandung.
              </h2>
              <div>
                <Dumpling />
                <p>
                  Udah ketemu
                  <br />
                  gerai favoritmu?
                </p>
                <ArrowLink to="/gerai#locations">Cari alamat gerai</ArrowLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

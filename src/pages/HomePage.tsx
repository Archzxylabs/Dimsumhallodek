import { useState } from "react";
import { Link } from "react-router";
import { ArrowUpRight, MapPin } from "lucide-react";
import { MENU_ITEMS } from "../data/menuData";
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
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <>
      <KineticShowcase
        items={MENU_ITEMS}
        currentIndex={currentIndex}
        onSelectIndex={setCurrentIndex}
      />
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
                src="/assets/images/ChatGPT-Image-Jun-5-2026-01_22_12-PM-Copy.png"
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
              src="/assets/images/dimsum-isi-16-mentai.png"
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
              </h2>
              <div>
                <Dumpling />
                <p>
                  Udah ketemu
                  <br />
                  gerai favoritmu?
                </p>
                <ArrowLink to="/gerai">Cari gerai terdekat</ArrowLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

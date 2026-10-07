import { ArrowDown, ArrowUpRight, Snowflake } from "lucide-react";
import {
  BouquetArt,
  Dumpling,
  Faq,
  Marquee,
  Reveal,
  Spark,
} from "./DesignElements";
import { Link } from 'react-router';
import { whatsappUrl } from "../lib/business";
import { ProductInquiry } from './ProductInquiry';

const products = [
  {
    id: "cake",
    number: "01",
    name: "Dimsum Cake",
    title: 'Make a wish. Take a bite.',
    description:
      "Untuk yang lebih suka gurih daripada manis. Rayakan ulang tahun dan momen spesial dengan dimsum, plus dekorasi nama biar makin personal.",
    price: "Rp 65.000",
    type: "cake",
    details: [['Untuk', 'Ulang tahun & perayaan'], ['Personalisasi', 'Dekorasi nama'], ['Isi & ukuran', '16 pcs + tulisan, cake 18–62 pcs']],
  },
  {
    id: "bouquet",
    number: "02",
    name: "Dimsum Bouquet",
    title: 'Love, wrapped in dimsum.',
    description:
      "Hadiah buat orang yang selalu punya tempat di hati — dan selalu punya ruang buat dimsum. Cocok untuk ulang tahun, wisuda, atau sekadar bilang terima kasih.",
    price: "Rp 140.000",
    type: "bouquet",
    details: [['Untuk', 'Hadiah ulang tahun, wisuda & ucapan'], ['Personalisasi', 'Dekorasi nama'], ['Isi & desain', 'M · 22 pcs, desain bersama tim']],
  },
  {
    id: "frozen",
    number: "03",
    name: "Dimsum Frozen",
    title: 'Happy food. Whenever.',
    description:
      "Simpan favoritmu untuk dinikmati di rumah. Tanya tim untuk pilihan isi, petunjuk memasak, penyimpanan, dan ketersediaan produk frozen.",
    price: "Rp 35.000",
    type: "frozen",
    details: [['Untuk', 'Stok dimsum di rumah'], ['Isi & varian', '15 g: 25/50 pcs · 28 g: 25 pcs'], ['Memasak & menyimpan', 'Ikuti petunjuk resmi produk']],
  },
];

export function SignatureProducts() {
  return (
    <>
      <section className="page-hero product-hero page-width">
        <Reveal>
          <p className="eyebrow">01 / Cake, Bouquet & Frozen</p>
          <h1 className="hero-title">
            SAY IT
            <br />
            WITH
            <br />
            <span className="text-orange">DIMSUM.</span>
          </h1>
          <p className="hero-description">
            Buat hadiah, buat perayaan,
            <br />
            atau buat diri sendiri. Semuanya boleh.
          </p>
          <nav className="product-quick-links" aria-label="Langsung ke produk">
            {products.map((product) => <a key={product.id} href={`#${product.id}`}>{product.name.replace('Dimsum ', '')} <ArrowDown size={16} /></a>)}
          </nav>
        </Reveal>
        <Reveal className="product-hero-art" delay={0.1}>
          <div className="product-photo-frame">
            <img
              src="/assets/optimized/platter-800.webp"
                srcSet="/assets/optimized/platter-480.webp 480w, /assets/optimized/platter-800.webp 768w"
                sizes="(max-width: 767px) calc(100vw - 40px), 45vw"
                decoding="async"
              alt="Sajian dimsum mentai dan nori"
            />
            <span>Gurihnya, punya cerita.</span>
          </div>
          <div className="round-stamp">
            <Spark />
            <span>
              GOOD FOOD
              <br />
              GOOD MOOD
            </span>
          </div>
          <Dumpling className="product-hero-dumpling" />
        </Reveal>
      </section>
      <nav className="product-index page-width" aria-label="Pilihan produk">
        {products.map((product) => (
          <a key={product.id} href={`#${product.id}`}>
            <span>{product.number}</span>
            {product.name}
            <ArrowDown size={17} />
          </a>
        ))}
      </nav>
      {products.map((product) => (
        <section
          id={product.id}
          key={product.id}
          className={`product-story product-story-${product.type}`}
        >
          <div className="page-width product-story-grid">
            <Reveal className="product-visual">
              {product.type === "bouquet" ? (
                <>
                  <BouquetArt />
                  <span className="visual-caption">
                    Ilustrasi bouquet · desain final dikonsultasikan
                  </span>
                </>
              ) : product.type === "cake" ? (
                <>
                  <img
                    src="/assets/optimized/cake-800.webp"
                    srcSet="/assets/optimized/cake-480.webp 480w, /assets/optimized/cake-800.webp 800w, /assets/optimized/cake-1200.webp 930w"
                    sizes="(max-width: 767px) calc(100vw - 40px), 45vw"
                    decoding="async"
                    alt="Contoh sajian dimsum dengan beberapa pilihan saus"
                    loading="lazy"
                  />
                  <span className="visual-caption">
                    Contoh sajian · bentuk & isi dikonsultasikan
                  </span>
                </>
              ) : (
                <>
                  <div className="frozen-illustration">
                    <Snowflake />
                    <Dumpling />
                    <span>
                      READY FOR
                      <br />
                      YOUR HAPPY DAY.
                    </span>
                  </div>
                  <span className="visual-caption">Dimsum Frozen</span>
                </>
              )}
            </Reveal>
            <Reveal className="product-story-copy" delay={0.08}>
              <p className="eyebrow">
                {product.number} / {product.name}
              </p>
              <h2 className="editorial-heading">{product.name}</h2>
              <div className="product-tagline">{product.title}</div>
              <p>{product.description}</p>
              <dl className="product-specs">{product.details.map(([label, detail]) => <div key={label}><dt>{label}</dt><dd>{detail}</dd></div>)}<div><dt>Persiapan & pengiriman</dt><dd>Dikonfirmasi sesuai tanggal dan lokasi kamu</dd></div></dl>
              <div className="product-price">
                <div>
                  <span className="demo-price-label">Harga katalog · mulai dari</span>
                  <strong>{product.price}</strong>
                </div>
                <a
                  href={whatsappUrl(
                    `Halo Bang Mus, saya ingin tanya ${product.name}. Mohon pilihan ukuran, jumlah isi, waktu persiapan, opsi pengiriman, dan harga resminya.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Tanya ${product.name} via WhatsApp`}
                >
                  Tanya {product.name.replace('Dimsum ', '')} via WhatsApp<ArrowUpRight size={18} />
                </a>
              </div>
              <p className="price-note">
                Harga katalog produk; tim memastikan harga transaksi dan ketersediaan.{' '}
                <Link className="membership-inline-link" to="/membership#simulasi-poin">Member dapat 1% poin ↗</Link>
              </p>
              <ProductInquiry id={product.id} name={product.name} unit={product.id === 'frozen' ? 'kemasan' : product.id} personalized={product.id !== 'frozen'} />
            </Reveal>
          </div>
        </section>
      ))}
      <Marquee text="A LITTLE GIFT. A LOT OF HAPPY." variant="marquee-yellow" />
      <section className="page-width section-space faq-section">
        <Reveal>
          <p className="eyebrow">Sebelum pesan</p>
          <h2 className="editorial-heading">
            Biar makin
            <br />
            kenal.
          </h2>
        </Reveal>
        <Faq
          items={[
            {
              question: "Bisa pakai nama penerima?",
              answer:
                "Bisa untuk Dimsum Cake dan Dimsum Bouquet. Ceritakan nama dan keinginan dekorasimu ke tim saat konsultasi.",
            },
            {
              question: "Harga di sini sudah final?",
              answer:
                "Harga mengacu pada katalog produk yang diberikan tim. Tim akan mengonfirmasi harga transaksi sesuai isi, ukuran, dekorasi, dan kebutuhanmu.",
            },
            {
              question: "Bisa dikirim ke daerah saya?",
              answer:
                "Ceritakan lokasi dan tanggal kebutuhanmu lewat WhatsApp. Tim akan memastikan jangkauan, opsi pengiriman, serta ketersediaan.",
            },
            {
              question: "Ada info alergen atau penyimpanan frozen?",
              answer:
                "Minta informasi komposisi, alergen, cara memasak, dan petunjuk penyimpanan resmi dari tim sebelum memesan.",
            },
          ]}
        />
      </section>
    </>
  );
}

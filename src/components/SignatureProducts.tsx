import { ArrowDown, ArrowUpRight, Snowflake } from "lucide-react";
import {
  BouquetArt,
  Dumpling,
  Faq,
  Marquee,
  Reveal,
  Spark,
} from "./DesignElements";
import { whatsappUrl } from "../lib/business";

const products = [
  {
    id: "cake",
    number: "01",
    name: "Dimsum Cake",
    title: (
      <>
        Make a wish.
        <br />
        Take a bite.
      </>
    ),
    description:
      "Untuk yang lebih suka gurih daripada manis. Rayakan ulang tahun dan momen spesial dengan dimsum, plus dekorasi nama biar makin personal.",
    note: "Bisa tambah dekorasi nama",
    price: "Rp 150.000",
    type: "cake",
  },
  {
    id: "bouquet",
    number: "02",
    name: "Dimsum Bouquet",
    title: (
      <>
        Love, wrapped
        <br />
        in dimsum.
      </>
    ),
    description:
      "Hadiah buat orang yang selalu punya tempat di hati — dan selalu punya ruang buat dimsum. Cocok untuk ulang tahun, wisuda, atau sekadar bilang terima kasih.",
    note: "Bisa tambah dekorasi nama",
    price: "Rp 120.000",
    type: "bouquet",
  },
  {
    id: "frozen",
    number: "03",
    name: "Dimsum Frozen",
    title: (
      <>
        Happy food.
        <br />
        Whenever.
      </>
    ),
    description:
      "Simpan favoritmu untuk dinikmati di rumah. Tanya tim untuk pilihan isi, petunjuk memasak, penyimpanan, dan ketersediaan produk frozen.",
    note: "Untuk stok di rumah",
    price: "Rp 45.000",
    type: "frozen",
  },
];

export function SignatureProducts() {
  return (
    <>
      <section className="page-hero product-hero page-width">
        <Reveal>
          <p className="eyebrow">01 / Everyday & special days</p>
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
        </Reveal>
        <Reveal className="product-hero-art" delay={0.1}>
          <div className="product-photo-frame">
            <img
              src="/assets/images/dimsum-isi-16-mentai.png"
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
                    src="/assets/images/ChatGPT-Image-Jun-5-2026-01_22_12-PM-Copy.png"
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
              <h2 className="editorial-heading">{product.title}</h2>
              <p>{product.description}</p>
              <span className="product-detail-note">{product.note}</span>
              <div className="product-price">
                <div>
                  <span>Contoh harga mulai dari</span>
                  <strong>{product.price}</strong>
                </div>
                <a
                  href={whatsappUrl(
                    `Halo Minsum, saya ingin tanya ${product.name}. Bisa bantu pilih ukuran, isi, dan harga resminya?`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Tanya ${product.name} via WhatsApp`}
                >
                  <ArrowUpRight />
                </a>
              </div>
              <p className="price-note">
                Harga demo. Ukuran, isi, desain, dan harga resmi dikonfirmasi
                tim.
              </p>
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
                "Harga yang ditampilkan adalah contoh untuk demo. Tim akan mengonfirmasi harga resmi berdasarkan produk, isi, ukuran, dan kebutuhanmu.",
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

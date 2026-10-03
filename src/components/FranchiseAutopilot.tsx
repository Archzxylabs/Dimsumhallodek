import { useState, type FormEvent } from "react";
import { ArrowDown, ArrowUpRight, Minus, Plus } from "lucide-react";
import { Dumpling, Faq, Marquee, Reveal, Spark } from "./DesignElements";
import { whatsappUrl } from "../lib/business";

const packages = [
  {
    name: "Flexible",
    price: "Rp 10 juta",
    title: "Punya cara sendiri?",
    description:
      "Konsep kerja sama untuk yang ingin terlibat lebih banyak dalam pengelolaan sehari-hari.",
    discussions: [
      "Kebutuhan lokasi dan format usaha",
      "Pembagian peran operasional",
      "Dukungan sesuai kesepakatan",
    ],
  },
  {
    name: "Collaborative",
    price: "Rp 20 juta",
    title: "Jalan bareng, tumbuh bareng.",
    description:
      "Konsep kolaborasi dengan pembagian pengelolaan antara mitra dan tim Dimsum Hallo Dek.",
    discussions: [
      "Tanggung jawab mitra dan tim",
      "Pola kolaborasi operasional",
      "Pendampingan sesuai kebutuhan",
    ],
  },
  {
    name: "Full Managed",
    price: "Rp 35 juta",
    title: "Biar tim bantu mengelola.",
    description:
      "Konsep untuk mitra yang ingin pengelolaan operasional lebih banyak ditangani oleh tim.",
    discussions: [
      "Lingkup pengelolaan oleh tim",
      "Pemantauan dan pelaporan",
      "Ketentuan kerja sama",
    ],
  },
];

export function FranchiseAutopilot() {
  const [selected, setSelected] = useState(0);
  const [city, setCity] = useState("");
  const [involvement, setInvolvement] = useState("Belum menentukan");
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const message = [
      "Halo tim kemitraan Dimsum Hallo Dek, saya ingin konsultasi.",
      `Pilihan yang ingin dibahas: ${packages[selected].name}`,
      `Rencana kota/lokasi: ${city.trim()}`,
      `Keterlibatan operasional: ${involvement}`,
      "Mohon informasi peran, fasilitas, syarat, dan penawaran resmi yang terbaru.",
    ].join("\n");
    window.open(whatsappUrl(message, true), "_blank", "noopener,noreferrer");
  };
  return (
    <>
      <section className="page-hero page-width partnership-hero">
        <Reveal>
          <p className="eyebrow">03 / Good food. Growing together.</p>
          <h1 className="hero-title">
            BIKIN
            <br />
            HAPPY.
            <br />
            <span className="text-orange">
              BIKIN
              <br />
              USAHA.
            </span>
          </h1>
          <p className="hero-description">
            Satu brand, tiga pilihan kemitraan.
            <br />
            Mulai dari cara kerja yang cocok buat kamu.
          </p>
          <a href="#pilihan-kemitraan" className="button button-green">
            Kenali pilihanmu
            <ArrowDown size={18} />
          </a>
        </Reveal>
        <Reveal className="partnership-art" delay={0.1}>
          <div className="partner-orbit orbit-one" />
          <div className="partner-orbit orbit-two" />
          <img
            src="/assets/images/cropped-cropped-Desain-tanpa-judul-2.png"
            alt="Dimsum Hallo Dek"
          />
          <span className="orbit-label label-one">Flexible</span>
          <span className="orbit-label label-two">Collaborative</span>
          <span className="orbit-label label-three">Full Managed</span>
          <Spark className="partner-spark" />
          <p>
            SATU RASA.
            <br />
            BANYAK PELUANG.
          </p>
        </Reveal>
      </section>
      <Marquee text="LET'S GROW SOMETHING GOOD." variant="marquee-yellow" />
      <section
        id="pilihan-kemitraan"
        className="page-width section-space partnership-options"
      >
        <Reveal className="section-heading-row">
          <div>
            <p className="eyebrow">Temukan cara bermitramu</p>
            <h2 className="editorial-heading">
              Your business.
              <br />
              Your kind of happy.
            </h2>
          </div>
          <p>
            Flexible, Collaborative, atau Full Managed. Detail peran, fasilitas,
            dan penawaran dibahas langsung bersama tim.
          </p>
        </Reveal>
        <div className="partnership-list">
          {packages.map((plan, index) => (
            <article
              key={plan.name}
              className={selected === index ? "is-expanded" : ""}
            >
              <button
                type="button"
                aria-expanded={selected === index}
                aria-controls={`plan-${index}`}
                onClick={() => setSelected(index)}
              >
                <span className="plan-number">0{index + 1}</span>
                <h3>{plan.name}</h3>
                <span className="plan-toggle">
                  {selected === index ? <Minus /> : <Plus />}
                </span>
              </button>
              {selected === index && (
                <div id={`plan-${index}`} className="plan-content">
                  <div>
                    <h4>{plan.title}</h4>
                    <p>{plan.description}</p>
                    <p className="plan-disclaimer">
                      Gambaran untuk demo. Ketentuan resmi dikonfirmasi tim.
                    </p>
                  </div>
                  <div>
                    <span className="eyebrow">
                      Yang dibahas saat konsultasi
                    </span>
                    <ul>
                      {plan.discussions.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="plan-price">
                    <span>Contoh harga mulai dari</span>
                    <strong>{plan.price}</strong>
                    <a href="#konsultasi-mitra">
                      Konsultasi pilihan ini
                      <ArrowUpRight size={18} />
                    </a>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
        <p className="price-note">
          Harga dan gambaran model di atas adalah contoh demo, bukan penawaran
          resmi.
        </p>
      </section>
      <section className="partnership-steps">
        <div className="page-width section-space">
          <Reveal>
            <p className="eyebrow">Mulai dengan percakapan</p>
            <h2 className="editorial-heading">
              Dari penasaran,
              <br />
              jadi punya rencana.
            </h2>
          </Reveal>
          <div className="steps-grid">
            {[
              {
                number: "01",
                title: "Kenalan dulu",
                text: "Ceritakan rencana lokasi dan keterlibatanmu dalam usaha.",
              },
              {
                number: "02",
                title: "Bahas pilihan",
                text: "Tim menjelaskan model, kebutuhan, dan ketentuan yang relevan.",
              },
              {
                number: "03",
                title: "Susun langkah",
                text: "Tinjau penawaran resmi dan sepakati langkah berikutnya bersama tim.",
              },
            ].map((step) => (
              <Reveal key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>
          <a
            href="/assets/Bergabunglah_bersama_kemitraan_DHD.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="deck-link"
          >
            Baca deck kemitraan
            <ArrowUpRight size={20} />
          </a>
          <p className="deck-note">
            Deck referensi. Minta penawaran terbaru saat konsultasi.
          </p>
        </div>
      </section>
      <section
        id="konsultasi-mitra"
        className="page-width section-space planner-grid partner-inquiry"
      >
        <Reveal>
          <p className="eyebrow">Let's start a conversation</p>
          <h2 className="editorial-heading">
            Cerita usaha
            <br />
            kamu dimulai
            <br />
            <span className="handwritten">di sini.</span>
          </h2>
          <Dumpling className="partner-inquiry-dumpling" />
        </Reveal>
        <form className="inquiry-form" onSubmit={submit}>
          <label>
            Pilihan yang ingin dibahas
            <select
              value={selected}
              onChange={(e) => setSelected(Number(e.target.value))}
            >
              {packages.map((plan, index) => (
                <option value={index} key={plan.name}>
                  {plan.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Rencana kota / lokasi
            <input
              type="text"
              maxLength={180}
              required
              placeholder="Contoh: Bekasi"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          <label>
            Keterlibatan operasional
            <select
              value={involvement}
              onChange={(e) => setInvolvement(e.target.value)}
            >
              <option>Belum menentukan</option>
              <option>Ingin mengelola sehari-hari</option>
              <option>Ingin berbagi pengelolaan</option>
              <option>Ingin dibantu pengelolaan oleh tim</option>
            </select>
          </label>
          <button type="submit" className="button button-orange">
            Ngobrol dengan tim kemitraan
            <ArrowUpRight size={20} />
          </button>
          <p className="form-note">
            Rencana kamu akan dibuka sebagai pesan WhatsApp. Periksa sebelum
            mengirim.
          </p>
        </form>
      </section>
      <section className="page-width section-space faq-section partner-faq">
        <Reveal>
          <p className="eyebrow">Boleh tanya dulu</p>
          <h2 className="editorial-heading">
            Biar langkahnya
            <br />
            lebih yakin.
          </h2>
        </Reveal>
        <Faq
          items={[
            {
              question: "Apa perbedaan ketiga model kemitraan?",
              answer:
                "Flexible, Collaborative, dan Full Managed adalah tiga pilihan yang tersedia. Pembagian peran, fasilitas, serta ketentuan masing-masing dijelaskan oleh tim berdasarkan penawaran terbaru.",
            },
            {
              question: "Apakah pendapatan atau balik modal dijamin?",
              answer:
                "Tidak ada jaminan pendapatan atau waktu balik modal di website ini. Diskusikan asumsi, biaya, risiko usaha, dan ketentuan resmi bersama tim.",
            },
            {
              question: "Sudah punya lokasi, bisa konsultasi?",
              answer:
                "Bisa. Sebutkan kota dan lokasi yang kamu rencanakan. Tim akan membantu membahas kelayakan serta kebutuhan kerja sama.",
            },
          ]}
        />
      </section>
    </>
  );
}

import { useState, type FormEvent } from "react";
import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import { Faq, Marquee, Reveal, Spark } from "./DesignElements";
import { whatsappUrl } from "../lib/business";

const events = [
  { name: "Wedding", subtitle: "Hari besar. Sajian yang ikut berkesan." },
  { name: "Sekolah", subtitle: "Dari perayaan kelas sampai acara sekolah." },
  { name: "Kantor", subtitle: "Meeting, gathering, dan cerita satu tim." },
  {
    name: "Khitanan",
    subtitle: "Rayakan bersama keluarga dan orang terdekat.",
  },
  { name: "Lamaran", subtitle: "Dua keluarga. Satu meja. Banyak happy." },
];

export function EventServices() {
  const [eventType, setEventType] = useState("Wedding");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const today = new Date();
  const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const message = [
      "Halo Minsum, saya ingin konsultasi layanan event Dimsum Hallo Dek.",
      `Acara: ${eventType}`,
      `Tanggal: ${date}`,
      `Perkiraan tamu: ${guests} orang`,
      `Lokasi: ${location.trim()}`,
      notes.trim() ? `Catatan: ${notes.trim()}` : "",
      "Mohon konfirmasi ketersediaan, pilihan sajian, dan penawaran resmi.",
    ]
      .filter(Boolean)
      .join("\n");
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  };
  return (
    <>
      <section className="event-hero page-hero">
        <div className="page-width event-hero-grid">
          <Reveal>
            <p className="eyebrow">02 / A table full of happy</p>
            <h1 className="hero-title">
              RAME
              <br />
              RAME
              <br />
              MAKIN
              <br />
              <span className="text-cream">ENAK.</span>
            </h1>
            <p className="hero-description">
              Kamu punya momennya.
              <br />
              Kita bantu urusan dimsumnya.
            </p>
            <a href="#rencana-event" className="button button-green">
              Ceritakan acaramu
              <ArrowDown size={18} />
            </a>
          </Reveal>
          <Reveal className="event-hero-art" delay={0.1}>
            <div className="event-photo">
              <img
                src="/assets/images/dimsum-isi-16-mentai.png"
                alt="Dimsum mentai untuk sajian bersama"
              />
              <div className="event-photo-caption">
                <span>GOOD COMPANY.</span>
                <span>GREAT DIMSUM.</span>
              </div>
            </div>
            <div className="event-ticket">
              <span>DHD / EVENT</span>
              <Spark />
              <strong>
                LET'S
                <br />
                CELEBRATE!
              </strong>
              <span>YOUR MOMENT. OUR DIMSUM.</span>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="page-width section-space event-types">
        <Reveal>
          <p className="eyebrow">Ada acara apa?</p>
          <h2 className="editorial-heading">
            Setiap momen
            <br />
            punya <span className="handwritten">rasa.</span>
          </h2>
          <p>
            Dari kumpul keluarga sampai acara satu kantor. Pilih momennya, lalu
            cerita kebutuhannya.
          </p>
        </Reveal>
        <div className="event-type-list">
          {events.map((event, index) => (
            <button
              type="button"
              key={event.name}
              aria-pressed={eventType === event.name}
              onClick={() => setEventType(event.name)}
              className={eventType === event.name ? "selected" : ""}
            >
              <span className="list-index">0{index + 1}</span>
              <span>
                <strong>{event.name}</strong>
                <small>{event.subtitle}</small>
              </span>
              <span className="selection-circle">
                {eventType === event.name ? (
                  <Check size={20} />
                ) : (
                  <ArrowUpRight size={20} />
                )}
              </span>
            </button>
          ))}
        </div>
      </section>
      <Marquee text="YOUR MOMENT. OUR DIMSUM." />
      <section id="rencana-event" className="event-planner section-space">
        <div className="page-width planner-grid">
          <Reveal>
            <p className="eyebrow">Let's make it happen</p>
            <h2 className="editorial-heading">
              Mulai dari
              <br />
              cerita kamu.
            </h2>
            <p>
              Isi rencana singkatmu. Pesannya akan siap dibuka di WhatsApp untuk
              dibahas bersama tim.
            </p>
            <div className="planner-note">
              <Spark />
              <span>
                Penawaran dan jadwal
                <br />
                dikonfirmasi oleh tim.
              </span>
            </div>
          </Reveal>
          <form onSubmit={submit} className="inquiry-form">
            <label>
              Acara kamu
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
              >
                {events.map((event) => (
                  <option key={event.name}>{event.name}</option>
                ))}
              </select>
            </label>
            <div className="form-pair">
              <label>
                Tanggal acara
                <input
                  type="date"
                  min={minDate}
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </label>
              <label>
                Perkiraan tamu
                <input
                  type="number"
                  min="1"
                  max="100000"
                  placeholder="Contoh: 100"
                  required
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                />
              </label>
            </div>
            <label>
              Kota / lokasi acara
              <input
                type="text"
                maxLength={180}
                placeholder="Contoh: Cileungsi, Bogor"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </label>
            <label>
              Ada catatan tambahan? <span>(opsional)</span>
              <textarea
                maxLength={600}
                placeholder="Preferensi menu, perkiraan budget, atau kebutuhan lain..."
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </label>
            <button type="submit" className="button button-green">
              Siapkan pesan WhatsApp
              <ArrowUpRight size={20} />
            </button>
            <p className="form-note">
              Pesan bisa kamu periksa sebelum dikirim. Ini belum menjadi
              pemesanan.
            </p>
          </form>
        </div>
      </section>
      <section className="page-width section-space faq-section">
        <Reveal>
          <p className="eyebrow">Tentang layanan event</p>
          <h2 className="editorial-heading">
            Tanya dulu,
            <br />
            boleh banget.
          </h2>
        </Reveal>
        <Faq
          items={[
            {
              question: "Berapa minimum pesanan untuk event?",
              answer:
                "Minimum pesanan disesuaikan dengan kebutuhan acara dan dikonfirmasi tim saat konsultasi. Ceritakan jumlah tamu atau perkiraan jumlah dimsum yang dibutuhkan.",
            },
            {
              question: "Bisa untuk acara di luar kota?",
              answer:
                "Sampaikan lokasi acaramu ke tim. Jangkauan layanan dan opsi penyajian perlu dipastikan sebelum penawaran.",
            },
            {
              question: "Apakah tanggal saya langsung terpesan?",
              answer:
                "Belum. Rencana yang dikirim adalah permintaan konsultasi. Tim akan mengonfirmasi jadwal, sajian, harga, serta langkah pemesanan.",
            },
          ]}
        />
      </section>
    </>
  );
}

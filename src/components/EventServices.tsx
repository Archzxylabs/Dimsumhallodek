import { useEffect, useState, type FormEvent } from "react";
import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import { Faq, Marquee, Reveal, Spark } from "./DesignElements";
import { whatsappUrl } from "../lib/business";
import { isStringRecord, useSessionState } from '../lib/useSessionState';
import { InquiryFeedback } from './InquiryFeedback';

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

const emptyDraft = { eventType: 'Belum menentukan', date: '', dateUndecided: 'yes', guests: '', location: '', notes: '', serving: 'Belum menentukan' };
type EventDraft = typeof emptyDraft;

export function EventServices() {
  const [draft, setDraft] = useSessionState('event', emptyDraft, (v): v is EventDraft => isStringRecord(v, Object.keys(emptyDraft)) && (v.eventType === 'Belum menentukan' || events.some((e) => e.name === v.eventType)));
  const { eventType, date, dateUndecided, guests, location, notes, serving } = draft;
  const [preparedUrl, setPreparedUrl] = useState('');
  useEffect(() => { setPreparedUrl(''); }, [draft]);
  const update = (field: keyof EventDraft, value: string) => setDraft((previous) => ({ ...previous, [field]: value }));
  const today = new Date();
  const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const message = [
      "Halo Bang Mus, saya ingin konsultasi layanan event Dimsum Hallo Dek.",
      `Acara: ${eventType}`,
      `Tanggal: ${date && dateUndecided !== 'yes' ? new Date(`${date}T12:00:00`).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Belum ditentukan'}`,
      `Perkiraan tamu: ${guests ? `${guests} orang` : 'Belum ditentukan'}`,
      `Lokasi: ${location.trim() || 'Belum ditentukan'}`,
      `Kebutuhan penyajian: ${serving}`,
      notes.trim() ? `Catatan: ${notes.trim()}` : "",
      "Mohon konfirmasi ketersediaan, pilihan sajian, dan penawaran resmi.",
    ]
      .filter(Boolean)
      .join("\n");
    const url = whatsappUrl(message);
    setPreparedUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  };
  return (
    <>
      <section className="event-hero page-hero">
        <div className="page-width event-hero-grid">
          <Reveal>
            <p className="eyebrow">02 / Dimsum untuk acara kamu</p>
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
              Kita bantu rencanakan sajian dimsumnya.
            </p>
            <a href="#rencana-event" className="button button-green">
              Ceritakan acaramu
              <ArrowDown size={18} />
            </a>
          </Reveal>
          <Reveal className="event-hero-art" delay={0.1}>
            <div className="event-photo">
              <img
                src="/assets/optimized/platter-800.webp"
                srcSet="/assets/optimized/platter-480.webp 480w, /assets/optimized/platter-800.webp 768w"
                sizes="(max-width: 767px) calc(100vw - 40px), 45vw"
                decoding="async"
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
          <div className="service-explainer">
            <h3>Mulai dari jumlah tamu dan lokasi.</h3>
            <p>Tim membantu membahas pilihan dimsum, jumlah pesanan, serta cara menerima sajian. Minimum pesanan, area layanan, dan waktu persiapan dikonfirmasi sebelum memesan.</p>
            <p>Butuh booth atau penyajian di lokasi? Masukkan kebutuhanmu agar tim memastikan pilihan yang tersedia.</p>
          </div>
        </Reveal>
        <div className="event-type-list">
          {events.map((event, index) => (
            <button
              type="button"
              key={event.name}
              aria-pressed={eventType === event.name}
              onClick={() => update('eventType', event.name)}
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
          <a href="#rencana-event" className="event-next button button-green">Lanjut rencana {eventType === 'Belum menentukan' ? 'acara' : eventType} <ArrowDown size={18} /></a>
        </div>
      </section>
      <Marquee text="YOUR MOMENT. OUR DIMSUM." />
      <section id="rencana-event" className="event-planner section-space">
        <div className="page-width planner-grid">
          <Reveal>
            <p className="eyebrow">Rencanakan bersama tim</p>
            <h2 className="editorial-heading">
              Mulai dari
              <br />
              cerita kamu.
            </h2>
            <p>
              Isi rencana singkatmu. Pesannya akan siap dibuka di WhatsApp untuk
              dibahas bersama tim. Tanggal, jumlah tamu, dan lokasi boleh menyusul kalau belum pasti.
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
            <div className="form-pair">
              <label>
                Acara kamu
                <select
                  value={eventType}
                  onChange={(e) => update('eventType', e.target.value)}
                >
                  <option>Belum menentukan</option>
                  {events.map((event) => (
                    <option key={event.name}>{event.name}</option>
                  ))}
                </select>
              </label>
              <label>
                Kota / lokasi acara <span>(opsional)</span>
                <input
                  type="text"
                  maxLength={180}
                  placeholder="Contoh: Cileungsi, Bogor"
                  value={location}
                  onChange={(e) => update('location', e.target.value)}
                />
              </label>
            </div>
            <div className="form-pair">
              <label>
                Tanggal acara <span>(opsional)</span>
                <input
                  type="date"
                  min={minDate}
                  disabled={dateUndecided === 'yes'}
                  value={date}
                  onChange={(e) => update('date', e.target.value)}
                />
              </label>
              <label>
                Perkiraan tamu <span>(opsional)</span>
                <input
                  type="number"
                  min="1"
                  max="100000"
                  placeholder="Contoh: 100"
                  value={guests}
                  onChange={(e) => update('guests', e.target.value)}
                />
              </label>
            </div>
            <label className="checkbox-label"><input type="checkbox" checked={dateUndecided === 'yes'} onChange={(e) => update('dateUndecided', e.target.checked ? 'yes' : 'no')} />Tanggal belum ditentukan</label>
            <div className="form-pair">
              <label>Kebutuhan penyajian
                <select value={serving} onChange={(e) => update('serving', e.target.value)}>
                  <option>Belum menentukan</option><option>Pesanan untuk dibagikan</option><option>Ingin menanyakan penyajian di lokasi</option><option>Kebutuhan lain, saya tulis di catatan</option>
                </select>
              </label>
              <label>
                Ada catatan tambahan? <span>(opsional)</span>
                <textarea
                  maxLength={600}
                  placeholder="Preferensi menu, perkiraan budget, atau kebutuhan lain..."
                  rows={2}
                  value={notes}
                  onChange={(e) => update('notes', e.target.value)}
                />
              </label>
            </div>
            <button type="submit" className="button button-green">
              Siapkan pesan WhatsApp
              <ArrowUpRight size={20} />
            </button>
            <p className="form-note">
              Pesan bisa kamu periksa sebelum dikirim. Ini belum menjadi
              pemesanan.
            </p>
            <InquiryFeedback url={preparedUrl} />
            <div className="draft-controls"><span>Draf tersimpan di tab ini.</span><button type="button" onClick={() => { setDraft(emptyDraft); setPreparedUrl(''); }}>Hapus draf</button></div>
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

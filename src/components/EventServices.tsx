import { CalendarDays, MessageCircle } from 'lucide-react';

const events = [
  { title: 'Wedding', detail: 'Sajian dimsum hangat untuk resepsi dan pesta keluarga.' },
  { title: 'Sekolah', detail: 'Pilihan konsumsi untuk kegiatan, perayaan, dan acara sekolah.' },
  { title: 'Kantor', detail: 'Snack dan sajian untuk rapat, gathering, atau acara tim.' },
  { title: 'Khitanan', detail: 'Hidangan praktis yang bisa disesuaikan dengan kebutuhan acara.' },
  { title: 'Lamaran', detail: 'Pilihan dimsum untuk momen kumpul dua keluarga.' },
];

export function EventServices() {
  return (
    <section id="events" className="bg-[#FFF9ED] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-10 max-w-3xl space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#F6C94B] px-4 py-1.5 text-xs font-extrabold text-[#35462B]"><CalendarDays className="h-4 w-4" /> Layanan Event</span>
          <h2 className="font-display text-3xl font-semibold text-[#35462B] sm:text-5xl">Dimsum buat acara apa pun</h2>
          <p className="text-[#35462B]/70">Ceritakan jumlah tamu, tanggal, dan lokasi. Tim Dimsum Hallo Dek akan bantu pilih sajian yang cocok.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {events.map((event, index) => (
            <article key={event.title} className="rounded-3xl border border-[#35462B]/10 bg-white p-6 shadow-[0_8px_28px_rgba(40,57,32,0.06)]">
              <span className="font-display text-3xl font-bold text-[#E96B2B]">0{index + 1}</span>
              <h3 className="mt-3 font-display text-xl font-semibold text-[#35462B]">{event.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#35462B]/70">{event.detail}</p>
            </article>
          ))}
        </div>
        <a href="https://wa.me/6285863646267?text=Halo%20Minsum%2C%20saya%20mau%20tanya%20layanan%20event" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#E96B2B] px-6 py-3.5 text-sm font-extrabold text-white hover:bg-[#C45120]"><MessageCircle className="h-4 w-4" /> Konsultasi event</a>
      </div>
    </section>
  );
}

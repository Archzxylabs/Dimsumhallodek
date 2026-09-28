import { CalendarDays, MessageCircle } from 'lucide-react';

const events = [
  { title: 'Wedding / Birthday Party', description: 'Pengaturan acara yang fleksibel untuk berbagai skala pernikahan dan pesta.' },
  { title: 'Meeting / Corporate Event', description: 'Sajian berkualitas, pelayanan profesional, dan pilihan paket yang dapat disesuaikan.' },
  { title: 'Others / Special Activation', description: 'Solusi sajian yang dapat disesuaikan dengan berbagai jenis acara.' },
];

export function EventServices() {
  return (
    <section id="events" className="bg-[#FFF9ED] py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#F6C94B] px-4 py-1.5 text-xs font-extrabold text-[#35462B]">
            <CalendarDays className="w-4 h-4" /> Event & Party
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#35462B]">Dimsum untuk momen spesial</h2>
          <p className="text-[#35462B]/70">Tanyakan pilihan sajian dan layanan acara langsung ke tim Dimsum Hallo Dek.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {events.map((event) => (
            <article key={event.title} className="rounded-3xl border border-[#35462B]/10 bg-white p-7 shadow-[0_8px_28px_rgba(40,57,32,0.06)]">
              <h3 className="font-display text-xl font-semibold text-[#35462B]">{event.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#35462B]/70">{event.description}</p>
            </article>
          ))}
        </div>
        <a href="https://wa.me/6285863646267" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#E96B2B] px-6 py-3.5 text-sm font-extrabold text-white hover:bg-[#C45120]">
          <MessageCircle className="w-4 h-4" /> Tanya kebutuhan acara
        </a>
      </div>
    </section>
  );
}

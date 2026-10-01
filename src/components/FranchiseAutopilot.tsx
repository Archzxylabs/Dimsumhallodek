import { FileText, MessageCircle, Check } from 'lucide-react';

const packages = [
  { name: 'Flexible', price: 'Rp 10 juta', description: 'Pilihan kerja sama untuk yang ingin mengelola lebih banyak hal sendiri.', points: ['Format kerja sama fleksibel', 'Diskusi kebutuhan lokasi', 'Dukungan sesuai kesepakatan'] },
  { name: 'Collaborative', price: 'Rp 20 juta', description: 'Pengelolaan usaha dibagi bersama tim Dimsum Hallo Dek.', points: ['Peran mitra dan tim disepakati', 'Kolaborasi operasional', 'Pendampingan sesuai kebutuhan'] },
  { name: 'Full Managed', price: 'Rp 35 juta', description: 'Opsi bagi mitra yang ingin operasional lebih banyak ditangani tim.', points: ['Pengelolaan oleh tim', 'Pemantauan berkala', 'Skema kerja sama dibahas langsung'] },
];

export function FranchiseAutopilot() {
  return (
    <section id="franchise" className="bg-[#35462B] py-20 text-[#FFF9ED] sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex rounded-full bg-[#F6C94B] px-4 py-1.5 text-xs font-extrabold text-[#35462B]">Kemitraan Dimsum Hallo Dek</span>
          <h2 className="font-display text-3xl font-semibold leading-tight sm:text-5xl">Pilih cara bermitra yang cocok buat kamu</h2>
          <p className="text-white/75">Tiga pilihan kemitraan: Flexible, Collaborative, dan Full Managed. Detail peran, fasilitas, serta penawaran final dibahas bersama tim.</p>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {packages.map((item) => (
            <article key={item.name} className="flex flex-col rounded-[1.75rem] border border-white/15 bg-[#455934] p-7">
              <h3 className="font-display text-2xl font-semibold">{item.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/75">{item.description}</p>
              <p className="mt-6 text-xs font-bold uppercase tracking-wider text-[#F6C94B]">Contoh harga mulai dari</p>
              <p className="font-display text-3xl font-semibold">{item.price}</p>
              <ul className="mt-6 flex-1 space-y-3 text-sm text-white/85">{item.points.map((point) => <li key={point} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#F6C94B]" />{point}</li>)}</ul>
              <a href={`https://wa.me/6285802854744?text=${encodeURIComponent(`Halo, saya ingin tanya kemitraan ${item.name} Dimsum Hallo Dek.`)}`} target="_blank" rel="noreferrer" className="mt-7 inline-flex justify-center rounded-full bg-[#F6C94B] px-5 py-3 text-sm font-extrabold text-[#283920] hover:bg-[#FFDA72]">Tanya paket {item.name}</a>
            </article>
          ))}
        </div>
        <p className="mt-5 text-xs text-white/65">* Angka dan rincian di atas adalah contoh untuk demo website, bukan harga atau penawaran resmi.</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href="/assets/Bergabunglah_bersama_kemitraan_DHD.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-bold hover:bg-white/10"><FileText className="h-4 w-4" /> Lihat deck kemitraan</a>
          <a href="https://wa.me/6285802854744" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-bold hover:bg-white/10"><MessageCircle className="h-4 w-4" /> Konsultasi dengan tim</a>
        </div>
      </div>
    </section>
  );
}

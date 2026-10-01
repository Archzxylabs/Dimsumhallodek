import { Gift, MessageCircle, Snowflake, CakeSlice } from 'lucide-react';

const products = [
  { name: 'Dimsum Cake', note: 'Bisa tambah dekorasi nama', description: 'Alternatif kue ulang tahun yang gurih, cocok untuk dirayakan bareng.', price: 'Rp 150.000', icon: CakeSlice, image: '/assets/processed_dishes/cake_tower.png' },
  { name: 'Dimsum Bouquet', note: 'Bisa tambah dekorasi nama', description: 'Hadiah beda dari biasanya untuk ulang tahun, wisuda, dan momen spesial.', price: 'Rp 120.000', icon: Gift, image: '' },
  { name: 'Dimsum Frozen', note: 'Stok di rumah', description: 'Pilihan dimsum beku yang praktis disiapkan kapan pun kamu mau.', price: 'Rp 45.000', icon: Snowflake, image: '' },
];

export function SignatureProducts() {
  return (
    <section id="products" className="bg-[#F8EFD9] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-10 max-w-3xl space-y-3">
          <span className="inline-flex rounded-full bg-[#E96B2B] px-4 py-1.5 text-xs font-extrabold text-white">Lebih dari dimsum harian</span>
          <h2 className="font-display text-3xl font-semibold text-[#35462B] sm:text-5xl">Buat hadiah, perayaan, sampai stok di rumah</h2>
          <p className="text-[#35462B]/70">Pilih bentuk yang cocok untuk momennya. Untuk cake dan bouquet, nama penerima bisa ikut dihias.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <article key={product.name} className="overflow-hidden rounded-[1.75rem] bg-white shadow-[0_12px_35px_rgba(40,57,32,0.08)]">
                <div className="relative flex h-56 items-center justify-center overflow-hidden bg-[#F6C94B]/30">
                  {product.image ? <img src={product.image} alt="Contoh tampilan Dimsum Cake" loading="lazy" className="h-full w-full object-contain p-3" /> : <div className="flex h-32 w-32 items-center justify-center rounded-full bg-[#FFF9ED] shadow-lg"><Icon className="h-16 w-16 text-[#E96B2B]" strokeWidth={1.5} /></div>}
                  <span className="absolute bottom-4 left-4 rounded-full bg-[#35462B] px-3 py-1 text-xs font-bold text-white">{product.note}</span>
                </div>
                <div className="p-7">
                  <h3 className="font-display text-2xl font-semibold text-[#35462B]">{product.name}</h3>
                  <p className="mt-2 min-h-14 text-sm leading-relaxed text-[#35462B]/70">{product.description}</p>
                  <p className="mt-5 text-xs font-bold uppercase tracking-wide text-[#35462B]/55">Contoh harga mulai dari</p>
                  <p className="font-display text-2xl font-semibold text-[#E96B2B]">{product.price}</p>
                  <a href={`https://wa.me/6285863646267?text=${encodeURIComponent(`Halo Minsum, saya mau tanya ${product.name}.`)}`} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#35462B] px-5 py-3 text-sm font-extrabold text-white hover:bg-[#283920]"><MessageCircle className="h-4 w-4" /> Tanya produk</a>
                </div>
              </article>
            );
          })}
        </div>
        <p className="mt-5 text-xs text-[#35462B]/65">* Harga adalah angka dummy untuk demo. Ukuran, isi, desain, dan harga resmi dikonfirmasi lewat tim.</p>
      </div>
    </section>
  );
}

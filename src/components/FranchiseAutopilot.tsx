import { FileText, MessageCircle } from 'lucide-react';

const OFFICIAL_DECK = 'https://drive.google.com/file/d/1se92qGoarPTBUqEQzzBxeCuLIwXdvhkl/view?usp=sharing';

export function FranchiseAutopilot() {
  return (
    <section id="franchise" className="bg-[#35462B] py-20 sm:py-24 text-[#FFF9ED]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2 lg:items-center lg:px-12">
        <div className="space-y-5">
          <span className="inline-flex rounded-full bg-[#F6C94B] px-4 py-1.5 text-xs font-extrabold text-[#35462B]">Bergabunglah Bersama Kami</span>
          <h2 className="font-display text-3xl font-semibold leading-tight sm:text-5xl">Tertarik jadi bagian dari Dimsum Hallo Dek?</h2>
          <p className="max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
            Kenali peluang kerja sama melalui deck kemitraan resmi. Untuk informasi paket dan ketentuan terbaru, hubungi tim Dimsum Hallo Dek langsung.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a href={OFFICIAL_DECK} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#F6C94B] px-6 py-3.5 text-sm font-extrabold text-[#283920] hover:bg-[#FFDA72]">
              <FileText className="h-4 w-4" /> Lihat deck kemitraan
            </a>
            <a href="https://wa.me/6285863646267" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-sm font-extrabold text-white hover:bg-white/10">
              <MessageCircle className="h-4 w-4" /> Tanya Minsum
            </a>
          </div>
        </div>
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#455934] p-4 shadow-2xl sm:p-6">
          <img src="/assets/images/705607540_27168852229377910_5131463697530373815_n.jpg" alt="Suasana gerai Dimsum Hallo Dek" className="mx-auto max-h-[430px] w-full rounded-2xl object-cover object-center" />
        </div>
      </div>
    </section>
  );
}

import { MapPin, Phone, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#283920] text-[#FFF9ED]/75 border-t border-[#FFF9ED]/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full overflow-hidden bg-[#F6C94B]">
                <img
                  src="/assets/images/cropped-cropped-Desain-tanpa-judul-2.png"
                  alt="Dimsum Hallo Dek"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-display font-black text-white text-base tracking-tight">
                  DIMSUM HALLO DEK
                </h4>
                <p className="text-[10px] text-[#F6C94B] font-semibold tracking-wider uppercase">
                  PT MERZA PERINTIS SUKSES
                </p>
              </div>
            </div>
            <p className="text-xs text-white/50 leading-relaxed">
              Dimsum ayam hangat dengan saus melimpah untuk menemani hari-harimu. Temukan kami di Bogor, Bekasi, dan Sukabumi.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h5 className="font-display font-bold text-white text-sm tracking-wider uppercase">
              Navigasi Cepat
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#showcase" className="hover:text-amber-400 transition-colors">
                  Menu Favorit
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-amber-400 transition-colors">
                  Event & Party
                </a>
              </li>
              <li>
                <a href="#locations" className="hover:text-amber-400 transition-colors">
                  Cari Gerai
                </a>
              </li>
              <li>
                <a href="#franchise" className="hover:text-amber-400 transition-colors">
                  Jadi Mitra
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Head Office */}
          <div className="space-y-3">
            <h5 className="font-display font-bold text-white text-sm tracking-wider uppercase">
              Alamat Kantor
            </h5>
            <div className="text-xs space-y-2 text-white/50">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Jl. Raya Permata Cibubur No.3 Blok B4, Cileungsi, Kab. Bogor, Jawa Barat 16820
                </span>
              </p>
              <p className="text-[11px] text-white/50 pl-6">
                Jam Operasional: Senin - Sabtu, 08:00 - 16:00 WIB
              </p>
            </div>
          </div>

          {/* Col 4: Contacts & Social */}
          <div className="space-y-3">
            <h5 className="font-display font-bold text-white text-sm tracking-wider uppercase">
              Kontak Resmi "Minsum"
            </h5>
            <ul className="space-y-2 text-xs text-white/60">
              <li>
                <a
                  href="https://wa.me/+6285863646267"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-amber-400 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#F6C94B]" />
                  <span>Marketing & Sales: +62 858-6364-6267</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/p/DYwSSl2hiW4/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-amber-400 transition-colors"
                >
                  <svg className="w-3.5 h-3.5 text-[#F6C94B] fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>Cabang Dayeuh Luhur di Instagram</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} PT Merza Perintis Sukses. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            Dibuat dengan <Heart className="w-3 h-3 text-[#E96B2B] fill-[#E96B2B]" /> dan selera yang happy.
          </p>
        </div>
      </div>
    </footer>
  );
};

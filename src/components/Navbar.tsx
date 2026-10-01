import React, { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';

const links = [
  { href: '#showcase', label: 'Menu Favorit' },
  { href: '#products', label: 'Produk' },
  { href: '#events', label: 'Event' },
  { href: '#franchise', label: 'Jadi Mitra' },
  { href: '#locations', label: 'Cari Gerai' },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FFF9ED]/95 border-b border-[#35462B]/10 shadow-[0_4px_24px_rgba(40,57,32,0.07)] backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-[76px] flex items-center justify-between gap-5">
        <a href="#showcase" className="flex items-center gap-3 shrink-0">
          <span className="w-11 h-11 rounded-full overflow-hidden bg-[#F6C94B] border-2 border-[#35462B]/15 shadow-sm">
            <img src="/assets/images/cropped-cropped-Desain-tanpa-judul-2.png" alt="Logo Dimsum Hallo Dek" className="w-full h-full object-cover" />
          </span>
          <span>
            <strong className="block font-display text-lg sm:text-xl font-semibold leading-none text-[#35462B]">Dimsum Hallo Dek</strong>
            <small className="block text-[10px] sm:text-xs font-extrabold text-[#CB5B25] mt-0.5">#AutoHappy Setiap Hari</small>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-7 text-sm font-extrabold text-[#35462B]">
          {links.map((link) => <a key={link.href} href={link.href} className="hover:text-[#D85D22] transition-colors">{link.label}</a>)}
        </nav>

        <a href="https://wa.me/+6285863646267?text=Halo%20Minsum!%20Aku%20mau%20tanya%20menu%20dan%20pesan%20dimsum" target="_blank" rel="noreferrer" className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E96B2B] hover:bg-[#CF5720] text-white font-extrabold text-sm shadow-[0_5px_0_#B84E20] transition-colors">
          <Phone className="w-4 h-4" /> Pesan via WhatsApp
        </a>

        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'} aria-expanded={mobileMenuOpen} className="lg:hidden p-2 rounded-xl border border-[#35462B]/15 text-[#35462B]">
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <nav className="lg:hidden px-6 pb-6 pt-3 bg-[#FFF9ED] border-t border-[#35462B]/10 flex flex-col gap-4 text-[#35462B] font-extrabold">
          {links.map((link) => <a key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}>{link.label}</a>)}
          <a href="https://wa.me/+6285863646267?text=Halo%20Minsum!%20Aku%20mau%20pesan%20dimsum" target="_blank" rel="noreferrer" className="text-center rounded-full bg-[#E96B2B] text-white py-3">Pesan via WhatsApp</a>
        </nav>
      )}
    </header>
  );
};

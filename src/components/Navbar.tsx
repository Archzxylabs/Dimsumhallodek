import React, { useState, useEffect } from 'react';
import { MapPin, Phone, SlidersHorizontal, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenCustomizer: () => void;
  accentColor: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCustomizer, accentColor }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0c]/90 backdrop-blur-xl py-3.5 border-b border-zinc-800/40 shadow-2xl'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg border border-amber-500/30 group-hover:scale-105 transition-transform bg-amber-400">
              <img
                src="/assets/images/cropped-cropped-Desain-tanpa-judul-2.png"
                alt="Dimsum Hallo Dek Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-display font-black text-lg tracking-tight text-white">
                DIMSUM HALLO DEK
              </div>
              <p className="text-[10px] tracking-wider text-amber-300/80 font-semibold uppercase -mt-0.5">
                #AutoHappy Setiap Hari
              </p>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80 select-none">
            <a href="#showcase" className="hover:text-amber-400 transition-colors outline-none focus:outline-none">
              Menu Showcase
            </a>
            <button
              onClick={onOpenCustomizer}
              className="hover:text-amber-400 transition-colors flex items-center gap-1.5 outline-none focus:outline-none"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
              Racik Dimsum Dek
            </button>
            <a href="#locations" className="hover:text-amber-400 transition-colors flex items-center gap-1 outline-none focus:outline-none">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              Lokasi 27+ Gerai
            </a>
            <a href="#franchise" className="hover:text-amber-400 transition-colors flex items-center gap-1 outline-none focus:outline-none">
              Kemitraan Autopilot
              <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                PROFIT 30%
              </span>
            </a>
          </nav>

          {/* Action Button Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://wa.me/+6285863646267?text=Halo%20Minsum!%20Gua%20mau%20tanya%20menu%20dan%20order%20dimsum"
              target="_blank"
              rel="noreferrer"
              style={{ backgroundColor: accentColor }}
              className="px-4 py-2 rounded-full text-black font-extrabold text-xs tracking-wider uppercase transition-transform hover:scale-105 shadow-lg flex items-center gap-1.5 outline-none focus:outline-none"
            >
              <Phone className="w-3.5 h-3.5 fill-black" />
              Chat Minsum
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800 outline-none focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-950/98 border-b border-zinc-900 px-6 py-6 space-y-4 backdrop-blur-2xl">
          <a
            href="#showcase"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white hover:text-amber-400 font-semibold"
          >
            Menu Showcase
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCustomizer();
            }}
            className="block w-full text-left text-white hover:text-amber-400 font-semibold"
          >
            Racik Dimsum Dek (Customizer)
          </button>
          <a
            href="#locations"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white hover:text-amber-400 font-semibold"
          >
            Lokasi 27+ Gerai
          </a>
          <a
            href="#franchise"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white hover:text-amber-400 font-semibold"
          >
            Kemitraan Autopilot (Rp 28jt - 35jt)
          </a>
          <div className="pt-2">
            <a
              href="https://wa.me/+6285863646267?text=Halo%20Minsum!%20Gua%20mau%20tanya%20menu%20dan%20order%20dimsum"
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 rounded-xl bg-amber-400 text-black font-extrabold text-center block uppercase tracking-wider text-xs shadow-lg"
            >
              Chat Minsum via WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, MessageCircle, MapPin, Flame } from 'lucide-react';
import { MenuItem } from '../data/menuData';
import { FloatingGarnishes } from './FloatingGarnishes';

interface KineticShowcaseProps {
  items: MenuItem[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
}

export const KineticShowcase: React.FC<KineticShowcaseProps> = ({
  items,
  currentIndex,
  onSelectIndex,
}) => {
  const currentItem = items[currentIndex];
  const [direction, setDirection] = useState<number>(1);

  const handleNext = () => {
    setDirection(1);
    onSelectIndex((currentIndex + 1) % items.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    onSelectIndex((currentIndex - 1 + items.length) % items.length);
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  return (
    <section
      id="showcase"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden transition-colors duration-700 pt-28 pb-10"
      style={{
        background: `radial-gradient(circle at 65% 50%, ${currentItem.bgGradient.from} 0%, ${currentItem.bgGradient.via} 50%, ${currentItem.bgGradient.to} 100%)`,
      }}
    >
      <div className="absolute -right-24 top-16 w-[520px] h-[520px] rounded-full bg-[#FFF9ED]/[0.07] pointer-events-none" />
      <div className="absolute -left-32 bottom-2 w-80 h-80 rounded-full border-[40px] border-[#F6C94B]/10 pointer-events-none" />

      {/* Main Content Area */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 lg:px-12 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Menu Typography & Specs */}
          <div className="lg:col-span-5 order-1 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-5"
              >
                <p className="font-display text-xl sm:text-2xl text-[#F6C94B]">#AutoHappy Setiap Hari</p>
                <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-extrabold bg-[#F6C94B] text-[#35462B]">
                  Menu Unggulan
                </div>

                {/* Big Bold Headline */}
                <h1 className="font-display font-semibold text-5xl sm:text-6xl lg:text-7xl text-[#FFF9ED] tracking-tight leading-[1.02]">
                  {currentItem.name}
                </h1>

                {/* Tagline */}
                <p className="text-[#FFF9ED]/85 font-semibold text-lg leading-relaxed max-w-md">
                  {currentItem.description}
                </p>

                {/* Dual Action CTA Buttons */}
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <a
                    href="https://wa.me/6285863646267"
                    target="_blank"
                    rel="noreferrer"
                    style={{ backgroundColor: currentItem.accentColor }}
                    className="px-6 py-3.5 rounded-full text-[#283920] font-extrabold text-sm flex items-center gap-2 shadow-[0_5px_0_rgba(22,36,18,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all"
                  >
                    <MessageCircle className="w-4 h-4 stroke-[2.5]" />
                    Tanya & pesan via WhatsApp
                  </a>

                  <a
                    href="#locations"
                    className="px-5 py-3.5 rounded-full bg-[#FFF9ED]/10 hover:bg-[#FFF9ED]/20 text-[#FFF9ED] font-bold text-sm border border-[#FFF9ED]/35 flex items-center gap-2 transition-all"
                  >
                    <MapPin className="w-4 h-4 text-[#F6C94B]" />
                    Cari gerai terdekat
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Hero Dish 3D Kinetic Plate */}
          <div className="lg:col-span-7 order-2 flex items-center justify-center relative py-6">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 md:w-[460px] md:h-[460px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentItem.id}
                  custom={direction}
                  initial={{
                    opacity: 0,
                    scale: 0.82,
                    rotate: direction >= 0 ? -15 : 15,
                    x: direction >= 0 ? 90 : -90,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.85,
                    rotate: direction >= 0 ? 15 : -15,
                    x: direction >= 0 ? -90 : 90,
                  }}
                  transition={{
                    duration: 0.55,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="w-full h-full flex items-center justify-center relative"
                >
                  <div className="absolute inset-1 rounded-full bg-[#F6C94B]/80 scale-105" />

                  {/* Circular Plate Presentation */}
                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 4.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="relative w-full h-full rounded-full shadow-[0_24px_45px_-22px_rgba(11,25,9,0.55)] border-[10px] border-[#FFF9ED] p-1 bg-[#FFF9ED] z-10"
                  >
                    <img
                      src={currentItem.image}
                      alt={currentItem.name}
                      className="w-full h-full object-cover rounded-full drop-shadow-2xl select-none"
                    />

                    {/* Torched Floating Badge on Plate */}
                    {currentItem.torched && (
                      <div className="absolute top-3 right-1 bg-[#E96B2B] text-white text-xs font-extrabold px-3 py-2 rounded-full shadow-md flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 fill-[#F6C94B]" />
                        Panggang harum
                      </div>
                    )}
                  </motion.div>

                  {/* Floating Garnishes Orbiting the Plate (100% Synchronized With Plate Entrance) */}
                  <FloatingGarnishes menuId={currentItem.id} direction={direction} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar: Controllers & Pagination Pills */}
      <div className="relative z-30 max-w-7xl mx-auto w-full px-6 lg:px-12 pt-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-[#FFF9ED]/25 pt-6">
          
          {/* Arrow Controllers & Index Counter */}
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrev}
              aria-label="Menu sebelumnya"
              className="w-12 h-12 rounded-full bg-[#FFF9ED]/15 hover:bg-[#FFF9ED]/25 text-white flex items-center justify-center border border-[#FFF9ED]/30 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              aria-label="Menu berikutnya"
              className="w-12 h-12 rounded-full bg-[#FFF9ED]/15 hover:bg-[#FFF9ED]/25 text-white flex items-center justify-center border border-[#FFF9ED]/30 transition-all"
            >
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Numerical Counter */}
            <div className="font-display font-semibold text-sm text-[#FFF9ED]/80 pl-2">
              <span className="text-[#F6C94B] text-lg">{currentItem.index}</span>
              <span> / 0{items.length}</span>
            </div>
          </div>

          {/* Quick Pagination Tabs (Warmindo Authentic Clean Style) */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2 sm:pb-0 scrollbar-none">
            {items.map((item, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (idx !== currentIndex) {
                      setDirection(idx > currentIndex ? 1 : -1);
                      onSelectIndex(idx);
                    }
                  }}
                  className={`px-3 py-2 text-xs font-extrabold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#F6C94B] border-b-2'
                      : 'text-[#FFF9ED]/65 hover:text-[#FFF9ED] border-b-2 border-transparent'
                  }`}
                  style={isActive ? { borderColor: currentItem.accentColor } : {}}
                >
                  <span className="opacity-50">{item.index}</span>
                  <span>{item.name.replace('.', '')}</span>
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

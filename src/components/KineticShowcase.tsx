import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, SlidersHorizontal, MapPin, Flame } from 'lucide-react';
import { MenuItem } from '../data/menuData';
import { FloatingGarnishes } from './FloatingGarnishes';

interface KineticShowcaseProps {
  items: MenuItem[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
  onOpenCustomizer: (item: MenuItem) => void;
}

export const KineticShowcase: React.FC<KineticShowcaseProps> = ({
  items,
  currentIndex,
  onSelectIndex,
  onOpenCustomizer,
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
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden transition-colors duration-700 select-none pt-24 pb-8"
      style={{
        background: `radial-gradient(circle at 65% 50%, ${currentItem.bgGradient.from} 0%, ${currentItem.bgGradient.via} 50%, ${currentItem.bgGradient.to} 100%)`,
      }}
    >
      {/* Dynamic Ambient Blur Glows */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-[140px] opacity-35 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: currentItem.accentColor }}
      />
      <div
        className="absolute bottom-10 left-10 w-80 h-80 rounded-full blur-[120px] opacity-25 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: currentItem.secondaryColor }}
      />

      {/* Massive Watermark Typography in Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentItem.watermark}
            custom={direction}
            initial={{ opacity: 0, x: direction >= 0 ? 100 : -100, scale: 0.95 }}
            animate={{ opacity: 0.08, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: direction >= 0 ? -100 : 100, scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-[18vw] leading-none tracking-tighter text-white whitespace-nowrap uppercase select-none text-center"
          >
            {currentItem.watermark}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 lg:px-12 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Menu Typography & Specs */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                {/* Category Badge */}
                <div className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-black tracking-wider uppercase bg-black/40 border border-white/15 text-white backdrop-blur-md">
                  {currentItem.badge}
                </div>

                {/* Big Bold Headline */}
                <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[0.95] drop-shadow-sm">
                  {currentItem.name}
                </h1>

                {/* Tagline */}
                <p className="text-white/80 font-medium text-lg leading-relaxed max-w-md">
                  {currentItem.tagline}
                </p>

                {/* Flavor Notes Tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {currentItem.flavorNotes.map((note, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/10 text-white/90 border border-white/10"
                    >
                      {note}
                    </span>
                  ))}
                </div>

                {/* Price Display */}
                <div className="pt-2 flex items-baseline gap-3">
                  <span className="font-display font-black text-3xl sm:text-4xl text-white">
                    {currentItem.priceFormatted}
                  </span>
                  <span className="text-xs text-white/60 tracking-wider uppercase font-semibold">
                    / {currentItem.specs.portion}
                  </span>
                </div>

                {/* Dual Action CTA Buttons */}
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => onOpenCustomizer(currentItem)}
                    style={{ backgroundColor: currentItem.accentColor }}
                    className="px-6 py-3.5 rounded-2xl text-black font-black text-sm tracking-wider uppercase flex items-center gap-2 shadow-xl hover:scale-105 active:scale-95 transition-all"
                  >
                    <SlidersHorizontal className="w-4 h-4 stroke-[2.5]" />
                    Racik Dimsum Dek →
                  </button>

                  <a
                    href="#locations"
                    className="px-5 py-3.5 rounded-2xl bg-black/40 hover:bg-black/60 text-white font-bold text-sm tracking-wider uppercase border border-white/20 backdrop-blur-md flex items-center gap-2 transition-all"
                  >
                    <MapPin className="w-4 h-4 text-amber-400" />
                    Cari di Gerai Terdekat
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Hero Dish 3D Kinetic Plate */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex items-center justify-center relative py-6">
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
                  {/* Outer Glow Halo Ring */}
                  <div
                    className="absolute inset-4 rounded-full blur-2xl opacity-40 transition-colors duration-700"
                    style={{ backgroundColor: currentItem.accentColor }}
                  />

                  {/* Circular Plate Presentation */}
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 4.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="relative w-full h-full rounded-full shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] border-4 border-white/20 p-2 bg-gradient-to-b from-white/15 to-transparent backdrop-blur-sm z-10"
                  >
                    <img
                      src={currentItem.image}
                      alt={currentItem.name}
                      className="w-full h-full object-cover rounded-full drop-shadow-2xl select-none"
                    />

                    {/* Torched Floating Badge on Plate */}
                    {currentItem.specs.torched && (
                      <div className="absolute top-4 right-4 bg-orange-600/90 text-white text-[11px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full shadow-lg border border-orange-400/50 flex items-center gap-1 backdrop-blur-md">
                        <Flame className="w-3.5 h-3.5 fill-amber-300" />
                        TORCHED SMOKY
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/10 pt-6">
          
          {/* Arrow Controllers & Index Counter */}
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrev}
              aria-label="Previous menu"
              className="w-12 h-12 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center border border-white/10 transition-all hover:scale-105 active:scale-95 backdrop-blur-md outline-none focus:outline-none"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              aria-label="Next menu"
              className="w-12 h-12 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center border border-white/10 transition-all hover:scale-105 active:scale-95 backdrop-blur-md outline-none focus:outline-none"
            >
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Numerical Counter */}
            <div className="font-mono font-bold text-sm tracking-wider text-white/80 pl-2">
              <span className="text-white text-lg">{currentItem.index}</span>
              <span className="text-white/40"> / 0{items.length}</span>
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
                  className={`px-3 py-2 text-xs font-black tracking-wide uppercase transition-all whitespace-nowrap outline-none focus:outline-none flex items-center gap-1.5 ${
                    isActive
                      ? 'text-white border-b-2'
                      : 'text-white/45 hover:text-white/80 border-b-2 border-transparent'
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

import React, { useState } from 'react';
import { RotateCcw, Check } from 'lucide-react';
import { CUSTOMIZER_OPTIONS, MenuItem } from '../data/menuData';

export interface CustomRacikan {
  base: { id: string; name: string; pieces: number; price: number };
  sauces: { id: string; name: string; price: number; color: string }[];
  toppings: { id: string; name: string; price: number }[];
  totalPrice: number;
}

interface DimsumCustomizerProps {
  initialMenuItem?: MenuItem;
  onGenerateReceipt: (racikan: CustomRacikan) => void;
}

export const DimsumCustomizer: React.FC<DimsumCustomizerProps> = ({
  onGenerateReceipt,
}) => {
  const [selectedBase, setSelectedBase] = useState(CUSTOMIZER_OPTIONS.bases[1]); // Default 6 pcs
  const [selectedSauces, setSelectedSauces] = useState<string[]>([CUSTOMIZER_OPTIONS.sauces[0].id]); // Default Mentai
  const [selectedToppings, setSelectedToppings] = useState<string[]>([CUSTOMIZER_OPTIONS.toppings[0].id]); // Default Mozza

  const toggleSauce = (sauceId: string) => {
    if (selectedSauces.includes(sauceId)) {
      if (selectedSauces.length > 1) {
        setSelectedSauces(selectedSauces.filter((id) => id !== sauceId));
      }
    } else {
      setSelectedSauces([...selectedSauces, sauceId]);
    }
  };

  const toggleTopping = (toppingId: string) => {
    if (selectedToppings.includes(toppingId)) {
      setSelectedToppings(selectedToppings.filter((id) => id !== toppingId));
    } else {
      setSelectedToppings([...selectedToppings, toppingId]);
    }
  };

  const handleReset = () => {
    setSelectedBase(CUSTOMIZER_OPTIONS.bases[1]);
    setSelectedSauces([CUSTOMIZER_OPTIONS.sauces[0].id]);
    setSelectedToppings([CUSTOMIZER_OPTIONS.toppings[0].id]);
  };

  // Calculate total price
  const saucesCost = selectedSauces.reduce((sum, sId) => {
    const s = CUSTOMIZER_OPTIONS.sauces.find((item) => item.id === sId);
    return sum + (s?.price || 0);
  }, 0);

  const toppingsCost = selectedToppings.reduce((sum, tId) => {
    const t = CUSTOMIZER_OPTIONS.toppings.find((item) => item.id === tId);
    return sum + (t?.price || 0);
  }, 0);

  const totalPrice = selectedBase.price + saucesCost + toppingsCost;

  const handleProceed = () => {
    const activeSauces = CUSTOMIZER_OPTIONS.sauces.filter((s) => selectedSauces.includes(s.id));
    const activeToppings = CUSTOMIZER_OPTIONS.toppings.filter((t) => selectedToppings.includes(t.id));

    onGenerateReceipt({
      base: selectedBase,
      sauces: activeSauces,
      toppings: activeToppings,
      totalPrice,
    });
  };

  return (
    <section id="customizer" className="relative py-24 bg-[#FFF9ED] border-t border-[#35462B]/10 overflow-hidden">
      {/* Background Watermark Text */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 font-display font-semibold text-[14vw] text-[#35462B]/[0.04] select-none pointer-events-none whitespace-nowrap">
        RACIK SESUKAMU.
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#F6C94B] text-[#35462B] border border-[#E5B634]">
            Bikin sesuai seleramu
          </div>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#35462B] tracking-tight">
            Racik dimsum favoritmu
          </h2>
          <p className="text-[#35462B]/60 text-sm sm:text-base">
            Pilih porsi, saus, dan topping yang paling kamu suka. Lihat racikannya sebelum pesan ke Minsum.
          </p>
        </div>

        {/* Customizer Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Controls Column (Left) */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Step 1: Base Porsi */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-extrabold text-[#35462B] text-lg tracking-wide flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#F6C94B] text-[#35462B] text-xs font-semibold flex items-center justify-center">
                    1
                  </span>
                  Pilih Porsi Dimsum
                </h3>
                <span className="text-xs text-[#35462B]/50">100% Full Daging Ayam</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CUSTOMIZER_OPTIONS.bases.map((base) => {
                  const isSelected = selectedBase.id === base.id;
                  return (
                    <button
                      key={base.id}
                      onClick={() => setSelectedBase(base)}
                      className={`p-4 rounded-2xl text-left border transition-all ${
                        isSelected
                          ? 'bg-[#FFF1D5] border-[#E96B2B] shadow-sm'
                          : 'bg-white hover:bg-[#FFF4DE] border-[#35462B]/15'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold text-[#35462B] text-sm">{base.name}</p>
                          <p className="text-xs text-[#35462B]/60 mt-0.5">{base.desc}</p>
                        </div>
                        <span className="text-xs font-sans font-bold text-[#C45120]">
                          Rp {base.price.toLocaleString('id-ID')}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Signature Sauces */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-extrabold text-[#35462B] text-lg tracking-wide flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#F6C94B] text-[#35462B] text-xs font-semibold flex items-center justify-center">
                    2
                  </span>
                  Pilih Saus Lumer (Bisa Mix)
                </h3>
                <span className="text-xs text-[#C45120] font-medium">Bisa pilih lebih dari satu</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CUSTOMIZER_OPTIONS.sauces.map((sauce) => {
                  const isSelected = selectedSauces.includes(sauce.id);
                  return (
                    <button
                      key={sauce.id}
                      onClick={() => toggleSauce(sauce.id)}
                      className={`p-4 rounded-2xl text-left border flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-[#FFF1D5] border-[#E96B2B] shadow-sm'
                          : 'bg-white hover:bg-[#FFF4DE] border-[#35462B]/15'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="w-3.5 h-3.5 rounded-full"
                          style={{ backgroundColor: sauce.color }}
                        />
                        <span className="font-bold text-[#35462B] text-sm">{sauce.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-sans text-[#35462B]/60">
                          {sauce.price > 0 ? `+Rp ${sauce.price.toLocaleString('id-ID')}` : 'Gratis'}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-[#C45120] font-bold" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Toppings */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-extrabold text-[#35462B] text-lg tracking-wide flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#F6C94B] text-[#35462B] text-xs font-semibold flex items-center justify-center">
                    3
                  </span>
                  Ekstra Topping & Taburan
                </h3>
                <span className="text-xs text-[#35462B]/65">Dipanggang hingga harum</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CUSTOMIZER_OPTIONS.toppings.map((top) => {
                  const isSelected = selectedToppings.includes(top.id);
                  return (
                    <button
                      key={top.id}
                      onClick={() => toggleTopping(top.id)}
                      className={`p-4 rounded-2xl text-left border flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-[#FFF1D5] border-[#E96B2B] shadow-sm'
                          : 'bg-white hover:bg-[#FFF4DE] border-[#35462B]/15'
                      }`}
                    >
                      <div>
                        <p className="font-bold text-[#35462B] text-sm">{top.name}</p>
                        <p className="text-xs text-[#35462B]/60 mt-0.5">{top.desc}</p>
                      </div>
                      <div className="flex items-center gap-2 pl-2">
                        <span className="text-xs font-sans text-[#C45120] whitespace-nowrap">
                          +Rp {top.price.toLocaleString('id-ID')}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-[#C45120] font-bold" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Live Preview & Summary Card (Right) */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="rounded-3xl p-6 sm:p-8 bg-white border border-[#35462B]/15 shadow-[0_16px_40px_rgba(40,57,32,0.10)] space-y-6">
              
              {/* Plate Visual Render */}
              <div className="relative aspect-square w-full max-w-[280px] mx-auto rounded-full p-2 border-2 border-[#35462B]/20 bg-[#FFF9ED] flex items-center justify-center overflow-hidden">
                <img
                  src="/assets/processed_dishes/mentai_tartar.png"
                  alt="Ilustrasi dimsum untuk racikanmu"
                  className="w-full h-full object-cover rounded-full shadow-inner"
                />

                {/* Overlaid Animated Badges for selected sauces */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-4 text-center">
                  <div className="bg-[#35462B] px-4 py-1.5 rounded-full border border-[#35462B]/20 text-[11px] font-extrabold text-[#FFF9ED] shadow-md">
                    {selectedBase.pieces} PCS DIMSUM
                  </div>
                </div>
              </div>

              {/* Recipe Summary List */}
              <div className="border-t border-[#35462B]/10 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-[#35462B]/80">
                  <span>Base: {selectedBase.name}</span>
                  <span className="font-sans">Rp {selectedBase.price.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-[#35462B]/80">
                  <span>Saus ({selectedSauces.length} varian)</span>
                  <span className="font-sans">+{saucesCost.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-[#35462B]/80">
                  <span>Topping ({selectedToppings.length} varian)</span>
                  <span className="font-sans">+{toppingsCost.toLocaleString('id-ID')}</span>
                </div>
              </div>

              {/* Total Price Section */}
              <div className="border-t border-[#35462B]/10 pt-4 flex items-baseline justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#35462B]/50 font-bold">Total Racikan</p>
                  <p className="font-display font-semibold text-3xl sm:text-4xl text-[#C45120]">
                    Rp {totalPrice.toLocaleString('id-ID')}
                  </p>
                </div>

                <button
                  onClick={handleReset}
                  className="text-xs text-[#35462B]/50 hover:text-[#35462B] flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              </div>

              {/* Action: Open Digital Receipt */}
              <button
                onClick={handleProceed}
                className="w-full py-4 rounded-full bg-[#E96B2B] hover:bg-[#C45120] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-[0_5px_0_#B84E20] active:scale-[0.98] transition-all"
              >
                Lihat Nota Racikanku →
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

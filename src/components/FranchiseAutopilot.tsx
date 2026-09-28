import React, { useState } from 'react';
import { DollarSign, Briefcase, FileDown, CheckCircle2, Phone, TrendingUp, PackageCheck } from 'lucide-react';

export const FranchiseAutopilot: React.FC = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(25000000); // 25 Juta default

  // Financial simulation logic based on official deck
  const opex = Math.round(monthlyRevenue * 0.4); // ~40% opex (bahan baku, listrik, crew)
  const netProfit = monthlyRevenue - opex;
  const partnerShare = Math.round(netProfit * 0.3); // 30% Mitra
  const managementShare = Math.round(netProfit * 0.7); // 70% Manajemen

  return (
    <section id="franchise" className="py-24 bg-[#35462B] border-t border-white/10 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#F6C94B]/10 blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-[#F6C94B]/12 text-[#F6C94B] border border-[#F6C94B]/25">
            <Briefcase className="w-3.5 h-3.5" />
            Tumbuh bersama Dimsum Hallo Dek
          </div>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#FFF9ED] tracking-tight">
            Yuk, buka gerai bareng!
          </h2>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed">
            Jadi bagian dari keluarga Dimsum Hallo Dek. Tim pusat membantu menyiapkan kru, bahan baku, operasional, dan promosi gerai.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 text-[#FFE28C] border border-[#F6C94B]/25">
              ✓ Bagi Hasil Bersih: 70% Manajemen : 30% Mitra
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 text-[#FFE28C] border border-[#F6C94B]/25">
              ✓ Kontrak 3 Tahun (Tanpa Royalty Fee)
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 text-[#FFE28C] border border-[#F6C94B]/25">
              ✓ Laporan hasil usaha setiap bulan
            </span>
          </div>
        </div>

        {/* Investment Packages & Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-stretch">
          
          {/* Package 1: Ring 1 */}
          <div className="lg:col-span-6 p-8 rounded-3xl bg-[#455934] border border-white/10 hover:border-[#F6C94B]/50 transition-all flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 rounded-lg bg-[#F6C94B]/18 text-[#F6C94B] font-extrabold text-xs uppercase tracking-wider">
                Radius ≤ 15 KM (Area Produksi)
              </div>
              <h3 className="font-display font-black text-2xl text-white">
                Paket Gerai Area Dekat
              </h3>
              <p className="text-white/60 text-sm">
                Cocok untuk wilayah Cileungsi, Cibubur, Gunung Putri, dan sekitarnya dekat pusat logistik.
              </p>
              <div className="pt-2">
                <span className="text-xs uppercase tracking-wider text-white/50 block font-semibold">Investasi Awal:</span>
                <span className="font-display font-black text-4xl text-[#F6C94B]">
                  Rp 28.000.000
                </span>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10">
              <a
                href="https://wa.me/+6285802854744?text=Halo%20Tim%20Kemitraan%20DHD!%20Gua%20tertarik%20sama%20Paket%20Franchise%2028%20Juta%20(Radius%2015km)."
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 rounded-full bg-[#F6C94B] hover:bg-[#FFDA72] text-[#283920] font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <Phone className="w-4 h-4 fill-black" />
                Konsultasi Paket 28 Juta
              </a>
            </div>
          </div>

          {/* Package 2: Ring 2 */}
          <div className="lg:col-span-6 p-8 rounded-3xl bg-[#455934] border border-white/10 hover:border-[#F6C94B]/50 transition-all flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 rounded-lg bg-[#E96B2B]/20 text-[#FFB172] font-extrabold text-xs uppercase tracking-wider">
                Radius &gt; 25 KM (Outer Area)
              </div>
              <h3 className="font-display font-black text-2xl text-white">
                Paket Gerai Luar Area
              </h3>
              <p className="text-white/60 text-sm">
                Termasuk penyesuaian rantai pasok logistik, pengiriman booth jarak jauh (Bekasi, Bogor Kota, Sukabumi).
              </p>
              <div className="pt-2">
                <span className="text-xs uppercase tracking-wider text-white/50 block font-semibold">Investasi Awal:</span>
                <span className="font-display font-black text-4xl text-[#FFB172]">
                  Rp 35.000.000
                </span>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10">
              <a
                href="https://wa.me/+6285802854744?text=Halo%20Tim%20Kemitraan%20DHD!%20Gua%20tertarik%20sama%20Paket%20Franchise%2035%20Juta%20(Radius%2025km)."
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 rounded-full bg-[#E96B2B] hover:bg-[#F48143] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <Phone className="w-4 h-4 fill-black" />
                Konsultasi Paket 35 Juta
              </a>
            </div>
          </div>

        </div>

        {/* Facility Grid Checklist */}
        <div className="p-8 rounded-3xl bg-[#283920] border border-white/10 mb-16 shadow-xl space-y-6">
          <h4 className="font-display font-black text-xl text-white flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-[#F6C94B]" />
            Semua sudah disiapkan untuk mulai jualan
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-white/80">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#F6C94B] mt-1 shrink-0" />
              <span>1 Unit Booth Container Gerobak Eksklusif (150 x 60 x 200 cm)</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#F6C94B] mt-1 shrink-0" />
              <span>Kompor gas panggang 2-in-1 & panci kukusan stainless steel</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#F6C94B] mt-1 shrink-0" />
              <span>Papan menu dan banner promosi</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#F6C94B] mt-1 shrink-0" />
              <span>Tabung gas LPG, regulator, botol saus, capitan, dan torch burner</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#F6C94B] mt-1 shrink-0" />
              <span><strong>Free Bahan Baku Awal: 500 Pcs Dimsum</strong> + Seluruh Varian Saus</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#F6C94B] mt-1 shrink-0" />
              <span>Tablet kasir dan aplikasi laporan bulanan</span>
            </div>
          </div>
        </div>

        {/* Interactive ROI Calculator */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#455934] to-[#283920] border border-white/15 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#F6C94B] uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  Perkiraan bagi hasil bulanan
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
                  Coba hitung potensi hasilnya
                </h3>
                <p className="text-white/60 text-sm">
                  Geser untuk melihat ilustrasi pembagian hasil bersih per gerai.
                </p>
              </div>

              {/* Slider Control */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-white/50 font-semibold">Estimasi Omzet Gerai:</span>
                  <span className="font-sans font-bold text-xl text-white">
                    Rp {monthlyRevenue.toLocaleString('id-ID')} / bulan
                  </span>
                </div>
                <input
                  type="range"
                  min={15000000}
                  max={45000000}
                  step={1000000}
                  value={monthlyRevenue}
                  onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                  className="w-full h-2.5 bg-[#71805B] rounded-lg appearance-none cursor-pointer accent-[#F6C94B]"
                />
                <div className="flex justify-between text-[11px] text-white/40 font-sans">
                  <span>Rp 15 Jt</span>
                  <span>Rp 25 Jt (Rata-rata)</span>
                  <span>Rp 45 Jt</span>
                </div>
              </div>
            </div>

            {/* Results Breakdown */}
            <div className="lg:col-span-6 p-6 rounded-2xl bg-[#283920]/85 border border-white/10 space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-white/70">
                  <span>Perkiraan biaya operasional (40%)</span>
                  <span className="font-sans text-white/50">- Rp {opex.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Perkiraan laba bersih gerai</span>
                  <span className="font-sans text-white/90">Rp {netProfit.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="p-4 rounded-xl bg-[#F6C94B]/12 border border-[#F6C94B]/25">
                  <span className="text-xs uppercase font-extrabold text-[#F6C94B] block tracking-wider">
                    Perkiraan bagian mitra (30%):
                  </span>
                  <span className="font-display font-black text-3xl sm:text-4xl text-[#FFE28C]">
                    Rp {partnerShare.toLocaleString('id-ID')}
                    <span className="text-xs font-normal text-white/60 ml-2">/ bulan</span>
                  </span>
                </div>
                <p className="text-[11px] text-white/40 italic">
                  *Ini simulasi, bukan jaminan hasil. Pendapatan aktual bergantung pada performa gerai.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Download Deck & WhatsApp Action Bar */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/assets/Bergabunglah_bersama_kemitraan_DHD.pdf"
            download
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 border border-white/10 transition-all shadow-lg"
          >
            <FileDown className="w-4 h-4 text-[#F6C94B]" />
            Lihat proposal kemitraan
          </a>

          <a
            href="https://wa.me/+6285802854744?text=Halo%20Tim%20Kemitraan%20Dimsum%20Hallo%20Dek!%20Gua%20mau%20konsultasi%20peluang%20buka%20cabang%20kemitraan."
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-6 py-4 rounded-full bg-[#F6C94B] hover:bg-[#FFDA72] text-[#283920] font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl transition-all"
          >
            <Phone className="w-4 h-4 fill-black" />
            Tanya soal kemitraan
          </a>
        </div>

      </div>
    </section>
  );
};

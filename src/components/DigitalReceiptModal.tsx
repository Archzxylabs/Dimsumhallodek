import React, { useState, useRef, useEffect } from 'react';
import { X, Download, Share2, Phone, Check } from 'lucide-react';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import { CustomRacikan } from './DimsumCustomizer';

interface DigitalReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  racikan: CustomRacikan | null;
}

export const DigitalReceiptModal: React.FC<DigitalReceiptModalProps> = ({
  isOpen,
  onClose,
  racikan,
}) => {
  const [recipeName, setRecipeName] = useState('Andalan Anak Dek');
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E96B2B', '#F6C94B', '#FFF9ED', '#35462B'],
      });
    }
  }, [isOpen]);

  if (!isOpen || !racikan) return null;

  const handleDownloadImage = async () => {
    if (!receiptRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(receiptRef.current, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `Nota-Dimsum-${recipeName.replace(/\s+/g, '-').toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export image', err);
    } finally {
      setDownloading(false);
    }
  };

  const handleShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // WhatsApp Order Link generator
  const saucesText = racikan.sauces.map((s) => s.name).join(' + ');
  const toppingsText = racikan.toppings.length > 0 ? racikan.toppings.map((t) => t.name).join(', ') : 'Tanpa ekstra topping';
  
  const waMessage = encodeURIComponent(
    `Halo Minsum Dimsum Hallo Dek!\nAku mau pesan racikan: "${recipeName}"\n\n` +
    `• Porsi: ${racikan.base.name} (${racikan.base.pieces} pcs)\n` +
    `• Saus: ${saucesText}\n` +
    `• Topping: ${toppingsText}\n` +
    `• Estimasi Total: Rp ${racikan.totalPrice.toLocaleString('id-ID')}\n\n` +
    `Bisa tolong dicek gerai terdekat yang ready stock? Makasih!`
  );
  const waUrl = `https://wa.me/+6285863646267?text=${waMessage}`;

  const presets = ['Andalan Begadang', 'Mentai Sultan', 'Pelepas Penat Cibubur', 'Rame-Rame Dek'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#283920]/75 overflow-y-auto">
      <div className="relative w-full max-w-md my-8 rounded-3xl bg-[#FFF9ED] border border-[#35462B]/15 p-6 sm:p-8 shadow-2xl space-y-6 text-[#35462B]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#35462B]/10 hover:bg-[#35462B]/20 text-[#35462B] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1 pr-8">
          <div className="text-xs font-extrabold text-[#C45120]">
            Racikan Siap Dipesan
          </div>
          <h3 className="font-display font-semibold text-2xl text-[#35462B]">
            Ini racikanmu, Dek!
          </h3>
        </div>

        {/* Name input */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-[#35462B]/75 block">
            Beri Nama Racikanmu:
          </label>
          <input
            type="text"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            maxLength={30}
            className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#35462B]/20 text-[#35462B] font-bold text-sm focus:outline-none focus:border-[#E96B2B]"
          />
          {/* Quick presets */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {presets.map((p) => (
              <button
                key={p}
                onClick={() => setRecipeName(p)}
                className="text-[11px] px-3 py-1.5 rounded-full bg-[#F6C94B]/30 hover:bg-[#F6C94B]/60 text-[#35462B] border border-[#F6C94B]/40"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* The Receipt Thermal Card (Capturable Element) */}
        <div
          ref={receiptRef}
          className="bg-white text-[#35462B] p-6 rounded-2xl shadow-sm font-sans text-xs border border-[#35462B]/15 relative select-none"
        >
          {/* Receipt Top Header */}
          <div className="text-center space-y-1 pb-4 border-b border-dashed border-[#35462B]/30">
            <p className="font-display font-semibold text-lg tracking-tight text-[#35462B]">
              DIMSUM HALLO DEK
            </p>
            <p className="text-[10px] text-[#35462B]/70">PT MERZA PERINTIS SUKSES</p>
            <p className="text-[10px] text-[#35462B]/60">#AutoHappy Setiap Hari</p>
            <p className="text-[10px] text-[#35462B]/45 pt-1">
              {new Date().toLocaleDateString('id-ID', { dateStyle: 'medium' })} • {new Date().toLocaleTimeString('id-ID', { timeStyle: 'short' })}
            </p>
          </div>

          {/* Receipt Recipe Title */}
          <div className="py-3 text-center border-b border-dashed border-[#35462B]/30">
            <span className="text-[10px] text-[#35462B]/60 block">Nama racikan:</span>
            <span className="font-display font-semibold text-sm text-[#35462B]">
              "{recipeName}"
            </span>
          </div>

          {/* Itemized List */}
          <div className="py-3 space-y-2 border-b border-dashed border-[#35462B]/30">
            <div className="flex justify-between">
              <span>{racikan.base.name} ({racikan.base.pieces} pcs)</span>
              <span>Rp {racikan.base.price.toLocaleString('id-ID')}</span>
            </div>

            {racikan.sauces.map((sauce) => (
              <div key={sauce.id} className="flex justify-between text-[#35462B]/70 pl-2">
                <span>+ {sauce.name}</span>
                <span>{sauce.price > 0 ? `Rp ${sauce.price.toLocaleString('id-ID')}` : 'Gratis'}</span>
              </div>
            ))}

            {racikan.toppings.map((top) => (
              <div key={top.id} className="flex justify-between text-[#35462B]/70 pl-2">
                <span>+ {top.name}</span>
                <span>Rp {top.price.toLocaleString('id-ID')}</span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="py-3 flex justify-between items-baseline font-bold text-sm text-[#35462B]">
            <span>Perkiraan total</span>
            <span className="font-display font-semibold text-base text-[#C45120]">
              Rp {racikan.totalPrice.toLocaleString('id-ID')}
            </span>
          </div>

          {/* Sweet Closing Quote */}
          <div className="mt-3 pt-3 border-t border-dashed border-[#35462B]/30 text-center">
            <p className="text-[10px] text-[#35462B]/60 italic">
              "Selera beda, tetap semeja. Nikmati selagi hangat!"
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          {/* Direct Order to WhatsApp */}
          <a
            href={waUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3.5 rounded-full bg-[#E96B2B] hover:bg-[#C45120] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <Phone className="w-4 h-4" />
            Pesan racikan ke Minsum
          </a>

          <div className="grid grid-cols-2 gap-3">
            {/* Download PNG */}
            <button
              onClick={handleDownloadImage}
              disabled={downloading}
              className="py-3 rounded-full bg-white hover:bg-[#FFF1D5] text-[#35462B] font-bold text-xs flex items-center justify-center gap-1.5 transition-all border border-[#35462B]/15"
            >
              <Download className="w-3.5 h-3.5" />
              {downloading ? 'Menyimpan...' : 'Simpan gambar'}
            </button>

            {/* Share Link */}
            <button
              onClick={handleShareLink}
              className="py-3 rounded-full bg-white hover:bg-[#FFF1D5] text-[#35462B] font-bold text-xs flex items-center justify-center gap-1.5 transition-all border border-[#35462B]/15"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#C45120]" /> : <Share2 className="w-3.5 h-3.5" />}
              {copied ? 'Tersalin!' : 'Salin link situs'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

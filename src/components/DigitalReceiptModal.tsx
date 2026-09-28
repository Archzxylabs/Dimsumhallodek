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
        colors: ['#F59E0B', '#EF4444', '#FFFFFF'],
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
    `Halo Minsum Dimsum Hallo Dek!\nGua mau pesan racikan: "${recipeName}"\n\n` +
    `• Porsi: ${racikan.base.name} (${racikan.base.pieces} pcs)\n` +
    `• Saus: ${saucesText}\n` +
    `• Topping: ${toppingsText}\n` +
    `• Estimasi Total: Rp ${racikan.totalPrice.toLocaleString('id-ID')}\n\n` +
    `Bisa tolong dicek gerai terdekat yang ready stock? Makasih!`
  );
  const waUrl = `https://wa.me/+6285863646267?text=${waMessage}`;

  const presets = ['Andalan Begadang', 'Mentai Sultan', 'Pelepas Penat Cibubur', 'Rame-Rame Dek'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-md my-8 rounded-3xl bg-zinc-950 border border-white/15 p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1 pr-8">
          <div className="text-xs font-extrabold text-amber-400 uppercase tracking-wider">
            Racikan Siap Dipesan
          </div>
          <h3 className="font-display font-black text-2xl text-white">
            NOTA RACIKAN DEK-MU
          </h3>
        </div>

        {/* Name input */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-white/70 block">
            Beri Nama Racikanmu:
          </label>
          <input
            type="text"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            maxLength={30}
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/15 text-white font-bold text-sm focus:outline-none focus:border-amber-400"
          />
          {/* Quick presets */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {presets.map((p) => (
              <button
                key={p}
                onClick={() => setRecipeName(p)}
                className="text-[11px] px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/5"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* The Receipt Thermal Card (Capturable Element) */}
        <div
          ref={receiptRef}
          className="bg-[#FAFAF9] text-[#1C1917] p-6 rounded-2xl shadow-xl font-mono text-xs border border-zinc-300 relative select-none"
        >
          {/* Receipt Top Header */}
          <div className="text-center space-y-1 pb-4 border-b border-dashed border-zinc-400">
            <p className="font-display font-black text-lg tracking-tight text-zinc-900">
              DIMSUM HALLO DEK
            </p>
            <p className="text-[10px] text-zinc-600">PT MERZA PERINTIS SUKSES</p>
            <p className="text-[10px] text-zinc-500">#AutoHappy Setiap Hari</p>
            <p className="text-[10px] text-zinc-400 pt-1">
              {new Date().toLocaleDateString('id-ID', { dateStyle: 'medium' })} • {new Date().toLocaleTimeString('id-ID', { timeStyle: 'short' })}
            </p>
          </div>

          {/* Receipt Recipe Title */}
          <div className="py-3 text-center border-b border-dashed border-zinc-400">
            <span className="text-[10px] uppercase tracking-wider text-zinc-500 block">Kategori Racikan:</span>
            <span className="font-sans font-black text-sm text-zinc-900 uppercase">
              "{recipeName}"
            </span>
          </div>

          {/* Itemized List */}
          <div className="py-3 space-y-2 border-b border-dashed border-zinc-400">
            <div className="flex justify-between">
              <span>{racikan.base.name} ({racikan.base.pieces} pcs)</span>
              <span>Rp {racikan.base.price.toLocaleString('id-ID')}</span>
            </div>

            {racikan.sauces.map((sauce) => (
              <div key={sauce.id} className="flex justify-between text-zinc-600 pl-2">
                <span>+ {sauce.name}</span>
                <span>{sauce.price > 0 ? `Rp ${sauce.price.toLocaleString('id-ID')}` : 'FREE'}</span>
              </div>
            ))}

            {racikan.toppings.map((top) => (
              <div key={top.id} className="flex justify-between text-zinc-600 pl-2">
                <span>+ {top.name}</span>
                <span>Rp {top.price.toLocaleString('id-ID')}</span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="py-3 flex justify-between items-baseline font-bold text-sm text-zinc-900">
            <span>TOTAL ESTIMASI</span>
            <span className="font-display font-black text-base text-amber-600">
              Rp {racikan.totalPrice.toLocaleString('id-ID')}
            </span>
          </div>

          {/* Barcode Mockup */}
          <div className="pt-2 text-center space-y-1">
            <div className="h-8 w-44 mx-auto bg-[repeating-linear-gradient(90deg,#18181b,#18181b_2px,transparent_2px,transparent_4px,#18181b_4px,#18181b_7px,transparent_7px,transparent_9px)] opacity-70" />
            <p className="text-[9px] text-zinc-400 tracking-widest font-mono">DHD-{Math.floor(100000 + Math.random() * 900000)}</p>
          </div>

          {/* Sweet Closing Quote */}
          <div className="mt-3 pt-3 border-t border-dashed border-zinc-400 text-center">
            <p className="text-[10px] text-zinc-500 italic">
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
            className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <Phone className="w-4 h-4 fill-black" />
            Pesan Racikan Ini ke WhatsApp Minsum
          </a>

          <div className="grid grid-cols-2 gap-3">
            {/* Download PNG */}
            <button
              onClick={handleDownloadImage}
              disabled={downloading}
              className="py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all border border-white/10"
            >
              <Download className="w-3.5 h-3.5" />
              {downloading ? 'Exporting...' : 'Simpan PNG'}
            </button>

            {/* Share Link */}
            <button
              onClick={handleShareLink}
              className="py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all border border-white/10"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              {copied ? 'Tersalin!' : 'Bagikan Link'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

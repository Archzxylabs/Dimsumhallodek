import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { MessageCircle, Mic, Send, X } from 'lucide-react';
import type { AvatarSession } from '../lib/avatarTypes';

const LiveAvatar = lazy(() => import('./LiveAvatar').then((module) => ({ default: module.LiveAvatar })));

interface AvatarConfig { ready: boolean; appId: string; avatarId: string; durationSeconds: number }
interface ChatMessage { role: 'visitor' | 'minsum'; text: string }

const starters = [
  'Kemitraannya ada apa aja?',
  'Bisa untuk acara apa?',
  'Ada produk selain dimsum biasa?',
  'Harga yang ditampilkan sudah final?',
];

function answer(question: string): string {
  const text = question.toLowerCase();
  if (/mitra|franchise|usaha|paket/.test(text)) return 'Ada tiga pilihan kemitraan: Flexible, Collaborative, dan Full Managed. Detail peran, fasilitas, dan harga resminya bisa dikonsultasikan ke tim kemitraan di +62 858-0285-4744.';
  if (/event|acara|wedding|sekolah|kantor|khitan|lamaran/.test(text)) return 'Kami menerima kebutuhan untuk wedding, sekolah, kantor, khitanan, dan lamaran. Ceritakan tanggal, lokasi, serta jumlah tamu ke tim di +62 858-6364-6267 ya.';
  if (/cake|bouquet|buket|frozen|produk|hadiah/.test(text)) return 'Ada Dimsum Cake dan Dimsum Bouquet dengan dekorasi nama, juga Dimsum Frozen untuk stok di rumah. Detail ukuran dan isi bisa ditanyakan ke Minsum.';
  if (/harga|biaya|final|price/.test(text)) return 'Harga di website ini masih contoh untuk demo. Tim Dimsum Hallo Dek akan mengonfirmasi harga resmi sesuai kebutuhanmu.';
  if (/gerai|lokasi|cabang|alamat/.test(text)) return 'Daftar gerai ada di bagian Cari Gerai pada halaman ini. Kamu bisa pilih lokasi dan buka petanya langsung.';
  return 'Aku bisa bantu jelaskan produk, event, kemitraan, dan lokasi gerai. Untuk pesanan atau penawaran resmi, hubungi tim Dimsum Hallo Dek lewat WhatsApp ya.';
}

async function endSession(ticket: string) {
  await fetch('/api/archava/end', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ticket }) }).catch(() => {});
}

export function ArchavaConcierge() {
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState<AvatarConfig | null>(null);
  const [session, setSession] = useState<AvatarSession | null>(null);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'live'>('idle');
  const [error, setError] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: 'minsum', text: 'Halo! Aku Minsum. Mau tanya produk, event, atau kemitraan?' }]);
  const [input, setInput] = useState('');
  const chatList = useRef<HTMLDivElement>(null);
  const sessionRef = useRef<AvatarSession | null>(null);
  const openRef = useRef(false);
  const attemptRef = useRef(0);
  const autoStartedRef = useRef(false);

  useEffect(() => {
    fetch('/api/archava/config').then((response) => response.ok ? response.json() : null).then((data: AvatarConfig | null) => {
      setConfig(data);
      if (data?.ready && "RTCRtpScriptTransform" in globalThis) void import('../lib/spatius').then(({ prepareSpatiusAvatar }) => prepareSpatiusAvatar(data.appId, data.avatarId)).catch(() => {});
    }).catch(() => setConfig(null));
  }, []);
  useEffect(() => {
    if (chatList.current) chatList.current.scrollTop = chatList.current.scrollHeight;
  }, [messages]);
  useEffect(() => {
    const handlePageHide = () => {
      if (sessionRef.current) navigator.sendBeacon('/api/archava/end', new Blob([JSON.stringify({ ticket: sessionRef.current.ticket })], { type: 'application/json' }));
    };
    window.addEventListener('pagehide', handlePageHide);
    return () => window.removeEventListener('pagehide', handlePageHide);
  }, []);

  const closeLive = useCallback(() => {
    const current = sessionRef.current;
    sessionRef.current = null;
    setSession(null);
    setStatus('idle');
    if (current) void endSession(current.ticket);
  }, []);
  const handleError = useCallback((message: string) => { setError(message); closeLive(); }, [closeLive]);

  const startLive = async () => {
    if (status !== 'idle') return;
    setError('');
    if (!config?.ready) { setError('Mode suara live belum aktif. Kamu tetap bisa coba panduan teks di bawah.'); return; }
    if (!("RTCRtpScriptTransform" in globalThis)) { setError('Avatar live perlu Chrome atau Edge versi terbaru.'); return; }
    const attempt = ++attemptRef.current;
    setStatus('connecting');
    try {
      await import('../lib/spatius').then(({ prepareSpatiusAvatar }) => prepareSpatiusAvatar(config.appId, config.avatarId));
      if (!openRef.current || attempt !== attemptRef.current) return;
      const response = await fetch('/api/archava/session', { method: 'POST' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Tidak bisa membuka sesi.');
      if (!openRef.current || attempt !== attemptRef.current) { void endSession(data.ticket); return; }
      sessionRef.current = data as AvatarSession;
      setSession(data as AvatarSession);
      setStatus('live');
    } catch (cause) {
      setStatus('idle');
      setError(cause instanceof Error ? cause.message : 'Tidak bisa membuka sesi.');
    }
  };

  useEffect(() => {
    if (!open || !config?.ready || autoStartedRef.current) return;
    autoStartedRef.current = true;
    void startLive();
  }, [open, config?.ready]);

  const togglePanel = () => {
    if (open) { openRef.current = false; autoStartedRef.current = false; attemptRef.current += 1; closeLive(); setOpen(false); return; }
    openRef.current = true;
    setOpen(true);
  };

  const ask = (question: string) => {
    const trimmed = question.trim();
    if (!trimmed) return;
    setMessages((current) => [...current, { role: 'visitor', text: trimmed }, { role: 'minsum', text: answer(trimmed) }]);
    setInput('');
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-[80]" id="avatar">
      {open && <aside id="minsum-panel" aria-label="Talk to Minsum" className="pointer-events-auto absolute bottom-24 right-4 flex h-[min(620px,calc(100dvh-8rem))] w-[min(370px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[1.75rem] border border-[#35462B]/15 bg-[#FFF9ED] shadow-[0_22px_70px_rgba(22,36,18,0.28)] sm:right-6">
        <div className="flex items-center justify-between bg-[#35462B] px-5 py-4 text-white">
          <div className="flex items-center gap-3"><img src="/assets/archava/minsum-concept.webp" alt="" className="h-10 w-10 rounded-full border-2 border-[#F6C94B] object-cover object-top" /><div><h2 className="font-display text-lg font-semibold leading-tight">Talk to Minsum</h2><p className="text-xs text-white/70">Panduan Dimsum Hallo Dek · Archava</p></div></div>
          <button type="button" onClick={togglePanel} aria-label="Tutup Minsum" className="rounded-full p-2 hover:bg-white/15"><X className="h-5 w-5" /></button>
        </div>
        {session ? <div className="min-h-0 flex-1 p-4"><Suspense fallback={<p className="text-sm text-[#35462B]/70">Menyiapkan avatar...</p>}><LiveAvatar session={session} onClose={closeLive} onError={handleError} /></Suspense></div> : <>
          <div className="relative h-40 shrink-0 overflow-hidden bg-[#e8d1df]"><img src="/assets/archava/minsum-concept.webp" alt="Ilustrasi avatar Minsum" className="h-full w-full object-cover object-[center_23%]" /><span className="absolute bottom-3 left-4 rounded-full bg-[#35462B]/90 px-3 py-1 text-xs font-semibold text-white">{status === 'connecting' ? 'Menghubungkan...' : 'Panduan interaktif'}</span></div>
          <div className="flex min-h-0 flex-1 flex-col p-4">
            {config?.ready && status === 'idle' && <button type="button" onClick={() => void startLive()} className="mb-3 inline-flex items-center justify-center gap-2 rounded-full bg-[#E96B2B] px-4 py-2.5 text-sm font-extrabold text-white"><Mic className="h-4 w-4" /> Mulai bicara live</button>}
            {error && <p role="status" className="mb-3 rounded-xl bg-[#F6C94B]/30 px-3 py-2 text-xs text-[#35462B]">{error}</p>}
            <div ref={chatList} className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1" aria-live="polite">{messages.map((message, index) => <p key={index} className={`max-w-[90%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${message.role === 'visitor' ? 'ml-auto bg-[#F6C94B] text-[#35462B]' : 'bg-white text-[#35462B] shadow-sm'}`}>{message.text}</p>)}</div>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">{starters.map((question) => <button type="button" key={question} onClick={() => ask(question)} className="shrink-0 rounded-full border border-[#35462B]/15 bg-white px-3 py-1.5 text-xs font-bold text-[#35462B]">{question}</button>)}</div>
            <form onSubmit={(event) => { event.preventDefault(); ask(input); }} className="mt-3 flex gap-2"><input value={input} onChange={(event) => setInput(event.target.value)} aria-label="Tanya Minsum" placeholder="Tanya Minsum..." className="min-w-0 flex-1 rounded-full border border-[#35462B]/20 bg-white px-4 py-2 text-sm outline-none focus:border-[#E96B2B]" /><button type="submit" aria-label="Kirim pertanyaan" className="rounded-full bg-[#35462B] p-2.5 text-white"><Send className="h-4 w-4" /></button></form>
            <p className="mt-2 text-[10px] text-[#35462B]/55">Panduan teks demo. Harga dan ketersediaan dikonfirmasi tim.</p>
          </div>
        </>}
      </aside>}
      <button type="button" onClick={togglePanel} aria-expanded={open} aria-controls="minsum-panel" className="pointer-events-auto absolute bottom-5 right-4 inline-flex items-center gap-2 rounded-full bg-[#E96B2B] px-4 py-3.5 font-display text-sm font-semibold text-white shadow-[0_10px_28px_rgba(120,52,22,0.35)] transition-transform hover:-translate-y-1 focus-visible:outline-4 focus-visible:outline-[#F6C94B] sm:right-6"><MessageCircle className="h-5 w-5" /> {open ? 'Tutup Minsum' : 'Talk to Minsum'}</button>
    </div>
  );
}

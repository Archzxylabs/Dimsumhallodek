import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import type { AvatarSession } from '../lib/avatarTypes';
import { getMinsumWhatsappUrl, handoffLabels, type MinsumHandoff } from '../lib/minsumHandoff';

const LiveAvatar = lazy(() => import('./LiveAvatar').then((module) => ({ default: module.LiveAvatar })));

interface AvatarConfig { ready: boolean; appId: string; avatarId: string; durationSeconds: number }

async function endSession(ticket: string) {
  await fetch('/api/archava/end', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ticket }) }).catch(() => {});
}

export function ArchavaConcierge() {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<AvatarSession | null>(null);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'live'>('idle');
  const [error, setError] = useState('');
  const [handoff, setHandoff] = useState<MinsumHandoff | null>(null);
  const sessionRef = useRef<AvatarSession | null>(null);
  const configPromiseRef = useRef<Promise<AvatarConfig> | null>(null);
  const openRef = useRef(false);
  const attemptRef = useRef(0);

  const getConfig = () => {
    if (!configPromiseRef.current) {
      configPromiseRef.current = fetch('/api/archava/config')
        .then(async (response) => {
          if (!response.ok) throw new Error('Avatar live belum tersedia. Coba lagi nanti.');
          return response.json() as Promise<AvatarConfig>;
        })
        .catch((cause: unknown) => {
          configPromiseRef.current = null;
          throw cause;
        });
    }
    return configPromiseRef.current;
  };

  useEffect(() => {
    void getConfig().then((data) => {
      if (data.ready && "RTCRtpScriptTransform" in globalThis) void import('../lib/spatius').then(({ prepareSpatiusAvatar }) => prepareSpatiusAvatar(data.appId, data.avatarId)).catch(() => {});
    }).catch(() => {});
  }, []);
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
    const attempt = ++attemptRef.current;
    setStatus('connecting');
    try {
      const config = await getConfig();
      if (!config.ready) {
        configPromiseRef.current = null;
        throw new Error('Avatar live belum tersedia. Coba lagi nanti.');
      }
      if (!("RTCRtpScriptTransform" in globalThis)) throw new Error('Avatar live perlu Chrome atau Edge versi terbaru.');
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
      if (!openRef.current || attempt !== attemptRef.current) return;
      setStatus('idle');
      setError(cause instanceof Error ? cause.message : 'Tidak bisa membuka sesi.');
    }
  };

  const togglePanel = () => {
    if (open) { openRef.current = false; attemptRef.current += 1; closeLive(); setOpen(false); return; }
    openRef.current = true;
    setHandoff(null);
    setOpen(true);
    void startLive();
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-[80]" id="avatar">
      {open && <aside id="minsum-panel" aria-label="Talk to Minsum" className="pointer-events-auto absolute bottom-24 right-4 flex h-[min(620px,calc(100dvh-8rem))] w-[min(370px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[1.75rem] border border-[#35462B]/15 bg-[#FFF9ED] shadow-[0_22px_70px_rgba(22,36,18,0.28)] sm:right-6">
        <div className="flex items-center justify-between bg-[#35462B] px-5 py-4 text-white">
          <div className="flex items-center gap-3"><img src="/assets/archava/minsum-concept.webp" alt="" className="h-10 w-10 rounded-full border-2 border-[#F6C94B] object-cover object-top" /><div><h2 className="font-display text-lg font-semibold leading-tight">Talk to Minsum</h2><p className="text-xs text-white/70">Avatar suara live · Archava</p></div></div>
          <button type="button" onClick={togglePanel} aria-label="Tutup Minsum" className="rounded-full p-2 hover:bg-white/15"><X className="h-5 w-5" /></button>
        </div>
        {session ? <div className="min-h-0 flex-1 p-4 pb-2"><Suspense fallback={<div className="h-full overflow-hidden rounded-2xl bg-[#283920]"><img src="/assets/archava/minsum-concept.webp" alt="Menyiapkan avatar Minsum" className="h-full w-full object-cover object-top" /></div>}><LiveAvatar session={session} onClose={closeLive} onError={handleError} onHandoff={setHandoff} /></Suspense></div> :
          <div className="relative min-h-0 flex-1 overflow-hidden bg-[#283920]">
            <img src="/assets/archava/minsum-concept.webp" alt="Avatar Minsum" className="h-full w-full object-cover object-top" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1e281d]/95 via-[#1e281d]/75 to-transparent p-6 pt-20 text-white">
              {status === 'connecting' ? <p role="status" className="flex items-center gap-3 text-sm font-semibold"><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-[#F6C94B]" />Menyiapkan avatar Spatius...</p> : <>
                <p role="status" className="mb-4 text-sm">{error || 'Sesi selesai. Kamu bisa bicara lagi dengan Minsum.'}</p>
                <button type="button" onClick={() => void startLive()} className="rounded-full bg-[#E96B2B] px-5 py-3 text-sm font-bold text-white hover:bg-[#C45120]">{error ? 'Coba sambungkan lagi' : 'Mulai sesi baru'}</button>
              </>}
            </div>
          </div>
        }
        <div className="border-t border-[#35462B]/10 bg-white px-4 py-3 text-[#35462B]" aria-live="polite">
          {handoff ? <>
            <p className="text-xs font-bold text-[#E96B2B]">Ringkasan untuk tim · {handoffLabels[handoff.category]}</p>
            <p className="mt-1 max-h-16 overflow-y-auto text-xs leading-relaxed">{handoff.summary}</p>
            <a href={getMinsumWhatsappUrl(handoff)} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#35462B] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#283920]">
              <MessageCircle className="h-4 w-4" /> Lanjut via WhatsApp
            </a>
            <p className="mt-1 text-[10px] text-[#35462B]/60">Periksa dan edit pesannya sebelum dikirim.</p>
          </> : <>
            <p className="text-xs leading-relaxed text-[#35462B]/70">Ceritakan kebutuhanmu ke Minsum, lalu lanjutkan ke tim lewat WhatsApp.</p>
            <div className="mt-2 flex gap-2">
              <a href={getMinsumWhatsappUrl(null, 'menu')} target="_blank" rel="noopener noreferrer" className="inline-flex flex-1 items-center justify-center gap-1 rounded-full bg-[#35462B] px-2 py-2.5 text-[11px] font-bold text-white hover:bg-[#283920]"><MessageCircle className="h-3.5 w-3.5" /> Produk / event</a>
              <a href={getMinsumWhatsappUrl(null, 'partnership')} target="_blank" rel="noopener noreferrer" className="inline-flex flex-1 items-center justify-center gap-1 rounded-full bg-[#F6C94B] px-2 py-2.5 text-[11px] font-bold text-[#283920] hover:bg-[#FFDA72]"><MessageCircle className="h-3.5 w-3.5" /> Kemitraan</a>
            </div>
          </>}
        </div>
      </aside>}
      <button type="button" onClick={togglePanel} aria-expanded={open} aria-controls="minsum-panel" className="pointer-events-auto absolute bottom-5 right-4 inline-flex items-center gap-2 rounded-full bg-[#E96B2B] px-4 py-3.5 font-display text-sm font-semibold text-white shadow-[0_10px_28px_rgba(120,52,22,0.35)] transition-transform hover:-translate-y-1 focus-visible:outline-4 focus-visible:outline-[#F6C94B] sm:right-6"><MessageCircle className="h-5 w-5" /> {open ? 'Tutup Minsum' : 'Talk to Minsum'}</button>
    </div>
  );
}

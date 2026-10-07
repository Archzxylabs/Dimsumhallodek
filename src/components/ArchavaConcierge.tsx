import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import type { AvatarSession } from '../lib/avatarTypes';
import { getMinsumWhatsappUrl, handoffLabels, type MinsumHandoff } from '../lib/minsumHandoff';
import { microphoneErrorMessage } from '../lib/microphone';
import { BangMusPortrait } from './BangMusPortrait';

const LiveAvatar = lazy(() => import('./LiveAvatar').then((module) => ({ default: module.LiveAvatar })));
interface AvatarConfig { ready: boolean; appId: string; avatarId: string; durationSeconds: number }

async function endSession(ticket: string) {
  await fetch('/api/archava/end', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ticket }) }).catch(() => {});
}

export function ArchavaConcierge() {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<AvatarSession | null>(null);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'live'>('idle');
  const [phase, setPhase] = useState('Menyambungkan Bang Mus…');
  const [error, setError] = useState('');
  const [handoff, setHandoff] = useState<MinsumHandoff | null>(null);
  const sessionRef = useRef<AvatarSession | null>(null);
  const configPromiseRef = useRef<Promise<AvatarConfig> | null>(null);
  const openRef = useRef(false);
  const attemptRef = useRef(0);
  const preparationRef = useRef<AbortController | null>(null);
  const launcher = useRef<HTMLButtonElement>(null);

  const getConfig = useCallback(() => {
    if (!configPromiseRef.current) {
      configPromiseRef.current = fetch('/api/archava/config', { signal: AbortSignal.timeout(15000) })
        .then(async (response) => {
          if (!response.ok) throw new Error('Bang Mus belum tersedia. Coba lagi nanti atau lanjut via WhatsApp.');
          return response.json() as Promise<AvatarConfig>;
        }).catch((cause: unknown) => { configPromiseRef.current = null; throw cause; });
    }
    return configPromiseRef.current;
  }, []);

  const warmAvatar = useCallback(() => {
    if (!("RTCRtpScriptTransform" in globalThis)) return;
    void getConfig().then((data) => {
      if (data.ready) return import('../lib/spatius').then(({ prepareSpatiusAvatar }) => prepareSpatiusAvatar(data.appId, data.avatarId));
    }).catch(() => {});
  }, [getConfig]);

  useEffect(() => {
    // Keep voice startup fast after the page's images and critical code have loaded.
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (connection?.saveData || ['slow-2g', '2g', '3g'].includes(connection?.effectiveType || '')) return;
    let idle: number | undefined;
    let timer: number | undefined;
    const schedule = () => {
      if (typeof window.requestIdleCallback === 'function') idle = window.requestIdleCallback(warmAvatar, { timeout: 4000 });
      else timer = setTimeout(warmAvatar, 1500);
    };
    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });
    return () => { window.removeEventListener('load', schedule); if (idle !== undefined) window.cancelIdleCallback(idle); if (timer !== undefined) clearTimeout(timer); };
  }, [warmAvatar]);

  useEffect(() => {
    const handlePageHide = () => {
      if (sessionRef.current) navigator.sendBeacon('/api/archava/end', new Blob([JSON.stringify({ ticket: sessionRef.current.ticket })], { type: 'application/json' }));
    };
    window.addEventListener('pagehide', handlePageHide);
    return () => window.removeEventListener('pagehide', handlePageHide);
  }, []);

  const closeLive = useCallback(() => {
    preparationRef.current?.abort();
    preparationRef.current = null;
    const current = sessionRef.current;
    sessionRef.current = null;
    setSession(null);
    setStatus('idle');
    if (current) void endSession(current.ticket);
  }, []);
  const handleError = useCallback((message: string) => { setError(message); closeLive(); }, [closeLive]);
  const handleConnected = useCallback((ticket: string) => { if (openRef.current && sessionRef.current?.ticket === ticket) setStatus('live'); }, []);

  const startLive = async () => {
    if (status !== 'idle') return;
    setError('');
    const attempt = ++attemptRef.current;
    setStatus('connecting');
    setPhase('Memeriksa koneksi Bang Mus…');
    try {
      const config = await getConfig();
      if (!openRef.current || attempt !== attemptRef.current) return;
      if (!config.ready) { configPromiseRef.current = null; throw new Error('Bang Mus belum tersedia. Coba lagi nanti atau lanjut via WhatsApp.'); }
      if (!("RTCRtpScriptTransform" in globalThis)) throw new Error('Browser ini belum mendukung avatar live. Coba Chrome atau Edge terbaru, atau lanjut via WhatsApp.');
      if (!navigator.mediaDevices?.getUserMedia) throw new Error('Browser ini belum bisa mengakses mikrofon. Buka lewat koneksi aman atau lanjut via WhatsApp.');
      setPhase('Izinkan mikrofon di browser untuk mulai bicara.');
      try {
        const permission = await navigator.mediaDevices.getUserMedia({ audio: true });
        permission.getTracks().forEach((track) => track.stop());
      } catch (cause) { throw new Error(microphoneErrorMessage(cause)); }
      if (!openRef.current || attempt !== attemptRef.current) return;
      setPhase('Menyiapkan Bang Mus…');
      const preparation = new AbortController();
      preparationRef.current = preparation;
      try {
        const { prepareSpatiusAvatar } = await import('../lib/spatius');
        await prepareSpatiusAvatar(config.appId, config.avatarId, {
          signal: preparation.signal,
          onProgress: (progress) => {
            if (!openRef.current || attempt !== attemptRef.current) return;
            setPhase(progress.stage === 'initializing' ? 'Menyiapkan Bang Mus untuk perangkatmu…' :
              progress.stage === 'downloading' ? `Memuat avatar${progress.progress === undefined ? '' : ` · ${Math.round(progress.progress * 100)}%`}…` : 'Avatar siap. Menghubungkan suara…');
          },
        });
      } finally { if (preparationRef.current === preparation) preparationRef.current = null; }
      if (!openRef.current || attempt !== attemptRef.current) return;
      setPhase('Menghubungkan suara…');
      const response = await fetch('/api/archava/session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ startOnConnect: true }), signal: AbortSignal.timeout(30000) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Tidak bisa membuka sesi Bang Mus.');
      if (!openRef.current || attempt !== attemptRef.current) { void endSession(data.ticket); return; }
      sessionRef.current = data as AvatarSession;
      setSession(data as AvatarSession);
    } catch (cause) {
      if (!openRef.current || attempt !== attemptRef.current) return;
      setStatus('idle');
      setError(cause instanceof Error && cause.name !== 'TimeoutError' ? cause.message : 'Koneksi terlalu lama. Coba lagi atau lanjut via WhatsApp.');
    }
  };

  const togglePanel = () => {
    if (open) {
      openRef.current = false; attemptRef.current += 1; closeLive(); setOpen(false);
      launcher.current?.focus();
      return;
    }
    openRef.current = true;
    setOpen(true);
    void startLive();
  };

  useEffect(() => {
    if (!open) return;
    const keyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !document.getElementById('mobile-navigation') && !document.querySelector('dialog[open]')) {
        openRef.current = false; attemptRef.current += 1; closeLive(); setOpen(false); launcher.current?.focus();
      }
    };
    window.addEventListener('keydown', keyDown);
    const frame = requestAnimationFrame(() => document.querySelector<HTMLButtonElement>('#minsum-panel .minsum-close')?.focus({ preventScroll: true }));
    return () => { cancelAnimationFrame(frame); window.removeEventListener('keydown', keyDown); };
  }, [open, closeLive]);

  return <div className="minsum-root" id="avatar">
    {open && <aside id="minsum-panel" aria-label="Percakapan suara dengan Bang Mus" className="minsum-panel">
      <div className="minsum-header">
        <BangMusPortrait decorative />
        <div><h2>Talk to Bang Mus</h2><p>Suara langsung · demo 2 menit</p></div>
        <button type="button" onClick={togglePanel} aria-label="Tutup Bang Mus" className="minsum-close"><X size={20} /></button>
      </div>
      <div className="minsum-panel-content">
        {session ? <Suspense fallback={<div className="minsum-loading" role="status">Menghubungkan suara dan avatar…</div>}>
          <LiveAvatar session={session} onClose={closeLive} onError={handleError} onHandoff={setHandoff} onConnected={handleConnected} />
        </Suspense> : <div className="minsum-idle">
          <BangMusPortrait className="minsum-idle-image" />
          <div className="minsum-idle-status">
            {status === 'connecting' ? <p role="status"><span className="minsum-spinner" />{phase}</p> : <>
              <p role={error ? 'alert' : 'status'}>{error || 'Sesi selesai. Ringkasan yang sudah dibuat tetap tersedia di bawah. Kamu bisa mulai percakapan baru.'}</p>
              <button type="button" onClick={() => void startLive()} className="button button-orange">{error ? 'Coba sambungkan lagi' : 'Mulai sesi baru'}</button>
            </>}
          </div>
        </div>}
      </div>
      <div className="minsum-footer">
        {handoff ? <>
          <div aria-live="polite"><p className="minsum-summary-label">Ringkasan terakhir · {handoffLabels[handoff.category]}</p><p className="minsum-summary">{handoff.summary}</p></div>
          <a href={getMinsumWhatsappUrl(handoff)} target="_blank" rel="noopener noreferrer" className="minsum-handoff"><MessageCircle size={16} /> Lanjut via WhatsApp</a>
          <p className="minsum-footer-note">Periksa dan kirim pesannya di WhatsApp.</p>
        </> : <>
          <p className="minsum-footer-note">Izinkan mikrofon, lalu ceritakan kebutuhanmu. Kamu juga bisa langsung menghubungi tim.</p>
          <div className="minsum-contact-links">
            <a href={getMinsumWhatsappUrl(null, 'menu')} target="_blank" rel="noopener noreferrer"><MessageCircle size={15} /> Produk / event</a>
            <a href={getMinsumWhatsappUrl(null, 'partnership')} target="_blank" rel="noopener noreferrer"><MessageCircle size={15} /> Kemitraan</a>
          </div>
        </>}
      </div>
    </aside>}
    <button ref={launcher} type="button" onClick={togglePanel} onPointerEnter={warmAvatar} onFocus={warmAvatar} aria-expanded={open} aria-controls="minsum-panel" className="minsum-launcher"><MessageCircle size={20} /> {open ? 'Tutup Bang Mus' : 'Talk to Bang Mus'}</button>
  </div>;
}

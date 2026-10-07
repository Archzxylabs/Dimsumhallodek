import { useCallback, useEffect, useRef, useState } from 'react';
import { Mic, MicOff, PhoneOff } from 'lucide-react';
import { LiveKitRoom, RoomAudioRenderer, StartAudio, useConnectionState, useLocalParticipant, useRoomContext, useVoiceAssistant } from '@livekit/components-react';
import { ConnectionState, RoomEvent } from 'livekit-client';
import { prepareSpatiusAvatar } from '../lib/spatius';
import type { AvatarSession } from '../lib/avatarTypes';
import { HANDOFF_TOPIC, parseMinsumHandoff, type MinsumHandoff } from '../lib/minsumHandoff';
import { microphoneErrorMessage } from '../lib/microphone';
import { BangMusPortrait } from './BangMusPortrait';

function AvatarSurface({ session, onError, onHandoff, onConnected, onMicrophoneError }: {
  session: AvatarSession; onError: (message: string) => void; onHandoff: (handoff: MinsumHandoff) => void;
  onConnected: () => Promise<void>; onMicrophoneError: (message: string) => void;
}) {
  const room = useRoomContext();
  const canvas = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const onDataReceived = (payload: Uint8Array, _participant?: unknown, _kind?: unknown, topic?: string) => {
      if (topic !== HANDOFF_TOPIC) return;
      try { const handoff = parseMinsumHandoff(JSON.parse(new TextDecoder().decode(payload))); if (handoff) onHandoff(handoff); } catch { /* Ignore malformed packets. */ }
    };
    room.on(RoomEvent.DataReceived, onDataReceived);
    return () => { room.off(RoomEvent.DataReceived, onDataReceived); };
  }, [room, onHandoff]);

  useEffect(() => {
    let cancelled = false;
    let connectionAttempted = false;
    let disposed = false;
    let player: { detach: () => Promise<void> } | undefined;
    let view: { dispose: () => void } | undefined;
    const connect = async () => {
      const [avatar, { AvatarView }, { AvatarPlayer, LiveKitProvider }] = await Promise.all([
        prepareSpatiusAvatar(session.appId, session.avatarId), import('@spatius/avatarkit'), import('@spatius/avatarkit-rtc'),
      ]);
      if (cancelled || !canvas.current) return;
      canvas.current.replaceChildren();
      const avatarView = new AvatarView(avatar, canvas.current);
      view = avatarView;
      avatarView.onFirstRendering = () => { if (!cancelled) setReady(true); };
      const avatarPlayer = new AvatarPlayer(new LiveKitProvider(), avatarView);
      player = avatarPlayer;
      await avatarPlayer.attach(room);
      if (cancelled) return;
      connectionAttempted = true;
      await room.connect(session.serverUrl, session.token);
      if (cancelled) return;
      try { await room.localParticipant.setMicrophoneEnabled(true); } catch (cause) { if (!cancelled) onMicrophoneError(microphoneErrorMessage(cause)); }
      if (cancelled) return;
      await onConnected();
    };
    const dispose = async () => {
      if (disposed) return;
      disposed = true;
      await player?.detach().catch(() => {});
      if (connectionAttempted) await room.disconnect().catch(() => {});
      view?.dispose();
    };
    const startup = connect().catch(async () => {
      if (!cancelled) onError('Bang Mus belum bisa tersambung. Coba lagi atau lanjut lewat WhatsApp.');
      await dispose();
    });
    return () => { cancelled = true; void startup.then(dispose); };
  }, [room, session, onError, onConnected, onMicrophoneError]);

  return <div className="minsum-surface">
    <div ref={canvas} className="minsum-canvas" />
    {!ready && <div className="minsum-surface-loading"><BangMusPortrait /><span>Menyiapkan avatar…</span></div>}
  </div>;
}

function CallControls({ endsAt, onClose, microphoneError, onMicrophoneError }: { endsAt: number | null; onClose: () => void; microphoneError: string; onMicrophoneError: (message: string) => void }) {
  const { localParticipant } = useLocalParticipant();
  const connection = useConnectionState();
  const { state } = useVoiceAssistant();
  const [remaining, setRemaining] = useState<number | null>(null);
  const muted = !localParticipant?.isMicrophoneEnabled;
  const connected = connection === ConnectionState.Connected;
  useEffect(() => {
    if (!endsAt) return;
    const tick = () => {
      const next = Math.max(0, endsAt - Math.floor(Date.now() / 1000));
      setRemaining(next);
      if (next === 0) onClose();
    };
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [endsAt, onClose]);
  const toggleMicrophone = async () => {
    if (!localParticipant || !connected) return;
    try { await localParticipant.setMicrophoneEnabled(muted); onMicrophoneError(''); } catch (cause) { onMicrophoneError(microphoneErrorMessage(cause)); }
  };
  const stateLabel = !connected || !endsAt ? 'Menyambungkan suara…' : muted ? 'Mikrofon mati · nyalakan untuk bicara' :
    state === 'listening' ? 'Bang Mus mendengarkan' : state === 'thinking' ? 'Bang Mus sedang memproses jawaban' :
    state === 'speaking' ? 'Bang Mus sedang menjawab' : state === 'idle' ? 'Bang Mus siap. Silakan bicara.' : 'Menunggu Bang Mus siap…';
  return <div className="minsum-controls">
    <p className="minsum-conversation-status" role="status"><span className={`conversation-dot state-${state}`} />{stateLabel}</p>
    {microphoneError && <p className="minsum-mic-error" role="alert">{microphoneError}</p>}
    <div className="minsum-control-row">
      <span>{remaining === null ? 'Demo 2 menit' : `${Math.floor(remaining / 60)}:${String(remaining % 60).padStart(2, '0')} tersisa`}</span>
      <div>
        <button type="button" disabled={!connected} onClick={() => void toggleMicrophone()} aria-label={muted ? 'Nyalakan mikrofon' : 'Matikan mikrofon'} aria-pressed={!muted} className="minsum-mic-toggle">{muted ? <MicOff size={17} /> : <Mic size={17} />}</button>
        <button type="button" onClick={onClose} className="minsum-end"><PhoneOff size={16} /> Akhiri</button>
      </div>
    </div>
    {connected && <StartAudio label="Aktifkan suara Bang Mus" className="minsum-start-audio" />}
    {remaining !== null && remaining > 0 && remaining <= 15 && <p className="minsum-ending-warning" role="status">Sesi segera berakhir. Ringkasan tetap tersedia untuk dilanjutkan via WhatsApp.</p>}
  </div>;
}

export function LiveAvatar({ session, onClose, onError, onHandoff, onConnected }: { session: AvatarSession; onClose: () => void; onError: (message: string) => void; onHandoff: (handoff: MinsumHandoff) => void; onConnected: (ticket: string) => void }) {
  const [endsAt, setEndsAt] = useState<number | null>(session.requiresStart ? null : session.endsAt);
  const [microphoneError, setMicrophoneError] = useState('');
  const activate = useCallback(async () => {
    if (session.requiresStart) {
      const response = await fetch('/api/archava/start', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ticket: session.ticket }), signal: AbortSignal.timeout(10000) });
      const result = await response.json();
      if (!response.ok || typeof result.endsAt !== 'number') throw new Error('Sesi belum bisa dimulai.');
      setEndsAt(result.endsAt);
    }
    onConnected(session.ticket);
  }, [session, onConnected]);
  return <LiveKitRoom token={session.token} serverUrl={session.serverUrl} connect={false} audio={false} video={false} options={{ singlePeerConnection: false }} onDisconnected={onClose} className="minsum-live">
    <RoomAudioRenderer />
    <AvatarSurface session={session} onError={onError} onHandoff={onHandoff} onConnected={activate} onMicrophoneError={setMicrophoneError} />
    <CallControls endsAt={endsAt} onClose={onClose} microphoneError={microphoneError} onMicrophoneError={setMicrophoneError} />
  </LiveKitRoom>;
}

import { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, PhoneOff } from 'lucide-react';
import { LiveKitRoom, RoomAudioRenderer, StartAudio, useLocalParticipant, useRoomContext } from '@livekit/components-react';
import { RoomEvent } from 'livekit-client';
import { prepareSpatiusAvatar } from '../lib/spatius';
import type { AvatarSession } from '../lib/avatarTypes';
import { HANDOFF_TOPIC, parseMinsumHandoff, type MinsumHandoff } from '../lib/minsumHandoff';

function AvatarSurface({ session, onError, onHandoff }: { session: AvatarSession; onError: (message: string) => void; onHandoff: (handoff: MinsumHandoff) => void }) {
  const room = useRoomContext();
  const canvas = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const onDataReceived = (payload: Uint8Array, _participant?: unknown, _kind?: unknown, topic?: string) => {
      if (topic !== HANDOFF_TOPIC) return;
      try {
        const handoff = parseMinsumHandoff(JSON.parse(new TextDecoder().decode(payload)));
        if (handoff) onHandoff(handoff);
      } catch { /* Ignore malformed packets. */ }
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
        prepareSpatiusAvatar(session.appId, session.avatarId),
        import('@spatius/avatarkit'), import('@spatius/avatarkit-rtc'),
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
      try { await room.localParticipant.setMicrophoneEnabled(true); } catch { /* user can enable it below */ }
    };
    const dispose = async () => {
      if (disposed) return;
      disposed = true;
      await player?.detach().catch(() => {});
      if (connectionAttempted) await room.disconnect().catch(() => {});
      view?.dispose();
    };
    const startup = connect().catch(async (cause: unknown) => {
      await dispose();
      if (!cancelled) onError(cause instanceof Error ? cause.message : 'Avatar gagal tersambung.');
    });
    return () => {
      cancelled = true;
      void startup.then(dispose);
    };
  }, [room, session, onError]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#222b24]">
      <div ref={canvas} className="absolute inset-0 h-full w-full [&_canvas]:block [&_canvas]:h-full [&_canvas]:w-full" />
      {!ready && <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#283920] text-sm text-white/80"><img src="/assets/archava/minsum-concept.webp" alt="Ilustrasi avatar Minsum" className="h-32 w-32 rounded-full object-cover object-top" /><span>Menyiapkan Minsum live...</span></div>}
      <div className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-[#283920]/85 px-2 py-1 text-[10px] text-white"><img src="/assets/archava/minsum-concept.webp" alt="" className="h-5 w-5 rounded-full object-cover object-top" /> Minsum</div>
    </div>
  );
}

function CallControls({ session, onClose }: { session: AvatarSession; onClose: () => void }) {
  const { localParticipant } = useLocalParticipant();
  const [remaining, setRemaining] = useState(Math.max(0, session.endsAt - Math.floor(Date.now() / 1000)));
  const muted = !localParticipant?.isMicrophoneEnabled;
  useEffect(() => {
    const timer = window.setInterval(() => {
      const next = Math.max(0, session.endsAt - Math.floor(Date.now() / 1000));
      setRemaining(next);
      if (next === 0) onClose();
    }, 1000);
    return () => window.clearInterval(timer);
  }, [session.endsAt, onClose]);
  const toggleMicrophone = async () => {
    if (!localParticipant) return;
    await localParticipant.setMicrophoneEnabled(muted).catch(() => {});
  };
  return (
    <div className="flex items-center justify-between pt-3 text-sm text-[#35462B]">
      <span className="font-bold">Sesi live · {Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2, '0')}</span>
      <div className="flex items-center gap-2">
        <StartAudio label="Aktifkan audio" className="rounded-full border border-[#35462B]/20 px-2 py-1 text-xs" />
        <button type="button" onClick={() => void toggleMicrophone()} aria-label={muted ? 'Nyalakan mikrofon' : 'Matikan mikrofon'} className="rounded-full border border-[#35462B]/20 p-2 hover:bg-[#F8EFD9]">{muted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}</button>
        <button type="button" onClick={onClose} className="inline-flex items-center gap-1 rounded-full bg-[#E96B2B] px-3 py-2 text-xs font-bold text-white"><PhoneOff className="h-4 w-4" /> Akhiri</button>
      </div>
    </div>
  );
}

export function LiveAvatar({ session, onClose, onError, onHandoff }: { session: AvatarSession; onClose: () => void; onError: (message: string) => void; onHandoff: (handoff: MinsumHandoff) => void }) {
  return (
    <LiveKitRoom token={session.token} serverUrl={session.serverUrl} connect={false} audio video={false} options={{ singlePeerConnection: false }} onDisconnected={onClose} className="flex h-full flex-col">
      <RoomAudioRenderer />
      <div className="min-h-0 flex-1"><AvatarSurface session={session} onError={onError} onHandoff={onHandoff} /></div>
      <CallControls session={session} onClose={onClose} />
    </LiveKitRoom>
  );
}

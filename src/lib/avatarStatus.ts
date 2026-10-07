type AvatarFailureCode = 'provider_credits' | 'provider_auth' | 'voice_unavailable';
type AvatarWorkerStatus = { state: 'ready' } | { state: 'error'; code: AvatarFailureCode };

export class AvatarSessionError extends Error {}

export function parseAvatarWorkerStatus(metadata: string | undefined): AvatarWorkerStatus | null {
  try {
    const voice = JSON.parse(metadata || '{}')?.voice;
    if (!voice || voice.version !== 1) return null;
    if (voice.state === 'ready') return { state: 'ready' };
    if (voice.state === 'error') return { state: 'error', code: ['provider_credits', 'provider_auth'].includes(voice.code) ? voice.code : 'voice_unavailable' };
  } catch { /* Ignore unrelated or malformed room metadata. */ }
  return null;
}

export function avatarWorkerError(status: AvatarWorkerStatus | null): AvatarSessionError | null {
  if (status?.state !== 'error') return null;
  // Visitors get an actionable message; billing, credentials, and provider logs stay on the server.
  return new AvatarSessionError(status.code === 'provider_credits' || status.code === 'provider_auth'
    ? 'Bang Mus sedang tidak tersedia. Silakan lanjut lewat WhatsApp atau coba lagi nanti.'
    : 'Bang Mus belum bisa tersambung. Coba lagi atau lanjut lewat WhatsApp.');
}

interface StatusRoom {
  metadata?: string;
  on(event: 'roomMetadataChanged', listener: (metadata: string) => void): unknown;
  off(event: 'roomMetadataChanged', listener: (metadata: string) => void): unknown;
}

export function waitForAvatarWorker(room: StatusRoom, signal: AbortSignal, timeoutMs = 30000): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) { reject(new DOMException('Sesi dibatalkan.', 'AbortError')); return; }
    let settled = false;
    const finish = (error?: Error) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      room.off('roomMetadataChanged', check);
      signal.removeEventListener('abort', abort);
      if (error) reject(error); else resolve();
    };
    const check = (metadata: string) => {
      const status = parseAvatarWorkerStatus(metadata);
      const error = avatarWorkerError(status);
      if (error) finish(error);
      else if (status?.state === 'ready') finish();
    };
    const abort = () => finish(new DOMException('Sesi dibatalkan.', 'AbortError'));
    const timer = setTimeout(() => finish(new AvatarSessionError('Koneksi suara terlalu lama. Coba lagi atau lanjut lewat WhatsApp.')), timeoutMs);
    room.on('roomMetadataChanged', check);
    signal.addEventListener('abort', abort, { once: true });
    check(room.metadata || '');
  });
}

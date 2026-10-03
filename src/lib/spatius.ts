import { AvatarManager, AvatarSDK, DrivingServiceMode, type Avatar } from '@spatius/avatarkit';

let initializedAppId = '';
let initialization: Promise<void> | null = null;
export interface AvatarPreparationProgress {
  stage: 'initializing' | 'downloading' | 'ready';
  progress?: number;
}
interface Preparation {
  promise: Promise<Avatar>;
  progress: AvatarPreparationProgress;
  listeners: Set<(progress: AvatarPreparationProgress) => void>;
}
const avatars = new Map<string, Preparation>();

export async function prepareSpatiusAvatar(appId: string, avatarId: string, options?: {
  onProgress?: (progress: AvatarPreparationProgress) => void;
  signal?: AbortSignal;
}): Promise<Avatar> {
  if (!("RTCRtpScriptTransform" in globalThis)) throw new Error('Avatar live perlu Chrome atau Edge versi terbaru.');
  if (!appId || !avatarId) throw new Error('Konfigurasi avatar belum lengkap.');
  if (options?.signal?.aborted) throw new DOMException('Persiapan Minsum dibatalkan.', 'AbortError');
  if (initializedAppId && initializedAppId !== appId) throw new Error('Konfigurasi avatar berubah. Muat ulang halaman.');
  if (!initialization) {
    initializedAppId = appId;
    initialization = AvatarSDK.initialize(appId, { drivingServiceMode: DrivingServiceMode.rtc }).catch((error: unknown) => {
      initialization = null;
      initializedAppId = '';
      throw error;
    });
  }
  let preparation = avatars.get(avatarId);
  if (!preparation) {
    const current: Preparation = { promise: null!, progress: { stage: 'initializing' }, listeners: new Set() };
    const report = (progress: AvatarPreparationProgress) => {
      current.progress = progress;
      current.listeners.forEach((listener) => listener(progress));
    };
    current.promise = initialization.then(async () => {
      report({ stage: 'downloading', progress: 0 });
      const avatar = await AvatarManager.shared.load(avatarId, (progress) => {
        if (progress.type === 'downloading') report({ stage: 'downloading', progress: progress.progress });
      }, true);
      report({ stage: 'ready', progress: 1 });
      return avatar;
    }).catch((error: unknown) => {
      if (avatars.get(avatarId) === current) avatars.delete(avatarId);
      throw error;
    });
    avatars.set(avatarId, current);
    preparation = current;
  }
  if (!options) return preparation.promise;
  const current = preparation;
  return new Promise<Avatar>((resolve, reject) => {
    let settled = false;
    let stallTimer: ReturnType<typeof setTimeout>;
    let totalTimer: ReturnType<typeof setTimeout>;
    let previous: AvatarPreparationProgress | undefined;
    const cleanup = () => {
      clearTimeout(stallTimer);
      clearTimeout(totalTimer);
      current.listeners.delete(report);
      options.signal?.removeEventListener('abort', abort);
    };
    const fail = (error: Error) => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(error);
    };
    const timeout = () => {
      fail(new Error('Unduhan avatar terlalu lama. Periksa koneksi, lalu coba lagi atau lanjut via WhatsApp.'));
      // Release a stalled download so retry can request it again. Initialization
      // is shared by the SDK and has no cancellation API.
      if (current.progress.stage === 'downloading') AvatarManager.shared.cancelLoad(avatarId);
    };
    const abort = () => fail(new DOMException('Persiapan Minsum dibatalkan.', 'AbortError'));
    const report = (progress: AvatarPreparationProgress) => {
      if (settled) return;
      const advanced = !previous || progress.stage !== previous.stage || (progress.progress ?? 0) > (previous.progress ?? 0);
      if (advanced) {
        clearTimeout(stallTimer);
        if (progress.stage !== 'ready') stallTimer = setTimeout(timeout, progress.stage === 'initializing' ? 90000 : 60000);
      }
      previous = progress;
      options.onProgress?.(progress);
    };
    if (options.signal?.aborted) { abort(); return; }
    options.signal?.addEventListener('abort', abort, { once: true });
    current.listeners.add(report);
    totalTimer = setTimeout(timeout, 180000);
    report(current.progress);
    current.promise.then((avatar) => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(avatar);
    }, fail);
  });
}

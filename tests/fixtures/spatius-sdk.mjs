const downloads = new Map();
export const sdkTest = { initializations: 0, loads: 0, cancellations: 0,
  progress(id, progress) { downloads.get(id).onProgress({ type: 'downloading', progress }); },
  complete(id) { downloads.get(id).resolve({ id }); downloads.delete(id); },
};
export const DrivingServiceMode = { rtc: 'rtc' };
export const AvatarSDK = { async initialize() { sdkTest.initializations++; } };
export const AvatarManager = { shared: {
  load(id, onProgress) {
    sdkTest.loads++;
    onProgress({ type: 'downloading', progress: 0 });
    return new Promise((resolve, reject) => downloads.set(id, { resolve, reject, onProgress }));
  },
  cancelLoad(id) {
    if (!downloads.has(id)) return false;
    sdkTest.cancellations++;
    downloads.get(id).reject(new Error('Download cancelled'));
    downloads.delete(id);
    return true;
  },
} };

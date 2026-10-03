export function microphoneErrorMessage(cause: unknown): string {
  const name = cause instanceof Error ? cause.name : '';
  if (name === 'NotAllowedError' || name === 'PermissionDeniedError') return 'Mikrofon belum diizinkan. Buka izin situs di browser, izinkan mikrofon, lalu coba lagi. Kamu juga bisa lanjut lewat WhatsApp.';
  if (name === 'NotFoundError' || name === 'DevicesNotFoundError') return 'Mikrofon tidak ditemukan. Sambungkan mikrofon atau lanjut lewat WhatsApp.';
  if (name === 'NotReadableError' || name === 'TrackStartError') return 'Mikrofon belum bisa digunakan. Tutup aplikasi lain yang memakai mikrofon, lalu coba lagi.';
  return 'Mikrofon belum bisa dinyalakan. Periksa perangkat dan izin mikrofon, lalu coba lagi.';
}

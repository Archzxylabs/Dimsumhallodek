export const MEMBERSHIP_RATE_PERCENT = 1;

/** Whole points from the total product price. No shipping fees or reward value implied. */
export function calculateMembershipPoints(productTotal: number): number {
  if (!Number.isSafeInteger(productTotal) || productTotal < 0) throw new RangeError('Harga produk harus berupa rupiah bulat yang valid.');
  return Math.floor(productTotal / 100);
}

export function parseMembershipAmount(value: string): number | null {
  if (!/^\d+$/.test(value)) return null;
  const amount = Number(value);
  return Number.isSafeInteger(amount) && amount > 0 && amount <= 100_000_000 ? amount : null;
}

export function membershipRegistrationMessage(name: string, city: string): string {
  return [
    'Halo tim Dimsum Hallo Dek, saya ingin daftar membership.',
    ...(name.trim() ? [`Nama panggilan: ${name.trim()}`] : []),
    ...(city.trim() ? [`Kota / gerai yang biasa dikunjungi: ${city.trim()}`] : []),
    'Saya tertarik mengumpulkan poin 1% dari harga produk.',
    'Mohon bantu pendaftaran dan jelaskan cara pencatatan, penukaran, serta ketentuan poin yang berlaku.',
  ].join('\n');
}

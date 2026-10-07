export const HANDOFF_TOPIC = 'minsum.handoff.v1';

export type HandoffCategory = 'event' | 'partnership' | 'cake' | 'bouquet' | 'frozen' | 'menu' | 'membership' | 'other';
export interface MinsumHandoff { category: HandoffCategory; summary: string }

const categories: HandoffCategory[] = ['event', 'partnership', 'cake', 'bouquet', 'frozen', 'menu', 'membership', 'other'];

export const handoffLabels: Record<HandoffCategory, string> = {
  event: 'Layanan event',
  partnership: 'Kemitraan',
  cake: 'Dimsum Cake',
  bouquet: 'Dimsum Bouquet',
  frozen: 'Dimsum Frozen',
  menu: 'Menu dimsum',
  membership: 'Membership & poin',
  other: 'Dimsum Hallo Dek',
};

export function parseMinsumHandoff(value: unknown): MinsumHandoff | null {
  if (!value || typeof value !== 'object') return null;
  const candidate = value as Record<string, unknown>;
  if (candidate.type !== 'minsum_handoff' || typeof candidate.summary !== 'string') return null;
  const summary = candidate.summary.replace(/\s+/g, ' ').trim().slice(0, 600);
  if (!summary) return null;
  const category = categories.includes(candidate.category as HandoffCategory) ? candidate.category as HandoffCategory : 'other';
  return { category, summary };
}

export function getMinsumWhatsappUrl(handoff: MinsumHandoff | null, fallbackCategory: HandoffCategory = 'other'): string {
  const category = handoff?.category ?? fallbackCategory;
  const number = category === 'partnership' ? '6285802854744' : '6285863646267';
  const lines = [
    'Halo tim Dimsum Hallo Dek, saya ngobrol dengan Bang Mus di website.',
    `Saya ingin tanya ${handoffLabels[category].toLowerCase()}.`,
  ];
  if (handoff) lines.push(`Kebutuhan saya: ${handoff.summary}`);
  lines.push('Mohon bantu konfirmasi detail, harga, dan langkah berikutnya. Terima kasih!');
  return `https://wa.me/${number}?text=${encodeURIComponent(lines.join('\n'))}`;
}

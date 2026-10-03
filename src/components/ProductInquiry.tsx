import { useEffect, useState, type FormEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { isStringRecord, useSessionState } from '../lib/useSessionState';
import { whatsappUrl } from '../lib/business';
import { InquiryFeedback } from './InquiryFeedback';

const emptyDraft = { quantity: '', city: '', date: '', name: '', notes: '' };
type ProductDraft = typeof emptyDraft;

export function ProductInquiry({ id, name, unit, personalized }: { id: string; name: string; unit: string; personalized: boolean }) {
  const [draft, setDraft] = useSessionState(`product-${id}`, emptyDraft, (v): v is ProductDraft => isStringRecord(v, Object.keys(emptyDraft)));
  const [preparedUrl, setPreparedUrl] = useState('');
  useEffect(() => { setPreparedUrl(''); }, [draft]);
  const update = (field: keyof ProductDraft, value: string) => setDraft((previous) => ({ ...previous, [field]: value }));
  const today = new Date();
  const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const message = [
      `Halo Minsum, saya ingin konsultasi pesanan ${name}.`,
      draft.quantity ? `Jumlah yang direncanakan: ${draft.quantity} ${unit}` : '',
      draft.date ? `Tanggal kebutuhan: ${new Date(`${draft.date}T12:00:00`).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}` : '',
      draft.city.trim() ? `Kota/lokasi: ${draft.city.trim()}` : '',
      personalized && draft.name.trim() ? `Nama untuk dekorasi: ${draft.name.trim()}` : '',
      draft.notes.trim() ? `Catatan: ${draft.notes.trim()}` : '',
      'Mohon pilihan isi/ukuran, waktu persiapan, opsi pengiriman, dan harga resmi.',
    ].filter(Boolean).join('\n');
    const url = whatsappUrl(message);
    setPreparedUrl(url);
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  return <details className="product-inquiry">
    <summary>Rencanakan pesanan {name.replace('Dimsum ', '')}</summary>
    <form className="inquiry-form" onSubmit={submit}>
      <p>Sudah punya rencana? Tambahkan detailnya ke pesan. Semua kolom boleh menyusul.</p>
      <div className="form-pair">
        <label>Jumlah {unit} <span>(opsional)</span><input type="number" min="1" max="100000" value={draft.quantity} onChange={(e) => update('quantity', e.target.value)} placeholder="Contoh: 2" /></label>
        <label>Tanggal kebutuhan <span>(opsional)</span><input type="date" min={minDate} value={draft.date} onChange={(e) => update('date', e.target.value)} /></label>
      </div>
      <label>Kota / lokasi <span>(opsional)</span><input maxLength={180} value={draft.city} onChange={(e) => update('city', e.target.value)} placeholder="Contoh: Bogor" /></label>
      {personalized && <label>Nama untuk dekorasi <span>(opsional)</span><input maxLength={80} value={draft.name} onChange={(e) => update('name', e.target.value)} placeholder="Nama yang ingin ditampilkan" /></label>}
      <label>Preferensi isi / ukuran / desain <span>(opsional)</span><textarea rows={2} maxLength={600} value={draft.notes} onChange={(e) => update('notes', e.target.value)} placeholder="Tim akan memastikan pilihan yang tersedia." /></label>
      <button type="submit" className="button button-green">Siapkan pesan WhatsApp <ArrowUpRight size={18} /></button>
      <InquiryFeedback url={preparedUrl} />
      <div className="draft-controls"><span>Draf tersimpan di tab ini.</span><button type="button" onClick={() => { setDraft(emptyDraft); setPreparedUrl(''); }}>Hapus draf</button></div>
    </form>
  </details>;
}

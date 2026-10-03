import { ArrowUpRight } from 'lucide-react';

export function InquiryFeedback({ url }: { url: string }) {
  if (!url) return null;
  return <div className="inquiry-feedback" role="status">
    <strong>Pesan siap dibuka di WhatsApp.</strong>
    <p>Periksa dan kirim pesannya di WhatsApp. Belum ada pesan atau pesanan yang dikirim dari website.</p>
    <a href={url} target="_blank" rel="noopener noreferrer">Buka pesan WhatsApp <ArrowUpRight size={16} /></a>
  </div>;
}

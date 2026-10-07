import { useEffect, useState, type FormEvent } from 'react';
import { ArrowDown, ArrowUpRight, Gift, MessageCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router';
import catalog from '../../data/catalog.json';
import { BangMusPortrait } from '../components/BangMusPortrait';
import { Faq, Reveal, Spark } from '../components/DesignElements';
import { InquiryFeedback } from '../components/InquiryFeedback';
import { whatsappUrl } from '../lib/business';
import { calculateMembershipPoints, membershipRegistrationMessage, parseMembershipAmount } from '../lib/membership';
import { isStringRecord, useSessionState } from '../lib/useSessionState';

const rupiah = (value: number) => `Rp${value.toLocaleString('id-ID')}`;
const groups = [...new Set(catalog.map(product => product.group))];
const initial = { mode: 'product', product: 'cake-m', quantity: '1', amount: '100000' };
const emptyRegistration = { name: '', city: '' };

export function MembershipPage() {
  const [draft, setDraft] = useSessionState('membership-calculator', initial, (v): v is typeof initial =>
    isStringRecord(v, Object.keys(initial)) && ['product', 'amount'].includes(v.mode) && catalog.some(p => p.id === v.product));
  const [registration, setRegistration] = useSessionState('membership-registration', emptyRegistration, (v): v is typeof emptyRegistration =>
    isStringRecord(v, Object.keys(emptyRegistration)) && v.name.length <= 80 && v.city.length <= 120);
  const [preparedUrl, setPreparedUrl] = useState('');
  useEffect(() => { setPreparedUrl(''); }, [registration]);
  const product = catalog.find(product => product.id === draft.product)!;
  const quantity = parseMembershipAmount(draft.quantity);
  const validQuantity = quantity !== null && quantity <= 99;
  const total = draft.mode === 'product' ? (validQuantity ? product.price * quantity : null) : parseMembershipAmount(draft.amount);
  const points = total === null ? null : calculateMembershipPoints(total);
  const update = (field: keyof typeof initial, value: string) => setDraft(previous => ({ ...previous, [field]: value }));
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const url = whatsappUrl(membershipRegistrationMessage(registration.name, registration.city));
    setPreparedUrl(url);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return <>
    <section className="page-hero page-width membership-hero">
      <Reveal>
        <p className="eyebrow">Membership / Happy yang terkumpul</p>
        <h1 className="hero-title">MAKAN<br />ENAK.<br /><span className="text-orange">DAPAT POIN.</span></h1>
        <p className="hero-description">Favoritmu punya bonus. Kumpulkan poin<br className="membership-desktop-break" /> sebesar 1% dari harga produk.</p>
        <div className="membership-hero-actions">
          <a href="#daftar-member" className="button button-green">Daftar membership <ArrowUpRight size={18} /></a>
          <a href="#simulasi-poin" className="membership-text-link">Hitung poinmu <ArrowDown size={17} /></a>
        </div>
      </Reveal>
      <Reveal className="membership-card-scene" delay={0.1}>
        <div className="membership-card">
          <div className="membership-card-top"><span>HALLO DEK<br /><small>MEMBERSHIP</small></span><Spark /></div>
          <div className="membership-card-body"><div><span className="membership-card-rate">1<span>%</span></span><p>DARI HARGA PRODUK<br />JADI POIN KAMU.</p></div><BangMusPortrait full /></div>
          <div className="membership-card-bottom"><span>Happy bites. Happy points.</span><Gift size={21} /></div>
        </div>
        <p className="membership-card-caption"><Sparkles size={15} /> Bang Mus siap nemenin kamu ngumpulin happy.</p>
      </Reveal>
    </section>

    <section id="simulasi-poin" className="membership-simulator section-space">
      <div className="page-width membership-simulator-grid">
        <Reveal className="membership-calculator-copy">
          <p className="eyebrow">01 / Coba hitung</p>
          <h2 className="editorial-heading">Dimsumnya enak.<br /><span className="handwritten">Poinnya ikut.</span></h2>
          <p>Pilih produk favorit atau masukkan total harga produk. Langsung lihat berapa poin yang bisa dikumpulkan.</p>
          <div className="membership-formula"><span>Rp100.000</span><ArrowUpRight size={22} /><strong>1.000 poin</strong></div>
          <p className="membership-fine-print">Poin dikumpulkan dulu. Cara penukaran dan ketentuannya dikonfirmasi ke tim.</p>
        </Reveal>
        <div className="membership-calculator">
          <div className="membership-mode" role="group" aria-label="Cara simulasi poin">
            <button type="button" aria-pressed={draft.mode === 'product'} onClick={() => update('mode', 'product')}>Pilih produk</button>
            <button type="button" aria-pressed={draft.mode === 'amount'} onClick={() => update('mode', 'amount')}>Isi nominal</button>
          </div>
          {draft.mode === 'product' ? <div className="membership-calculator-fields">
            <label htmlFor="member-product">Produk pilihan<select id="member-product" value={draft.product} onChange={event => update('product', event.target.value)}>
              {groups.map(group => <optgroup label={group} key={group}>{catalog.filter(product => product.group === group).map(product => <option key={product.id} value={product.id}>{product.name} — {rupiah(product.price)}</option>)}</optgroup>)}
            </select></label>
            <div className="membership-product-quantity"><label htmlFor="member-quantity">Jumlah produk<input id="member-quantity" type="text" inputMode="numeric" maxLength={2} value={draft.quantity} onChange={event => update('quantity', event.target.value)} aria-invalid={!validQuantity} aria-describedby={!validQuantity ? 'member-calculator-error' : undefined} /></label><p>{rupiah(product.price)}<span>per produk</span></p></div>
          </div> : <label className="membership-amount" htmlFor="member-amount">Total harga produk (rupiah)<input id="member-amount" type="text" inputMode="numeric" maxLength={9} value={draft.amount} onChange={event => update('amount', event.target.value)} aria-invalid={total === null} aria-describedby="member-amount-note member-calculator-error" /><span id="member-amount-note">Angka saja, tanpa titik dan ongkir. Contoh: 100000.</span></label>}
          {total === null && <p id="member-calculator-error" className="membership-input-error" role="alert">{draft.mode === 'product' ? 'Masukkan jumlah 1–99 produk.' : 'Masukkan harga produk antara Rp1 dan Rp100.000.000.'}</p>}
          <div className="membership-point-result" role="status" aria-live="polite" aria-atomic="true">
            <div><span>Total harga produk</span><strong>{total === null ? '—' : rupiah(total)}</strong></div>
            <div><span>Estimasi poin · 1%</span><strong>{points === null ? '—' : points.toLocaleString('id-ID')}<small> poin</small></strong></div>
          </div>
          <p className="membership-fine-print">Simulasi, bukan saldo member. Harga mengacu pada katalog produk; harga transaksi dikonfirmasi tim. Pecahan poin pada simulasi dibulatkan ke bawah.</p>
          <button type="button" className="membership-reset" onClick={() => setDraft(initial)}>Reset simulasi</button>
        </div>
      </div>
    </section>

    <section id="daftar-member" className="page-width section-space membership-registration">
      <Reveal>
        <p className="eyebrow">02 / Jadi bagian dari happy</p>
        <h2 className="editorial-heading">Yuk, jadi<br /><span className="text-orange">member.</span></h2>
        <ol className="membership-steps">
          <li><span>01</span><div><h3>Daftar lewat tim</h3><p>Kirim permintaan pendaftaran lewat WhatsApp. Tim membantu aktivasi membership kamu.</p></div></li>
          <li><span>02</span><div><h3>Belanja, kumpulkan poin</h3><p>Sampaikan bahwa kamu member saat memesan. Admin mencatat poin berdasarkan transaksi produk.</p></div></li>
          <li><span>03</span><div><h3>Cek dan tukar lewat tim</h3><p>Tanyakan saldo ke admin. Pilihan penukaran dan syaratnya dikonfirmasi sebelum digunakan.</p></div></li>
        </ol>
      </Reveal>
      <form className="inquiry-form membership-signup-form" onSubmit={submit}>
        <div className="membership-form-heading"><BangMusPortrait decorative /><div><h3>Hallo, calon member!</h3><p>Kenalan dulu sama Bang Mus.</p></div></div>
        <div className="form-pair">
          <label>Nama panggilan <span>(opsional)</span><input type="text" autoComplete="given-name" maxLength={80} placeholder="Nama panggilanmu" value={registration.name} onChange={event => setRegistration(previous => ({ ...previous, name: event.target.value }))} /></label>
          <label>Kota / gerai langganan <span>(opsional)</span><input type="text" maxLength={120} placeholder="Contoh: Cileungsi" value={registration.city} onChange={event => setRegistration(previous => ({ ...previous, city: event.target.value }))} /></label>
        </div>
        <button className="button button-orange" type="submit">Daftar via WhatsApp <MessageCircle size={19} /></button>
        <p className="form-note">Periksa lalu kirim pesan di WhatsApp. Membership aktif setelah dikonfirmasi tim; formulir ini belum membuat akun.</p>
        <InquiryFeedback url={preparedUrl} />
        <div className="draft-controls"><span>Draf tersimpan di tab ini.</span><button type="button" onClick={() => { setRegistration(emptyRegistration); setPreparedUrl(''); }}>Hapus draf</button></div>
        <a className="membership-existing" href={whatsappUrl('Halo tim Dimsum Hallo Dek, saya sudah member. Mohon bantu cek saldo dan riwayat poin saya.')} target="_blank" rel="noopener noreferrer">Sudah member? Tanya saldo ke admin <ArrowUpRight size={16} /></a>
      </form>
    </section>

    <section className="page-width section-space faq-section membership-faq">
      <Reveal><p className="eyebrow">Biar jelas sebelum daftar</p><h2 className="editorial-heading">Tentang<br />poin kamu.</h2><Link to="/" className="membership-text-link">Cari dimsum favorit <ArrowUpRight size={17} /></Link></Reveal>
      <Faq items={[
        { question: 'Bagaimana cara menghitung poin?', answer: 'Poin sebesar 1% dari harga produk. Contoh: produk seharga Rp35.000 menghasilkan 350 poin, dan Rp100.000 menghasilkan 1.000 poin. Kalkulator menampilkan estimasi; admin mencatat poin setelah transaksi dikonfirmasi.' },
        { question: 'Bisa langsung ditukar jadi potongan harga?', answer: 'Poin dikumpulkan dulu. Nilai tukar, hadiah, minimum penukaran, dan masa berlaku belum ditetapkan di website. Konfirmasi ketentuan terbaru ke tim sebelum menukarkan poin.' },
        { question: 'Di mana saya melihat saldo poin?', answer: 'Pendaftaran dan pencatatan poin dibantu admin lewat WhatsApp. Hubungi tim untuk melihat saldo dan riwayat transaksi. Angka di kalkulator bukan saldo membership kamu.' },
        { question: 'Berlaku di semua gerai dan aplikasi delivery?', answer: 'Konfirmasi gerai, produk, dan kanal pembelian yang ikut program kepada tim saat memesan, termasuk transaksi lewat aplikasi delivery dan penggunaan promo.' },
      ]} />
    </section>
  </>;
}

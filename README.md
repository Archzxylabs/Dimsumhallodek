# 🥟 Dimsum Hallo Dek (CV Merza Perintis Sukses) - Web Content & UI/UX Rebuild Kit

## Jalankan website

```bash
npm install
npm run dev
```

Website terbuka di `http://localhost:5174`. Tombol **Chat WhatsApp** selalu berada di kanan bawah, termasuk saat slide menu berganti.

Website terdiri dari enam halaman: `/` untuk Menu Dimsum dan pengenalan brand, `/produk` untuk Hadiah & Frozen, `/event` untuk layanan serta rencana acara, `/kemitraan` untuk pilihan kerja sama, `/membership` untuk membership dan simulasi poin, dan `/gerai` untuk pencarian alamat. React Router menangani perpindahan halaman. Menu Favorit mempertahankan desain dan kontrol slide sebelumnya. Form produk, event, dan kemitraan menyiapkan pesan WhatsApp yang diperiksa dan dikirim sendiri oleh pengunjung. Draf formulir, filter gerai, dan pilihan slide disimpan di sessionStorage tab; pengunjung dapat menghapus draf formulir. Back/Forward memulihkan posisi scroll.

Section utama memakai ruang di bawah header untuk desktop/laptop; spacing, judul, dan visual mengikuti ukuran viewport. Pada HP konten mengalir lewat scroll dengan teks dan tombol yang tetap terbaca. Rencana pesanan produk memakai dialog yang menyimpan draf, perbandingan dan detail kemitraan berada di section terpisah, dan daftar gerai memakai pagination (3–4 per halaman sesuai viewport). Semua 38 gerai tetap dapat dicari; halaman daftar terakhir ikut tersimpan di tab. Konten dapat bertambah saat feedback/form dibuka atau teks diperbesar, tanpa dipotong dengan tinggi tetap.

Event dapat dikonsultasikan dengan tanggal yang belum pasti. Membuka detail model kemitraan tidak memilih model konsultasi; pilihan awal adalah “Belum menentukan”. Harga produk dan investasi kemitraan mengacu pada materi baru client; harga transaksi, fasilitas, dan ketentuan final tetap dikonfirmasi tim. Gerai menyediakan tombol konfirmasi ke tim pusat tanpa mengarang jam buka/kontak masing-masing cabang.

Daftar gerai mengikuti pembaruan client **17 Oktober 2026**: 38 nama, termasuk Bandung. Sumber website ada di `data/locations.json`, diimpor oleh `src/data/locationsData.ts`; salinan gerai juga tersimpan di `data/knowledge.json` sebagai referensi pengetahuan bisnis. Sinkronkan kedua JSON saat data client berubah. Dayeuh Luhur menjadi Bojong Sampora, Endu Raya menjadi Citra Indah, dan pencarian nama lama menampilkan lokasi baru. Alamat/pin lama tidak dipakai untuk gerai pindahan. Seluruh 38 gerai memiliki alamat jalan sejak pembaruan 17 Oktober 2026; sebagian belum memiliki pin Maps, dan gerai tanpa pin menyediakan konfirmasi WhatsApp. Kampung Tengah dan Pasar Meong masuk wilayah Cileungsi & Kab. Bogor per pembaruan 17 Oktober 2026 (alamat baru belum punya pin Maps). Rincian alamat dan sumber ada di `LOCATIONS.md`.

`data/knowledge.json` menyimpan pengetahuan bisnis yang sudah dikonfirmasi: menu, produk, event, tiga tipe kemitraan, membership, harga katalog, dan 38 gerai beserta catatan batasannya. Perbarui hanya dengan informasi yang sudah dikonfirmasi. Harga katalog terbaru sudah tersedia; sinkronkan `data/catalog.json`, tampilan produk, dan `data/knowledge.json` saat client memperbarinya. Harga transaksi, stok, jangkauan, syarat final kemitraan, dan ketersediaan tetap dikonfirmasi tim. Kontak WhatsApp untuk pesan dan konsultasi ada di `src/lib/business.ts`; bila nomor berubah, perbarui juga data kontak di `data/knowledge.json`.

Frontend tidak memakai variabel lingkungan; tidak ada kredensial yang perlu disetel untuk menjalankan atau men-deploy website.

## Data client dan membership

31 file unduhan baru dikelompokkan di [`client-data/2026-10-07`](client-data/2026-10-07/README.md). `manifest.json` mencatat nama asli, lokasi baru, ukuran, serta SHA-256. Enam file `.txt` sebenarnya JPEG dan ekstensinya sudah diperbaiki tanpa perubahan byte. File sumber hanya berada di arsip lokal; Git dan deployment membawa indeks, manifest, serta aset web yang digunakan.

Nama yang tampil di UI dan pesan WhatsApp adalah **Bang Musmid**. Header, layar, dan halaman membership memakai ilustrasi dari sheet client.

Membership sesuai arahan pemilik: daftar melalui WhatsApp/admin, poin sebesar **1% harga produk**, Rp100.000 = 1.000 poin. Poin dikumpulkan dulu dan penukaran dikonfirmasi tim. Website tidak membuat akun atau saldo; admin menangani aktivasi, pencatatan transaksi, saldo, dan riwayat. Form menyiapkan pesan yang dikirim sendiri oleh pengunjung, serta menyediakan tautan cek saldo ke admin.

Kalkulator di `/membership` mempunyai mode produk (30 pilihan dari poster client, jumlah 1–99) dan nominal harga produk (tanpa ongkir). Estimasi pecahan poin dibulatkan ke bawah; aturan pembulatan transaksi resmi dikonfirmasi admin. Simulasi tidak menambahkan poin dan tidak menyatakan 1 poin = Rp1. Penukaran, masa berlaku, kanal/gerai yang ikut program, dan aturan promo belum ditetapkan. Draf tersimpan per tab dan dapat dihapus. `npm run test:membership` memeriksa hitungan, input tidak valid, harga katalog, jumlah produk, dan pesan pendaftaran.

## Deployment

Verifikasi lokal: `npm run build` dan `npm run test:membership` (Node 22.18+ dengan dukungan TypeScript bawaan). Tes membership memeriksa hitungan poin, input tidak valid, harga katalog, jumlah produk, dan pesan pendaftaran.

Frontend dipublikasikan di `https://dimsumhallodek.vercel.app/` dan terhubung ke branch `main` GitHub: framework Vite, build `npm run build`, output `dist/`. Aturan di `vercel.json` meneruskan semua path ke `index.html` (SPA fallback). Tidak ada service backend yang perlu dideploy; seluruh komponen avatar live (folder `server/`, `backend/`, kredensial LiveKit/Gemini/Spatius, Dockerfile, Caddyfile, dan Railway) sudah dihapus dari repo.

Harga acuan produk mengikuti poster menu/cake/frozen client. Investasi kemitraan mengikuti deck baru 25 halaman: Flexible Rp15.999.999, Collaborative Rp27.999.999, Full Managed minimum Rp119.999.999. Versi PDF web dikompresi menjadi sekitar 4,7 MB; dokumen asli tetap di arsip lokal. File video demo akan dibuat terpisah.

---

## 📁 Struktur Workspace

```bash
Dimsumhallodek/
├── assets/
│   ├── images/                                # 24 Aset visual (Logo, Menu, Booth, Banner)
│   ├── Bergabunglah_bersama_kemitraan_DHD.pdf # Proposal Resmi Kemitraan (14 Halaman)
│   ├── kemitraan_deck_text.txt                # Ekstraksi teks lengkap dari PDF kemitraan
│   └── ASSET_CATALOG.md                       # Katalog mapping fungsi UI tiap file gambar
│
├── data/
│   ├── locations.json                         # 38 gerai, alamat/pin yang tersedia, alias dan perpindahan
│   ├── menu.json                              # Data menu unggulan, rasa & deskripsi
│   ├── kemitraan.json                         # Data paket franchise, simulasi ROI, SOP
│   ├── catalog.json                           # Harga katalog 30 produk (sumber harga website)
│   └── knowledge.json                         # Pengetahuan bisnis terkonfirmasi (menu, gerai, kemitraan, membership)
│
├── raw_content/
│   ├── home_page.html                         # Raw HTML landing page original
│   └── lokasi_gerai.html                      # Raw HTML halaman lokasi gerai (/sample-page/)
│
├── LOCATIONS.md                               # Tabel database gerai terformat rapi per regional
├── MENU.md                                    # Katalog menu lengkap & event catering
├── KEMITRAAN.md                               # Detail skema franchise autopilot 28jt - 35jt
└── REBUILD_SPEC_AND_UIUX_BLUEPRINT.md         # Blueprint & Design System UI/UX Rebuild
```

---

## ⚡ Ringkasan Ekstraksi Konten

1. **Brand Identity**:
   - **Nama Brand**: Dimsum Hallo Dek (DHD)
   - **Badan Usaha**: CV Merza Perintis Sukses
   - **Slogan / Tagline**: `Enak & Gurih Bikin Nagih`
   - **Tone of Voice**: Ramah, ceria, bersahabat ("Bang Musmid"), menggiurkan (*appetizing*).

2. **Daftar Menu Unggulan**:
   - Dimsum Mix Mentai Tartar (Signature Torched)
   - Dimsum Carbonara (Cheesy Creamy)
   - Dimsum Hot Lava Mentai (Spicy Creamy)
  - Dimsum Big Melt (Isian Mozzarella Lumer — Cheese Pull)
   - Dimsum Cake / Birthday Tower (Special Event / Alternatif Tart)
   - Dimsum Platter 16 pcs Full Mentai (Sharing Box)

3. **Database Jaringan Cabang (38 Gerai dalam daftar client, 17 Oktober 2026)**:
   - **Cileungsi & Kab. Bogor**: 18 Gerai, termasuk Cariu, Citra Indah, Kampung Tengah, dan Pasar Meong
   - **Bogor & sekitarnya**: 7 Gerai (Pasir Kuda, Ciomas, Cimanggu, Ciapus, Kebon Pedes, Cibanteng, Bogor Nirwana Residence)
   - **Kota & Kab. Bekasi**: 3 Gerai (Kranggan, Armed, Setu)
   - **Sukabumi**: 7 Gerai, termasuk Bojong Sampora sebagai lokasi baru Dayeuh Luhur
   - **Bandung & sekitarnya**: 3 Gerai (Rancaekek Kencana, Linggar, Cicalengka)

4. **Program Kemitraan (Franchise Autopilot)**:
   - Sistem **100% Autopilot** (Semua operasional, staf, stok, dan kontrol di-handle pusat).
   - Skema Bagi Hasil Bersih: **70% Manajemen : 30% Mitra**.
   - Paket Gerobak Container: **Rp 28.000.000** (Radius ≤ 15 km) & **Rp 35.000.000** (Radius > 25 km).
   - Estimasi Passive Income Mitra: **Rp 4.500.000 / bulan** (Est. payback ~6-8 bulan).

5. **Kontak Resmi**:
   - WhatsApp CS & Pemesanan: `+62 858-6364-6267`
   - WhatsApp Kemitraan: `+62 858-0285-4744`
   - Office: Ruko Permata Cibubur Blok G5 No. 03, Cileungsi, Kab. Bogor 16820

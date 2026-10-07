# 🥟 Dimsum Hallo Dek (PT Merza Perintis Sukses) - Web Content & UI/UX Rebuild Kit

## Jalankan demo website dan avatar

```bash
npm install
npm run dev
```

Website terbuka di `http://localhost:5174`. Tombol **Talk to Minsum** selalu berada di kanan bawah, termasuk saat slide menu berganti. Saat diklik, panel avatar Spatius terbuka di sisi kanan dan sesi suara langsung disiapkan. Tidak ada form chat teks.

Website terdiri dari lima halaman: `/` untuk Menu Dimsum dan pengenalan brand, `/produk` untuk Hadiah & Frozen, `/event` untuk layanan serta rencana acara, `/kemitraan` untuk pilihan kerja sama, dan `/gerai` untuk pencarian alamat. React Router menangani perpindahan halaman tanpa memulai ulang panel Minsum. Menu Favorit mempertahankan desain dan kontrol slide sebelumnya. Form produk, event, dan kemitraan menyiapkan pesan WhatsApp yang diperiksa dan dikirim sendiri oleh pengunjung. Draf formulir, filter gerai, dan pilihan slide disimpan di sessionStorage tab; pengunjung dapat menghapus draf formulir. Back/Forward memulihkan posisi scroll.

Section utama memakai ruang di bawah header untuk desktop/laptop; spacing, judul, dan visual mengikuti ukuran viewport. Pada HP konten mengalir lewat scroll dengan teks dan tombol yang tetap terbaca. Rencana pesanan produk memakai dialog yang menyimpan draf, perbandingan dan detail kemitraan berada di section terpisah, dan daftar gerai memakai pagination (3–4 per halaman sesuai viewport). Semua 38 gerai tetap dapat dicari; halaman daftar terakhir ikut tersimpan di tab. Konten dapat bertambah saat feedback/form dibuka atau teks diperbesar, tanpa dipotong dengan tinggi tetap.

Event dapat dikonsultasikan dengan tanggal yang belum pasti. Membuka detail model kemitraan tidak memilih model konsultasi; pilihan awal adalah “Belum menentukan”. Informasi produk dan gambaran perbandingan kemitraan tetap mengidentifikasi data demo dan detail yang belum dikonfirmasi. Gerai menyediakan tombol konfirmasi ke tim pusat tanpa mengarang jam buka/kontak masing-masing cabang.

Daftar gerai mengikuti pembaruan client 7 Oktober 2026: 38 nama, termasuk Bandung. Sumber website ada di `data/locations.json`, diimpor oleh `src/data/locationsData.ts`; pengetahuan Minsum menyimpan salinan gerai di `backend/knowledge.json`. Sinkronkan kedua JSON saat data client berubah. Dayeuh Luhur menjadi Bojong Sampora, Endu Raya menjadi Citra Indah, dan pencarian nama lama menampilkan lokasi baru. Alamat/pin lama tidak dipakai untuk gerai pindahan. Linggar dan Cicalengka mempunyai alamat jalan yang belum lengkap, bukan status belum beroperasi. Gerai tanpa alamat/pin menyediakan konfirmasi WhatsApp. Wilayah Kampung Tengah dan Pasar Meong masih perlu konfirmasi. Rincian alamat dan sumber ada di `LOCATIONS.md`.

Launcher Minsum menghindari posisi yang menutupi tindakan lain. Panel mobile diperkecil, error mikrofon diberi penjelasan, dan status agent LiveKit ditampilkan sebagai mendengarkan/memproses/menjawab. Foto mempunyai versi WebP dan srcset. Avatar dipanaskan setelah halaman utama selesai dimuat saat koneksi mendukung; data saver/koneksi lambat menunggu niat pengguna. Pengunduhan avatar menampilkan progres; batas waktu dihitung dari progres terakhir (90 detik inisialisasi, 60 detik unduhan tidak bergerak, maksimal 3 menit keseluruhan). Room baru dibuat setelah model siap, dan countdown dimulai setelah koneksi serta percobaan aktivasi mikrofon selesai.

Minsum menjawab berdasarkan `backend/knowledge.json`. Ia mengenalkan menu, produk, event, dan tiga tipe kemitraan, lalu menanyakan detail yang relevan saat pengunjung ingin memesan atau berkonsultasi. Saat detail terkumpul, Minsum menyiapkan ringkasan di bawah avatar. Pengunjung dapat memeriksa dan mengirimnya sendiri melalui tombol WhatsApp; percakapan tidak otomatis dikirim atau disimpan sebagai lead. Jika ringkasan belum ada, tersedia tombol langsung untuk produk/event dan kemitraan.

Perbarui `backend/knowledge.json` hanya dengan informasi bisnis yang sudah dikonfirmasi, lalu deploy ulang `minsum-worker`. Harga demo di website tidak boleh disalin menjadi harga resmi Minsum. Harga, stok, jangkauan, syarat kemitraan, dan ketersediaan masih harus dikonfirmasi oleh tim. Kontak WhatsApp untuk handoff ada di `src/lib/minsumHandoff.ts`; bila nomor berubah, perbarui juga data kontak di `backend/knowledge.json`.

Untuk percakapan suara live, salin `.env.example` menjadi `.env` lalu isi kredensial LiveKit, Gemini, dan Spatius di server. Set `AVATAR_DEMO_ENABLED=true`. Jalankan API dan worker secara terpisah:

```bash
npm run avatar:api
python -m pip install -r backend/requirements.txt
npm run avatar:worker
```

Browser memerlukan dukungan RTCRtpScriptTransform dan izin mikrofon; Chrome atau Edge terbaru dapat digunakan. Sesi demo berlangsung dua menit setelah koneksi suara dibuat. Client baru meminta `startOnConnect` saat membuat sesi dan mengaktifkan countdown lewat `/api/archava/start`; server memberi waktu setup maksimal 45 detik dan membersihkan sesi yang tidak tersambung. Client lama tetap mendapat sesi dua menit dari pembuatan sesi. Kredensial tidak boleh dimasukkan ke variabel `VITE_*` atau kode frontend. API dan worker harus tersedia agar avatar live berfungsi.

## Deployment

Verifikasi lokal: `npm run build`, `npm run test:avatar-api`, dan `npm run test:avatar-loading` (Node 22.18+ dengan dukungan TypeScript). Tes API memakai SDK tiruan dan credential dummy untuk memeriksa aktivasi sesi 120 detik, idempotensi start, kompatibilitas client lama, batas sesi, request tidak valid, dan pembersihan sesi; tidak membuat room live. Tes loading memakai SDK tiruan dan waktu virtual untuk memeriksa unduhan yang masih bergerak setelah 40 detik, cache prewarm, retry setelah unduhan macet, dan penutupan panel.

Frontend dipublikasikan di `https://dimsumhallodek.vercel.app/` dan terhubung ke branch `main` GitHub. Aturan di `vercel.json` meneruskan `/api/archava/*` ke service `minsum-api` di Railway. Project Railway `dimsumhallodek` menjalankan tiga service dari repo yang sama:

| Service | Root directory | Secret dan konfigurasi |
| --- | --- | --- |
| `minsum-api` | `/server` | `LIVEKIT_URL`, `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`, `SPATIUS_APP_ID`, `SPATIUS_AVATAR_ID`, `AVATAR_DEMO_ENABLED=true`, `WEB_ORIGIN=https://dimsumhallodek.vercel.app` |
| `minsum-worker` | `/backend` | `LIVEKIT_URL`, `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`, `GEMINI_API_KEY`, `GEMINI_MODEL`, `GEMINI_VOICE`, `SPATIUS_API_KEY`, `SPATIUS_APP_ID`, `SPATIUS_AVATAR_ID` |
| `minsum-web` | `/` | URL demo cadangan di Railway; Dockerfile membangun Vite dan Caddy meneruskan API ke `minsum-api` |

`PORT` disediakan Railway otomatis untuk API. Simpan semua nilai credential di Railway Variables masing-masing service; file `.env` hanya untuk pengembangan lokal dan tidak di-commit. Saat mengganti URL Vercel atau domain API, sesuaikan `WEB_ORIGIN` dan aturan rewrite.
Worker memerlukan pustaka sistem `libopus0`; `backend/railpack.json` memasangnya pada image Railway.
`WEB_ORIGIN` menerima beberapa origin yang dipisahkan koma, misalnya domain Vercel dan Railway. URL demo cadangan adalah `https://minsum-web-production.up.railway.app/`. Integrasi Railway ke repo GitHub belum diaktifkan; rilis ketiga service Railway dilakukan lewat CLI.

Jalankan deploy dari root repo dengan path service yang tepat. `--service` memilih tujuan deploy, sedangkan `--path-as-root` memastikan konfigurasi dan dependensi service diambil dari foldernya:

```bash
railway up server --path-as-root --service minsum-api --detach
railway up backend --path-as-root --service minsum-worker --detach
railway up --service minsum-web --detach
```

Harga pada kartu produk dan paket kemitraan adalah angka dummy untuk presentasi, bukan penawaran resmi. File video demo tidak disertakan karena akan dibuat terpisah.

Kit lengkap ekstraksi data, konten, aset media, dan blueprint UI/UX dari domain **`https://merzaperintissukses.com/`**.

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
│   └── kemitraan.json                         # Data paket franchise, simulasi ROI, SOP
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
   - **Badan Usaha**: PT Merza Perintis Sukses
   - **Slogan / Tagline**: `#AutoHappy Setiap Hari`
   - **Tone of Voice**: Ramah, ceria, bersahabat ("Minsum"), menggiurkan (*appetizing*).

2. **Daftar Menu Unggulan**:
   - Dimsum Mix Mentai Tartar (Signature Torched)
   - Dimsum Carbonara (Cheesy Creamy)
   - Dimsum Hot Lava Mentai (Spicy Creamy)
   - Dimsum Cake / Birthday Tower (Special Event / Alternatif Tart)
   - Dimsum Platter 16 pcs Full Mentai (Sharing Box)

3. **Database Jaringan Cabang (38 Gerai dalam daftar client, 7 Oktober 2026)**:
   - **Cileungsi & Kab. Bogor**: 16 Gerai, termasuk Cariu dan Citra Indah
   - **Bogor & sekitarnya**: 7 Gerai (Pasir Kuda, Ciomas, Cimanggu, Ciapus, Kebon Pedes, Cibanteng, Bogor Nirwana Residence)
   - **Kota & Kab. Bekasi**: 3 Gerai (Kranggan, Armed, Setu)
   - **Sukabumi**: 7 Gerai, termasuk Bojong Sampora sebagai lokasi baru Dayeuh Luhur
   - **Bandung & sekitarnya**: 3 Gerai (Rancaekek Kencana, Linggar, Cicalengka)
   - **Wilayah perlu konfirmasi**: Kampung Tengah dan Pasar Meong

4. **Program Kemitraan (Franchise Autopilot)**:
   - Sistem **100% Autopilot** (Semua operasional, staf, stok, dan kontrol di-handle pusat).
   - Skema Bagi Hasil Bersih: **70% Manajemen : 30% Mitra**.
   - Paket Gerobak Container: **Rp 28.000.000** (Radius ≤ 15 km) & **Rp 35.000.000** (Radius > 25 km).
   - Estimasi Passive Income Mitra: **Rp 4.500.000 / bulan** (Est. payback ~6-8 bulan).

5. **Kontak Resmi**:
   - WhatsApp CS & Pemesanan: `+62 858-6364-6267`
   - WhatsApp Kemitraan: `+62 858-0285-4744`
   - Office: Ruko Permata Cibubur Blok G5 No. 03, Cileungsi, Kab. Bogor 16820

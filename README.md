# 🥟 Dimsum Hallo Dek (PT Merza Perintis Sukses) - Web Content & UI/UX Rebuild Kit

## Jalankan demo website dan avatar

```bash
npm install
npm run dev
```

Website terbuka di `http://localhost:5174`. Tombol **Talk to Minsum** selalu berada di kanan bawah, termasuk saat slide menu berganti. Saat diklik, panel avatar Spatius terbuka di sisi kanan dan sesi suara langsung disiapkan. Tidak ada form chat teks.

Website terdiri dari lima halaman: `/` untuk Menu Favorit dan pengenalan brand, `/produk` untuk Cake/Bouquet/Frozen, `/event` untuk layanan serta rencana acara, `/kemitraan` untuk pilihan kerja sama, dan `/gerai` untuk pencarian alamat. React Router menangani perpindahan halaman tanpa memulai ulang panel Minsum. Menu Favorit mempertahankan desain dan kontrol slide sebelumnya. Form event dan kemitraan menyiapkan pesan WhatsApp yang diperiksa dan dikirim sendiri oleh pengunjung.

Minsum menjawab berdasarkan `backend/knowledge.json`. Ia mengenalkan menu, produk, event, dan tiga tipe kemitraan, lalu menanyakan detail yang relevan saat pengunjung ingin memesan atau berkonsultasi. Saat detail terkumpul, Minsum menyiapkan ringkasan di bawah avatar. Pengunjung dapat memeriksa dan mengirimnya sendiri melalui tombol WhatsApp; percakapan tidak otomatis dikirim atau disimpan sebagai lead. Jika ringkasan belum ada, tersedia tombol langsung untuk produk/event dan kemitraan.

Perbarui `backend/knowledge.json` hanya dengan informasi bisnis yang sudah dikonfirmasi, lalu deploy ulang `minsum-worker`. Harga demo di website tidak boleh disalin menjadi harga resmi Minsum. Harga, stok, jangkauan, syarat kemitraan, dan ketersediaan masih harus dikonfirmasi oleh tim. Kontak WhatsApp untuk handoff ada di `src/lib/minsumHandoff.ts`; bila nomor berubah, perbarui juga data kontak di `backend/knowledge.json`.

Untuk percakapan suara live, salin `.env.example` menjadi `.env` lalu isi kredensial LiveKit, Gemini, dan Spatius di server. Set `AVATAR_DEMO_ENABLED=true`. Jalankan API dan worker secara terpisah:

```bash
npm run avatar:api
python -m pip install -r backend/requirements.txt
npm run avatar:worker
```

Browser memerlukan Chrome atau Edge terbaru dan izin mikrofon. Sesi demo berlangsung dua menit. Kredensial tidak boleh dimasukkan ke variabel `VITE_*` atau kode frontend. API dan worker harus tersedia agar avatar live berfungsi.

## Deployment

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
│   ├── locations.json                         # 27+ Data gerai (Alamat & Google Maps URL)
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

3. **Database Jaringan Cabang (27+ Gerai)**:
   - **Cileungsi & Kab. Bogor**: 14 Gerai (termasuk Kitchen Pusat di Permata Cibubur)
   - **Kota Bogor**: 4 Gerai (Pasirkuda, Cimanggu, Ciomas, Pandu Raya)
   - **Kota & Kab. Bekasi**: 2 Gerai (Kranggan, Setu)
   - **Sukabumi**: 7 Gerai (Cisaat, Lembursitu, Nyomplong, Karamat, Sukaraja, Dayeuh Luhur, Gedong Panjang)

4. **Program Kemitraan (Franchise Autopilot)**:
   - Sistem **100% Autopilot** (Semua operasional, staf, stok, dan kontrol di-handle pusat).
   - Skema Bagi Hasil Bersih: **70% Manajemen : 30% Mitra**.
   - Paket Gerobak Container: **Rp 28.000.000** (Radius ≤ 15 km) & **Rp 35.000.000** (Radius > 25 km).
   - Estimasi Passive Income Mitra: **Rp 4.500.000 / bulan** (Est. payback ~6-8 bulan).

5. **Kontak Resmi**:
   - WhatsApp CS & Pemesanan: `+62 858-6364-6267`
   - WhatsApp Kemitraan: `+62 858-0285-4744`
   - Office: Ruko Permata Cibubur Blok G5 No. 03, Cileungsi, Kab. Bogor 16820

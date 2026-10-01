# 🥟 Dimsum Hallo Dek (PT Merza Perintis Sukses) - Web Content & UI/UX Rebuild Kit

## Jalankan demo website dan avatar

```bash
npm install
npm run dev
```

Website terbuka di `http://localhost:5174`. Tombol **Talk to Minsum** selalu berada di kanan bawah, termasuk saat slide menu berganti. Saat diklik, panel avatar terbuka di sisi kanan. Panduan teks dapat dicoba tanpa backend.

Untuk percakapan suara live, salin `.env.example` menjadi `.env` lalu isi kredensial LiveKit, Gemini, dan Spatius di server. Set `AVATAR_DEMO_ENABLED=true`. Jalankan API dan worker secara terpisah:

```bash
npm run avatar:api
python -m pip install -r backend/requirements.txt
npm run avatar:worker
```

Browser memerlukan Chrome atau Edge terbaru dan izin mikrofon. Sesi demo berlangsung dua menit. Kredensial tidak boleh dimasukkan ke variabel `VITE_*` atau kode frontend. API dan worker harus tersedia saat situs dipublikasikan agar mode suara live berfungsi; build statis saja menyediakan panduan teks.

## Deployment

Frontend dipublikasikan di Vercel. Aturan di `vercel.json` meneruskan `/api/archava/*` ke service `minsum-api` di Railway. Project Railway `dimsumhallodek` menjalankan dua service dari repo yang sama:

| Service | Root directory | Secret dan konfigurasi |
| --- | --- | --- |
| `minsum-api` | `/server` | `LIVEKIT_URL`, `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`, `SPATIUS_APP_ID`, `SPATIUS_AVATAR_ID`, `AVATAR_DEMO_ENABLED=true`, `WEB_ORIGIN=https://dimsumhallodek.vercel.app` |
| `minsum-worker` | `/backend` | `LIVEKIT_URL`, `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`, `GEMINI_API_KEY`, `GEMINI_MODEL`, `GEMINI_VOICE`, `SPATIUS_API_KEY`, `SPATIUS_APP_ID`, `SPATIUS_AVATAR_ID` |

`PORT` disediakan Railway otomatis untuk API. Simpan semua nilai credential di Railway Variables masing-masing service; file `.env` hanya untuk pengembangan lokal dan tidak di-commit. Saat mengganti URL Vercel atau domain API, sesuaikan `WEB_ORIGIN` dan aturan rewrite.
Worker memerlukan pustaka sistem `libopus0`; `backend/railpack.json` memasangnya pada image Railway.

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

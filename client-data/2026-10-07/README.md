# Data client — 7 Oktober 2026

31 file asli dipindahkan dari root dan dikelompokkan berdasarkan penggunaan. Konten file tidak diubah; manifest mencatat nama unduhan, lokasi baru, ukuran, dan SHA-256.

| Folder | Isi |
| --- | --- |
| `produk/` | 18 foto varian dan jumlah isi |
| `menu/` | Poster harga, cake, frozen, promo Year-End, dan visual GoFood Mozza |
| `paket-event/` | Poster paket birthday dan wedding |
| `maskot/` | Master reference, ekspresi, pose marketing, dan lifestyle |
| `kemitraan/` | PDF 25 halaman dan teks hasil ekstraksi |

## Catatan penggunaan

- Enam file unduhan `.txt` ternyata JPEG. Ekstensi diperbaiki ke `.jpg` tanpa mengubah byte gambar.
- Nama maskot yang dipakai website adalah **Bang Mus**, sesuai arahan pemilik. Sheet masih berlabel “Mas Musmid”; file asli dipertahankan.
- Foto `mentar-16.jpg` dipertahankan terpisah. Belum diasumsikan sebagai duplikat Mentai atau Tartar.
- Promo Year-End tidak diperlakukan sebagai promo aktif karena periode berlakunya tidak tersedia.
- Poster menu memuat Original 4 pcs; foto Original 6/16 pcs tidak menetapkan harga varian tersebut.
- PDF kemitraan menggantikan deck Oktober 2025 sebagai acuan terbaru. Proyeksi pendapatan bukan jaminan hasil.
- File asli disimpan lokal dan dikecualikan dari Git/deployment. Manifest dan indeks disimpan di repo; aset WebP untuk website ada di `public/assets/bang-mus/`.
- Harga acuan produk untuk simulasi membership ada di `data/catalog.json`. Ketentuan penukaran, kedaluwarsa, dan penerapan poin di kanal penjualan perlu dikonfirmasi.

Buatkan SEMUA halaman detail dan listing yang dibutuhkan supaya setiap card dan tombol di landing page punya tujuan yang jelas saat diklik. Ikuti struktur data dan aturan privasi yang sudah ada di PRD.md dan CLAUDE.md. Jangan ubah section/komponen yang sudah ada di landing page — ini murni menambahkan halaman tujuan baru untuk link yang belum berfungsi.

Berikut peta lengkap: card/tombol apa yang diklik, menuju halaman apa.

## 1. Kalkulator Zakat
- Tombol "Bayar Zakat Sekarang" di kartu hasil kalkulator → buka halaman Bayar Zakat, berisi ringkasan perhitungan (nominal harta, nishab, zakat wajib) yang terbawa dari kalkulator, form pembayaran (nominal bisa diedit, nama, kontak, toggle anonim, pilihan metode pembayaran).
- Tombol "Bayar" di form pembayaran zakat, setelah transaksi sukses (dikonfirmasi webhook) → redirect ke Halaman Terima Kasih (lihat poin 7).
- Kalau transaksi gagal/kedaluwarsa → redirect ke Halaman Pembayaran Gagal (lihat poin 8).

## 2. Card Donasi/Campaign
- Klik card donasi di landing page (baik yang pinned maupun grid) → buka halaman Detail Donasi: foto, deskripsi lengkap, progress bar terkumpul vs target, form donasi (nominal cepat + custom, metode bayar, checkbox opsional biaya admin, toggle anonim), breakdown biaya sebelum bayar.
- Tombol "Donasi" pada card → langsung scroll/buka ke bagian form donasi di halaman Detail Donasi yang sama (bukan halaman terpisah).
- Setelah transaksi donasi sukses → Halaman Terima Kasih (poin 7). Gagal/kedaluwarsa → Halaman Pembayaran Gagal (poin 8).
- Tombol "Lihat Semua Campaign" → buka halaman Semua Donasi (listing grid seluruh campaign, tanpa batas pinned/grid, dengan pagination).

## 3. Card Program Pemberdayaan / Divisi Pendidikan / SARSIP
- Klik card program di ketiga section ini (Program Pemberdayaan, Divisi Pendidikan, SARSIP) → buka halaman Detail Program YANG SAMA (satu komponen halaman, datanya beda berdasarkan kategori: umum/pendidikan/sarsip). Isi: foto, deskripsi, syarat, dan tombol CTA.
- Tombol CTA di halaman Detail Program:
  - Jika `pendaftaran_dibuka = true` → tombol aktif "Daftar Sekarang", klik membuka form pendaftaran singkat (nama, kontak, catatan) ATAU redirect ke WhatsApp dengan pesan template terisi otomatis (pilih salah satu pendekatan, buat form sederhana lebih disarankan supaya data pendaftar tersimpan di database untuk admin).
  - Jika `pendaftaran_dibuka = false` → tombol nonaktif, teks berubah jadi "Kuota Penuh" atau "Pendaftaran Ditutup".
- Tombol "Lihat Semua Program" (masing-masing section, atau gabungan) → buka halaman Semua Program dengan filter tab kategori (Umum/Pendidikan/SARSIP).

## 4. Card Kegiatan
- Klik card kegiatan → buka halaman Detail Kegiatan: foto, deskripsi lengkap, tanggal, lokasi.
- Tombol "Lihat Semua Kegiatan" → buka halaman Semua Kegiatan (listing grid).

## 5. Card Penyaluran Bantuan
- Klik card penerima manfaat → buka halaman Detail Penerima Manfaat, HANYA menampilkan field publik (nama, umur hasil hitung, jenis kelamin, foto, masalah yang dihadapi, kebutuhan, cara tahu LAZSIP, nama verifikator, daerah cakupan verifikator, tipe bantuan). JANGAN PERNAH tampilkan atau kirim ke response publik: alamat, tanggal lahir asli, status pernikahan.
- Filter chip tipe bantuan (Semua/Pendidikan/Kesehatan/Kebutuhan Pokok/Lainnya) di section landing page dan di halaman listing harus berfungsi memfilter data sesuai kolom `tipe_bantuan`.
- Tombol "Lihat Semua" → buka halaman Semua Penyaluran Bantuan (listing grid dengan filter chip yang sama).

## 6. Card Berita
- Klik card berita (pinned maupun grid) → buka halaman Detail Berita: foto, judul, tanggal, estimasi waktu baca, isi artikel lengkap.
- Tombol "Lihat Semua"/"Baca Selengkapnya" pada listing → buka halaman Semua Berita (listing grid dengan pagination).

## 7. Halaman Terima Kasih
- Satu komponen halaman reusable untuk donasi maupun zakat (beda data yang ditampilkan sesuai jenis transaksi).
- Isi: konfirmasi sukses, ringkasan transaksi (nominal, untuk campaign apa/jenis zakat apa, metode bayar, waktu), tombol share ke WhatsApp, tombol kembali ke beranda.

## 8. Halaman Pembayaran Gagal/Kedaluwarsa
- Satu komponen halaman reusable untuk donasi maupun zakat.
- Isi: pesan jelas kenapa gagal (kedaluwarsa/dibatalkan/error), tombol "Coba Lagi" yang kembali ke halaman detail campaign/zakat yang sama dengan data form yang sudah terisi ulang jika memungkinkan.

## 9. Navbar dan Footer
- Menu "Tentang" di navbar → buka halaman Tentang Kami (versi lengkap: visi-misi, struktur organisasi, legalitas — akta notaris, izin Dinsos/Kemenkumham/BAZNAS/Kemenag).
- Tautan "Kontak" di footer → buka halaman Kontak (alamat kantor, jam operasional, form kontak sederhana yang tersimpan ke database untuk dicek admin).
- Floating tombol WhatsApp di semua halaman → langsung membuka WhatsApp dengan nomor CS resmi (satu nomor konsisten di semua halaman, jangan berbeda-beda).

## Instruksi Pengerjaan

- Kerjakan satu per satu per section (jangan sekaligus semua dalam satu response), urutan disarankan: Detail Berita → Detail Kegiatan → Detail Program (dipakai bersama 3 section) → Semua Berita/Kegiatan/Program (listing) → Detail Donasi (kalau belum ada) → Halaman Terima Kasih & Gagal (reusable, dipakai donasi dan zakat) → Detail Penerima Manfaat & Semua Penyaluran Bantuan (paling sensitif soal privasi, kerjakan hati-hati) → Tentang Kami → Kontak.
- Pastikan setiap card yang sudah ada di landing page (pinned row maupun grid) linknya benar-benar mengarah ke halaman detail yang sesuai, bukan placeholder/dead link.
- Gunakan komponen card yang sudah ada di landing page untuk konsistensi visual di halaman listing (jangan bikin card baru dari nol).
- Setelah semua halaman jadi, lakukan pengecekan: klik dari setiap card di landing page harus benar-benar mengarah ke halaman yang tepat, tidak ada 404 atau halaman kosong.
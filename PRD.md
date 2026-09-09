# Product Requirements Document (PRD)
## Landing Page & Admin Dashboard LAZSIP (Custom CMS)

**Versi:** 1.1 (Next.js + MySQL)
**Status:** Draft — acuan development
**Pemilik Produk:** LAZSIP (LAZ Solidaritas Insan Peduli)

---

## 1. Latar Belakang & Tujuan

LAZSIP saat ini memiliki website (lazsip.or.id) berbasis WordPress dengan sejumlah kelemahan teknis (meta robots `noindex/nofollow`, kontak & tautan sosial media tidak konsisten, elemen statistik dan tautan mitra yang rusak) serta keterbatasan fleksibilitas konten.

**Tujuan produk ini:**
- Landing page baru yang **elegan, minimalis**, mencerminkan kredibilitas LAZSIP sebagai lembaga zakat resmi.
- **Admin dashboard custom** (Next.js + MySQL, tanpa WordPress) agar seluruh konten dikelola mandiri oleh tim LAZSIP.
- **Kalkulator zakat otomatis** terintegrasi harga emas real-time dan **alur pembayaran zakat/donasi** langsung di website.
- **Transparansi** penyaluran dana tanpa mengorbankan privasi data penerima manfaat.

---

## 2. Target Pengguna

| Peran | Deskripsi |
|---|---|
| **Muzakki / Donatur (Publik)** | Pengunjung web yang ingin membayar zakat, berdonasi, mencari info program, atau membaca berita. |
| **Admin LAZSIP** | Tim internal pengelola konten dan pemantau transaksi lewat dashboard. |
| **Calon Peserta Program** | Masyarakat yang ingin mendaftar program pemberdayaan LAZSIP. |

---

## 3. Fitur — Sisi Publik (Landing Page)

### 3.1 Umum
- Hero, tentang LAZSIP (visi-misi, legalitas: akta notaris, izin Dinsos/Kemenkumham/BAZNAS/Kemenag).
- Floating tombol WhatsApp di semua halaman, satu nomor CS resmi yang konsisten.
- SEO-friendly — wajib tidak mengulang masalah `noindex/nofollow` seperti web lama.

### 3.2 Berita
- Baris pinned (2–3 item, digeser) + grid 2 kolom untuk berita lain.
- Halaman detail/artikel.

### 3.3 Kalkulator Zakat
- Input nominal harta → hitung otomatis nishab (85 gram emas × harga emas saat ini) dan kadar zakat (2,5%).
- Harga emas real-time dari API eksternal, di-cache berkala (job terjadwal), tidak query API di tiap request user.
- Tombol **"Bayar Zakat"** → form pembayaran.

### 3.4 Pembayaran Zakat
- Form: jenis zakat, nominal (pre-filled, dapat diedit), nama, kontak, toggle anonim, metode pembayaran.
- Kebijakan biaya admin payment gateway untuk zakat: **belum diputuskan** (lihat §9).
- Redirect ke payment gateway → status dikonfirmasi via webhook saja.

### 3.5 Donasi
- Pola layout sama seperti Berita (pinned + grid 2 kolom).
- Saldo terkumpul per card real-time.
- Detail campaign: deskripsi, foto, progress bar (terkumpul vs target), form donasi.
- Form: nominal cepat + custom, metode bayar, **checkbox opsional "bantu tanggung biaya admin"** (tercentang default), toggle anonim, breakdown biaya sebelum bayar.

### 3.6 Program Pemberdayaan
- Pola layout pinned + grid.
- Detail: info, syarat, CTA "Daftar Sekarang".
- **Admin dapat menutup pendaftaran** — tombol otomatis berubah "Pendaftaran Ditutup"/"Kuota Penuh", badge muncul juga di card grid.

### 3.7 Divisi Pendidikan & SARSIP
- Dua section terpisah, **bertumpuk atas-bawah** (bukan berdampingan).
- SARSIP adalah divisi/program di bawah LAZSIP (bukan entitas terpisah) — cukup dibedakan lewat kolom `kategori` pada tabel `programs` yang sama.
- Pola layout pinned + grid sama seperti section lain.

### 3.8 Kegiatan
- Pola layout pinned + grid. Card → halaman detail kegiatan.

### 3.9 Penyaluran Bantuan
- Filter chip: Semua (default, campur) · Pendidikan · Kesehatan · Kebutuhan Pokok · Lainnya.
- **Card publik**: nama, nominal diterima.
- **Detail publik**: nama, umur (dihitung), jenis kelamin, foto, masalah yang dihadapi, kebutuhan, cara tahu LAZSIP, nama verifikator, daerah cakupan verifikator, tipe bantuan.
- **Admin-only** (tidak pernah ke publik): alamat lengkap, tanggal lahir asli, status pernikahan.
- ⚠️ Data pribadi penerima manfaat tergolong dilindungi UU No. 27/2022 (PDP) — lihat §7.

### 3.10 Transparansi
- Counter publik: total dana terkumpul, jumlah donatur/muzakki, jumlah penerima manfaat.
- **Tidak ada** feed publik siapa saja yang membayar (dihapus dari rencana awal demi privasi donatur).

---

## 4. Fitur — Admin Dashboard

### 4.1 Autentikasi
Login admin (role tunggal `admin` di versi pertama, dapat dikembangkan ke multi-role di fase berikutnya).

### 4.2 Overview Dashboard
Kartu statistik (donasi bulan ini, zakat bulan ini, donatur baru, campaign aktif), grafik dana masuk, campaign paling laris, tabel transaksi terbaru (status Paid/Pending).

### 4.3 CRUD Konten

| Modul | Field utama |
|---|---|
| Berita | Judul, isi, gambar, tanggal, status publish, `is_pinned` |
| Campaign Donasi | Judul, deskripsi, foto, target (opsional), `kode_unik`, `is_pinned` |
| Program Pemberdayaan | Judul, deskripsi, syarat, foto, CTA, `kategori` (umum/pendidikan/sarsip), `pendaftaran_dibuka`, `is_pinned` |
| Kegiatan | Judul, deskripsi, foto, tanggal, lokasi, `is_pinned` |
| Penerima Manfaat | Nama, alamat 🔒, masalah yang dihadapi, tanggal lahir 🔒, umur, jenis kelamin, cara tahu LAZSIP, foto, kebutuhan, tipe bantuan, nominal diterima, nama verifikator, daerah cakupan verifikator, status pernikahan 🔒 |

🔒 = admin-only, tidak pernah dikirim ke publik.

### 4.4 Kelola Transaksi
Riwayat donasi (per campaign) dan zakat, status pembayaran, penanda apakah donatur menanggung biaya admin. Status hanya berubah lewat webhook payment gateway (lihat §6).

### 4.5 Kelola Donatur
Tabel `donors`, otomatis terisi/ter-update saat ada transaksi sukses. Segmentasi Donatur Infak/Donasi vs Muzakki Zakat. Total nominal & riwayat per donatur.

### 4.6 Kelola Pembayaran
Referensi biaya (`payment_fees`) per metode pembayaran, dipakai kalkulasi breakdown biaya admin secara dinamis.

---

## 5. Model Data (Ringkasan Entitas — MySQL via Prisma)

```
news              — berita (is_pinned, published_at, ...)
campaigns         — campaign donasi (kode_unik, target, is_pinned, ...)
donations         — transaksi donasi (fk campaign_id, fk donor_id, status, covers_fee, ...)
zakat_payments    — transaksi zakat (fk donor_id, status, jenis_zakat, ...)
programs          — program pemberdayaan (kategori: umum|pendidikan|sarsip,
                     is_pinned, pendaftaran_dibuka, ...)
activities        — kegiatan (is_pinned, tanggal, lokasi, ...)
beneficiaries     — penerima manfaat (kolom publik + admin-only, lihat §3.9)
donors            — donatur/muzakki (agregat dari donations + zakat_payments)
payment_fees      — referensi biaya per metode pembayaran (flat/percent, nilai)
```

Skema kolom lengkap ditulis langsung di `prisma/schema.prisma` — dokumen ini adalah acuan produk, bukan acuan final skema teknis (skema teknis bisa berkembang saat implementasi, tapi wajib tetap mematuhi aturan privasi di §7).

---

## 6. Alur Pembayaran & Penyaluran Dana

1. **Rekening terpisah**: dana zakat settle ke rekening khusus zakat; dana donasi/infak (semua campaign) settle ke satu rekening bersama, dibedakan lewat `kode_unik` per campaign di level sistem (bukan di level rekening bank).
2. **Biaya admin payment gateway**:
   - Donasi: opsional, checkbox tercentang default.
   - Zakat: **belum diputuskan** — lihat §9.
3. **Verifikasi pembayaran**: status transaksi menjadi `paid` HANYA lewat webhook/notifikasi payment gateway, dengan signature verification wajib. Tidak pernah dari redirect halaman sukses di frontend. Job cadangan (cron) mengecek transaksi `pending` lama via API status check sebagai jaring pengaman.
4. LAZSIP disarankan menanyakan skema kerja sama non-profit ke Midtrans/Xendit sebelum go-live.

---

## 7. Keamanan & Privasi

- Field sensitif `beneficiaries` (alamat, tanggal lahir asli, status pernikahan) **tidak boleh terkirim ke response API publik dalam bentuk apapun** — bukan sekadar disembunyikan di UI. Implementasi: fungsi/endpoint query terpisah untuk publik yang secara eksplisit hanya men-select kolom aman (mis. `getPublicBeneficiaries()` di layer data), bukan fetch-semua-lalu-filter di frontend.
- Autentikasi admin wajib untuk akses data lengkap penerima manfaat.
- Data pribadi (nama, alamat, tanggal lahir, foto) penerima manfaat tergolong data pribadi yang diatur UU No. 27/2022 (PDP) — perlu kebijakan retensi data dan audit akses di fase berikutnya.
- Signature setiap webhook payment gateway wajib diverifikasi sebelum status transaksi diperbarui.

---

## 8. Kebutuhan Non-Fungsional

- **Desain**: elegan, minimalis, konsisten dengan identitas visual LAZSIP.
- **Performa**: harga emas dan data lain yang sering berubah wajib di-cache (job terjadwal), tidak query API eksternal per-request.
- **Skalabilitas**: struktur data harus mendukung penambahan divisi/program baru (seperti SARSIP, Divisi Pendidikan) tanpa perubahan skema besar (cukup lewat kolom `kategori`).
- **Ketersediaan**: modul transaksi (donasi/zakat) prioritas uptime tertinggi.

---

## 9. Open Questions (Perlu Diputuskan Sebelum/Saat Development)

1. Kebijakan biaya admin payment gateway untuk **zakat** — opsional seperti donasi, atau ditanggung penuh LAZSIP?
2. Payment gateway final — Midtrans, Xendit, atau kombinasi — termasuk hasil negosiasi skema non-profit.
3. Kebijakan consent foto untuk penerima manfaat yang tampil publik.
4. Kebijakan retensi data penerima manfaat setelah bantuan selesai disalurkan.
5. Jadwal settlement dana dari payment gateway ke rekening bank (manual vs otomatis, frekuensinya).
6. Struktur role admin — cukup satu role, atau perlu role terpisah (admin konten vs admin keuangan) sejak versi pertama.

---

## 10. Di Luar Lingkup (Fase Berikutnya — Belum Difinalisasi)

Laporan penyaluran dana per program, sertifikat/bukti pembayaran otomatis (PDF), zakat/donasi berkala (recurring), riwayat donasi pribadi untuk donatur terdaftar, reminder zakat tahunan, kalkulator zakat jenis lain (fitrah, penghasilan, perdagangan), multi-role admin, dashboard analitik lanjutan.
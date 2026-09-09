Buatkan seluruh UI frontend Admin Panel untuk mengelola semua tampilan landing page LAZSIP. Ikuti struktur data dan aturan di PRD.md dan CLAUDE.md. Gunakan layout dasar: sidebar navigasi kiri (sesuai modul di bawah) + topbar (nama admin, tombol logout) + area konten utama. Style mengikuti design system yang sudah diterapkan di halaman publik (warna hijau tua-krem, radius besar, pill untuk badge/tombol), tapi versi admin boleh lebih fungsional/padat karena ini dashboard kerja, bukan halaman marketing.

Kerjakan SATU MODUL PER RESPONSE, jangan sekaligus semua. Urutan pengerjaan disarankan mengikuti urutan modul di bawah ini (dari yang paling sederhana ke yang paling kompleks/sensitif).

## 0. Login Admin
- Form sederhana: email/username + password, tombol login, pesan error kalau salah.
- Redirect ke Dashboard setelah berhasil login. Halaman manapun di admin panel harus redirect ke halaman login kalau belum autentikasi.

## 1. Dashboard (Overview)
- Kartu statistik: total donasi bulan ini, total zakat bulan ini, jumlah donatur baru, jumlah campaign aktif.
- Grafik sederhana dana masuk 30 hari terakhir.
- Daftar campaign paling laris (top 5).
- Tabel transaksi terbaru (10 terakhir) dengan kolom: nama/anonim, tipe (donasi/zakat), campaign/jenis zakat, nominal, status (Paid/Pending/Failed).

## 2. Kelola Konten Umum (Hero & Tentang Kami)
Ini bukan tabel CRUD list, tapi form pengaturan konten statis (single record, bukan banyak entri):
- Section Hero: input headline utama, sub-headline, teks tombol CTA utama dan sekunder, upload gambar/ilustrasi hero (jika ada).
- Section Tentang Kami (ringkas, untuk landing page) dan Tentang Kami (lengkap, untuk halaman terpisah): editor teks kaya (rich text/WYSIWYG sederhana) untuk visi-misi dan deskripsi, form terpisah untuk data legalitas (nomor akta notaris, nomor izin Dinsos/Kemenkumham/BAZNAS/Kemenag — masing-masing sebagai field teks).
- Tombol "Simpan Perubahan" per section, dengan preview singkat sebelum submit kalau memungkinkan.

## 3. Kelola Berita
- Halaman List: tabel/grid berita dengan kolom thumbnail, judul, tanggal publish, status (Published/Draft), status pin (ikon pin aktif/nonaktif), aksi (Edit/Hapus/Toggle Pin).
- Filter: status publish, urutkan berdasarkan tanggal terbaru/terlama.
- Tombol "Tambah Berita Baru" di pojok atas.
- Form Tambah/Edit: judul, isi (rich text editor), upload gambar utama, tanggal publish, toggle status Publish/Draft, toggle "Pin di landing page" (nonaktif otomatis kalau sudah ada 3 berita pinned — tampilkan peringatan).
- Konfirmasi modal sebelum hapus.

## 4. Kelola Campaign Donasi
- Halaman List: tabel dengan thumbnail, judul campaign, kode unik, progress (terkumpul/target dengan mini progress bar), status (Aktif/Selesai/Nonaktif), status pin, aksi.
- Form Tambah/Edit: judul, deskripsi (rich text), upload foto, target nominal (opsional), kode unik (auto-generate tapi bisa diedit manual, validasi harus unik), toggle pin, toggle status aktif.
- Halaman Detail Campaign (klik dari list): selain info di atas, tampilkan daftar transaksi yang masuk ke campaign ini secara spesifik (read-only, link ke halaman Riwayat Transaksi dengan filter otomatis).

## 5. Kelola Program (Pemberdayaan / Divisi Pendidikan / SARSIP)
- Satu modul yang menangani ketiganya, dibedakan lewat dropdown/tab kategori (Umum, Pendidikan, SARSIP) di halaman List maupun Form.
- Halaman List: tabel dengan thumbnail, judul, kategori (badge warna beda tiap kategori), status pendaftaran (Terbuka/Ditutup dengan toggle switch langsung bisa diklik dari list tanpa buka form edit), status pin, aksi.
- Form Tambah/Edit: judul, deskripsi, syarat pendaftaran (bisa multi-line/list), upload foto, dropdown kategori (Umum/Pendidikan/SARSIP), toggle "Pendaftaran Dibuka", toggle pin.
- Kalau ada yang mendaftar lewat form pendaftaran di halaman publik, tampilkan juga sub-halaman "Daftar Pendaftar" per program (tabel nama, kontak, tanggal daftar, catatan).

## 6. Kelola Kegiatan
- Halaman List: tabel dengan thumbnail, judul, tanggal, lokasi, status pin, aksi.
- Form Tambah/Edit: judul, deskripsi, upload foto, tanggal kegiatan, lokasi, toggle pin.

## 7. Kelola Penyaluran Bantuan (Penerima Manfaat)
PENTING — modul ini paling sensitif secara privasi, ikuti aturan akses field di CLAUDE.md dengan ketat.
- Halaman List: tabel dengan foto kecil, nama, tipe bantuan (badge), nominal diterima, nama verifikator, aksi (Edit/Hapus). Filter berdasarkan tipe bantuan.
- Form Tambah/Edit, kelompokkan field jadi dua bagian dengan penanda visual jelas:
  - **Bagian "Tampil di Publik"**: nama, foto (upload), umur ATAU tanggal lahir dengan umur dihitung otomatis dan ditampilkan sebagai preview, jenis kelamin (dropdown), masalah yang dihadapi (textarea), kebutuhan (textarea), cara mengetahui LAZSIP (dropdown/input), tipe bantuan (dropdown: Kebutuhan Pokok/Pendidikan/Kesehatan/Lainnya), nominal diterima, nama verifikator, daerah cakupan verifikator.
  - **Bagian "Khusus Admin (Tidak Tampil ke Publik)"** — beri background/border beda (misal border merah muda atau ikon gembok) supaya admin sadar ini data sensitif: alamat lengkap, tanggal lahir asli (kalau belum diinput di atas), status pernikahan (dropdown: Menikah/Janda/Janda Mati/Duda/Duda Mati).
- Tampilkan catatan kecil di form: "Data pada bagian bertanda gembok tidak akan pernah ditampilkan ke halaman publik."

## 8. Kelola Donatur
- Halaman List: tabel donatur dengan kolom nama (atau "Hamba Allah" kalau anonim), kontak, segmen (Donatur Infak/Donasi atau Muzakki Zakat — bisa dua-duanya), total nominal keseluruhan, tanggal transaksi terakhir.
- Filter: segmen, urutkan berdasarkan total nominal atau transaksi terakhir.
- Halaman Detail Donatur (klik dari list): info kontak, riwayat lengkap semua transaksi (tanggal, jenis, campaign/jenis zakat, nominal, status).

## 9. Riwayat Transaksi
- Dua tab atau dua halaman terpisah: Riwayat Donasi dan Riwayat Zakat.
- Tabel: tanggal, nama/anonim, campaign (untuk donasi) atau jenis zakat, nominal, metode pembayaran, apakah menanggung biaya admin (untuk donasi), status (Paid/Pending/Failed/Expired).
- Filter: rentang tanggal, status, metode pembayaran, campaign/jenis zakat.
- Export ke CSV/Excel (tombol "Export").

## 10. Kelola Referensi Biaya Payment Gateway
- Tabel sederhana: metode pembayaran, tipe biaya (Flat/Persentase), nilai, aksi (Edit).
- Form edit per metode: pilih tipe (flat/persen), input nilai.

## 11. Pengaturan Umum
- Nomor WhatsApp CS (dipakai floating tombol WA di semua halaman publik — satu sumber tunggal, jangan biarkan admin input nomor berbeda-beda di tempat lain).
- Tautan sosial media (Instagram, Facebook, YouTube, TikTok, dll).
- Info kontak/alamat kantor untuk halaman Kontak publik.
- Ganti password admin.

## Catatan Umum untuk Semua Modul List
- Setiap tabel/list punya search box, pagination, dan empty state yang jelas ("Belum ada data, klik tombol di atas untuk menambah") saat datanya kosong.
- Setiap aksi hapus WAJIB pakai modal konfirmasi ("Apakah Anda yakin ingin menghapus [nama item]? Tindakan ini tidak bisa dibatalkan.").
- Toggle (pin, status publish, pendaftaran dibuka) di halaman List sebaiknya bisa diklik langsung dari tabel tanpa harus buka form edit, dengan feedback visual instan (loading kecil saat menyimpan, lalu update).
- Upload foto pakai preview sebelum submit, dan validasi ukuran/format file (jelaskan batasan misal maksimal 2MB, format jpg/png/webp).

Setelah semua modul selesai, buat pengecekan navigasi: pastikan sidebar admin bisa mengakses semua modul di atas tanpa dead link, dan setiap modul benar-benar terhubung ke data yang sama dengan yang ditampilkan di landing page publik (bukan data dummy terpisah).


buat halaman admin panel seinformatif mungkin, tampilan data ada dua mode berupa list dan juga card 5 row yg menampilkan info dan deskripsinya, kalau di klik bisa buat edit

buat semua flow halamannya jadi sepert form tambah edit dll, jangan sampai ada yang kurangg , form form CRUD jangan sampai terlewat, 
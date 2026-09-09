Buatkan semua halaman publik berikut, mengikuti struktur data dan aturan yang ada di PRD.md dan CLAUDE.md. Pakai App Router Next.js, Server Component untuk render data, Client Component hanya untuk bagian interaktif (form, filter, carousel).

1. Semua Berita (listing) — grid seluruh berita dari tabel news, dengan pagination sederhana.

2. Detail Berita — halaman artikel lengkap satu berita berdasarkan slug/id.

3. Halaman Terima Kasih — muncul setelah pembayaran donasi atau zakat sukses. Tampilkan ringkasan transaksi (nominal, campaign/jenis zakat, metode bayar) dan tombol share ke WhatsApp. Buat komponen ini reusable untuk kedua jenis transaksi (donasi dan zakat), beda hanya di data yang ditampilkan.

4. Halaman Pembayaran Gagal/Kedaluwarsa — muncul kalau transaksi gagal atau QR/VA kedaluwarsa sebelum dibayar. Tampilkan pesan jelas dan tombol untuk mencoba lagi (kembali ke halaman detail campaign/zakat yang sama).

5. Semua Donasi/Campaign (listing) — grid seluruh campaign donasi dari tabel campaigns.

6. Semua Program (listing) — grid seluruh program dari tabel programs, dengan filter berdasarkan kolom kategori (Umum/Pendidikan/SARSIP).

7. Detail Program — info program, syarat, dan tombol "Daftar Sekarang". Kalau kolom pendaftaran_dibuka bernilai false, tombol berubah disabled dengan label "Kuota Penuh".

8. Semua Kegiatan (listing) — grid seluruh kegiatan dari tabel activities.

9. Detail Kegiatan — info lengkap satu kegiatan.

10. Semua Penyaluran Bantuan (listing) — grid seluruh data dari tabel beneficiaries, WAJIB hanya menampilkan field publik sesuai aturan di CLAUDE.md, dengan filter chip berdasarkan tipe_bantuan (Semua/Pendidikan/Kesehatan/Kebutuhan Pokok/Lainnya). Default tanpa filter menampilkan semua tipe secara acak/campur.

11. Tentang Kami — versi lengkap dari section tentang di landing page, termasuk struktur organisasi dan detail legalitas (akta notaris, izin Dinsos/Kemenkumham/BAZNAS/Kemenag).

12. Kontak — alamat kantor, jam operasional, dan form kontak sederhana (nama, email/HP, pesan) yang mengirim data ke admin (via email atau tersimpan ke tabel sederhana untuk dicek admin nanti).

Setiap halaman listing sebaiknya pakai layout dan komponen card yang sudah dibuat sebelumnya untuk section masing-masing di landing page (jangan bikin komponen card baru dari nol kalau sudah ada).

Kerjakan satu per satu, bukan sekaligus dalam satu response — mulai dari yang paling sederhana (Detail Berita, Detail Kegiatan) sebelum ke yang lebih kompleks (Semua Penyaluran Bantuan dengan filter, Terima Kasih/Gagal yang reusable).


123. 

Card yang di-pin masih bermasalah, perbaiki dua hal berikut:

## Masalah 1: Overlay masih berupa DUA ELEMEN TERPISAH, bukan satu kesatuan

Dari screenshot yang dilampirkan, terlihat jelas foto berhenti tegas di satu titik, lalu area hijau dimulai sebagai blok/kotak baru di bawahnya dengan garis potongan yang kentara. ini artinya struktur HTML/CSS-nya salah — kemungkinan foto ditaruh di elemen terpisah (misal <img> atau div dengan height tetap) dan overlay hijau ditaruh sebagai div/section BERBEDA yang ditumpuk di bawahnya, bukan di ATAS foto yang sama.

Perbaikan struktural yang WAJIB dilakukan:
1. Foto harus menjadi background/elemen tunggal yang mengisi TINGGI PENUH card (100% height dari card, bukan cuma sebagian).
2. Overlay gradient hijau harus berupa elemen terpisah yang di-posisikan ABSOLUTE di ATAS foto tadi (position: absolute; inset: 0; atau top/left/right/bottom: 0), menutupi seluruh area foto, BUKAN elemen yang ditaruh berurutan/stack di bawah foto dalam flow dokumen normal.
3. Struktur yang benar kurang lebih:
   ```
   <div class="card" style="position: relative; overflow: hidden; border-radius: 20px;">
     <img src="..." style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;" />
     <div class="overlay-gradient" style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 0%, transparent 25%, rgba(22,48,31,0.2) 45%, rgba(22,48,31,0.6) 70%, rgba(22,48,31,0.92) 100%);"></div>
     <div class="content" style="position: absolute; bottom: 0; left: 0; right: 0; padding: 16px; color: white;">
       <!-- badge tanggal, judul, lokasi, dst -->
     </div>
   </div>
   ```
4. Pastikan foto (`img` atau `background-image`) benar-benar terlihat penuh dari atas card sampai ke bagian paling bawah card (di balik overlay), tidak terpotong di tengah oleh elemen lain.
5. Setelah fix, hasilnya harus terlihat sebagai SATU foto utuh dengan gradasi warna yang menyatu smooth dari transparan (di area atas/tengah foto) ke hijau pekat (di bagian bawah), TANPA ada garis potongan/batas kotak yang terlihat di titik manapun.

## Masalah 2: Ubah orientasi card pinned jadi landscape

Card yang di-pin saat ini bentuknya portrait/tinggi. Ubah jadi landscape (lebih lebar dari tinggi, misal rasio 16:9 atau 3:2), supaya beberapa card bisa terlihat sekaligus di layar tanpa perlu discroll terlalu jauh secara vertikal. Sesuaikan ukuran font judul dan padding konten di dalam card supaya tetap proporsional dan mudah dibaca di bentuk landscape ini (kemungkinan card jadi lebih pendek tingginya, jadi ruang untuk judul 2 baris + info lain perlu dipadatkan sedikit, tapi tetap jangan sampai terlalu sempit/berdesakan).

Terapkan kedua perbaikan ini ke SEMUA card pinned di semua section (Berita, Donasi, Program Pemberdayaan, Divisi Pendidikan, SARSIP, Kegiatan). Setelah selesai, tunjukkan hasilnya dan pastikan tidak ada lagi garis batas/kotak yang terlihat antara foto dan overlay di card manapun.
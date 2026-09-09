Terapkan design system berikut ke seluruh halaman publik. Ini referensi visual yang harus diikuti persis polanya (warna, bentuk, tipografi), disesuaikan dengan konten dan struktur data LAZSIP yang sudah didefinisikan di PRD.md.

PENTING: Ini HANYA perubahan tampilan/styling (warna, bentuk komponen, tipografi, spacing). JANGAN menghapus, mengurangi, atau merestrukturisasi section, komponen, maupun konten yang sudah ada saat ini (termasuk pola pinned-row+grid, filter chip Penyaluran Bantuan, dan seluruh section yang sudah dibuat sebelumnya). Semua section yang sudah ada tetap harus ada, hanya tampilannya yang disesuaikan mengikuti design system di bawah ini.

## Palet Warna

- Background utama: krem/off-white hangat, bukan putih polos (contoh: #F5F1E8 atau #F4EFE4).
- Warna aksen utama: hijau tua gelap nyaris mendekati hitam-hijau (contoh: #16301F atau #1B3A2B) — dipakai untuk headline besar, tombol utama, dan section dengan background gelap (misal kartu hasil kalkulator zakat).
- Warna aksen sekunder: hijau muda/sage lebih terang (contoh: #7A9B7E) — dipakai untuk subheadline dan teks pendukung di bawah headline.
- Teks body umum: abu-abu gelap kehijauan, bukan hitam pekat.
- Card dan elemen dengan background terang: putih atau krem lebih terang dari background utama, dengan border sangat halus atau shadow lembut, bukan garis tegas.

## Tipografi

- Headline hero dan section: sangat besar dan bold (contoh 56-64px di desktop), font sans-serif tebal dengan sedikit karakter (bukan generic system font), warna hijau tua gelap.
- Subheadline/deskripsi di bawah headline: ukuran sedang (16-18px), warna hijau sage lebih muda, line-height lega.
- Body text card: hitam/abu gelap standar, ukuran 14-15px.

## Bentuk & Komponen

- SEMUA tombol menggunakan bentuk pill (border-radius penuh/999px), tidak ada tombol kotak atau sedikit rounded.
- Tombol utama (primary): solid hijau tua gelap, teks putih, contoh label "Mulai Berdonasi", dengan ikon panah kecil di kanan teks pada tombol CTA utama.
- Tombol sekunder (secondary): outline/putih dengan border tipis, teks hijau tua, contoh label "Lihat Campaign".
- Badge/label kecil (contoh "Platform Crowdfunding & Zakat Terpercaya", kategori campaign seperti "Pendidikan"/"Infrastruktur", tag waktu "12 hari lagi"): semua pill-shaped, background lebih terang dari sekitarnya, teks kecil dan tegas.
- Card statistik (angka besar): background krem terang, radius besar (20-24px), ikon kecil di kotak abu-abu di pojok kiri atas card, angka besar bold, label kecil di bawahnya. Contoh: "50K+ Donatur Aktif", "Rp 25M+ Total Donasi", "1.200+ Campaign Sukses".
- Card campaign donasi: foto di bagian atas (rounded di sudut atas saja), badge kategori pill di pojok kiri atas foto (overlay di atas gambar), badge waktu tersisa pill di pojok kanan atas foto (overlay semi-transparan putih). Di bawah foto: lokasi dengan ikon pin, judul campaign bold besar, progress bar tipis rounded, baris "Terkumpul" vs "Target" dengan nominal bold, baris bawah jumlah donatur (dengan ikon) di kiri dan tombol "Donasi" pill kecil hijau di kanan.
- Card artikel/berita: foto di atas (rounded), tanggal + estimasi waktu baca dengan ikon kecil di atas judul, judul bold, deskripsi singkat abu-abu, link "Baca Selengkapnya" dengan ikon panah di bagian bawah.
- Kartu hasil kalkulator zakat: background hijau tua gelap solid (bukan krem), teks putih, badge status pill di atas (misal "BELUM WAJIB" dengan ikon jam), angka estimasi zakat sangat besar dan bold di tengah, keterangan kecil di bawahnya, garis pemisah tipis semi-transparan, tombol putih solid pill di bagian bawah card ("Bayar Zakat Sekarang" dengan ikon dompet/kartu kecil).
- Input field kalkulator (di luar card hijau, background terang): label di atas input, input besar dengan prefix "Rp", placeholder/nilai abu-abu muda, catatan info kecil dengan ikon (i) dan background biru muda pill untuk penjelasan nisab.
- Floating tombol WhatsApp/chat: lingkaran penuh (bukan rounded square), warna hijau terang/medium (beda dari hijau tua utama, lebih cerah, misal hijau WhatsApp klasik), ikon chat putih di tengah, posisi pojok kanan bawah, selalu terlihat saat scroll.

## Layout & Spacing

- Navbar: pill/rounded penuh, mengambang dengan sedikit margin dari tepi atas layar, background putih/krem terang dengan sedikit shadow, logo di kiri, menu di tengah, tombol CTA solid hijau di kanan.
- Section spacing: sangat lega, ada jarak besar antar section (badge label section → headline besar → deskripsi → konten), pola konsisten di semua section: badge kecil pill di atas, headline besar 2 baris, subheadline, lalu konten utama.
- Grid card: 2 kolom untuk campaign donasi (card besar dengan foto tinggi), 3 kolom untuk artikel/berita (card lebih kecil).
- Statistik (angka besar) disusun 3 kolom sejajar di bawah tombol CTA hero.

## Terapkan ke Konteks LAZSIP

Pola visual di atas dipakai untuk SEMUA section dan halaman yang sudah didefinisikan di PRD.md (Donasi, Zakat, Program Pemberdayaan, Divisi Pendidikan, SARSIP, Kegiatan, Penyaluran Bantuan, Berita), bukan cuma yang ada di referensi. Untuk section yang tidak ada di referensi (misal Penyaluran Bantuan dengan filter chip, atau pola pinned-row+grid), tetap ikuti bahasa visual yang sama: warna hijau tua-krem, bentuk pill di semua badge/tombol, card dengan radius besar dan shadow lembut.

Sesuaikan copywriting/label dengan konteks LAZSIP (bukan generic crowdfunding), tapi struktur visual, warna, bentuk komponen, dan tipografi harus mengikuti pola di atas secara konsisten di seluruh halaman.
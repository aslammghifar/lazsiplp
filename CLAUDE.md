# CLAUDE.md — LAZSIP Landing Page & Admin CMS

Konteks permanen untuk Claude Code saat bekerja di project ini. Baca `PRD.md` di root yang sama untuk detail lengkap fitur dan keputusan produk.

## Ringkasan Project

Landing page publik + admin dashboard custom untuk LAZSIP (lembaga zakat), menggantikan website WordPress lama. Tanpa WordPress — full custom build.

## Tech Stack

- **Framework**: Next.js (App Router, TypeScript)
- **Styling**: Tailwind CSS
- **Database**: MySQL
- **ORM**: Prisma (`schema.prisma` sebagai source of truth skema database — selalu update file ini duluan sebelum migrasi)
- **Auth admin**: NextAuth.js (credentials provider, role tunggal `admin` di versi pertama)
- **Payment gateway**: Midtrans dan/atau Xendit (final belum diputuskan — lihat Open Questions di PRD.md)
- **Realtime saldo campaign**: polling ringan atau webhook-triggered revalidation (Next.js `revalidatePath`), bukan wajib pakai websocket kecuali dirasa perlu

## Perintah Umum

```bash
npm run dev              # jalankan dev server
npx prisma migrate dev   # buat & jalankan migration baru
npx prisma studio        # buka GUI database
npx prisma generate      # regenerate Prisma client setelah ubah schema
npm run lint
npm run build
```

## Struktur Data Inti (lihat PRD.md §5 untuk detail)

`news`, `campaigns`, `donations`, `zakat_payments`, `programs`, `activities`, `beneficiaries`, `donors`, `payment_fees`.

`programs` punya kolom `kategori` (`umum` | `pendidikan`) — dipakai untuk section Program Pemberdayaan dan Divisi Pendidikan tanpa perlu tabel terpisah. SARSIP TIDAK memakai model `programs` (SARSIP tidak punya alur pendaftaran/registrasi ke publik, isinya murni update/kabar kegiatan) — `news` punya kolom `kategori` (`umum` | `sarsip`) dan section SARSIP di landing page menampilkan `news` dengan `kategori = 'sarsip'`, bukan `programs`.

`campaigns` punya kolom `kode_unik` — dipakai untuk melacak transaksi per campaign meski settlement dana masuk ke satu rekening bersama.

## ATURAN KRITIS — WAJIB DIPATUHI

### 1. Privasi data `beneficiaries` (Penerima Manfaat)

Field berikut **TIDAK BOLEH PERNAH** dikirim ke response API yang diakses halaman publik, dalam bentuk apapun (termasuk lewat network tab browser):
- `alamat`
- `tanggal_lahir` (mentah — publik hanya boleh lihat `umur` hasil hitung)
- `status_pernikahan`

Field berikut **BOLEH** publik: nama, umur (dihitung), jenis_kelamin, foto, masalah_yang_dihadapi, kebutuhan, tahu_info_dari, nama_verifikator, daerah_cakupan_verifikator, tipe_bantuan, nominal_diterima.

**Implementasi wajib**: buat query/endpoint terpisah untuk publik (`getPublicBeneficiaries()`) yang secara eksplisit hanya `SELECT` kolom-kolom aman di atas — jangan pernah fetch semua kolom lalu filter di frontend. Endpoint admin (butuh sesi admin) baru boleh akses semua kolom.

### 2. Status pembayaran HANYA berubah lewat webhook

Jangan pernah set status transaksi (`donations.status` / `zakat_payments.status`) menjadi `paid` dari sisi request pengguna (redirect ke halaman sukses, dsb). Status `paid` hanya boleh diubah oleh handler webhook payment gateway, dan wajib **verifikasi signature** webhook itu sebelum memproses. Sediakan juga cron/job cadangan yang mengecek status transaksi `pending` lama lewat API status check ke payment gateway.

### 3. Biaya admin donasi bersifat opsional

Form donasi wajib punya checkbox "bantu tanggung biaya admin" **tercentang secara default**, bisa di-uncheck user. Nominal fee dihitung dinamis dari tabel `payment_fees` sesuai metode pembayaran yang dipilih, bukan hardcode.

### 4. Toggle admin untuk kontrol UI publik

- `programs.pendaftaran_dibuka` (boolean) — kalau `false`, tombol "Daftar Sekarang" di publik berubah jadi disabled/"Kuota Penuh".
- `campaigns.is_pinned`, `programs.is_pinned`, `activities.is_pinned`, `news.is_pinned` — dipakai untuk baris "pinned" yang bisa digeser di landing page (lihat pola layout di bagian bawah).

### 5. Tidak ada feed publik riwayat transaksi

Landing page hanya boleh menampilkan **counter agregat** (total terkumpul, jumlah donatur, dsb), TIDAK boleh menampilkan list/feed siapa saja yang bertransaksi ke publik.

## Pola Layout (berlaku di section: Berita, Donasi, Program Pemberdayaan, Divisi Pendidikan, SARSIP, Kegiatan)

Tiap section render dua bagian:
1. Baris atas — item dengan `is_pinned = true`, ditampilkan sebagai row yang bisa discroll/drag horizontal.
2. Grid di bawahnya — item lain (`is_pinned = false`), maksimal 2 kolom, dibatasi 4–5 baris lalu link "Lihat semua".

Divisi Pendidikan dan SARSIP ditampilkan bertumpuk (atas-bawah), bukan berdampingan.

Penyaluran Bantuan pakai filter chip berdasarkan `tipe_bantuan` (Semua/Pendidikan/Kesehatan/Kebutuhan Pokok/Lainnya), default "Semua" tanpa urutan tertentu.

## Konvensi Kode

- Server Components secara default; gunakan Client Component (`"use client"`) hanya untuk elemen interaktif (form, carousel drag, filter chip).
- Semua akses database lewat Prisma Client, tidak ada raw SQL kecuali benar-benar diperlukan (dan harus pakai parameterized query kalau terpaksa).
- Validasi input server-side dengan Zod di setiap route/server action yang menerima input dari form publik.
- Penamaan file & folder mengikuti konvensi App Router Next.js (`app/(public)/...`, `app/admin/...`).

## Yang TIDAK boleh dilakukan tanpa konfirmasi eksplisit

- Menambah field baru ke tabel `beneficiaries` yang mengubah klasifikasi publik/admin-only tanpa menanyakan dulu.
- Mengubah alur verifikasi webhook payment gateway.
- Menghapus atau mengubah struktur kolom yang sudah punya data (selalu migration additive dulu, breaking change belakangan setelah dikonfirmasi).
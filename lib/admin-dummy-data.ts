// Data dummy KHUSUS admin dashboard — JANGAN PERNAH diimpor dari halaman/komponen publik
// (khususnya yang "use client", karena bisa ikut ter-bundle ke JS browser). Setara tabel
// `donations` + `zakat_payments` (digabung untuk tampilan "Kelola Transaksi"), `beneficiaries`
// versi lengkap, dan `donors`.

import { campaigns, publicBeneficiaries, type PublicBeneficiary } from "@/lib/dummy-data";

export type TransactionStatus = "paid" | "pending" | "failed" | "expired";

export type AdminTransaction = {
  id: string;
  jenis: "donasi" | "zakat";
  labelJenis: string; // judul campaign, atau jenis zakat
  campaignId?: string; // fk campaign, kalau jenis === "donasi"
  donaturNama: string; // "Hamba Allah" kalau anonim
  anonim: boolean;
  nominal: number;
  biayaAdmin: number;
  menanggungBiayaAdmin: boolean;
  metode: string;
  status: TransactionStatus;
  tanggal: string; // ISO date
};

export const adminTransactions: AdminTransaction[] = [
  { id: "TRX-1042", jenis: "donasi", labelJenis: "Wakaf Sumur Air Bersih untuk Desa Terpencil", campaignId: "c1", donaturNama: "Budi Santoso", anonim: false, nominal: 500_000, biayaAdmin: 4_000, menanggungBiayaAdmin: true, metode: "QRIS", status: "paid", tanggal: "2026-09-09" },
  { id: "TRX-1041", jenis: "zakat", labelJenis: "Zakat Maal", donaturNama: "Hamba Allah", anonim: true, nominal: 2_500_000, biayaAdmin: 0, menanggungBiayaAdmin: false, metode: "BCA Virtual Account", status: "paid", tanggal: "2026-09-09" },
  { id: "TRX-1040", jenis: "donasi", labelJenis: "Bedah Rumah Dhuafa Ramadan 1447H", campaignId: "c2", donaturNama: "Siti Rahayu", anonim: false, nominal: 250_000, biayaAdmin: 4_000, menanggungBiayaAdmin: true, metode: "GoPay", status: "pending", tanggal: "2026-09-08" },
  { id: "TRX-1039", jenis: "zakat", labelJenis: "Zakat Penghasilan", donaturNama: "Andi Wijaya", anonim: false, nominal: 750_000, biayaAdmin: 4_000, menanggungBiayaAdmin: true, metode: "Mandiri Virtual Account", status: "paid", tanggal: "2026-09-08" },
  { id: "TRX-1038", jenis: "donasi", labelJenis: "Qurban untuk Pelosok Negeri", campaignId: "c6", donaturNama: "Hamba Allah", anonim: true, nominal: 2_000_000, biayaAdmin: 0, menanggungBiayaAdmin: false, metode: "DANA", status: "paid", tanggal: "2026-09-07" },
  { id: "TRX-1037", jenis: "donasi", labelJenis: "Bantuan Gizi untuk Anak Stunting", campaignId: "c3", donaturNama: "Dewi Lestari", anonim: false, nominal: 100_000, biayaAdmin: 700, menanggungBiayaAdmin: true, metode: "QRIS", status: "failed", tanggal: "2026-09-07" },
  { id: "TRX-1036", jenis: "zakat", labelJenis: "Zakat Fitrah", donaturNama: "Rudi Hartono", anonim: false, nominal: 180_000, biayaAdmin: 0, menanggungBiayaAdmin: false, metode: "BNI Virtual Account", status: "paid", tanggal: "2026-09-06" },
  { id: "TRX-1035", jenis: "donasi", labelJenis: "Peduli Lansia Dhuafa", campaignId: "c5", donaturNama: "Hamba Allah", anonim: true, nominal: 300_000, biayaAdmin: 4_000, menanggungBiayaAdmin: false, metode: "GoPay", status: "pending", tanggal: "2026-09-06" },
  { id: "TRX-1034", jenis: "donasi", labelJenis: "Renovasi Masjid Desa Binaan", campaignId: "c7", donaturNama: "Fajar Nugroho", anonim: false, nominal: 1_000_000, biayaAdmin: 4_000, menanggungBiayaAdmin: true, metode: "QRIS", status: "paid", tanggal: "2026-09-05" },
  { id: "TRX-1033", jenis: "zakat", labelJenis: "Zakat Perdagangan", donaturNama: "Maya Sari", anonim: false, nominal: 4_200_000, biayaAdmin: 4_000, menanggungBiayaAdmin: true, metode: "Mandiri Virtual Account", status: "paid", tanggal: "2026-09-05" },
  { id: "TRX-1032", jenis: "donasi", labelJenis: "Distribusi Air Bersih Musim Kemarau", campaignId: "c9", donaturNama: "Budi Santoso", anonim: false, nominal: 150_000, biayaAdmin: 1_050, menanggungBiayaAdmin: true, metode: "QRIS", status: "paid", tanggal: "2026-09-04" },
  { id: "TRX-1031", jenis: "zakat", labelJenis: "Zakat Emas", donaturNama: "Hamba Allah", anonim: true, nominal: 1_600_000, biayaAdmin: 4_000, menanggungBiayaAdmin: true, metode: "BNI Virtual Account", status: "expired", tanggal: "2026-09-03" },
  { id: "TRX-1030", jenis: "donasi", labelJenis: "Beasiswa Pendidikan Tinggi Mahasiswa Dhuafa", campaignId: "c8", donaturNama: "Dewi Lestari", anonim: false, nominal: 400_000, biayaAdmin: 4_000, menanggungBiayaAdmin: true, metode: "DANA", status: "paid", tanggal: "2026-09-02" },
];

// Data legacy generator dana masuk 30 hari, deterministik (bukan Math.random) supaya stabil.
function generateDanaMasukHarian(days = 30): { tanggal: string; nominal: number }[] {
  const end = new Date("2026-09-09T00:00:00Z");
  const result: { tanggal: string; nominal: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(end);
    d.setUTCDate(d.getUTCDate() - i);
    const dayOfWeek = d.getUTCDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const base = 1_200_000 + (d.getUTCDate() <= 5 ? 900_000 : 0) + (isWeekend ? 400_000 : 0);
    const wave = Math.round(Math.sin(i / 3) * 350_000);
    result.push({ tanggal: d.toISOString().slice(0, 10), nominal: Math.max(300_000, base + wave) });
  }
  return result;
}

export const danaMasukHarian = generateDanaMasukHarian(30);

export const dashboardStats = {
  donasiBulanIni: 38_450_000,
  zakatBulanIni: 24_180_000,
  donaturBaruBulanIni: 37,
  campaignAktif: campaigns.length,
};

export function getCampaignPalingLaris(count = 5) {
  return [...campaigns].sort((a, b) => b.donaturCount - a.donaturCount).slice(0, count);
}

export function getTransactionsByCampaign(campaignId: string): AdminTransaction[] {
  return adminTransactions.filter((t) => t.campaignId === campaignId);
}

// ---------------------------------------------------------------------------
// Penerima Manfaat — versi LENGKAP (field publik + admin-only).
// JANGAN PERNAH import `adminBeneficiaries`/`AdminBeneficiary` dari halaman/komponen publik —
// lihat CLAUDE.md § Privasi data beneficiaries. Field publik (nama, umur, foto, dst) diturunkan
// dari SATU sumber yang sama (`publicBeneficiaries` di lib/dummy-data.ts) supaya admin & landing
// page tidak pernah beda data — field admin-only ditempel di sini lewat `PRIVATE_FIELDS`.
// ---------------------------------------------------------------------------

export type StatusPernikahan = "Belum Menikah" | "Menikah" | "Janda" | "Duda";

export type AdminBeneficiary = PublicBeneficiary & {
  alamat: string;
  tanggalLahir: string; // ISO date — admin-only, publik hanya boleh lihat `umur` hasil hitung
  statusPernikahan: StatusPernikahan;
};

const PRIVATE_FIELDS: Record<string, Pick<AdminBeneficiary, "alamat" | "tanggalLahir" | "statusPernikahan">> = {
  b1: { alamat: "Kp. Sukamulya RT 03/RW 06, Kec. Cibinong, Kab. Bogor", tanggalLahir: "1974-03-12", statusPernikahan: "Janda" },
  b2: { alamat: "Jl. Melati No. 12, Kec. Gunung Putri, Kab. Bogor", tanggalLahir: "2017-06-02", statusPernikahan: "Belum Menikah" },
  b3: { alamat: "Kp. Cikaret RT 01/RW 02, Kec. Cibinong, Kab. Bogor", tanggalLahir: "1965-11-20", statusPernikahan: "Menikah" },
  b4: { alamat: "Kp. Leuwinutug RT 04/RW 03, Kec. Citeureup, Kab. Bogor", tanggalLahir: "1981-01-30", statusPernikahan: "Menikah" },
  b5: { alamat: "Jl. Anggrek No. 5, Kec. Gunung Putri, Kab. Bogor", tanggalLahir: "2011-09-15", statusPernikahan: "Belum Menikah" },
};

export const adminBeneficiaries: AdminBeneficiary[] = publicBeneficiaries.map((b) => ({
  ...b,
  ...(PRIVATE_FIELDS[b.id] ?? {
    alamat: "-",
    tanggalLahir: "-",
    statusPernikahan: "Belum Menikah" as StatusPernikahan,
  }),
}));

// ---------------------------------------------------------------------------
// Donatur — agregat dari adminTransactions (setara tabel `donors`).
// ---------------------------------------------------------------------------

export type DonorSummary = {
  nama: string;
  kontak: string;
  segmentasi: ("Donatur" | "Muzakki")[];
  totalNominal: number;
  jumlahTransaksi: number;
  transaksiTerakhir: string;
};

const DONOR_CONTACTS: Record<string, string> = {
  "Budi Santoso": "0812-3456-7890",
  "Siti Rahayu": "0813-2233-4455",
  "Andi Wijaya": "0857-1122-3344",
  "Dewi Lestari": "0878-9988-7766",
  "Rudi Hartono": "0821-5566-7788",
  "Fajar Nugroho": "0896-1234-5678",
  "Maya Sari": "0838-4455-6677",
};

export function getDonorsSummary(): DonorSummary[] {
  const byName = new Map<
    string,
    { total: number; count: number; segmentasi: Set<"Donatur" | "Muzakki">; terakhir: string }
  >();

  for (const t of adminTransactions) {
    if (t.status !== "paid") continue;
    const entry = byName.get(t.donaturNama) ?? {
      total: 0,
      count: 0,
      segmentasi: new Set<"Donatur" | "Muzakki">(),
      terakhir: t.tanggal,
    };
    entry.total += t.nominal;
    entry.count += 1;
    entry.segmentasi.add(t.jenis === "zakat" ? "Muzakki" : "Donatur");
    if (t.tanggal > entry.terakhir) entry.terakhir = t.tanggal;
    byName.set(t.donaturNama, entry);
  }

  return Array.from(byName.entries())
    .map(([nama, entry]) => ({
      nama,
      kontak: DONOR_CONTACTS[nama] ?? "-",
      totalNominal: entry.total,
      jumlahTransaksi: entry.count,
      segmentasi: Array.from(entry.segmentasi),
      transaksiTerakhir: entry.terakhir,
    }))
    .sort((a, b) => b.totalNominal - a.totalNominal);
}

export function getDonorTransactions(nama: string): AdminTransaction[] {
  return adminTransactions.filter((t) => t.donaturNama === nama);
}

// ---------------------------------------------------------------------------
// Pendaftar program — setara tabel pendaftaran program (belum ada di PRD sebagai tabel formal,
// dimodelkan minimal di sini untuk sub-halaman "Daftar Pendaftar").
// ---------------------------------------------------------------------------

export type ProgramApplicant = {
  id: string;
  programId: string;
  nama: string;
  kontak: string;
  tanggalDaftar: string;
  catatan: string;
};

export const programApplicants: ProgramApplicant[] = [
  { id: "APL-01", programId: "p1", nama: "Warto Sujono", kontak: "0812-1111-2222", tanggalDaftar: "2026-09-05", catatan: "Sudah punya usaha warung kecil, butuh modal tambahan." },
  { id: "APL-02", programId: "p1", nama: "Neneng Herawati", kontak: "0813-2222-3333", tanggalDaftar: "2026-09-06", catatan: "-" },
  { id: "APL-03", programId: "p3", nama: "Ibu Yuli (wali dari Rizki)", kontak: "0857-3333-4444", tanggalDaftar: "2026-09-07", catatan: "Anak yatim, kelas 5 SD." },
  { id: "APL-04", programId: "p4", nama: "Ust. Maman", kontak: "0878-4444-5555", tanggalDaftar: "2026-09-08", catatan: "Mendaftarkan 2 santri." },
];

export function getApplicantsByProgram(programId: string): ProgramApplicant[] {
  return programApplicants.filter((a) => a.programId === programId);
}

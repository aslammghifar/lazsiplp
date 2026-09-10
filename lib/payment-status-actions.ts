"use server";

import { adminTransactions, type TransactionStatus } from "@/lib/admin-dummy-data";

// Server Action — aman dipanggil dari komponen publik ("use client") karena Next.js hanya
// mengirim referensi function ke client, BUKAN isi module ini (termasuk `adminTransactions`).
// Jangan pernah import `adminTransactions` langsung ke komponen/halaman publik — lihat
// lib/admin-dummy-data.ts baris pertama.

export type PaymentStatusResult =
  | {
      found: true;
      kode: string;
      jenis: "donasi" | "zakat";
      labelJenis: string;
      nominal: number;
      biayaAdmin: number;
      metode: string;
      status: TransactionStatus;
      tanggal: string;
    }
  | { found: false };

export async function cekStatusPembayaran(kodeRaw: string): Promise<PaymentStatusResult> {
  const kode = kodeRaw.trim().toUpperCase();
  if (!kode) return { found: false };

  // Simulasi delay jaringan supaya loading state kelihatan natural — nanti diganti query DB asli.
  await new Promise((resolve) => setTimeout(resolve, 400));

  const trx = adminTransactions.find((t) => t.id.toUpperCase() === kode);
  if (!trx) return { found: false };

  return {
    found: true,
    kode: trx.id,
    jenis: trx.jenis,
    labelJenis: trx.labelJenis,
    nominal: trx.nominal,
    biayaAdmin: trx.biayaAdmin,
    metode: trx.metode,
    status: trx.status,
    tanggal: trx.tanggal,
  };
}

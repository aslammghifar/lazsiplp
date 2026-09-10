"use client";

import { useState, useTransition } from "react";
import { cekStatusPembayaran, type PaymentStatusResult } from "@/lib/payment-status-actions";
import type { TransactionStatus } from "@/lib/admin-dummy-data";
import { formatRupiah, formatDate } from "@/lib/format";

const STATUS_META: Record<TransactionStatus, { label: string; className: string }> = {
  paid: { label: "Sukses", className: "bg-secondary-50 text-secondary-700" },
  pending: { label: "Menunggu Pembayaran", className: "bg-amber-50 text-amber-700" },
  failed: { label: "Gagal", className: "bg-red-50 text-red-700" },
  expired: { label: "Kedaluwarsa", className: "bg-primary-900/5 text-primary-900/60" },
};

export function HeroCekStatus() {
  const [kode, setKode] = useState("");
  const [result, setResult] = useState<PaymentStatusResult | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = kode.trim();
    if (!trimmed) return;
    startTransition(async () => {
      const res = await cekStatusPembayaran(trimmed);
      setResult(res);
      setShowModal(true);
    });
  }

  return (
    <>
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4.5 w-4.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35M9 12l2 2 4-4" />
        </svg>
      </span>
      <p className="mt-4 text-xs font-bold uppercase tracking-wide text-secondary-600">
        Cek Status Donasi / Zakat Anda
      </p>
      <p className="mt-2 text-sm leading-relaxed text-primary-800/55">
        Silakan periksa email Anda untuk memperoleh kode transaksi setelah pembayaran. Masukkan kode tersebut pada kolom di bawah ini untuk memeriksa status terkini.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-2.5">
        <input
          value={kode}
          onChange={(e) => setKode(e.target.value)}
          placeholder="Masukkan kode pembayaran"
          className="rounded-full border border-primary-200 bg-primary-50/40 px-4 py-3 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
        />
        <button
          type="submit"
          disabled={isPending || !kode.trim()}
          className="inline-flex items-center justify-center rounded-full bg-primary-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Memeriksa..." : "Cek Status"}
        </button>
      </form>

      {showModal && result && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-primary-900/50" onClick={() => setShowModal(false)} aria-hidden />
          <div className="relative w-full max-w-sm rounded-3xl bg-white p-6 text-left shadow-xl">
            {result.found ? (
              <>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary-800/50">
                    Kode {result.kode}
                  </p>
                  <span
                    className={`inline-flex shrink-0 items-center rounded-full px-3 py-1 text-xs font-bold ${STATUS_META[result.status].className}`}
                  >
                    {STATUS_META[result.status].label}
                  </span>
                </div>

                <div className="mt-4 flex flex-col gap-2.5 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-primary-800/60">{result.jenis === "donasi" ? "Campaign" : "Jenis Zakat"}</span>
                    <span className="text-right font-semibold text-primary-900">{result.labelJenis}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-primary-800/60">Nominal</span>
                    <span className="font-semibold text-primary-900">{formatRupiah(result.nominal)}</span>
                  </div>
                  {result.biayaAdmin > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-primary-800/60">Biaya Admin</span>
                      <span className="font-semibold text-primary-900">{formatRupiah(result.biayaAdmin)}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-primary-800/60">Metode Pembayaran</span>
                    <span className="font-semibold text-primary-900">{result.metode}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-primary-100 pt-2.5">
                    <span className="text-primary-800/60">Tanggal</span>
                    <span className="font-semibold text-primary-900">{formatDate(result.tanggal)}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </span>
                <p className="mt-3 text-sm font-bold text-primary-900">Kode Tidak Ditemukan</p>
                <p className="mt-1.5 text-sm leading-relaxed text-primary-800/60">
                  Periksa kembali kode pembayaran Anda, atau hubungi CS kami kalau masih bermasalah.
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="mt-6 w-full rounded-full border border-primary-200 px-4 py-2.5 text-sm font-semibold text-primary-800 transition-colors hover:border-primary-400"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
}

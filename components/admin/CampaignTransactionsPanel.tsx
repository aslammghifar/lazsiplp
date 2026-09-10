"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { formatRupiah, formatDate } from "@/lib/format";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { EmptyState } from "@/components/admin/EmptyState";
import type { AdminTransaction, TransactionStatus } from "@/lib/admin-dummy-data";

type StatusFilter = "semua" | TransactionStatus;

export function CampaignTransactionsPanel({
  campaignTitle,
  transactions,
}: {
  campaignTitle: string;
  transactions: AdminTransaction[];
}) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("semua");
  const [metode, setMetode] = useState("semua");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const metodeOptions = useMemo(() => Array.from(new Set(transactions.map((t) => t.metode))).sort(), [transactions]);

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      if (search && !t.donaturNama.toLowerCase().includes(search.toLowerCase())) return false;
      if (status !== "semua" && t.status !== status) return false;
      if (metode !== "semua" && t.metode !== metode) return false;
      if (dateFrom && t.tanggal < dateFrom) return false;
      if (dateTo && t.tanggal > dateTo) return false;
      return true;
    });
  }, [transactions, search, status, metode, dateFrom, dateTo]);

  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-primary-100 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-primary-100 p-5">
        <h3 className="text-base font-bold text-primary-900">Riwayat Donasi Campaign Ini</h3>
        <Link
          href={`/admin/transaksi?campaign=${encodeURIComponent(campaignTitle)}`}
          className="text-sm font-semibold text-primary-700 hover:text-primary-900"
        >
          Lihat di Riwayat Transaksi &rarr;
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-b border-primary-100 p-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama donatur..."
          className="min-w-[160px] flex-1 rounded-full border border-primary-200 bg-white px-3.5 py-2 text-xs text-primary-800 outline-none focus:ring-2 focus:ring-primary-400"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as StatusFilter)}
          className="rounded-full border border-primary-200 bg-white px-3.5 py-2 text-xs text-primary-800 outline-none focus:ring-2 focus:ring-primary-400"
        >
          <option value="semua">Semua Status</option>
          <option value="paid">Lunas</option>
          <option value="pending">Menunggu</option>
          <option value="failed">Gagal</option>
          <option value="expired">Kedaluwarsa</option>
        </select>
        <select
          value={metode}
          onChange={(e) => setMetode(e.target.value)}
          className="rounded-full border border-primary-200 bg-white px-3.5 py-2 text-xs text-primary-800 outline-none focus:ring-2 focus:ring-primary-400"
        >
          <option value="semua">Semua Metode</option>
          {metodeOptions.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          className="rounded-full border border-primary-200 bg-white px-3.5 py-2 text-xs text-primary-800 outline-none focus:ring-2 focus:ring-primary-400"
        />
        <input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          className="rounded-full border border-primary-200 bg-white px-3.5 py-2 text-xs text-primary-800 outline-none focus:ring-2 focus:ring-primary-400"
        />
        <span className="ml-auto text-xs text-primary-800/45">{filtered.length} dari {transactions.length} transaksi</span>
      </div>

      {filtered.length === 0 ? (
        <EmptyState message={transactions.length === 0 ? "Belum ada transaksi masuk untuk campaign ini." : "Tidak ada transaksi yang cocok dengan filter ini."} />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-primary-100 bg-primary-50/60 text-[11px] font-semibold uppercase tracking-wider text-primary-700/70">
                <th className="px-4 py-3.5 font-semibold">Tanggal</th>
                <th className="px-4 py-3.5 font-semibold">Donatur</th>
                <th className="px-4 py-3.5 font-semibold">Nominal</th>
                <th className="px-4 py-3.5 font-semibold">Metode</th>
                <th className="px-4 py-3.5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-50">
              {filtered.map((t) => (
                <tr key={t.id} className="transition-colors hover:bg-primary-50/40">
                  <td className="px-4 py-3.5 text-primary-800/60">{formatDate(t.tanggal)}</td>
                  <td className="px-4 py-3.5 font-medium text-primary-900">
                    {t.donaturNama}
                    {t.anonim && <span className="ml-1.5 text-xs font-normal text-primary-800/45">(anonim)</span>}
                  </td>
                  <td className="px-4 py-3.5 font-semibold text-primary-900">{formatRupiah(t.nominal)}</td>
                  <td className="px-4 py-3.5 text-primary-800/70">{t.metode}</td>
                  <td className="px-4 py-3.5">
                    <StatusBadge status={t.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

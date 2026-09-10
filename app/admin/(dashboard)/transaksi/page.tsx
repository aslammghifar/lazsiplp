"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { adminTransactions, type TransactionStatus, type AdminTransaction } from "@/lib/admin-dummy-data";
import { formatRupiah, formatDate } from "@/lib/format";
import { exportSheetToExcel } from "@/lib/excel-export";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { EmptyState } from "@/components/admin/EmptyState";

type Tab = "donasi" | "zakat";
type StatusFilter = "semua" | TransactionStatus;

const STATUS_TABS: { value: StatusFilter; label: string }[] = [
  { value: "semua", label: "Semua Status" },
  { value: "paid", label: "Lunas" },
  { value: "pending", label: "Menunggu" },
  { value: "failed", label: "Gagal" },
  { value: "expired", label: "Kedaluwarsa" },
];

const STATUS_LABEL: Record<TransactionStatus, string> = {
  paid: "Lunas",
  pending: "Menunggu Pembayaran",
  failed: "Gagal",
  expired: "Kedaluwarsa",
};

async function exportTransactions(rows: AdminTransaction[], tab: Tab, filterSummary: string) {
  await exportSheetToExcel<AdminTransaction>({
    fileNamePrefix: `lazsip-riwayat-${tab}`,
    reportTitle: `Laporan Riwayat Transaksi — ${tab === "donasi" ? "Donasi" : "Zakat"}`,
    subtitleLines: [filterSummary],
    columns: [
      { header: "No", width: 5, align: "right", value: (_t, i) => i + 1 },
      { header: "Tanggal", width: 14, value: (t) => formatDate(t.tanggal) },
      { header: "ID Transaksi", width: 14, value: (t) => t.id },
      { header: "Nama Donatur", width: 26, value: (t) => t.donaturNama + (t.anonim ? " (Anonim)" : "") },
      { header: "Jenis", width: 10, value: (t) => (t.jenis === "donasi" ? "Donasi" : "Zakat") },
      { header: tab === "donasi" ? "Campaign" : "Jenis Zakat", width: 32, value: (t) => t.labelJenis },
      { header: "Metode Pembayaran", width: 22, value: (t) => t.metode },
      { header: "Nominal (Rp)", width: 16, align: "right", numFmt: "#,##0", value: (t) => t.nominal },
      {
        header: "Biaya Admin Ditanggung Donatur (Rp)",
        width: 20,
        align: "right",
        numFmt: "#,##0",
        value: (t) => (t.menanggungBiayaAdmin ? t.biayaAdmin : 0),
      },
      { header: "Status", width: 16, align: "center", value: (t) => STATUS_LABEL[t.status] },
    ],
    rows,
    totalColumns: [7, 8],
  });
}

export default function AdminTransaksiPage() {
  const searchParams = useSearchParams();
  const initialLabel = searchParams.get("campaign");

  const [tab, setTab] = useState<Tab>("donasi");
  const [status, setStatus] = useState<StatusFilter>("semua");
  const [metode, setMetode] = useState("semua");
  const [labelFilter, setLabelFilter] = useState(initialLabel || "semua");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [exporting, setExporting] = useState(false);

  const byTab = useMemo(() => adminTransactions.filter((t) => t.jenis === tab), [tab]);
  const metodeOptions = useMemo(() => Array.from(new Set(byTab.map((t) => t.metode))), [byTab]);
  const labelOptions = useMemo(() => Array.from(new Set(byTab.map((t) => t.labelJenis))), [byTab]);

  const items = useMemo(() => {
    return byTab.filter((t) => {
      if (status !== "semua" && t.status !== status) return false;
      if (metode !== "semua" && t.metode !== metode) return false;
      if (labelFilter !== "semua" && t.labelJenis !== labelFilter) return false;
      if (dateFrom && t.tanggal < dateFrom) return false;
      if (dateTo && t.tanggal > dateTo) return false;
      return true;
    });
  }, [byTab, status, metode, labelFilter, dateFrom, dateTo]);

  const filterSummary = [
    `Status: ${STATUS_TABS.find((s) => s.value === status)?.label ?? "Semua Status"}`,
    metode !== "semua" ? `Metode: ${metode}` : null,
    labelFilter !== "semua" ? `${tab === "donasi" ? "Campaign" : "Jenis Zakat"}: ${labelFilter}` : null,
    dateFrom || dateTo ? `Periode: ${dateFrom ? formatDate(dateFrom) : "awal"} s/d ${dateTo ? formatDate(dateTo) : "sekarang"}` : "Periode: Semua",
  ]
    .filter(Boolean)
    .join("  •  ");

  async function handleExport() {
    setExporting(true);
    try {
      await exportTransactions(items, tab, filterSummary);
    } finally {
      setExporting(false);
    }
  }

  return (
    <div>
      <AdminPageHeader
        title="Riwayat Transaksi"
        description="Status HANYA berubah otomatis lewat webhook payment gateway — tidak bisa diedit manual dari sini."
        action={
          <button
            type="button"
            onClick={handleExport}
            disabled={exporting || items.length === 0}
            className="inline-flex items-center gap-2 rounded-full border border-primary-200 px-4 py-2.5 text-sm font-semibold text-primary-800 transition-colors hover:border-primary-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v13m0 0-4-4m4 4 4-4M4 18v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2" />
            </svg>
            {exporting ? "Menyiapkan file..." : "Export ke Excel"}
          </button>
        }
      />

      <div className="mb-4 flex gap-2">
        {(["donasi", "zakat"] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => {
              setTab(t);
              setMetode("semua");
              setLabelFilter("semua");
            }}
            className={`rounded-full border px-5 py-2.5 text-sm font-semibold capitalize transition-colors ${
              tab === t ? "border-primary-900 bg-primary-900 text-white" : "border-primary-200 bg-white text-primary-800 hover:border-primary-400"
            }`}
          >
            Riwayat {t}
          </button>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {STATUS_TABS.map((s) => (
          <button
            key={s.value}
            type="button"
            onClick={() => setStatus(s.value)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
              status === s.value ? "border-primary-900 bg-primary-900 text-white" : "border-primary-200 bg-white text-primary-800 hover:border-primary-400"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
        <select value={metode} onChange={(e) => setMetode(e.target.value)} className="rounded-full border border-primary-200 bg-white px-3.5 py-2 text-xs text-primary-800 outline-none focus:ring-2 focus:ring-primary-400">
          <option value="semua">Semua Metode</option>
          {metodeOptions.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
        <select value={labelFilter} onChange={(e) => setLabelFilter(e.target.value)} className="rounded-full border border-primary-200 bg-white px-3.5 py-2 text-xs text-primary-800 outline-none focus:ring-2 focus:ring-primary-400">
          <option value="semua">{tab === "donasi" ? "Semua Campaign" : "Semua Jenis Zakat"}</option>
          {labelOptions.map((l) => <option key={l} value={l}>{l}</option>)}
        </select>
        <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="rounded-full border border-primary-200 bg-white px-3.5 py-2 text-xs text-primary-800 outline-none focus:ring-2 focus:ring-primary-400" />
        <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="rounded-full border border-primary-200 bg-white px-3.5 py-2 text-xs text-primary-800 outline-none focus:ring-2 focus:ring-primary-400" />
      </div>

      <div className="overflow-hidden rounded-2xl border border-primary-100 bg-white">
        {items.length === 0 ? (
          <EmptyState message="Tidak ada transaksi untuk filter ini." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[880px] text-left text-sm">
              <thead>
                <tr className="border-b border-primary-100 bg-primary-50/60 text-[11px] font-semibold uppercase tracking-wider text-primary-700/70">
                  <th className="px-4 py-3.5 font-semibold">ID</th>
                  <th className="px-4 py-3.5 font-semibold">Tanggal</th>
                  <th className="px-4 py-3.5 font-semibold">Nama</th>
                  <th className="px-4 py-3.5 font-semibold">{tab === "donasi" ? "Campaign" : "Jenis Zakat"}</th>
                  <th className="px-4 py-3.5 font-semibold">Nominal</th>
                  <th className="px-4 py-3.5 font-semibold">Metode</th>
                  {tab === "donasi" && <th className="px-4 py-3.5 font-semibold">Biaya Admin</th>}
                  <th className="px-4 py-3.5 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary-50">
                {items.map((t) => (
                  <tr key={t.id} className="transition-colors hover:bg-primary-50/40">
                    <td className="px-4 py-3.5 font-mono text-xs text-primary-800/60">{t.id}</td>
                    <td className="px-4 py-3.5 text-primary-800/60">{formatDate(t.tanggal)}</td>
                    <td className="px-4 py-3.5 font-medium text-primary-900">
                      {t.donaturNama}
                      {t.anonim && <span className="ml-1.5 text-xs font-normal text-primary-800/45">(anonim)</span>}
                    </td>
                    <td className="max-w-[200px] truncate px-4 py-3.5 text-primary-800/70">{t.labelJenis}</td>
                    <td className="px-4 py-3.5 font-semibold text-primary-900">{formatRupiah(t.nominal)}</td>
                    <td className="px-4 py-3.5 text-primary-800/70">{t.metode}</td>
                    {tab === "donasi" && (
                      <td className="px-4 py-3.5 text-primary-800/60">
                        {t.menanggungBiayaAdmin ? formatRupiah(t.biayaAdmin) : "Ditanggung LAZSIP"}
                      </td>
                    )}
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
    </div>
  );
}

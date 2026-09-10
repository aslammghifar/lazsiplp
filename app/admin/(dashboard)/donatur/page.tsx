"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { getDonorsSummary, type DonorSummary } from "@/lib/admin-dummy-data";
import { formatRupiah, formatNumber, formatDate } from "@/lib/format";
import { exportSheetToExcel } from "@/lib/excel-export";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { SearchInput } from "@/components/admin/SearchInput";
import { EmptyState } from "@/components/admin/EmptyState";
import { Pagination } from "@/components/admin/Pagination";

type SegmenFilter = "semua" | "Donatur" | "Muzakki";
type SortBy = "nominal" | "terbaru";

const PAGE_SIZE = 8;

export default function AdminDonaturPage() {
  const donors = useMemo(() => getDonorsSummary(), []);
  const [search, setSearch] = useState("");
  const [segmen, setSegmen] = useState<SegmenFilter>("semua");
  const [sortBy, setSortBy] = useState<SortBy>("nominal");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [minNominal, setMinNominal] = useState("");
  const [page, setPage] = useState(1);
  const [exporting, setExporting] = useState(false);

  const filtered = useMemo(() => {
    let result = donors.filter((d) => d.nama.toLowerCase().includes(search.toLowerCase()));
    if (segmen !== "semua") result = result.filter((d) => d.segmentasi.includes(segmen));
    if (dateFrom) result = result.filter((d) => d.transaksiTerakhir >= dateFrom);
    if (dateTo) result = result.filter((d) => d.transaksiTerakhir <= dateTo);
    if (minNominal) result = result.filter((d) => d.totalNominal >= Number(minNominal));
    result = [...result].sort((a, b) =>
      sortBy === "nominal"
        ? b.totalNominal - a.totalNominal
        : b.transaksiTerakhir.localeCompare(a.transaksiTerakhir)
    );
    return result;
  }, [donors, search, segmen, dateFrom, dateTo, minNominal, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const items = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  async function handleExport() {
    setExporting(true);
    try {
      await exportSheetToExcel<DonorSummary>({
        fileNamePrefix: "lazsip-daftar-donatur",
        reportTitle: "Laporan Donatur & Muzakki",
        subtitleLines: [
          `Segmen: ${segmen === "semua" ? "Semua" : segmen}  •  Menampilkan ${filtered.length} dari ${donors.length} donatur`,
        ],
        columns: [
          { header: "No", width: 5, align: "right", value: (_d, i) => i + 1 },
          { header: "Nama Donatur", width: 28, value: (d) => d.nama },
          { header: "Kontak", width: 18, value: (d) => d.kontak },
          { header: "Segmen", width: 20, value: (d) => d.segmentasi.join(" & ") },
          { header: "Jumlah Transaksi", width: 14, align: "right", value: (d) => d.jumlahTransaksi },
          { header: "Transaksi Terakhir", width: 16, value: (d) => formatDate(d.transaksiTerakhir) },
          { header: "Total Nominal (Rp)", width: 18, align: "right", numFmt: "#,##0", value: (d) => d.totalNominal },
        ],
        rows: filtered,
        totalColumns: [4, 6],
      });
    } finally {
      setExporting(false);
    }
  }

  return (
    <div>
      <AdminPageHeader
        title="Donatur"
        description={`${donors.length} donatur/muzakki — otomatis teragregasi dari transaksi yang sudah lunas.`}
        action={
          <button
            type="button"
            onClick={handleExport}
            disabled={exporting || filtered.length === 0}
            className="inline-flex items-center gap-2 rounded-full border border-primary-200 px-4 py-2.5 text-sm font-semibold text-primary-800 transition-colors hover:border-primary-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v13m0 0-4-4m4 4 4-4M4 18v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2" />
            </svg>
            {exporting ? "Menyiapkan file..." : "Export ke Excel"}
          </button>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <SearchInput value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Cari nama donatur..." />
        <div className="flex gap-2">
          {(["semua", "Donatur", "Muzakki"] as SegmenFilter[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => { setSegmen(s); setPage(1); }}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                segmen === s ? "border-primary-900 bg-primary-900 text-white" : "border-primary-200 bg-white text-primary-800 hover:border-primary-400"
              }`}
            >
              {s === "semua" ? "Semua" : s}
            </button>
          ))}
        </div>
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => { setDateFrom(e.target.value); setPage(1); }}
          className="rounded-full border border-primary-200 bg-white px-3.5 py-2 text-xs text-primary-800 outline-none focus:ring-2 focus:ring-primary-400"
        />
        <span className="text-xs text-primary-800/40">s/d</span>
        <input
          type="date"
          value={dateTo}
          onChange={(e) => { setDateTo(e.target.value); setPage(1); }}
          className="rounded-full border border-primary-200 bg-white px-3.5 py-2 text-xs text-primary-800 outline-none focus:ring-2 focus:ring-primary-400"
        />
        <input
          type="number"
          min={0}
          value={minNominal}
          onChange={(e) => { setMinNominal(e.target.value); setPage(1); }}
          placeholder="Min. total nominal"
          className="w-40 rounded-full border border-primary-200 bg-white px-3.5 py-2 text-xs text-primary-800 outline-none focus:ring-2 focus:ring-primary-400"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortBy)}
          className="ml-auto rounded-full border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-800 outline-none focus:ring-2 focus:ring-primary-400"
        >
          <option value="nominal">Urutkan: Total nominal</option>
          <option value="terbaru">Urutkan: Transaksi terakhir</option>
        </select>
      </div>
      <p className="mb-4 text-xs text-primary-800/45">Menampilkan {filtered.length} dari {donors.length} donatur.</p>

      <div className="overflow-hidden rounded-2xl border border-primary-100 bg-white">
        {items.length === 0 ? (
          <EmptyState message="Belum ada donatur yang cocok dengan filter ini." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-primary-100 bg-primary-50/60 text-[11px] font-semibold uppercase tracking-wider text-primary-700/70">
                  <th className="px-4 py-3.5 font-semibold">Nama</th>
                  <th className="px-4 py-3.5 font-semibold">Kontak</th>
                  <th className="px-4 py-3.5 font-semibold">Segmen</th>
                  <th className="px-4 py-3.5 font-semibold">Transaksi Terakhir</th>
                  <th className="px-4 py-3.5 font-semibold">Total Nominal</th>
                  <th className="px-4 py-3.5 text-right font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary-50">
                {items.map((d) => (
                  <tr key={d.nama} className="transition-colors hover:bg-primary-50/40">
                    <td className="px-4 py-3.5 font-medium text-primary-900">{d.nama}</td>
                    <td className="px-4 py-3.5 text-primary-800/70">{d.kontak}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex flex-wrap gap-1.5">
                        {d.segmentasi.map((s) => (
                          <span
                            key={s}
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${
                              s === "Muzakki" ? "bg-secondary-50 text-secondary-700" : "bg-primary-50 text-primary-700"
                            }`}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-primary-800/60">{formatDate(d.transaksiTerakhir)}</td>
                    <td className="px-4 py-3.5 font-semibold text-primary-900">{formatRupiah(d.totalNominal)}</td>
                    <td className="px-4 py-3.5 text-right">
                      <Link
                        href={`/admin/donatur/${encodeURIComponent(d.nama)}`}
                        className="text-sm font-semibold text-primary-700 hover:text-primary-900"
                      >
                        Lihat Detail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </div>
      {items.length > 0 && (
        <p className="mt-2 text-xs text-primary-800/40">Total transaksi tercatat: {formatNumber(donors.reduce((s, d) => s + d.jumlahTransaksi, 0))}</p>
      )}
    </div>
  );
}

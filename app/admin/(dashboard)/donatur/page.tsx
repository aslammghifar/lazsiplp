"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { getDonorsSummary } from "@/lib/admin-dummy-data";
import { formatRupiah, formatNumber, formatDate } from "@/lib/format";
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
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = donors.filter((d) => d.nama.toLowerCase().includes(search.toLowerCase()));
    if (segmen !== "semua") result = result.filter((d) => d.segmentasi.includes(segmen));
    result = [...result].sort((a, b) =>
      sortBy === "nominal"
        ? b.totalNominal - a.totalNominal
        : b.transaksiTerakhir.localeCompare(a.transaksiTerakhir)
    );
    return result;
  }, [donors, search, segmen, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const items = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <AdminPageHeader
        title="Donatur"
        description={`${donors.length} donatur/muzakki — otomatis teragregasi dari transaksi yang sudah lunas.`}
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
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortBy)}
          className="ml-auto rounded-full border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-800 outline-none focus:ring-2 focus:ring-primary-400"
        >
          <option value="nominal">Urutkan: Total nominal</option>
          <option value="terbaru">Urutkan: Transaksi terakhir</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-primary-100 bg-white">
        {items.length === 0 ? (
          <EmptyState message="Belum ada donatur yang cocok dengan filter ini." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-primary-100 text-xs uppercase tracking-wide text-primary-800/50">
                  <th className="px-4 py-3 font-semibold">Nama</th>
                  <th className="px-4 py-3 font-semibold">Kontak</th>
                  <th className="px-4 py-3 font-semibold">Segmen</th>
                  <th className="px-4 py-3 font-semibold">Transaksi Terakhir</th>
                  <th className="px-4 py-3 font-semibold">Total Nominal</th>
                  <th className="px-4 py-3 text-right font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary-50">
                {items.map((d) => (
                  <tr key={d.nama}>
                    <td className="px-4 py-3 font-medium text-primary-900">{d.nama}</td>
                    <td className="px-4 py-3 text-primary-800/70">{d.kontak}</td>
                    <td className="px-4 py-3">
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
                    <td className="px-4 py-3 text-primary-800/60">{formatDate(d.transaksiTerakhir)}</td>
                    <td className="px-4 py-3 font-semibold text-primary-900">{formatRupiah(d.totalNominal)}</td>
                    <td className="px-4 py-3 text-right">
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

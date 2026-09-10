"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { activities as initialActivities } from "@/lib/dummy-data";
import { formatDate } from "@/lib/format";
import { useToast } from "@/components/ui/Toast";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Toggle } from "@/components/admin/Toggle";
import { RowActions } from "@/components/admin/RowActions";
import { SearchInput } from "@/components/admin/SearchInput";
import { Pagination } from "@/components/admin/Pagination";
import { EmptyState } from "@/components/admin/EmptyState";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { ViewModeToggle, type ViewMode } from "@/components/admin/ViewModeToggle";
import { AdminGridCard } from "@/components/admin/AdminGridCard";

const PAGE_SIZE = 8;

export default function AdminKegiatanPage() {
  const { showToast } = useToast();
  const router = useRouter();
  const [items, setItems] = useState(initialActivities);
  const [search, setSearch] = useState("");
  const [lokasiFilter, setLokasiFilter] = useState("semua");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortOrder, setSortOrder] = useState<"terbaru" | "terlama">("terbaru");
  const [view, setView] = useState<ViewMode>("list");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);

  function togglePinned(id: string) {
    setItems((prev) => prev.map((a) => (a.id === id ? { ...a, isPinned: !a.isPinned } : a)));
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    setItems((prev) => prev.filter((a) => a.id !== deleteTarget.id));
    showToast(`Kegiatan "${deleteTarget.title}" dihapus (belum tersimpan permanen).`, "error");
    setDeleteTarget(null);
  }

  const lokasiOptions = useMemo(() => Array.from(new Set(items.map((a) => a.lokasi))).sort(), [items]);

  const filtered = useMemo(() => {
    let result = items.filter((a) => a.title.toLowerCase().includes(search.toLowerCase()));
    if (lokasiFilter !== "semua") result = result.filter((a) => a.lokasi === lokasiFilter);
    if (dateFrom) result = result.filter((a) => a.tanggal >= dateFrom);
    if (dateTo) result = result.filter((a) => a.tanggal <= dateTo);
    result = [...result].sort((a, b) =>
      sortOrder === "terbaru"
        ? new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime()
        : new Date(a.tanggal).getTime() - new Date(b.tanggal).getTime()
    );
    return result;
  }, [items, search, lokasiFilter, dateFrom, dateTo, sortOrder]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <AdminPageHeader
        title="Kegiatan"
        description={`${items.length} kegiatan — dokumentasi & agenda lapangan LAZSIP.`}
        action={
          <Link
            href="/admin/kegiatan/baru"
            className="inline-flex items-center gap-2 rounded-full bg-primary-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-800"
          >
            + Tambah Kegiatan
          </Link>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <SearchInput value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Cari judul kegiatan..." />
        <select
          value={lokasiFilter}
          onChange={(e) => { setLokasiFilter(e.target.value); setPage(1); }}
          className="rounded-full border border-primary-200 bg-white px-3.5 py-2 text-xs text-primary-800 outline-none focus:ring-2 focus:ring-primary-400"
        >
          <option value="semua">Semua Lokasi</option>
          {lokasiOptions.map((l) => <option key={l} value={l}>{l}</option>)}
        </select>
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
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "terbaru" | "terlama")}
          className="rounded-full border border-primary-200 bg-white px-3.5 py-2 text-xs text-primary-800 outline-none focus:ring-2 focus:ring-primary-400"
        >
          <option value="terbaru">Terbaru</option>
          <option value="terlama">Terlama</option>
        </select>
        <div className="ml-auto">
          <ViewModeToggle mode={view} onChange={setView} />
        </div>
      </div>
      <p className="mb-4 text-xs text-primary-800/45">Menampilkan {filtered.length} dari {items.length} kegiatan.</p>

      {paged.length === 0 ? (
        <div className="rounded-2xl border border-primary-100 bg-white">
          <EmptyState message="Belum ada kegiatan. Klik tombol di atas untuk menambah." />
        </div>
      ) : view === "list" ? (
        <div className="overflow-hidden rounded-2xl border border-primary-100 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="border-b border-primary-100 bg-primary-50/60 text-[11px] font-semibold uppercase tracking-wider text-primary-700/70">
                  <th className="px-4 py-3.5 font-semibold">Thumbnail</th>
                  <th className="px-4 py-3.5 font-semibold">Judul</th>
                  <th className="px-4 py-3.5 font-semibold">Tanggal</th>
                  <th className="px-4 py-3.5 font-semibold">Lokasi</th>
                  <th className="px-4 py-3.5 font-semibold">Pinned</th>
                  <th className="px-4 py-3.5 text-right font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary-50">
                {paged.map((item) => (
                  <tr key={item.id} className="transition-colors hover:bg-primary-50/40">
                    <td className="px-4 py-3.5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.imageUrl} alt="" className="h-12 w-16 rounded-xl border border-primary-100/80 object-cover" />
                    </td>
                    <td className="max-w-xs truncate px-4 py-3.5 font-medium text-primary-900">{item.title}</td>
                    <td className="px-4 py-3.5 text-primary-800/60">{formatDate(item.tanggal)}</td>
                    <td className="px-4 py-3.5 text-primary-800/70">{item.lokasi}</td>
                    <td className="px-4 py-3.5">
                      <Toggle checked={item.isPinned} onChange={() => togglePinned(item.id)} label="Pinned" />
                    </td>
                    <td className="px-4 py-3.5">
                      <RowActions
                        onEdit={() => router.push(`/admin/kegiatan/${item.id}`)}
                        onDelete={() => setDeleteTarget({ id: item.id, title: item.title })}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {paged.map((item) => (
              <AdminGridCard
                key={item.id}
                href={`/admin/kegiatan/${item.id}`}
                imageUrl={item.imageUrl}
                title={item.title}
                badges={
                  item.isPinned && (
                    <span className="rounded-full bg-secondary-50 px-2.5 py-0.5 text-[10px] font-bold text-secondary-700">PINNED</span>
                  )
                }
                description={item.description}
                meta={<span className="block truncate">{formatDate(item.tanggal)} · {item.lokasi}</span>}
                footer={<Toggle checked={item.isPinned} onChange={() => togglePinned(item.id)} label="Pinned" />}
                onDelete={() => setDeleteTarget({ id: item.id, title: item.title })}
              />
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      )}

      <ConfirmModal
        open={!!deleteTarget}
        title="Hapus Kegiatan?"
        description={`Apakah Anda yakin ingin menghapus "${deleteTarget?.title}"? Tindakan ini tidak bisa dibatalkan.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

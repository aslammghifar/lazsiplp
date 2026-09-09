"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { newsList as initialNewsList, NEWS_KATEGORI_LABEL } from "@/lib/dummy-data";
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

type StatusFilter = "semua" | "published" | "draft";
const MAX_PINNED = 3;
const PAGE_SIZE = 8;

export default function AdminBeritaPage() {
  const { showToast } = useToast();
  const router = useRouter();
  const [items, setItems] = useState(initialNewsList);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("semua");
  const [sortOrder, setSortOrder] = useState<"terbaru" | "terlama">("terbaru");
  const [view, setView] = useState<ViewMode>("list");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);

  function togglePinned(id: string) {
    setItems((prev) => {
      const target = prev.find((n) => n.id === id);
      if (!target) return prev;
      const pinnedCount = prev.filter((n) => n.isPinned).length;
      if (!target.isPinned && pinnedCount >= MAX_PINNED) {
        showToast(`Maksimal ${MAX_PINNED} berita pinned. Lepas salah satu pin dulu.`, "error");
        return prev;
      }
      return prev.map((n) => (n.id === id ? { ...n, isPinned: !n.isPinned } : n));
    });
  }

  function toggleStatus(id: string) {
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: n.status === "published" ? "draft" : "published" } : n))
    );
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    setItems((prev) => prev.filter((n) => n.id !== deleteTarget.id));
    showToast(`Berita "${deleteTarget.title}" dihapus (belum tersimpan permanen).`, "error");
    setDeleteTarget(null);
  }

  const filtered = useMemo(() => {
    let result = items.filter((n) => n.title.toLowerCase().includes(search.toLowerCase()));
    if (statusFilter !== "semua") result = result.filter((n) => n.status === statusFilter);
    result = [...result].sort((a, b) =>
      sortOrder === "terbaru"
        ? new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        : new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
    );
    return result;
  }, [items, search, statusFilter, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pinnedCount = items.filter((n) => n.isPinned).length;

  return (
    <div>
      <AdminPageHeader
        title="Berita"
        description={`${items.length} artikel — ${pinnedCount}/${MAX_PINNED} sedang pinned.`}
        action={
          <Link
            href="/admin/berita/baru"
            className="inline-flex items-center gap-2 rounded-full bg-primary-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-800"
          >
            + Tambah Berita Baru
          </Link>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <SearchInput value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Cari judul berita..." />
        <div className="flex gap-2">
          {(["semua", "published", "draft"] as StatusFilter[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => { setStatusFilter(s); setPage(1); }}
              className={`rounded-full border px-4 py-2 text-sm font-medium capitalize transition-colors ${
                statusFilter === s ? "border-primary-900 bg-primary-900 text-white" : "border-primary-200 bg-white text-primary-800 hover:border-primary-400"
              }`}
            >
              {s === "semua" ? "Semua" : s === "published" ? "Published" : "Draft"}
            </button>
          ))}
        </div>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "terbaru" | "terlama")}
          className="rounded-full border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-800 outline-none focus:ring-2 focus:ring-primary-400"
        >
          <option value="terbaru">Terbaru</option>
          <option value="terlama">Terlama</option>
        </select>
        <div className="ml-auto">
          <ViewModeToggle mode={view} onChange={setView} />
        </div>
      </div>

      {paged.length === 0 ? (
        <div className="rounded-2xl border border-primary-100 bg-white">
          <EmptyState message="Belum ada berita. Klik tombol di atas untuk menambah." />
        </div>
      ) : view === "list" ? (
        <div className="overflow-hidden rounded-2xl border border-primary-100 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead>
                <tr className="border-b border-primary-100 text-xs uppercase tracking-wide text-primary-800/50">
                  <th className="px-4 py-3 font-semibold">Thumbnail</th>
                  <th className="px-4 py-3 font-semibold">Judul</th>
                  <th className="px-4 py-3 font-semibold">Kategori</th>
                  <th className="px-4 py-3 font-semibold">Tanggal</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Pinned</th>
                  <th className="px-4 py-3 text-right font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary-50">
                {paged.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.imageUrl} alt="" className="h-12 w-16 rounded-lg object-cover" />
                    </td>
                    <td className="max-w-xs truncate px-4 py-3 font-medium text-primary-900">{item.title}</td>
                    <td className="px-4 py-3 text-primary-800/70">{NEWS_KATEGORI_LABEL[item.kategori]}</td>
                    <td className="px-4 py-3 text-primary-800/60">{formatDate(item.publishedAt)}</td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => toggleStatus(item.id)}
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold transition-colors ${
                          item.status === "published" ? "bg-secondary-50 text-secondary-700" : "bg-primary-900/5 text-primary-900/50"
                        }`}
                      >
                        {item.status === "published" ? "Published" : "Draft"}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <Toggle checked={item.isPinned} onChange={() => togglePinned(item.id)} label="Pinned" />
                    </td>
                    <td className="px-4 py-3">
                      <RowActions
                        onEdit={() => router.push(`/admin/berita/${item.id}`)}
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
          {paged.map((item) => (
            <div key={item.id} className="flex gap-4 rounded-2xl border border-primary-100 bg-white p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.imageUrl} alt="" className="h-20 w-28 shrink-0 rounded-xl object-cover" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold text-primary-900">{item.title}</h3>
                  {item.isPinned && (
                    <span className="rounded-full bg-secondary-50 px-2.5 py-0.5 text-[10px] font-bold text-secondary-700">PINNED</span>
                  )}
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      item.status === "published" ? "bg-secondary-50 text-secondary-700" : "bg-primary-900/5 text-primary-900/50"
                    }`}
                  >
                    {item.status === "published" ? "PUBLISHED" : "DRAFT"}
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-primary-800/65">{item.excerpt}</p>
                <p className="mt-1.5 text-xs text-primary-800/50">
                  {NEWS_KATEGORI_LABEL[item.kategori]} &middot; {formatDate(item.publishedAt)}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2">
                <Toggle checked={item.isPinned} onChange={() => togglePinned(item.id)} label="Pinned" />
                <RowActions onEdit={() => router.push(`/admin/berita/${item.id}`)} onDelete={() => setDeleteTarget({ id: item.id, title: item.title })} />
              </div>
            </div>
          ))}
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      )}

      <ConfirmModal
        open={!!deleteTarget}
        title="Hapus Berita?"
        description={`Apakah Anda yakin ingin menghapus "${deleteTarget?.title}"? Tindakan ini tidak bisa dibatalkan.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

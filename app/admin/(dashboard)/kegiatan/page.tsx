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

const PAGE_SIZE = 8;

export default function AdminKegiatanPage() {
  const { showToast } = useToast();
  const router = useRouter();
  const [items, setItems] = useState(initialActivities);
  const [search, setSearch] = useState("");
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

  const filtered = useMemo(
    () => items.filter((a) => a.title.toLowerCase().includes(search.toLowerCase())),
    [items, search]
  );
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
        <div className="ml-auto">
          <ViewModeToggle mode={view} onChange={setView} />
        </div>
      </div>

      {paged.length === 0 ? (
        <div className="rounded-2xl border border-primary-100 bg-white">
          <EmptyState message="Belum ada kegiatan. Klik tombol di atas untuk menambah." />
        </div>
      ) : view === "list" ? (
        <div className="overflow-hidden rounded-2xl border border-primary-100 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="border-b border-primary-100 text-xs uppercase tracking-wide text-primary-800/50">
                  <th className="px-4 py-3 font-semibold">Thumbnail</th>
                  <th className="px-4 py-3 font-semibold">Judul</th>
                  <th className="px-4 py-3 font-semibold">Tanggal</th>
                  <th className="px-4 py-3 font-semibold">Lokasi</th>
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
                    <td className="px-4 py-3 text-primary-800/60">{formatDate(item.tanggal)}</td>
                    <td className="px-4 py-3 text-primary-800/70">{item.lokasi}</td>
                    <td className="px-4 py-3">
                      <Toggle checked={item.isPinned} onChange={() => togglePinned(item.id)} label="Pinned" />
                    </td>
                    <td className="px-4 py-3">
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
          {paged.map((item) => (
            <div key={item.id} className="flex gap-4 rounded-2xl border border-primary-100 bg-white p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.imageUrl} alt="" className="h-20 w-28 shrink-0 rounded-xl object-cover" />
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-primary-900">{item.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-primary-800/65">{item.description}</p>
                <p className="mt-1.5 text-xs text-primary-800/50">{formatDate(item.tanggal)} &middot; {item.lokasi}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2">
                <Toggle checked={item.isPinned} onChange={() => togglePinned(item.id)} label="Pinned" />
                <RowActions
                  onEdit={() => router.push(`/admin/kegiatan/${item.id}`)}
                  onDelete={() => setDeleteTarget({ id: item.id, title: item.title })}
                />
              </div>
            </div>
          ))}
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

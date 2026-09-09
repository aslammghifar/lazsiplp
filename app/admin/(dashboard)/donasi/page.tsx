"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { campaigns as initialCampaigns } from "@/lib/dummy-data";
import { formatRupiah } from "@/lib/format";
import { useToast } from "@/components/ui/Toast";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Toggle } from "@/components/admin/Toggle";
import { RowActions } from "@/components/admin/RowActions";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SearchInput } from "@/components/admin/SearchInput";
import { Pagination } from "@/components/admin/Pagination";
import { EmptyState } from "@/components/admin/EmptyState";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { ViewModeToggle, type ViewMode } from "@/components/admin/ViewModeToggle";

type StatusFilter = "semua" | "aktif" | "selesai" | "nonaktif";
const PAGE_SIZE = 8;

const STATUS_STYLES: Record<string, string> = {
  aktif: "bg-secondary-50 text-secondary-700",
  selesai: "bg-primary-50 text-primary-700",
  nonaktif: "bg-primary-900/5 text-primary-900/50",
};

export default function AdminDonasiPage() {
  const { showToast } = useToast();
  const router = useRouter();
  const [items, setItems] = useState(initialCampaigns);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("semua");
  const [view, setView] = useState<ViewMode>("list");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);

  function togglePinned(id: string) {
    setItems((prev) => prev.map((c) => (c.id === id ? { ...c, isPinned: !c.isPinned } : c)));
  }

  function cycleStatus(id: string) {
    const order: StatusFilter[] = ["aktif", "selesai", "nonaktif"];
    setItems((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const next = order[(order.indexOf(c.status) + 1) % order.length];
        return { ...c, status: next as typeof c.status };
      })
    );
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    setItems((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    showToast(`Campaign "${deleteTarget.title}" dihapus (belum tersimpan permanen).`, "error");
    setDeleteTarget(null);
  }

  const filtered = useMemo(() => {
    let result = items.filter(
      (c) => c.title.toLowerCase().includes(search.toLowerCase()) || c.kodeUnik.toLowerCase().includes(search.toLowerCase())
    );
    if (statusFilter !== "semua") result = result.filter((c) => c.status === statusFilter);
    return result;
  }, [items, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <AdminPageHeader
        title="Donasi & Campaign"
        description={`${items.length} campaign — kode unik dipakai melacak transaksi per campaign.`}
        action={
          <Link
            href="/admin/donasi/baru"
            className="inline-flex items-center gap-2 rounded-full bg-primary-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-800"
          >
            + Tambah Campaign
          </Link>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <SearchInput value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Cari judul / kode unik..." />
        <div className="flex gap-2">
          {(["semua", "aktif", "selesai", "nonaktif"] as StatusFilter[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => { setStatusFilter(s); setPage(1); }}
              className={`rounded-full border px-4 py-2 text-sm font-medium capitalize transition-colors ${
                statusFilter === s ? "border-primary-900 bg-primary-900 text-white" : "border-primary-200 bg-white text-primary-800 hover:border-primary-400"
              }`}
            >
              {s === "semua" ? "Semua" : s}
            </button>
          ))}
        </div>
        <div className="ml-auto">
          <ViewModeToggle mode={view} onChange={setView} />
        </div>
      </div>

      {paged.length === 0 ? (
        <div className="rounded-2xl border border-primary-100 bg-white">
          <EmptyState message="Belum ada campaign. Klik tombol di atas untuk menambah." />
        </div>
      ) : view === "list" ? (
        <div className="overflow-hidden rounded-2xl border border-primary-100 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[880px] text-left text-sm">
              <thead>
                <tr className="border-b border-primary-100 text-xs uppercase tracking-wide text-primary-800/50">
                  <th className="px-4 py-3 font-semibold">Thumbnail</th>
                  <th className="px-4 py-3 font-semibold">Campaign</th>
                  <th className="px-4 py-3 font-semibold">Kode Unik</th>
                  <th className="px-4 py-3 font-semibold">Progress</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Pinned</th>
                  <th className="px-4 py-3 text-right font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary-50">
                {paged.map((item) => {
                  const percent = item.target ? (item.collected / item.target) * 100 : 0;
                  return (
                    <tr key={item.id}>
                      <td className="px-4 py-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.imageUrl} alt="" className="h-12 w-16 rounded-lg object-cover" />
                      </td>
                      <td className="max-w-xs px-4 py-3">
                        <Link href={`/admin/donasi/${item.id}`} className="truncate font-medium text-primary-900 hover:underline">
                          {item.title}
                        </Link>
                        <p className="truncate text-xs text-primary-800/55">{item.kategoriLabel} &middot; {item.lokasi}</p>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-primary-800/60">{item.kodeUnik}</td>
                      <td className="px-4 py-3">
                        <div className="w-40">
                          {item.target ? (
                            <>
                              <ProgressBar percent={percent} />
                              <p className="mt-1 text-xs text-primary-800/55">
                                {formatRupiah(item.collected)} / {formatRupiah(item.target)}
                              </p>
                            </>
                          ) : (
                            <p className="text-xs font-semibold text-primary-800">{formatRupiah(item.collected)}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => cycleStatus(item.id)}
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold capitalize transition-colors ${STATUS_STYLES[item.status]}`}
                        >
                          {item.status}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <Toggle checked={item.isPinned} onChange={() => togglePinned(item.id)} label="Pinned" />
                      </td>
                      <td className="px-4 py-3">
                        <RowActions
                          onEdit={() => router.push(`/admin/donasi/${item.id}/edit`)}
                          onDelete={() => setDeleteTarget({ id: item.id, title: item.title })}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {paged.map((item) => {
            const percent = item.target ? (item.collected / item.target) * 100 : 0;
            return (
              <div key={item.id} className="flex gap-4 rounded-2xl border border-primary-100 bg-white p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.imageUrl} alt="" className="h-20 w-28 shrink-0 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link href={`/admin/donasi/${item.id}`} className="font-bold text-primary-900 hover:underline">
                      {item.title}
                    </Link>
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold capitalize ${STATUS_STYLES[item.status]}`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-primary-800/65">{item.description}</p>
                  <div className="mt-2 max-w-xs">
                    {item.target ? (
                      <ProgressBar percent={percent} />
                    ) : (
                      <p className="text-xs font-semibold text-primary-800">{formatRupiah(item.collected)}</p>
                    )}
                  </div>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-2">
                  <Toggle checked={item.isPinned} onChange={() => togglePinned(item.id)} label="Pinned" />
                  <RowActions
                    onEdit={() => router.push(`/admin/donasi/${item.id}/edit`)}
                    onDelete={() => setDeleteTarget({ id: item.id, title: item.title })}
                  />
                </div>
              </div>
            );
          })}
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      )}

      <ConfirmModal
        open={!!deleteTarget}
        title="Hapus Campaign?"
        description={`Apakah Anda yakin ingin menghapus "${deleteTarget?.title}"? Tindakan ini tidak bisa dibatalkan.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

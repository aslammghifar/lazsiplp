"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { programs as initialPrograms } from "@/lib/dummy-data";
import { getApplicantsByProgram } from "@/lib/admin-dummy-data";
import { useToast } from "@/components/ui/Toast";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Toggle } from "@/components/admin/Toggle";
import { RowActions } from "@/components/admin/RowActions";
import { SearchInput } from "@/components/admin/SearchInput";
import { Pagination } from "@/components/admin/Pagination";
import { EmptyState } from "@/components/admin/EmptyState";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { ViewModeToggle, type ViewMode } from "@/components/admin/ViewModeToggle";
import { AdminGridCard, stopCardClick } from "@/components/admin/AdminGridCard";

const PAGE_SIZE = 8;

export default function AdminPendidikanPage() {
  const { showToast } = useToast();
  const router = useRouter();
  const [items, setItems] = useState(() => initialPrograms.filter((p) => p.kategori === "pendidikan"));
  const [search, setSearch] = useState("");
  const [tipeFilter, setTipeFilter] = useState<"semua" | "pendaftaran" | "berita">("semua");
  const [pendaftaranFilter, setPendaftaranFilter] = useState<"semua" | "dibuka" | "ditutup">("semua");
  const [pinnedOnly, setPinnedOnly] = useState(false);
  const [view, setView] = useState<ViewMode>("list");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);

  function togglePinned(id: string) {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, isPinned: !p.isPinned } : p)));
  }

  function togglePendaftaran(id: string) {
    setItems((prev) =>
      prev.map((p) => (p.id === id && p.tipeKonten === "pendaftaran" ? { ...p, pendaftaranDibuka: !p.pendaftaranDibuka } : p))
    );
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    setItems((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    showToast(`Program "${deleteTarget.title}" dihapus (belum tersimpan permanen).`, "error");
    setDeleteTarget(null);
  }

  const filtered = useMemo(() => {
    let result = items.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
    if (tipeFilter !== "semua") result = result.filter((p) => p.tipeKonten === tipeFilter);
    if (pendaftaranFilter !== "semua") {
      result = result.filter(
        (p) => p.tipeKonten === "pendaftaran" && p.pendaftaranDibuka === (pendaftaranFilter === "dibuka")
      );
    }
    if (pinnedOnly) result = result.filter((p) => p.isPinned);
    return result;
  }, [items, search, tipeFilter, pendaftaranFilter, pinnedOnly]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <AdminPageHeader
        title="Divisi Pendidikan"
        description={`${items.length} program — dikelola terpisah dari Program Pemberdayaan & SARSIP.`}
        action={
          <Link
            href="/admin/pendidikan/baru"
            className="inline-flex items-center gap-2 rounded-full bg-primary-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-800"
          >
            + Tambah Program
          </Link>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <SearchInput value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Cari judul program..." />
        <select
          value={tipeFilter}
          onChange={(e) => { setTipeFilter(e.target.value as typeof tipeFilter); setPage(1); }}
          className="rounded-full border border-primary-200 bg-white px-3.5 py-2 text-xs text-primary-800 outline-none focus:ring-2 focus:ring-primary-400"
        >
          <option value="semua">Semua Tipe Konten</option>
          <option value="pendaftaran">Pendaftaran</option>
          <option value="berita">Berita</option>
        </select>
        <select
          value={pendaftaranFilter}
          onChange={(e) => { setPendaftaranFilter(e.target.value as typeof pendaftaranFilter); setPage(1); }}
          className="rounded-full border border-primary-200 bg-white px-3.5 py-2 text-xs text-primary-800 outline-none focus:ring-2 focus:ring-primary-400"
        >
          <option value="semua">Status Pendaftaran: Semua</option>
          <option value="dibuka">Pendaftaran Dibuka</option>
          <option value="ditutup">Pendaftaran Ditutup</option>
        </select>
        <button
          type="button"
          onClick={() => { setPinnedOnly((v) => !v); setPage(1); }}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            pinnedOnly ? "border-primary-900 bg-primary-900 text-white" : "border-primary-200 bg-white text-primary-800 hover:border-primary-400"
          }`}
        >
          Pinned saja
        </button>
        <div className="ml-auto">
          <ViewModeToggle mode={view} onChange={setView} />
        </div>
      </div>
      <p className="mb-4 text-xs text-primary-800/45">Menampilkan {filtered.length} dari {items.length} program.</p>

      {paged.length === 0 ? (
        <div className="rounded-2xl border border-primary-100 bg-white">
          <EmptyState message="Belum ada program. Klik tombol di atas untuk menambah." />
        </div>
      ) : view === "list" ? (
        <div className="overflow-hidden rounded-2xl border border-primary-100 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead>
                <tr className="border-b border-primary-100 bg-primary-50/60 text-[11px] font-semibold uppercase tracking-wider text-primary-700/70">
                  <th className="px-4 py-3.5 font-semibold">Thumbnail</th>
                  <th className="px-4 py-3.5 font-semibold">Judul</th>
                  <th className="px-4 py-3.5 font-semibold">Tipe Konten</th>
                  <th className="px-4 py-3.5 font-semibold">Pendaftaran</th>
                  <th className="px-4 py-3.5 font-semibold">Pinned</th>
                  <th className="px-4 py-3.5 text-right font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary-50">
                {paged.map((item) => {
                  const applicantCount = getApplicantsByProgram(item.id).length;
                  return (
                    <tr key={item.id} className="transition-colors hover:bg-primary-50/40">
                      <td className="px-4 py-3.5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.imageUrl} alt="" className="h-12 w-16 rounded-xl border border-primary-100/80 object-cover" />
                      </td>
                      <td className="max-w-xs px-4 py-3.5">
                        <p className="truncate font-medium text-primary-900">{item.title}</p>
                        {item.tipeKonten === "pendaftaran" && applicantCount > 0 && (
                          <Link href={`/admin/pendidikan/${item.id}/pendaftar`} className="text-xs font-semibold text-primary-700 hover:underline">
                            {applicantCount} pendaftar &rarr;
                          </Link>
                        )}
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${
                            item.tipeKonten === "pendaftaran" ? "bg-secondary-50 text-secondary-700" : "bg-primary-900/5 text-primary-900/60"
                          }`}
                        >
                          {item.tipeKonten === "pendaftaran" ? "Pendaftaran" : "Berita"}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        {item.tipeKonten === "pendaftaran" ? (
                          <Toggle checked={item.pendaftaranDibuka} onChange={() => togglePendaftaran(item.id)} label="Pendaftaran dibuka" />
                        ) : (
                          <span className="text-xs text-primary-800/40">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3.5">
                        <Toggle checked={item.isPinned} onChange={() => togglePinned(item.id)} label="Pinned" />
                      </td>
                      <td className="px-4 py-3.5">
                        <RowActions
                          onEdit={() => router.push(`/admin/pendidikan/${item.id}`)}
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {paged.map((item) => {
              const applicantCount = getApplicantsByProgram(item.id).length;
              return (
                <AdminGridCard
                  key={item.id}
                  href={`/admin/pendidikan/${item.id}`}
                  imageUrl={item.imageUrl}
                  title={item.title}
                  badges={
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        item.tipeKonten === "pendaftaran" ? "bg-secondary-50 text-secondary-700" : "bg-primary-900/5 text-primary-900/60"
                      }`}
                    >
                      {item.tipeKonten === "pendaftaran" ? "Pendaftaran" : "Berita"}
                    </span>
                  }
                  description={item.description}
                  meta={
                    item.tipeKonten === "pendaftaran" && applicantCount > 0 ? (
                      <Link
                        href={`/admin/pendidikan/${item.id}/pendaftar`}
                        onClick={stopCardClick}
                        className="block truncate font-semibold text-primary-700 hover:underline"
                      >
                        {applicantCount} pendaftar &rarr;
                      </Link>
                    ) : undefined
                  }
                  footer={
                    <>
                      {item.tipeKonten === "pendaftaran" && (
                        <Toggle checked={item.pendaftaranDibuka} onChange={() => togglePendaftaran(item.id)} label="Pendaftaran dibuka" />
                      )}
                      <Toggle checked={item.isPinned} onChange={() => togglePinned(item.id)} label="Pinned" />
                    </>
                  }
                  onDelete={() => setDeleteTarget({ id: item.id, title: item.title })}
                />
              );
            })}
          </div>
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      )}

      <ConfirmModal
        open={!!deleteTarget}
        title="Hapus Program?"
        description={`Apakah Anda yakin ingin menghapus "${deleteTarget?.title}"? Tindakan ini tidak bisa dibatalkan.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

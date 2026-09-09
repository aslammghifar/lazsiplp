"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { programs as initialPrograms, KATEGORI_PROGRAM_LABEL, type KategoriProgram } from "@/lib/dummy-data";
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

type KategoriFilter = "semua" | KategoriProgram;
const PAGE_SIZE = 8;

const KATEGORI_BADGE: Record<KategoriProgram, string> = {
  umum: "bg-primary-50 text-primary-700",
  pendidikan: "bg-secondary-50 text-secondary-700",
};

export default function AdminProgramPage() {
  const { showToast } = useToast();
  const router = useRouter();
  const [items, setItems] = useState(initialPrograms);
  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState<KategoriFilter>("semua");
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
    if (kategori !== "semua") result = result.filter((p) => p.kategori === kategori);
    return result;
  }, [items, search, kategori]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <AdminPageHeader
        title="Program"
        description={`${items.length} program — Program Pemberdayaan & Divisi Pendidikan (SARSIP dikelola lewat modul Berita).`}
        action={
          <Link
            href="/admin/program/baru"
            className="inline-flex items-center gap-2 rounded-full bg-primary-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-800"
          >
            + Tambah Program
          </Link>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <SearchInput value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Cari judul program..." />
        <div className="flex gap-2">
          {(["semua", "umum", "pendidikan"] as KategoriFilter[]).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => { setKategori(k); setPage(1); }}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                kategori === k ? "border-primary-900 bg-primary-900 text-white" : "border-primary-200 bg-white text-primary-800 hover:border-primary-400"
              }`}
            >
              {k === "semua" ? "Semua" : KATEGORI_PROGRAM_LABEL[k]}
            </button>
          ))}
        </div>
        <div className="ml-auto">
          <ViewModeToggle mode={view} onChange={setView} />
        </div>
      </div>

      {paged.length === 0 ? (
        <div className="rounded-2xl border border-primary-100 bg-white">
          <EmptyState message="Belum ada program. Klik tombol di atas untuk menambah." />
        </div>
      ) : view === "list" ? (
        <div className="overflow-hidden rounded-2xl border border-primary-100 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] text-left text-sm">
              <thead>
                <tr className="border-b border-primary-100 text-xs uppercase tracking-wide text-primary-800/50">
                  <th className="px-4 py-3 font-semibold">Thumbnail</th>
                  <th className="px-4 py-3 font-semibold">Judul</th>
                  <th className="px-4 py-3 font-semibold">Kategori</th>
                  <th className="px-4 py-3 font-semibold">Tipe Konten</th>
                  <th className="px-4 py-3 font-semibold">Pendaftaran</th>
                  <th className="px-4 py-3 font-semibold">Pinned</th>
                  <th className="px-4 py-3 text-right font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary-50">
                {paged.map((item) => {
                  const applicantCount = getApplicantsByProgram(item.id).length;
                  return (
                    <tr key={item.id}>
                      <td className="px-4 py-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.imageUrl} alt="" className="h-12 w-16 rounded-lg object-cover" />
                      </td>
                      <td className="max-w-xs px-4 py-3">
                        <p className="truncate font-medium text-primary-900">{item.title}</p>
                        {item.tipeKonten === "pendaftaran" && applicantCount > 0 && (
                          <Link href={`/admin/program/${item.id}/pendaftar`} className="text-xs font-semibold text-primary-700 hover:underline">
                            {applicantCount} pendaftar &rarr;
                          </Link>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${KATEGORI_BADGE[item.kategori]}`}>
                          {KATEGORI_PROGRAM_LABEL[item.kategori]}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${
                            item.tipeKonten === "pendaftaran" ? "bg-secondary-50 text-secondary-700" : "bg-primary-900/5 text-primary-900/60"
                          }`}
                        >
                          {item.tipeKonten === "pendaftaran" ? "Pendaftaran" : "Berita"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {item.tipeKonten === "pendaftaran" ? (
                          <Toggle checked={item.pendaftaranDibuka} onChange={() => togglePendaftaran(item.id)} label="Pendaftaran dibuka" />
                        ) : (
                          <span className="text-xs text-primary-800/40">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <Toggle checked={item.isPinned} onChange={() => togglePinned(item.id)} label="Pinned" />
                      </td>
                      <td className="px-4 py-3">
                        <RowActions
                          onEdit={() => router.push(`/admin/program/${item.id}`)}
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
          {paged.map((item) => (
            <div key={item.id} className="flex gap-4 rounded-2xl border border-primary-100 bg-white p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.imageUrl} alt="" className="h-20 w-28 shrink-0 rounded-xl object-cover" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold text-primary-900">{item.title}</h3>
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${KATEGORI_BADGE[item.kategori]}`}>
                    {KATEGORI_PROGRAM_LABEL[item.kategori]}
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-primary-800/65">{item.description}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2">
                {item.tipeKonten === "pendaftaran" && (
                  <Toggle checked={item.pendaftaranDibuka} onChange={() => togglePendaftaran(item.id)} label="Pendaftaran dibuka" />
                )}
                <Toggle checked={item.isPinned} onChange={() => togglePinned(item.id)} label="Pinned" />
                <RowActions
                  onEdit={() => router.push(`/admin/program/${item.id}`)}
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
        title="Hapus Program?"
        description={`Apakah Anda yakin ingin menghapus "${deleteTarget?.title}"? Tindakan ini tidak bisa dibatalkan.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { adminBeneficiaries as initialBeneficiaries } from "@/lib/admin-dummy-data";
import { TIPE_BANTUAN_LABEL, type TipeBantuan } from "@/lib/dummy-data";
import { formatRupiah } from "@/lib/format";
import { useToast } from "@/components/ui/Toast";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { RowActions } from "@/components/admin/RowActions";
import { SearchInput } from "@/components/admin/SearchInput";
import { Pagination } from "@/components/admin/Pagination";
import { EmptyState } from "@/components/admin/EmptyState";
import { ConfirmModal } from "@/components/admin/ConfirmModal";

type TipeFilter = "semua" | TipeBantuan;
const PAGE_SIZE = 8;

export default function AdminPenerimaManfaatPage() {
  const { showToast } = useToast();
  const router = useRouter();
  const [items, setItems] = useState(initialBeneficiaries);
  const [search, setSearch] = useState("");
  const [tipe, setTipe] = useState<TipeFilter>("semua");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; nama: string } | null>(null);

  function confirmDelete() {
    if (!deleteTarget) return;
    setItems((prev) => prev.filter((b) => b.id !== deleteTarget.id));
    showToast(`Data "${deleteTarget.nama}" dihapus (belum tersimpan permanen).`, "error");
    setDeleteTarget(null);
  }

  const filtered = useMemo(() => {
    let result = items.filter((b) => b.nama.toLowerCase().includes(search.toLowerCase()));
    if (tipe !== "semua") result = result.filter((b) => b.tipeBantuan === tipe);
    return result;
  }, [items, search, tipe]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <AdminPageHeader
        title="Penerima Manfaat"
        description={`${items.length} penerima manfaat — kolom alamat/tgl lahir/status nikah bersifat admin-only, tidak pernah dikirim ke publik.`}
        action={
          <Link
            href="/admin/penerima-manfaat/baru"
            className="inline-flex items-center gap-2 rounded-full bg-primary-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-800"
          >
            + Tambah Data
          </Link>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <SearchInput value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Cari nama..." />
        <div className="flex flex-wrap gap-2">
          {(["semua", ...Object.keys(TIPE_BANTUAN_LABEL)] as TipeFilter[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => { setTipe(t); setPage(1); }}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                tipe === t ? "border-primary-900 bg-primary-900 text-white" : "border-primary-200 bg-white text-primary-800 hover:border-primary-400"
              }`}
            >
              {t === "semua" ? "Semua" : TIPE_BANTUAN_LABEL[t as TipeBantuan]}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-primary-100 bg-white">
        {paged.length === 0 ? (
          <EmptyState message="Belum ada data penerima manfaat. Klik tombol di atas untuk menambah." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="border-b border-primary-100 text-xs uppercase tracking-wide text-primary-800/50">
                  <th className="px-4 py-3 font-semibold">Foto</th>
                  <th className="px-4 py-3 font-semibold">Nama</th>
                  <th className="px-4 py-3 font-semibold">Tipe Bantuan</th>
                  <th className="px-4 py-3 font-semibold">Nominal Diterima</th>
                  <th className="px-4 py-3 font-semibold">Verifikator</th>
                  <th className="px-4 py-3 text-right font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary-50">
                {paged.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.imageUrl} alt="" className="h-11 w-11 rounded-full object-cover" />
                    </td>
                    <td className="px-4 py-3 font-medium text-primary-900">{item.nama}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary-700">
                        {TIPE_BANTUAN_LABEL[item.tipeBantuan]}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-primary-900">{formatRupiah(item.nominalDiterima)}</td>
                    <td className="px-4 py-3 text-primary-800/70">
                      {item.namaVerifikator}
                      <span className="block text-xs text-primary-800/50">{item.daerahCakupanVerifikator}</span>
                    </td>
                    <td className="px-4 py-3">
                      <RowActions
                        onEdit={() => router.push(`/admin/penerima-manfaat/${item.id}`)}
                        onDelete={() => setDeleteTarget({ id: item.id, nama: item.nama })}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </div>

      <ConfirmModal
        open={!!deleteTarget}
        title="Hapus Data Penerima Manfaat?"
        description={`Apakah Anda yakin ingin menghapus data "${deleteTarget?.nama}"? Tindakan ini tidak bisa dibatalkan.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

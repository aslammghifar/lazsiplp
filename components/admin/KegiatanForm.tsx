"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Activity } from "@/lib/dummy-data";
import { useToast } from "@/components/ui/Toast";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { Toggle } from "@/components/admin/Toggle";

export function KegiatanForm({ initial }: { initial?: Activity }) {
  const router = useRouter();
  const { showToast } = useToast();
  const isEdit = !!initial;

  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [tanggal, setTanggal] = useState(initial?.tanggal ?? new Date().toISOString().slice(0, 10));
  const [lokasi, setLokasi] = useState(initial?.lokasi ?? "");
  const [isPinned, setIsPinned] = useState(initial?.isPinned ?? false);
  const [, setImage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !lokasi.trim()) {
      showToast("Judul dan lokasi wajib diisi.", "error");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      showToast(`Kegiatan "${title}" ${isEdit ? "diperbarui" : "ditambahkan"} (simulasi — belum tersimpan permanen).`);
      router.push("/admin/kegiatan");
    }, 500);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="flex flex-col gap-5 rounded-3xl border border-primary-100 bg-white p-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-primary-900">Judul Kegiatan</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Judul kegiatan"
              className="rounded-full border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-primary-900">Deskripsi</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              placeholder="Deskripsi kegiatan"
              className="rounded-2xl border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>

          <ImageUploadField label="Foto Kegiatan" initialPreview={initial?.imageUrl} onChange={setImage} />
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-4 rounded-3xl border border-primary-100 bg-white p-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-primary-900">Tanggal Kegiatan</label>
              <input
                type="date"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                className="rounded-full border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-primary-900">Lokasi</label>
              <input
                value={lokasi}
                onChange={(e) => setLokasi(e.target.value)}
                placeholder="Lokasi kegiatan"
                className="rounded-full border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
              />
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-primary-100 bg-primary-50/60 p-4">
              <span className="text-sm font-medium text-primary-900">Pin di landing page</span>
              <Toggle checked={isPinned} onChange={setIsPinned} label="Pin" />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center rounded-full bg-primary-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Tambah Kegiatan"}
          </button>
        </div>
      </div>
    </form>
  );
}

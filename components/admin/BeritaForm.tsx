"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { NewsItem } from "@/lib/dummy-data";
import { useToast } from "@/components/ui/Toast";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { Toggle } from "@/components/admin/Toggle";

export function BeritaForm({ initial }: { initial?: NewsItem }) {
  const router = useRouter();
  const { showToast } = useToast();
  const isEdit = !!initial;

  const [title, setTitle] = useState(initial?.title ?? "");
  const [kategori, setKategori] = useState<"umum" | "sarsip">(initial?.kategori ?? "umum");
  const [publishedAt, setPublishedAt] = useState(initial?.publishedAt ?? new Date().toISOString().slice(0, 10));
  const [content, setContent] = useState(initial?.content.join("<br/><br/>") ?? "");
  const [status, setStatus] = useState<"published" | "draft">(initial?.status ?? "draft");
  const [isPinned, setIsPinned] = useState(initial?.isPinned ?? false);
  const [, setImage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      showToast("Judul wajib diisi.", "error");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      showToast(`Berita "${title}" ${isEdit ? "diperbarui" : "ditambahkan"} (simulasi — belum tersimpan permanen).`);
      router.push("/admin/berita");
    }, 500);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="flex flex-col gap-5 rounded-3xl border border-primary-100 bg-white p-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-primary-900">Judul</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Judul berita"
              className="rounded-full border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-primary-900">Isi Berita</label>
            <RichTextEditor value={content} onChange={setContent} placeholder="Tulis isi berita di sini..." />
          </div>

          <ImageUploadField label="Gambar Utama" initialPreview={initial?.imageUrl} onChange={setImage} />
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-4 rounded-3xl border border-primary-100 bg-white p-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-primary-900">Kategori</label>
              <select
                value={kategori}
                onChange={(e) => setKategori(e.target.value as "umum" | "sarsip")}
                className="rounded-full border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
              >
                <option value="umum">Berita &amp; Kabar</option>
                <option value="sarsip">SARSIP</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-primary-900">Tanggal Publish</label>
              <input
                type="date"
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
                className="rounded-full border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
              />
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-primary-100 bg-primary-50/60 p-4">
              <span className="text-sm font-medium text-primary-900">
                Status: {status === "published" ? "Published" : "Draft"}
              </span>
              <Toggle checked={status === "published"} onChange={(v) => setStatus(v ? "published" : "draft")} label="Status publish" />
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-primary-100 bg-primary-50/60 p-4">
              <span className="text-sm font-medium text-primary-900">Pin di landing page</span>
              <Toggle checked={isPinned} onChange={setIsPinned} label="Pin" />
            </div>
            <p className="text-xs text-primary-800/50">
              Maksimal 3 berita pinned sekaligus — kalau sudah penuh, lepas salah satu dulu dari halaman list.
            </p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center rounded-full bg-primary-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Tambah Berita"}
          </button>
        </div>
      </div>
    </form>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Program, KategoriProgram } from "@/lib/dummy-data";
import { useToast } from "@/components/ui/Toast";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { Toggle } from "@/components/admin/Toggle";

export function ProgramForm({ initial }: { initial?: Program }) {
  const router = useRouter();
  const { showToast } = useToast();
  const isEdit = !!initial;

  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [kategori, setKategori] = useState<KategoriProgram>(initial?.kategori ?? "umum");
  const [tipeKonten, setTipeKonten] = useState<"pendaftaran" | "berita">(initial?.tipeKonten ?? "pendaftaran");
  const [syaratText, setSyaratText] = useState(
    initial && initial.tipeKonten === "pendaftaran" ? initial.syarat.join("\n") : ""
  );
  const [pendaftaranDibuka, setPendaftaranDibuka] = useState(
    initial && initial.tipeKonten === "pendaftaran" ? initial.pendaftaranDibuka : true
  );
  const [formUrl, setFormUrl] = useState(
    initial && initial.tipeKonten === "pendaftaran" ? initial.formUrl : ""
  );
  const [isPinned, setIsPinned] = useState(initial?.isPinned ?? false);
  const [, setImage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      showToast("Judul wajib diisi.", "error");
      return;
    }
    if (tipeKonten === "pendaftaran" && !formUrl.trim()) {
      showToast("Link Google Form pendaftaran wajib diisi.", "error");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      showToast(`Program "${title}" ${isEdit ? "diperbarui" : "ditambahkan"} (simulasi — belum tersimpan permanen).`);
      router.push("/admin/program");
    }, 500);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="flex flex-col gap-5 rounded-3xl border border-primary-100 bg-white p-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-primary-900">Judul Program</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Judul program"
              className="rounded-full border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-primary-900">Deskripsi</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Deskripsi program"
              className="rounded-2xl border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>

          {tipeKonten === "pendaftaran" && (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-primary-900">Syarat Pendaftaran (satu poin per baris)</label>
              <textarea
                value={syaratText}
                onChange={(e) => setSyaratText(e.target.value)}
                rows={4}
                placeholder={"KTP domisili wilayah dampingan\nMemiliki usaha berjalan minimal 3 bulan"}
                className="rounded-2xl border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
              />
            </div>
          )}

          <ImageUploadField label="Foto Program" initialPreview={initial?.imageUrl} onChange={setImage} />
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-4 rounded-3xl border border-primary-100 bg-white p-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-primary-900">Kategori</label>
              <select
                value={kategori}
                onChange={(e) => setKategori(e.target.value as KategoriProgram)}
                className="rounded-full border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
              >
                <option value="umum">Program Pemberdayaan (Umum)</option>
                <option value="pendidikan">Divisi Pendidikan</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-primary-900">Tipe Konten</label>
              <select
                value={tipeKonten}
                onChange={(e) => setTipeKonten(e.target.value as "pendaftaran" | "berita")}
                className="rounded-full border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
              >
                <option value="pendaftaran">Pendaftaran (ada form daftar)</option>
                <option value="berita">Berita (info saja, tanpa daftar)</option>
              </select>
            </div>

            {tipeKonten === "pendaftaran" && (
              <>
                <div className="flex items-center justify-between rounded-2xl border border-primary-100 bg-primary-50/60 p-4">
                  <span className="text-sm font-medium text-primary-900">Pendaftaran Dibuka</span>
                  <Toggle checked={pendaftaranDibuka} onChange={setPendaftaranDibuka} label="Pendaftaran dibuka" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-primary-900">Link Google Form Pendaftaran</label>
                  <input
                    type="url"
                    value={formUrl}
                    onChange={(e) => setFormUrl(e.target.value)}
                    placeholder="https://forms.gle/..."
                    className="rounded-full border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
                  />
                  <p className="text-xs text-primary-800/50">
                    Tombol &quot;Daftar Sekarang&quot; di halaman publik langsung membuka link ini di tab baru.
                  </p>
                </div>
              </>
            )}

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
            {submitting ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Tambah Program"}
          </button>
        </div>
      </div>
    </form>
  );
}

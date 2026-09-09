"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { campaigns, type Campaign } from "@/lib/dummy-data";
import { useToast } from "@/components/ui/Toast";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { Toggle } from "@/components/admin/Toggle";

function generateKodeUnik(title: string) {
  const slug = title
    .toUpperCase()
    .replace(/[^A-Z0-9\s]/g, "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .join("-");
  const suffix = String(Math.floor(Math.random() * 90) + 10);
  return `${slug || "CAMPAIGN"}-${suffix}`;
}

export function CampaignForm({ initial }: { initial?: Campaign }) {
  const router = useRouter();
  const { showToast } = useToast();
  const isEdit = !!initial;

  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.content.join("<br/><br/>") ?? "");
  const [target, setTarget] = useState(initial?.target ? String(initial.target) : "");
  const [kodeUnik, setKodeUnik] = useState(initial?.kodeUnik ?? "");
  const [kodeError, setKodeError] = useState<string | null>(null);
  const [status, setStatus] = useState<Campaign["status"]>(initial?.status ?? "aktif");
  const [isPinned, setIsPinned] = useState(initial?.isPinned ?? false);
  const [, setImage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function handleGenerateKode() {
    setKodeUnik(generateKodeUnik(title || "campaign"));
    setKodeError(null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      showToast("Judul wajib diisi.", "error");
      return;
    }
    const kode = kodeUnik.trim() || generateKodeUnik(title);
    const isDuplicate = campaigns.some((c) => c.kodeUnik === kode && c.id !== initial?.id);
    if (isDuplicate) {
      setKodeError("Kode unik sudah dipakai campaign lain — gunakan kode lain.");
      return;
    }
    setKodeError(null);
    setSubmitting(true);
    setTimeout(() => {
      showToast(`Campaign "${title}" ${isEdit ? "diperbarui" : "ditambahkan"} (simulasi — belum tersimpan permanen).`);
      router.push("/admin/donasi");
    }, 500);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="flex flex-col gap-5 rounded-3xl border border-primary-100 bg-white p-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-primary-900">Judul Campaign</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Judul campaign"
              className="rounded-full border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-primary-900">Deskripsi</label>
            <RichTextEditor value={description} onChange={setDescription} placeholder="Tulis deskripsi campaign..." />
          </div>

          <ImageUploadField label="Foto Campaign" initialPreview={initial?.imageUrl} onChange={setImage} />
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-4 rounded-3xl border border-primary-100 bg-white p-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-primary-900">Target Nominal (opsional)</label>
              <input
                inputMode="numeric"
                value={target}
                onChange={(e) => setTarget(e.target.value.replace(/[^0-9]/g, ""))}
                placeholder="Kosongkan jika tanpa target"
                className="rounded-full border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-primary-900">Kode Unik</label>
              <div className="flex gap-2">
                <input
                  value={kodeUnik}
                  onChange={(e) => { setKodeUnik(e.target.value.toUpperCase()); setKodeError(null); }}
                  placeholder="Auto-generate atau isi manual"
                  className="flex-1 rounded-full border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
                />
                <button
                  type="button"
                  onClick={handleGenerateKode}
                  className="shrink-0 rounded-full border border-primary-200 px-4 py-2.5 text-xs font-semibold text-primary-800 transition-colors hover:border-primary-400"
                >
                  Generate
                </button>
              </div>
              {kodeError && <p className="text-xs text-red-600">{kodeError}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-primary-900">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Campaign["status"])}
                className="rounded-full border border-primary-200 bg-white px-4 py-2.5 text-sm capitalize text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
              >
                <option value="aktif">Aktif</option>
                <option value="selesai">Selesai</option>
                <option value="nonaktif">Nonaktif</option>
              </select>
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
            {submitting ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Tambah Campaign"}
          </button>
        </div>
      </div>
    </form>
  );
}

"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { useToast } from "@/components/ui/Toast";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

export default function AdminKontenUmumPage() {
  const { showToast } = useToast();

  // Semua field di-seed dari siteConfig (satu sumber yang sama dengan landing page) — "Simpan"
  // di sini simulasi saja (toast), belum menulis balik ke file/DB. Lihat CLAUDE.md: fokus tampilan dulu.
  const [heroHeadline, setHeroHeadline] = useState(siteConfig.hero.headline);
  const [heroSubheadline, setHeroSubheadline] = useState(siteConfig.hero.subheadline);
  const [ctaPrimary, setCtaPrimary] = useState(siteConfig.hero.ctaPrimaryLabel);
  const [ctaSecondary, setCtaSecondary] = useState(siteConfig.hero.ctaSecondaryLabel);
  const [heroImage, setHeroImage] = useState<string | null>(null);

  const [ringkas, setRingkas] = useState(siteConfig.tentang.ringkasDescription);
  const [visiHtml, setVisiHtml] = useState(siteConfig.tentang.visi);
  const [misiText, setMisiText] = useState(siteConfig.tentang.misi.join("\n"));

  const [legalitas, setLegalitas] = useState(siteConfig.legalitasDetail);

  function updateLegalitas(key: keyof typeof legalitas, value: string) {
    setLegalitas((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave(section: string) {
    showToast(`Perubahan "${section}" tersimpan (simulasi — belum ditulis ke server).`);
  }

  return (
    <div className="flex flex-col gap-8">
      <AdminPageHeader
        title="Kelola Konten Umum"
        description="Pengaturan konten statis Hero & Tentang Kami — bukan tabel CRUD, tapi satu record yang diedit langsung."
      />

      {/* Section Hero */}
      <div className="rounded-3xl border border-primary-100 bg-white p-6">
        <h3 className="text-base font-bold text-primary-900">Section Hero</h3>
        <p className="mt-1 text-sm text-primary-800/55">Tampil paling atas di landing page.</p>

        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-primary-900">Headline Utama</label>
              <input
                value={heroHeadline}
                onChange={(e) => setHeroHeadline(e.target.value)}
                className="rounded-full border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-primary-900">Sub-headline</label>
              <textarea
                value={heroSubheadline}
                onChange={(e) => setHeroSubheadline(e.target.value)}
                rows={3}
                className="rounded-2xl border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-primary-900">Teks Tombol CTA Utama</label>
                <input
                  value={ctaPrimary}
                  onChange={(e) => setCtaPrimary(e.target.value)}
                  className="rounded-full border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-primary-900">Teks Tombol CTA Sekunder</label>
                <input
                  value={ctaSecondary}
                  onChange={(e) => setCtaSecondary(e.target.value)}
                  className="rounded-full border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
                />
              </div>
            </div>
            <ImageUploadField label="Gambar/Ilustrasi Hero (opsional)" onChange={setHeroImage} />
          </div>

          {/* Preview singkat */}
          <div className="rounded-2xl bg-primary-900 p-5 text-white">
            <p className="text-[10px] font-bold uppercase tracking-wide text-secondary-200">Preview</p>
            <p className="mt-3 text-lg font-extrabold leading-tight">{heroHeadline}</p>
            <p className="mt-2 text-xs leading-relaxed text-secondary-200">{heroSubheadline}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-primary-900">{ctaPrimary}</span>
              <span className="rounded-full border border-white/30 px-3 py-1.5 text-xs font-semibold text-white">{ctaSecondary}</span>
            </div>
            {heroImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={heroImage} alt="Preview hero" className="mt-4 h-24 w-full rounded-xl object-cover" />
            )}
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={() => handleSave("Hero")}
            className="rounded-full bg-primary-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-800"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>

      {/* Section Tentang Kami */}
      <div className="rounded-3xl border border-primary-100 bg-white p-6">
        <h3 className="text-base font-bold text-primary-900">Section Tentang Kami</h3>
        <p className="mt-1 text-sm text-primary-800/55">
          Dipakai untuk ringkasan di landing page dan versi lengkap di halaman /tentang.
        </p>

        <div className="mt-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-primary-900">Deskripsi Ringkas (landing page)</label>
            <textarea
              value={ringkas}
              onChange={(e) => setRingkas(e.target.value)}
              rows={2}
              className="rounded-2xl border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-primary-900">Visi (halaman lengkap)</label>
            <RichTextEditor value={visiHtml} onChange={setVisiHtml} placeholder="Tulis visi lembaga..." />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-primary-900">Misi (satu poin per baris)</label>
            <textarea
              value={misiText}
              onChange={(e) => setMisiText(e.target.value)}
              rows={4}
              className="rounded-2xl border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={() => handleSave("Tentang Kami")}
            className="rounded-full bg-primary-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-800"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>

      {/* Section Legalitas */}
      <div className="rounded-3xl border border-primary-100 bg-white p-6">
        <h3 className="text-base font-bold text-primary-900">Data Legalitas</h3>
        <p className="mt-1 text-sm text-primary-800/55">
          Ditampilkan di section Tentang Kami, halaman /tentang, dan footer.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {(
            [
              ["aktaNotaris", "Nomor Akta Notaris"],
              ["izinDinsos", "Nomor Izin Dinas Sosial"],
              ["izinKemenkumham", "Status Kemenkumham"],
              ["izinBaznas", "Status Kemitraan BAZNAS"],
              ["izinKemenag", "Status Kementerian Agama"],
            ] as [keyof typeof legalitas, string][]
          ).map(([key, label]) => (
            <div key={key} className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-primary-900">{label}</label>
              <input
                value={legalitas[key]}
                onChange={(e) => updateLegalitas(key, e.target.value)}
                className="rounded-full border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
              />
            </div>
          ))}
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={() => handleSave("Legalitas")}
            className="rounded-full bg-primary-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-800"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}

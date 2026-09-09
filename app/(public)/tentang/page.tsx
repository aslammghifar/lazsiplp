import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { lembagaStats, wilayahCakupanVerifikator, strukturOrganisasi } from "@/lib/dummy-data";
import { formatNumber } from "@/lib/format";
import { BackLink } from "@/components/ui/BackLink";
import { StatCounter } from "@/components/ui/StatCounter";

export const metadata: Metadata = {
  title: "Tentang Kami — LAZSIP",
  description:
    "Visi, misi, struktur organisasi, legalitas, dan wilayah cakupan verifikator LAZSIP.",
};

function initials(nama: string): string {
  return nama
    .replace(/^(H\.|Hj\.)\s*/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function TentangPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32">
      <BackLink href="/#tentang">Kembali ke Beranda</BackLink>

      <span className="mb-4 mt-6 inline-flex items-center rounded-full bg-primary-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-primary-800">
        Tentang Kami
      </span>
      <h1 className="text-balance text-[2rem] font-extrabold leading-[1.15] tracking-tight text-primary-900 sm:text-5xl">
        Mengenal {siteConfig.name} Lebih Dekat
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-secondary-700 sm:text-lg">
        {siteConfig.tentang.ringkasDescription}
      </p>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <StatCounter icon="calendar" value={`${siteConfig.foundedYear}`} label="Berdiri sejak" />
        <StatCounter
          icon="verifikator"
          value={formatNumber(lembagaStats.totalVerifikator)}
          label="Verifikator lapangan terlatih"
        />
        <StatCounter
          icon="mitra"
          value={`${formatNumber(lembagaStats.totalMitra)}+`}
          label="Mitra kerja sama"
        />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="rounded-2xl border border-primary-100 bg-white p-6">
          <h2 className="text-lg font-bold text-primary-900">Visi</h2>
          <p className="mt-3 text-sm leading-relaxed text-primary-800/70">{siteConfig.tentang.visi}</p>
        </div>
        <div className="rounded-2xl border border-primary-100 bg-white p-6">
          <h2 className="text-lg font-bold text-primary-900">Misi</h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-primary-800/70">
            {siteConfig.tentang.misi.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-xl font-extrabold tracking-tight text-primary-900 sm:text-2xl">
          Struktur Organisasi
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-primary-800/60">
          Pengurus inti yang menjalankan roda operasional dan pengawasan pengelolaan dana umat.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {strukturOrganisasi.map((p) => (
            <div
              key={p.nama}
              className="flex flex-col items-center gap-3 rounded-2xl border border-primary-100 bg-white p-5 text-center"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-900 text-base font-bold text-white">
                {initials(p.nama)}
              </span>
              <div>
                <p className="text-sm font-bold text-primary-900">{p.nama}</p>
                <p className="mt-0.5 text-xs text-primary-800/55">{p.jabatan}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-primary-100 bg-primary-50/60 p-6">
          <h2 className="text-lg font-bold text-primary-900">Legalitas</h2>
          <ul className="mt-4 flex flex-col gap-3">
            {siteConfig.legalitas.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-primary-800/80">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="mt-0.5 h-4 w-4 shrink-0 text-primary-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-primary-100 bg-white p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold text-primary-900">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5 text-primary-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10zM12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
            </svg>
            Wilayah Cakupan Verifikator
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-primary-800/70">
            Tim verifikator lapangan kami menjangkau {wilayahCakupanVerifikator.length} kecamatan
            dampingan berikut untuk memvalidasi calon penerima manfaat secara langsung.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {wilayahCakupanVerifikator.map((wilayah) => (
              <span
                key={wilayah}
                className="rounded-full border border-primary-100 bg-primary-50/60 px-3.5 py-1.5 text-xs font-medium text-primary-800/80"
              >
                {wilayah}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

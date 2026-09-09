import { siteConfig } from "@/lib/site-config";
import { lembagaStats, wilayahCakupanVerifikator } from "@/lib/dummy-data";
import { formatNumber } from "@/lib/format";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatCounter } from "@/components/ui/StatCounter";
import { Button } from "@/components/ui/Button";

export function Tentang() {
  return (
    <section id="tentang" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
      <SectionHeading
        eyebrow="Tentang Kami"
        title={`Mengenal ${siteConfig.name} Lebih Dekat`}
        description={siteConfig.tentang.ringkasDescription}
      />

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
        <div className="flex flex-col justify-between gap-5">
          <StatCounter
            icon="calendar"
            value={`${siteConfig.foundedYear}`}
            label="Berdiri sejak"
            className="border border-primary-100"
          />
          <StatCounter
            icon="verifikator"
            value={formatNumber(lembagaStats.totalVerifikator)}
            label="Verifikator lapangan terlatih"
            className="border border-primary-100"
          />
          <StatCounter
            icon="mitra"
            value={`${formatNumber(lembagaStats.totalMitra)}+`}
            label="Mitra kerja sama"
            className="border border-primary-100"
          />
        </div>

        <div className="flex flex-col gap-5">
          <div className="rounded-2xl border border-primary-100 bg-white p-5">
            <h3 className="text-base font-semibold text-primary-900">Visi</h3>
            <p className="mt-2 text-sm leading-relaxed text-primary-800/70">{siteConfig.tentang.visi}</p>
          </div>
          <div className="rounded-2xl border border-primary-100 bg-white p-5">
            <h3 className="text-base font-semibold text-primary-900">Misi</h3>
            <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-primary-800/70">
              {siteConfig.tentang.misi.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-primary-100 bg-primary-50/60 p-5">
            <h3 className="text-base font-semibold text-primary-900">Legalitas</h3>
            <ul className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
              {siteConfig.legalitas.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-primary-800/75">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="mt-0.5 h-4 w-4 shrink-0 text-primary-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-primary-100 bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="flex items-center gap-2 text-base font-semibold text-primary-900">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4.5 w-4.5 text-primary-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10zM12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
            </svg>
            Wilayah Cakupan Verifikator
          </h3>
          <Button href="/tentang" variant="secondary" icon="arrow" className="px-4 py-2 text-xs">
            Struktur Organisasi &amp; Legalitas Lengkap
          </Button>
        </div>
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
    </section>
  );
}

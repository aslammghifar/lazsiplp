import { siteConfig } from "@/lib/site-config";
import { transparencyStats } from "@/lib/dummy-data";
import { formatRupiah, formatNumber } from "@/lib/format";
import { HeroCtaButtons } from "@/components/sections/HeroCtaButtons";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary-900">
      {/* satu aksen cahaya lembut, tidak berlapis */}
      <div
        className="pointer-events-none absolute right-[-15%] top-[-10%] h-[32rem] w-[32rem] rounded-full bg-secondary-500/[0.14] blur-[130px]"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-4 pb-24 pt-36 sm:px-6 sm:pt-44 sm:pb-28 lg:grid-cols-[1fr_0.85fr] lg:gap-12 lg:py-40">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-secondary-200">
            Lembaga Amil Zakat Resmi
          </span>

          <h1 className="mt-6 max-w-xl text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-[4rem]">
            {siteConfig.hero.headline}
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-secondary-200 sm:text-lg">
            {siteConfig.hero.subheadline}
          </p>

          <HeroCtaButtons />
        </div>

        <div className="w-full max-w-sm justify-self-center lg:max-w-none lg:justify-self-end">
          <div className="rounded-3xl bg-white p-7 shadow-[0_25px_70px_-20px_rgba(0,0,0,0.45)] sm:p-8">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4.5 w-4.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M7 7l5-4 5 4M6 12h12M6 17h12" />
              </svg>
            </span>
            <p className="mt-4 text-xs font-bold uppercase tracking-wide text-secondary-600">
              Transparansi Real-time
            </p>
            <p className="mt-3 text-3xl font-extrabold tracking-tight text-primary-900 sm:text-[2.25rem]">
              {formatRupiah(transparencyStats.totalCollected)}
            </p>
            <p className="text-sm text-primary-800/55">total dana tersalurkan tahun ini</p>

            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-primary-100 pt-6">
              <div>
                <p className="text-xl font-extrabold text-primary-900">
                  {formatNumber(transparencyStats.totalDonors)}
                </p>
                <p className="text-xs text-primary-800/50">Donatur &amp; muzakki</p>
              </div>
              <div>
                <p className="text-xl font-extrabold text-primary-900">
                  {formatNumber(transparencyStats.totalBeneficiaries)}
                </p>
                <p className="text-xs text-primary-800/50">Penerima manfaat</p>
              </div>
            </div>

            <p className="mt-6 border-t border-primary-100 pt-4 text-xs text-primary-800/45">
              Terdaftar &amp; diawasi <span className="font-medium text-primary-700">BAZNAS · Kemenag RI</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

import { siteConfig } from "@/lib/site-config";
import { HeroCtaButtons } from "@/components/sections/HeroCtaButtons";
import { HeroCekStatus } from "@/components/sections/HeroCekStatus";

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
            <HeroCekStatus />
          </div>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { campaigns, getOtherCampaigns } from "@/lib/dummy-data";
import { formatRupiah, formatNumber } from "@/lib/format";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { BackLink } from "@/components/ui/BackLink";
import { CampaignCard } from "@/components/cards/CampaignCard";
import { DonationForm } from "@/components/sections/DonationForm";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return campaigns.filter((item) => item.status !== "nonaktif").map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = campaigns.find((c) => c.slug === slug);
  if (!item) return {};
  return { title: `${item.title} — LAZSIP`, description: item.description };
}

export default async function DonasiDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = campaigns.find((c) => c.slug === slug);
  if (!item || item.status === "nonaktif") notFound();

  const percent = item.target ? (item.collected / item.target) * 100 : 0;
  const otherCampaigns = getOtherCampaigns(item);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <article>
          <BackLink href="/donasi">Semua Donasi</BackLink>

          <span className="mb-4 mt-6 inline-flex items-center rounded-full bg-primary-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-primary-800">
            {item.kategoriLabel}
          </span>

          <h1 className="text-balance text-[2rem] font-extrabold leading-[1.15] tracking-tight text-primary-900 sm:text-4xl">
            {item.title}
          </h1>

          <p className="mt-4 flex items-center gap-1.5 text-sm font-medium text-primary-800/55">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10zM12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
            </svg>
            {item.lokasi}
          </p>

          <ImagePlaceholder
            variant="campaign"
            src={item.imageUrl}
            alt={item.title}
            className="mt-8 aspect-[16/9] w-full rounded-3xl"
          />

          <div className="mt-8 rounded-2xl border border-primary-100 bg-primary-50/60 p-6">
            {item.target ? (
              <>
                <ProgressBar percent={percent} />
                <div className="mt-3 flex items-center justify-between text-sm text-primary-800/70">
                  <span className="text-base font-bold text-primary-800">
                    {formatRupiah(item.collected)}
                  </span>
                  <span>dari {formatRupiah(item.target)}</span>
                </div>
              </>
            ) : (
              <p className="text-base font-bold text-primary-800">
                Terkumpul {formatRupiah(item.collected)}
              </p>
            )}
            <p className="mt-3 flex items-center gap-1.5 text-xs text-primary-800/55">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2 20c0-3 2.7-5.5 7-5.5s7 2.5 7 5.5M14.5 14.8c3.5.3 5.5 2.6 5.5 5.2" />
              </svg>
              {formatNumber(item.donaturCount)} donatur
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-5">
            {item.content.map((paragraph, i) => (
              <p key={i} className="text-base leading-[1.7] text-primary-900/80">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        <div className="lg:pt-6">
          <DonationForm campaign={item} />
        </div>
      </div>

      {otherCampaigns.length > 0 && (
        <div className="mt-16 border-t border-primary-100 pt-12">
          <h2 className="text-xl font-extrabold tracking-tight text-primary-900 sm:text-2xl">
            Campaign Lainnya
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {otherCampaigns.map((c) => (
              <CampaignCard key={c.id} item={c} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

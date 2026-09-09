import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { activities, getOtherActivities } from "@/lib/dummy-data";
import { formatDate } from "@/lib/format";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Button } from "@/components/ui/Button";
import { BackLink } from "@/components/ui/BackLink";
import { ActivityCard } from "@/components/cards/ActivityCard";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return activities.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = activities.find((a) => a.slug === slug);
  if (!item) return {};
  return { title: `${item.title} — LAZSIP`, description: item.description };
}

export default async function KegiatanDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = activities.find((a) => a.slug === slug);
  if (!item) notFound();

  const otherActivities = getOtherActivities(item);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32">
      <article className="mx-auto max-w-3xl">
        <BackLink href="/kegiatan">Semua Kegiatan</BackLink>

        <span className="mb-4 mt-6 inline-flex items-center rounded-full bg-primary-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-primary-800">
          Kegiatan
        </span>

        <h1 className="text-balance text-[2rem] font-extrabold leading-[1.15] tracking-tight text-primary-900 sm:text-5xl">
          {item.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm font-medium text-primary-800/55">
          <span className="flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 3v3M16 3v3M3.5 9h17M5 6h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z" />
            </svg>
            {formatDate(item.tanggal)}
          </span>
          <span className="flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10zM12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
            </svg>
            {item.lokasi}
          </span>
        </div>

        <ImagePlaceholder
          variant="activity"
          src={item.imageUrl}
          alt={item.title}
          className="mt-8 aspect-[16/9] w-full rounded-3xl"
        />

        <div className="mt-8 flex flex-col gap-5">
          {item.content.map((paragraph, i) => (
            <p key={i} className="text-base leading-[1.7] text-primary-900/80 sm:text-lg">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-12 border-t border-primary-100 pt-8">
          <Button href="/kegiatan" variant="secondary">
            Kembali ke Semua Kegiatan
          </Button>
        </div>
      </article>

      {otherActivities.length > 0 && (
        <div className="mt-16 border-t border-primary-100 pt-12">
          <h2 className="text-xl font-extrabold tracking-tight text-primary-900 sm:text-2xl">
            Kegiatan Lainnya
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {otherActivities.map((a) => (
              <ActivityCard key={a.id} item={a} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

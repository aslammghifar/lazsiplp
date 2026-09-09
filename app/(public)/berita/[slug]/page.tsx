import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { newsList, getOtherNews, NEWS_KATEGORI_LABEL } from "@/lib/dummy-data";
import { formatDate } from "@/lib/format";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Button } from "@/components/ui/Button";
import { BackLink } from "@/components/ui/BackLink";
import { NewsCard } from "@/components/cards/NewsCard";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return newsList.filter((item) => item.status === "published").map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = newsList.find((n) => n.slug === slug);
  if (!item) return {};
  return { title: `${item.title} — LAZSIP`, description: item.excerpt };
}

export default async function BeritaDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = newsList.find((n) => n.slug === slug);
  if (!item || item.status !== "published") notFound();

  const otherNews = getOtherNews(item);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32">
      <article className="mx-auto max-w-3xl">
        <BackLink href="/berita">Semua Berita</BackLink>

        <span className="mb-4 mt-6 inline-flex items-center rounded-full bg-primary-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-primary-800">
          {NEWS_KATEGORI_LABEL[item.kategori]}
        </span>

        <h1 className="text-balance text-[2rem] font-extrabold leading-[1.15] tracking-tight text-primary-900 sm:text-5xl">
          {item.title}
        </h1>

        <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-primary-800/55">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 3v3M16 3v3M3.5 9h17M5 6h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z" />
          </svg>
          {formatDate(item.publishedAt)}
          <span aria-hidden>&middot;</span>
          {item.readTimeMinutes} menit baca
        </div>

        <ImagePlaceholder
          variant="news"
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
          <Button href="/berita" variant="secondary">
            Kembali ke Semua Berita
          </Button>
        </div>
      </article>

      {otherNews.length > 0 && (
        <div className="mt-16 border-t border-primary-100 pt-12">
          <h2 className="text-xl font-extrabold tracking-tight text-primary-900 sm:text-2xl">
            Berita Lainnya
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {otherNews.map((n) => (
              <NewsCard key={n.id} item={n} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

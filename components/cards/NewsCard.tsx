import Link from "next/link";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { formatDate } from "@/lib/format";
import { PINNED_OVERLAY_STYLE } from "@/lib/pinned-overlay";
import type { NewsItem } from "@/lib/dummy-data";

export function NewsCard({
  item,
  featured = false,
}: {
  item: NewsItem;
  featured?: boolean;
}) {
  if (featured) {
    return (
      <Link
        href={`/berita/${item.slug}`}
        className="group relative flex aspect-[3/2] w-full flex-col overflow-hidden rounded-[22px]"
      >
        <ImagePlaceholder
          variant="news"
          src={item.imageUrl}
          alt={item.title}
          className="absolute inset-0 h-full w-full"
        />
        <div className="pointer-events-none absolute inset-0" style={PINNED_OVERLAY_STYLE} />
        <div className="relative z-10 mt-auto flex flex-col gap-1.5 p-4 text-white">
          <h3 className="line-clamp-2 text-base font-bold leading-snug">{item.title}</h3>
          <span className="flex items-center gap-1.5 text-xs font-medium text-white/75">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 3v3M16 3v3M3.5 9h17M5 6h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z" />
            </svg>
            {formatDate(item.publishedAt)}
            <span aria-hidden>&middot;</span>
            {item.readTimeMinutes} menit baca
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/berita/${item.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-primary-100 bg-white transition-colors duration-200 hover:border-primary-300 hover:shadow-lg hover:shadow-primary-900/5"
    >
      <ImagePlaceholder
        variant="news"
        src={item.imageUrl}
        alt={item.title}
        className="aspect-[4/3] w-full"
      />
      <div className="flex flex-1 flex-col gap-1 p-3.5">
        <span className="flex items-center gap-1.5 text-xs font-medium text-primary-800/55">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 3v3M16 3v3M3.5 9h17M5 6h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z" />
          </svg>
          {formatDate(item.publishedAt)}
          <span aria-hidden>&middot;</span>
          {item.readTimeMinutes} menit baca
        </span>
        <h3 className="line-clamp-2 text-sm font-bold text-primary-900 group-hover:text-primary-700">
          {item.title}
        </h3>
        <p className="line-clamp-2 text-xs text-primary-800/65">{item.excerpt}</p>
        <span className="mt-auto flex items-center gap-1.5 pt-1 text-xs font-semibold text-primary-800">
          Baca Selengkapnya
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

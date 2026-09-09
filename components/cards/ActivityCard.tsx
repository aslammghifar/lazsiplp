import Link from "next/link";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { formatDate, formatCalendarParts } from "@/lib/format";
import { PINNED_OVERLAY_STYLE } from "@/lib/pinned-overlay";
import type { Activity } from "@/lib/dummy-data";

export function ActivityCard({
  item,
  featured = false,
}: {
  item: Activity;
  featured?: boolean;
}) {
  if (featured) {
    const { day, month } = formatCalendarParts(item.tanggal);
    return (
      <Link
        href={`/kegiatan/${item.slug}`}
        className="group relative flex aspect-[3/2] w-full flex-col overflow-hidden rounded-[22px]"
      >
        <ImagePlaceholder
          variant="activity"
          src={item.imageUrl}
          alt={item.title}
          className="absolute inset-0 h-full w-full"
        />
        <div className="pointer-events-none absolute inset-0" style={PINNED_OVERLAY_STYLE} />

        <div className="relative z-10 m-3.5 flex w-11 shrink-0 flex-col items-center overflow-hidden rounded-lg bg-white shadow-sm">
          <span className="w-full bg-primary-900 py-0.5 text-center text-[9px] font-bold tracking-wide text-white">
            {month}
          </span>
          <span className="py-0.5 text-base font-extrabold leading-none text-primary-900">{day}</span>
        </div>

        <div className="relative z-10 mt-auto flex flex-col gap-1 p-4 text-white">
          <h3 className="line-clamp-2 text-base font-bold leading-snug">{item.title}</h3>
          <span className="flex items-center gap-1.5 text-xs font-medium text-white/75">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10zM12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
            </svg>
            {item.lokasi}
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/kegiatan/${item.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-primary-100 bg-white transition-colors duration-200 hover:border-primary-300 hover:shadow-lg hover:shadow-primary-900/5"
    >
      <ImagePlaceholder
        variant="activity"
        src={item.imageUrl}
        alt={item.title}
        className="aspect-[4/3] w-full"
      />
      <div className="flex flex-1 flex-col gap-1 p-3.5">
        <span className="flex items-center gap-1.5 text-xs font-medium text-primary-800/55">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10zM12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
          </svg>
          {formatDate(item.tanggal)} &middot; {item.lokasi}
        </span>
        <h3 className="line-clamp-2 text-sm font-bold text-primary-900 group-hover:text-primary-700">
          {item.title}
        </h3>
        <p className="line-clamp-2 text-xs text-primary-800/65">{item.description}</p>
      </div>
    </Link>
  );
}

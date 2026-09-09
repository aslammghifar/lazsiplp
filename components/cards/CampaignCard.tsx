import Link from "next/link";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { formatRupiah, formatNumber } from "@/lib/format";
import { PINNED_OVERLAY_STYLE } from "@/lib/pinned-overlay";
import type { Campaign } from "@/lib/dummy-data";

export function CampaignCard({
  item,
  featured = false,
}: {
  item: Campaign;
  featured?: boolean;
}) {
  const percent = item.target ? (item.collected / item.target) * 100 : 0;
  const detailHref = `/donasi/${item.slug}`;

  if (featured) {
    return (
      <div className="group relative flex aspect-[3/2] w-full flex-col overflow-hidden rounded-[22px]">
        <Link href={detailHref} aria-label={item.title} className="absolute inset-0 z-0" />

        <ImagePlaceholder
          variant="campaign"
          src={item.imageUrl}
          alt={item.title}
          className="absolute inset-0 h-full w-full"
        />
        <div className="pointer-events-none absolute inset-0" style={PINNED_OVERLAY_STYLE} />

        <span className="relative z-10 m-3.5 w-fit rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-primary-800 shadow-sm backdrop-blur-sm">
          {item.kategoriLabel}
        </span>
        {item.hariTersisa !== null && (
          <span className="absolute right-3.5 top-3.5 z-10 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-primary-800 shadow-sm backdrop-blur-sm">
            {item.hariTersisa} hari lagi
          </span>
        )}

        <div className="relative z-10 mt-auto flex flex-col gap-1.5 p-4 text-white">
          <h3 className="line-clamp-2 text-base font-bold leading-snug">{item.title}</h3>
          <ProgressBar percent={percent} tone="light" />
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-bold">{formatRupiah(item.collected)}</p>
              <p className="text-xs text-white/70">
                Terkumpul{item.target ? ` dari ${formatRupiah(item.target)}` : ""}
              </p>
            </div>
            <Link
              href={`${detailHref}#form`}
              className="relative z-10 shrink-0 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-primary-900 transition-colors hover:bg-primary-50"
            >
              Donasi
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-primary-100 bg-white transition-colors duration-200 hover:border-primary-300 hover:shadow-lg hover:shadow-primary-900/5">
      <Link href={detailHref} aria-label={item.title} className="absolute inset-0 z-0" />

      <div className="relative">
        <ImagePlaceholder
          variant="campaign"
          src={item.imageUrl}
          alt={item.title}
          className="aspect-[4/3] w-full"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-primary-800 shadow-sm backdrop-blur-sm">
          {item.kategoriLabel}
        </span>
        {item.hariTersisa !== null && (
          <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-primary-800 shadow-sm backdrop-blur-sm">
            {item.hariTersisa} hari lagi
          </span>
        )}
      </div>
      <div className="relative flex flex-1 flex-col gap-1.5 p-3.5">
        <p className="flex items-center gap-1 text-xs font-medium text-primary-800/55">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10zM12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
          </svg>
          {item.lokasi}
        </p>
        <h3 className="line-clamp-2 text-sm font-bold text-primary-900 group-hover:text-primary-700">
          {item.title}
        </h3>

        <div className="mt-auto flex flex-col gap-2">
          {item.target ? (
            <>
              <ProgressBar percent={percent} />
              <div className="flex items-center justify-between text-xs text-primary-800/70">
                <span className="font-bold text-primary-800">
                  {formatRupiah(item.collected)}
                </span>
                <span>dari {formatRupiah(item.target)}</span>
              </div>
            </>
          ) : (
            <p className="text-xs font-bold text-primary-800">
              Terkumpul {formatRupiah(item.collected)}
            </p>
          )}

          <div className="flex items-center justify-between border-t border-primary-100 pt-2.5">
            <span className="flex items-center gap-1.5 text-xs text-primary-800/55">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2 20c0-3 2.7-5.5 7-5.5s7 2.5 7 5.5M14.5 14.8c3.5.3 5.5 2.6 5.5 5.2" />
              </svg>
              {formatNumber(item.donaturCount)} donatur
            </span>
            <Link
              href={`${detailHref}#form`}
              className="relative z-10 rounded-full bg-primary-900 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-primary-800"
            >
              Donasi
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

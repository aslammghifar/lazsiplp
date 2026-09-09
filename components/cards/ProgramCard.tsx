import Link from "next/link";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Badge } from "@/components/ui/Badge";
import { PINNED_OVERLAY_STYLE } from "@/lib/pinned-overlay";
import type { Program } from "@/lib/dummy-data";

export function ProgramCard({
  item,
  featured = false,
}: {
  item: Program;
  featured?: boolean;
}) {
  if (featured) {
    return (
      <Link
        href={`/program/${item.slug}`}
        className="group relative flex aspect-[3/2] w-full flex-col overflow-hidden rounded-[22px]"
      >
        <ImagePlaceholder
          variant="program"
          src={item.imageUrl}
          alt={item.title}
          className="absolute inset-0 h-full w-full"
        />
        <div className="pointer-events-none absolute inset-0" style={PINNED_OVERLAY_STYLE} />

        <div className="relative z-10 mt-auto flex flex-col gap-1.5 p-4 text-white">
          <h3 className="line-clamp-2 text-base font-bold leading-snug">{item.title}</h3>
          {item.tipeKonten === "berita" ? (
            <span className="flex items-center gap-1.5 text-sm font-medium text-white/75">
              Baca Selengkapnya
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          ) : (
            <span
              className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-bold ${
                item.pendaftaranDibuka ? "bg-white/20 text-white" : "bg-white/90 text-primary-900"
              }`}
            >
              {item.pendaftaranDibuka ? "Daftar Terbuka" : "Kuota Penuh"}
            </span>
          )}
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/program/${item.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-primary-100 bg-white transition-colors duration-200 hover:border-primary-300 hover:shadow-lg hover:shadow-primary-900/5"
    >
      <div className="relative">
        <ImagePlaceholder
          variant="program"
          src={item.imageUrl}
          alt={item.title}
          className="aspect-[4/3] w-full"
        />
        {item.tipeKonten === "pendaftaran" && !item.pendaftaranDibuka && (
          <span className="absolute right-3 top-3">
            <Badge tone="neutral">Kuota Penuh</Badge>
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3.5">
        <h3 className="line-clamp-2 text-sm font-bold text-primary-900 group-hover:text-primary-700">
          {item.title}
        </h3>
        <p className="line-clamp-2 text-xs text-primary-800/65">{item.description}</p>
        <span className="mt-auto flex items-center gap-1.5 pt-1 text-xs font-semibold text-primary-800">
          {item.tipeKonten === "berita"
            ? "Baca Selengkapnya"
            : item.pendaftaranDibuka
            ? "Daftar Sekarang"
            : "Pendaftaran Ditutup"}
          {(item.tipeKonten === "berita" || item.pendaftaranDibuka) && (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          )}
        </span>
      </div>
    </Link>
  );
}

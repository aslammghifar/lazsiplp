import type { Metadata } from "next";
import Link from "next/link";
import { activities } from "@/lib/dummy-data";
import { ActivityCard } from "@/components/cards/ActivityCard";
import { BackLink } from "@/components/ui/BackLink";

export const metadata: Metadata = {
  title: "Semua Kegiatan — LAZSIP",
  description: "Dokumentasi dan agenda kegiatan lapangan LAZSIP bersama relawan dan masyarakat dampingan.",
};

const PAGE_SIZE = 6;

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function SemuaKegiatanPage({ searchParams }: Props) {
  const { page: pageParam } = await searchParams;
  const sorted = [...activities].sort(
    (a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime()
  );

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const page = Math.min(Math.max(1, Number(pageParam) || 1), totalPages);
  const items = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32">
      <BackLink href="/#kegiatan">Kembali ke Beranda</BackLink>

      <span className="mb-4 mt-6 inline-flex items-center rounded-full bg-primary-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-primary-800">
        Kegiatan
      </span>
      <h1 className="text-balance text-[2rem] font-extrabold leading-[1.15] tracking-tight text-primary-900 sm:text-5xl">
        Semua Kegiatan LAZSIP
      </h1>
      <p className="mt-3 max-w-xl text-base leading-relaxed text-secondary-700 sm:text-lg">
        Dokumentasi dan agenda kegiatan lapangan bersama relawan dan masyarakat dampingan.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <ActivityCard key={item.id} item={item} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={p === 1 ? "/kegiatan" : `/kegiatan?page=${p}`}
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                p === page
                  ? "bg-primary-900 text-white"
                  : "border border-primary-200 text-primary-800 hover:border-primary-400"
              }`}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

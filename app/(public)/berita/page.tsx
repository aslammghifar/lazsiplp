import type { Metadata } from "next";
import Link from "next/link";
import { newsList, type NewsCategory } from "@/lib/dummy-data";
import { NewsCard } from "@/components/cards/NewsCard";
import { BackLink } from "@/components/ui/BackLink";

export const metadata: Metadata = {
  title: "Semua Berita — LAZSIP",
  description: "Kumpulan berita, kabar, dan update SARSIP terbaru seputar program dan kegiatan LAZSIP.",
};

type FilterValue = "semua" | NewsCategory;

const TABS: { value: FilterValue; label: string }[] = [
  { value: "semua", label: "Semua" },
  { value: "umum", label: "Berita & Kabar" },
  { value: "sarsip", label: "SARSIP" },
];

const PAGE_SIZE = 6;

type Props = {
  searchParams: Promise<{ kategori?: string; page?: string }>;
};

export default async function SemuaBeritaPage({ searchParams }: Props) {
  const { kategori: kategoriParam, page: pageParam } = await searchParams;
  const activeKategori: FilterValue = TABS.some((t) => t.value === kategoriParam)
    ? (kategoriParam as FilterValue)
    : "semua";

  const filtered = newsList.filter(
    (n) => n.status === "published" && (activeKategori === "semua" || n.kategori === activeKategori)
  );
  const sorted = [...filtered].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const page = Math.min(Math.max(1, Number(pageParam) || 1), totalPages);
  const items = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const buildHref = (p: number) => {
    const params = new URLSearchParams();
    if (activeKategori !== "semua") params.set("kategori", activeKategori);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return qs ? `/berita?${qs}` : "/berita";
  };

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32">
      <BackLink href={activeKategori === "sarsip" ? "/#sarsip" : "/#berita"}>Kembali ke Beranda</BackLink>

      <span className="mb-4 mt-6 inline-flex items-center rounded-full bg-primary-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-primary-800">
        Berita &amp; Kabar
      </span>
      <h1 className="text-balance text-[2rem] font-extrabold leading-[1.15] tracking-tight text-primary-900 sm:text-5xl">
        Semua Berita LAZSIP
      </h1>
      <p className="mt-3 max-w-xl text-base leading-relaxed text-secondary-700 sm:text-lg">
        Ikuti perkembangan program, kegiatan, dan update SARSIP LAZSIP.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {TABS.map((tab) => {
          const isActive = tab.value === activeKategori;
          const href = tab.value === "semua" ? "/berita" : `/berita?kategori=${tab.value}`;
          return (
            <Link
              key={tab.value}
              href={href}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "border-primary-900 bg-primary-900 text-white"
                  : "border-primary-200 bg-white text-primary-800 hover:border-primary-400"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>

      {items.length === 0 && (
        <p className="mt-8 text-sm text-primary-800/60">Belum ada berita untuk kategori ini.</p>
      )}

      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={buildHref(p)}
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

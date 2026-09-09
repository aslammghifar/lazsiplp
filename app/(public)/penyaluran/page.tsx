import type { Metadata } from "next";
import Link from "next/link";
import { publicBeneficiaries, TIPE_BANTUAN_LABEL, type TipeBantuan } from "@/lib/dummy-data";
import { BeneficiaryCard } from "@/components/cards/BeneficiaryCard";
import { BackLink } from "@/components/ui/BackLink";

export const metadata: Metadata = {
  title: "Semua Bantuan — LAZSIP",
  description:
    "Daftar penerima manfaat yang telah dibantu LAZSIP — data ditampilkan sesuai kebijakan privasi penerima.",
};

type FilterValue = "semua" | TipeBantuan;

const TABS: { value: FilterValue; label: string }[] = [
  { value: "semua", label: "Semua" },
  ...(Object.entries(TIPE_BANTUAN_LABEL) as [TipeBantuan, string][]).map(([value, label]) => ({
    value,
    label,
  })),
];

const PAGE_SIZE = 8;

type Props = {
  searchParams: Promise<{ tipe?: string; page?: string }>;
};

export default async function SemuaBantuanPage({ searchParams }: Props) {
  const { tipe: tipeParam, page: pageParam } = await searchParams;
  const activeTipe: FilterValue = TABS.some((t) => t.value === tipeParam)
    ? (tipeParam as FilterValue)
    : "semua";

  const filtered =
    activeTipe === "semua"
      ? publicBeneficiaries
      : publicBeneficiaries.filter((b) => b.tipeBantuan === activeTipe);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(Math.max(1, Number(pageParam) || 1), totalPages);
  const items = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const buildPageHref = (p: number) => {
    const params = new URLSearchParams();
    if (activeTipe !== "semua") params.set("tipe", activeTipe);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return qs ? `/penyaluran?${qs}` : "/penyaluran";
  };

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32">
      <BackLink href="/#penyaluran">Kembali ke Beranda</BackLink>

      <span className="mb-4 mt-6 inline-flex items-center rounded-full bg-primary-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-primary-800">
        Penyaluran Bantuan
      </span>
      <h1 className="text-balance text-[2rem] font-extrabold leading-[1.15] tracking-tight text-primary-900 sm:text-5xl">
        Semua Penerima Bantuan
      </h1>
      <p className="mt-3 max-w-xl text-base leading-relaxed text-secondary-700 sm:text-lg">
        Sebagian penerima manfaat yang telah dibantu LAZSIP — data ditampilkan sesuai kebijakan
        privasi penerima.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {TABS.map((tab) => {
          const isActive = tab.value === activeTipe;
          const href = tab.value === "semua" ? "/penyaluran" : `/penyaluran?tipe=${tab.value}`;
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

      <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <BeneficiaryCard key={item.id} item={item} />
        ))}
      </div>

      {items.length === 0 && (
        <p className="mt-8 text-sm text-primary-800/60">
          Belum ada data penerima manfaat untuk kategori ini.
        </p>
      )}

      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={buildPageHref(p)}
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

import type { Metadata } from "next";
import Link from "next/link";
import { programs, KATEGORI_PROGRAM_LABEL, type KategoriProgram } from "@/lib/dummy-data";
import { ProgramCard } from "@/components/cards/ProgramCard";
import { BackLink } from "@/components/ui/BackLink";

export const metadata: Metadata = {
  title: "Semua Program — LAZSIP",
  description: "Program Pemberdayaan Umum dan Divisi Pendidikan LAZSIP.",
};

const TABS: { value: KategoriProgram; label: string }[] = [
  { value: "umum", label: "Umum" },
  { value: "pendidikan", label: "Pendidikan" },
];

type Props = {
  searchParams: Promise<{ kategori?: string }>;
};

export default async function SemuaProgramPage({ searchParams }: Props) {
  const { kategori: kategoriParam } = await searchParams;
  const activeKategori: KategoriProgram = TABS.some((t) => t.value === kategoriParam)
    ? (kategoriParam as KategoriProgram)
    : "umum";

  const items = programs.filter((p) => p.kategori === activeKategori);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32">
      <BackLink href={activeKategori === "pendidikan" ? "/#divisi-pendidikan" : "/#program"}>
        Kembali ke Beranda
      </BackLink>

      <span className="mb-4 mt-6 inline-flex items-center rounded-full bg-primary-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-primary-800">
        Program
      </span>
      <h1 className="text-balance text-[2rem] font-extrabold leading-[1.15] tracking-tight text-primary-900 sm:text-5xl">
        Semua Program LAZSIP
      </h1>
      <p className="mt-3 max-w-xl text-base leading-relaxed text-secondary-700 sm:text-lg">
        {KATEGORI_PROGRAM_LABEL[activeKategori]} — pilih kategori untuk melihat program lainnya.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {TABS.map((tab) => {
          const isActive = tab.value === activeKategori;
          const href = tab.value === "umum" ? "/program" : `/program?kategori=${tab.value}`;
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
          <ProgramCard key={item.id} item={item} />
        ))}
      </div>

      {items.length === 0 && (
        <p className="mt-8 text-sm text-primary-800/60">Belum ada program untuk kategori ini.</p>
      )}
    </div>
  );
}

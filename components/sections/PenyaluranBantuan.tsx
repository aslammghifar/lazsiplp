"use client";

import { useMemo, useState } from "react";
import { publicBeneficiaries, TIPE_BANTUAN_LABEL, type TipeBantuan } from "@/lib/dummy-data";
import { BeneficiaryCard } from "@/components/cards/BeneficiaryCard";
import { FilterChips } from "@/components/ui/FilterChips";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

type FilterValue = "semua" | TipeBantuan;

const FILTER_OPTIONS: { value: FilterValue; label: string }[] = [
  { value: "semua", label: "Semua" },
  ...(Object.entries(TIPE_BANTUAN_LABEL) as [TipeBantuan, string][]).map(([value, label]) => ({
    value,
    label,
  })),
];

export function PenyaluranBantuan() {
  const [filter, setFilter] = useState<FilterValue>("semua");

  const filtered = useMemo(() => {
    if (filter === "semua") return publicBeneficiaries;
    return publicBeneficiaries.filter((b) => b.tipeBantuan === filter);
  }, [filter]);

  return (
    <section id="penyaluran" className="bg-primary-50/60">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Penyaluran Bantuan"
          title="Penerima Manfaat LAZSIP"
          description="Sebagian penerima manfaat yang telah dibantu — data ditampilkan sesuai kebijakan privasi penerima."
        />

        <div className="mt-8">
          <FilterChips options={FILTER_OPTIONS} value={filter} onChange={setFilter} />
        </div>

        <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((item) => (
            <BeneficiaryCard key={item.id} item={item} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-8 text-sm text-primary-800/60">
            Belum ada data penerima manfaat untuk kategori ini.
          </p>
        )}

        <div className="mt-10 flex justify-center">
          <Button href="/penyaluran" variant="secondary" icon="arrow">
            Lihat Semua Bantuan
          </Button>
        </div>
      </div>
    </section>
  );
}

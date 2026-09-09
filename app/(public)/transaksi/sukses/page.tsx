import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TransaksiSukses } from "@/components/sections/TransaksiSukses";

export const metadata: Metadata = {
  title: "Transaksi Berhasil — LAZSIP",
  description: "Ringkasan transaksi donasi/zakat yang telah berhasil diproses.",
};

type Props = {
  searchParams: Promise<{
    jenis?: string;
    jenisLabel?: string;
    nominal?: string;
    biayaAdmin?: string;
    total?: string;
    metode?: string;
    nama?: string;
  }>;
};

export default async function TransaksiSuksesPage({ searchParams }: Props) {
  const { jenis, jenisLabel, nominal, biayaAdmin, total, metode, nama } = await searchParams;

  const nominalNumber = Number(nominal) || 0;
  if (!jenis || !jenisLabel || nominalNumber <= 0) notFound();

  return (
    <TransaksiSukses
      jenis={jenis}
      jenisLabel={jenisLabel}
      nominal={nominalNumber}
      biayaAdmin={Number(biayaAdmin) || 0}
      total={Number(total) || nominalNumber}
      metode={metode || "-"}
      nama={nama || "Hamba Allah"}
    />
  );
}

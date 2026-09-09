import Link from "next/link";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { formatRupiah } from "@/lib/format";
import type { PublicBeneficiary } from "@/lib/dummy-data";

export function BeneficiaryCard({ item }: { item: PublicBeneficiary }) {
  return (
    <Link
      href={`/penyaluran/${item.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-primary-100 bg-white transition-colors duration-200 hover:border-primary-300"
    >
      <ImagePlaceholder
        variant="person"
        src={item.imageUrl}
        alt={item.nama}
        className="aspect-[4/5] w-full"
      />
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="text-sm font-bold text-primary-900 group-hover:text-primary-700">
          {item.nama}
        </h3>
        <p className="text-xs text-primary-800/55">
          {item.jenisKelamin === "L" ? "Laki-laki" : "Perempuan"} &middot; {item.umur} tahun
        </p>
        <p className="line-clamp-2 text-xs leading-relaxed text-primary-800/70">
          {item.masalahYangDihadapi}
        </p>
        <p className="mt-auto pt-2 text-xs text-primary-800/60">
          Bantuan tersalurkan{" "}
          <span className="font-medium text-primary-800">{formatRupiah(item.nominalDiterima)}</span>
        </p>
      </div>
    </Link>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { publicBeneficiaries, getOtherBeneficiaries, TIPE_BANTUAN_LABEL } from "@/lib/dummy-data";
import { formatRupiah } from "@/lib/format";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Button } from "@/components/ui/Button";
import { BackLink } from "@/components/ui/BackLink";
import { BeneficiaryCard } from "@/components/cards/BeneficiaryCard";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return publicBeneficiaries.map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = publicBeneficiaries.find((b) => b.id === id);
  if (!item) return {};
  return { title: `${item.nama} — LAZSIP`, description: item.masalahYangDihadapi };
}

export default async function PenyaluranDetailPage({ params }: Props) {
  const { id } = await params;
  const item = publicBeneficiaries.find((b) => b.id === id);
  if (!item) notFound();

  const otherBeneficiaries = getOtherBeneficiaries(item);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32">
      <article className="mx-auto max-w-3xl">
        <BackLink href="/penyaluran">Semua Bantuan</BackLink>

        <span className="mb-4 mt-6 inline-flex items-center rounded-full bg-primary-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-primary-800">
          {TIPE_BANTUAN_LABEL[item.tipeBantuan]}
        </span>

        <h1 className="text-balance text-[2rem] font-extrabold leading-[1.15] tracking-tight text-primary-900 sm:text-5xl">
          {item.nama}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm font-medium text-primary-800/55">
          <span className="flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" />
            </svg>
            {item.jenisKelamin === "L" ? "Laki-laki" : "Perempuan"} &middot; {item.umur} tahun
          </span>
          <span className="flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10zM12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
            </svg>
            {item.daerahCakupanVerifikator}
          </span>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-[280px_1fr]">
          <ImagePlaceholder
            variant="person"
            src={item.imageUrl}
            alt={item.nama}
            className="aspect-[4/5] w-full rounded-3xl"
          />

          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wide text-primary-800/50">
                Masalah yang Dihadapi
              </h2>
              <p className="mt-2 text-base leading-[1.7] text-primary-900/80">
                {item.masalahYangDihadapi}
              </p>
            </div>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wide text-primary-800/50">
                Kebutuhan
              </h2>
              <p className="mt-2 text-base leading-[1.7] text-primary-900/80">{item.kebutuhan}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 rounded-2xl border border-primary-100 bg-primary-50/60 p-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-primary-800/50">
                  Bantuan Tersalurkan
                </p>
                <p className="mt-1 text-lg font-extrabold text-primary-900">
                  {formatRupiah(item.nominalDiterima)}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-primary-800/50">
                  Diketahui dari
                </p>
                <p className="mt-1 text-sm font-semibold text-primary-900">{item.tahuInfoDari}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-primary-100 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary-800/50">
            Diverifikasi oleh
          </p>
          <p className="mt-1 text-sm font-semibold text-primary-900">{item.namaVerifikator}</p>
          <p className="text-xs text-primary-800/55">{item.daerahCakupanVerifikator}</p>
        </div>

        <div className="mt-12 border-t border-primary-100 pt-8">
          <Button href="/penyaluran" variant="secondary">
            Kembali ke Semua Bantuan
          </Button>
        </div>
      </article>

      {otherBeneficiaries.length > 0 && (
        <div className="mt-16 border-t border-primary-100 pt-12">
          <h2 className="text-xl font-extrabold tracking-tight text-primary-900 sm:text-2xl">
            Penerima Bantuan Lainnya
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3">
            {otherBeneficiaries.map((b) => (
              <BeneficiaryCard key={b.id} item={b} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

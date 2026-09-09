import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Pembayaran Gagal — LAZSIP",
  description: "Transaksi gagal atau kode pembayaran sudah kedaluwarsa.",
};

type Props = {
  searchParams: Promise<{
    alasan?: string; // "gagal" | "kedaluwarsa"
    jenisLabel?: string;
    kembaliHref?: string;
  }>;
};

export default async function TransaksiGagalPage({ searchParams }: Props) {
  const { alasan, jenisLabel, kembaliHref } = await searchParams;
  const isKedaluwarsa = alasan === "kedaluwarsa";
  const retryHref = kembaliHref || "/";

  return (
    <div className="mx-auto max-w-xl px-4 pb-20 pt-28 text-center sm:px-6 sm:pt-32">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-red-600">
        {isKedaluwarsa ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-8 w-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-8 w-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        )}
      </span>

      <h1 className="mt-6 text-balance text-[1.75rem] font-extrabold leading-[1.15] tracking-tight text-primary-900 sm:text-4xl">
        {isKedaluwarsa ? "Kode Pembayaran Sudah Kedaluwarsa" : "Pembayaran Gagal"}
      </h1>
      <p className="mt-3 text-base leading-relaxed text-primary-800/65">
        {isKedaluwarsa
          ? `QR/Virtual Account untuk ${jenisLabel || "transaksi Anda"} sudah melewati batas waktu pembayaran dan tidak bisa digunakan lagi.`
          : `Transaksi ${jenisLabel || "Anda"} tidak berhasil diproses. Belum ada dana yang terpotong dari rekening Anda.`}{" "}
        Silakan coba lagi dengan mengulang proses pembayaran.
      </p>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Button href={retryHref} variant="primary" icon="arrow" fullWidthOnMobile>
          Coba Lagi
        </Button>
        <a
          href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
            `Assalamu'alaikum, saya mengalami kendala pembayaran untuk ${jenisLabel || "transaksi saya"}.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary-200 px-6 py-3 text-sm font-semibold text-primary-900 transition-colors hover:border-primary-400 sm:w-auto"
        >
          Hubungi CS
        </a>
      </div>
    </div>
  );
}

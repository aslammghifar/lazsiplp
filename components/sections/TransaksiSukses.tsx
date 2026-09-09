import { siteConfig } from "@/lib/site-config";
import { formatRupiah } from "@/lib/format";
import { Button } from "@/components/ui/Button";

// Reusable untuk donasi (jenis === "donasi") maupun semua tipe zakat (jenis === "maal" | "penghasilan" | dst) —
// bedanya cuma label "Campaign"/"Jenis Zakat" dan kata kerja "berdonasi"/"menunaikan zakat".
export function TransaksiSukses({
  jenis,
  jenisLabel,
  nominal,
  biayaAdmin,
  total,
  metode,
  nama,
}: {
  jenis: string;
  jenisLabel: string;
  nominal: number;
  biayaAdmin: number;
  total: number;
  metode: string;
  nama: string;
}) {
  const isDonasi = jenis === "donasi";
  const shareText = encodeURIComponent(
    `Alhamdulillah, saya baru saja ${
      isDonasi ? `berdonasi untuk "${jenisLabel}"` : `menunaikan ${jenisLabel}`
    } sebesar ${formatRupiah(nominal)} melalui ${siteConfig.name}. Yuk turut berkontribusi juga!`
  );

  return (
    <div className="mx-auto max-w-xl px-4 pb-20 pt-28 text-center sm:px-6 sm:pt-32">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary-500/15 text-secondary-600">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-8 w-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </span>

      <h1 className="mt-6 text-balance text-[1.75rem] font-extrabold leading-[1.15] tracking-tight text-primary-900 sm:text-4xl">
        Alhamdulillah, {isDonasi ? "Donasi" : "Zakat"} Anda Berhasil!
      </h1>
      <p className="mt-3 text-base leading-relaxed text-primary-800/65">
        Terima kasih, {nama}. Transaksi Anda sedang diproses dan akan segera tersalurkan kepada
        yang berhak.
      </p>

      <div className="mt-8 flex flex-col gap-3 rounded-3xl border border-primary-100 bg-white p-6 text-left">
        <div className="flex items-center justify-between text-sm">
          <span className="text-primary-800/60">{isDonasi ? "Campaign" : "Jenis Zakat"}</span>
          <span className="font-semibold text-primary-900">{jenisLabel}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-primary-800/60">Nominal</span>
          <span className="font-semibold text-primary-900">{formatRupiah(nominal)}</span>
        </div>
        {biayaAdmin > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-primary-800/60">Biaya admin</span>
            <span className="font-semibold text-primary-900">{formatRupiah(biayaAdmin)}</span>
          </div>
        )}
        <div className="flex items-center justify-between text-sm">
          <span className="text-primary-800/60">Metode pembayaran</span>
          <span className="font-semibold text-primary-900">{metode}</span>
        </div>
        <div className="flex items-center justify-between border-t border-primary-100 pt-3 text-base font-bold text-primary-900">
          <span>Total dibayar</span>
          <span>{formatRupiah(total)}</span>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <a
          href={`https://wa.me/?text=${shareText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90 sm:w-auto"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.87 9.87 0 0 0 4.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.03c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.11.11-1.79-.11-.41-.13-.94-.3-1.62-.6-2.85-1.23-4.71-4.1-4.85-4.29-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.08 1-2.37.26-.28.57-.35.76-.35.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.58.81 2 .88 2.15.07.15.12.32.02.52-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.26 1.64 2.04 1.13 1 2.08 1.32 2.37 1.47.29.15.46.13.63-.08.17-.2.72-.84.92-1.13.19-.29.39-.24.65-.14.27.1 1.7.8 1.99.95.29.14.48.21.55.33.07.12.07.7-.17 1.37z" />
          </svg>
          Bagikan ke WhatsApp
        </a>
        <Button href="/" variant="secondary" fullWidthOnMobile>
          Kembali ke Beranda
        </Button>
      </div>
    </div>
  );
}

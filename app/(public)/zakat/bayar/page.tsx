import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { BackLink } from "@/components/ui/BackLink";
import { ZakatPaymentForm } from "@/components/sections/ZakatPaymentForm";

const KEUNGGULAN = [
  "Dana tersalurkan sepenuhnya tanpa potongan biaya jika Anda bantu tanggung biaya admin.",
  "Setiap transaksi diverifikasi otomatis lewat sistem pembayaran resmi — bukti bayar terkirim begitu dana diterima.",
  "Bermitra resmi dengan BAZNAS dan terdaftar di Kementerian Agama RI.",
];

export const metadata: Metadata = {
  title: "Bayar Zakat — LAZSIP",
  description: "Ringkasan perhitungan zakat dan form pembayaran.",
};

type Props = {
  searchParams: Promise<{ jenis?: string; label?: string; zakat?: string; rincian?: string }>;
};

type RincianItem = { label: string; value: string };

function parseRincian(raw: string | undefined): RincianItem[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is RincianItem =>
        !!item && typeof item.label === "string" && typeof item.value === "string"
    );
  } catch {
    return [];
  }
}

export default async function BayarZakatPage({ searchParams }: Props) {
  const { jenis, label, zakat, rincian } = await searchParams;

  const zakatNumber = Number(zakat) || 0;
  const judul = label || "Zakat";
  const rincianItems = parseRincian(rincian);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32">
      <BackLink href="/#kalkulator-zakat">Kalkulator Zakat</BackLink>

      <span className="mb-4 mt-6 inline-flex items-center rounded-full bg-primary-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-primary-800">
        Bayar Zakat
      </span>
      <h1 className="text-balance text-[2rem] font-extrabold leading-[1.15] tracking-tight text-primary-900 sm:text-5xl">
        Selesaikan Pembayaran {judul}
      </h1>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="flex flex-col gap-5">
          <div className="rounded-3xl border border-primary-100 bg-primary-50/60 p-6">
            <h2 className="text-base font-bold text-primary-900">Ringkasan Perhitungan</h2>
            {rincianItems.length > 0 ? (
              <dl className="mt-4 flex flex-col gap-3 text-sm">
                {rincianItems.map((item, i) => {
                  const isLast = i === rincianItems.length - 1;
                  return (
                    <div
                      key={item.label}
                      className={`flex items-center justify-between ${
                        isLast ? "border-t border-primary-200 pt-3" : ""
                      }`}
                    >
                      <dt className="text-primary-800/60">{item.label}</dt>
                      <dd
                        className={
                          isLast
                            ? "text-base font-bold text-primary-900"
                            : "font-semibold text-primary-900"
                        }
                      >
                        {item.value}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            ) : (
              <p className="mt-4 text-sm text-primary-800/60">
                Nominal zakat: <span className="font-semibold text-primary-900">{judul}</span>
              </p>
            )}
          </div>

          <div className="rounded-3xl border border-primary-100 bg-white p-6">
            <h2 className="text-base font-bold text-primary-900">Kenapa Bayar Zakat di Sini?</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {KEUNGGULAN.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-primary-800/75">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="mt-0.5 h-4 w-4 shrink-0 text-primary-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3 rounded-3xl border border-primary-100 bg-white p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 10.5 12 4l8 6.5M6 9.5V19a1 1 0 0 0 1 1h3v-5h4v5h3a1 1 0 0 0 1-1V9.5" />
              </svg>
            </span>
            <h2 className="text-base font-bold text-primary-900">Mau Dijemput Saja?</h2>
            <p className="text-sm leading-relaxed text-primary-800/70">
              Tidak sempat transfer sendiri? Tim LAZSIP bisa datang langsung menjemput zakat ke
              rumah atau kantor Anda — tanpa dipungut biaya tambahan.
            </p>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                "Assalamu'alaikum, saya ingin request layanan jemput zakat ke alamat saya."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-primary-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-800"
            >
              Request Jemput Zakat
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>

          <div className="flex flex-col gap-3 rounded-3xl border border-primary-100 bg-white p-6">
            <h2 className="text-base font-bold text-primary-900">Butuh Bantuan?</h2>
            <p className="text-sm leading-relaxed text-primary-800/70">
              Ada kendala saat membayar zakat? Tim CS kami siap membantu lewat WhatsApp.
            </p>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                "Assalamu'alaikum, saya butuh bantuan terkait pembayaran zakat."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-primary-200 px-4 py-2.5 text-sm font-semibold text-primary-900 transition-colors hover:border-primary-400"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-[#25D366]">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.87 9.87 0 0 0 4.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.03c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.11.11-1.79-.11-.41-.13-.94-.3-1.62-.6-2.85-1.23-4.71-4.1-4.85-4.29-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.08 1-2.37.26-.28.57-.35.76-.35.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.58.81 2 .88 2.15.07.15.12.32.02.52-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.26 1.64 2.04 1.13 1 2.08 1.32 2.37 1.47.29.15.46.13.63-.08.17-.2.72-.84.92-1.13.19-.29.39-.24.65-.14.27.1 1.7.8 1.99.95.29.14.48.21.55.33.07.12.07.7-.17 1.37z" />
              </svg>
              Chat via WhatsApp
            </a>
          </div>
        </div>

        <ZakatPaymentForm initialNominal={zakatNumber} jenisLabel={judul} jenis={jenis || "zakat"} />
      </div>
    </div>
  );
}

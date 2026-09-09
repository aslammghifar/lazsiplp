"use client";

import { useMemo, useState } from "react";
import { nishabGram, zakatRate, fitrahPerJiwa } from "@/lib/dummy-data";
import type { GoldPrice } from "@/lib/gold-price";
import { formatRupiah, formatDate } from "@/lib/format";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

type ZakatType = "maal" | "penghasilan" | "emas" | "perdagangan" | "fitrah";

const TABS: { value: ZakatType; label: string }[] = [
  { value: "maal", label: "Maal (Harta)" },
  { value: "penghasilan", label: "Penghasilan" },
  { value: "emas", label: "Emas" },
  { value: "perdagangan", label: "Perdagangan" },
  { value: "fitrah", label: "Fitrah" },
];

type Rincian = { label: string; value: string };

type ZakatResult = {
  label: string;
  helper: string;
  statusText: string;
  badgeText: string;
  badgeActive: boolean;
  zakat: number;
  rincian: Rincian[];
};

const parseDigits = (raw: string) => raw.replace(/[^0-9]/g, "");
const parseDecimal = (raw: string) => {
  const cleaned = raw.replace(/[^0-9.]/g, "");
  const firstDot = cleaned.indexOf(".");
  if (firstDot === -1) return cleaned;
  return cleaned.slice(0, firstDot + 1) + cleaned.slice(firstDot + 1).replace(/\./g, "");
};
const toNumber = (v: string) => Number(v) || 0;
const displayRupiahInput = (v: string) => (v ? toNumber(v).toLocaleString("id-ID") : "");

function NumberField({
  id,
  label,
  value,
  onChange,
  parse,
  display,
  prefix,
  suffix,
  placeholder = "0",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  parse: (raw: string) => string;
  display: (v: string) => string;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-primary-900">
        {label}
      </label>
      <div className="flex items-center rounded-full border border-primary-200 bg-white px-5 py-3.5 focus-within:ring-2 focus-within:ring-primary-400">
        {prefix && <span className="mr-2 shrink-0 text-primary-500">{prefix}</span>}
        <input
          id={id}
          inputMode="decimal"
          placeholder={placeholder}
          value={display(value)}
          onChange={(e) => onChange(parse(e.target.value))}
          className="w-full bg-transparent text-lg font-medium text-primary-900 outline-none"
        />
        {suffix && <span className="ml-2 shrink-0 text-sm text-primary-500">{suffix}</span>}
      </div>
    </div>
  );
}

export function ZakatCalculator({ goldPrice }: { goldPrice: GoldPrice }) {
  const [type, setType] = useState<ZakatType>("maal");

  const [harta, setHarta] = useState("");
  const [hutangMaal, setHutangMaal] = useState("");

  const [penghasilan, setPenghasilan] = useState("");

  const [beratEmas, setBeratEmas] = useState("");

  const [modalUsaha, setModalUsaha] = useState("");
  const [keuntungan, setKeuntungan] = useState("");
  const [hutangUsaha, setHutangUsaha] = useState("");

  const [jumlahJiwa, setJumlahJiwa] = useState("1");

  const nishab = nishabGram * goldPrice.pricePerGram;

  const result: ZakatResult = useMemo(() => {
    switch (type) {
      case "maal": {
        const bersih = Math.max(0, toNumber(harta) - toNumber(hutangMaal));
        const wajib = bersih >= nishab;
        const zakat = wajib ? Math.round(bersih * zakatRate) : 0;
        return {
          label: "Zakat Maal (Harta Simpanan)",
          helper: `Nishab setara ${nishabGram} gram emas = ${formatRupiah(nishab)}. Kadar zakat ${
            zakatRate * 100
          }% dari harta bersih (harta − hutang jangka pendek).`,
          statusText:
            toNumber(harta) === 0
              ? "Masukkan nominal harta untuk melihat estimasi."
              : wajib
              ? "Harta bersih Anda sudah mencapai nishab."
              : "Harta bersih Anda belum mencapai nishab.",
          badgeText: toNumber(harta) === 0 ? "Menunggu input" : wajib ? "Wajib Zakat" : "Belum Wajib",
          badgeActive: wajib,
          zakat,
          rincian: [
            { label: "Total harta", value: formatRupiah(toNumber(harta)) },
            ...(toNumber(hutangMaal) > 0
              ? [{ label: "Hutang jangka pendek", value: `- ${formatRupiah(toNumber(hutangMaal))}` }]
              : []),
            { label: `Nishab (${nishabGram} gram emas)`, value: formatRupiah(nishab) },
            { label: `Zakat wajib (${zakatRate * 100}%)`, value: formatRupiah(zakat) },
          ],
        };
      }
      case "penghasilan": {
        const bulanan = toNumber(penghasilan);
        const tahunan = bulanan * 12;
        const wajib = tahunan >= nishab;
        const zakat = wajib ? Math.round(bulanan * zakatRate) : 0;
        return {
          label: "Zakat Penghasilan (Profesi)",
          helper: `Ditunaikan tiap menerima penghasilan bila akumulasi setahun (bulanan × 12) sudah mencapai nishab ${nishabGram} gram emas = ${formatRupiah(
            nishab
          )}.`,
          statusText:
            bulanan === 0
              ? "Masukkan penghasilan bulanan untuk melihat estimasi."
              : wajib
              ? "Penghasilan tahunan Anda sudah mencapai nishab."
              : "Penghasilan tahunan Anda belum mencapai nishab.",
          badgeText: bulanan === 0 ? "Menunggu input" : wajib ? "Wajib Zakat" : "Belum Wajib",
          badgeActive: wajib,
          zakat,
          rincian: [
            { label: "Penghasilan per bulan", value: formatRupiah(bulanan) },
            { label: "Setara per tahun", value: formatRupiah(tahunan) },
            { label: `Nishab (${nishabGram} gram emas/tahun)`, value: formatRupiah(nishab) },
            { label: `Zakat per bulan (${zakatRate * 100}%)`, value: formatRupiah(zakat) },
          ],
        };
      }
      case "emas": {
        const gram = Number(beratEmas) || 0;
        const nilaiEmas = Math.round(gram * goldPrice.pricePerGram);
        const wajib = gram >= nishabGram;
        const zakat = wajib ? Math.round(nilaiEmas * zakatRate) : 0;
        return {
          label: "Zakat Emas",
          helper: `Nishab emas = ${nishabGram} gram. Emas simpanan/perhiasan yang melebihi kebutuhan wajar dikenakan zakat ${
            zakatRate * 100
          }% dari nilainya.`,
          statusText:
            gram === 0
              ? "Masukkan berat emas untuk melihat estimasi."
              : wajib
              ? "Emas Anda sudah mencapai nishab."
              : "Emas Anda belum mencapai nishab.",
          badgeText: gram === 0 ? "Menunggu input" : wajib ? "Wajib Zakat" : "Belum Wajib",
          badgeActive: wajib,
          zakat,
          rincian: [
            { label: "Berat emas", value: `${gram} gram` },
            { label: "Harga emas per gram", value: formatRupiah(goldPrice.pricePerGram) },
            { label: "Nilai emas", value: formatRupiah(nilaiEmas) },
            { label: `Nishab`, value: `${nishabGram} gram` },
            { label: `Zakat wajib (${zakatRate * 100}%)`, value: formatRupiah(zakat) },
          ],
        };
      }
      case "perdagangan": {
        const aset = Math.max(0, toNumber(modalUsaha) + toNumber(keuntungan) - toNumber(hutangUsaha));
        const wajib = aset >= nishab;
        const zakat = wajib ? Math.round(aset * zakatRate) : 0;
        return {
          label: "Zakat Perdagangan",
          helper: `Aset dagang = modal usaha + keuntungan − hutang usaha. Nishab setara ${nishabGram} gram emas = ${formatRupiah(
            nishab
          )}.`,
          statusText:
            toNumber(modalUsaha) + toNumber(keuntungan) === 0
              ? "Masukkan modal & keuntungan usaha untuk melihat estimasi."
              : wajib
              ? "Aset dagang Anda sudah mencapai nishab."
              : "Aset dagang Anda belum mencapai nishab.",
          badgeText:
            toNumber(modalUsaha) + toNumber(keuntungan) === 0
              ? "Menunggu input"
              : wajib
              ? "Wajib Zakat"
              : "Belum Wajib",
          badgeActive: wajib,
          zakat,
          rincian: [
            { label: "Modal usaha", value: formatRupiah(toNumber(modalUsaha)) },
            { label: "Keuntungan", value: formatRupiah(toNumber(keuntungan)) },
            ...(toNumber(hutangUsaha) > 0
              ? [{ label: "Hutang usaha", value: `- ${formatRupiah(toNumber(hutangUsaha))}` }]
              : []),
            { label: "Aset dagang bersih", value: formatRupiah(aset) },
            { label: `Nishab (${nishabGram} gram emas)`, value: formatRupiah(nishab) },
            { label: `Zakat wajib (${zakatRate * 100}%)`, value: formatRupiah(zakat) },
          ],
        };
      }
      case "fitrah": {
        const jiwa = Math.max(0, Math.floor(Number(jumlahJiwa) || 0));
        const zakat = jiwa * fitrahPerJiwa;
        return {
          label: "Zakat Fitrah",
          helper: `Nilai zakat fitrah ${formatRupiah(
            fitrahPerJiwa
          )} per jiwa (setara ±2,5 kg beras kualitas menengah), wajib bagi setiap muslim yang mampu.`,
          statusText: jiwa === 0 ? "Masukkan jumlah jiwa untuk melihat estimasi." : `Ditunaikan untuk ${jiwa} jiwa.`,
          badgeText: jiwa === 0 ? "Menunggu input" : "Zakat Fitrah",
          badgeActive: jiwa > 0,
          zakat,
          rincian: [
            { label: "Jumlah jiwa", value: `${jiwa} orang` },
            { label: "Nilai per jiwa", value: formatRupiah(fitrahPerJiwa) },
            { label: "Total zakat fitrah", value: formatRupiah(zakat) },
          ],
        };
      }
    }
  }, [type, harta, hutangMaal, penghasilan, beratEmas, modalUsaha, keuntungan, hutangUsaha, jumlahJiwa, nishab, goldPrice.pricePerGram]);

  const payHref =
    result.zakat > 0
      ? `/zakat/bayar?${new URLSearchParams({
          jenis: type,
          label: result.label,
          zakat: String(result.zakat),
          rincian: JSON.stringify(result.rincian),
        }).toString()}`
      : "#kalkulator-zakat";

  return (
    <section id="kalkulator-zakat" className="bg-primary-50/60">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="Kalkulator Zakat"
          title="Hitung Semua Jenis Zakat Anda Secara Otomatis"
          description={`Acuan harga emas ${
            goldPrice.source === "live" ? "real-time (Antam, via anekalogam.co.id)" : "cadangan"
          }: ${formatRupiah(goldPrice.pricePerGram)}/gram — data per ${formatDate(goldPrice.updatedAt)}.`}
        />

        <div className="mt-8 flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setType(tab.value)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                type === tab.value
                  ? "border-primary-900 bg-primary-900 text-white"
                  : "border-primary-200 bg-white text-primary-800 hover:border-primary-400"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-8 rounded-3xl border border-primary-100 bg-white p-6 shadow-sm sm:p-10 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            {type === "maal" && (
              <>
                <NumberField
                  id="zk-harta"
                  label="Total harta yang dimiliki"
                  value={harta}
                  onChange={setHarta}
                  parse={parseDigits}
                  display={displayRupiahInput}
                  prefix="Rp"
                />
                <NumberField
                  id="zk-hutang-maal"
                  label="Hutang jangka pendek (opsional)"
                  value={hutangMaal}
                  onChange={setHutangMaal}
                  parse={parseDigits}
                  display={displayRupiahInput}
                  prefix="Rp"
                />
              </>
            )}

            {type === "penghasilan" && (
              <NumberField
                id="zk-penghasilan"
                label="Penghasilan per bulan"
                value={penghasilan}
                onChange={setPenghasilan}
                parse={parseDigits}
                display={displayRupiahInput}
                prefix="Rp"
              />
            )}

            {type === "emas" && (
              <NumberField
                id="zk-emas"
                label="Berat emas yang dimiliki"
                value={beratEmas}
                onChange={setBeratEmas}
                parse={parseDecimal}
                display={(v) => v}
                placeholder="0"
                suffix="gram"
              />
            )}

            {type === "perdagangan" && (
              <>
                <NumberField
                  id="zk-modal"
                  label="Modal usaha"
                  value={modalUsaha}
                  onChange={setModalUsaha}
                  parse={parseDigits}
                  display={displayRupiahInput}
                  prefix="Rp"
                />
                <NumberField
                  id="zk-untung"
                  label="Keuntungan"
                  value={keuntungan}
                  onChange={setKeuntungan}
                  parse={parseDigits}
                  display={displayRupiahInput}
                  prefix="Rp"
                />
                <NumberField
                  id="zk-hutang-usaha"
                  label="Hutang usaha (opsional)"
                  value={hutangUsaha}
                  onChange={setHutangUsaha}
                  parse={parseDigits}
                  display={displayRupiahInput}
                  prefix="Rp"
                />
              </>
            )}

            {type === "fitrah" && (
              <NumberField
                id="zk-jiwa"
                label="Jumlah jiwa yang ditanggung"
                value={jumlahJiwa}
                onChange={setJumlahJiwa}
                parse={parseDigits}
                display={(v) => v}
                placeholder="1"
                suffix="jiwa"
              />
            )}

            <div className="flex items-start gap-2.5 rounded-2xl bg-sky-50 px-4 py-3">
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-sky-500 text-[10px] font-bold text-white">
                i
              </span>
              <p className="text-sm leading-relaxed text-sky-900/80">{result.helper}</p>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6 rounded-2xl bg-primary-900 p-6 text-white sm:p-8">
            <span
              className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide ${
                result.badgeActive ? "bg-secondary-500/25 text-secondary-100" : "bg-white/10 text-white/70"
              }`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
              </svg>
              {result.badgeText}
            </span>

            <div className="border-t border-white/15 pt-6">
              <p className="text-sm text-white/70">{result.label} yang wajib dibayarkan</p>
              <p className="mt-2 text-4xl font-extrabold tracking-tight text-white">
                {formatRupiah(result.zakat)}
              </p>
              <p className="mt-2 text-sm text-secondary-200">{result.statusText}</p>
            </div>

            <Button
              href={payHref}
              variant="white"
              icon="wallet"
              disabled={result.zakat === 0}
              className="w-full"
            >
              Bayar Zakat Sekarang
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

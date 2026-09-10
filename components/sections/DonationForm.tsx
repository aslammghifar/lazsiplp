"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { paymentMethods, calculateAdminFee } from "@/lib/dummy-data";
import { formatRupiah } from "@/lib/format";
import type { Campaign } from "@/lib/dummy-data";

const QUICK_NOMINAL = [50_000, 100_000, 250_000, 500_000, 1_000_000];

export function DonationForm({ campaign }: { campaign: Campaign }) {
  const router = useRouter();
  const [nominal, setNominal] = useState("");
  const [methodId, setMethodId] = useState(paymentMethods[0].id);
  const [bantuAdmin, setBantuAdmin] = useState(true);
  const [anonim, setAnonim] = useState(false);
  const [nama, setNama] = useState("");
  const [kontak, setKontak] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const nominalNumber = Number(nominal.replace(/[^0-9]/g, "")) || 0;
  const method = paymentMethods.find((m) => m.id === methodId) ?? paymentMethods[0];

  const { fee, total } = useMemo(() => {
    const feeAmount = calculateAdminFee(nominalNumber, method);
    return {
      fee: feeAmount,
      total: nominalNumber + (bantuAdmin ? feeAmount : 0),
    };
  }, [nominalNumber, method, bantuAdmin]);

  function handleNominalChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNominal(e.target.value.replace(/[^0-9]/g, ""));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (nominalNumber <= 0 || !kontak) return;

    setSubmitting(true);
    setTimeout(() => {
      const params = new URLSearchParams({
        jenis: "donasi",
        jenisLabel: campaign.title,
        nominal: String(nominalNumber),
        biayaAdmin: String(bantuAdmin ? fee : 0),
        total: String(total),
        metode: method.label,
        anonim: String(anonim),
        nama: anonim ? "Hamba Allah" : nama || "Hamba Allah",
      });
      router.push(`/transaksi/sukses?${params.toString()}`);
    }, 700);
  }

  return (
    <form
      id="form"
      onSubmit={handleSubmit}
      className="scroll-mt-28 flex flex-col gap-6 rounded-3xl border border-primary-100 bg-white p-6 sm:p-8"
    >
      <h2 className="text-xl font-extrabold tracking-tight text-primary-900">Form Donasi</h2>

      <div className="flex flex-col gap-2.5">
        <label className="text-sm font-medium text-primary-900">Nominal donasi</label>
        <div className="flex flex-wrap gap-2">
          {QUICK_NOMINAL.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setNominal(String(n))}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                nominalNumber === n
                  ? "border-primary-900 bg-primary-900 text-white"
                  : "border-primary-200 bg-white text-primary-800 hover:border-primary-400"
              }`}
            >
              {formatRupiah(n)}
            </button>
          ))}
        </div>
        <div className="flex items-center rounded-full border border-primary-200 bg-white px-5 py-3 focus-within:ring-2 focus-within:ring-primary-400">
          <span className="mr-2 text-primary-500">Rp</span>
          <input
            inputMode="numeric"
            placeholder="Nominal lainnya"
            value={nominal ? Number(nominal).toLocaleString("id-ID") : ""}
            onChange={handleNominalChange}
            className="w-full bg-transparent text-base font-medium text-primary-900 outline-none"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <label className="text-sm font-medium text-primary-900">Metode pembayaran</label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {paymentMethods.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMethodId(m.id)}
              className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm transition-colors ${
                methodId === m.id
                  ? "border-primary-900 bg-primary-50"
                  : "border-primary-200 bg-white hover:border-primary-400"
              }`}
            >
              <span>
                <span className="block font-semibold text-primary-900">{m.label}</span>
                <span className="text-xs text-primary-800/55">{m.group}</span>
              </span>
              {methodId === m.id && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 text-primary-700">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      <label className="flex items-start gap-3 rounded-2xl border border-primary-100 bg-primary-50/60 p-4">
        <input
          type="checkbox"
          checked={bantuAdmin}
          onChange={(e) => setBantuAdmin(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-primary-300 text-primary-700 focus:ring-primary-400"
        />
        <span className="text-sm text-primary-800/80">
          Tambahkan {formatRupiah(fee)} untuk biaya transaksi agar donasi tersalurkan 100%.
        </span>
      </label>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-1 flex-col gap-1.5">
          <label htmlFor="donasi-nama" className="text-sm font-medium text-primary-900">
            Nama
          </label>
          <input
            id="donasi-nama"
            disabled={anonim}
            value={anonim ? "Hamba Allah" : nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Nama Anda"
            className="rounded-full border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400 disabled:bg-primary-50 disabled:text-primary-800/50"
          />
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          <label htmlFor="donasi-kontak" className="text-sm font-medium text-primary-900">
            Nomor WhatsApp
          </label>
          <input
            id="donasi-kontak"
            required
            inputMode="numeric"
            value={kontak}
            onChange={(e) => setKontak(e.target.value)}
            placeholder="08xxxxxxxxxx"
            className="rounded-full border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
          />
        </div>
      </div>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={anonim}
          onChange={(e) => setAnonim(e.target.checked)}
          className="h-4 w-4 rounded border-primary-300 text-primary-700 focus:ring-primary-400"
        />
        <span className="text-sm text-primary-800/80">Sembunyikan nama saya (donasi sebagai Hamba Allah)</span>
      </label>

      <div className="flex flex-col gap-2 border-t border-primary-100 pt-4 text-sm">
        <div className="flex items-center justify-between text-primary-800/70">
          <span>Nominal donasi</span>
          <span className="font-medium text-primary-900">{formatRupiah(nominalNumber)}</span>
        </div>
        <div className="flex items-center justify-between text-primary-800/70">
          <span>Biaya admin</span>
          <span className="font-medium text-primary-900">
            {bantuAdmin ? formatRupiah(fee) : "Ditanggung LAZSIP"}
          </span>
        </div>
        <div className="flex items-center justify-between border-t border-primary-100 pt-2 text-base font-bold text-primary-900">
          <span>Total pembayaran</span>
          <span>{formatRupiah(total)}</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting || nominalNumber <= 0 || !kontak}
        className="inline-flex items-center justify-center rounded-full bg-primary-900 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? "Memproses..." : `Donasi ${nominalNumber > 0 ? formatRupiah(total) : "Sekarang"}`}
      </button>
    </form>
  );
}

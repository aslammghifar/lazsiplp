"use client";

import { useState } from "react";
import { paymentMethods as initialMethods, type PaymentMethod } from "@/lib/dummy-data";
import { useToast } from "@/components/ui/Toast";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

type TipeBiaya = "flat" | "persen";

function tipeOf(m: PaymentMethod): TipeBiaya {
  return m.feePercent > 0 ? "persen" : "flat";
}

export default function AdminPembayaranPage() {
  const { showToast } = useToast();
  const [methods, setMethods] = useState(initialMethods);

  function updateTipe(id: string, tipe: TipeBiaya) {
    setMethods((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;
        if (tipe === "flat") return { ...m, feePercent: 0, feeFlat: m.feeFlat || 4000 };
        return { ...m, feeFlat: 0, feePercent: m.feePercent || 0.01 };
      })
    );
  }

  function updateValue(id: string, tipe: TipeBiaya, rawValue: number) {
    setMethods((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, feeFlat: tipe === "flat" ? rawValue : 0, feePercent: tipe === "persen" ? rawValue / 100 : 0 } : m
      )
    );
  }

  function handleSave(label: string) {
    showToast(`Biaya "${label}" diperbarui (simulasi — belum tersimpan permanen).`);
  }

  return (
    <div>
      <AdminPageHeader
        title="Referensi Biaya Payment Gateway"
        description="Dipakai kalkulasi breakdown biaya admin secara dinamis di form donasi/zakat."
      />

      <div className="overflow-x-auto rounded-2xl border border-primary-100 bg-white">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead>
            <tr className="border-b border-primary-100 bg-primary-50/60 text-[11px] font-semibold uppercase tracking-wider text-primary-700/70">
              <th className="px-4 py-3.5 font-semibold">Metode Pembayaran</th>
              <th className="px-4 py-3.5 font-semibold">Tipe Biaya</th>
              <th className="px-4 py-3.5 font-semibold">Nilai</th>
              <th className="px-4 py-3.5 text-right font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary-50">
            {methods.map((m) => {
              const tipe = tipeOf(m);
              return (
                <tr key={m.id} className="transition-colors hover:bg-primary-50/40">
                  <td className="px-4 py-3.5">
                    <p className="font-medium text-primary-900">{m.label}</p>
                    <p className="text-xs text-primary-800/55">{m.group}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <select
                      value={tipe}
                      onChange={(e) => updateTipe(m.id, e.target.value as TipeBiaya)}
                      className="rounded-full border border-primary-200 bg-white px-3 py-1.5 text-xs text-primary-800 outline-none focus:ring-2 focus:ring-primary-400"
                    >
                      <option value="flat">Flat (Rp)</option>
                      <option value="persen">Persentase (%)</option>
                    </select>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      {tipe === "flat" ? (
                        <>
                          <span className="text-xs text-primary-800/50">Rp</span>
                          <input
                            type="number"
                            min={0}
                            value={m.feeFlat}
                            onChange={(e) => updateValue(m.id, "flat", Number(e.target.value) || 0)}
                            className="w-28 rounded-lg border border-primary-200 px-2.5 py-1.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
                          />
                        </>
                      ) : (
                        <>
                          <input
                            type="number"
                            min={0}
                            step={0.1}
                            value={Number((m.feePercent * 100).toFixed(2))}
                            onChange={(e) => updateValue(m.id, "persen", Number(e.target.value) || 0)}
                            className="w-24 rounded-lg border border-primary-200 px-2.5 py-1.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
                          />
                          <span className="text-xs text-primary-800/50">%</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <button
                      type="button"
                      onClick={() => handleSave(m.label)}
                      className="rounded-full bg-primary-900 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-primary-800"
                    >
                      Simpan
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

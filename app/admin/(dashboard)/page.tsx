"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { formatRupiah, formatNumber, formatDate } from "@/lib/format";
import { campaigns } from "@/lib/dummy-data";
import { danaMasukHarian, adminTransactions, TODAY_ISO } from "@/lib/admin-dummy-data";
import { StatCounter } from "@/components/ui/StatCounter";
import { BarChart } from "@/components/admin/BarChart";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { EmptyState } from "@/components/admin/EmptyState";

type Period = "7hari" | "30hari" | "bulanIni" | "bulanLalu" | "semua" | "custom";

const PERIOD_OPTIONS: { value: Period; label: string }[] = [
  { value: "7hari", label: "7 Hari Terakhir" },
  { value: "30hari", label: "30 Hari Terakhir" },
  { value: "bulanIni", label: "Bulan Ini" },
  { value: "bulanLalu", label: "Bulan Lalu" },
  { value: "semua", label: "Semua Waktu" },
  { value: "custom", label: "Rentang Kustom" },
];

function addDays(iso: string, delta: number): string {
  const d = new Date(iso + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + delta);
  return d.toISOString().slice(0, 10);
}

function monthRange(iso: string, monthsAgo: number): { from: string; to: string } {
  const d = new Date(iso + "T00:00:00Z");
  const targetMonth = d.getUTCMonth() - monthsAgo;
  const from = new Date(Date.UTC(d.getUTCFullYear(), targetMonth, 1));
  const to = new Date(Date.UTC(d.getUTCFullYear(), targetMonth + 1, 0));
  return { from: from.toISOString().slice(0, 10), to: to.toISOString().slice(0, 10) };
}

function resolveRange(period: Period, customFrom: string, customTo: string): { from: string; to: string } {
  if (period === "7hari") return { from: addDays(TODAY_ISO, -6), to: TODAY_ISO };
  if (period === "30hari") return { from: addDays(TODAY_ISO, -29), to: TODAY_ISO };
  if (period === "bulanIni") return monthRange(TODAY_ISO, 0);
  if (period === "bulanLalu") return monthRange(TODAY_ISO, 1);
  if (period === "custom") return { from: customFrom || "0000-01-01", to: customTo || "9999-12-31" };
  return { from: "0000-01-01", to: "9999-12-31" };
}

export default function AdminDashboardPage() {
  const [period, setPeriod] = useState<Period>("30hari");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");

  const { from, to } = useMemo(() => resolveRange(period, customFrom, customTo), [period, customFrom, customTo]);

  const transactionsInRange = useMemo(
    () => adminTransactions.filter((t) => t.tanggal >= from && t.tanggal <= to),
    [from, to]
  );

  const chartInRange = useMemo(
    () => danaMasukHarian.filter((d) => d.tanggal >= from && d.tanggal <= to),
    [from, to]
  );

  const stats = useMemo(() => {
    const paid = transactionsInRange.filter((t) => t.status === "paid");
    const donasiTotal = paid.filter((t) => t.jenis === "donasi").reduce((s, t) => s + t.nominal, 0);
    const zakatTotal = paid.filter((t) => t.jenis === "zakat").reduce((s, t) => s + t.nominal, 0);
    const donaturSet = new Set(paid.map((t) => t.donaturNama));
    return {
      donasiTotal,
      zakatTotal,
      donaturCount: donaturSet.size,
      campaignAktif: campaigns.filter((c) => c.status === "aktif").length,
    };
  }, [transactionsInRange]);

  const campaignLaris = useMemo(() => {
    const byId = new Map<string, { donatur: Set<string>; collected: number }>();
    for (const t of transactionsInRange) {
      if (t.jenis !== "donasi" || t.status !== "paid" || !t.campaignId) continue;
      const entry = byId.get(t.campaignId) ?? { donatur: new Set<string>(), collected: 0 };
      entry.donatur.add(t.donaturNama);
      entry.collected += t.nominal;
      byId.set(t.campaignId, entry);
    }
    return Array.from(byId.entries())
      .map(([campaignId, entry]) => {
        const campaign = campaigns.find((c) => c.id === campaignId);
        return {
          id: campaignId,
          title: campaign?.title ?? campaignId,
          donaturCount: entry.donatur.size,
          collected: entry.collected,
        };
      })
      .sort((a, b) => b.donaturCount - a.donaturCount)
      .slice(0, 5);
  }, [transactionsInRange]);

  const recentTransactions = useMemo(
    () => [...transactionsInRange].sort((a, b) => b.tanggal.localeCompare(a.tanggal)).slice(0, 10),
    [transactionsInRange]
  );

  const chartData = chartInRange.map((d) => ({
    label: String(new Date(d.tanggal).getUTCDate()),
    nominal: d.nominal,
  }));

  const periodLabel = PERIOD_OPTIONS.find((p) => p.value === period)?.label ?? "";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 text-sm font-semibold text-primary-900">Periode:</span>
        {PERIOD_OPTIONS.map((p) => (
          <button
            key={p.value}
            type="button"
            onClick={() => setPeriod(p.value)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
              period === p.value ? "border-primary-900 bg-primary-900 text-white" : "border-primary-200 bg-white text-primary-800 hover:border-primary-400"
            }`}
          >
            {p.label}
          </button>
        ))}
        {period === "custom" && (
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={customFrom}
              onChange={(e) => setCustomFrom(e.target.value)}
              className="rounded-full border border-primary-200 bg-white px-3.5 py-1.5 text-xs text-primary-800 outline-none focus:ring-2 focus:ring-primary-400"
            />
            <span className="text-xs text-primary-800/40">s/d</span>
            <input
              type="date"
              value={customTo}
              onChange={(e) => setCustomTo(e.target.value)}
              className="rounded-full border border-primary-200 bg-white px-3.5 py-1.5 text-xs text-primary-800 outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCounter
          icon="fund"
          value={formatRupiah(stats.donasiTotal)}
          label={`Donasi — ${periodLabel}`}
          className="border border-primary-100"
        />
        <StatCounter
          icon="fund"
          value={formatRupiah(stats.zakatTotal)}
          label={`Zakat — ${periodLabel}`}
          className="border border-primary-100"
        />
        <StatCounter
          icon="donors"
          value={formatNumber(stats.donaturCount)}
          label={`Donatur pada periode ini`}
          className="border border-primary-100"
        />
        <StatCounter
          icon="campaign"
          value={formatNumber(stats.campaignAktif)}
          label="Campaign aktif (saat ini)"
          className="border border-primary-100"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-3xl border border-primary-100 bg-white p-6">
          <h2 className="text-base font-bold text-primary-900">Dana Masuk — {periodLabel}</h2>
          <div className="mt-6">
            {chartData.length === 0 ? (
              <EmptyState message="Tidak ada data dana masuk pada periode ini." />
            ) : (
              <BarChart data={chartData} labelEvery={5} />
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-primary-100 bg-white p-6">
          <h2 className="text-base font-bold text-primary-900">Campaign Paling Laris — {periodLabel}</h2>
          {campaignLaris.length === 0 ? (
            <p className="mt-4 text-sm text-primary-800/50">Belum ada donasi campaign pada periode ini.</p>
          ) : (
            <ul className="mt-4 flex flex-col gap-3">
              {campaignLaris.map((c, i) => (
                <li key={c.id} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-50 text-xs font-bold text-primary-800">
                    {i + 1}
                  </span>
                  <Link href={`/admin/donasi/${c.id}`} className="min-w-0 flex-1 hover:underline">
                    <p className="truncate text-sm font-semibold text-primary-900">{c.title}</p>
                    <p className="text-xs text-primary-800/55">
                      {formatNumber(c.donaturCount)} donatur &middot; {formatRupiah(c.collected)}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="rounded-3xl border border-primary-100 bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-primary-900">Transaksi — {periodLabel}</h2>
          <Link href="/admin/transaksi" className="text-sm font-semibold text-primary-700 hover:text-primary-900">
            Lihat semua &rarr;
          </Link>
        </div>
        {recentTransactions.length === 0 ? (
          <p className="mt-4 text-sm text-primary-800/50">Tidak ada transaksi pada periode ini.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-primary-100 bg-primary-50/60 text-[11px] font-semibold uppercase tracking-wider text-primary-700/70">
                  <th className="pb-3.5 pr-4 font-semibold">ID</th>
                  <th className="pb-3.5 pr-4 font-semibold">Donatur</th>
                  <th className="pb-3.5 pr-4 font-semibold">Jenis</th>
                  <th className="pb-3.5 pr-4 font-semibold">Nominal</th>
                  <th className="pb-3.5 pr-4 font-semibold">Metode</th>
                  <th className="pb-3.5 pr-4 font-semibold">Tanggal</th>
                  <th className="pb-3.5 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary-50">
                {recentTransactions.map((t) => (
                  <tr key={t.id} className="transition-colors hover:bg-primary-50/40">
                    <td className="py-3.5 pr-4 font-mono text-xs text-primary-800/60">{t.id}</td>
                    <td className="py-3.5 pr-4 font-medium text-primary-900">{t.donaturNama}</td>
                    <td className="py-3.5 pr-4 text-primary-800/70">{t.labelJenis}</td>
                    <td className="py-3.5 pr-4 font-semibold text-primary-900">{formatRupiah(t.nominal)}</td>
                    <td className="py-3.5 pr-4 text-primary-800/70">{t.metode}</td>
                    <td className="py-3.5 pr-4 text-primary-800/60">{formatDate(t.tanggal)}</td>
                    <td className="py-3.5">
                      <StatusBadge status={t.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

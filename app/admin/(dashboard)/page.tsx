import type { Metadata } from "next";
import Link from "next/link";
import { formatRupiah, formatNumber, formatDate } from "@/lib/format";
import { dashboardStats, danaMasukHarian, adminTransactions, getCampaignPalingLaris } from "@/lib/admin-dummy-data";
import { StatCounter } from "@/components/ui/StatCounter";
import { BarChart } from "@/components/admin/BarChart";
import { StatusBadge } from "@/components/admin/StatusBadge";

export const metadata: Metadata = {
  title: "Dashboard — Admin LAZSIP",
};

export default function AdminDashboardPage() {
  const campaignLaris = getCampaignPalingLaris(5);
  const recentTransactions = adminTransactions.slice(0, 10);
  const chartData = danaMasukHarian.map((d) => ({
    label: String(new Date(d.tanggal).getUTCDate()),
    nominal: d.nominal,
  }));

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCounter
          icon="fund"
          value={formatRupiah(dashboardStats.donasiBulanIni)}
          label="Donasi bulan ini"
          className="border border-primary-100"
        />
        <StatCounter
          icon="fund"
          value={formatRupiah(dashboardStats.zakatBulanIni)}
          label="Zakat bulan ini"
          className="border border-primary-100"
        />
        <StatCounter
          icon="donors"
          value={formatNumber(dashboardStats.donaturBaruBulanIni)}
          label="Donatur baru bulan ini"
          className="border border-primary-100"
        />
        <StatCounter
          icon="campaign"
          value={formatNumber(dashboardStats.campaignAktif)}
          label="Campaign aktif"
          className="border border-primary-100"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-3xl border border-primary-100 bg-white p-6">
          <h2 className="text-base font-bold text-primary-900">Dana Masuk 30 Hari Terakhir</h2>
          <div className="mt-6">
            <BarChart data={chartData} labelEvery={5} />
          </div>
        </div>

        <div className="rounded-3xl border border-primary-100 bg-white p-6">
          <h2 className="text-base font-bold text-primary-900">Campaign Paling Laris</h2>
          <ul className="mt-4 flex flex-col gap-3">
            {campaignLaris.map((c, i) => (
              <li key={c.id} className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-50 text-xs font-bold text-primary-800">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-primary-900">{c.title}</p>
                  <p className="text-xs text-primary-800/55">
                    {formatNumber(c.donaturCount)} donatur &middot; {formatRupiah(c.collected)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-3xl border border-primary-100 bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-primary-900">Transaksi Terbaru</h2>
          <Link href="/admin/transaksi" className="text-sm font-semibold text-primary-700 hover:text-primary-900">
            Lihat semua &rarr;
          </Link>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-primary-100 text-xs uppercase tracking-wide text-primary-800/50">
                <th className="pb-3 pr-4 font-semibold">ID</th>
                <th className="pb-3 pr-4 font-semibold">Donatur</th>
                <th className="pb-3 pr-4 font-semibold">Jenis</th>
                <th className="pb-3 pr-4 font-semibold">Nominal</th>
                <th className="pb-3 pr-4 font-semibold">Metode</th>
                <th className="pb-3 pr-4 font-semibold">Tanggal</th>
                <th className="pb-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-50">
              {recentTransactions.map((t) => (
                <tr key={t.id}>
                  <td className="py-3 pr-4 font-mono text-xs text-primary-800/60">{t.id}</td>
                  <td className="py-3 pr-4 font-medium text-primary-900">{t.donaturNama}</td>
                  <td className="py-3 pr-4 text-primary-800/70">{t.labelJenis}</td>
                  <td className="py-3 pr-4 font-semibold text-primary-900">{formatRupiah(t.nominal)}</td>
                  <td className="py-3 pr-4 text-primary-800/70">{t.metode}</td>
                  <td className="py-3 pr-4 text-primary-800/60">{formatDate(t.tanggal)}</td>
                  <td className="py-3">
                    <StatusBadge status={t.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import { campaigns } from "@/lib/dummy-data";
import { getTransactionsByCampaign } from "@/lib/admin-dummy-data";
import { formatRupiah, formatNumber, formatDate } from "@/lib/format";
import { BackLink } from "@/components/ui/BackLink";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatusBadge } from "@/components/admin/StatusBadge";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminDonasiDetailPage({ params }: Props) {
  const { id } = await params;
  const item = campaigns.find((c) => c.id === id);
  if (!item) notFound();

  const transactions = getTransactionsByCampaign(id);
  const percent = item.target ? (item.collected / item.target) * 100 : 0;

  return (
    <div>
      <BackLink href="/admin/donasi">Semua Campaign</BackLink>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold tracking-tight text-primary-900">{item.title}</h2>
          <p className="mt-1 text-sm text-primary-800/60">
            {item.kategoriLabel} &middot; {item.lokasi} &middot; Kode: <span className="font-mono">{item.kodeUnik}</span>
          </p>
        </div>
        <Link
          href={`/admin/donasi/${item.id}/edit`}
          className="inline-flex items-center gap-2 rounded-full bg-primary-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-800"
        >
          Edit Campaign
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-primary-100 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary-800/50">Terkumpul</p>
          <p className="mt-1 text-xl font-extrabold text-primary-900">{formatRupiah(item.collected)}</p>
          {item.target && <ProgressBar percent={percent} />}
        </div>
        <div className="rounded-2xl border border-primary-100 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary-800/50">Donatur</p>
          <p className="mt-1 text-xl font-extrabold text-primary-900">{formatNumber(item.donaturCount)}</p>
        </div>
        <div className="rounded-2xl border border-primary-100 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary-800/50">Status</p>
          <p className="mt-1 text-xl font-extrabold capitalize text-primary-900">{item.status}</p>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-primary-100 bg-white">
        <div className="flex items-center justify-between border-b border-primary-100 p-5">
          <h3 className="text-base font-bold text-primary-900">Transaksi Masuk ke Campaign Ini</h3>
          <Link
            href={`/admin/transaksi?campaign=${encodeURIComponent(item.title)}`}
            className="text-sm font-semibold text-primary-700 hover:text-primary-900"
          >
            Lihat di Riwayat Transaksi &rarr;
          </Link>
        </div>
        {transactions.length === 0 ? (
          <p className="p-6 text-center text-sm text-primary-800/50">Belum ada transaksi masuk untuk campaign ini.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-primary-100 text-xs uppercase tracking-wide text-primary-800/50">
                  <th className="px-4 py-3 font-semibold">Tanggal</th>
                  <th className="px-4 py-3 font-semibold">Donatur</th>
                  <th className="px-4 py-3 font-semibold">Nominal</th>
                  <th className="px-4 py-3 font-semibold">Metode</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary-50">
                {transactions.map((t) => (
                  <tr key={t.id}>
                    <td className="px-4 py-3 text-primary-800/60">{formatDate(t.tanggal)}</td>
                    <td className="px-4 py-3 font-medium text-primary-900">{t.donaturNama}</td>
                    <td className="px-4 py-3 font-semibold text-primary-900">{formatRupiah(t.nominal)}</td>
                    <td className="px-4 py-3 text-primary-800/70">{t.metode}</td>
                    <td className="px-4 py-3">
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

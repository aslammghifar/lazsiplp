import { notFound } from "next/navigation";
import Link from "next/link";
import { campaigns } from "@/lib/dummy-data";
import { getTransactionsByCampaign } from "@/lib/admin-dummy-data";
import { formatRupiah, formatNumber } from "@/lib/format";
import { BackLink } from "@/components/ui/BackLink";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { CampaignTransactionsPanel } from "@/components/admin/CampaignTransactionsPanel";

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

      <CampaignTransactionsPanel campaignTitle={item.title} transactions={transactions} />
    </div>
  );
}

import { notFound } from "next/navigation";
import { getDonorsSummary, getDonorTransactions } from "@/lib/admin-dummy-data";
import { formatRupiah, formatDate } from "@/lib/format";
import { BackLink } from "@/components/ui/BackLink";
import { StatusBadge } from "@/components/admin/StatusBadge";

type Props = {
  params: Promise<{ nama: string }>;
};

export default async function AdminDonorDetailPage({ params }: Props) {
  const { nama: namaParam } = await params;
  const nama = decodeURIComponent(namaParam);

  const donor = getDonorsSummary().find((d) => d.nama === nama);
  if (!donor) notFound();

  const transactions = getDonorTransactions(nama);

  return (
    <div>
      <BackLink href="/admin/donatur">Semua Donatur</BackLink>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold tracking-tight text-primary-900">{donor.nama}</h2>
          <p className="mt-1 text-sm text-primary-800/60">{donor.kontak}</p>
        </div>
        <div className="flex gap-1.5">
          {donor.segmentasi.map((s) => (
            <span
              key={s}
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${
                s === "Muzakki" ? "bg-secondary-50 text-secondary-700" : "bg-primary-50 text-primary-700"
              }`}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-primary-100 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary-800/50">Total Nominal</p>
          <p className="mt-1 text-xl font-extrabold text-primary-900">{formatRupiah(donor.totalNominal)}</p>
        </div>
        <div className="rounded-2xl border border-primary-100 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary-800/50">Jumlah Transaksi</p>
          <p className="mt-1 text-xl font-extrabold text-primary-900">{donor.jumlahTransaksi}</p>
        </div>
        <div className="rounded-2xl border border-primary-100 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary-800/50">Transaksi Terakhir</p>
          <p className="mt-1 text-xl font-extrabold text-primary-900">{formatDate(donor.transaksiTerakhir)}</p>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-primary-100 bg-white">
        <div className="border-b border-primary-100 p-5">
          <h3 className="text-base font-bold text-primary-900">Riwayat Transaksi</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead>
              <tr className="border-b border-primary-100 text-xs uppercase tracking-wide text-primary-800/50">
                <th className="px-4 py-3 font-semibold">Tanggal</th>
                <th className="px-4 py-3 font-semibold">Jenis</th>
                <th className="px-4 py-3 font-semibold">Campaign / Jenis Zakat</th>
                <th className="px-4 py-3 font-semibold">Nominal</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-50">
              {transactions.map((t) => (
                <tr key={t.id}>
                  <td className="px-4 py-3 text-primary-800/60">{formatDate(t.tanggal)}</td>
                  <td className="px-4 py-3 capitalize text-primary-800/70">{t.jenis}</td>
                  <td className="max-w-[220px] truncate px-4 py-3 text-primary-800/70">{t.labelJenis}</td>
                  <td className="px-4 py-3 font-semibold text-primary-900">{formatRupiah(t.nominal)}</td>
                  <td className="px-4 py-3">
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

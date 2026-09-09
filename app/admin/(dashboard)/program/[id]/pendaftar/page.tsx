import { notFound } from "next/navigation";
import { programs } from "@/lib/dummy-data";
import { getApplicantsByProgram } from "@/lib/admin-dummy-data";
import { formatDate } from "@/lib/format";
import { BackLink } from "@/components/ui/BackLink";
import { EmptyState } from "@/components/admin/EmptyState";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminProgramPendaftarPage({ params }: Props) {
  const { id } = await params;
  const item = programs.find((p) => p.id === id);
  if (!item) notFound();

  const applicants = getApplicantsByProgram(id);

  return (
    <div>
      <BackLink href={`/admin/program/${id}`}>Kembali ke Program</BackLink>
      <h2 className="mb-1 mt-4 text-xl font-extrabold tracking-tight text-primary-900">
        Daftar Pendaftar — {item.title}
      </h2>
      <p className="mb-6 text-sm text-primary-800/60">{applicants.length} orang mendaftar lewat form publik.</p>

      <div className="overflow-hidden rounded-2xl border border-primary-100 bg-white">
        {applicants.length === 0 ? (
          <EmptyState message="Belum ada yang mendaftar untuk program ini." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-primary-100 text-xs uppercase tracking-wide text-primary-800/50">
                  <th className="px-4 py-3 font-semibold">Nama</th>
                  <th className="px-4 py-3 font-semibold">Kontak</th>
                  <th className="px-4 py-3 font-semibold">Tanggal Daftar</th>
                  <th className="px-4 py-3 font-semibold">Catatan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary-50">
                {applicants.map((a) => (
                  <tr key={a.id}>
                    <td className="px-4 py-3 font-medium text-primary-900">{a.nama}</td>
                    <td className="px-4 py-3 text-primary-800/70">{a.kontak}</td>
                    <td className="px-4 py-3 text-primary-800/60">{formatDate(a.tanggalDaftar)}</td>
                    <td className="max-w-xs px-4 py-3 text-primary-800/70">{a.catatan}</td>
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

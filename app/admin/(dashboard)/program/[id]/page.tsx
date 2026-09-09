import { notFound } from "next/navigation";
import Link from "next/link";
import { programs } from "@/lib/dummy-data";
import { getApplicantsByProgram } from "@/lib/admin-dummy-data";
import { BackLink } from "@/components/ui/BackLink";
import { ProgramForm } from "@/components/admin/ProgramForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminProgramEditPage({ params }: Props) {
  const { id } = await params;
  const item = programs.find((p) => p.id === id);
  if (!item) notFound();

  const applicantCount = getApplicantsByProgram(id).length;

  return (
    <div>
      <BackLink href="/admin/program">Semua Program</BackLink>
      <div className="mb-6 mt-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-extrabold tracking-tight text-primary-900">Edit Program</h2>
        {item.tipeKonten === "pendaftaran" && (
          <Link
            href={`/admin/program/${id}/pendaftar`}
            className="text-sm font-semibold text-primary-700 hover:text-primary-900"
          >
            Lihat {applicantCount} Pendaftar &rarr;
          </Link>
        )}
      </div>
      <ProgramForm initial={item} />
    </div>
  );
}

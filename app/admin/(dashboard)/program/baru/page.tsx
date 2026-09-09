import { BackLink } from "@/components/ui/BackLink";
import { ProgramForm } from "@/components/admin/ProgramForm";

export default function AdminProgramBaruPage() {
  return (
    <div>
      <BackLink href="/admin/program">Semua Program</BackLink>
      <h2 className="mb-6 mt-4 text-xl font-extrabold tracking-tight text-primary-900">Tambah Program Baru</h2>
      <ProgramForm />
    </div>
  );
}

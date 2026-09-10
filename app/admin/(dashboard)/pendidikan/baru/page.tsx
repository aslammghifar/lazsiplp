import { BackLink } from "@/components/ui/BackLink";
import { ProgramForm } from "@/components/admin/ProgramForm";

export default function AdminPendidikanBaruPage() {
  return (
    <div>
      <BackLink href="/admin/pendidikan">Semua Program Pendidikan</BackLink>
      <h2 className="mb-6 mt-4 text-xl font-extrabold tracking-tight text-primary-900">Tambah Program Pendidikan</h2>
      <ProgramForm lockedKategori="pendidikan" backHref="/admin/pendidikan" />
    </div>
  );
}

import { BackLink } from "@/components/ui/BackLink";
import { BeritaForm } from "@/components/admin/BeritaForm";

export default function AdminSarsipBaruPage() {
  return (
    <div>
      <BackLink href="/admin/sarsip">Semua Update SARSIP</BackLink>
      <h2 className="mb-6 mt-4 text-xl font-extrabold tracking-tight text-primary-900">Tambah Update SARSIP</h2>
      <BeritaForm lockedKategori="sarsip" backHref="/admin/sarsip" />
    </div>
  );
}

import { BackLink } from "@/components/ui/BackLink";
import { BeritaForm } from "@/components/admin/BeritaForm";

export default function AdminBeritaBaruPage() {
  return (
    <div>
      <BackLink href="/admin/berita">Semua Berita</BackLink>
      <h2 className="mb-6 mt-4 text-xl font-extrabold tracking-tight text-primary-900">Tambah Berita Baru</h2>
      <BeritaForm />
    </div>
  );
}

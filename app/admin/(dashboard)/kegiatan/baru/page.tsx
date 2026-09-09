import { BackLink } from "@/components/ui/BackLink";
import { KegiatanForm } from "@/components/admin/KegiatanForm";

export default function AdminKegiatanBaruPage() {
  return (
    <div>
      <BackLink href="/admin/kegiatan">Semua Kegiatan</BackLink>
      <h2 className="mb-6 mt-4 text-xl font-extrabold tracking-tight text-primary-900">Tambah Kegiatan Baru</h2>
      <KegiatanForm />
    </div>
  );
}

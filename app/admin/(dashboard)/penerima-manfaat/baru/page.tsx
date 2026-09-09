import { BackLink } from "@/components/ui/BackLink";
import { BeneficiaryForm } from "@/components/admin/BeneficiaryForm";

export default function AdminPenerimaManfaatBaruPage() {
  return (
    <div>
      <BackLink href="/admin/penerima-manfaat">Semua Penerima Manfaat</BackLink>
      <h2 className="mb-6 mt-4 text-xl font-extrabold tracking-tight text-primary-900">Tambah Penerima Manfaat</h2>
      <BeneficiaryForm />
    </div>
  );
}

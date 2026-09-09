import { notFound } from "next/navigation";
import { adminBeneficiaries } from "@/lib/admin-dummy-data";
import { BackLink } from "@/components/ui/BackLink";
import { BeneficiaryForm } from "@/components/admin/BeneficiaryForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminPenerimaManfaatEditPage({ params }: Props) {
  const { id } = await params;
  const item = adminBeneficiaries.find((b) => b.id === id);
  if (!item) notFound();

  return (
    <div>
      <BackLink href="/admin/penerima-manfaat">Semua Penerima Manfaat</BackLink>
      <h2 className="mb-6 mt-4 text-xl font-extrabold tracking-tight text-primary-900">Edit Penerima Manfaat</h2>
      <BeneficiaryForm initial={item} />
    </div>
  );
}

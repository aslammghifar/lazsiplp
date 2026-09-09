import { BackLink } from "@/components/ui/BackLink";
import { CampaignForm } from "@/components/admin/CampaignForm";

export default function AdminDonasiBaruPage() {
  return (
    <div>
      <BackLink href="/admin/donasi">Semua Campaign</BackLink>
      <h2 className="mb-6 mt-4 text-xl font-extrabold tracking-tight text-primary-900">Tambah Campaign Baru</h2>
      <CampaignForm />
    </div>
  );
}

import { notFound } from "next/navigation";
import { campaigns } from "@/lib/dummy-data";
import { BackLink } from "@/components/ui/BackLink";
import { CampaignForm } from "@/components/admin/CampaignForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminDonasiEditPage({ params }: Props) {
  const { id } = await params;
  const item = campaigns.find((c) => c.id === id);
  if (!item) notFound();

  return (
    <div>
      <BackLink href={`/admin/donasi/${id}`}>Detail Campaign</BackLink>
      <h2 className="mb-6 mt-4 text-xl font-extrabold tracking-tight text-primary-900">Edit Campaign</h2>
      <CampaignForm initial={item} />
    </div>
  );
}

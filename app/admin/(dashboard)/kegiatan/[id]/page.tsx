import { notFound } from "next/navigation";
import { activities } from "@/lib/dummy-data";
import { BackLink } from "@/components/ui/BackLink";
import { KegiatanForm } from "@/components/admin/KegiatanForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminKegiatanEditPage({ params }: Props) {
  const { id } = await params;
  const item = activities.find((a) => a.id === id);
  if (!item) notFound();

  return (
    <div>
      <BackLink href="/admin/kegiatan">Semua Kegiatan</BackLink>
      <h2 className="mb-6 mt-4 text-xl font-extrabold tracking-tight text-primary-900">Edit Kegiatan</h2>
      <KegiatanForm initial={item} />
    </div>
  );
}

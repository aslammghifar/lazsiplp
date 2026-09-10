import { notFound } from "next/navigation";
import { newsList } from "@/lib/dummy-data";
import { BackLink } from "@/components/ui/BackLink";
import { BeritaForm } from "@/components/admin/BeritaForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminBeritaEditPage({ params }: Props) {
  const { id } = await params;
  const item = newsList.find((n) => n.id === id && n.kategori === "umum");
  if (!item) notFound();

  return (
    <div>
      <BackLink href="/admin/berita">Semua Berita</BackLink>
      <h2 className="mb-6 mt-4 text-xl font-extrabold tracking-tight text-primary-900">Edit Berita</h2>
      <BeritaForm initial={item} lockedKategori="umum" />
    </div>
  );
}

import { newsList } from "@/lib/dummy-data";
import { NewsCard } from "@/components/cards/NewsCard";
import { PinnedGridSection } from "@/components/ui/PinnedGridSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function SarsipBerita() {
  const items = newsList.filter((n) => n.kategori === "sarsip" && n.status === "published");
  const pinned = items.filter((n) => n.isPinned);
  const rest = items.filter((n) => !n.isPinned);

  return (
    <section id="sarsip" className="bg-primary-50/60">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="SARSIP"
          title="SARSIP — Siaga & Relawan LAZSIP"
          description="Kabar unit tanggap bencana dan layanan darurat di bawah naungan LAZSIP."
        />
        <div className="mt-10">
          <PinnedGridSection
            pinnedItems={pinned}
            gridItems={rest}
            renderItem={(item) => <NewsCard item={item} />}
            renderPinnedItem={(item) => <NewsCard item={item} featured />}
            seeAllHref="/berita?kategori=sarsip"
          />
        </div>
      </div>
    </section>
  );
}

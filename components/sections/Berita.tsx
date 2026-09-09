import { newsList } from "@/lib/dummy-data";
import { NewsCard } from "@/components/cards/NewsCard";
import { PinnedGridSection } from "@/components/ui/PinnedGridSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Berita() {
  const items = newsList.filter((n) => n.kategori === "umum" && n.status === "published");
  const pinned = items.filter((n) => n.isPinned);
  const rest = items.filter((n) => !n.isPinned);

  return (
    <section id="berita" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
      <SectionHeading
        eyebrow="Berita & Kabar"
        title="Berita Terbaru LAZSIP"
        description="Ikuti perkembangan program dan kegiatan penyaluran dana umat."
      />
      <div className="mt-10">
        <PinnedGridSection
          pinnedItems={pinned}
          gridItems={rest}
          renderItem={(item) => <NewsCard item={item} />}
          renderPinnedItem={(item) => <NewsCard item={item} featured />}
          seeAllHref="/berita?kategori=umum"
        />
      </div>
    </section>
  );
}

import { activities } from "@/lib/dummy-data";
import { ActivityCard } from "@/components/cards/ActivityCard";
import { PinnedGridSection } from "@/components/ui/PinnedGridSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Kegiatan() {
  const pinned = activities.filter((a) => a.isPinned);
  const rest = activities.filter((a) => !a.isPinned);

  return (
    <section id="kegiatan" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
      <SectionHeading
        eyebrow="Kegiatan"
        title="Agenda & Kegiatan LAZSIP"
        description="Dokumentasi dan agenda kegiatan lapangan bersama relawan dan masyarakat dampingan."
      />
      <div className="mt-10">
        <PinnedGridSection
          pinnedItems={pinned}
          gridItems={rest}
          renderItem={(item) => <ActivityCard item={item} />}
          renderPinnedItem={(item) => <ActivityCard item={item} featured />}
          seeAllHref="/kegiatan"
        />
      </div>
    </section>
  );
}

import { campaigns } from "@/lib/dummy-data";
import { CampaignCard } from "@/components/cards/CampaignCard";
import { PinnedGridSection } from "@/components/ui/PinnedGridSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Donasi() {
  const visible = campaigns.filter((c) => c.status !== "nonaktif");
  const pinned = visible.filter((c) => c.isPinned);
  const rest = visible.filter((c) => !c.isPinned);

  return (
    <section id="donasi" className="bg-primary-50/60">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="Donasi"
          title="Campaign Donasi Aktif"
          description="Salurkan donasi Anda untuk campaign pilihan dan pantau perkembangan dananya secara real-time."
        />
        <div className="mt-10">
          <PinnedGridSection
            pinnedItems={pinned}
            gridItems={rest}
            renderItem={(item) => <CampaignCard item={item} />}
            renderPinnedItem={(item) => <CampaignCard item={item} featured />}
            seeAllHref="/donasi"
          />
        </div>
      </div>
    </section>
  );
}

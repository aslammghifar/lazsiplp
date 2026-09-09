import { programs, type KategoriProgram } from "@/lib/dummy-data";
import { ProgramCard } from "@/components/cards/ProgramCard";
import { PinnedGridSection } from "@/components/ui/PinnedGridSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ProgramSection({
  id,
  kategori,
  eyebrow,
  title,
  description,
  seeAllHref,
  tinted = false,
}: {
  id: string;
  kategori: KategoriProgram;
  eyebrow: string;
  title: string;
  description: string;
  seeAllHref: string;
  tinted?: boolean;
}) {
  const items = programs.filter((p) => p.kategori === kategori);
  const pinned = items.filter((p) => p.isPinned);
  const rest = items.filter((p) => !p.isPinned);

  return (
    <section id={id} className={tinted ? "bg-primary-50/60" : undefined}>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <div className="mt-10">
          <PinnedGridSection
            pinnedItems={pinned}
            gridItems={rest}
            renderItem={(item) => <ProgramCard item={item} />}
            renderPinnedItem={(item) => <ProgramCard item={item} featured />}
            seeAllHref={seeAllHref}
          />
        </div>
      </div>
    </section>
  );
}

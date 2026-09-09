import { Hero } from "@/components/sections/Hero";
import { MitraMarquee } from "@/components/sections/MitraMarquee";
import { Tentang } from "@/components/sections/Tentang";
import { ZakatCalculator } from "@/components/sections/ZakatCalculator";
import { Berita } from "@/components/sections/Berita";
import { Donasi } from "@/components/sections/Donasi";
import { ProgramSection } from "@/components/sections/ProgramSection";
import { SarsipBerita } from "@/components/sections/SarsipBerita";
import { Kegiatan } from "@/components/sections/Kegiatan";
import { PenyaluranBantuan } from "@/components/sections/PenyaluranBantuan";
import { Transparansi } from "@/components/sections/Transparansi";
import { getGoldPrice } from "@/lib/gold-price";

export default async function Home() {
  const goldPrice = await getGoldPrice();

  return (
    <>
      <Hero />
      <MitraMarquee />
      <Tentang />
      <ZakatCalculator goldPrice={goldPrice} />
      <Berita />
      <Donasi />
      <ProgramSection
        id="program"
        kategori="umum"
        eyebrow="Program Pemberdayaan"
        title="Program Pemberdayaan Umat"
        description="Program pemberdayaan ekonomi dan sosial bagi masyarakat dampingan LAZSIP."
        seeAllHref="/program"
      />
      <ProgramSection
        id="divisi-pendidikan"
        kategori="pendidikan"
        eyebrow="Divisi Pendidikan"
        title="Divisi Pendidikan LAZSIP"
        description="Program beasiswa dan pembinaan pendidikan bagi anak yatim dan dhuafa."
        seeAllHref="/program?kategori=pendidikan"
        tinted
      />
      <SarsipBerita />
      <Kegiatan />
      <PenyaluranBantuan />
      <Transparansi />
    </>
  );
}

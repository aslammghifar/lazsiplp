import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { programs, getOtherPrograms, KATEGORI_PROGRAM_LABEL } from "@/lib/dummy-data";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { BackLink } from "@/components/ui/BackLink";
import { Button } from "@/components/ui/Button";
import { ProgramCard } from "@/components/cards/ProgramCard";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return programs.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = programs.find((p) => p.slug === slug);
  if (!item) return {};
  return { title: `${item.title} — LAZSIP`, description: item.description };
}

export default async function ProgramDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = programs.find((p) => p.slug === slug);
  if (!item) notFound();

  const otherPrograms = getOtherPrograms(item);
  const kategoriHref =
    item.kategori === "umum" ? "/program" : `/program?kategori=${item.kategori}`;

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32">
      <article className="mx-auto max-w-3xl">
        <BackLink href={kategoriHref}>Semua Program</BackLink>

        <span className="mb-4 mt-6 inline-flex items-center rounded-full bg-primary-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-primary-800">
          {KATEGORI_PROGRAM_LABEL[item.kategori]}
        </span>

        <h1 className="text-balance text-[2rem] font-extrabold leading-[1.15] tracking-tight text-primary-900 sm:text-5xl">
          {item.title}
        </h1>

        <ImagePlaceholder
          variant="program"
          src={item.imageUrl}
          alt={item.title}
          className="mt-8 aspect-[16/9] w-full rounded-3xl"
        />

        {item.tipeKonten === "berita" ? (
          <>
            <div className="mt-8 flex flex-col gap-5">
              {item.content.map((paragraph, i) => (
                <p key={i} className="text-base leading-[1.7] text-primary-900/80 sm:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-12 border-t border-primary-100 pt-8">
              <Button href={kategoriHref} variant="secondary">
                Kembali ke Semua Program
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="mt-8 text-base leading-[1.7] text-primary-900/80 sm:text-lg">
              {item.description}
            </p>

            <div className="mt-8 rounded-2xl border border-primary-100 bg-primary-50/60 p-6">
              <h2 className="text-base font-bold text-primary-900">Syarat &amp; Ketentuan</h2>
              <ul className="mt-3 flex flex-col gap-2.5">
                {item.syarat.map((s) => (
                  <li key={s} className="flex items-start gap-2.5 text-sm text-primary-800/80">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="mt-0.5 h-4 w-4 shrink-0 text-primary-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 border-t border-primary-100 pt-8">
              {item.pendaftaranDibuka ? (
                <a
                  href={item.formUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-800"
                >
                  Daftar Sekarang
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />
                  </svg>
                </a>
              ) : (
                <span className="inline-flex items-center rounded-full bg-primary-900/5 px-6 py-3 text-sm font-semibold text-primary-900/50">
                  Pendaftaran Ditutup
                </span>
              )}
              <p className="mt-3 text-xs text-primary-800/50">
                Anda akan diarahkan ke Google Form eksternal untuk mengisi pendaftaran.
              </p>
            </div>
          </>
        )}
      </article>

      {otherPrograms.length > 0 && (
        <div className="mt-16 border-t border-primary-100 pt-12">
          <h2 className="text-xl font-extrabold tracking-tight text-primary-900 sm:text-2xl">
            Program Lainnya
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {otherPrograms.map((p) => (
              <ProgramCard key={p.id} item={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

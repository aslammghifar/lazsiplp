import { mitraList } from "@/lib/dummy-data";

function MitraBadge({ name }: { name: string }) {
  return (
    <span className="flex shrink-0 items-center gap-2 rounded-full border border-primary-100 bg-primary-50/60 px-4 py-2 text-sm font-semibold text-primary-800/80">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 shrink-0 text-primary-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 21V5a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v16M12 21v-9a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v9M3 21h18M7.5 7.5h1M7.5 11h1M7.5 14.5h1M15.5 12h1M15.5 15.5h1" />
      </svg>
      {name}
    </span>
  );
}

export function MitraMarquee() {
  // Digandakan 2x supaya animasi -50% (lihat .animate-marquee di globals.css) loop mulus tanpa jeda.
  const doubled = [...mitraList, ...mitraList];

  return (
    <section aria-label="Mitra kerja sama" className="bg-background py-7">
      <p className="mb-5 text-center text-xs font-bold uppercase tracking-wide text-primary-800/45">
        Mitra Kami
      </p>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-28" />

        <div className="flex w-max gap-3 animate-marquee">
          {doubled.map((name, i) => (
            <MitraBadge key={`${name}-${i}`} name={name} />
          ))}
        </div>
      </div>
    </section>
  );
}

import { transparencyStats } from "@/lib/dummy-data";
import { formatRupiah, formatNumber } from "@/lib/format";
import { StatCounter } from "@/components/ui/StatCounter";

export function Transparansi() {
  return (
    <section id="transparansi" className="bg-primary-900">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="mb-10">
          <span className="mb-4 inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-secondary-200">
            Transparansi
          </span>
          <h2 className="text-balance text-[2rem] font-extrabold leading-[1.15] tracking-tight text-white sm:text-5xl">
            Dikelola Amanah, Dilaporkan Terbuka
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-secondary-200 sm:text-lg">
            Kami hanya menampilkan angka agregat untuk menjaga privasi donatur
            dan penerima manfaat — bukan daftar transaksi perorangan.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <StatCounter
            icon="fund"
            value={formatRupiah(transparencyStats.totalCollected)}
            label="Total dana terkumpul"
          />
          <StatCounter
            icon="donors"
            value={formatNumber(transparencyStats.totalDonors)}
            label="Donatur & muzakki"
          />
          <StatCounter
            icon="beneficiaries"
            value={formatNumber(transparencyStats.totalBeneficiaries)}
            label="Penerima manfaat terbantu"
          />
        </div>
      </div>
    </section>
  );
}

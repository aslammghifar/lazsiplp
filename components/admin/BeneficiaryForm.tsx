"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { TIPE_BANTUAN_LABEL, type TipeBantuan } from "@/lib/dummy-data";
import type { AdminBeneficiary, StatusPernikahan } from "@/lib/admin-dummy-data";
import { useToast } from "@/components/ui/Toast";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

function hitungUmur(tanggalLahir: string): number | null {
  if (!tanggalLahir) return null;
  const lahir = new Date(tanggalLahir);
  if (Number.isNaN(lahir.getTime())) return null;
  const now = new Date();
  let umur = now.getFullYear() - lahir.getFullYear();
  const belumUlangTahun =
    now.getMonth() < lahir.getMonth() || (now.getMonth() === lahir.getMonth() && now.getDate() < lahir.getDate());
  if (belumUlangTahun) umur -= 1;
  return Math.max(0, umur);
}

export function BeneficiaryForm({ initial }: { initial?: AdminBeneficiary }) {
  const router = useRouter();
  const { showToast } = useToast();
  const isEdit = !!initial;

  // --- Bagian Tampil di Publik ---
  const [nama, setNama] = useState(initial?.nama ?? "");
  const [jenisKelamin, setJenisKelamin] = useState<"L" | "P">(initial?.jenisKelamin ?? "P");
  const [masalahYangDihadapi, setMasalahYangDihadapi] = useState(initial?.masalahYangDihadapi ?? "");
  const [kebutuhan, setKebutuhan] = useState(initial?.kebutuhan ?? "");
  const [tahuInfoDari, setTahuInfoDari] = useState(initial?.tahuInfoDari ?? "");
  const [tipeBantuan, setTipeBantuan] = useState<TipeBantuan>(initial?.tipeBantuan ?? "kebutuhan_pokok");
  const [nominalDiterima, setNominalDiterima] = useState(initial ? String(initial.nominalDiterima) : "");
  const [namaVerifikator, setNamaVerifikator] = useState(initial?.namaVerifikator ?? "");
  const [daerahCakupanVerifikator, setDaerahCakupanVerifikator] = useState(initial?.daerahCakupanVerifikator ?? "");
  const [, setFoto] = useState<string | null>(null);

  // --- Bagian Khusus Admin (Tidak Tampil ke Publik) ---
  const [alamat, setAlamat] = useState(initial?.alamat ?? "");
  const [tanggalLahir, setTanggalLahir] = useState(initial?.tanggalLahir ?? "");
  const [statusPernikahan, setStatusPernikahan] = useState<StatusPernikahan>(initial?.statusPernikahan ?? "Belum Menikah");

  const [submitting, setSubmitting] = useState(false);

  const umur = useMemo(() => hitungUmur(tanggalLahir), [tanggalLahir]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nama.trim()) {
      showToast("Nama wajib diisi.", "error");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      showToast(`Data "${nama}" ${isEdit ? "diperbarui" : "ditambahkan"} (simulasi — belum tersimpan permanen).`);
      router.push("/admin/penerima-manfaat");
    }, 500);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Bagian Tampil di Publik */}
      <div className="rounded-3xl border border-primary-100 bg-white p-6">
        <div className="mb-5 flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary-50 text-secondary-700">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
          </span>
          <h3 className="text-base font-bold text-primary-900">Tampil di Publik</h3>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <ImageUploadField label="Foto" initialPreview={initial?.imageUrl} onChange={setFoto} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-primary-900">Nama</label>
            <input
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="rounded-full border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-primary-900">Jenis Kelamin</label>
            <select
              value={jenisKelamin}
              onChange={(e) => setJenisKelamin(e.target.value as "L" | "P")}
              className="rounded-full border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
            >
              <option value="P">Perempuan</option>
              <option value="L">Laki-laki</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-primary-900">Umur (dihitung otomatis)</label>
            <div className="rounded-full border border-primary-100 bg-primary-50/60 px-4 py-2.5 text-sm text-primary-800/70">
              {umur !== null ? `${umur} tahun` : "Isi tanggal lahir di bagian khusus admin"}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-primary-900">Cara Mengetahui LAZSIP</label>
            <input
              value={tahuInfoDari}
              onChange={(e) => setTahuInfoDari(e.target.value)}
              placeholder="mis. Tokoh masyarakat setempat"
              className="rounded-full border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="text-sm font-medium text-primary-900">Masalah yang Dihadapi</label>
            <textarea
              value={masalahYangDihadapi}
              onChange={(e) => setMasalahYangDihadapi(e.target.value)}
              rows={2}
              className="rounded-2xl border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="text-sm font-medium text-primary-900">Kebutuhan</label>
            <textarea
              value={kebutuhan}
              onChange={(e) => setKebutuhan(e.target.value)}
              rows={2}
              className="rounded-2xl border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-primary-900">Tipe Bantuan</label>
            <select
              value={tipeBantuan}
              onChange={(e) => setTipeBantuan(e.target.value as TipeBantuan)}
              className="rounded-full border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
            >
              {(Object.entries(TIPE_BANTUAN_LABEL) as [TipeBantuan, string][]).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-primary-900">Nominal Diterima</label>
            <input
              inputMode="numeric"
              value={nominalDiterima}
              onChange={(e) => setNominalDiterima(e.target.value.replace(/[^0-9]/g, ""))}
              className="rounded-full border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-primary-900">Nama Verifikator</label>
            <input
              value={namaVerifikator}
              onChange={(e) => setNamaVerifikator(e.target.value)}
              className="rounded-full border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-primary-900">Daerah Cakupan Verifikator</label>
            <input
              value={daerahCakupanVerifikator}
              onChange={(e) => setDaerahCakupanVerifikator(e.target.value)}
              className="rounded-full border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>
        </div>
      </div>

      {/* Bagian Khusus Admin */}
      <div className="rounded-3xl border-2 border-dashed border-rose-200 bg-rose-50/40 p-6">
        <div className="mb-2 flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-rose-600">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 10V7a6 6 0 1 1 12 0v3M5 10h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1z" />
            </svg>
          </span>
          <h3 className="text-base font-bold text-rose-900">Khusus Admin (Tidak Tampil ke Publik)</h3>
        </div>
        <p className="mb-5 text-xs text-rose-700/80">
          🔒 Data pada bagian bertanda gembok ini tidak akan pernah ditampilkan ke halaman publik.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-primary-900">Tanggal Lahir Asli</label>
            <input
              type="date"
              value={tanggalLahir}
              onChange={(e) => setTanggalLahir(e.target.value)}
              className="rounded-full border border-rose-200 bg-white px-4 py-2.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-rose-300"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-primary-900">Status Pernikahan</label>
            <select
              value={statusPernikahan}
              onChange={(e) => setStatusPernikahan(e.target.value as StatusPernikahan)}
              className="rounded-full border border-rose-200 bg-white px-4 py-2.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-rose-300"
            >
              <option value="Belum Menikah">Belum Menikah</option>
              <option value="Menikah">Menikah</option>
              <option value="Janda">Janda</option>
              <option value="Duda">Duda</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="text-sm font-medium text-primary-900">Alamat Lengkap</label>
            <textarea
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              rows={2}
              className="rounded-2xl border border-rose-200 bg-white px-4 py-2.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-rose-300"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-fit items-center justify-center rounded-full bg-primary-900 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Tambah Data"}
      </button>
    </form>
  );
}

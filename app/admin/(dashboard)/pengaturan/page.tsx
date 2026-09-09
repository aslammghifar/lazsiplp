"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { useToast } from "@/components/ui/Toast";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default function AdminPengaturanPage() {
  const { showToast } = useToast();

  const [whatsapp, setWhatsapp] = useState(siteConfig.whatsappNumber);
  const [email, setEmail] = useState(siteConfig.email);
  const [address, setAddress] = useState(siteConfig.address);
  const [social, setSocial] = useState(siteConfig.social);
  const [jamOperasional, setJamOperasional] = useState(siteConfig.jamOperasional);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);

  function updateJam(index: number, field: "hari" | "jam", value: string) {
    setJamOperasional((prev) => prev.map((j, i) => (i === index ? { ...j, [field]: value } : j)));
  }

  function handleSaveGeneral() {
    showToast("Pengaturan umum tersimpan (simulasi — belum ditulis ke server).");
  }

  function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setPasswordError(null);
    if (!oldPassword || !newPassword || !confirmPassword) {
      setPasswordError("Semua field wajib diisi.");
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError("Kata sandi baru minimal 8 karakter.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Konfirmasi kata sandi tidak cocok.");
      return;
    }
    showToast("Kata sandi berhasil diganti (simulasi — belum ditulis ke server).");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }

  return (
    <div className="flex flex-col gap-8">
      <AdminPageHeader
        title="Pengaturan Umum"
        description="Sumber tunggal untuk nomor WA CS, tautan sosial media, dan info kontak — dipakai di semua halaman publik."
      />

      <div className="rounded-3xl border border-primary-100 bg-white p-6">
        <h3 className="text-base font-bold text-primary-900">Kontak &amp; Alamat</h3>
        <p className="mt-1 text-sm text-primary-800/55">
          Nomor WhatsApp ini dipakai floating tombol WA di semua halaman publik — satu sumber
          tunggal, jangan diinput beda-beda di tempat lain.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-primary-900">Nomor WhatsApp CS</label>
            <input
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value.replace(/[^0-9]/g, ""))}
              placeholder="62812xxxxxxxx"
              className="rounded-full border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-primary-900">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-full border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="text-sm font-medium text-primary-900">Alamat Kantor</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={2}
              className="rounded-2xl border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>
        </div>

        <div className="mt-5">
          <p className="mb-2 text-sm font-medium text-primary-900">Jam Operasional</p>
          <div className="flex flex-col gap-2">
            {jamOperasional.map((j, i) => (
              <div key={i} className="grid grid-cols-2 gap-2">
                <input
                  value={j.hari}
                  onChange={(e) => updateJam(i, "hari", e.target.value)}
                  className="rounded-full border border-primary-200 bg-white px-4 py-2 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
                />
                <input
                  value={j.jam}
                  onChange={(e) => updateJam(i, "jam", e.target.value)}
                  className="rounded-full border border-primary-200 bg-white px-4 py-2 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <p className="mb-2 text-sm font-medium text-primary-900">Tautan Sosial Media</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {(["instagram", "facebook", "youtube", "tiktok"] as (keyof typeof social)[]).map((key) => (
              <div key={key} className="flex flex-col gap-1.5">
                <label className="text-xs font-medium capitalize text-primary-800/60">{key}</label>
                <input
                  value={social[key]}
                  onChange={(e) => setSocial((prev) => ({ ...prev, [key]: e.target.value }))}
                  placeholder={`https://${key}.com/lazsip`}
                  className="rounded-full border border-primary-200 bg-white px-4 py-2 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={handleSaveGeneral}
            className="rounded-full bg-primary-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-800"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>

      <form onSubmit={handleChangePassword} className="rounded-3xl border border-primary-100 bg-white p-6">
        <h3 className="text-base font-bold text-primary-900">Ganti Kata Sandi</h3>
        {passwordError && <p className="mt-2 text-sm text-red-600">{passwordError}</p>}
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-primary-900">Kata Sandi Lama</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="rounded-full border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-primary-900">Kata Sandi Baru</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="rounded-full border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-primary-900">Konfirmasi Kata Sandi Baru</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="rounded-full border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <button
            type="submit"
            className="rounded-full bg-primary-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-800"
          >
            Ganti Kata Sandi
          </button>
        </div>
      </form>
    </div>
  );
}

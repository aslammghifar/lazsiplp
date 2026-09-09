"use client";

import { useState } from "react";

const MAX_SIZE_MB = 2;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function ImageUploadField({
  initialPreview,
  onChange,
  label = "Gambar",
}: {
  initialPreview?: string;
  onChange: (dataUrl: string | null) => void;
  label?: string;
}) {
  const [preview, setPreview] = useState<string | null>(initialPreview ?? null);
  const [error, setError] = useState<string | null>(null);

  function handleFile(file: File | null) {
    setError(null);
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Format tidak didukung. Gunakan JPG, PNG, atau WEBP.");
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`Ukuran file maksimal ${MAX_SIZE_MB}MB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setPreview(dataUrl);
      onChange(dataUrl);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-primary-900">{label}</label>
      <div className="flex items-center gap-4">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-primary-200 bg-primary-50/60">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="Preview" className="h-full w-full object-cover" />
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-7 w-7 text-primary-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.5-4.5a2 2 0 0 1 2.8 0L16 16M14 14l1.5-1.5a2 2 0 0 1 2.8 0L20 14M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z" />
            </svg>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="inline-flex w-fit cursor-pointer items-center rounded-full border border-primary-200 px-4 py-2 text-sm font-semibold text-primary-800 transition-colors hover:border-primary-400">
            Pilih File
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
            />
          </label>
          <p className="text-xs text-primary-800/50">Maks {MAX_SIZE_MB}MB — JPG, PNG, atau WEBP.</p>
          {error && <p className="text-xs text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}

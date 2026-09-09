// Overlay gradient hijau tua untuk card pinned (Berita, Donasi, Program, Kegiatan).
// Multi color-stop (bukan cuma 2 titik) supaya transisi dari foto ke overlay menyatu halus,
// bukan terlihat sebagai garis batas kotak. Warna = --color-primary-900 (#16301f) dalam rgb.
export const PINNED_OVERLAY_STYLE: React.CSSProperties = {
  background:
    "linear-gradient(to bottom, rgba(22,48,31,0) 0%, rgba(22,48,31,0) 30%, rgba(22,48,31,0.15) 45%, rgba(22,48,31,0.5) 65%, rgba(22,48,31,0.85) 85%, rgba(22,48,31,0.95) 100%)",
};

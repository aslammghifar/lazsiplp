export function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("id-ID").format(value);
}

// Dipakai badge tanggal ala kalender kecil (mis. "DES 12") pada card kegiatan yang di-pin.
export function formatCalendarParts(iso: string): { day: number; month: string } {
  const date = new Date(iso);
  const month = new Intl.DateTimeFormat("id-ID", { month: "short" })
    .format(date)
    .replace(".", "")
    .toUpperCase();
  return { day: date.getDate(), month };
}

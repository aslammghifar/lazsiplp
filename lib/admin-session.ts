const KEY = "lazsip_admin_session";

// Simulasi sesi admin lewat localStorage — HANYA untuk kebutuhan pratinjau alur UI di fase
// frontend-only ini (lihat CLAUDE.md). WAJIB diganti sesi NextAuth asli (httpOnly cookie +
// middleware server-side) sebelum production — localStorage bisa dibaca/diubah bebas dari client.
export function isAdminLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(KEY) === "true";
}

export function setAdminLoggedIn(value: boolean) {
  if (typeof window === "undefined") return;
  if (value) window.localStorage.setItem(KEY, "true");
  else window.localStorage.removeItem(KEY);
}

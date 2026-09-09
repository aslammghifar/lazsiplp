import { AdminShell } from "@/components/admin/AdminShell";

// NOTE: belum ada guard autentikasi di sini — sengaja, karena fase ini fokus tampilan/frontend
// dulu (lihat CLAUDE.md). Sebelum production, layout ini WAJIB dibungkus pengecekan sesi admin
// (mis. cek session NextAuth di server component ini, redirect ke /admin/login kalau belum login).
export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}

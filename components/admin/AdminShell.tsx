"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { isAdminLoggedIn, setAdminLoggedIn } from "@/lib/admin-session";
import { LazsipLogo } from "@/components/ui/LazsipLogo";

function noopSubscribe() {
  return () => {};
}

function getServerAuthSnapshot() {
  return false;
}

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: "M4 13h6V4H4v9zM4 20h6v-5H4v5zM14 20h6V11h-6v9zM14 4v5h6V4h-6z" },
  { href: "/admin/konten-umum", label: "Konten Umum", icon: "M4 12l8-8 8 8M6 10v10h5v-6h2v6h5V10" },
  { href: "/admin/berita", label: "Berita", icon: "M4 4h16v4H4zM4 10h16v10H4zM8 14h8M8 17h5" },
  { href: "/admin/donasi", label: "Donasi & Campaign", icon: "M12 3v18M7 7l5-4 5 4M6 12h12M6 17h12" },
  { href: "/admin/program", label: "Program", icon: "M12 3l8 4-8 4-8-4 8-4zM4 11v6l8 4 8-4v-6" },
  { href: "/admin/kegiatan", label: "Kegiatan", icon: "M8 3v4M16 3v4M4 9h16M5 6h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z" },
  { href: "/admin/penerima-manfaat", label: "Penerima Manfaat", icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" },
  { href: "/admin/donatur", label: "Donatur", icon: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2 20c0-3 2.7-5.5 7-5.5s7 2.5 7 5.5M14.5 14.8c3.5.3 5.5 2.6 5.5 5.2" },
  { href: "/admin/transaksi", label: "Riwayat Transaksi", icon: "M3 7a2 2 0 0 1 2-2h13a1 1 0 0 1 1 1v2M3 7v10a2 2 0 0 0 2 2h14a1 1 0 0 0 1-1v-4M3 7l3-3h9M15 13h3a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-3a1 1 0 0 0 0 4z" },
  { href: "/admin/pembayaran", label: "Referensi Biaya", icon: "M2 8h20M2 6a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6zM6 16h4" },
  { href: "/admin/pengaturan", label: "Pengaturan", icon: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06A2 2 0 1 1 7.04 4.29l.06.06A1.65 1.65 0 0 0 8.92 4.6 1.65 1.65 0 0 0 10 3.09V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.14.36.4.66.73.86.24.15.52.23.8.23H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" },
];

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
      {NAV_ITEMS.map((item) => {
        const isActive = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
              isActive ? "bg-primary-900 text-white" : "text-primary-800/70 hover:bg-primary-50"
            }`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4.5 w-4.5 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
            </svg>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarBrand() {
  return (
    <div className="flex items-center gap-2.5 border-b border-primary-100 px-6 py-5">
      <LazsipLogo />
      <span className="text-base font-extrabold tracking-tight text-primary-900">LAZSIP Admin</span>
    </div>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  // useSyncExternalStore (bukan useEffect+setState) supaya baca localStorage ini tidak memicu
  // hydration mismatch — snapshot server selalu "false", lalu disinkronkan begitu di client.
  const authChecked = useSyncExternalStore(noopSubscribe, isAdminLoggedIn, getServerAuthSnapshot);

  useEffect(() => {
    if (!authChecked) {
      router.replace("/admin/login");
    }
  }, [authChecked, router]);

  function handleLogout() {
    setAdminLoggedIn(false);
    router.push("/admin/login");
  }

  const activeItem = NAV_ITEMS.find((item) =>
    item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href)
  );

  if (!authChecked) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar desktop */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-primary-100 bg-white lg:flex">
        <SidebarBrand />
        <NavLinks pathname={pathname} />
        <div className="border-t border-primary-100 p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-primary-800/60 transition-colors hover:bg-primary-50"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4.5 w-4.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
            Keluar
          </button>
        </div>
      </aside>

      {/* Sidebar mobile (drawer) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-primary-900/40"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <aside className="absolute inset-y-0 left-0 flex w-72 flex-col bg-white shadow-xl">
            <SidebarBrand />
            <NavLinks pathname={pathname} onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-3 border-b border-primary-100 bg-white px-4 py-4 sm:px-6 lg:px-8">
          <button
            type="button"
            aria-label="Buka menu"
            onClick={() => setMobileOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-primary-900 hover:bg-primary-50 lg:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
          <h1 className="text-base font-bold text-primary-900">{activeItem?.label ?? "Admin"}</h1>

          <div className="ml-auto flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-50 text-xs font-bold text-primary-800">
              AD
            </span>
            <span className="hidden text-sm font-medium text-primary-800/70 sm:inline">Admin LAZSIP</span>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

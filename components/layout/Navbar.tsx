"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/Button";
import { LazsipLogo } from "@/components/ui/LazsipLogo";
import { smoothScrollToId } from "@/lib/smooth-scroll";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    const id = href.replace("#", "");
    if (pathname === "/" && smoothScrollToId(id)) {
      e.preventDefault();
    } else if (pathname !== "/") {
      e.preventDefault();
      router.push(`/${href}`);
    }
    setOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full bg-white/95 px-4 py-2.5 shadow-md shadow-primary-900/5 backdrop-blur-md sm:px-6">
        <Link href="#" className="flex items-center gap-2.5">
          <LazsipLogo />
          <span className="text-lg font-extrabold tracking-tight text-primary-900">
            {siteConfig.name}
          </span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-sm font-medium text-primary-800/75 transition-colors hover:text-primary-900"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <Button
            href="#kalkulator-zakat"
            variant="primary"
            className="px-5 py-2.5"
            onClick={(e) => handleNavClick(e, "#kalkulator-zakat")}
          >
            Bayar Zakat
          </Button>
        </div>

        <button
          type="button"
          aria-label="Buka menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-primary-900 transition-colors lg:hidden"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-6 w-6">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-3xl border border-primary-100 bg-white px-5 py-5 shadow-lg lg:hidden">
          <div className="flex flex-col gap-4">
            {siteConfig.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm font-medium text-primary-800/80"
              >
                {item.label}
              </a>
            ))}
            <Button
              href="#kalkulator-zakat"
              variant="primary"
              onClick={(e) => handleNavClick(e, "#kalkulator-zakat")}
            >
              Bayar Zakat
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

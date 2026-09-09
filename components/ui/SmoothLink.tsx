"use client";

import { usePathname, useRouter } from "next/navigation";
import { smoothScrollToId, smoothScrollToTop } from "@/lib/smooth-scroll";

// Anchor link ("#section" atau "#" untuk ke atas) yang smooth-scroll di halaman beranda,
// dan fallback navigasi ke beranda dulu kalau dipanggil dari halaman lain.
export function SmoothLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const id = href.replace("#", "");
    e.preventDefault();
    if (pathname !== "/") {
      router.push(id ? `/${href}` : "/");
      return;
    }
    if (id) {
      smoothScrollToId(id);
    } else {
      smoothScrollToTop();
    }
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}

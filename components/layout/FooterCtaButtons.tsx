"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { smoothScrollToId } from "@/lib/smooth-scroll";

export function FooterCtaButtons() {
  const pathname = usePathname();
  const router = useRouter();

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    const id = href.replace("#", "");
    if (pathname === "/") {
      smoothScrollToId(id);
    } else {
      router.push(`/${href}`);
    }
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button
        href="#kalkulator-zakat"
        variant="white"
        onClick={(e) => handleClick(e, "#kalkulator-zakat")}
      >
        Bayar Zakat
      </Button>
      <Button
        href="#donasi"
        variant="outline-light"
        onClick={(e) => handleClick(e, "#donasi")}
      >
        Donasi Sekarang
      </Button>
    </div>
  );
}
